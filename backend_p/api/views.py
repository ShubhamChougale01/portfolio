import logging
import os
import re
import numpy as np
import faiss
from email.utils import formataddr

from django.core.mail import EmailMessage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from pypdf import PdfReader
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ContactSubmission

load_dotenv()

logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
RESUME_PATH = os.path.join(os.path.dirname(__file__), "static/Shubham_AI.pdf")

# Small chunks with overlap. The corpus is tiny (a resume plus ~25 short project
# blurbs), so a 350-word chunk covered half the resume and drowned out the
# project that actually answered the question.
CHUNK_SIZE = 120
CHUNK_OVERLAP = 30
TOP_K = 4

# Relevance gate, tuned against the TF-IDF space below - not universal values.
# A flat cosine floor does not work here: scores are spread thin across a
# bigram vocabulary, so "tell me about the pneumonia project" peaks near 0.2
# while a perfectly answerable "what is his tech stack?" peaks near 0.06. So
# gate on the *best* match, then keep the rest only if they are in its league.
# Everything below is incidental word overlap, and feeding that to the model is
# how the answers started inventing things.
MIN_BEST_SCORE = 0.04
RELATIVE_FLOOR = 0.35

# Enough turns for "what about that one?" to resolve, short enough that the
# history cannot crowd out the retrieved context.
MAX_HISTORY_TURNS = 4

# Contact questions are answered by policy, not by retrieval. They used to fall
# through to the model, which meant the reply depended on whichever chunks came
# back - and the resume chunks contain the real address. Match them up front and
# answer with a fixed line instead.
CONTACT_PATTERN = re.compile(
    r"\b(e-?mail\s*(id|address)?|mail\s*(id|address)|phone|mobile|whatsapp|telephone"
    r"|contact\s+(him|shubham|details?|info)|get\s+in\s+touch|reach\s+(him|out\s+to)"
    r"|hire\s+him|linkedin|resume\s+(link|copy)|cv)\b",
    re.IGNORECASE,
)
CONTACT_ANSWER = (
    "For anything direct, use the Contact section on this site - it goes straight "
    "to Shubham. I don't hand out personal details here."
)
# Only surfaced if the visitor says the form itself is broken.
CONTACT_FALLBACK_PATTERN = re.compile(
    r"\b((not|isn'?t|doesn'?t|won'?t)\s+work(ing|s)?|broken|failing|error"
    r"|won'?t\s+(send|submit))\b",
    re.IGNORECASE,
)
CONTACT_FALLBACK_ANSWER = (
    "Sorry about that - if the Contact form isn't going through, email Shubham "
    "directly at shubham.chougale001@gmail.com."
)

OFF_TOPIC_ANSWER = (
    "I don't have anything on that here - I only know Shubham's portfolio: his "
    "projects, skills and experience in AI, ML and computer vision. Ask me about "
    "one of those and I'll dig it out."
)

faiss_index = None
corpus_chunks = []
chunk_metadatas = []
vectorizer = None


