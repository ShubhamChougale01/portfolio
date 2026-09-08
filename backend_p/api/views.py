import os
import numpy as np
import faiss
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

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
RESUME_PATH = os.path.join(os.path.dirname(__file__), "static/Shubham_AI.pdf")
CHUNK_SIZE = 350
TOP_K = 4

faiss_index = None
corpus_chunks = []
chunk_metadatas = []

def chunk_text(text, chunk_size=CHUNK_SIZE):
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

def load_resume_chunks():
    reader = PdfReader(RESUME_PATH)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return chunk_text(text)

PROJECTS_JSON_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "frontend", "src", "data", "projects.json"
)

def load_projects():
    with open(PROJECTS_JSON_PATH, encoding="utf-8") as f:
        return json.load(f)

projects = load_projects()

def load_portfolio_chunks():
    chunks = []
    for proj in projects:
        text = f"{proj['title']}\n{proj['description']}\n{proj['details']}\nCategory: {proj['category']}\nTech: {', '.join(proj['tech'])}"
        chunks.extend(chunk_text(text))
    return chunks

def build_faiss_index():
    global faiss_index, corpus_chunks, chunk_metadatas, vectorizer
    resume_chunks = load_resume_chunks()
    portfolio_chunks = load_portfolio_chunks()
    corpus_chunks = resume_chunks + portfolio_chunks
    chunk_metadatas = ([{"source": "resume"}] * len(resume_chunks)) + ([{"source": "portfolio"}] * len(portfolio_chunks))
    # Use TF-IDF for embeddings
    vectorizer = TfidfVectorizer().fit(corpus_chunks)
    embeddings = vectorizer.transform(corpus_chunks).toarray().astype(np.float32)
    dim = embeddings.shape[1]
    faiss_index = faiss.IndexFlatL2(dim)
    faiss_index.add(embeddings)

# Build index at startup
build_faiss_index()

@api_view(['POST'])
def rag_answer(request):
    global faiss_index, corpus_chunks, vectorizer
    if not GROQ_API_KEY:
        return Response({"answer": "GROQ_API_KEY is not set in the environment."})
    try:
        question = request.data.get("question", "")
        q_emb = vectorizer.transform([question]).toarray().astype(np.float32)
        D, I = faiss_index.search(q_emb, TOP_K)
        context = "\n".join([corpus_chunks[i] for i in I[0]])
        prompt = f"""
                    You are an expert, friendly AI assistant on Shubham Chougale’s personal portfolio site.
                    Your job is to help visitors learn more about his work, experience, and projects in AI, machine learning, computer vision, and LLMs. Respond in a clear, conversational, and engaging tone — as if you’re talking to a curious visitor who wants to know what Shubham can do.
                    Do not repeat the question. Instead, provide thoughtful, structured answers that feel natural and human-written. Avoid bullet-point dumps unless asked for lists directly. Instead, blend facts smoothly into your reply. If the user asks for personal details like email or phone number, politely redirect them to the **Contact** section of the site — do not share that information.
                    Be helpful, insightful, and friendly — like a well-informed guide to Shubham’s portfolio.
                    If you're looking to get in touch with Shubham, please use the Contact section on this site. For privacy reasons, I won't provide personal information like email or phone number here.
                    If the Contact section isn’t working for any reason, you can say: "If the Contact section isn’t working for you, feel free to drop Shubham a message at shubham.chougale001@gmail.com ."
                    Be helpful, insightful, and friendly — like a well-informed guide to Shubham’s portfolio.
                    ---
                    Context:
                    {context}

                    Question: {question}
                    Answer:"""
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=300,
            reasoning_effort="low",
        )
        answer = response.choices[0].message.content.strip()
    except Exception as e:
        answer = "Sorry, I couldn't get a response from the AI service at the moment. Please try again later."
    return Response({"answer": answer})

@api_view(['POST'])
def chat_endpoint(request):
    user_message = request.data.get("message", "")
    response = f"You said: {user_message}"
    return Response({"response": response})

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')
            # Save to SQLite database using the ContactSubmission model
            ContactSubmission.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            print(f"Contact form received: Name={name}, Email={email}, Subject={subject}, Message={message}")
            return JsonResponse({'status': 'success'})
        except Exception as e:
            print("Error parsing contact form:", e)
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)
