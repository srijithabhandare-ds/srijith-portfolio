import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const springX = useSpring(mouseX, { stiffness: 800, damping: 40, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 40, mass: 0.2 });

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const linkOrBtn = target.closest('a, button');
      const projectCard = target.closest('[data-cursor="project"]');
      
      if (projectCard) {
        setIsHovered(true);
        setHoverText("VIEW CASE");
      } else if (linkOrBtn) {
        setIsHovered(true);
        setHoverText("OPEN ↗");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand-text rounded-full pointer-events-none z-[100]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovered ? 0 : 1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center bg-brand-text text-brand-bg rounded-full pointer-events-none z-[100] font-mono text-[10px] font-bold px-4 py-2"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {hoverText}
      </motion.div>
    </>
  );
}
