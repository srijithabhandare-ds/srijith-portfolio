import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import doshaImage from '../assets/images/regenerated_image_1789306586203.png';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  onOpenCaseStudy: () => void;
}

export default function Projects({ onOpenCaseStudy }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Check for reduced motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        }
      });

      // Cinematic Reveal Sequence
      tl.fromTo('.project-meta-line', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo('.connecting-line',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.2, ease: "expo.out" },
        "-=0.6"
      )
      .fromTo('.project-title-line',
        { yPercent: 100, clipPath: 'inset(100% 0 0 0)' },
        { yPercent: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=0.8"
      )
      .fromTo('.project-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo('.project-stats span',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo('.project-stack span',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo('.project-actions',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo('.project-display-frame',
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=1.5"
      )
      .fromTo('.ambient-light',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=0.8"
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="relative bg-[#090909] pt-32 pb-32 z-20 overflow-hidden border-t border-brand-border/10">
      
      <div className="w-full max-w-[100vw] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* LEFT SIDE: Editorial Content (~40%) */}
        <div className="lg:col-span-5 flex flex-col pt-12 z-10 relative">
          
          <div className="relative mb-8 flex items-center">
            <div className="project-meta-line font-mono text-[10px] sm:text-xs tracking-widest text-brand-text/50 uppercase z-10 bg-[#090909] pr-6">
              01 // DATA + RULE SYSTEM
            </div>
            <div className="connecting-line h-[1px] flex-grow bg-gradient-to-r from-white/16 via-white/5 to-transparent z-0 relative top-[1px] translate-x-[-10px] sm:w-[180%] sm:absolute sm:left-0 sm:right-[-80%]" />
          </div>

          <div className="mb-8 flex flex-col relative z-10 bg-[#090909]">
            {['DOSHA', 'PROFILING', 'SYSTEM'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <h3 className="project-title-line font-display text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] uppercase tracking-[-0.02em] leading-[0.85] text-brand-text">
                  {line}
                </h3>
              </div>
            ))}
          </div>

          <div className="project-desc font-sans text-brand-muted leading-relaxed max-w-lg text-sm sm:text-base mb-12">
            An explainable wellness profiling engine that transforms questionnaire responses into weighted Vata, Pitta and Kapha profiles and generates structured recommendations.
          </div>
          
          {/* Stats / Features */}
          <div className="project-stats flex flex-col gap-2 mb-12 font-mono text-xs sm:text-sm text-brand-text/80 tracking-wide uppercase border-l border-brand-border/20 pl-4">
            <span>20+ QUESTIONS</span>
            <span>3 DOSHA PROFILES</span>
            <span>RULE-BASED ENGINE</span>
            <span>INTERACTIVE ANALYTICS</span>
          </div>
          
          {/* Tech Stack */}
          <div className="project-stack flex flex-wrap gap-3 mb-16 max-w-md">
            {['PYTHON', 'STREAMLIT', 'PANDAS', 'PLOTLY'].map((s) => (
              <span key={s} className="font-mono text-[10px] sm:text-xs text-brand-text/70 uppercase border border-brand-border/30 px-3 py-1.5 hover:bg-brand-text hover:text-brand-bg transition-colors duration-300">
                {s}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="project-actions flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <button 
              onClick={onOpenCaseStudy}
              className="group/btn flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-brand-text w-max"
            >
              <span className="group-hover/btn:text-brand-amber transition-colors duration-300">VIEW CASE STUDY</span>
              <span className="w-8 h-[1px] bg-brand-border group-hover/btn:bg-brand-amber group-hover/btn:w-12 transition-all duration-500 ease-out-expo" />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300">
                <path d="M7 17l9.2-9.2M17 16.8V7H7.2" />
              </svg>
            </button>
            
            <MagneticButton href="https://github.com/srijithabhandare-ds/dosha-profiling" className="group/btn2 flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-brand-text/60 hover:text-brand-text transition-colors w-max">
              <span>SOURCE CODE</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover/btn2:opacity-100 group-hover/btn2:translate-x-1 group-hover/btn2:-translate-y-1 transition-all duration-300">
                <path d="M7 17l9.2-9.2M17 16.8V7H7.2" />
              </svg>
            </MagneticButton>
          </div>

        </div>

        {/* RIGHT SIDE: Cinematic Frame (~60%) */}
        <div className="lg:col-span-7 relative flex items-center justify-center w-full">
          <style>{`
            .project-visual-stage {
              position: relative;
              width: 100%;
              min-height: 400px;
              display: flex;
              align-items: center;
              justify-content: center;
              isolation: isolate;
            }
            @media (min-width: 1024px) {
              .project-visual-stage {
                min-height: 620px;
              }
            }
            @media (min-width: 1440px) {
              .project-visual-stage {
                width: calc(100% + 50px);
                margin-right: -50px;
              }
            }

            .ambient-light {
              position: absolute;
              width: 75%;
              height: 65%;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              background: radial-gradient(ellipse at center, rgba(82, 126, 87, 0.16) 0%, rgba(46, 76, 52, 0.07) 40%, transparent 72%);
              filter: blur(55px);
              pointer-events: none;
              z-index: -1;
            }

            .project-display-frame {
              position: relative;
              width: min(100%, 1050px);
              padding: 9px;
              background: linear-gradient(145deg, #242424 0%, #0d0d0d 22%, #050505 65%, #181818 100%);
              border: 1px solid rgba(255,255,255,0.10);
              border-radius: 3px;
              box-shadow: 
                0 50px 120px rgba(0,0,0,0.75), 
                0 18px 40px rgba(0,0,0,0.55), 
                0 0 80px rgba(55,105,65,0.06), 
                inset 0 1px 0 rgba(255,255,255,0.11), 
                inset 0 -1px 0 rgba(0,0,0,0.9);
              transition: transform 0.8s cubic-bezier(.16,1,.3,1), box-shadow 0.8s cubic-bezier(.16,1,.3,1);
            }

            @media (min-width: 768px) {
              .project-visual-stage:hover .project-display-frame {
                transform: perspective(1400px) rotateX(0.6deg) rotateY(-0.8deg) scale(1.008);
                box-shadow: 0 65px 150px rgba(0,0,0,0.82), 0 0 90px rgba(70,115,76,0.09);
              }
            }

            .project-display-frame::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 4;
              background: linear-gradient(115deg, rgba(255,255,255,0.055) 0%, transparent 17%, transparent 72%, rgba(255,255,255,0.025) 100%);
            }

            .project-display-frame::after {
              content: "";
              position: absolute;
              left: -1px;
              top: 18%;
              width: 1px;
              height: 64%;
              background: linear-gradient(transparent, rgba(93,155,99,0.75), rgba(93,155,99,0.22), transparent);
              box-shadow: 0 0 16px rgba(93,155,99,0.18);
            }

            .frame-inner {
              position: relative;
              overflow: hidden;
              background: #020202;
              box-shadow: 
                inset 0 0 0 1px rgba(255,255,255,0.04), 
                inset 0 8px 18px rgba(0,0,0,0.35), 
                inset 0 -8px 20px rgba(0,0,0,0.45);
              border-radius: 2px;
            }

            .frame-inner img {
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            }

            .frame-corner {
              position: absolute;
              width: 20px;
              height: 20px;
              pointer-events: none;
              z-index: 5;
            }
            .corner-tl { top: 8px; left: 8px; border-top: 1px solid rgba(255,255,255,0.28); border-left: 1px solid rgba(255,255,255,0.28); }
            .corner-tr { top: 8px; right: 8px; border-top: 1px solid rgba(255,255,255,0.28); border-right: 1px solid rgba(255,255,255,0.28); }
            .corner-bl { bottom: 8px; left: 8px; border-bottom: 1px solid rgba(255,255,255,0.18); border-left: 1px solid rgba(255,255,255,0.18); }
            .corner-br { bottom: 8px; right: 8px; border-bottom: 1px solid rgba(255,255,255,0.18); border-right: 1px solid rgba(255,255,255,0.18); }

            .frame-floor-shadow {
              position: absolute;
              width: 75%;
              height: 35px;
              left: 50%;
              bottom: 5%;
              transform: translateX(-50%);
              background: radial-gradient(ellipse, rgba(0,0,0,0.75), transparent 70%);
              filter: blur(16px);
              z-index: -1;
            }

            .frame-scanline {
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 10;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 50%, transparent);
              width: 20%;
              animation: frameLightPass 9s infinite linear;
            }

            @keyframes frameLightPass {
              0%, 72% { transform: translateX(-130%); opacity: 0; }
              78% { opacity: 0.15; }
              92% { transform: translateX(500%); opacity: 0; }
              100% { opacity: 0; }
            }
          `}</style>

          <div className="project-visual-stage">
            <div className="ambient-light"></div>
            <div className="project-display-frame">
              <div className="frame-inner">
                <img src={doshaImage} alt="Dosha Profiling System" />
              </div>
              <div className="frame-corner corner-tl"></div>
              <div className="frame-corner corner-tr"></div>
              <div className="frame-corner corner-bl"></div>
              <div className="frame-corner corner-br"></div>
              <div className="frame-scanline"></div>
            </div>
            <div className="frame-floor-shadow"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
