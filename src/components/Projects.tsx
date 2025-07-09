import { useState } from 'react';
import { Github } from 'lucide-react';
import Yolov8Img from '@/assets/project/yolov8.webp';
import PortfolioImg from '@/assets/project/Portfolio.png';
import ViziSmartImg from '@/assets/project/ViziSmart.png';
import CIImg from '@/assets/project/CI:CD.avif';
import DetImg from '@/assets/project/DET.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  const projects = [
    {
      title: "Property Defect Detection (iOS)",
      description: `An iOS app for detecting structural defects like cracks and water damage using on-device YOLOv8 models converted to CoreML. Built with SwiftUI, it runs real-time detection fully offline with image input, class labels, and confidence scores.`,
      details: `- Real-time object detection (YOLOv8, CoreML)\n- Image selection from gallery or camera\n- Fallback class labels if model metadata is missing\n- 100% on-device, no server required\n- Key files: defectdettestApp.swift, ContentView.swift, defect_detect.pt, DefectDetectionModel.mlmodel, defect_detect.mlpackage\n- Tech: SwiftUI, CoreML, YOLOv8, PyTorch, AVFoundation (optional)\n- Model: 640x640 RGB input, bounding boxes + class labels + confidence\n- License: MIT (see Ultralytics License)`,
      category: "Computer Vision",
      tech: ["YOLOv8", "CoreML", "SwiftUI", "iOS", "PyTorch"],
      image: Yolov8Img,
      github: "https://github.com/ShubhamChougale01/defectdettest",
      featured: true
    },
    {
      title: "Developer Portfolio",
      description: `A modern, interactive developer portfolio built with React, Vite, and Tailwind CSS. Features advanced UI/UX, project showcases, and integrated AI tools like Cursor and Lovable for code assistance and tagging. Includes a dynamic skills section, certifications, and live project previews.`,
      details: `- Built with React, Vite, and Tailwind CSS\n- Integrated Cursor AI and Lovable for code assistance and tagging\n- Dynamic skills, certifications, and project showcase\n- Modern, responsive design\n- Open source on GitHub`,
      category: "Portfolio",
      tech: ["React", "Vite", "Tailwind CSS", "Cursor AI", "Lovable"],
      image: PortfolioImg,
      github: "https://github.com/ShubhamChougale01/portfolio",
      featured: true
    },
    {
      title: "ViziSmart (Property Management app/web)",
      description: `Developed an AI-powered property management system with Langchain + RAG for contextual chat, a real-time voice assistant (Deepgram + OpenAI + TTS), and on-device defect detection for iOS using CoreML and a custom Swift plugin.`,
      details: `- Integrated Langchain with RAG (Retrieval Augmented Generation) using OpenAI and vector DBs\n- Custom Capacitor plugin (VisionDetectionPlugin) in Swift for video frame processing and CoreML inference\n- Detection pipeline for cracks, water damage, and structural issues\n- Containerized ML services with Docker\n- Voice assistant using Deepgram, OpenAI, and TTS in Django\n- YOLO-based defect detection (92% accuracy)\n- Vision-based defect detection for iOS using CoreML\n- Scalable LLM workflows for business problems`,
      category: "AI Project",
      tech: ["Langchain", "RAG", "OpenAI", "Vector DBs", "Capacitor", "AVFoundation", "Docker", "Deepgram", "Django", "TTS"],
      image: ViziSmartImg,
      github: "https://www.vizismart.com/",
      featured: true
    },
    {
      title: "DevOps Intern – Tata Consultancy Services",
      description: `Designed and implemented CI/CD pipelines using Jenkins to automate integration and deployment. Managed Jenkins infrastructure, optimized pipeline speed, and ensured efficient build/test cycles for remote teams.`,
      details: `- Designed and implemented CI/CD pipelines using Jenkins\n- Automated code build and deployment with Jenkins plugins\n- Independently managed Jenkins infrastructure\n- Resolved failures and optimized pipeline speed\n- Ensured efficient builds, testing, and deployment cycles for remote teams`,
      category: "DevOps",
      tech: ["Jenkins", "CI/CD", "DevOps", "Automation"],
      image: CIImg,
      github: "#",
      featured: false
    },
    {
      title: "Automatic Diagnosis of Pneumonia",
      description: `Built ML models (TensorFlow, Scikit-learn) to detect pneumonia from chest X-rays. Achieved high accuracy with advanced preprocessing, CNNs, and robust validation.`,
      details: `- Trained ML models using TensorFlow and Scikit-learn\n- Detected pneumonia from chest X-ray images\n- High diagnostic accuracy with preprocessing, feature extraction, and CNNs\n- Data cleaning, augmentation, and cross-validation for robustness`,
      category: "Data Science",
      tech: ["TensorFlow", "Scikit-learn", "CNN", "Medical Imaging"],
      image: DetImg,
      github: "#",
      featured: false
    },
    {
      title: "Online Dance Studio Platform – V&N Entertainment",
      description: `Developed a Django web app with MySQL for class bookings, user/admin roles, and scheduling. Responsive UI for seamless mobile/desktop experience.`,
      details: `- Django-based web application\n- MySQL integration for user registration, class bookings, and admin control\n- Responsive frontend UI for mobile and desktop\n- User roles and scheduling features for automated class registrations and reminders`,
      category: "Web App",
      tech: ["Django", "MySQL", "Responsive Design"],
      image: CIImg,
      github: "#",
      featured: false
    },
    {
      title: "Turf-Town – Online Turf Booking",
      description: `Created a Django-based platform for real-time turf booking, payments, and user authentication. Designed robust database for complex event management.`,
      details: `- Django web application for turf booking\n- MySQL backend for user, slot, and event management\n- Real-time availability tracking and booking history\n- Integrated user authentication and payments`,
      category: "Web App",
      tech: ["Django", "MySQL", "Payments", "Real-Time"],
      image: CIImg,
      github: "#",
      featured: false
    },
    {
      title: "Housing in Mexico & Apartment Prices in Buenos Aires",
      description: `Built ML models to predict property prices using Pandas and Scikit-learn. Enhanced accuracy with feature engineering and data normalization.`,
      details: `- ML models for property and apartment price prediction\n- Used Pandas and Scikit-learn\n- Feature engineering, outlier handling, and normalization\n- Improved prediction accuracy`,
      category: "Data Science",
      tech: ["Pandas", "Scikit-learn", "Regression", "Data Science"],
      image: CIImg,
      github: "#",
      featured: false
    }
  ];

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category)))
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl overflow-hidden border border-border hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                project.featured ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              {project.featured && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 text-center">
                  FEATURED PROJECT
                </div>
              )}
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3 mb-4">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                  <button
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium underline"
                    onClick={() => setModalProject(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Project Details */}
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setModalProject(null)}>
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-900" onClick={() => setModalProject(null)}>&times;</button>
              <h3 className="text-2xl font-bold mb-4 text-center">{modalProject.title}</h3>
              {modalProject.image && (
                <img src={modalProject.image} alt={modalProject.title} className="w-full max-h-64 object-contain rounded mb-4" />
              )}
              <p className="text-muted-foreground text-base mb-4 whitespace-pre-line">{modalProject.details || modalProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {modalProject.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {modalProject.github && modalProject.github !== '#' && (
                <a
                  href={modalProject.github}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors text-sm font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  <span>Reference</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
