import { useState } from 'react';
import { Github } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: "AI-Powered Property Defect Detection",
      description: "Computer vision system using YOLOv8 for real-time detection of property defects on mobile devices. Achieved 92% accuracy with edge deployment.",
      category: "Computer Vision",
      tech: ["YOLOv8", "CoreML", "iOS", "Python", "OpenCV"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Intelligent Property Management RAG System",
      description: "LLM-powered assistant using RAG architecture for property management queries. Integrated with LangChain and OpenAI for contextual responses.",
      category: "LLM/NLP",
      tech: ["LangChain", "OpenAI", "RAG", "Python", "FastAPI"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Real-time Speech Analytics Platform",
      description: "Voice processing pipeline using Deepgram and Whisper for real-time transcription and sentiment analysis in customer service applications.",
      category: "Speech AI",
      tech: ["Deepgram", "Whisper", "Python", "WebRTC", "React"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Mobile ML Pipeline with Capacitor",
      description: "Cross-platform mobile app with on-device ML inference. Custom Capacitor plugins for seamless iOS/Android deployment.",
      category: "Edge AI",
      tech: ["Capacitor", "TensorFlow Lite", "React Native", "Swift", "Kotlin"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Automated Data Pipeline ETL",
      description: "Scalable ETL pipeline for processing large datasets with automated ML model training and deployment using MLOps best practices.",
      category: "MLOps",
      tech: ["Apache Airflow", "Docker", "AWS", "Jenkins", "Python"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Generative AI Content Assistant",
      description: "Multi-modal AI assistant combining text, image, and voice generation capabilities for content creation workflows.",
      category: "Generative AI",
      tech: ["OpenAI", "DALL-E", "Stable Diffusion", "React", "Node.js"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#",
      featured: true
    }
  ];

  const categories = ['All', 'Computer Vision', 'LLM/NLP', 'Speech AI', 'Edge AI', 'MLOps', 'Generative AI'];

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
              
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-muted-foreground text-4xl font-bold opacity-20">
                  {project.category.split(' ')[0]}
                </div>
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
                
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors text-sm"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com"
            className="inline-flex items-center space-x-2 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg border border-border hover:border-blue-500 transition-all duration-300"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
