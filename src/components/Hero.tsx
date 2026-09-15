import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isRevealing = true }: { isRevealing?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Layer Refs for Parallax & Character Animation
  const layerBgRef = useRef<HTMLImageElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLImageElement>(null);
  const headRef = useRef<HTMLImageElement>(null);
  const armRef = useRef<HTMLImageElement>(null);
  const bandanaRef = useRef<HTMLImageElement>(null);

  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial reveal state setup
    if (!isRevealing) {
      gsap.set([title1Ref.current, title2Ref.current], { y: 80, opacity: 0 });
      gsap.set(metaRef.current, { opacity: 0, y: 10 });
      return;
    }

    // Entrance Animation when revealed
    gsap.to([title1Ref.current, title2Ref.current], {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "cubic-bezier(.16, 1, .3, 1)",
    });
    
    gsap.to(metaRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });

    // Explicitly set the initial state for all moving layers 
    // to prevent any layout shifts or seams before scroll begins.
    gsap.set([
      layerBgRef.current, 
      carRef.current,
      bodyRef.current, 
      headRef.current, 
      armRef.current, 
      bandanaRef.current
    ], { 
      x: 0, 
      y: 0, 
      rotation: 0, 
      scale: 1 
    });

    gsap.set([title1Ref.current, title2Ref.current], {
      xPercent: 0,
      yPercent: 0
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pinned for 1.5x viewport height
          scrub: 1,      // Slight smoothing
          pin: true,
          pinSpacing: false, // Allows the next section to scroll OVER this one!
        }
      });

      // Layered animation
      tl.to(bgRef.current, { scale: 1.0, ease: "none", duration: 1 }, 0)
        .to(title1Ref.current, { yPercent: reduceMotion ? 0 : -30, xPercent: reduceMotion ? 0 : -5, ease: "none", duration: 1 }, 0)
        .to(title2Ref.current, { yPercent: reduceMotion ? 0 : -20, xPercent: reduceMotion ? 0 : 5, ease: "none", duration: 1 }, 0)
        .to(overlayRef.current, { opacity: 0.8, ease: "none", duration: 1 }, 0);
        
      if (!reduceMotion) {
        // --- CHARACTER LAYER ANIMATIONS ---
        // duration 0.45 means it completes in the first ~45% of the scroll timeline
        tl.to(layerBgRef.current, { y: 15, ease: "none", duration: 1 }, 0)
          .to(carRef.current, { y: 8, ease: "none", duration: 1 }, 0)
          .to(bodyRef.current, { y: 2, ease: "none", duration: 1 }, 0)
          .to(headRef.current, { y: -2, rotation: 0.5, transformOrigin: "bottom center", ease: "power2.out", duration: 0.45 }, 0)
          .to(armRef.current, { y: -12, x: -2, rotation: -0.5, transformOrigin: "bottom right", ease: "power2.out", duration: 0.45 }, 0)
          .to(bandanaRef.current, { y: -18, x: -1, rotation: -0.5, transformOrigin: "bottom right", ease: "power2.out", duration: 0.45 }, 0)
          .to([title1Ref.current, title2Ref.current], { 
             clipPath: "inset(100% 0 0 0)", 
             ease: "power2.inOut",
             duration: 0.5
           }, 0.5); // Starts clipping out the text halfway through
      } else {
        tl.to([title1Ref.current, title2Ref.current], { 
             opacity: 0, 
             ease: "power2.inOut",
             duration: 0.5
           }, 0.5); // Fallback fade for reduced motion
      }
    });

    mm.add("(max-width: 767px)", () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Simplified for mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      });

      tl.to(bgRef.current, { scale: 1.0, ease: "none", duration: 1 }, 0);
      
      if (!reduceMotion) {
        tl.to(layerBgRef.current, { y: 10, ease: "none", duration: 1 }, 0)
          .to(carRef.current, { y: 5, ease: "none", duration: 1 }, 0)
          .to(armRef.current, { y: -6, x: -1, ease: "power2.out", duration: 0.45 }, 0)
          .to(bandanaRef.current, { y: -10, rotation: -0.2, ease: "power2.out", duration: 0.45 }, 0);
      }
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [isRevealing] });

  return (
    <section ref={containerRef} id="home" className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden z-0">
      
      {/* Photorealistic Background */}
      <div 
        ref={bgRef}
        className="hero-scene absolute inset-0 w-full h-full origin-center scale-[1.08]"
      >
        {/* Base Fallback Image */}
        <img 
          src="/sriba.png" 
          alt="Srijith Base Portrait" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* DYNAMIC LAYERS */}
        {/* These expect transparent PNGs in public/layers/
            If they don't exist yet, onError hides them silently.
        */}
        <img 
          ref={layerBgRef}
          src="/layers/hero-bg.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-10 will-change-transform"
        />
        <img 
          ref={carRef}
          src="/layers/hero-car.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-15 will-change-transform"
        />
        <img 
          ref={bodyRef}
          src="/layers/hero-body.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-20 will-change-transform"
        />
        <img 
          ref={headRef}
          src="/layers/hero-head.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-30 will-change-transform"
        />
        <img 
          ref={armRef}
          src="/layers/hero-arm.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-40 will-change-transform"
        />
        <img 
          ref={bandanaRef}
          src="/layers/hero-bandana.png" 
          onError={(e) => e.currentTarget.style.display = 'none'}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-50 will-change-transform"
        />

        {/* Cinematic Gradient Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-[#090909]/40 via-transparent to-[#090909] opacity-80 mix-blend-multiply z-[60]" 
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-[70] w-full max-w-[100vw] h-full flex flex-col justify-between px-6 md:px-12 pt-32 pb-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start w-full">
          {/* Left subtle indicator */}
          <div className="font-mono text-xs tracking-widest text-brand-text/70 uppercase">
            SB//
          </div>
          {/* Right meta */}
          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest text-brand-text/70 uppercase">
            <div>INDIA — 2026</div>
            <div>AI ENGINEERING / SOFTWARE ENGINEERING</div>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="flex-1 flex flex-col justify-between pt-12 pb-32 mt-auto mb-auto pointer-events-none relative mix-blend-normal">
          <h1 
            ref={title1Ref}
            className="font-display text-[clamp(4.5rem,14vw,14rem)] leading-[0.78] tracking-[-0.02em] uppercase text-brand-text/90 m-0 p-0 block clip-path-full"
            style={{ clipPath: 'inset(0 0 0 0)', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            SRIJITH
          </h1>
          
          <h1 
            ref={title2Ref}
            className="font-display text-[clamp(4.5rem,14vw,14rem)] leading-[0.78] tracking-[-0.02em] uppercase text-brand-text/90 m-0 p-0 block text-right md:mr-[5vw] self-end"
            style={{ clipPath: 'inset(0 0 0 0)', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            BHANDARE
          </h1>
        </div>

        {/* Bottom Details */}
        <div ref={metaRef as any} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full mt-auto">
          <div className="flex flex-col">
            <h2 className="font-sans text-sm md:text-base font-semibold tracking-wide text-brand-text/80 uppercase leading-tight">
              BUILDING SOFTWARE.<br />
              EXPLORING INTELLIGENCE.
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2 opacity-50">
              <span className="font-mono text-[8px] tracking-widest">SCROLL TO EXPLORE</span>
              <div className="w-[1px] h-8 bg-brand-text/30 overflow-hidden">
                <div className="w-full h-full bg-brand-text animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
