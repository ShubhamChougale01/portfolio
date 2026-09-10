import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Share2, X, Award, FileText } from 'lucide-react';
import CrewAICourseProgress from '@/assets/Certificates/CrewAI-Course-Progress.png';
import IntroToMCP from '@/assets/Certificates/Intro-to-MCP.jpg';
import ClaudeCodeInAction from '@/assets/Certificates/Claude-Code-in-Action.jpg';
import IntroToAgentSkills from '@/assets/Certificates/Intro-to-Agent-Skills.jpg';
import ClaudeCode101 from '@/assets/Certificates/Claude-Code-101.jpg';
import Claude101 from '@/assets/Certificates/Claude-101.jpg';
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

const CATEGORY_STYLES: Record<string, string> = {
  'AI & LLM': 'bg-[#A855F7]/15 text-[#A855F7] border-[#A855F7]/30',
  Snowflake: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
  'Data & Analytics': 'bg-[#34D399]/15 text-[#34D399] border-[#34D399]/30',
  Programming: 'bg-[#60A5FA]/15 text-[#60A5FA] border-[#60A5FA]/30',
  Academic: 'bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/30',
  Events: 'bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30',
};

const CERTIFICATIONS = [
  {
    name: 'Introduction to Model Context Protocol',
    provider: 'Anthropic Education',
    year: 'April 2026',
    category: 'AI & LLM',
    link: IntroToMCP,
  },
  {
    name: 'Claude Code in Action',
    provider: 'Anthropic Education',
    year: 'April 2026',
    category: 'AI & LLM',
    link: ClaudeCodeInAction,
  },
  {
    name: 'Introduction to Agent Skills',
    provider: 'Anthropic Education',
    year: 'April 2026',
    category: 'AI & LLM',
    link: IntroToAgentSkills,
  },
  {
    name: 'Claude Code 101',
    provider: 'Anthropic Education',
    year: 'April 2026',
    category: 'AI & LLM',
    link: ClaudeCode101,
  },
  {
    name: 'Claude 101',
    provider: 'Anthropic Education',
    year: 'April 2026',
    category: 'AI & LLM',
    link: Claude101,
  },
  {
    name: 'Multi AI Agent Systems with crewAI',
    provider: 'Deeplearning.ai',
    year: 'July 2025',
    category: 'AI & LLM',
    courseLink: 'https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai/',
    link: CrewAICourseProgress,
  },
  {
    name: 'Large Language Models with Semantic Search',
    provider: 'Cohere / DeepLearning.AI',
    year: 'July 2025',
    category: 'AI & LLM',
    link: 'https://learn.deeplearning.ai/accomplishments/a6befed3-0058-4fd3-be91-3595cb8a6704',
    external: true,
  },
  {
    name: 'SnowPro Core Certification',
    provider: 'Snowflake',
    year: 'Aug 2024 – Aug 2026',
    category: 'Snowflake',
    id: 'SNOW00300789',
    link: 'https://achieve.snowflake.com/63e2e2f2-548d-4e11-afd7-8f357820e5ad#acc.8BAykW6u',
    external: true,
  },
  {
    name: 'Hands-On Essentials: Collaboration, Marketplace & Cost Estimation',
    provider: 'Snowflake',
    year: 'Apr 2024',
    category: 'Snowflake',
    id: '100383374',
    link: 'https://achieve.snowflake.com/d27e706b-0a6d-4381-a9ef-a6a403a8c117#acc.JWsD3QHM',
    external: true,
  },
  {
    name: 'Hands-On Essentials: Data Warehousing',
    provider: 'Snowflake',
    year: 'Mar 2024',
    category: 'Snowflake',
    id: '98109249',
    link: 'https://achieve.snowflake.com/4f304415-d2b2-4b52-8506-fbb1ce68a9e5#acc.2hoTxf8n',
    external: true,
  },
  {
    name: 'Data Science with AIML',
    provider: 'Dohme Global Group AMZ',
    year: 'Dec 2019',
    category: 'Data & Analytics',
    id: 'AMZ/WTP-DS/2019/06',
    link: DataScienceAIML,
  },
  {
    name: 'Python for Data Science',
    provider: 'IBM',
    year: 'Jul 2023',
    category: 'Data & Analytics',
    link: IBM,
  },
  {
    name: 'Data Analytics Essentials',
    provider: 'Cisco',
    year: 'Jul 2023',
    category: 'Data & Analytics',
    link: DataAnalyticsEssentials,
  },
  {
    name: 'Basics of Networking',
    provider: 'I-Medita Learning Solutions',
    year: 'Mar 2022',
    category: 'Programming',
    link: IMedita,
  },
  {
    name: 'Certificate in Computer Basics',
    provider: 'Vivekanand College, Kolhapur',
    year: 'May 2019',
    category: 'Programming',
    link: CertificateComputer,
  },
  {
    name: 'Innovative Research Idea',
    provider: 'Vivekanand College, Kolhapur',
    year: '2020',
    category: 'Academic',
    link: InnovativeResearch,
  },
  {
    name: 'Research Publication Certificate – AJANTA Journal (ISSN 2277-5730)',
    provider: 'AJANTA Journal',
    year: '2020',
    category: 'Academic',
    link: ResearchPublication,
  },
  {
    name: 'Internal Hackathon',
    provider: 'Vivekanand College, Kolhapur',
    year: '2020',
    category: 'Events',
    link: InternalHackathon,
  },
  {
    name: 'National Level Tech Event (Sharad)',
    provider: 'Sharad Institute',
    year: '2020',
    category: 'Events',
    link: NationalLevelTechEvent,
  },
  {
    name: 'New Horizon 2K20',
    provider: 'Vivekanand College, Kolhapur',
    year: '2020',
    category: 'Events',
    link: NewHorizon,
  },
  {
    name: 'One Day International Competition',
    provider: 'Vivekanand College, Kolhapur',
    year: '2020',
    category: 'Events',
    link: OneDayInternational,
  },
];

