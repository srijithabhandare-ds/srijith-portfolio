import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Background() {
  const { scrollYProgress } = useScroll();
  
  // Transition background colors based on scroll
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      '#090909', // Hero
      '#090909', // Projects
      '#111111', // Lab
      '#050505', // Skills
      '#090909'  // Contact
    ]
  );

  return (
    <motion.div 
      style={{ backgroundColor: bgColor }}
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-out-expo"
    >
      {/* Global Cinematic Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </motion.div>
  );
}
