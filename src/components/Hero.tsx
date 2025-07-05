import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
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

      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
            <div className="text-center">
              <span className="inline-block animate-pulse">Shubham Chougale</span>
              <span className="block text-3xl animate-pulse">AI Engineer</span>
              <span className="inline-flex text-xl animate-pulse"> AI Agents | Computer Vision | LLMs </span>
            </div>

          </h1>

          <div className="space-y-4 mb-12 text-muted-foreground">
            <p className="text-xl md:text-2xl flex items-center justify-center gap-3 animate-fade-in delay-500">
              <span className="animate-bounce"></span>
              <span>Turning data into solutions, and AI into impact.</span>
            </p>
            <p className="text-xl md:text-2xl flex items-center justify-center gap-3 animate-fade-in delay-700">
              <span className="animate-bounce delay-200"></span>
              <span>Specializing in Computer Vision, LLMs, and Edge AI.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
            <a
              href="#project"
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
