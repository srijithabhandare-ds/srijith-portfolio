import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
  onRevealStart: () => void;
}

export default function LoadingScreen({ onComplete, onRevealStart }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    let isPageLoaded = document.readyState === 'complete';
    let currentProgress = 0;
    const counterObj = { val: 0 };
    let interval: ReturnType<typeof setInterval>;

    const completeLoading = () => {
      isPageLoaded = true;
    };

    if (!isPageLoaded) {
      window.addEventListener('load', completeLoading);
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    gsap.set(logoRef.current, { yPercent: 110 });
    gsap.set(nameRef.current, { opacity: 0 });
    gsap.set(subtextRef.current, { opacity: 0 });
    gsap.set(counterRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });

    tl.to(logoRef.current, {
      yPercent: 0,
      duration: 0.6,
      ease: 'cubic-bezier(.16, 1, .3, 1)',
      delay: 0.15
    });

    tl.to(logoRef.current, {
      scale: 1.015,
      duration: 0.1,
      ease: 'power1.out'
    }).to(logoRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power1.out'
    });

    tl.to(nameRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, "-=0.2");
    tl.to(subtextRef.current, { opacity: 0.35, duration: 0.4, ease: 'power2.out' }, "-=0.3");
    tl.to(counterRef.current, { opacity: 0.35, duration: 0.4 }, "-=0.4");

    const finishTimeline = () => {
      const outTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });
      outTl.add(() => {
        onRevealStart();
      }, "+=0.15");

      if (!reduceMotion) {
        outTl.to(logoRef.current, { scale: 1.07, duration: 0.3, ease: 'power2.out' }, "<");
        outTl.to([nameRef.current, subtextRef.current, counterRef.current, lineRef.current], {
          opacity: 0, duration: 0.3, ease: 'power2.out'
        }, "<");
        outTl.to(topCurtainRef.current, { yPercent: -100, duration: 0.95, ease: 'cubic-bezier(.76, 0, .24, 1)' }, "<0.1");
        outTl.to(bottomCurtainRef.current, { yPercent: 100, duration: 0.95, ease: 'cubic-bezier(.76, 0, .24, 1)' }, "<");
      } else {
        outTl.to(containerRef.current, { opacity: 0, duration: 0.5 }, "<0.2");
      }
    };

    tl.add(() => {
      interval = setInterval(() => {
        if (isPageLoaded) {
          clearInterval(interval);
          gsap.to(lineRef.current, { scaleX: 1, duration: 0.2, ease: 'power2.out' });
          gsap.to(counterObj, {
            val: 100,
            duration: 0.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = `READY / 100`;
            },
            onComplete: finishTimeline
          });
        } else {
          currentProgress += Math.floor(Math.random() * 10) + 2;
          if (currentProgress > 85) currentProgress = 85;
          gsap.to(lineRef.current, { scaleX: currentProgress / 100, duration: 0.1, ease: 'linear' });
          gsap.to(counterObj, {
            val: currentProgress,
            duration: 0.1,
            ease: 'linear',
            onUpdate: () => {
              if (counterRef.current) {
                const val = Math.round(counterObj.val).toString().padStart(3, '0');
                counterRef.current.textContent = `LOADING / ${val}`;
              }
            }
          });
        }
      }, 50);
    });
    
    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('load', completeLoading);
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete, onRevealStart]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
      <div ref={topCurtainRef} className="absolute top-0 left-0 w-full h-[50vh] bg-[#000] will-change-transform" />
      <div ref={bottomCurtainRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#000] will-change-transform" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pb-8">
        <div ref={maskRef} className="overflow-hidden mb-[1px]">
          <div ref={logoRef} className="font-display text-7xl md:text-8xl text-white tracking-tighter leading-none will-change-transform" style={{ transformOrigin: 'center' }}>
            SB
          </div>
        </div>
        <div ref={nameRef} className="font-sans text-[clamp(12px,0.9vw,16px)] text-white tracking-[0.22em] uppercase mb-4 text-center will-change-opacity">
          SRIJITH BHANDARE
        </div>
        <div ref={subtextRef} className="flex flex-col items-center font-sans text-[9px] text-white tracking-[0.18em] uppercase gap-1 text-center will-change-opacity">
          <div>PORTFOLIO / 2026</div>
          <div>DATA • SOFTWARE • AI</div>
        </div>
      </div>

      <div ref={counterRef} className="absolute bottom-4 right-4 font-mono text-[9px] text-white tracking-[0.12em] z-10 will-change-opacity">
        LOADING / 000
      </div>
      <div ref={lineRef} className="absolute bottom-0 left-0 h-[1px] w-full bg-white/80 z-10 will-change-transform" />
    </div>
  );
}
