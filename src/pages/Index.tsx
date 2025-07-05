import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
