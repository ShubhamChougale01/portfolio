import { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to collaborate?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in discussing new opportunities, innovative AI projects, 
                and potential collaborations. Whether you're looking for an AI engineer to join 
                your team or need consultation on ML implementations, let's talk!
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">
                  What I'm looking for:
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Senior AI/ML Engineering roles</li>
                  <li>• Computer Vision project collaborations</li>
                  <li>• LLM integration consulting</li>
                  <li>• Edge AI and mobile ML opportunities</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">
                  My expertise includes:
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• End-to-end ML pipeline development</li>
                  <li>• Production AI system deployment</li>
                  <li>• Cross-platform mobile AI solutions</li>
                  <li>• RAG and LLM integration</li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="flex items-center space-x-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg border border-border hover:border-blue-500 transition-all duration-300"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center space-x-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg border border-border hover:border-blue-500 transition-all duration-300"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-foreground font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-foreground font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-foreground font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
