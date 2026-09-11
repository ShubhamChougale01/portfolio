import { useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { Github, ExternalLink, ArrowUpRight, Star, X, Layers } from 'lucide-react';
import rawProjects from '@/data/projects.json';
import Yolov8Img from '@/assets/project/yolov8.webp';
import PortfolioImg from '@/assets/project/Portfolio.webp';
import ViziSmartImg from '@/assets/project/ViziSmart.webp';
import CIImg from '@/assets/project/TCS-Virtual-Internship.webp';
import DetImg from '@/assets/project/CNN.webp';
import TurfImg from '@/assets/project/turftown.webp';
import DanceImg from '@/assets/project/dance.webp';
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

// Full class strings so Tailwind's scanner picks them up — don't interpolate.
const CATEGORY_ACCENTS: Record<string, string> = {
  'AI Project': 'bg-violet-500/15 text-violet-200 border-violet-400/30',
  'Computer Vision': 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
  'Web App': 'bg-blue-500/15 text-blue-200 border-blue-400/30',
  DevOps: 'bg-amber-500/15 text-amber-200 border-amber-400/30',
  'Data Science': 'bg-cyan-500/15 text-cyan-200 border-cyan-400/30',
  Portfolio: 'bg-pink-500/15 text-pink-200 border-pink-400/30',
};

const FALLBACK_ACCENT = 'bg-white/10 text-slate-300 border-white/20';
const INITIAL_VISIBLE = 9;

// Most projects (client/confidential work especially) ship no screenshot. Rather
// than 14 identical grey placeholders, generate a branded cover per project.
const COVER_GRADIENTS: Record<string, [string, string]> = {
  'AI Project': ['rgba(139,92,246,0.55)', 'rgba(79,140,255,0.28)'],
  'Computer Vision': ['rgba(16,185,129,0.5)', 'rgba(34,211,238,0.25)'],
  'Web App': ['rgba(59,130,246,0.5)', 'rgba(99,102,241,0.25)'],
  DevOps: ['rgba(245,158,11,0.45)', 'rgba(249,115,22,0.22)'],
  'Data Science': ['rgba(34,211,238,0.45)', 'rgba(59,130,246,0.25)'],
  Portfolio: ['rgba(236,72,153,0.45)', 'rgba(139,92,246,0.25)'],
};

const SKIP_WORDS = new Set(['a', 'an', 'the', 'of', 'for', 'and', '&', '—', '-', '/']);

function monogram(title: string) {
  return title
    .split(/[\s—–-]+/)
    .filter((word) => word && !SKIP_WORDS.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function realImage(project: Project) {
  if (!project.imageKey || project.imageKey === 'placeholder') return null;
  return imageMap[project.imageKey] ?? null;
}

function ProjectCover({ project, className }: { project: Project; className: string }) {
  const src = realImage(project);
  if (src) {
    return (
      <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className={className} />
    );
  }

  const [from, to] = COVER_GRADIENTS[project.category] ?? ['rgba(148,163,184,0.4)', 'rgba(71,85,105,0.2)'];
  return (
    <div
      aria-hidden="true"
      className={`${className} flex items-center justify-center`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 55%, rgba(3,7,18,0.9) 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%)',
        }}
      />
      <span className="relative text-white/25 font-bold tracking-tight text-5xl select-none">
        {monogram(project.title)}
      </span>
    </div>
  );
}

// `details` arrives as newline-separated "- " bullets.
function detailLines(details: string) {
  return details
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
}

function repoLinks(project: Project): Repo[] {
  if (project.repos?.length) return project.repos;
  if (project.github && project.github !== '#') return [{ label: 'Reference', url: project.github }];
  return [];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [spotlight, setSpotlight] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const featured = projects.filter((p) => p.featured);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  // Traps Tab inside the dialog, restores focus to the card that opened it,
  // locks background scroll, and owns Escape.
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, modalProject !== null, () => setModalProject(null));

  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-24 bg-[#030712]">
      {/* Ambient background — decorative only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(640px circle at 92% 6%, rgba(79,140,255,0.12), transparent 60%),' +
              'radial-gradient(600px circle at 6% 40%, rgba(155,92,255,0.09), transparent 60%),' +
              'radial-gradient(700px circle at 70% 96%, rgba(34,211,238,0.06), transparent 60%)',
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase">
              Work
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
            Production systems, client engagements and experiments — from agent platforms and MCP
            servers to on-device vision.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Layers size={14} className="text-blue-400" />
              {projects.length} projects
            </span>
            <span className="inline-flex items-center gap-2">
              <Star size={14} className="text-violet-400" />
              {featured.length} featured
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {categories.length - 1} categories
            </span>
          </div>
        </div>

        {/* Spotlight rail — expanding panels, shown only on the unfiltered view */}
        {activeFilter === 'All' && featured.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
                Spotlight
              </span>
              <span className="flex-1 h-px bg-white/[0.07]" />
              <span className="hidden sm:block text-[11px] text-slate-500">
                Hover a panel to open it
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:h-[420px]">
              {featured.map((project, index) => {
                const active = spotlight === index;
                const accent = CATEGORY_ACCENTS[project.category] ?? FALLBACK_ACCENT;
                return (
                  <button
                    key={project.title}
                    type="button"
                    aria-expanded={active}
                    onMouseEnter={() => setSpotlight(index)}
                    onFocus={() => setSpotlight(index)}
                    onClick={() => (active ? setModalProject(project) : setSpotlight(index))}
                    className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out ${
                      active
                        ? 'h-[360px] lg:h-auto lg:flex-[4] border-blue-400/40 shadow-[0_20px_60px_-24px_rgba(79,140,255,0.5)]'
                        : 'h-[70px] lg:h-auto lg:flex-[0.6] border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Image layer */}
                    <ProjectCover
                      project={project}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                        active ? 'scale-100 opacity-60' : 'scale-110 opacity-25 grayscale'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        active
                          ? 'bg-gradient-to-t from-[#030712] via-[#030712]/75 to-[#030712]/25'
                          : 'bg-[#030712]/80'
                      }`}
                    />

                    {/* Collapsed label */}
                    <div
                      className={`absolute inset-0 flex items-center gap-3 px-5 transition-opacity duration-300 lg:flex-col lg:items-center lg:justify-between lg:py-6 lg:px-0 ${
                        active ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                      }`}
                    >
                      <span className="text-[11px] font-mono text-white/30 lg:order-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/80 text-sm font-medium truncate lg:order-2 lg:[writing-mode:vertical-rl] lg:rotate-180">
                        {project.title}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="ml-auto text-white/30 flex-none lg:ml-0 lg:order-3"
                      />
                    </div>

                    {/* Expanded content */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-end p-6 md:p-7 transition-all duration-500 ${
                        active
                          ? 'opacity-100 translate-y-0 delay-150'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${accent}`}
                        >
                          {project.category}
                        </span>
                        {project.client && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] text-slate-300 bg-white/[0.06] border border-white/10">
                            {project.client}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white text-2xl md:text-[26px] font-bold leading-tight mb-2.5">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-[14px] leading-relaxed max-w-xl mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-md text-[11px] leading-none text-slate-300 bg-white/[0.07] border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 6 && (
                          <span className="px-2 py-1 rounded-md text-[11px] leading-none text-slate-400">
                            +{project.tech.length - 6}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-blue-300 text-[13px] font-medium">
                        View details
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {categories.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                  active
                    ? 'bg-blue-500/15 border-blue-400/60 text-white shadow-[0_0_18px_rgba(79,140,255,0.25)]'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-[11px] text-slate-500">
                    {projects.filter((p) => p.category === category).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid — remounts on filter change so cards stagger back in */}
        <div key={activeFilter} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, index) => {
            const accent = CATEGORY_ACCENTS[project.category] ?? FALLBACK_ACCENT;
            const links = repoLinks(project);
            return (
              <article
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => setModalProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalProject(project);
                  }
                }}
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                className="group relative flex flex-col cursor-pointer bg-white/[0.035] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue-400/40 hover:shadow-[0_18px_50px_-18px_rgba(79,140,255,0.45)] focus:outline-none focus-visible:border-blue-400/60 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              >
                {/* Media */}
                <div className="relative h-44 overflow-hidden bg-black/30">
                  <ProjectCover
                    project={project}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/25 to-transparent" />

                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-medium border backdrop-blur-sm ${accent}`}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10.5px] font-medium text-amber-200 bg-amber-500/15 border border-amber-400/30 backdrop-blur-sm">
                      <Star size={10} className="fill-current" />
                      Featured
                    </span>
                  )}

                  {/* Slide-up reveal */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-r from-blue-500/90 to-violet-500/90 backdrop-blur-sm">
                    <span className="flex items-center justify-center gap-1.5 py-2 text-white text-[12.5px] font-medium">
                      View details
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  {project.client && (
                    <span className="text-[11px] text-slate-400 mb-1.5">{project.client}</span>
                  )}
                  <h3 className="text-white font-semibold text-[16px] leading-snug mb-2 transition-colors duration-200 group-hover:text-blue-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-[12.5px] leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md text-[11px] leading-none text-slate-400 bg-white/[0.04] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[11px] leading-none text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-auto pt-3.5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3 min-w-0">
                      {links.map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[12px] min-w-0"
                        >
                          <Github size={14} className="flex-none" />
                          <span className="truncate">{repo.label}</span>
                        </a>
                      ))}
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="flex-none text-slate-500 transition-all duration-200 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-12">
            No projects in this category yet.
          </p>
        )}

        {!showAll && filteredProjects.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium border border-white/10 hover:border-white/25 transition-colors duration-200"
            >
              Show all {filteredProjects.length} projects ↓
            </button>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-8 animate-in fade-in duration-200"
          onClick={() => setModalProject(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={modalProject.title}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-full overflow-y-auto bg-[#0b0f1c] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none"
          >
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <ProjectCover
                project={modalProject}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1c] via-[#0b0f1c]/50 to-transparent" />
              <button
                onClick={() => setModalProject(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-colors"
              >
                <X size={17} />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      CATEGORY_ACCENTS[modalProject.category] ?? FALLBACK_ACCENT
                    }`}
                  >
                    {modalProject.category}
                  </span>
                  {modalProject.client && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] text-slate-300 bg-white/[0.08] border border-white/10">
                      {modalProject.client}
                    </span>
                  )}
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                  {modalProject.title}
                </h3>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-slate-400 text-[13.5px] leading-relaxed mb-5">
                {modalProject.description}
              </p>

              {detailLines(modalProject.details).length > 0 && (
                <>
                  <h4 className="text-white/70 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
                    Highlights
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {detailLines(modalProject.details).map((line) => (
                      <li key={line} className="flex gap-2.5 text-slate-300 text-[13px] leading-relaxed">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400/70 flex-none" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="text-white/70 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
                Stack
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {modalProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[12px] leading-none text-slate-300 bg-white/[0.05] border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {repoLinks(modalProject).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.07]">
                  {repoLinks(modalProject).map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white text-[13px] font-medium transition-colors"
                    >
                      <Github size={15} />
                      {repo.label}
                      <ExternalLink size={13} className="text-slate-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
