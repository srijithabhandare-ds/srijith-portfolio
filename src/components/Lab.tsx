import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { labExperiments } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Lab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop Horizontal Scroll
    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.lab-panel') as HTMLElement[];
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWrapperRef.current?.offsetWidth || window.innerWidth * 2}`,
        }
      });

      gsap.fromTo(titleRef.current, 
        { y: "10%" },
        {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Mobile (No pinning, standard scroll)
    mm.add("(max-width: 767px)", () => {
      // Basic vertical layout on mobile
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="lab" ref={containerRef} className="relative bg-[#111111] overflow-hidden border-t border-brand-border/10">
      
      {/* Raw Texture Background */}
      <div 
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-0"
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
      />

      <div className="relative z-10 w-full h-[100svh] flex flex-col md:block">
        
        {/* Header - Stays visible or scrolls out depending on media query */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-8 border-b border-brand-text/10 flex flex-col md:flex-row md:items-end justify-between gap-8 md:absolute md:top-0 md:left-0 md:right-0 md:z-20">
          <h2 
            ref={titleRef}
            className="font-display text-[clamp(4rem,12vw,12rem)] uppercase tracking-[-0.02em] leading-[0.8] text-[#F4EFE8] m-0"
          >
            LAB
          </h2>
          <div className="font-mono text-xs tracking-widest text-brand-text/50 uppercase max-w-xs pb-4">
            Notes, experiments, and unfinished ideas. Understanding the machinery.
          </div>
        </div>

        {/* Scrolling Grid */}
        <div 
          ref={scrollWrapperRef}
          className="flex-1 md:h-full flex flex-col md:flex-row md:items-center mt-8 md:mt-0 px-6 md:px-0 pb-24 md:pb-0 gap-8 md:gap-0"
        >
          {/* spacer for desktop to account for absolute header */}
          <div className="hidden md:flex w-[20vw] shrink-0 lab-panel items-center justify-center h-full border-r border-brand-text/10" />

          {labExperiments.map((exp, idx) => (
            <div 
              key={exp.id}
              className={`lab-panel shrink-0 flex flex-col justify-between bg-[#131313] md:bg-transparent p-8 md:p-12 md:h-[60vh] md:border-r border-brand-text/10 
              ${idx === 0 ? 'w-full md:w-[60vw]' : 'w-full md:w-[40vw]'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-[10px] tracking-widest text-brand-text/40 uppercase bg-brand-text/5 px-2 py-1">
                    EXP // {exp.id}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-brand-amber uppercase">
                    [{exp.status}]
                  </span>
                </div>
                
                <h3 className={`font-display uppercase tracking-[-0.01em] leading-[0.9] text-brand-text mb-6 ${idx === 0 ? 'text-5xl md:text-7xl' : 'text-3xl md:text-5xl'}`}>
                  {exp.title}
                </h3>
                
                <p className="font-sans font-medium text-brand-text/60 leading-relaxed text-sm md:text-base md:max-w-md">
                  {exp.question}
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-brand-text/10 flex flex-wrap gap-2">
                {exp.tools.map(t => (
                  <span key={t} className="font-mono text-[10px] text-brand-text/50 uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="hidden md:block w-[10vw] shrink-0 lab-panel" />
        </div>

      </div>
    </section>
  );
}
