import React, { useState, useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import gsap from 'gsap';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string, label: string) => void;
  isRevealing?: boolean;
}

export default function Navbar({ activeSection, onNavigate, isRevealing = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isRevealing) {
      gsap.set(navRef.current, { y: -14, opacity: 0 });
      return;
    }
    
    // Entrance animation (only run when isRevealing becomes true)
    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.65, delay: 0.2, ease: 'cubic-bezier(.16, 1, .3, 1)' });
  }, [isRevealing]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background styling threshold
      setScrolled(currentScrollY > 100);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'projects', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'lab', label: 'LAB' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header 
      ref={navRef as any}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out 
      ${hidden ? '-translate-y-full' : 'translate-y-0'}
      ${scrolled ? 'bg-[#050505]/70 backdrop-blur-xl py-6 border-b border-brand-text/5' : 'bg-transparent py-8 border-b border-transparent'}`}
    >
      <div className="w-full flex justify-between items-center px-6 md:px-12">
        
        {/* LOGO */}
        <MagneticButton 
          onClick={() => onNavigate('home', 'HOME')}
          className="font-mono text-xs tracking-widest cursor-pointer text-brand-text/80 hover:text-brand-text transition-colors"
        >
          SB//
        </MagneticButton>

        {/* CENTER NAV */}
        <nav className="hidden md:flex gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id, item.label)}
              className={`relative font-display text-2xl tracking-widest overflow-hidden transition-all duration-300 ${activeSection === item.id ? 'text-brand-text' : 'text-brand-text/40 hover:text-brand-text hover:-translate-y-0.5'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex gap-8 items-center font-mono text-[10px] tracking-widest text-brand-text/70">
          <MagneticButton onClick={() => onNavigate('resume', 'RESUME')} className="hidden md:flex items-center gap-2 hover:text-brand-text transition-colors">
            RESUME <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↓</span>
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