const CERT_CATEGORIES = ['All', 'AI & LLM', 'Snowflake', 'Data & Analytics', 'Programming', 'Academic', 'Events'];
const INITIAL_VISIBLE = 8;

type Cert = (typeof CERTIFICATIONS)[number];

function isPdf(link: string) {
  return link.endsWith('.pdf');
}

function isLocalFile(cert: Cert) {
  return !cert.external;
}

function CertThumb({ cert, iconSize = 40 }: { cert: Cert; iconSize?: number }) {
  const local = isLocalFile(cert);
  const pdf = local && isPdf(cert.link);
  if (local && !pdf) {
    return <img src={cert.link} alt={cert.name} className="w-full h-full object-contain" />;
  }
  if (pdf) {
    return <FileText className="text-white/30" size={iconSize} />;
  }
  return <Award className="text-white/30" size={iconSize} />;
}

function CertActions({ cert, onShare }: { cert: Cert; onShare: (url: string) => void }) {
  const local = isLocalFile(cert);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {local && (
        <a
          href={cert.link}
          download
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
        >
          <Download size={14} /> Download
        </a>
      )}
      {local && (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs font-medium transition-colors"
        >
          <ExternalLink size={14} /> Open in New Tab
        </a>
      )}
      {'courseLink' in cert && cert.courseLink && (
        <a
          href={cert.courseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
        >
          <ExternalLink size={14} /> View Course
        </a>
      )}
      {!local && (
        <>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs font-medium transition-colors"
          >
            <ExternalLink size={14} /> Open in New Tab
          </a>
          <button
            onClick={() => onShare(cert.link)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
        </>
      )}
    </div>
  );
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const skillCategories = [
    {
      title: "Programming Languages",
      color: "from-cyan-400 to-cyan-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "PostgreSQL / SQL", level: 90 },
        { name: "Terraform", level: 60 },
        { name: "TypeScript", level: 45 },
        { name: "Swift", level: 40 }
      ]
    },
    {
      title: "AI & Agentic Systems",
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "Claude API", level: 92 },
        { name: "MCP / FastMCP", level: 90 },
        { name: "LangChain", level: 90 },
        { name: "LangGraph", level: 85 },
        { name: "RAG", level: 88 },
        { name: "CrewAI", level: 80 },
        { name: "Vector DBs", level: 85 },
        { name: "Groq", level: 82 },
        { name: "Neo4j / Knowledge Graphs", level: 80 },
        { name: "OpenAI & Mistral", level: 88 },
        { name: "Langfuse", level: 75 },
        { name: "LangSmith", level: 75 },
        { name: "FAISS", level: 78 },
        { name: "AI Agents", level: 82 }
      ]
    },
    {
      title: "Voice AI",
      color: "from-pink-400 to-pink-600",
      skills: [
        { name: "ElevenLabs", level: 80 },
        { name: "Deepgram (STT/TTS)", level: 80 },
        { name: "Pipecat", level: 78 },
        { name: "Real-time Voice Pipelines", level: 78 },
        { name: "AssemblyAI", level: 65 },
        { name: "OpenAI TTS", level: 65 },
        { name: "Sarvam", level: 60 },
        { name: "gTTS", level: 50 }
      ]
    },
    {
      title: "Computer Vision",
      color: "from-green-400 to-green-600",
      skills: [
        { name: "YOLOv8 / Ultralytics", level: 90 },
        { name: "Object Detection", level: 90 },
        { name: "Image Classification", level: 85 },
        { name: "Roboflow", level: 85 },
        { name: "CoreML", level: 40 }
      ]
    },
    {
      title: "Data Science",
      color: "from-blue-400 to-blue-600",
      skills: [
        { name: "TensorFlow", level: 70 },
        { name: "PyTorch", level: 70 },
        { name: "OpenCV", level: 70 }
      ]
    },
    {
      title: "Cloud & DevOps",
      color: "from-orange-400 to-orange-600",
      skills: [
        { name: "AWS", level: 78 },
        { name: "Google Cloud", level: 65 },
        { name: "Docker", level: 75 },
        { name: "Jenkins CI/CD", level: 70 },
        { name: "Playwright", level: 60 }
      ]
    },
    {
      title: "Backend & General",
      color: "from-teal-400 to-teal-600",
      skills: [
        { name: "FastAPI", level: 88 },
        { name: "Django", level: 80 },
        { name: "Pydantic", level: 78 },
        { name: "SQLAlchemy / Alembic", level: 72 },
        { name: "AI Agent Testing & Evals", level: 75 },
        { name: "Supabase", level: 70 },
        { name: "WebSocket", level: 70 },
        { name: "Git", level: 75 },
        { name: "Streamlit", level: 65 },
        { name: "Capacitor", level: 40 }
      ]
    }
  ];

  const filteredCerts = activeCategory === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === activeCategory);
  const visibleCerts = showAllCerts ? filteredCerts : filteredCerts.slice(0, INITIAL_VISIBLE);
  const activeCert: Cert | null = filteredCerts[currentIndex] ?? filteredCerts[0] ?? null;

  const selectCertAt = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };
  const goPrev = () => setCurrentIndex((i) => (i - 1 + filteredCerts.length) % filteredCerts.length);
  const goNext = () => setCurrentIndex((i) => (i + 1) % filteredCerts.length);

  useEffect(() => {
    setCurrentIndex(0);
    setShowAllCerts(false);
  }, [activeCategory]);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, filteredCerts.length]);

  const handleShare = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Certificate link copied to clipboard!');
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <>
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
      </div>
    </section>

    {/* Certifications Section — its own full-bleed dark section, no boxed border */}
    <section className="relative overflow-hidden py-20 md:py-24 bg-[#030712]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(560px circle at 8% 10%, rgba(79,140,255,0.12), transparent 62%),' +
              'radial-gradient(600px circle at 92% 85%, rgba(139,92,246,0.10), transparent 62%)',
          }}
        />
      </div>
      <div className="relative container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="hidden sm:block w-8 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
              Learning Never Stops
            </span>
            <span className="hidden sm:block w-8 h-px bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Certifications &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-white/60 text-center max-w-xl mx-auto mb-8">
            Courses, certifications and recognitions that have shaped my journey in AI, data and technology.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {CERT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/50 hover:text-white/80 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="flex items-center justify-center gap-2 text-white/40 text-xs mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            {filteredCerts.length} milestone{filteredCerts.length === 1 ? '' : 's'}
          </p>

          {/* Certificate cards — the certificate image is the hero */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {visibleCerts.map((cert, index) => (
              <div
                key={cert.name}
                onClick={() => selectCertAt(index)}
                className="group cursor-pointer bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#4F8CFF]/40"
                style={{ transition: 'transform 300ms, border-color 300ms, box-shadow 300ms' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(79,140,255,0.18), 0 0 45px rgba(155,92,255,0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="relative h-52 bg-black/20 overflow-hidden flex items-center justify-center p-4">
                  <div className="transition-transform duration-300 group-hover:scale-[1.03] w-full h-full flex items-center justify-center">
                    <CertThumb cert={cert} iconSize={44} />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={18} className="text-white" />
                    <span className="text-white text-xs font-medium">View certificate</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1 min-h-[2.5rem]">
                    {cert.name}
                  </h3>
                  <p className="text-white/60 text-xs mb-0.5">{cert.provider}</p>
                  <p className="text-white/40 text-xs mb-1">{cert.year}</p>
                  {'id' in cert && cert.id && (
                    <p className="text-white/30 text-[10px] italic mb-2">ID: {cert.id}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[cert.category] ?? 'bg-white/10 text-white/60 border-white/20'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {cert.category}
                    </span>
                    <ExternalLink size={13} className="text-white/40 group-hover:text-[#4F8CFF] transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCerts.length === 0 && (
            <p className="text-white/40 text-sm text-center py-12">No certificates in this category yet.</p>
          )}

          {!showAllCerts && filteredCerts.length > INITIAL_VISIBLE && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAllCerts(true)}
                className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-colors duration-200"
              >
                Load More Certifications ↓
              </button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              ✦ A collection of milestones that shaped my journey in AI, data &amp; technology.
            </p>
          </div>
      </div>

      {/* Certificate preview modal */}
      {modalOpen && activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#0b0e1a] text-white rounded-xl shadow-2xl max-w-lg w-full relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h3 className="text-base font-semibold pr-4">{activeCert.name}</h3>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="text-white/60 hover:text-white transition-colors flex-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative p-5">
              {filteredCerts.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous certificate"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next certificate"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              <div className="rounded bg-white/90 flex items-center justify-center min-h-[240px] p-3">
                {isLocalFile(activeCert) && !isPdf(activeCert.link) && (
                  <img src={activeCert.link} alt={activeCert.name} className="max-w-full max-h-[50vh] object-contain" />
                )}
                {isLocalFile(activeCert) && isPdf(activeCert.link) && (
                  <iframe src={activeCert.link} title={activeCert.name} className="w-full h-[50vh] rounded" />
                )}
                {!isLocalFile(activeCert) && (
                  'embeddable' in activeCert && activeCert.embeddable === true ? (
                    <iframe src={activeCert.link} title={activeCert.name} className="w-full h-[50vh] rounded" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-10">
                      <Award className="text-black/20" size={40} />
                      <p className="text-center text-xs text-black/50 max-w-xs">
                        This verification provider doesn't allow its pages to be previewed inside another site.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-5 pb-3 text-xs text-white/50">
              <span>{activeCert.provider} · {activeCert.year}</span>
              <span>{currentIndex + 1} / {filteredCerts.length}</span>
            </div>

            <div className="flex justify-center px-5 pb-5">
              <CertActions cert={activeCert} onShare={handleShare} />
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Skills;
