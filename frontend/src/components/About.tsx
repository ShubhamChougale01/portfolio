import { Target, Building2, ShieldCheck, Eye, Network, Brain } from 'lucide-react';

// Three phases drawn from the narrative below — no invented dates, just the
// arc the copy already describes.
const JOURNEY = [
  {
    phase: 'Foundation',
    title: 'Computer Science & Data Science',
    body: 'Built the groundwork — ML, data modeling and the engineering habits the later work leans on.',
    icon: Brain,
    dot: 'bg-cyan-400',
    tile: 'from-cyan-500/20 to-cyan-600/[0.04] border-cyan-400/25 text-cyan-300',
    tags: ['Python', 'TensorFlow', 'Data Science'],
  },
  {
    phase: 'Then',
    title: 'Computer Vision & Voice AI',
    body: 'Real-time defect detection and voice-driven assistants for property management at 64-Squares, serving hundreds of properties in production — then a real-time call-routing system for an AI voice platform at CloudBuilders Technologies.',
    icon: Eye,
    dot: 'bg-violet-400',
    tile: 'from-violet-500/20 to-violet-600/[0.04] border-violet-400/25 text-violet-300',
    tags: ['YOLOv8', 'CoreML', 'Deepgram', 'Pipecat'],
  },
  {
    phase: 'Now',
    title: 'Claude-Native Agentic Architecture',
    body: 'Designing MCP servers, multi-agent workflows and RAG pipelines for enterprise platforms at Coditas, plus knowledge-graph-backed systems for confidential claim-verification and automation work.',
    icon: Network,
    dot: 'bg-blue-400',
    tile: 'from-blue-500/20 to-blue-600/[0.04] border-blue-400/25 text-blue-300',
    tags: ['Claude', 'MCP', 'LangGraph', 'Neo4j'],
  },
];

const FOCUS_AREAS = [
  'Claude & MCP Server Design',
  'Multi-Agent Orchestration (LangGraph, CrewAI)',
  'RAG Pipelines',
  'Knowledge Graphs (Neo4j)',
];

const INDUSTRIES = [
  'Enterprise Workflow Automation',
  'Real Estate Tech',
  'Voice Automation',
  'Computer Vision / Edge AI',
];

const PRINCIPLES = [
  'Recovers from failure',
  'Scales under real load',
  'Solves problems that matter',
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-24 bg-[#030712]">
      {/* Ambient background — decorative only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(620px circle at 10% 8%, rgba(155,92,255,0.10), transparent 60%),' +
              'radial-gradient(660px circle at 94% 70%, rgba(79,140,255,0.10), transparent 60%)',
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase">
              About
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight mb-4">
            My AI{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            From a Computer Science and Data Science foundation to architecting production AI
            systems — the kind that have to hold up under real traffic, not just perform well in a
            demo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start mb-12">
          {/* Narrative */}
          <div className="space-y-5">
            <p className="text-slate-300 text-[15px] leading-relaxed">
              Over 3+ years, I've gone from a Computer Science and Data Science foundation to
              architecting production AI systems — the kind that have to hold up under real
              traffic, not just perform well in a demo.
            </p>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              What hasn't changed is the standard I hold the work to: systems that recover from
              failure, scale under real load, and solve problems that matter — not prototypes that
              only work in a screen-share.
            </p>

            <div className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5">
              <h3 className="flex items-center gap-2 text-white font-semibold text-[15px] mb-4">
                <ShieldCheck size={16} className="text-emerald-400" />
                The bar I hold work to
              </h3>
              <ul className="space-y-2.5">
                {PRINCIPLES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-400 text-[13.5px]">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-emerald-400/70 flex-none" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-slate-400 text-[13.5px] leading-relaxed">
              These results come from full-time engineering roles — I'm also taking on select
              freelance and contract engagements building the same kind of systems.
            </p>
          </div>

          {/* Journey timeline */}
          <div className="relative">
            {/* Spine */}
            <span
              className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/30 to-blue-400/40"
              aria-hidden="true"
            />
            <ol className="space-y-5">
              {JOURNEY.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.phase} className="relative pl-16">
                    {/* Node */}
                    <span
                      className={`absolute left-0 top-1 w-12 h-12 rounded-xl border bg-gradient-to-br flex items-center justify-center ${step.tile}`}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="group bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.055] hover:border-white/20">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${step.dot}`} />
                        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400">
                          {step.phase}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-[16px] leading-snug mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-[13.5px] leading-relaxed mb-3.5">
                        {step.body}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-[11px] leading-none text-slate-400 bg-white/[0.04] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Focus areas + industries */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="group bg-white/[0.035] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(79,140,255,0.13)]">
            <h3 className="flex items-center gap-2.5 text-white font-semibold text-[15px] mb-4">
              <Target size={17} className="text-blue-400" />
              Focus Areas
            </h3>
            <ul className="space-y-2.5">
              {FOCUS_AREAS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-400 text-[13.5px]">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400/70 flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="group bg-white/[0.035] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_0_30px_rgba(155,92,255,0.13)]">
            <h3 className="flex items-center gap-2.5 text-white font-semibold text-[15px] mb-4">
              <Building2 size={17} className="text-violet-400" />
              Industries
            </h3>
            <ul className="space-y-2.5">
              {INDUSTRIES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-400 text-[13.5px]">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-400/70 flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
