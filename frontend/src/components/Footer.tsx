import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* CTA banner */}
      <div className="relative overflow-hidden bg-[#030712]">
        {/* Night-sky gradient — starts at the section colour so there is no
            seam where the Contact section ends. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 100% 0%, rgba(124,58,237,0.35) 0%, rgba(3,7,18,0) 55%), linear-gradient(180deg, #030712 0%, #0d1120 100%)',
          }}
        />
        {/* Mountain silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full text-white/5"
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon fill="currentColor" points="0,260 150,90 300,180 430,60 600,170 760,40 900,150 1050,80 1200,180 1200,260" />
          <polygon fill="currentColor" opacity="0.6" points="0,260 220,150 380,210 560,120 750,200 950,130 1200,220 1200,260" />
        </svg>

        <div className="relative container mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
                  Let's Build Together
                </span>
                <span className="hidden sm:block w-10 h-px bg-gradient-to-r from-blue-400 to-purple-500" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Ready to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  collaborate?
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Open to freelance, contract &amp; full-time roles.
                <br />
                Let's create something meaningful with AI.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold px-8 py-3.5 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
              >
                Let's Talk
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <span className="text-xs tracking-[0.2em] text-white/40 uppercase">
                Ideas → Solutions → Impact
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Identity + nav + socials */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-xl border-2 border-blue-500/40 bg-muted/40 flex items-center justify-center flex-none">
                <span className="text-lg font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SC
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg font-bold text-foreground">
                  Shubham{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Chougale
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  AI Engineer — Claude, MCP &amp; Multi-Agent Systems
                </p>
              </div>
            </div>

            <span className="hidden lg:block w-px self-stretch bg-border" aria-hidden="true" />

            {/* Nav */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative text-foreground/80 hover:text-foreground text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/ShubhamChougale01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/shubham-chougale/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:shubham.chougale001@gmail.com"
                aria-label="Email"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-border ">
        <div className="container mx-auto px-6 py-3 flex items-center justify-center text-center">
          <p className="text-muted-foreground/80 text-sm flex items-center gap-1.5">
            <span>© 2024–2026 Shubham Chougale. All rights reserved.</span>
            <span aria-hidden="true" className="text-lg leading-none">·</span>
            <span className="text-muted-foreground/70">Built with React, Vite &amp; Claude.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
