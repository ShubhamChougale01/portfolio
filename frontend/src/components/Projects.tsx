import { useState } from 'react';
import { Github } from 'lucide-react';
import rawProjects from '@/data/projects.json';
import Yolov8Img from '@/assets/project/yolov8.webp';
import PortfolioImg from '@/assets/project/Portfolio.png';
import ViziSmartImg from '@/assets/project/ViziSmart.png';
import CIImg from '@/assets/project/TCS-Virtual-Internship.webp';
import DetImg from '@/assets/project/CNN.png';
import TurfImg from '@/assets/project/turftown.png';
import DanceImg from '@/assets/project/dance.jpg';
import BuenosImg from '@/assets/project/buenos_aires.webp';

interface Repo {
  label: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  details: string;
  category: string;
  tech: string[];
  imageKey?: string;
  github?: string;
  repos?: Repo[];
  client?: string;
  featured?: boolean;
}

const imageMap: Record<string, string> = {
  yolov8: Yolov8Img,
  portfolio: PortfolioImg,
  vizismart: ViziSmartImg,
  tcs: CIImg,
  pneumonia: DetImg,
  dance: DanceImg,
  turftown: TurfImg,
  buenosaires: BuenosImg,
  placeholder: '/placeholder.svg',
};

const projects: Project[] = rawProjects as Project[];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

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
              {project.client && (
                <div className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 text-center border-b border-border">
                  {project.client}
                </div>
              )}
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {project.imageKey && imageMap[project.imageKey] && (
                  <img
                    src={imageMap[project.imageKey]}
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
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4 min-h-[32px] items-center">
                  {project.repos && project.repos.length > 0 ? (
                    project.repos.map((repo) => (
                      <a
                        key={repo.url}
                        href={repo.url}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        <span>{repo.label}</span>
                      </a>
                    ))
                  ) : project.github && project.github !== '#' ? (
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      <span>Reference</span>
                    </a>
                  ) : null}
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
              <h3 className="text-2xl font-bold mb-1 text-center">{modalProject.title}</h3>
              {modalProject.client && (
                <p className="text-center text-xs font-medium text-gray-500 mb-3">{modalProject.client}</p>
              )}
              {modalProject.imageKey && imageMap[modalProject.imageKey] && (
                <img src={imageMap[modalProject.imageKey]} alt={modalProject.title} className="w-full max-h-64 object-contain rounded mb-4" />
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
              <div className="flex flex-wrap gap-3">
                {modalProject.repos && modalProject.repos.length > 0 ? (
                  modalProject.repos.map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors text-sm font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      <span>{repo.label}</span>
                    </a>
                  ))
                ) : modalProject.github && modalProject.github !== '#' ? (
                  <a
                    href={modalProject.github}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors text-sm font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>Reference</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
