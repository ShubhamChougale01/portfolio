import os
import faiss
import numpy as np
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from groq import Groq
from pypdf import PdfReader

# --- CONFIG ---
GROQ_API_KEY = "fdxcbjhgfdzs345678987redfg678jhvbuyt"
RESUME_PATH = "../portfolio/src/assets/Shubham_AI.pdf"
CHUNK_SIZE = 350  # words
TOP_K = 4
EMBED_MODEL = "all-MiniLM-L6-v2"

# --- INIT ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    # For demo: use hardcoded project summaries (could parse markdown or JSON in real use)
    projects = [
        "AI-Powered Property Defect Detection: An iOS app for detecting structural defects like cracks and water damage using on-device YOLOv8 models converted to CoreML. Built with SwiftUI, it runs real-time detection fully offline with image input, class labels, and confidence scores.",
        "Developer Portfolio: A modern, interactive developer portfolio built with React, Vite, and Tailwind CSS. Features advanced UI/UX, project showcases, and integrated AI tools like Cursor and Lovable for code assistance and tagging.",
        "ViziSmart: Developed an AI-powered property management system with Langchain + RAG for contextual chat, a real-time voice assistant (Deepgram + OpenAI + TTS), and on-device defect detection for iOS using CoreML and a custom Swift plugin.",
        # Add more project summaries as needed
    ]
    return [chunk for proj in projects for chunk in chunk_text(proj)]

@app.on_event("startup")
async def build_faiss_index():
    global faiss_index, corpus_chunks, chunk_metadatas
    # Load and chunk all sources
    resume_chunks = load_resume_chunks()
    portfolio_chunks = load_portfolio_chunks()
    corpus_chunks = resume_chunks + portfolio_chunks
    chunk_metadatas = ([{"source": "resume"}] * len(resume_chunks)) + ([{"source": "portfolio"}] * len(portfolio_chunks))
    # Embed all chunks
    embeddings = model.encode(corpus_chunks, show_progress_bar=True, convert_to_numpy=True)
    # Build FAISS index
    dim = embeddings.shape[1]
    faiss_index = faiss.IndexFlatL2(dim)
    faiss_index.add(embeddings)

class RAGRequest(BaseModel):
    question: str

@app.post("/rag")
async def rag_answer(req: RAGRequest):
    global faiss_index, corpus_chunks
    # Embed the query
    q_emb = model.encode([req.question], convert_to_numpy=True)
    # Retrieve top-k
    D, I = faiss_index.search(q_emb, TOP_K)
    context = "\n".join([corpus_chunks[i] for i in I[0]])
    # Compose prompt
    prompt = f"""
You are an expert AI assistant for Shubham Chougale's portfolio. Use the following context to answer the user's question. If the answer is not in the context, say you don't know.

Context:
{context}

Question: {req.question}
Answer:"""
    # Call Groq LLM (Mixtral)
    client = Groq(api_key=GROQ_API_KEY)
    response = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=512,
    )
    answer = response.choices[0].message.content.strip()
    return {"answer": answer} 