
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Matrix-style code rain */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Spider web effect */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 600">
          <defs>
            <pattern id="web" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M 0 50 L 100 50 M 50 0 L 50 100 M 20 20 L 80 80 M 80 20 L 20 80" 
                    stroke="url(#gradient)" strokeWidth="0.5" opacity="0.3"/>
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

      {/* Floating neural network nodes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500/40 rounded-full animate-pulse">
          <div className="w-full h-full bg-blue-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-pulse delay-1000">
          <div className="w-full h-full bg-purple-400 rounded-full animate-ping delay-500"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-cyan-500/40 rounded-full animate-pulse delay-2000">
          <div className="w-full h-full bg-cyan-400 rounded-full animate-ping delay-1000"></div>
        </div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-pulse delay-500">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping delay-200"></div>
        </div>
      </div>

      {/* Glowing orbs with circuit patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/4 rounded-full blur-3xl animate-drift"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/3 rounded-full blur-3xl animate-float delay-1000"></div>
      </div>

      {/* Circuit board pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2lyY3VpdCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDMwIDAgTCAzMCAzMCBMIDYwIDMwIE0gMCAzMCBMIDMwIDMwIE0gMzAgMzAgTCAzMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NpcmN1aXQpIi8+PC9zdmc+')] opacity-15"></div>

      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-slate-100 leading-tight">
            <span className="inline-block animate-pulse">Shubham</span>{' '}
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-pulse delay-500">
              Chougale
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-8">
            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-semibold relative">
              <span className="animate-pulse">AI Engineer</span> & <span className="animate-pulse delay-300">Data Scientist</span>
              <div className="absolute -top-2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </span>
          </h2>
          
          <div className="space-y-4 mb-12 text-slate-300">
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
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="border border-slate-500 hover:border-blue-400 text-slate-300 hover:text-blue-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm relative group"
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
          <ArrowDown className="text-slate-400 animate-pulse" size={24} />
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
