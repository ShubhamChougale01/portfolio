import { Brain, Workflow, Database, Eye, Cloud, Target, Building2 } from 'lucide-react';

const skillBars = [
  { label: 'LLM & Agentic Systems', pct: 95, icon: Brain, color: 'blue' },
  { label: 'MCP & Multi-Agent Orchestration', pct: 90, icon: Workflow, color: 'green' },
  { label: 'RAG & Knowledge Systems', pct: 88, icon: Database, color: 'cyan' },
  { label: 'Voice AI & Computer Vision', pct: 75, icon: Eye, color: 'purple' },
  { label: 'Cloud & DevOps', pct: 70, icon: Cloud, color: 'yellow' },
];

const colorClasses: Record<string, { text: string; from: string; to: string }> = {
  blue: { text: 'text-blue-400', from: 'from-blue-400', to: 'to-blue-500' },
  green: { text: 'text-green-400', from: 'from-green-400', to: 'to-green-500' },
  cyan: { text: 'text-cyan-400', from: 'from-cyan-400', to: 'to-cyan-500' },
  purple: { text: 'text-purple-400', from: 'from-purple-400', to: 'to-purple-500' },
  yellow: { text: 'text-yellow-400', from: 'from-yellow-400', to: 'to-yellow-500' },
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My AI Journey
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                Over 3+ years, I've gone from a Computer Science and Data Science foundation to
                architecting production AI systems — the kind that have to hold up under real
                traffic, not just perform well in a demo.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Early on, that meant computer vision and voice AI: deploying real-time defect
                detection models and building voice-driven assistants for property management at
                64-Squares, serving hundreds of properties in production, then architecting a
                real-time call-routing system for an AI voice platform at CloudBuilders
                Technologies. Today, my focus has shifted to Claude-native, agentic architecture —
                designing MCP servers, multi-agent workflows, and RAG pipelines for enterprise
                platforms at Coditas, and building knowledge-graph-backed systems for confidential
                claim-verification and automation work.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                What hasn't changed is the standard I hold the work to: systems that recover from
                failure, scale under real load, and solve problems that matter — not prototypes
                that only work in a screen-share. These results come from full-time engineering
                roles — I'm also taking on select freelance and contract engagements building the
                same kind of systems.
              </p>
            </div>

            <div className="relative space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="group bg-card/50 p-4 rounded-lg border border-border hover:border-blue-400/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                    <Target size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Focus Areas
                  </h4>
                  <ul className="text-muted-foreground text-sm space-y-1.5">
                    {[
                      'Claude & MCP Server Design',
                      'Multi-Agent Orchestration (LangGraph, CrewAI)',
                      'RAG Pipelines',
                      'Knowledge Graphs (Neo4j)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="group bg-card/50 p-4 rounded-lg border border-border hover:border-purple-400/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                    <Building2 size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    Industries
                  </h4>
                  <ul className="text-muted-foreground text-sm space-y-1.5">
                    {[
                      'Enterprise Workflow Automation',
                      'Real Estate Tech',
                      'Voice Automation',
                      'Computer Vision / Edge AI',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 rounded-2xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Core Strengths</h3>
                <div className="space-y-5">
                  {skillBars.map(({ label, pct, icon: Icon, color }) => {
                    const c = colorClasses[color];
                    return (
                      <div key={label} className="group">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Icon size={16} className={`${c.text} group-hover:scale-110 transition-transform duration-300`} />
                            {label}
                          </span>
                          <span className={`${c.text} font-semibold`}>{pct}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${c.from} ${c.to} h-2 rounded-full transition-all duration-700 ease-out`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
