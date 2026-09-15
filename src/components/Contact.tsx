import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Background Zoom
    gsap.fromTo(bgRef.current,
      { scale: 1.1 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    // Text Reveal
    mm.add("(min-width: 768px)", () => {
      const lines = gsap.utils.toArray('.contact-reveal-line') as HTMLElement[];
      
      gsap.fromTo(lines,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden z-0 border-t border-brand-border/10">
      
      {/* Night Arriving Over Coastal City */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full origin-bottom"
      >
        <img 
          src="https://images.unsplash.com/photo-1506461883276-594a12b11caf?q=80&w=3270&auto=format&fit=crop" 
          alt="Night arriving over city" 
          className="w-full h-full object-cover object-bottom"
        />
        {/* Darkening gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/80" />
        <div className="absolute inset-0 bg-[#090909]/30" />
      </div>

      <div className="relative z-10 w-full max-w-[100vw] px-6 md:px-12 flex flex-col items-center text-center">
        
        <div className="mb-16" ref={textContainerRef}>
          <h2 className="font-display text-[clamp(4rem,18vw,18rem)] uppercase tracking-[-0.02em] leading-[0.8] text-brand-text flex flex-col">
            <div className="overflow-hidden">
              <span className="block contact-reveal-line">LET'S</span>
            </div>
            <div className="overflow-hidden">
              <span className="block text-stroke-light contact-reveal-line">BUILD</span>
            </div>
            <div className="overflow-hidden">
              <span className="block text-brand-amber contact-reveal-line">SOMETHING.</span>
            </div>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8">
          <MagneticButton href="mailto:srijithabhandare.in@gmail.com" className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand-text hover:text-brand-amber transition-colors duration-500">
            EMAIL
          </MagneticButton>
          <MagneticButton href="https://github.com/srijithabhandare-ds" className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand-text hover:text-brand-amber transition-colors duration-500">
            GITHUB
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/srijith-a-bhandare-497625410/" className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand-text hover:text-brand-amber transition-colors duration-500">
            LINKEDIN
          </MagneticButton>
          <MagneticButton href="/resume.pdf" className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand-text hover:text-brand-amber transition-colors duration-500">
            RESUME
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
