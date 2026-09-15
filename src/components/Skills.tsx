import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SkillStatus = 'BUILDING' | 'LEARNING' | 'EXPLORING' | 'TOOL';

interface Skill {
  name: string;
  status: SkillStatus;
  usedFor: string[];
  projects?: string[];
  desktopStyle: 'solid' | 'outline' | 'mono'; 
  layoutClass: string; 
  animationType: 'slide-left' | 'slide-right' | 'expand' | 'clip';
}

const CORE_SKILLS: Skill[] = [
  { name: 'PYTHON', status: 'BUILDING', usedFor: ['Data Processing', 'Application Logic', 'Automation', 'AI/ML Experiments'], projects: ['Dosha Profiling System'], desktopStyle: 'solid', layoutClass: 'justify-start md:ml-[5vw]', animationType: 'slide-left' },
  { name: 'JAVA', status: 'BUILDING', usedFor: ['OOP', 'DSA', 'Problem Solving'], desktopStyle: 'solid', layoutClass: 'justify-end md:mr-[10vw] mt-[-4rem]', animationType: 'slide-right' },
  { name: 'SQL', status: 'BUILDING', usedFor: ['Relational Queries', 'Data Manipulation'], desktopStyle: 'solid', layoutClass: 'justify-center md:ml-[15vw] mt-8', animationType: 'slide-left' },
  { name: 'POSTGRESQL', status: 'BUILDING', usedFor: ['Relational Database Design', 'Querying'], desktopStyle: 'solid', layoutClass: 'justify-start mt-[-2rem]', animationType: 'clip' },
  { name: 'GIT + GITHUB', status: 'TOOL', usedFor: ['Version Control', 'Repositories', 'Collaboration'], desktopStyle: 'mono', layoutClass: 'justify-end md:mr-[20vw] mt-8', animationType: 'slide-right' },
  { name: 'DSA', status: 'BUILDING', usedFor: ['Problem Solving', 'Algorithms', 'Data Structures'], desktopStyle: 'solid', layoutClass: 'justify-center md:mr-[15vw]', animationType: 'clip' },
];

const DATA_SKILLS: Skill[] = [
  { name: 'MACHINE LEARNING', status: 'LEARNING', usedFor: ['Classical ML Foundations'], desktopStyle: 'outline', layoutClass: 'justify-center mt-12', animationType: 'expand' },
  { name: 'PANDAS', status: 'BUILDING', usedFor: ['Data Manipulation', 'Structured Analysis'], projects: ['Dosha Profiling System'], desktopStyle: 'solid', layoutClass: 'justify-start md:ml-[10vw] mt-4', animationType: 'slide-left' },
  { name: 'NUMPY', status: 'BUILDING', usedFor: ['Numerical Computing', 'Array Operations'], desktopStyle: 'solid', layoutClass: 'justify-end md:mr-[10vw] mt-[-3rem]', animationType: 'slide-right' },
  { name: 'DEEP LEARNING', status: 'LEARNING', usedFor: ['Neural-network Fundamentals', 'Implementations'], desktopStyle: 'outline', layoutClass: 'justify-center mt-12 md:ml-[20vw]', animationType: 'clip' },
  { name: 'COMPUTER VISION', status: 'EXPLORING', usedFor: ['Visual-data Applications'], desktopStyle: 'outline', layoutClass: 'justify-start mt-8 md:ml-[5vw]', animationType: 'slide-left' },
  { name: 'NLP', status: 'EXPLORING', usedFor: ['Language-processing Concepts'], desktopStyle: 'outline', layoutClass: 'justify-end md:mr-[5vw] mt-[-2rem]', animationType: 'slide-right' },
  { name: 'LLMs', status: 'EXPLORING', usedFor: ['Modern Architecture', 'Prompting', 'Retrieval', 'App Development'], desktopStyle: 'outline', layoutClass: 'justify-center mt-16 md:mr-[15vw]', animationType: 'expand' },
];

const SOFTWARE_SKILLS: Skill[] = [
  { name: 'JAVASCRIPT', status: 'BUILDING', usedFor: ['Web Programming Fundamentals'], desktopStyle: 'solid', layoutClass: 'justify-start md:ml-[8vw] mt-12', animationType: 'slide-left' },
  { name: 'TYPESCRIPT', status: 'LEARNING', usedFor: ['Typed JavaScript Development'], desktopStyle: 'outline', layoutClass: 'justify-end md:mr-[12vw] mt-[-3rem]', animationType: 'slide-right' },
  { name: 'REACT', status: 'BUILDING', usedFor: ['Component-based Frontend Development'], desktopStyle: 'solid', layoutClass: 'justify-center md:mr-[10vw] mt-12', animationType: 'clip' },
  { name: 'REST APIs', status: 'BUILDING', usedFor: ['API Communication', 'Backend Integration'], desktopStyle: 'solid', layoutClass: 'justify-start md:ml-[15vw] mt-8', animationType: 'slide-left' },
  { name: 'BACKEND DEVELOPMENT', status: 'LEARNING', usedFor: ['Server-side Concepts', 'API Architecture'], desktopStyle: 'outline', layoutClass: 'justify-end md:mr-[5vw] mt-[-2rem]', animationType: 'slide-right' },
  { name: 'STREAMLIT', status: 'BUILDING', usedFor: ['Rapid Python App Development', 'Interactive Data Interfaces'], projects: ['Dosha Profiling System'], desktopStyle: 'solid', layoutClass: 'justify-center mt-16 md:ml-[10vw]', animationType: 'expand' },
  { name: 'C', status: 'BUILDING', usedFor: ['Systems/Programming Fundamentals'], desktopStyle: 'solid', layoutClass: 'justify-start md:ml-[5vw] mt-12', animationType: 'slide-left' },
];

