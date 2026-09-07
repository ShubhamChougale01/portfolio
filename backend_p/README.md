# Portfolio Backend (Django)

Single Django project that powers the portfolio's contact form and AI chatbot. There is no separate FastAPI/RAG microservice — everything runs from this one app, served on port 8000.

## Features
- Django REST Framework API
- `/rag` — RAG-based chatbot endpoint (TF-IDF retrieval + FAISS + Groq LLM)
- `/api/contact/` — contact form submissions, persisted to SQLite
- CORS enabled for the Vercel-hosted frontend

## Setup

```bash
cd backend_p
python -m venv venv
source venv/bin/activate      # venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
```

Create a `.env` file in `backend_p/` (not committed — see `.gitignore`):

```env
GROQ_API_KEY=your_groq_api_key_here
DJANGO_SECRET_KEY=change-me-in-production
```

## Usage

```bash
python manage.py runserver
```

Runs at `http://localhost:8000`. The frontend hardcodes this URL in dev, so the backend must run on port 8000 locally.

## API

### POST /rag
- **Body:** `{ "question": "your question here" }`
- **Returns:** `{ "answer": "..." }`
- Retrieves relevant chunks from the resume PDF + hardcoded project summaries via TF-IDF embeddings + FAISS, then asks Groq's `gemma2-9b-it` model to answer using that context.

### POST /api/contact/
- **Body:** `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
- Saves the submission to the `ContactSubmission` model (SQLite).

### POST /api/chat
- Stub echo endpoint (`{"response": "You said: <message>"}`) — not used by the frontend.

## Configuration
- Knowledge base source: `api/static/Shubham_AI.pdf` (resume) + the hardcoded `projects` list in `api/views.py`.
- The FAISS/TF-IDF index is rebuilt at process startup — replace the PDF and restart to update the chatbot's knowledge.
- Groq API key is read from the `GROQ_API_KEY` environment variable; never commit it.

---
MIT License
