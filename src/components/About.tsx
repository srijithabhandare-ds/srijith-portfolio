import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Line masking word reveal
    const lines = gsap.utils.toArray('.reveal-line') as HTMLElement[];
    
    gsap.fromTo(lines, 
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Scroll-linked text color reveal
    gsap.fromTo(".fade-text-reveal", 
      { color: "rgba(11, 11, 11, 0.2)" },
      {
        color: "rgba(11, 11, 11, 1)",
        scrollTrigger: {
          trigger: ".fade-text-reveal",
          start: "top 80%",
          end: "bottom 40%",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="relative min-h-[120svh] w-full bg-brand-cream text-[#0B0B0B] overflow-hidden flex flex-col justify-center py-24 z-10 rounded-t-[2rem] md:rounded-t-[4rem] -mt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24">
          
          {/* Left: Giant Statement */}
          <div className="w-full md:w-3/5" ref={textContainerRef}>
            <h2 className="font-display text-[clamp(4rem,10vw,10rem)] uppercase leading-[0.8] tracking-[-0.02em] text-[#0B0B0B] m-0 p-0 flex flex-col gap-2">
              <div className="overflow-hidden">
                <div className="reveal-line">I WANT TO</div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-line">UNDERSTAND</div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-line">HOW THINGS</div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-line">WORK.</div>
              </div>
            </h2>
          </div>

          {/* Right: Small Body Copy */}
          <div className="w-full md:w-2/5 md:pt-[2vw] flex flex-col gap-12">
            
            <div className="text-lg md:text-2xl font-sans font-medium leading-relaxed text-[#0B0B0B] fade-text-reveal">
              I'm Srijith A Bhandare, a Data Science student building toward AI Engineering and Software Engineering. I learn through building, not just reading.
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="border-t border-black/10 pt-6">
                <h3 className="font-mono text-[10px] tracking-widest text-[#0B0B0B]/60 uppercase mb-4">THE ARCHITECTURE</h3>
                <p className="font-sans text-sm text-[#0B0B0B]/80 leading-relaxed font-medium">
                  I prefer understanding the foundation over blindly using an abstraction. Whether it's training a neural network from scratch or structuring a backend API, I build to see the gears turning.
                </p>
              </div>

              <div className="border-t border-black/10 pt-6">
                <h3 className="font-mono text-[10px] tracking-widest text-[#0B0B0B]/60 uppercase mb-4">OUTSIDE TECH</h3>
                <p className="font-sans text-sm text-[#0B0B0B]/80 leading-relaxed font-medium">
                  When I'm not writing code or reading documentation, you'll find me playing Cricket, watching Football, or analyzing the cinematography of my favorite movies.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
