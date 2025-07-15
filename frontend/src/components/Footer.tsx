import { useEffect, useState } from 'react';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [cloneCount, setCloneCount] = useState(0);

  useEffect(() => {
    // Use countapi.xyz to increment and get the global visitor count
    fetch('https://api.countapi.xyz/hit/portfolio-shubhamchougale01/vercel')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) setCloneCount(data.count);
      })
      .catch(() => setCloneCount(0));
  }, []);

  return (
    <footer className="bg-background border-t border-border py-12">
      {/* <div className="container mx-auto px-6"> */}
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Shubham Chougale
          </div>
          <p className="text-muted-foreground mb-4">
          • AI Engineer • Data Scientist 
          </p>
          {/* <span className="ml-0 md:ml-4"> 0000{visitorCount} - visitors </span>
          <span className="ml-0 md:ml-4"> 0000{cloneCount} - Git clone</span> */}
          <p className="text-muted-foreground/70 text-sm">
            © Shubham Chougale 2025 • Built with passion for AI and innovation.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
