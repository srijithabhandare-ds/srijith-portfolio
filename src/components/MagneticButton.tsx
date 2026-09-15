import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function MagneticButton({ children, className, onClick, href, ariaLabel }: { children: React.ReactNode, className?: string, onClick?: () => void, href?: string, ariaLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-flex items-center justify-center w-full h-full"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`inline-block ${className || ''}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`inline-block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber ${className || ''}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
