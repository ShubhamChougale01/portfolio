import { ArrowDown, Download, MapPin, GraduationCap, Brain, Eye, Mic, Zap, Link, Package } from 'lucide-react';
import IconA from './IconA';
import IconB from './IconB';
import { useState, useRef, useEffect } from 'react';

const summaryText = (
  <>
    <p className="intro-text text-lg md:text-xl text-muted-foreground leading-relaxed mb-2">
      Hi! I'm Shubham — an AI Engineer at <strong>64 Squares LLC</strong>, where I design real-time, production-ready systems powered by AI Agents, LLMs, computer vision, and speech AI.
    </p>
    <p className="intro-text text-lg md:text-xl text-muted-foreground leading-relaxed">
      With hands-on experience in YOLOv8, RAG, CoreML, Deepgram, Langchain, and OpenAI, I've created tools that detect defects in buildings, automate property workflows, and enable voice-driven assistants. My passion lies in solving real-world problems through intelligent automation, whether it's on-device inference or cloud-based AI pipelines.
    </p>
  </>
);

const specializeText = (
  <div className="text-left space-y-3">
    <div>
      <span className="font-semibold">AI Agents & LLMs:</span> Langchain, RAG, OpenAI API, contextual memory
    </div>
    <div>
      <span className="font-semibold">Computer Vision:</span> YOLOv8, AVFoundation, CoreML, image/video inference
    </div>
    <div>
      <span className="font-semibold">Voice Interfaces:</span> Deepgram STT, TTS, Whisper — for smart assistants
    </div>
    <div>
      <span className="font-semibold">92% accurate real-time defect detection on iOS</span>
    </div>
    <div>
      <span className="font-semibold">Seamless integration between backend, frontend, and AI Agents</span>
    </div>
    <div>
      <span className="font-semibold">Containerized ML workflows for easy deployment</span>
    </div>
  </div>
);

