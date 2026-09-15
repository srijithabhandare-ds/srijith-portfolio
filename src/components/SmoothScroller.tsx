import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Optimize GSAP ticker for high refresh rate monitors (120Hz/100fps+)
    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      lerp: 0.1, // Snappier interpolation
      wheelMultiplier: 1.0, // Native wheel feel
      smoothWheel: true,
      syncTouch: false, // Keep native touch scrolling on mobile for max FPS
    });

    lenis.on('scroll', ScrollTrigger.update);

    // High-performance RAF loop
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
}