export default function Skills({ onNavigate }: { onNavigate?: (id: string, label: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const elements = gsap.utils.toArray('.desktop-skill') as HTMLElement[];
      
      elements.forEach((el) => {
        const animType = el.dataset.anim;
        
        let fromState: any = { opacity: 0 };
        let toState: any = {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "bottom center",
                scrub: 1
            }
        };

        if (animType === 'slide-left') {
            fromState.x = -150;
            toState.x = 20;
        } else if (animType === 'slide-right') {
            fromState.x = 150;
            toState.x = -20;
        } else if (animType === 'expand') {
            fromState.letterSpacing = "-0.1em";
            fromState.scale = 0.9;
            toState.letterSpacing = "-0.02em";
            toState.scale = 1;
        } else if (animType === 'clip') {
            fromState.clipPath = 'inset(100% 0 0 0)';
            fromState.y = 50;
            toState.clipPath = 'inset(0% 0 0 0)';
            toState.y = -10;
        }
        
        gsap.fromTo(el, fromState, toState);
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const renderDesktopSection = (title: string, skills: Skill[]) => (
    <div className="mb-48 relative z-10 w-full">
      <div className="font-mono text-xs tracking-widest text-brand-text/50 uppercase mb-16 ml-12 lg:ml-24 border-l border-brand-border/30 pl-4">{title}</div>
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        {skills.map(skill => (
          <div key={skill.name} className={`flex w-full ${skill.layoutClass}`}>
            <div 
              className="relative group desktop-skill cursor-crosshair w-max"
              data-anim={skill.animationType}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={`
                uppercase tracking-[-0.02em] leading-[0.8] transition-colors duration-500
                ${skill.desktopStyle === 'solid' ? 'font-display text-[clamp(4rem,8vw,8rem)] text-brand-text group-hover:text-brand-amber' : 
                  skill.desktopStyle === 'outline' ? 'font-display text-[clamp(3.5rem,7vw,7rem)] text-stroke-light group-hover:text-stroke-brand' : 
                  'font-mono text-[clamp(2rem,3vw,3rem)] text-brand-text/60 tracking-widest group-hover:text-brand-text'}
              `}>
                {skill.name}
              </div>
              <div className="absolute -top-2 -right-4 font-mono text-[9px] tracking-widest text-brand-text/40 uppercase bg-[#090909] px-2 py-0.5 border border-brand-border/20 group-hover:border-brand-amber/50 group-hover:text-brand-amber transition-colors pointer-events-none">
                [{skill.status}]
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMobileSection = (title: string, skills: Skill[]) => (
    <div className="flex flex-col gap-6">
       <h3 className="font-mono text-[10px] sm:text-xs tracking-widest text-brand-text/50 uppercase border-l border-brand-border/30 pl-4">{title}</h3>
       <div className="flex flex-col gap-6">
         {skills.map(skill => (
            <div key={skill.name} className="flex flex-col gap-2 border-b border-brand-border/10 pb-6 group">
               <div className="flex items-end justify-between gap-4">
                 <span className={`uppercase tracking-[-0.02em] leading-none ${skill.desktopStyle === 'outline' ? 'text-stroke-light font-display text-4xl' : skill.desktopStyle === 'mono' ? 'font-mono text-xl tracking-widest' : 'font-display text-4xl text-brand-text'}`}>{skill.name}</span>
                 <span className="font-mono text-[9px] tracking-widest text-brand-text/40">[{skill.status}]</span>
               </div>
               <div className="font-sans text-brand-muted text-xs leading-relaxed mt-2 flex flex-col gap-1">
                 <span className="font-mono text-[8px] text-brand-text/30 tracking-widest uppercase">USED FOR</span>
                 {skill.usedFor.join(' • ')}
               </div>
               {skill.projects && (
                  <div className="font-sans text-brand-text/80 text-xs leading-relaxed mt-2 flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-brand-amber/70 tracking-widest uppercase">PROVEN IN</span>
                    {skill.projects.join(' • ')}
                  </div>
               )}
            </div>
         ))}
       </div>
    </div>
  );

  return (
    <section ref={containerRef} id="skills" className="relative min-h-screen py-32 bg-[#050505] overflow-hidden border-t border-brand-border/5">
      
      {/* Intro Copy */}
      <div className="px-6 md:px-12 mb-24 md:mb-48 max-w-5xl relative z-10">
        <h2 className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-[-0.02em] uppercase text-brand-text mb-8">
            TOOLS CHANGE.<br/>FUNDAMENTALS DON'T.
        </h2>
        <p className="font-sans text-lg md:text-2xl text-brand-muted max-w-2xl leading-relaxed">
            I prefer learning technologies by building systems with them.<br className="hidden md:block"/> I focus on understanding what happens underneath the abstraction.
        </p>
      </div>

      {/* DESKTOP LAYOUT (Scattered cinematic word-cloud) */}
      <div className="hidden lg:block relative z-10 w-full max-w-[100vw] overflow-hidden px-8">
        {renderDesktopSection('01 / TOOLS I BUILD WITH.', CORE_SKILLS)}
        {renderDesktopSection('02 / DATA + INTELLIGENCE.', DATA_SKILLS)}
        {renderDesktopSection('03 / SOFTWARE ENGINEERING.', SOFTWARE_SKILLS)}
      </div>

      {/* MOBILE LAYOUT (Clean vertical stacked lists) */}
      <div className="lg:hidden flex flex-col gap-20 px-6 relative z-10">
        {renderMobileSection('01 / CORE', CORE_SKILLS)}
        {renderMobileSection('02 / DATA + AI', DATA_SKILLS)}
        {renderMobileSection('03 / SOFTWARE', SOFTWARE_SKILLS)}
      </div>

      {/* PROJECT-PROVEN CATEGORY (Both Desktop & Mobile) */}
      <div className="px-6 md:px-12 mt-16 md:mt-32 pt-16 border-t border-brand-border/10 relative z-10">
        <div className="font-mono text-xs tracking-widest text-brand-text/50 uppercase mb-12 border-l border-brand-border/30 pl-4">04 / PROVEN IN BUILDS.</div>
        
        <div className="bg-[#111111] border border-brand-border/10 p-6 md:p-12 max-w-4xl hover:border-brand-border/30 transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <h3 className="font-display text-4xl md:text-6xl uppercase tracking-[-0.02em] leading-none text-brand-text">DOSHA PROFILING SYSTEM</h3>
            <button onClick={() => onNavigate && onNavigate('case_study', 'CASE STUDY')} className="group flex items-center gap-2 font-mono text-[10px] tracking-widest text-brand-text/60 hover:text-brand-amber transition-colors uppercase cursor-pointer">
              VIEW PROJECT <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M7 17l9.2-9.2M17 16.8V7H7.2"/></svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-6 font-mono text-xs sm:text-sm uppercase tracking-widest w-full">
            {[
              { tech: 'PYTHON', desc: 'Rule-based scoring engine' },
              { tech: 'STREAMLIT', desc: 'Interactive application interface' },
              { tech: 'PANDAS', desc: 'Structured data processing' },
              { tech: 'PLOTLY', desc: 'Interactive data visualization' }
            ].map(item => (
              <div key={item.tech} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-8 border-b border-brand-border/10 pb-4 w-full">
                <span className="text-brand-text/90">{item.tech}</span>
                <span className="text-brand-muted font-sans normal-case text-sm tracking-normal">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP HOVER INFO PANEL */}
      <div className={`hidden lg:block fixed bottom-12 right-12 w-80 bg-[#0A0A0A]/95 backdrop-blur-md border border-brand-border/20 p-8 z-50 pointer-events-none transition-all duration-500 ease-out-expo ${hoveredSkill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="font-mono text-[10px] tracking-widest text-brand-text/40 uppercase mb-4 border-b border-brand-border/10 pb-4">
          TECHNOLOGY CONTEXT_
        </div>
        
        {hoveredSkill && (
          <div className="flex flex-col gap-8">
            <h4 className="font-display text-4xl uppercase tracking-[-0.02em] leading-none text-brand-text m-0">{hoveredSkill.name}</h4>
            
            <div className="flex flex-col gap-2">
              <div className="font-mono text-[9px] tracking-widest text-brand-text/50 uppercase">USED FOR</div>
              <ul className="flex flex-col gap-1.5 font-sans text-sm text-brand-muted">
                {hoveredSkill.usedFor.map(u => <li key={u} className="flex items-start gap-2"><span className="text-brand-amber/50 mt-1">―</span> {u}</li>)}
              </ul>
            </div>

            {hoveredSkill.projects && (
              <div className="flex flex-col gap-2 pt-4 border-t border-brand-border/10">
                <div className="font-mono text-[9px] tracking-widest text-brand-amber uppercase">PROVEN IN</div>
                <ul className="flex flex-col gap-1.5 font-sans text-sm text-brand-text/90">
                  {hoveredSkill.projects.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Abstract background grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
         <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

    </section>
  );
}
