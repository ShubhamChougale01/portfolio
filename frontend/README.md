# Portfolio Frontend

React 18 + TypeScript + Vite single-page portfolio, styled with Tailwind CSS and shadcn/ui, with an AI chatbot sidebar and a contact form.

## Prerequisites
- Node.js >= 18

## Setup

```bash
cd frontend
npm install
```

## Usage

```bash
npm run dev
```

Runs at `http://localhost:8080` (configured in `vite.config.ts`). Requires the Django backend running at `http://localhost:8000` (see `../backend_p/README.md`) for the chatbot and contact form to work.

Other scripts:
```bash
npm run build       # production build
npm run build:dev   # development-mode build
npm run preview      # preview a production build locally
npm run lint         # eslint
```

## Backend URL
The backend base URL is currently hardcoded in components rather than read from an env var:
- `src/components/AIChatbot.tsx` — POSTs to `http://localhost:8000/rag` on `localhost`, otherwise a deployed Render URL
- `src/components/Contact.tsx` — POSTs to `http://localhost:8000/api/contact/`

If you deploy the backend elsewhere, update these URLs directly.

## Structure
```
src/
├── components/   # Header, Hero, About, Projects, Skills, Contact, AIChatbot
├── pages/        # Index page — assembles all sections
├── hooks/        # Custom React hooks (e.g. useChat)
└── lib/          # Utility functions and API clients
```

## Deployment
Deploys to Vercel via the root `vercel.json`.

---
MIT License
