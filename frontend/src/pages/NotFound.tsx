import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-6">
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-white/50 uppercase mb-4">
          Error
        </p>
        <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-3">
          4
          <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>
        <p className="text-slate-400 text-base mb-8">
          That page doesn't exist — it may have moved or never been here.
        </p>
        <a
          href="/"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-6 py-3 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: '0 4px 24px rgba(79,140,255,0.25)' }}
        >
          Return home
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default NotFound;
