import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Lab from './components/Lab';
import Credentials from './components/Credentials';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import SmoothScroller from './components/SmoothScroller';
import TransitionOverlay from './components/TransitionOverlay';
import DoshaCaseStudy from './components/DoshaCaseStudy';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionWord, setTransitionWord] = useState('');
  const [currentView, setCurrentView] = useState<'portfolio' | 'case_study'>('portfolio');
  
  // Show loading screen once per session
  const [hasLoaded, setHasLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio-intro-seen') === 'true';
    }
    return false;
  });
  const [isRevealing, setIsRevealing] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio-intro-seen') === 'true';
    }
    return false;
  });

  const handleLoadingComplete = useCallback(() => {
    setHasLoaded(true);
    sessionStorage.setItem('portfolio-intro-seen', 'true');
  }, []);

  const handleRevealStart = useCallback(() => {
    setIsRevealing(true);
  }, []);

  // Mutable refs to prevent observer recreation and unnecessary dependencies
  const activeSectionRef = useRef(activeSection);
  const isTransitioningRef = useRef(isTransitioning);

  // Sync refs with state
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const handleNavigate = useCallback((id: string, label: string) => {
    // Prevent re-triggering if already there
    if (activeSectionRef.current === id && id !== 'home' && currentView === 'portfolio') return;
    
    setTransitionWord(label);
    setIsTransitioning(true);

    // Timeline for fullscreen route transition
    setTimeout(() => {
      if (id === 'case_study') {
        setCurrentView('case_study');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        if (currentView !== 'portfolio') {
          setCurrentView('portfolio');
        }
        // Wait a tick for DOM to update
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({ top: element.offsetTop, behavior: 'instant' });
          }
          setActiveSection(id);
        }, 50);
      }
      
      // Reveal the new page
      setTimeout(() => {
        setIsTransitioning(false);
      }, 450);
    }, 450); // Midpoint of the wipe
  }, [currentView]);

  useEffect(() => {
    if (currentView !== 'portfolio') return;
    
    // IntersectionObserver logic optimized for 100fps+
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTransitioningRef.current) {
            if (activeSectionRef.current !== entry.target.id) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Select target sections to observe
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      // Disconnect observer fully instead of looping through unobserve
      observer.disconnect();
    };
  }, [currentView]); // Only recreate observer if the view actually changes

  // Memoize heavy children so they never re-render when `activeSection` changes during scroll
  const memoizedPortfolioContent = useMemo(() => (
    <main className="relative z-10 flex flex-col">
      <Hero isRevealing={isRevealing} />
      <About />
      <Projects onOpenCaseStudy={() => handleNavigate('case_study', 'CASE STUDY')} />
      <Lab />
      <Credentials />
      <Skills onNavigate={handleNavigate} />
      <Resume />
      <Contact />
    </main>
  ), [isRevealing, handleNavigate]);

  return (
    <SmoothScroller>
      <div className="font-sans text-brand-text bg-brand-bg min-h-screen selection:bg-brand-text selection:text-brand-bg">
        {!hasLoaded && (
          <LoadingScreen 
            onRevealStart={handleRevealStart} 
            onComplete={handleLoadingComplete} 
          />
        )}
        
        <TransitionOverlay isTransitioning={isTransitioning} transitionWord={transitionWord} />
        
        <Background />
        <Cursor />
        
        {currentView === 'portfolio' && (
          <Navbar 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
            isRevealing={isRevealing}
          />
        )}
        
        {currentView === 'portfolio' ? memoizedPortfolioContent : (
          <DoshaCaseStudy onBack={() => handleNavigate('projects', 'PORTFOLIO')} />
        )}
      </div>
    </SmoothScroller>
  );
}
