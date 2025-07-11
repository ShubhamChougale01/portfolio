# Portfolio RAG Backend (FastAPI + FAISS + Groq)

This backend powers the AI assistant for Shubham Chougale's portfolio using Retrieval Augmented Generation (RAG).

## Features
- FastAPI async backend
- FAISS vector search for knowledge base (resume + projects)
- Hugging Face Sentence Transformers for embeddings
- Groq LLM (Mixtral) for dynamic answers
- PDF resume parsing

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Usage

```bash
uvicorn main:app --reload
```

## API

### POST /rag
- **Body:** `{ "question": "your question here" }`
- **Returns:** `{ "answer": "..." }`

## Configuration
- Edit `main.py` to update knowledge base sources or chunking settings.
- Set your Groq API key in `main.py`.

## Knowledge Base
- Uses your resume (PDF) and project summaries as context for answers.

---
MIT License 