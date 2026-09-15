import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    id: "01",
    type: "HACKATHON",
    title: "CODE RUSH",
    subtitle: "24HRS HACKATHON",
    issuer: "",
    credentialId: "",
    credentialUrl: "https://unstop.com/certificate-preview/07a71f6d-9d39-44fe-b927-c7aff416c797"
  },
  {
    id: "02",
    type: "INNOVATION",
    title: "IDEA SPRINT",
    subtitle: "NATIONAL INNOVATION CHALLENGE",
    issuer: "INDIAN INSTITUTE OF TECHNOLOGY\nTIRUPATI",
    credentialId: "",
    credentialUrl: "https://unstop.com/certificate-preview/e8c509e0-43bf-4090-a792-4dd64c1b90d2"
  },
  {
    id: "03",
    type: "HACKATHON",
    title: "ISRO\nHACKATHON 2026",
    subtitle: "",
    issuer: "INDIAN SPACE RESEARCH ORGANISATION",
    credentialId: "2026H2S06BAH-P00817",
    credentialUrl: "https://certificate.hack2skill.com/verify/2026H2S06BAH-P00817"
  }
];

export default function Credentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.from(headerElements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          clipPath: "inset(100% 0 0 0)"
        });
      }

      // List Items Animation
      const items = listRef.current?.querySelectorAll('.credential-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
          });

          const divider = item.querySelector('.credential-divider');
          if (divider) {
            gsap.from(divider, {
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1,
              ease: "power3.inOut",
              delay: 0.2
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="credentials" className="relative py-32 px-6 md:px-12 w-full max-w-[100vw] overflow-hidden bg-brand-bg z-10">
      
      {/* Header */}
      <div ref={headerRef} className="mb-24 flex flex-col items-start">
        <div className="font-mono text-xs tracking-widest text-brand-text/50 uppercase mb-6" style={{ clipPath: 'inset(0 0 0 0)' }}>
          05 // CREDENTIALS
        </div>
        <h2 
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight uppercase text-brand-text/90 m-0 p-0"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          PROOF OF<br/>WORK.
        </h2>
        <p className="mt-8 font-sans text-sm md:text-base text-brand-text/60 max-w-sm uppercase tracking-wide leading-relaxed" style={{ clipPath: 'inset(0 0 0 0)' }}>
          Selected hackathons, innovation challenges and technical experiences.
        </p>
      </div>

      {/* List */}
      <div ref={listRef} className="flex flex-col w-full">
        {credentials.map((cred) => {
          const isHovered = hoveredId === cred.id;
          const isISRO = cred.id === "03";

          return (
            <div 
              key={cred.id} 
              className="credential-item group relative flex flex-col pt-8 pb-12 cursor-pointer"
              onMouseEnter={() => setHoveredId(cred.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Divider */}
              <div className="credential-divider absolute top-0 left-0 w-full h-[1px] bg-brand-text/10 group-hover:bg-brand-text/30 group-hover:scale-y-[2] transform-gpu origin-top transition-all duration-500" />
              
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 relative z-10 w-full">
                
                {/* Meta / Number */}
                <div className="flex-shrink-0 font-mono text-xs md:text-sm tracking-widest text-brand-text/40 uppercase group-hover:text-brand-text/70 transition-colors duration-500">
                  {cred.id} / {cred.type}
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-start w-full max-w-4xl">
                  {isISRO ? (
                    <h3 className="font-display text-4xl md:text-6xl lg:text-[7rem] leading-[0.85] tracking-tight uppercase text-brand-text/90 transition-transform duration-500 ease-out group-hover:translate-x-2">
                      ISRO<br/>HACKATHON
                    </h3>
                  ) : (
                    <>
                      <h3 className="font-display text-4xl md:text-6xl lg:text-[6rem] leading-[0.85] tracking-tight uppercase text-brand-text/90 transition-transform duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-3">
                        {cred.title}
                      </h3>
                      {cred.subtitle && (
                        <p className="font-display text-3xl md:text-5xl lg:text-[4rem] leading-[0.85] tracking-tight uppercase text-brand-text/60 mt-2 transition-transform duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-3">
                          {cred.subtitle}
                        </p>
                      )}
                    </>
                  )}
                  
                  <div className="mt-8 flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6">
                    <div className="flex flex-col gap-1">
                      {cred.issuer && (
                        <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-brand-text/40 group-hover:text-brand-text/60 transition-colors duration-500 whitespace-pre-line">
                          {cred.issuer}
                        </p>
                      )}
                      {cred.credentialId && (
                        <div className="mt-4 flex flex-col gap-1">
                          <span className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase text-brand-text/30">CREDENTIAL_ID //</span>
                          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand-text/40 group-hover:text-brand-text/80 transition-colors duration-500">{cred.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action / Link */}
                <div className="flex-shrink-0 lg:ml-auto self-start lg:self-end mt-4 lg:mt-0">
                  <a 
                    href={cred.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest uppercase text-brand-text/50 hover:text-brand-text/90 transition-colors duration-300"
                  >
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                      [{isISRO ? 'VERIFY' : 'VIEW CREDENTIAL'}
                    </span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover/link:rotate-12" />
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
                  </a>
                </div>

              </div>
              
              {/* Certificate Preview (Desktop Hover) */}
              <div 
                className={`hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out z-0 origin-right
                  ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-8'}
                `}
              >
                <div className="w-[300px] h-[200px] bg-brand-text/5 border border-brand-text/10 flex items-center justify-center p-4">
                  <div className="text-center font-mono text-[10px] tracking-widest text-brand-text/30 uppercase">
                    Preview Data<br/>Unavailable
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
