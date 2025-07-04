const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Shubham Chougale
          </div>
          <p className="text-muted-foreground mb-4">
            AI Engineer • Data Scientist • Problem Solver
          </p>
          <p className="text-muted-foreground/70 text-sm mb-6 italic">
            "Exploring the frontiers of AI, one model at a time."
          </p>
          <p className="text-muted-foreground/70 text-sm">
            © 2024 Shubham Chougale. All rights reserved. • Built with passion for AI and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
