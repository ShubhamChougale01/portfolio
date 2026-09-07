# 🧠 Portfolio

> A full-stack personal portfolio with a React frontend, Django REST backend, and an AI-powered chatbot that answers questions about the owner using RAG.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-REST-092E20?logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![Groq](https://img.shields.io/badge/Groq-gemma2--9b--it-F55036?logoColor=white)](https://groq.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

Static portfolio sites tell visitors what you did. This one lets them **ask**.

Portfolio replaces a traditional read-only resume page with an interactive full-stack application. Visitors browse projects and skills as usual — but they can also open a chat sidebar and ask questions answered directly by an AI assistant that has read the owner's resume and project summaries. The same Django backend also handles contact form submissions with persistent storage.

There is **one backend**, not two: a single Django project (`backend_p/`) serves both the RAG chatbot endpoint and the contact form API. Earlier docs described a separate FastAPI RAG microservice — that was never actually built; the RAG logic lives inside a Django view.

| Layer | Technology | Role |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite | UI, routing, chatbot sidebar |
| Styling | Tailwind CSS + shadcn/ui | Responsive, accessible components |
| Backend | Django + Django REST Framework | Contact API, RAG chatbot endpoint |
| Retrieval | scikit-learn TF-IDF + FAISS | Embeds queries, retrieves relevant context |
| LLM | Groq (`gemma2-9b-it`) | Generates answers from retrieved context |
| Deployment | Vercel (frontend) | Frontend CDN delivery |

---

## Features

| Feature | Description |
|---|---|
| Responsive Portfolio UI | Hero, About, Projects, Skills, and Contact sections — mobile-first |
| AI Chatbot Sidebar | `AIChatbot` component sends questions about the owner and renders the reply |
| RAG Knowledge Base | Resume PDF + hardcoded project summaries, embedded with TF-IDF (scikit-learn) |
| FAISS Vector Search | Fast nearest-neighbour retrieval over embedded document chunks |
| Groq LLM Inference | Low-latency `gemma2-9b-it` responses via Groq Cloud API |
| Contact Form | Submissions sent to a Django REST endpoint, persisted to SQLite (`ContactSubmission`) |
| PDF Resume Parsing | Resume PDF parsed and chunked into the retrieval index at process startup |

---

## Quick Setup

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- A [Groq API key](https://console.groq.com/)

### 1 — Backend (Django — contact API + RAG chatbot)

```bash
cd backend_p
python -m venv venv
source venv/bin/activate      # venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs at `http://localhost:8000`. Must run on this port — the frontend hardcodes it in dev.

### 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` by default.

### Environment Variables

Create a `.env` file in `backend_p/` (not committed):

```env
GROQ_API_KEY=your_groq_api_key_here
DJANGO_SECRET_KEY=change-me-in-production
```

Without `GROQ_API_KEY`, `/rag` returns a fixed "not set" message instead of an error.

---

## Feature Deep-Dive

### Responsive React Portfolio

**What it does**
A single-page React application built with Vite and Tailwind CSS renders the full portfolio — Hero banner, About bio, Projects grid, Skills matrix, and a Contact form — from a clean component hierarchy. `shadcn/ui` primitives keep accessibility and design consistency without heavy overhead.

**Why it matters**
Vite's ESM-native dev server and optimised production build give instant HMR during development and a small, cache-friendly bundle in production. Tailwind's utility classes make responsive breakpoints explicit and co-located with markup, reducing CSS drift over time.

---

### AI Chatbot Sidebar (`AIChatbot`)

**What it does**
A slide-in chat panel lets visitors type natural-language questions ("What projects have you shipped?", "Do you know Kubernetes?"). The component POSTs the question to the Django `/rag` endpoint and renders the reply.

**Why it matters**
Most hiring managers spend under two minutes on a portfolio. A chatbot lets them get directly to what they care about — specific skills, project outcomes, availability — without scrolling. It turns passive content into active engagement.

---

### Django RAG Endpoint (`/rag`)

**What it does**
The RAG (Retrieval-Augmented Generation) logic lives in `backend_p/api/views.py`. At process startup it parses the owner's resume PDF and a hardcoded list of project summaries, chunks the text, embeds each chunk with a TF-IDF vectorizer (scikit-learn), and stores the vectors in an in-memory FAISS `IndexFlatL2` index. At query time it embeds the incoming question the same way, retrieves the top-k most relevant chunks, and sends them as context to Groq's `gemma2-9b-it` model.

**Why it matters**
Sending the full resume to the LLM on every request is wasteful and context-window-limited. FAISS retrieval ensures only the most relevant passages are included, keeping latency low and answers focused. TF-IDF keeps the retrieval step dependency-light — no embedding model download or GPU required.

---

### Django Contact API

**What it does**
The same Django app exposes a `POST /api/contact/` endpoint that validates the submitted name, email, subject, and message, then saves the entry via the `ContactSubmission` model to SQLite (`db.sqlite3`).

**Why it matters**
Using Django's ORM instead of flat-file storage means submissions are queryable and the admin panel works out of the box — no extra infrastructure needed for a personal portfolio.

---

### PDF Resume Parsing & Knowledge Base

**What it does**
On process startup the Django app reads the resume PDF (`api/static/Shubham_AI.pdf`) from disk, splits the text into overlapping chunks, and embeds them alongside hand-authored project summary strings from `views.py`. The combined FAISS index is the sole knowledge source the LLM consults.

**Why it matters**
Updating the AI's knowledge is as simple as dropping in a new PDF and restarting — no retraining, no prompt editing. A single source of truth keeps the chatbot's answers consistent with the actual resume.

---

## Architecture Flow

```
Browser
  |
  |  (1) Page load
  v
React Frontend (Vite / Tailwind)
  |
  |  (2) User opens chatbot, types question
  v
AIChatbot Component
  |
  |  (3) POST /rag { "question": "..." }
  v
Django (api/views.py: rag_answer)
  |
  |  (4) Embed question  -->  TF-IDF vectorizer (scikit-learn)
  |
  |  (5) k-NN lookup     -->  FAISS IndexFlatL2
  |                               |
  |                               +-- Resume chunks
  |                               +-- Project summaries
  |
  |  (6) Build prompt with retrieved context
  |
  |  (7) POST to Groq Cloud API (gemma2-9b-it)
  |
  |  (8) Answer returned to browser
  v
AIChatbot renders response

-------------------------------------------------

Browser (Contact Form)
  |
  |  (9) POST /api/contact/ { name, email, subject, message }
  v
Django (api/views.py: contact_view)
  |
  |  (10) Validate + save via ContactSubmission model
  v
SQLite (db.sqlite3)  -->  200 OK
```

---

## Folder Structure

```
portfolio/
├── frontend/                        # React + Vite application
│   ├── src/
│   │   ├── components/              # UI sections: Header, Hero, About,
│   │   │                            #   Projects, Skills, Contact, AIChatbot
│   │   ├── pages/                   # Index page — assembles all sections
│   │   ├── hooks/                   # Custom React hooks (e.g. useChat)
│   │   └── lib/                     # Utility functions and API clients
│   ├── public/                      # Static assets (favicon, OG image)
│   └── vite.config.ts               # Vite build configuration
│
├── backend_p/                       # Python backend (Django only)
│   ├── api/                         # Django app — contact form + RAG chatbot
│   │   ├── views.py                 # rag_answer, contact_view, chat_endpoint
│   │   ├── models.py                # ContactSubmission model
│   │   ├── static/Shubham_AI.pdf    # Resume — RAG knowledge source
│   │   └── urls.py                  # /rag, /api/contact/, /api/chat routes
│   ├── backend_p/                   # Django project package
│   │   ├── settings.py              # Django settings (CORS, installed apps)
│   │   └── urls.py                  # Root URL configuration
│   ├── requirements.txt             # Python dependencies
│   └── manage.py                    # Django management CLI
│
├── vercel.json                      # Vercel deployment + rewrite rules
└── README.md
```

---

## FAQ

**Q: Can I update the chatbot's knowledge without touching code?**
Mostly. Replace the resume PDF at `backend_p/api/static/Shubham_AI.pdf` and restart the server — the FAISS index is rebuilt on startup. The project summaries, however, are a hardcoded Python list in `views.py`, so updating those does require a code change.

**Q: Why is there only one backend now — didn't this used to have a separate FastAPI service?**
Earlier docs described a FastAPI RAG microservice on port 8001, but it was never actually implemented. All logic — contact form and RAG chatbot — lives in the single Django app on port 8000.

**Q: Does the chatbot have access to real-time information?**
No. It only has access to the indexed resume and project summaries. It will not answer questions outside that knowledge base, which prevents hallucination about unrelated topics.

**Q: How is the Groq API key kept secret?**
It is read from an environment variable (`GROQ_API_KEY`) at runtime and never committed to source control. The frontend never receives or transmits the key.

**Q: What embedding model is used?**
A TF-IDF vectorizer (scikit-learn), fit on the resume + project chunks at startup — no external embedding API call, no downloaded model, no additional cost.

**Q: How do I deploy the backend?**
The frontend deploys to Vercel via `vercel.json`. The Django backend deploys via `vercel.json`'s `@vercel/python` build pointing at `backend_p/backend_p/wsgi.py` (a Render/Railway/Fly.io/VPS deployment also works). Set the `GROQ_API_KEY` environment variable on the host and update the hardcoded backend URL in `AIChatbot.tsx` / `Contact.tsx` if it changes.

**Q: Can I use a different LLM?**
Yes. The Groq call is isolated inside `rag_answer` in `api/views.py`. Swap in any OpenAI-compatible client (OpenAI, Ollama, Together AI) by changing the client initialisation and model name.

---

## Tech Stack Summary

| Category | Tools |
|---|---|
| Frontend Framework | React 18, TypeScript, Vite |
| UI / Styling | Tailwind CSS, shadcn/ui |
| Backend | Django 5, Django REST Framework |
| Retrieval | scikit-learn (TF-IDF), FAISS |
| LLM | Groq Cloud — `gemma2-9b-it` |
| PDF Ingestion | `pypdf` |
| Deployment | Vercel (frontend + backend via `@vercel/python`) |

---

<p align="center">
  Built to be <strong>talked to</strong>, not just looked at.
</p>
