import { useId } from 'react';

/**
 * Cinematic ambient background — soft glows, vignette, faint orbital art.
 * Sits behind section content, low opacity, purely decorative.
 *
 * Shared by About, Projects, Skills, Certifications and Contact so every
 * section reads as the same surface. The SVG gradient ids are per-instance
 * because several of these render on the same page and duplicate ids would
 * make every instance resolve to the first one's paint server.
 */
const SectionAmbience = () => {
  const uid = useId().replace(/:/g, '');
  const orbitStroke = `orbitStroke-${uid}`;
  const globeGrad = `globeGrad-${uid}`;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(560px circle at 6% 94%, rgba(139,92,246,0.14), transparent 62%),' +
            'radial-gradient(620px circle at 10% 6%, rgba(79,140,255,0.12), transparent 62%),' +
            'radial-gradient(680px circle at 96% 65%, rgba(34,211,238,0.07), transparent 62%),' +
            'radial-gradient(1200px circle at 50% 50%, transparent 55%, rgba(3,7,18,0.65) 100%)',
        }}
      />
      {/* Faint orbital rings behind the headline */}
      <svg className="absolute top-10 left-[-80px] w-[520px] h-[520px] opacity-[0.07]" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="190" fill="none" stroke={`url(#${orbitStroke})`} strokeWidth="1" />
        <circle cx="200" cy="200" r="130" fill="none" stroke={`url(#${orbitStroke})`} strokeWidth="1" />
        <circle cx="200" cy="200" r="70" fill="none" stroke={`url(#${orbitStroke})`} strokeWidth="1" />
        <defs>
          <linearGradient id={orbitStroke} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F8CFF" />
            <stop offset="100%" stopColor="#9B5CFF" />
          </linearGradient>
        </defs>
      </svg>
      {/* Decorative globe, top-right */}
      <svg className="absolute -top-16 -right-16 w-[420px] h-[420px] opacity-50" viewBox="0 0 200 200">
        <defs>
          <radialGradient id={globeGrad} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(79,140,255,0.22)" />
            <stop offset="100%" stopColor="rgba(3,7,18,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill={`url(#${globeGrad})`} />
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(79,140,255,0.2)" strokeWidth="1" />
        <ellipse cx="100" cy="100" rx="90" ry="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
      {/* Subtle glow to keep the space around/below the content from reading as empty */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(520px circle at 78% 62%, rgba(79,140,255,0.06), transparent 65%)',
        }}
      />
      <svg className="absolute top-1/3 right-[6%] w-[260px] h-[260px] opacity-[0.05]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#4F8CFF" strokeWidth="1" />
      </svg>
      {/* Faint connection nodes, bottom-left */}
      <svg className="absolute bottom-0 left-0 w-[360px] h-[220px] opacity-[0.08]" viewBox="0 0 360 220">
        <line x1="20" y1="200" x2="140" y2="120" stroke="#22D3EE" strokeWidth="1" />
        <line x1="140" y1="120" x2="260" y2="160" stroke="#4F8CFF" strokeWidth="1" />
        <line x1="140" y1="120" x2="200" y2="40" stroke="#9B5CFF" strokeWidth="1" />
        <circle cx="20" cy="200" r="3" fill="#22D3EE" />
        <circle cx="140" cy="120" r="3" fill="#4F8CFF" />
        <circle cx="260" cy="160" r="3" fill="#4F8CFF" />
        <circle cx="200" cy="40" r="3" fill="#9B5CFF" />
      </svg>
    </div>
  );
};

export default SectionAmbience;
