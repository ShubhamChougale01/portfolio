import DataScienceAIML from '@/assets/Certificates/Data-science-with-AIML.jpg';
import IBM from '@/assets/Certificates/IBM.pdf';
import IMedita from '@/assets/Certificates/I-medita.jpg';
import DataAnalyticsEssentials from '@/assets/Certificates/DataAnalyticsEssentials.pdf';
import CertificateComputer from '@/assets/Certificates/Certificate Course-in-Information-and-Computer.jpg';
import InnovativeResearch from '@/assets/Certificates/Innovative-research-idea-vck.jpg';
import InternalHackathon from '@/assets/Certificates/Internal Hackathon.jpg';
import NationalLevelTechEvent from '@/assets/Certificates/National-level-tech-event(sharad).jpg';
import NewHorizon from '@/assets/Certificates/New-horizon-2k20.jpg';
import OneDayInternational from '@/assets/Certificates/One-day-international-competition.jpg';
import ResearchPublication from '@/assets/Certificates/Research Publication Certificate – AJANTA Journal (ISSN 2277-5730).jpg';
import { useState } from 'react';

const Skills = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ type: 'image' | 'pdf', src: string, title: string } | null>(null);
  const skillCategories = [
    {
      title: "Programming Languages",
      color: "from-cyan-400 to-cyan-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "Terraform", level: 60 },
        { name: "Swift", level: 40 },
        { name: "TypeScript", level: 40 }
      ]
    },
    {
      title: "Artificial Intelligence",
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "LangChain", level: 90 },
        { name: "OpenAI & Mistral", level: 88 },
        { name: "RAG", level: 88 },
        { name: "Vector DBs", level: 85 },
        { name: "AI Agents", level: 82 }
      ]
    },
    {
      title: "Computer Vision",
      color: "from-green-400 to-green-600",
      skills: [
        { name: "Ultralytics", level: 90 },
        { name: "Object Detection", level: 90 },
        { name: "Image Classification", level: 85 },
        { name: "Roboflow", level: 85 },
        { name: "Video Processing", level: 85 }
      ]
    },
    {
      title: "Data Science",
      color: "from-blue-400 to-blue-600",
      skills: [
        { name: "TensorFlow", level: 70 },
        { name: "PyTorch", level: 70 },
        { name: "OpenCV", level: 70 },
        { name: "CoreML", level: 40 }
      ]
    },
    {
      title: "Cloud Platforms",
      color: "from-orange-400 to-orange-600",
      skills: [
        { name: "AWS", level: 78 },
        { name: "Docker", level: 70 },
        { name: "Jenkins CI/CD", level: 70 },
        { name: "Kubernetes", level: 60 }
        // { name: "MLOps", level: 82 }
      ]
    },
    {
      title: "General Skills:",
      color: "from-teal-400 to-teal-600",
      skills: [
        { name: "Django", level: 80 },
        { name: "FastAPI", level: 75 },
        { name: "GIT", level: 75 },
        { name: "Capacitor", level: 40 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-card p-6 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium text-sm">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Language Proficiency Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Language Proficiency
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="font-medium">English</span>
              <span className="text-muted-foreground text-sm">Professional</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="font-medium">Hindi</span>
              <span className="text-muted-foreground text-sm">Professional</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="font-medium">Marathi</span>
              <span className="text-muted-foreground text-sm">Native</span>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "AWS Machine Learning", provider: "Amazon", year: "2023" },
              { name: "TensorFlow Developer", provider: "Google", year: "2023" },
              { name: "Deep Learning Specialization", provider: "Coursera", year: "2022" },
              { name: "Computer Vision Nanodegree", provider: "Udacity", year: "2022" }
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 font-semibold text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-muted-foreground text-xs mb-1">
                  {cert.provider}
                </div>
                <div className="text-muted-foreground/70 text-xs">
                  {cert.year}
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "SnowPro Core Certification",
                provider: "Snowflake",
                year: "Aug 2024 – Aug 2026",
                id: "SNOW00300789‎",
                link: "https://achieve.snowflake.com/63e2e2f2-548d-4e11-afd7-8f357820e5ad#acc.8BAykW6u",
                external: true
              },
              {
                name: "Hands-On Essentials: Collaboration, Marketplace & Cost Estimation",
                provider: "Snowflake",
                year: "Apr 2024",
                id: "100383374",
                link: "https://achieve.snowflake.com/d27e706b-0a6d-4381-a9ef-a6a403a8c117#acc.JWsD3QHM",
                external: true
              },
              {
                name: "Hands-On Essentials: Data Warehousing",
                provider: "Snowflake",
                year: "Mar 2024",
                id: "98109249",
                link: "https://achieve.snowflake.com/4f304415-d2b2-4b52-8506-fbb1ce68a9e5#acc.2hoTxf8n",
                external: true
              },
              {
                name: "Data Science with AIML",
                provider: "Dohme Global Group AMZ",
                year: "Dec 2019",
                id: "AMZ/WTP-DS/2019/06",
                link: DataScienceAIML
              },
              {
                name: "Python for Data Science",
                provider: "IBM",
                year: "Jul 2023",
                link: IBM
              },
              {
                name: "Basics of Networking",
                provider: "I-Medita Learning Solutions",
                year: "Mar 2022",
                link: IMedita
              },
              {
                name: "Data Analytics Essentials",
                provider: "Cisco",
                year: "Jul 2023",
                link: DataAnalyticsEssentials
              },
              {
                name: "Certificate in Computer Basics",
                provider: "Vivekanand College, Kolhapur",
                year: "May 2019",
                link: CertificateComputer
              },
              {
                name: "Innovative Research Idea",
                provider: "Vivekanand College, Kolhapur",
                year: "2020",
                link: InnovativeResearch
              },
              {
                name: "Internal Hackathon",
                provider: "Vivekanand College, Kolhapur",
                year: "2020",
                link: InternalHackathon
              },
              {
                name: "National Level Tech Event (Sharad)",
                provider: "Sharad Institute",
                year: "2020",
                link: NationalLevelTechEvent
              },
              {
                name: "New Horizon 2K20",
                provider: "Vivekanand College, Kolhapur",
                year: "2020",
                link: NewHorizon
              },
              {
                name: "One Day International Competition",
                provider: "Vivekanand College, Kolhapur",
                year: "2020",
                link: OneDayInternational
              },
              {
                name: "Research Publication Certificate – AJANTA Journal (ISSN 2277-5730)",
                provider: "AJANTA Journal",
                year: "2020",
                link: ResearchPublication
              }
            ].map((cert, index) => {
                // Determine if the certificate should have a flip effect
                const isFlippable = !!cert.link;
                // Determine if the link is a local file (image/pdf) or external
                const isLocal = cert.link && (cert.link.endsWith('.jpg') || cert.link.endsWith('.jpeg') || cert.link.endsWith('.png') || cert.link.endsWith('.pdf'));
                return isFlippable ? (
                  <div
                    key={index}
                    className="relative group [perspective:1000px]"
                    style={{ minHeight: '180px' }}
                  >
                    <div className="transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] w-full h-full">
                      {/* Front Side */}
                      <div className="absolute inset-0 bg-card p-4 rounded-lg border border-border text-center hover:border-blue-500/50 transition-all duration-300 [backface-visibility:hidden] flex flex-col justify-center">
                        <div className="text-blue-400 font-semibold text-sm mb-1">
                          {cert.name}
                        </div>
                        <div className="text-muted-foreground text-xs mb-1">
                          {cert.provider}
                        </div>
                        <div className="text-muted-foreground/70 text-xs mb-1">
                          {cert.year}
                        </div>
                        {cert.id && (
                          <div className="text-muted-foreground/60 text-[10px] italic mb-1">
                            ID: {cert.id}
                          </div>
                        )}
                      </div>
                      {/* Back Side */}
                      <div
                        className="absolute inset-0 bg-card p-4 rounded-lg border border-border text-center flex flex-col justify-center items-center [transform:rotateY(180deg)] [backface-visibility:hidden] cursor-pointer"
                        onClick={() => {
                          if (cert.link && typeof cert.link === 'string') {
                            if (cert.link.endsWith('.pdf')) {
                              setModalContent({ type: 'pdf', src: cert.link, title: cert.name });
                              setModalOpen(true);
                            } else if (cert.link.endsWith('.jpg') || cert.link.endsWith('.jpeg') || cert.link.endsWith('.png')) {
                              setModalContent({ type: 'image', src: cert.link, title: cert.name });
                              setModalOpen(true);
                            } else if (cert.external) {
                              setModalContent({ type: 'pdf', src: cert.link, title: cert.name });
                              setModalOpen(true);
                            }
                          }
                        }}
                      >
                        {isLocal ? (
                          cert.link.endsWith('.pdf') ? (
                            <div className="w-full flex flex-col items-center">
                              <span className="mb-2 text-blue-500 underline text-sm font-semibold">Click to preview PDF</span>
                            </div>
                          ) : (
                            <img
                              src={cert.link}
                              alt={cert.name}
                              className="max-h-32 rounded shadow mb-2 mx-auto"
                            />
                          )
                        ) : cert.external ? (
                          <span className="text-blue-500 underline text-sm font-semibold">Click to preview certificate</span>
                        ) : (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-sm font-semibold"
                            onClick={e => e.stopPropagation()}
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="bg-card p-4 rounded-lg border border-border text-center hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="text-blue-400 font-semibold text-sm mb-1">
                      {cert.name}
                    </div>
                    <div className="text-muted-foreground text-xs mb-1">
                      {cert.provider}
                    </div>
                    <div className="text-muted-foreground/70 text-xs mb-1">
                      {cert.year}
                    </div>
                    {cert.id && (
                      <div className="text-muted-foreground/60 text-[10px] italic mb-1">
                        ID: {cert.id}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {modalOpen && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>&times;</button>
            <h3 className="text-lg font-semibold mb-4 text-center">{modalContent.title}</h3>
            {modalContent.type === 'image' ? (
              <img src={modalContent.src} alt={modalContent.title} className="w-full max-h-[70vh] object-contain rounded" />
            ) : (
              <iframe src={modalContent.src} title={modalContent.title} className="w-full h-[70vh] rounded" />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
