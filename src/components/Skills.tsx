const Skills = () => {
  const skillCategories = [
    {
      title: "AI/ML Frameworks",
      color: "from-blue-400 to-blue-600",
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "Scikit-learn", level: 95 },
        { name: "OpenCV", level: 88 },
        { name: "Hugging Face", level: 80 }
      ]
    },
    {
      title: "LLM & NLP",
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "LangChain", level: 92 },
        { name: "OpenAI API", level: 95 },
        { name: "RAG Systems", level: 88 },
        { name: "Vector DBs", level: 85 },
        { name: "Transformers", level: 82 }
      ]
    },
    {
      title: "Computer Vision",
      color: "from-green-400 to-green-600",
      skills: [
        { name: "YOLO", level: 90 },
        { name: "Object Detection", level: 92 },
        { name: "Image Seg.", level: 85 },
        { name: "CoreML", level: 88 },
        { name: "TensorFlow Lite", level: 86 }
      ]
    },
    {
      title: "Cloud & DevOps",
      color: "from-orange-400 to-orange-600",
      skills: [
        { name: "AWS", level: 88 },
        { name: "Docker", level: 90 },
        { name: "Jenkins", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "MLOps", level: 82 }
      ]
    },
    {
      title: "Programming",
      color: "from-red-400 to-red-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 88 },
        { name: "Swift", level: 80 },
        { name: "SQL", level: 90 },
        { name: "R", level: 75 }
      ]
    },
    {
      title: "Mobile & Edge",
      color: "from-teal-400 to-teal-600",
      skills: [
        { name: "Capacitor", level: 92 },
        { name: "React Native", level: 85 },
        { name: "iOS Dev", level: 80 },
        { name: "Edge AI", level: 88 },
        { name: "Mobile ML", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-card p-6 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium text-sm">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="mt-20">
          {/* <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Certifications & Achievements
          </h3> */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "AWS Machine Learning", provider: "Amazon", year: "2023" },
              { name: "TensorFlow Developer", provider: "Google", year: "2023" },
              { name: "Deep Learning Specialization", provider: "Coursera", year: "2022" },
              { name: "Computer Vision Nanodegree", provider: "Udacity", year: "2022" }
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg border border-border text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 font-semibold text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-muted-foreground text-xs mb-1">
                  {cert.provider}
                </div>
                <div className="text-muted-foreground/70 text-xs">
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
