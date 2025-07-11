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

projects = [
    {
        "title": "Property Defect Detection (iOS)",
        "description": "An iOS app for detecting structural defects like cracks and water damage using on-device YOLOv8 models converted to CoreML. Built with SwiftUI, it runs real-time detection fully offline with image input, class labels, and confidence scores.",
        "details": "- Real-time object detection (YOLOv8, CoreML)\n- Image selection from gallery or camera\n- Fallback class labels if model metadata is missing\n- 100% on-device, no server required\n- Key files: defectdettestApp.swift, ContentView.swift, defect_detect.pt, DefectDetectionModel.mlmodel, defect_detect.mlpackage\n- Tech: SwiftUI, CoreML, YOLOv8, PyTorch, AVFoundation (optional)\n- Model: 640x640 RGB input, bounding boxes + class labels + confidence\n- License: MIT (see Ultralytics License)",
        "category": "Computer Vision",
        "tech": ["YOLOv8", "CoreML", "SwiftUI", "iOS", "PyTorch"],
    },
    {
        "title": "Developer Portfolio",
        "description": "A modern, interactive developer portfolio built with React, Vite, and Tailwind CSS. Features advanced UI/UX, project showcases, and integrated AI tools like Cursor and Lovable for code assistance and tagging. Includes a dynamic skills section, certifications, and live project previews.",
        "details": "- Built with React, Vite, and Tailwind CSS\n- Integrated Cursor AI and Lovable for code assistance and tagging\n- Dynamic skills, certifications, and project showcase\n- Modern, responsive design\n- Open source on GitHub",
        "category": "Portfolio",
        "tech": ["React", "Vite", "Tailwind CSS", "Cursor AI", "Lovable"],
    },
    {
        "title": "ViziSmart (Property Management app/web)",
        "description": "Developed an AI-powered property management system with Langchain + RAG for contextual chat, a real-time voice assistant (Deepgram + OpenAI + TTS), and on-device defect detection for iOS using CoreML and a custom Swift plugin.",
        "details": "- Integrated Langchain with RAG (Retrieval Augmented Generation) using OpenAI and vector DBs\n- Custom Capacitor plugin (VisionDetectionPlugin) in Swift for video frame processing and CoreML inference\n- Detection pipeline for cracks, water damage, and structural issues\n- Containerized ML services with Docker\n- Voice assistant using Deepgram, OpenAI, and TTS in Django\n- YOLO-based defect detection (92% accuracy)\n- Vision-based defect detection for iOS using CoreML\n- Scalable LLM workflows for business problems",
        "category": "AI Project",
        "tech": ["Langchain", "RAG", "OpenAI", "Vector DBs", "Capacitor", "AVFoundation", "Docker", "Deepgram", "Django", "TTS"],
    },
    {
        "title": "DevOps Intern – Tata Consultancy Services",
        "description": "Designed and implemented CI/CD pipelines using Jenkins to automate integration and deployment. Managed Jenkins infrastructure, optimized pipeline speed, and ensured efficient build/test cycles for remote teams.",
        "details": "- Designed and implemented CI/CD pipelines using Jenkins\n- Automated code build and deployment with Jenkins plugins\n- Independently managed Jenkins infrastructure\n- Resolved failures and optimized pipeline speed\n- Ensured efficient builds, testing, and deployment cycles for remote teams",
        "category": "DevOps",
        "tech": ["Jenkins", "CI/CD", "DevOps", "Automation"],
    },
    {
        "title": "Automatic Diagnosis of Pneumonia",
        "description": "Built ML models (TensorFlow, Scikit-learn) to detect pneumonia from chest X-rays. Achieved high accuracy with advanced preprocessing, CNNs, and robust validation.",
        "details": "- Trained ML models using TensorFlow and Scikit-learn\n- Detected pneumonia from chest X-ray images\n- High diagnostic accuracy with preprocessing, feature extraction, and CNNs\n- Data cleaning, augmentation, and cross-validation for robustness",
        "category": "Data Science",
        "tech": ["TensorFlow", "Scikit-learn", "CNN", "Medical Imaging"],
    },
    {
        "title": "Online Dance Studio Platform",
        "description": "Developed a Django web app with MySQL for class bookings, user/admin roles, and scheduling. Responsive UI for seamless mobile/desktop experience.",
        "details": "- Django-based web application\n- MySQL integration for user registration, class bookings, and admin control\n- Responsive frontend UI for mobile and desktop\n- User roles and scheduling features for automated class registrations and reminders",
        "category": "Web App",
        "tech": ["Django", "MySQL", "Responsive Design"],
    },
    {
        "title": "Turf-Town – Online Turf Booking",
        "description": "Created a Django-based platform for real-time turf booking, payments, and user authentication. Designed robust database for complex event management.",
        "details": "- Django web application for turf booking\n- MySQL backend for user, slot, and event management\n- Real-time availability tracking and booking history\n- Integrated user authentication and payments",
        "category": "Web App",
        "tech": ["Django", "MySQL", "Payments", "Real-Time"],
    },
    {
        "title": "Housing in Mexico & Apartment Prices in Buenos Aires",
        "description": "Built ML models to predict property prices using Pandas and Scikit-learn. Enhanced accuracy with feature engineering and data normalization.",
        "details": "- ML models for property and apartment price prediction\n- Used Pandas and Scikit-learn\n- Feature engineering, outlier handling, and normalization\n- Improved prediction accuracy",
        "category": "Data Science",
        "tech": ["Pandas", "Scikit-learn", "Regression", "Data Science"],
    },
]

def load_portfolio_chunks():
    chunks = []
    for proj in projects:
        text = f"{proj['title']}\n{proj['description']}\n{proj['details']}\nCategory: {proj['category']}\nTech: {', '.join(proj['tech'])}"
        chunks.extend(chunk_text(text))
    return chunks

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
You are an expert AI assistant for Shubham Chougale's portfolio. 
I can help you explore his work, skills, projects, and achievements in AI, LLMs, and computer vision.

If you're looking to get in touch with Shubham, please use the Contact section on this site. For privacy reasons, I won't provide personal information like email or phone number here.

Feel free to ask about:
• AI & ML expertise
• Computer vision or LLM tools used
• Certifications and experience
• Projects and tech stack
• Skills and industry focus

Let’s dive into Shubham’s AI journey! 

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
    except Exception as e:
        answer = "Sorry, I couldn't get a response from the AI service at the moment. Please try again later."
    return Response({"answer": answer})

@api_view(['POST'])
def chat_endpoint(request):
    user_message = request.data.get("message", "")
    response = f"You said: {user_message}"
    return Response({"response": response})
