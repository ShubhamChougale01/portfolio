import { useState } from 'react';
import {
  Send,
  Bot,
  Link2,
  Database,
  Mic,
  Workflow,
  MoreHorizontal,
  Brain,
  Code2,
  Cloud,
  Rocket,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { TimeoutError, postJSON } from '@/lib/api';
import SectionAmbience from './SectionAmbience';

const CATEGORY_COLORS = {
  blue: { chip: 'bg-blue-500/20', icon: 'text-blue-400' },
  green: { chip: 'bg-emerald-500/20', icon: 'text-emerald-400' },
  pink: { chip: 'bg-pink-500/20', icon: 'text-pink-400' },
  cyan: { chip: 'bg-cyan-500/20', icon: 'text-cyan-400' },
  violet: { chip: 'bg-violet-500/20', icon: 'text-violet-400' },
  slate: { chip: 'bg-white/[0.08]', icon: 'text-slate-400' },
} as const;

const CATEGORIES = [
  { label: 'AI Product', icon: Sparkles, color: 'blue' },
  { label: 'AI Agent', icon: Bot, color: 'green' },
  { label: 'MCP Integration', icon: Link2, color: 'pink' },
  { label: 'RAG System', icon: Database, color: 'blue' },
  { label: 'Voice AI', icon: Mic, color: 'cyan' },
  { label: 'Automation', icon: Workflow, color: 'violet' },
  { label: 'Consulting', icon: MessageSquare, color: 'blue' },
  { label: 'Other', icon: MoreHorizontal, color: 'slate' },
] as const;

// A restrained three-color accent rotation (blue / cyan / violet) — not a
// different color per card, just enough variation to differentiate cards
// without turning the grid into a rainbow.
const ACCENTS = {
  blue: { icon: 'text-blue-400', chip: 'bg-blue-500/10', ring: 'group-hover:border-blue-400/40' },
  cyan: { icon: 'text-cyan-400', chip: 'bg-cyan-500/10', ring: 'group-hover:border-cyan-400/40' },
  violet: { icon: 'text-violet-400', chip: 'bg-violet-500/10', ring: 'group-hover:border-violet-400/40' },
} as const;

const HELP_CARDS = [
  {
    title: 'AI Agents',
    description: 'Design and build autonomous agent systems (LangGraph, CrewAI)',
    icon: Brain,
    accent: 'violet',
  },
  {
    title: 'MCP & Tooling',
    description: 'Connect AI to real-world systems with MCP, FastMCP and tool calling',
    icon: Link2,
    accent: 'cyan',
  },
  {
    title: 'RAG & Knowledge',
    description: 'Build knowledge systems with RAG, vector DBs and graphs',
    icon: Database,
    accent: 'blue',
  },
  {
    title: 'Voice AI',
    description: 'Real-time voice agents (ElevenLabs, Deepgram, Pipecat)',
    icon: Mic,
    accent: 'violet',
  },
  {
    title: 'AI Integration',
    description: 'Integrate LLMs into products and workflows',
    icon: Code2,
    accent: 'cyan',
  },
  {
    title: 'Cloud & Deployment',
    description: 'Deploy, scale and maintain AI systems (AWS, GCP, Docker, CI/CD)',
    icon: Cloud,
    accent: 'blue',
  },
] as const;

const PROCESS_STEPS = [
  { label: 'Discuss Your Idea', icon: MessageSquare, accent: 'blue' },
  { label: 'Explore Solutions', icon: Lightbulb, accent: 'cyan' },
  { label: 'Build & Iterate', icon: Code2, accent: 'violet' },
  { label: 'Deploy & Scale', icon: Rocket, accent: 'blue' },
] as const;

const DIRECT_CONTACT = [
  {
    label: 'GitHub',
    action: 'View Profile',
    href: 'https://github.com/ShubhamChougale01',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    action: "Let's Connect",
    href: 'https://www.linkedin.com/in/shubham-chougale/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    action: 'Send a Message',
    href: 'mailto:shubham.chougale001@gmail.com',
    icon: Mail,
  },
];

const Contact = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error('Please select what you\'re looking to build.');
      return;
    }

    const message = formData.company
      ? `Company/Project: ${formData.company}\n\n${formData.message}`
      : formData.message;

    setSubmitting(true);
    try {
      const { response, data } = await postJSON<{ error?: string }>('/api/contact/', {
        name: formData.name,
        email: formData.email,
        subject: `${selectedCategory} inquiry`,
        message,
      });
      if (response.ok) {
        toast.success("Thank you! I'll get back to you soon.");
        setFormData({ name: '', email: '', company: '', message: '' });
        setSelectedCategory(null);
      } else {
        toast.error(data?.error || 'Failed to send message.');
      }
    } catch (error) {
      toast.error(
        error instanceof TimeoutError
          ? 'The server took too long to respond. It may be waking up — please try again.'
          : 'An error occurred. Please try again later.'
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-28 bg-[#030712]">
      <SectionAmbience />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400" />
          <span className="text-xs font-semibold tracking-[0.25em] text-blue-300/80 uppercase">
            Let's Build Together
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-violet-400" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left: pitch */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-7 leading-[1.08] tracking-tight">
              Have an{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                AI problem
              </span>{' '}
              worth solving?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              Whether you're building an agent, integrating LLMs into an existing product, or
              turning an idea into a production system — let's talk.
            </p>

            <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-full pl-3 pr-4 py-1.5 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/85 text-sm font-medium">Open to opportunities</span>
              <span className="text-slate-400 text-sm">Freelance · Contract · Full-time</span>
            </div>

            {/* What I can help with */}
            <div className="bg-white/[0.035] border border-blue-400/10 rounded-2xl p-6 md:p-7 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold text-base flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-400" />
                  What I can help with
                </h3>
                <a
                  href="#projects"
                  className="group text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  View my projects
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {HELP_CARDS.map((card) => {
                  const Icon = card.icon;
                  const accent = ACCENTS[card.accent];
                  return (
                    <div
                      key={card.title}
                      className={`group bg-white/[0.035] border border-blue-400/10 rounded-xl p-[18px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.055] ${accent.ring}`}
                    >
                      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${accent.chip} mb-3`}>
                        <Icon size={20} className={accent.icon} />
                      </div>
                      <div className="text-white text-[14px] font-medium mb-1.5">{card.title}</div>
                      <p className="text-slate-400 text-[11.5px] leading-[1.5]">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* From idea to impact — full width of the left column, matching "What I can help with" above */}
            <div className="bg-white/[0.035] border border-blue-400/10 rounded-2xl p-6 md:p-7 mb-8">
              <h3 className="text-white font-semibold text-base mb-1">From idea to impact</h3>
              <p className="text-slate-400 text-sm mb-7">A simple path we can take together.</p>
              <div className="flex items-start">
                {PROCESS_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const accent = ACCENTS[step.accent];
                  return (
                    <div key={step.label} className="flex items-center flex-1 last:flex-none">
                      <div className="group flex flex-col items-center gap-3 text-center">
                        <div className={`relative w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center transition-colors duration-200 ${accent.icon} ${accent.ring}`}>
                          <Icon size={19} />
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500/25 border border-blue-400/50 text-blue-300 text-[10px] font-semibold flex items-center justify-center">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-slate-300 text-[13px] leading-tight max-w-[84px]">
                          {step.label}
                        </span>
                      </div>
                      {index < PROCESS_STEPS.length - 1 && (
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/50 via-violet-500/40 to-white/10 mx-1.5 mb-8 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: form — the visual anchor of the page */}
          <div>
          <div
            className="bg-white/[0.045] border border-blue-400/15 rounded-2xl p-6 md:p-8 h-fit"
            style={{ boxShadow: '0 0 40px rgba(79,140,255,0.06), 0 0 80px rgba(139,92,246,0.05)' }}
          >
            <div className="flex items-center justify-between mb-8 gap-3 flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-none">
                  <Send size={17} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-xl whitespace-nowrap">Start a Conversation</h3>
              </div>
              <div className="hidden lg:flex items-center gap-1 text-[11px] flex-none whitespace-nowrap">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex-none mr-1">
                  1
                </span>
                <span className="text-blue-400 font-semibold mr-1">Details</span>
                <span className="w-3 h-px bg-white/15 flex-none" />
                <span className="w-1 h-1 rounded-full bg-white/15 flex-none mx-1" />
                <span className="text-slate-500">Message</span>
                <span className="w-3 h-px bg-white/15 flex-none" />
                <span className="w-1 h-1 rounded-full bg-white/15 flex-none mx-1" />
                <span className="text-slate-500">Send</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/85 text-sm font-medium mb-3">
                  What are you looking to build? <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory === cat.label;
                    const color = CATEGORY_COLORS[cat.color];
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`flex items-center justify-center gap-2 min-h-[40px] px-2.5 rounded-lg text-[12.5px] font-medium border transition-all duration-200 whitespace-nowrap ${
                          active
                            ? 'bg-blue-500/20 border-blue-400/70 text-white shadow-[0_0_16px_rgba(79,140,255,0.22)]'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className={`flex items-center justify-center w-5 h-5 rounded-md flex-none ${color.chip}`}>
                          <Icon size={12} className={color.icon} />
                        </span>
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white/85 text-sm font-medium mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder:text-slate-500 placeholder:text-[13px] text-sm focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/85 text-sm font-medium mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder:text-slate-500 placeholder:text-[13px] text-sm focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-white/85 text-sm font-medium mb-2">
                  Company / Project <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name or project link"
                  className="w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder:text-slate-500 placeholder:text-[13px] text-sm focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/85 text-sm font-medium mb-2">
                  Tell me about your project <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you building? What's the problem you're trying to solve? Any specific goals, technology preferences, or timeline?"
                  className="w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder:text-slate-500 placeholder:text-[13px] text-sm leading-[1.5] focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200 resize-none"
                  required
                />
                <div className="text-right text-slate-500 text-xs mt-1.5">
                  {formData.message.length}/1000
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 24px rgba(79,140,255,0.25)' }}
              >
                <Send size={16} />
                {submitting ? 'Sending...' : 'Send Message'}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <p className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
                <Lock size={12} />
                I'll usually respond within 10-12 hours.
              </p>
            </form>
          </div>

          {/* Direct contact — stacked below the form, same column width, spaced like "From idea to impact" */}
          <div className="bg-white/[0.035] border border-blue-400/10 rounded-2xl p-6 md:p-7 mt-8">
            <p className="text-white font-medium mb-1">Prefer a direct message?</p>
            <p className="text-slate-400 text-sm mb-5">I'm active on these platforms too.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DIRECT_CONTACT.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col gap-2.5 bg-white/[0.035] border border-blue-400/10 rounded-xl px-4 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon size={20} className="text-slate-400 flex-none" />
                      <ArrowRight
                        size={14}
                        className="text-slate-500 flex-none transition-all duration-200 group-hover:text-blue-400 group-hover:translate-x-0.5"
                      />
                    </div>
                    <div>
                      <div className="text-white text-[14px] font-medium leading-tight">{item.label}</div>
                      <div className="text-slate-400 text-[12px] leading-tight mt-0.5">{item.action}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
