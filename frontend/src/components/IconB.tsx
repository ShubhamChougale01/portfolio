const IconB = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="20" y="20" width="60" height="60" rx="10" fill="currentColor"/>
    <path d="M50 35V65" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
    <path d="M35 50H65" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export default IconB; 