const Hero = () => {
  const [openBox, setOpenBox] = useState<'summary' | 'specialize' | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpenBox(null);
      }
    }
    if (openBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openBox]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background relative overflow-hidden pt-20">
      {/* Matrix-style code rain - Dark mode only */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden">
        <div className="absolute top-0 left-[10%] text-green-400/20 text-xs font-mono animate-pulse">
          <div className="animate-slide-down">01100001 01101001</div>
        </div>
        <div className="absolute top-0 left-[30%] text-blue-400/20 text-xs font-mono animate-pulse delay-1000">
          <div className="animate-slide-down delay-500">def neural_network():</div>
        </div>
        <div className="absolute top-0 left-[60%] text-cyan-400/20 text-xs font-mono animate-pulse delay-2000">
          <div className="animate-slide-down delay-1000">import tensorflow as tf</div>
        </div>
        <div className="absolute top-0 left-[80%] text-purple-400/20 text-xs font-mono animate-pulse delay-1500">
          <div className="animate-slide-down delay-300">model.compile()</div>
        </div>
      </div>

      {/* Light mode floating particles - Enhanced */}
      <div className="absolute inset-0 overflow-hidden block dark:hidden">
        <div className="absolute top-0 left-[10%] text-blue-500/60 text-sm font-mono animate-pulse font-bold">
          <div className="animate-slide-down">AI</div>
        </div>
        <div className="absolute top-0 left-[30%] text-purple-500/60 text-sm font-mono animate-pulse delay-1000 font-bold">
          <div className="animate-slide-down delay-500">ML</div>
        </div>
        <div className="absolute top-0 left-[60%] text-cyan-500/60 text-sm font-mono animate-pulse delay-2000 font-bold">
          <div className="animate-slide-down delay-1000">CV</div>
        </div>
        <div className="absolute top-0 left-[80%] text-green-500/60 text-sm font-mono animate-pulse delay-1500 font-bold">
          <div className="animate-slide-down delay-300">LLM</div>
        </div>
        
        {/* Additional floating tech terms */}
        <div className="absolute top-1/4 left-[15%] text-indigo-500/50 text-xs font-mono animate-pulse delay-300">
          <div className="animate-slide-down delay-700">TensorFlow</div>
        </div>
        <div className="absolute top-1/3 left-[75%] text-pink-500/50 text-xs font-mono animate-pulse delay-1200">
          <div className="animate-slide-down delay-900">PyTorch</div>
        </div>
        <div className="absolute top-2/3 left-[20%] text-orange-500/50 text-xs font-mono animate-pulse delay-800">
          <div className="animate-slide-down delay-1100">OpenAI</div>
        </div>
        <div className="absolute top-3/4 left-[70%] text-teal-500/50 text-xs font-mono animate-pulse delay-600">
          <div className="animate-slide-down delay-1300">LangChain</div>
        </div>
      </div>

      {/* Spider web effect - Dark mode */}
      <div className="absolute inset-0 dark:block hidden">
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 600">
          <defs>
            <pattern id="web" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M 0 50 L 100 50 M 50 0 L 50 100 M 20 20 L 80 80 M 80 20 L 20 80"
                stroke="url(#gradient)" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#web)" className="animate-pulse" />

          {/* Animated connection lines */}
          <line x1="100" y1="100" x2="300" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.2" className="animate-pulse delay-500">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="500" y1="150" x2="700" y2="350" stroke="#8b5cf6" strokeWidth="1" opacity="0.2" className="animate-pulse delay-1000">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="400" x2="600" y2="100" stroke="#06b6d4" strokeWidth="1" opacity="0.2" className="animate-pulse delay-1500">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* Light mode geometric patterns - Enhanced */}
      <div className="absolute inset-0 block dark:hidden">
        <svg className="w-full h-full opacity-15" viewBox="0 0 800 600">
          <defs>
            <pattern id="geometric" patternUnits="userSpaceOnUse" width="60" height="60">
              <circle cx="30" cy="30" r="3" fill="#3b82f6" opacity="0.4" />
              <rect x="25" y="25" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
              <circle cx="15" cy="15" r="1.5" fill="#06b6d4" opacity="0.5" />
              <circle cx="45" cy="45" r="1.5" fill="#10b981" opacity="0.5" />
            </pattern>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="1" fill="#6366f1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" className="animate-pulse" />
          <rect width="100%" height="100%" fill="url(#dots)" className="animate-pulse delay-1000" />
        </svg>
      </div>

      {/* Floating neural network nodes - Dark mode */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500/40 rounded-full animate-dark-float">
          <div className="w-full h-full bg-blue-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-dark-float delay-1000">
          <div className="w-full h-full bg-purple-400 rounded-full animate-ping delay-500"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-cyan-500/40 rounded-full animate-dark-float delay-2000">
          <div className="w-full h-full bg-cyan-400 rounded-full animate-ping delay-1000"></div>
        </div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-dark-float delay-500">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping delay-200"></div>
        </div>
      </div>

      {/* Light mode floating elements - Enhanced */}
      <div className="absolute inset-0 block dark:hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500/50 rounded-full animate-light-float shadow-lg shadow-blue-500/30">
          <div className="w-full h-full bg-blue-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-purple-500/50 rounded-full animate-light-float delay-1000 shadow-lg shadow-purple-500/30">
          <div className="w-full h-full bg-purple-400 rounded-full animate-ping delay-500"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-cyan-500/50 rounded-full animate-light-float delay-2000 shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full bg-cyan-400 rounded-full animate-ping delay-1000"></div>
        </div>
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-green-500/50 rounded-full animate-light-float delay-500 shadow-lg shadow-green-500/30">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping delay-200"></div>
        </div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/6 left-2/3 w-2 h-2 bg-indigo-500/50 rounded-full animate-light-float delay-300 shadow-lg shadow-indigo-500/30">
          <div className="w-full h-full bg-indigo-400 rounded-full animate-ping delay-300"></div>
        </div>
        <div className="absolute bottom-1/6 right-1/6 w-3 h-3 bg-pink-500/50 rounded-full animate-light-float delay-700 shadow-lg shadow-pink-500/30">
          <div className="w-full h-full bg-pink-400 rounded-full animate-ping delay-700"></div>
        </div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-orange-500/50 rounded-full animate-light-float delay-900 shadow-lg shadow-orange-500/30">
          <div className="w-full h-full bg-orange-400 rounded-full animate-ping delay-900"></div>
        </div>
      </div>

      {/* Glowing orbs with circuit patterns - Dark mode */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-dark-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/4 rounded-full blur-3xl animate-drift"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/3 rounded-full blur-3xl animate-dark-float delay-1000"></div>
      </div>

      {/* Light mode subtle gradients - Enhanced */}
      <div className="absolute inset-0 overflow-hidden block dark:hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/8 rounded-full blur-3xl animate-light-float shadow-2xl shadow-blue-400/20"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400/6 rounded-full blur-3xl animate-drift shadow-2xl shadow-purple-400/20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400/8 rounded-full blur-3xl animate-light-float delay-1000 shadow-2xl shadow-cyan-400/20"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-light-float delay-500 shadow-2xl shadow-indigo-400/20"></div>
        <div className="absolute bottom-1/6 right-1/3 w-56 h-56 bg-green-400/7 rounded-full blur-3xl animate-light-float delay-1200 shadow-2xl shadow-green-400/20"></div>
      </div>

      {/* Circuit board pattern - Dark mode */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2lyY3VpdCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDMwIDAgTCAzMCAzMCBMIDYwIDMwIE0gMCAzMCBMIDMwIDMwIE0gMzAgMzAgTCAzMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')] opacity-15 dark:block hidden"></div>

      {/* Light mode dot pattern - Enhanced */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxLjUiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-20 block dark:hidden"></div>

      <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
        <div className="animate-fade-in">
          {/* Hero Section */}
          <h1 className="hero-title text-6xl md:text-7xl mb-4 text-foreground leading-tight">
            <span className="inline-block animate-pulse">Shubham Chougale</span>
          </h1>
          
          <h2 className="hero-subtitle text-3xl md:text-4xl mb-4 text-foreground">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              AI Engineer
            </span>
          </h2>
          
          <p className="font-source-sans text-xl md:text-2xl mb-6 text-muted-foreground font-medium">
            AI Agents • Computer Vision • LLMs
          </p>
          
          {/* Location and Education */}
          <div className="flex items-center justify-center gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="font-times">Pune, India</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} />
              <span className="font-times">MCA in Data Science</span>
            </div>
          </div>

          {/* ICONS FOR POPUP BOXES */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-10">
            <div className="relative flex flex-col items-center">
              <button
                aria-label="Show summary"
                className={`rounded-full p-4 bg-card border border-border shadow-md hover:scale-110 transition-transform duration-200 ${openBox === 'summary' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setOpenBox(openBox === 'summary' ? null : 'summary')}
              >
                <IconA className="w-12 h-12 text-blue-500" />
              </button>
              <span className="mt-2 text-xs text-muted-foreground">About Me</span>
              {openBox === 'summary' && (
                <div ref={boxRef} className="absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 mt-4 bg-background border border-border rounded-xl shadow-xl p-6 text-left animate-fade-in">
                  {summaryText}
                </div>
              )}
            </div>
            <div className="relative flex flex-col items-center">
              <button
                aria-label="Show specialization"
                className={`rounded-full p-4 bg-card border border-border shadow-md hover:scale-110 transition-transform duration-200 ${openBox === 'specialize' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setOpenBox(openBox === 'specialize' ? null : 'specialize')}
              >
                <IconB className="w-12 h-12 text-purple-500" />
              </button>
              <span className="mt-2 text-xs text-muted-foreground">Specialties</span>
              {openBox === 'specialize' && (
                <div ref={boxRef} className="absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 mt-4 bg-background border border-border rounded-xl shadow-xl p-6 text-left animate-fade-in">
                  {specializeText}
                </div>
              )}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="mb-8">
            <p className="impact-statement text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              I build intelligent, scalable systems using Gen AI, Vision, and Voice tech — to Langchain-driven AI assistants.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="border border-border hover:border-blue-400 text-muted-foreground hover:text-blue-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-muted/50 backdrop-blur-sm relative group"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border hover:border-green-400 text-muted-foreground hover:text-green-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-muted/50 backdrop-blur-sm relative group"
            >
              <Download size={18} />
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Brief Intro Paragraph */}
          <div className="mb-12 max-w-4xl mx-auto">
            <p className="intro-text text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hi! I'm Shubham — an AI Engineer at <strong>64 Squares LLC</strong>, where I design real-time, production-ready systems powered by AI Agents, LLMs, computer vision, and speech AI.
            </p>
            <p className="intro-text text-lg md:text-xl text-muted-foreground leading-relaxed mt-4">
              With hands-on experience in YOLOv8, RAG, CoreML, Deepgram, Langchain, and OpenAI, I've created tools that detect defects in buildings, automate property workflows, and enable voice-driven assistants. My passion lies in solving real-world problems through intelligent automation, whether it's on-device inference or cloud-based AI pipelines.
            </p>
          </div>

          {/* What I Specialize In */}
          <div className="mb-12 specialization-section">
            <h3 className="section-header text-2xl md:text-3xl font-bold mb-8 text-foreground">What I Specialize In</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="specialization-card bg-card/50 p-6 rounded-xl border border-border hover:border-blue-400/50 transition-all duration-300">
                <div className="card-icon text-blue-500 mb-3">
                  <Brain size={32} />
                </div>
                <h4 className="card-title text-lg font-semibold mb-2 text-foreground">AI Agents & LLMs</h4>
                <p className="card-description text-muted-foreground text-sm">Langchain, RAG, OpenAI API, contextual memory</p>
              </div>
              <div className="specialization-card bg-card/50 p-6 rounded-xl border border-border hover:border-purple-400/50 transition-all duration-300">
                <div className="card-icon text-purple-500 mb-3">
                  <Eye size={32} />
                </div>
                <h4 className="card-title text-lg font-semibold mb-2 text-foreground">Computer Vision</h4>
                <p className="card-description text-muted-foreground text-sm">YOLOv8, AVFoundation, CoreML, image/video inference</p>
              </div>
              <div className="specialization-card bg-card/50 p-6 rounded-xl border border-border hover:border-cyan-400/50 transition-all duration-300">
                <div className="card-icon text-cyan-500 mb-3">
                  <Mic size={32} />
                </div>
                <h4 className="card-title text-lg font-semibold mb-2 text-foreground">Voice Interfaces</h4>
                <p className="card-description text-muted-foreground text-sm">Deepgram STT, TTS, Whisper — for smart assistants</p>
              </div>
            </div>
          </div>

          {/* Mini Highlights */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
              <div className="highlight-item flex items-center gap-2">
                <span className="highlight-icon text-green-400">
                  <Zap size={20} />
                </span>
                <span className="font-times">92% accurate real-time defect detection on iOS</span>
              </div>
              <div className="highlight-item flex items-center gap-2">
                <span className="highlight-icon text-blue-400">
                  <Link size={20} />
                </span>
                <span className="font-times">Seamless integration between backend, frontend, and AI Agents</span>
              </div>
              <div className="highlight-item flex items-center gap-2">
                <span className="highlight-icon text-purple-400">
                  <Package size={20} />
                </span>
                <span className="font-times">Containerized ML workflows for easy deployment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <ArrowDown className="text-muted-foreground animate-pulse" size={24} />
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