def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split into overlapping word windows.

    The overlap keeps a fact that straddles a boundary retrievable from either
    side; without it a role and its dates could land in different chunks and
    neither would answer "when did he work there".
    """
    words = text.split()
    if not words:
        return []
    step = max(1, chunk_size - overlap)
    chunks = []
    for i in range(0, len(words), step):
        window = words[i:i + chunk_size]
        if not window:
            break
        chunks.append(" ".join(window))
        if i + chunk_size >= len(words):
            break
    return chunks


EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
PHONE_RE = re.compile(r"(?<!\d)(?:\+\d{1,3}[\s-]?)?\d{10}(?!\d)")


def redact_contact_details(text):
    """Strip the address and phone number out of the resume before indexing.

    The header line of the resume carries both, so a loosely-matching question
    could pull them into context and the model would dutifully read them out.
    Keeping them out of the corpus makes the privacy rule structural rather
    than something the prompt has to win an argument about.
    """
    text = EMAIL_RE.sub("[contact via the site's Contact section]", text)
    return PHONE_RE.sub("[contact via the site's Contact section]", text)


def load_resume_chunks():
    reader = PdfReader(RESUME_PATH)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return [f"From Shubham's resume: {c}" for c in chunk_text(redact_contact_details(text))]

PROJECTS_JSON_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "frontend", "src", "data", "projects.json"
)

def load_projects():
    try:
        with open(PROJECTS_JSON_PATH, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        logger.warning("Could not load projects.json (%s); portfolio RAG context will be empty.", e)
        return []

projects = load_projects()

def load_portfolio_chunks():
    chunks = []
    for proj in projects:
        text = (
            f"Project: {proj['title']}\n{proj['description']}\n{proj['details']}\n"
            f"Category: {proj['category']}\nTech: {', '.join(proj['tech'])}"
        )
        # Repeat the title on every chunk so a split project stays attributable.
        for i, chunk in enumerate(chunk_text(text)):
            chunks.append(chunk if i == 0 else f"Project: {proj['title']} (cont.)\n{chunk}")
    return chunks

def build_faiss_index():
    global faiss_index, corpus_chunks, chunk_metadatas, vectorizer
    resume_chunks = load_resume_chunks()
    portfolio_chunks = load_portfolio_chunks()
    corpus_chunks = resume_chunks + portfolio_chunks
    chunk_metadatas = ([{"source": "resume"}] * len(resume_chunks)) + ([{"source": "portfolio"}] * len(portfolio_chunks))

    # TF-IDF stands in for a real embedding model. Stop words stop "what is his
    # ..." phrasing from dominating the match, bigrams let "computer vision" and
    # "call routing" score as phrases, and sublinear tf stops one repeated term
    # from carrying a chunk.
    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        sublinear_tf=True,
    ).fit(corpus_chunks)
    embeddings = vectorizer.transform(corpus_chunks).toarray().astype(np.float32)
    # Rows are already L2-normalised by TfidfVectorizer, so inner product is
    # cosine similarity - a comparable score we can threshold on, which plain
    # L2 distance is not.
    dim = embeddings.shape[1]
    faiss_index = faiss.IndexFlatIP(dim)
    faiss_index.add(embeddings)

# Build index at startup
try:
    build_faiss_index()
except Exception:
    logger.exception("Failed to build RAG index at startup; /rag will respond with a fallback message.")


def retrieve(question):
    """Return the chunks that actually match, best first - possibly none.

    A question whose every word is out of vocabulary transforms to an all-zero
    vector, and FAISS happily returns four arbitrary chunks for it. Those chunks
    then read as authoritative context to the model, which is where the
    confident wrong answers came from. Check the norm and bail.
    """
    q_emb = vectorizer.transform([question]).toarray().astype(np.float32)
    if not np.any(q_emb):
        return []
    scores, indices = faiss_index.search(q_emb, min(TOP_K, len(corpus_chunks)))
    best = float(scores[0][0])
    if best < MIN_BEST_SCORE:
        return []
    floor = best * RELATIVE_FLOOR
    return [
        corpus_chunks[idx]
        for score, idx in zip(scores[0], indices[0])
        if idx != -1 and score >= floor
    ]


SYSTEM_PROMPT = """You are the assistant on Shubham Chougale's portfolio site, answering visitors' questions about his work in AI, ML, computer vision and LLMs.

Rules, in order of importance:
1. Answer only from the CONTEXT in the user message. If it does not contain the answer, say you don't have that detail and suggest what you can cover instead. Never guess at a fact, date, employer, metric or technology that is not in the context.
2. Be brief. Two or three sentences, under 70 words. Lead with the answer; drop the preamble, the restated question and the sign-off.
3. Only use a short list when the visitor asks for several items, and keep it to one line each.
4. Plain text only - no markdown, no asterisks, no headings. The chat window renders raw text.
5. For contact details, phone or email, point the visitor to the Contact section of this site and give nothing else. Only if they say the Contact form is broken, give shubham.chougale001@gmail.com.
6. Write as a knowledgeable guide: third person about Shubham, warm but not chatty."""


def _history_messages(history):
    """Normalise the client's turn list into chat messages, newest N kept."""
    messages = []
    if not isinstance(history, list):
        return messages
    for turn in history[-MAX_HISTORY_TURNS * 2:]:
        if not isinstance(turn, dict):
            continue
        role = "assistant" if turn.get("role") == "assistant" else "user"
        content = str(turn.get("content") or "").strip()[:1000]
        if content:
            messages.append({"role": role, "content": content})
    return messages


