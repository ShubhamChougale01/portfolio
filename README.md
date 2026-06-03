# 🧠 Portfolio

> A full-stack personal portfolio with a React frontend, Django REST backend, and an AI-powered chatbot that answers questions about the owner using RAG.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-REST-092E20?logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-RAG_Service-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Groq](https://img.shields.io/badge/Groq-Mixtral_LLM-F55036?logoColor=white)](https://groq.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

Static portfolio sites tell visitors what you did. This one lets them **ask**.

Portfolio replaces a traditional read-only resume page with an interactive full-stack application. Visitors browse projects and skills as usual — but they can also open a chat sidebar and ask questions answered directly by an AI assistant that has read the owner's resume and project summaries. A Django REST backend handles contact form submissions with persistent storage.

| Layer | Technology | Role |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite | UI, routing, chatbot sidebar |
| Styling | Tailwind CSS + shadcn/ui | Responsive, accessible components |
| Contact API | Django + Django REST Framework | Receives and persists contact messages |
| RAG Service | FastAPI + FAISS + HuggingFace | Embeds queries, retrieves relevant context |
| LLM | Groq (Mixtral) | Generates answers from retrieved context |
| Deployment | Vercel | Frontend CDN delivery |

---

## Features

| Feature | Description |
|---|---|
| Responsive Portfolio UI | Hero, About, Projects, Skills, and Contact sections — mobile-first |
| AI Chatbot Sidebar | `AIChatbot` component streams answers about the owner in real time |
| RAG Knowledge Base | Resume PDF + project summaries embedded with HuggingFace Sentence Transformers |
| FAISS Vector Search | Fast nearest-neighbour retrieval over embedded document chunks |
| Groq LLM Inference | Low-latency Mixtral responses via Groq Cloud API |
| Contact Form | Submissions sent to Django REST endpoint, persisted to `contact_submissions.txt` |
| PDF Resume Parsing | Automatic ingestion of uploaded resume PDF into the vector store |

---

## Quick Setup

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- A [Groq API key](https://console.groq.com/)

### 1 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` by default.

### 2 — Django REST Backend (Contact API)

```bash
cd backend_p
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs at `http://localhost:8000`.

### 3 — FastAPI RAG Service

```bash
cd backend_p
uvicorn main:app --reload
```

Runs at `http://localhost:8001` by default.

### Environment Variables

Create a `.env` file in `backend_p/` (or export in your shell):

```env
GROQ_API_KEY=your_groq_api_key_here
```

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
A slide-in chat panel lets visitors type natural-language questions ("What projects have you shipped?", "Do you know Kubernetes?"). The component POSTs the question to the FastAPI `/rag` endpoint and renders the reply as Markdown.

**Why it matters**
Most hiring managers spend under two minutes on a portfolio. A chatbot lets them get directly to what they care about — specific skills, project outcomes, availability — without scrolling. It turns passive content into active engagement.

---

### FastAPI RAG Service

**What it does**
The RAG (Retrieval-Augmented Generation) service ingests the owner's resume PDF and project summaries, chunks them, embeds each chunk with a HuggingFace Sentence Transformer model, and stores the vectors in an in-memory FAISS index. At query time it embeds the incoming question, retrieves the top-k most relevant chunks, and sends them as context to the Groq Mixtral LLM.

**Why it matters**
Sending the full resume to the LLM on every request is wasteful and context-window-limited. FAISS retrieval ensures only the most relevant passages are included, keeping latency low and answers focused.

---

### Django REST Contact API

**What it does**
A lightweight Django app exposes a `POST /api/contact/` endpoint that validates the submitted name, email, and message, then appends the entry to `contact_submissions.txt` on the server.

**Why it matters**
File-based persistence keeps the deployment dependency-free — no database required for a personal portfolio. The REST endpoint makes it trivial to swap in a database or third-party CRM later without touching the frontend.

---

### PDF Resume Parsing & Knowledge Base

**What it does**
On service startup the FastAPI app reads the resume PDF from disk, splits the text into overlapping chunks, and embeds them alongside hand-authored project summary strings. The combined FAISS index is the sole knowledge source the LLM consults.

**Why it matters**
Updating the AI's knowledge is as simple as dropping in a new PDF — no retraining, no prompt editing. A single source of truth keeps the chatbot's answers consistent with the actual resume.

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
FastAPI RAG Service
  |
  |  (4) Embed question  -->  HuggingFace Sentence Transformer
  |
  |  (5) k-NN lookup     -->  FAISS Index
  |                               |
  |                               +-- Resume chunks
  |                               +-- Project summaries
  |
  |  (6) Build prompt with retrieved context
  |
  |  (7) POST to Groq Cloud API (Mixtral)
  |
  |  (8) Answer streamed back to browser
  v
AIChatbot renders Markdown response

-------------------------------------------------

Browser (Contact Form)
  |
  |  (9) POST /api/contact/ { name, email, message }
  v
Django REST Framework
  |
  |  (10) Validate + append to contact_submissions.txt
  v
200 OK
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
├── backend_p/                       # Python backend (Django + FastAPI)
│   ├── api/                         # Django app — contact form
│   │   ├── views.py                 # ContactSubmissionView
│   │   └── urls.py                  # /api/contact/ route
│   ├── backend_p/                   # Django project package
│   │   ├── settings.py              # Django settings (CORS, installed apps)
│   │   └── urls.py                  # Root URL configuration
│   ├── main.py                      # FastAPI app entry — /rag endpoint
│   ├── requirements.txt             # Python dependencies
│   └── manage.py                    # Django management CLI
│
├── vercel.json                      # Vercel deployment + rewrite rules
└── README.md
```

---

## FAQ

**Q: Can I update the chatbot's knowledge without touching code?**
Yes. Replace the resume PDF in `backend_p/` and restart the FastAPI service. The FAISS index is rebuilt on startup from whatever PDF is present — no code changes required.

**Q: Why two backends (Django + FastAPI)?**
Django REST Framework is the right tool for request validation, ORM integration, and a mature admin panel if contact submissions grow. FastAPI is the right tool for async, low-latency ML inference. Separating concerns keeps each service focused and independently deployable.

**Q: Does the chatbot have access to real-time information?**
No. It only has access to the indexed resume and project summaries. It will not answer questions outside that knowledge base, which prevents hallucination about unrelated topics.

**Q: How is the Groq API key kept secret?**
It is read from an environment variable (`GROQ_API_KEY`) at runtime and never committed to source control. The frontend never receives or transmits the key.

**Q: What embedding model is used?**
A HuggingFace Sentence Transformer model (e.g. `all-MiniLM-L6-v2`) running locally inside the FastAPI service — no external embedding API call, no additional cost.

**Q: How do I deploy the backends?**
The frontend deploys to Vercel via `vercel.json`. For the backends, any Python-capable host works (Railway, Render, Fly.io, a VPS). Set the `GROQ_API_KEY` environment variable on the host and point the frontend's API base URL to the deployed service.

**Q: Can I use a different LLM?**
Yes. The Groq/Mixtral call in `main.py` is isolated. Swap in any OpenAI-compatible client (OpenAI, Ollama, Together AI) by changing the client initialisation and model name.

---

## Tech Stack Summary

| Category | Tools |
|---|---|
| Frontend Framework | React 18, TypeScript, Vite |
| UI / Styling | Tailwind CSS, shadcn/ui |
| REST API | Django 4, Django REST Framework |
| RAG Service | FastAPI, FAISS, HuggingFace Sentence Transformers |
| LLM | Groq Cloud — Mixtral |
| PDF Ingestion | Python PDF parser (PyMuPDF / pdfplumber) |
| Deployment | Vercel (frontend) |

---

<p align="center">
  Built to be <strong>talked to</strong>, not just looked at.
</p>
