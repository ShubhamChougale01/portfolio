import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from sentence_transformers import SentenceTransformer
import faiss
from pypdf import PdfReader
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Load config from settings
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
RESUME_PATH = os.path.join(os.path.dirname(__file__), "static/Shubham_AI.pdf")
CHUNK_SIZE = 350
TOP_K = 4
EMBED_MODEL = "all-MiniLM-L6-v2"

model = SentenceTransformer(EMBED_MODEL)
faiss_index = None
corpus_chunks = []
chunk_metadatas = []

def chunk_text(text, chunk_size=CHUNK_SIZE):
    words = text.split()
    chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    return chunks

def load_resume_chunks():
    reader = PdfReader(RESUME_PATH)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    return chunk_text(text)

def load_portfolio_chunks():
    projects = [
        "AI-Powered Property Defect Detection: An iOS app for detecting structural defects like cracks and water damage using on-device YOLOv8 models converted to CoreML. Built with SwiftUI, it runs real-time detection fully offline with image input, class labels, and confidence scores.",
        "Developer Portfolio: A modern, interactive developer portfolio built with React, Vite, and Tailwind CSS. Features advanced UI/UX, project showcases, and integrated AI tools like Cursor and Lovable for code assistance and tagging.",
        "ViziSmart: Developed an AI-powered property management system with Langchain + RAG for contextual chat, a real-time voice assistant (Deepgram + OpenAI + TTS), and on-device defect detection for iOS using CoreML and a custom Swift plugin.",
    ]
    return [chunk for proj in projects for chunk in chunk_text(proj)]

def build_faiss_index():
    global faiss_index, corpus_chunks, chunk_metadatas
    resume_chunks = load_resume_chunks()
    portfolio_chunks = load_portfolio_chunks()
    corpus_chunks = resume_chunks + portfolio_chunks
    chunk_metadatas = ([{"source": "resume"}] * len(resume_chunks)) + ([{"source": "portfolio"}] * len(portfolio_chunks))
    embeddings = model.encode(corpus_chunks, show_progress_bar=True, convert_to_numpy=True)
    dim = embeddings.shape[1]
    faiss_index = faiss.IndexFlatL2(dim)
    faiss_index.add(embeddings)

# Build index at startup
build_faiss_index()

@api_view(['POST'])
def rag_answer(request):
    global faiss_index, corpus_chunks
    if not GROQ_API_KEY:
        return Response({"answer": "GROQ_API_KEY is not set in the environment."})
    question = request.data.get("question", "")
    q_emb = model.encode([question], convert_to_numpy=True)
    D, I = faiss_index.search(q_emb, TOP_K)
    context = "\n".join([corpus_chunks[i] for i in I[0]])
    prompt = f"""
You are an expert AI assistant for Shubham Chougale's portfolio. Use the following context to answer the user's question. If the answer is not in the context, say you don't know.

Context:
{context}

Question: {question}
Answer:"""
    client = Groq(api_key=GROQ_API_KEY)
    response = client.chat.completions.create(
        model="mistral-saba-24b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=150,
    )
    answer = response.choices[0].message.content.strip()
    return Response({"answer": answer})

@api_view(['POST'])
def chat_endpoint(request):
    user_message = request.data.get("message", "")
    response = f"You said: {user_message}"
    return Response({"response": response})