@api_view(['POST'])
def rag_answer(request):
    if not GROQ_API_KEY:
        return Response({"answer": "GROQ_API_KEY is not set in the environment."})
    if faiss_index is None or vectorizer is None:
        return Response({"answer": "The assistant's knowledge base isn't available right now. Please try again later."})

    question = str(request.data.get("question") or "").strip()
    if not question:
        return Response({"answer": "Ask me something about Shubham's projects, skills or experience."})
    question = question[:500]

    if CONTACT_PATTERN.search(question):
        return Response({
            "answer": CONTACT_FALLBACK_ANSWER
            if CONTACT_FALLBACK_PATTERN.search(question)
            else CONTACT_ANSWER
        })

    chunks = retrieve(question)
    if not chunks:
        # Nothing relevant retrieved. Answering anyway is exactly how the bot
        # used to make things up, so decline without spending a model call.
        return Response({"answer": OFF_TOPIC_ANSWER})

    context = "\n\n---\n\n".join(chunks)
    try:
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                *_history_messages(request.data.get("history")),
                {"role": "user", "content": f"CONTEXT:\n{context}\n\nQUESTION: {question}"},
            ],
            temperature=0.2,
            # Headroom over the ~70-word target so a slightly long answer ends
            # on a full stop instead of being cut mid-sentence.
            max_tokens=220,
            reasoning_effort="low",
        )
        answer = (response.choices[0].message.content or "").strip()
        if not answer:
            raise ValueError("empty completion")
    except Exception:
        logger.exception("Groq completion failed for question: %r", question[:120])
        answer = "Sorry, I couldn't get a response from the AI service at the moment. Please try again later."
    return Response({"answer": answer})


@api_view(['POST'])
def chat_endpoint(request):
    user_message = request.data.get("message", "")
    response = f"You said: {user_message}"
    return Response({"response": response})

def _sender_display(name, email):
    """Name the visitor in the From line, over our own sending address.

    The address itself has to stay DEFAULT_FROM_EMAIL — Gmail only lets the
    authenticated account send, and rewrites anything else — but it does keep
    the display name, so the inbox shows who wrote in without opening the mail.
    Replying still goes to the visitor via reply_to.
    """
    label = " ".join((name or email or "Portfolio visitor").split())[:60]
    return formataddr((f"{label} (portfolio)", settings.DEFAULT_FROM_EMAIL))


def _send_contact_notification(name, email, subject, message):
    """Email the enquiry on, with the sender as reply-to so a reply goes
    straight back to them.

    Best effort by design: the submission is already stored, so a mail failure
    must not turn a successful submission into an error for the visitor. It is
    logged and reported back as `notified: false` instead.
    """
    if not settings.EMAIL_IS_CONFIGURED:
        # The console backend "sends" successfully, so without this check the
        # endpoint reports notified: true while the enquiry only ever reached
        # the server log. Report the truth; the submission is still stored.
        logger.error(
            "Contact enquiry from %s was NOT emailed: SMTP credentials are not "
            "configured, so it was only written to the log. Set EMAIL_HOST_USER "
            "and EMAIL_HOST_PASSWORD.",
            email,
        )

    body = (
        f"New portfolio enquiry\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Subject: {subject}\n\n"
        f"{message}\n"
    )
    try:
        mail = EmailMessage(
            subject=f"Portfolio enquiry — {subject or 'no subject'}",
            body=body,
            from_email=_sender_display(name, email),
            to=[settings.CONTACT_NOTIFY_EMAIL],
            reply_to=[email] if email else None,
        )
        mail.send(fail_silently=False)
        # Still print it locally, but never claim it was delivered.
        return settings.EMAIL_IS_CONFIGURED
    except Exception:
        logger.exception("Contact notification email failed for %s", email)
        return False


@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')
            if not (name and email and message):
                return JsonResponse({'error': 'Name, email and message are required.'}, status=400)

            # Save to SQLite database using the ContactSubmission model
            ContactSubmission.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            notified = _send_contact_notification(name, email, subject, message)
            return JsonResponse({'status': 'success', 'notified': notified})
        except Exception as e:
            print("Error parsing contact form:", e)
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)
