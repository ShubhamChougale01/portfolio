import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Download,
  MapPin,
  GraduationCap,
  Brain,
  Eye,
  Mic,
  Network,
} from 'lucide-react';
import ProfileImage from '@/assets/Profile.webp';

const METRICS = [
  { value: 3, decimals: 0, suffix: '+', label: 'Years building AI systems' },
  { value: 10000, decimals: 0, suffix: '+', label: 'Daily users served' },
  { value: 99.2, decimals: 1, suffix: '%', label: 'Platform uptime' },
  { value: 10, decimals: 0, suffix: '+', label: 'Custom MCP servers' },
];

const SPECIALIZATIONS = [
  {
    title: 'LLM & Agentic Systems',
    stack: 'Claude, MCP server design, LangGraph, CrewAI, RAG',
    note: 'Production-grade agent platforms, not prototypes',
    proof: '99.2% uptime serving 10,000+ daily users · 10+ custom MCP servers',
    icon: Brain,
    tile: 'from-blue-500/20 to-blue-600/[0.04] border-blue-400/25 text-blue-300',
    hover: 'hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(79,140,255,0.13)]',
  },
  {
    title: 'Voice AI & Automation',
    stack: 'Deepgram, Pipecat, ElevenLabs, real-time call routing',
    note: 'Sub-500ms voice pipelines under real call load',
    proof: 'Multi-agent workflows (LangGraph, CrewAI) cutting manual work 65%',
    icon: Mic,
    tile: 'from-cyan-500/20 to-cyan-600/[0.04] border-cyan-400/25 text-cyan-300',
    hover: 'hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.13)]',
  },
  {
    title: 'Computer Vision',
    stack: 'YOLOv8, CoreML, on-device inference',
    note: 'Real-time, on-device inference at production accuracy',
    proof: '92% accuracy at 30 FPS, sub-200ms inference latency',
    icon: Eye,
    tile: 'from-violet-500/20 to-violet-600/[0.04] border-violet-400/25 text-violet-300',
    hover: 'hover:border-violet-400/40 hover:shadow-[0_0_30px_rgba(155,92,255,0.13)]',
  },
  {
    title: 'Knowledge Graphs & Data',
    stack: 'Neo4j, graph-based data modeling, ontology design',
    note: 'Structured reasoning over unstructured claims and relationships',
    proof: 'Claim-dependency graph for a confidential production pipeline (2026)',
    icon: Network,
    tile: 'from-emerald-500/20 to-emerald-600/[0.04] border-emerald-400/25 text-emerald-300',
    hover: 'hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.13)]',
  },
];

const ORBIT_TAGS = [
  { label: 'Claude', className: 'top-4 -left-4 text-blue-200 border-blue-400/30 bg-blue-500/10' },
  { label: 'MCP', className: 'top-1/3 -right-6 text-violet-200 border-violet-400/30 bg-violet-500/10' },
  { label: 'LangGraph', className: 'bottom-14 -left-10 text-cyan-200 border-cyan-400/30 bg-cyan-500/10' },
  { label: 'RAG', className: 'bottom-2 right-2 text-emerald-200 border-emerald-400/30 bg-emerald-500/10' },
];

