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
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My AI Journey
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                With over 1.5 years of experience in AI and Machine Learning, I specialize in building 
                practical AI solutions that solve real-world problems. My journey started with traditional 
                software development and evolved into deep expertise in computer vision, natural language 
                processing, and edge AI implementations.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I've successfully deployed AI systems for property management, defect detection, 
                and intelligent automation across various industries. My passion lies in bridging 
                the gap between cutting-edge AI research and production-ready applications.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <h4 className="text-blue-400 font-semibold mb-2">Focus Areas</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Computer Vision</li>
                    <li>• Large Language Models</li>
                    <li>• Edge AI & Mobile ML</li>
                    <li>• Generative AI</li>
                  </ul>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <h4 className="text-purple-400 font-semibold mb-2">Industries</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Real Estate Tech</li>
                    <li>• Manufacturing</li>
                    <li>• Healthcare</li>
                    <li>• Automation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 rounded-2xl border border-border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">AI/ML Engineering</span>
                    <span className="text-blue-400 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full w-[95%]"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Computer Vision</span>
                    <span className="text-purple-400 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full w-[90%]"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">LLM Integration</span>
                    <span className="text-green-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-[85%]"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cloud & DevOps</span>
                    <span className="text-yellow-400 font-semibold">88%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full w-[88%]"></div>
                  </div>
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
