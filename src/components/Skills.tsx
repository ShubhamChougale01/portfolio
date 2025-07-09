const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      color: "from-cyan-400 to-cyan-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "Terraform", level: 60 },
        { name: "Swift", level: 40 },
        { name: "TypeScript", level: 40 }
      ]
    },
    {
      title: "Artificial Intelligence",
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "LangChain", level: 90 },
        { name: "OpenAI & Mistral", level: 88 },
        { name: "RAG", level: 88 },
        { name: "Vector DBs", level: 85 },
        { name: "AI Agents", level: 82 }
      ]
    },
    {
      title: "Computer Vision",
      color: "from-green-400 to-green-600",
      skills: [
        { name: "Ultralytics", level: 90 },
        { name: "Object Detection", level: 90 },
        { name: "Image Classification", level: 85 },
        { name: "Roboflow", level: 85 },
        { name: "Video Processing", level: 85 }
      ]
    },
    {
      title: "Data Science",
      color: "from-blue-400 to-blue-600",
      skills: [
        { name: "TensorFlow", level: 70 },
        { name: "PyTorch", level: 70 },
        { name: "OpenCV", level: 70 },
        { name: "CoreML", level: 40 }
      ]
    },
    {
      title: "Cloud Platforms",
      color: "from-orange-400 to-orange-600",
      skills: [
        { name: "AWS", level: 78 },
        { name: "Docker", level: 70 },
        { name: "Jenkins CI/CD", level: 70 },
        { name: "Kubernetes", level: 60 }
        // { name: "MLOps", level: 82 }
      ]
    },
    {
      title: "General Skills:",
      color: "from-teal-400 to-teal-600",
      skills: [
        { name: "Django", level: 80 },
        { name: "FastAPI", level: 75 },
        { name: "GIT", level: 75 },
        { name: "Capacitor", level: 40 }
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

        {/* Language Proficiency Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Language Proficiency
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="font-medium">English</span>
              <span className="text-muted-foreground text-sm">Professional</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="font-medium">Hindi</span>
              <span className="text-muted-foreground text-sm">Professional</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="font-medium">Marathi</span>
              <span className="text-muted-foreground text-sm">Native</span>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
          </div> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "SnowPro Core Certification",
                provider: "Snowflake",
                year: "Aug 2024 – Aug 2026",
                id: "SNOW00300789‎",
                // skills: "Cloud · Snowflake · SQL"
              },
              {
                name: "Hands-On Essentials: Collaboration, Marketplace & Cost Estimation",
                provider: "Snowflake",
                year: "Apr 2024",
                id: "100383374"
              },
              {
                name: "Hands-On Essentials: Data Warehousing",
                provider: "Snowflake",
                year: "Mar 2024",
                id: "98109249"
              },
              {
                name: "Data Science with AIML",
                provider: "Dohme Global Group AMZ",
                year: "Dec 2019",
                id: "AMZ/WTP-DS/2019/06",
                // skills: "NLP · NumPy · Image Processing · pandas"
              },
              {
                name: "Python for Data Science",
                provider: "IBM",
                year: "Jul 2023",
                // skills: "Python · pandas"
              },
              {
                name: "Basics of Networking",
                provider: "I-Medita Learning Solutions",
                year: "Mar 2022",
                // skills: "Networking"
              },
              {
                name: "Data Analytics Essentials",
                provider: "Cisco",
                year: "Jul 2023",
                // skills: "Excel · Tableau · Data Analysis · SQL"
              },
              {
                name: "Certificate in Computer Basics",
                provider: "Vivekanand College, Kolhapur",
                year: "May 2019",
                // skills: "MS Excel · HTML5 · CSS · Office"
              }
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
                <div className="text-muted-foreground/70 text-xs mb-1">
                  {cert.year}
                </div>
                {cert.id && (
                  <div className="text-muted-foreground/60 text-[10px] italic mb-1">
                    ID: {cert.id}
                  </div>
                )}
                {/* {cert.skills && (
                  <div className="text-muted-foreground text-[11px] leading-tight">
                    {cert.skills}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