// Counts up once the strip scrolls into view; respects reduced-motion by
// jumping straight to the final value.
function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function Metric({
  value,
  decimals,
  suffix,
  label,
  active,
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const current = useCountUp(value, active);
  const display =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString('en-US');

  return (
    <div className="flex-1 min-w-[130px]">
      <div className="text-2xl md:text-[28px] font-bold text-white tabular-nums leading-none mb-1.5">
        {display}
        <span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-[12px] text-slate-400 leading-snug">{label}</div>
    </div>
  );
}

const Hero = () => {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const node = metricsRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setMetricsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    // Safety net: never leave the numbers stuck at zero if the observer
    // never fires (background tab, unusual viewport).
    const fallback = window.setTimeout(() => setMetricsVisible(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#030712] pt-28 pb-20 md:pt-32 md:pb-24">
      {/* Ambient background — decorative only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(720px circle at 78% 12%, rgba(79,140,255,0.16), transparent 58%),' +
              'radial-gradient(620px circle at 12% 28%, rgba(155,92,255,0.11), transparent 58%),' +
              'radial-gradient(760px circle at 50% 108%, rgba(34,211,238,0.07), transparent 58%)',
          }}
        />
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)',
          }}
        />
        {/* Connection nodes */}
        <svg className="absolute top-24 left-[4%] w-[320px] h-[220px] opacity-[0.12]" viewBox="0 0 360 220">
          <line x1="20" y1="180" x2="140" y2="100" stroke="#22D3EE" strokeWidth="1" />
          <line x1="140" y1="100" x2="270" y2="150" stroke="#4F8CFF" strokeWidth="1" />
          <line x1="140" y1="100" x2="210" y2="30" stroke="#9B5CFF" strokeWidth="1" />
          <circle cx="20" cy="180" r="3" fill="#22D3EE" />
          <circle cx="140" cy="100" r="3.5" fill="#4F8CFF" />
          <circle cx="270" cy="150" r="3" fill="#4F8CFF" />
          <circle cx="210" cy="30" r="3" fill="#9B5CFF" />
        </svg>
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Top: intro + portrait */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center mb-16">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
            {/* Availability */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-full pl-3 pr-4 py-1.5 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/85 text-sm font-medium">Open to opportunities</span>
              <span className="hidden sm:inline text-slate-400 text-sm">
                Freelance · Contract · Full-time
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold text-white leading-[1.02] tracking-tight mb-4">
              Shubham
              <br />
              Chougale
            </h1>

            <p className="text-2xl md:text-[28px] font-semibold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Production AI Systems Engineer
              </span>
            </p>

            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-slate-400 text-base mb-7">
              <span>Claude</span>
              <span className="text-slate-700">·</span>
              <span>MCP</span>
              <span className="text-slate-700">·</span>
              <span>Multi-Agent Orchestration</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-slate-400 text-sm">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-slate-500" />
                Pune, India
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={15} className="text-slate-500" />
                MCA in Data Science
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-6 py-3 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 24px rgba(79,140,255,0.25)' }}
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/40 text-white px-6 py-3 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
              <a
                href="/Shubham_AI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-white px-6 py-3 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72">
              {/* Glow */}
              <div
                className="absolute -inset-6 rounded-full blur-2xl opacity-60"
                aria-hidden="true"
                style={{
                  background:
                    'conic-gradient(from 180deg, rgba(79,140,255,0.35), rgba(155,92,255,0.3), rgba(34,211,238,0.25), rgba(79,140,255,0.35))',
                }}
              />
              {/* Ring */}
              <div
                className="absolute -inset-1.5 rounded-full"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(140deg, rgba(79,140,255,0.7), rgba(155,92,255,0.5), rgba(34,211,238,0.45))',
                }}
              />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#030712]">
                <img
                  src={ProfileImage}
                  alt="Shubham Chougale"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stack tags */}
              {ORBIT_TAGS.map((tag, i) => (
                <span
                  key={tag.label}
                  className={`absolute hidden sm:block px-2.5 py-1 rounded-lg text-[11px] font-medium border backdrop-blur-sm motion-safe:animate-float ${tag.className}`}
                  style={{ animationDelay: `${i * 700}ms` }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics strip — counts up on first view */}
        <div
          ref={metricsRef}
          className="flex flex-wrap gap-y-6 gap-x-4 bg-white/[0.035] border border-white/[0.08] rounded-2xl px-6 py-6 md:px-8 mb-16"
        >
          {METRICS.map((metric) => (
            <Metric key={metric.label} {...metric} active={metricsVisible} />
          ))}
        </div>

        {/* Intro */}
        <div className="max-w-3xl mb-16 space-y-5">
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Hi! I'm Shubham — a Production AI Systems Engineer. I build AI systems that survive
            production, not demos that survive a screen-share: over 3+ years I've shipped LLM
            platforms serving 10,000+ daily users at 99.2% uptime, architected 10+ custom MCP
            servers expanding what a single AI platform can do 5x, and designed multi-agent
            workflows (LangGraph, CrewAI) that cut manual work by 65% at scale.
          </p>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            I specialize in Claude-native architecture — RAG pipelines, agentic tool-calling, and
            MCP integrations that hold up under real traffic, not just a happy-path demo. Whether
            you're hiring full-time, staffing a contract engagement, or need a freelance architect
            for a specific build — if you need someone to architect (not just wire together) a
            production-grade agent system, MCP server, or RAG platform, that's the work I want to
            be doing.
          </p>
        </div>

        {/* Specializations */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-white text-xl md:text-2xl font-bold">What I Specialize In</h2>
            <span className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALIZATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`group flex flex-col bg-white/[0.035] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.055] ${item.hover}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl border bg-gradient-to-br flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 ${item.tile}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-white font-semibold text-[16px] leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[13px] leading-relaxed mb-2.5">{item.stack}</p>
                  <p className="text-slate-500 text-[12px] italic leading-relaxed mb-4">
                    {item.note}
                  </p>
                  <p className="mt-auto pt-3.5 border-t border-white/[0.06] text-slate-400 text-[12px] leading-relaxed">
                    <span className="text-blue-400">→ </span>
                    {item.proof}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-16">
          <a
            href="#about"
            aria-label="Scroll to about"
            className="group flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            <ArrowDown size={18} className="motion-safe:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
