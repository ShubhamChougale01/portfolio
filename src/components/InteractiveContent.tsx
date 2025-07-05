import { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Mic, 
  Zap, 
  Link, 
  Package,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ContentItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  color: string;
}

const InteractiveContent = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const contentItems: ContentItem[] = [
    {
      id: 'ai-agents',
      icon: <Brain size={24} />,
      title: 'AI Agents & LLMs',
      description: 'Langchain, RAG, OpenAI API, contextual memory',
      details: 'I specialize in building intelligent AI agents using Langchain framework, implementing RAG (Retrieval-Augmented Generation) systems, integrating OpenAI APIs, and creating contextual memory systems that enable sophisticated conversational AI experiences.',
      color: 'blue'
    },
    {
      id: 'computer-vision',
      icon: <Eye size={24} />,
      title: 'Computer Vision',
      description: 'YOLOv8, AVFoundation, CoreML, image/video inference',
      details: 'Expert in computer vision technologies including YOLOv8 for object detection, AVFoundation for iOS media handling, CoreML for on-device machine learning, and real-time image/video inference systems.',
      color: 'purple'
    },
    {
      id: 'voice-interfaces',
      icon: <Mic size={24} />,
      title: 'Voice Interfaces',
      description: 'Deepgram STT, TTS, Whisper — for smart assistants',
      details: 'Building voice-driven AI assistants using Deepgram for Speech-to-Text, Text-to-Speech systems, OpenAI Whisper integration, and creating seamless voice interaction experiences.',
      color: 'cyan'
    },
    {
      id: 'defect-detection',
      icon: <Zap size={24} />,
      title: 'Real-time Defect Detection',
      description: '92% accurate real-time defect detection on iOS',
      details: 'Developed high-precision defect detection systems achieving 92% accuracy for real-time building inspection on iOS devices, using advanced computer vision algorithms and optimized inference pipelines.',
      color: 'green'
    },
    {
      id: 'integration',
      icon: <Link size={24} />,
      title: 'System Integration',
      description: 'Seamless integration between backend, frontend, and AI Agents',
      details: 'Creating cohesive systems that seamlessly integrate backend services, frontend interfaces, and AI agents, ensuring smooth data flow and optimal user experiences across all touchpoints.',
      color: 'blue'
    },
    {
      id: 'ml-workflows',
      icon: <Package size={24} />,
      title: 'ML Workflows',
      description: 'Containerized ML workflows for easy deployment',
      details: 'Designing and implementing containerized machine learning workflows using Docker and Kubernetes for scalable, reproducible, and easily deployable AI systems.',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
      purple: 'hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
      cyan: 'hover:border-cyan-400/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20',
      green: 'hover:border-green-400/50 hover:bg-green-50/50 dark:hover:bg-green-950/20'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      cyan: 'text-cyan-500',
      green: 'text-green-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Interactive Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {contentItems.map((item) => (
          <div
            key={item.id}
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105`}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
          >
            <div className={`
              p-6 rounded-xl border border-border bg-card/50 
              ${getColorClasses(item.color)}
              transition-all duration-300
              ${activeItem === item.id ? 'ring-2 ring-primary/50 shadow-lg' : ''}
            `}>
              <div className={`${getIconColor(item.color)} mb-3 transition-all duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg max-w-xs">
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    Click for details
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Content Panel */}
      {activeItem && (
        <div className="mb-8">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`${getIconColor(contentItems.find(item => item.id === activeItem)?.color || 'blue')}`}>
                  {contentItems.find(item => item.id === activeItem)?.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {contentItems.find(item => item.id === activeItem)?.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground font-medium">
                {contentItems.find(item => item.id === activeItem)?.description}
              </p>
              <div className="relative">
                <div className={`${isExpanded ? 'max-h-96' : 'max-h-20'} overflow-hidden transition-all duration-500 ease-in-out`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {contentItems.find(item => item.id === activeItem)?.details}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-200 mt-2"
                >
                  {isExpanded ? (
                    <>
                      <span className="text-sm">Show less</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span className="text-sm">Read more</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-blue-500" size={20} />
            <span className="font-semibold text-foreground">92%</span>
          </div>
          <p className="text-sm text-muted-foreground">Accuracy in defect detection</p>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/20 dark:border-green-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link className="text-green-500" size={20} />
            <span className="font-semibold text-foreground">100%</span>
          </div>
          <p className="text-sm text-muted-foreground">System integration success</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/20 dark:border-purple-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-purple-500" size={20} />
            <span className="font-semibold text-foreground">24/7</span>
          </div>
          <p className="text-sm text-muted-foreground">Deployment availability</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveContent; 