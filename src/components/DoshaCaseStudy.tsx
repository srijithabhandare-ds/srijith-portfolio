import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import doshaImage from '../assets/images/regenerated_image_1789306586203.png';

gsap.registerPlugin(ScrollTrigger);

interface DoshaCaseStudyProps {
  onBack: () => void;
}

export default function DoshaCaseStudy({ onBack }: DoshaCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Fade in the whole view
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });

      // Animate text reveals on scroll
      const reveals = gsap.utils.toArray('.reveal-text');
      reveals.forEach((element: any) => {
        gsap.fromTo(element, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            }
          }
        );
      });

      // Pipeline animation
      const pipelineNodes = gsap.utils.toArray('.pipeline-node');
      gsap.fromTo(pipelineNodes,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.pipeline-container',
            start: "top 75%",
          }
        }
      );

      // Code engine animation
      gsap.fromTo('.engine-code',
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          opacity: 1, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.engine-container',
            start: "top 70%"
          }
        }
      );
      
      // Chart Bars animation
      const chartBars = gsap.utils.toArray('.chart-bar-fill');
      chartBars.forEach((bar: any) => {
        gsap.fromTo(bar,
          { scaleX: 0 },
          { 
            scaleX: 1, 
            duration: 1.2, 
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: '.chart-container',
              start: "top 80%"
            }
          }
        );
      });
    });

    // Clean up to ensure scrolling works
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-brand-text pt-24 pb-32 relative z-50">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto group flex items-center gap-4 font-mono text-xs tracking-widest uppercase hover:text-brand-amber transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO PORTFOLIO</span>
        </button>
      </nav>

      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12">
        
        {/* HERO SECTION */}
        <section className="mb-32">
          <div className="font-mono text-xs tracking-widest text-brand-text/50 uppercase mb-8">
            01 / CASE STUDY
          </div>
          
          <div className="mb-12">
            {['DOSHA', 'PROFILING', 'SYSTEM'].map((word, i) => (
              <h1 key={i} className="font-display text-[clamp(4rem,12vw,12rem)] leading-[0.8] tracking-[-0.02em] uppercase">
                {word}
              </h1>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-t border-brand-border/20 pt-8">
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-snug max-w-lg text-brand-text/90">
              EXPLAINABLE WELLNESS PROFILING THROUGH RULE-BASED DECISION LOGIC.
            </h2>
            <div className="flex flex-col md:items-end gap-6">
              <div className="font-mono text-xs text-brand-text/60 tracking-widest uppercase text-left md:text-right">
                Python / Streamlit / Pandas / Plotly<br />
                2026
              </div>
              <a 
                href="https://github.com/srijithabhandare-ds/dosha-profiling" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-xs tracking-widest text-brand-text border border-brand-border/30 px-6 py-3 rounded-full hover:bg-brand-text hover:text-brand-bg transition-all"
              >
                SOURCE CODE <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="w-full mt-16 relative flex items-center justify-center">
            <style>{`
              .project-frame {
                position: relative;
                width: 100%;
                padding: 10px;
                border-radius: 18px;
                background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015));
                border: 1px solid rgba(255,255,255,0.10);
                box-shadow: 
                  0 30px 80px rgba(0,0,0,0.55), 
                  0 8px 25px rgba(0,0,0,0.35), 
                  0 0 45px rgba(70,120,80,0.07), 
                  inset 0 1px 0 rgba(255,255,255,0.06);
                overflow: hidden;
                transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s ease;
              }
              .project-frame:hover {
                transform: translateY(-4px);
                box-shadow: 
                  0 40px 100px rgba(0,0,0,0.65), 
                  0 0 55px rgba(70,120,80,0.10);
              }
              .project-frame::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                pointer-events: none;
                background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent 30%);
              }
              .project-frame img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: contain;
                border-radius: 11px;
              }
            `}</style>
            
            <div className="project-frame">
              <img 
                src={doshaImage}
                alt="Project visualization"
              />
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">THE PROBLEM</h3>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8 reveal-text">
            <p className="font-sans text-xl md:text-2xl lg:text-4xl leading-tight text-brand-text">
              Traditional Dosha assessments often involve interpreting multiple physical, lifestyle and mind-body characteristics.
            </p>
            <p className="font-sans text-brand-muted leading-relaxed max-w-2xl text-lg">
              Turning those factors into an interactive digital experience requires:
            </p>
            <ul className="flex flex-col gap-4 font-mono text-sm tracking-wide text-brand-text/80 list-disc pl-4 max-w-2xl">
              <li>Collecting structured inputs</li>
              <li>Assigning understandable scoring rules</li>
              <li>Combining many responses</li>
              <li>Determining dominant and secondary profiles</li>
              <li>Communicating results visually</li>
              <li>Generating useful recommendation categories</li>
            </ul>
          </div>
        </section>

        {/* THE IDEA */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">THE IDEA</h3>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.85] tracking-[-0.02em] mb-12 reveal-text">
              MAKE THE DECISION<br />PROCESS VISIBLE.
            </h2>
            <p className="font-sans text-xl text-brand-muted max-w-2xl mb-16 reveal-text">
              Instead of using a black-box prediction model, the application uses transparent weighted rules. The user can trace how their input becomes a profile.
            </p>

            <div className="pipeline-container flex flex-col font-mono text-xs sm:text-sm tracking-widest text-brand-text/80 uppercase w-max bg-[#111111] p-8 md:p-12 border border-brand-border/10">
              {[
                'INPUT',
                'QUESTION RESPONSES',
                'WEIGHTED DOSHA SCORES',
                'NORMALIZATION',
                'PRIMARY + SECONDARY DOSHA',
                'RECOMMENDATION ENGINE',
                'INTERACTIVE DASHBOARD'
              ].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="pipeline-node border border-brand-text/30 px-6 py-3 w-full text-center hover:bg-brand-text hover:text-brand-bg transition-colors cursor-default">
                    {step}
                  </div>
                  {idx !== arr.length - 1 && (
                    <div className="pipeline-node h-8 w-[1px] bg-brand-text/30 my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCORING ENGINE */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">THE ENGINE</h3>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.85] tracking-[-0.02em] mb-12 reveal-text">
              RULES IN.<br />PROFILE OUT.
            </h2>
            
            <div className="font-sans text-brand-muted leading-relaxed max-w-2xl mb-12 reveal-text">
              <p className="mb-6 font-semibold text-brand-text">Transparent rules instead of black-box inference.</p>
              <ol className="list-decimal pl-4 flex flex-col gap-3 font-mono text-sm">
                <li>Initialize scores for Vata, Pitta, and Kapha</li>
                <li>Each selected response contributes weighted values</li>
                <li>Aggregate all selected-response scores</li>
                <li>Calculate percentage distribution</li>
                <li>Rank profiles</li>
                <li>Identify primary and secondary Dosha</li>
                <li>Map the resulting profile to recommendation categories</li>
              </ol>
            </div>

            <div className="engine-container bg-[#111111] border border-brand-border/20 p-6 md:p-8 overflow-x-auto">
              <div className="font-mono text-xs text-brand-text/40 mb-4 border-b border-brand-border/10 pb-4">sys_engine.py // RULE EVALUATION</div>
              <pre className="engine-code font-mono text-sm leading-relaxed text-brand-text/80">
<span className="text-[#7a6b9e]">vata_score</span>  = Σ weighted_vata_answers{'\n'}
<span className="text-[#d95c3c]">pitta_score</span> = Σ weighted_pitta_answers{'\n'}
<span className="text-[#6b8e75]">kapha_score</span> = Σ weighted_kapha_answers{'\n'}
{'\n'}
total = vata + pitta + kapha{'\n'}
{'\n'}
profile = {'{'}{'\n'}
    Vata:  <span className="text-[#7a6b9e]">vata / total × 100</span>,{'\n'}
    Pitta: <span className="text-[#d95c3c]">pitta / total × 100</span>,{'\n'}
    Kapha: <span className="text-[#6b8e75]">kapha / total × 100</span>{'\n'}
{'}'}
              </pre>
            </div>
          </div>
        </section>

        {/* QUESTIONNAIRE SYSTEM */}
        <section className="mb-32 border-t border-brand-border/20 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">QUESTIONNAIRE SYSTEM</h3>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-12">
              <p className="font-sans text-xl text-brand-muted max-w-2xl reveal-text">
                The assessment structures 20+ qualitative parameters into categorized wellness inputs, ensuring an organized user experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-text">
                {[
                  { num: '01', title: 'AYURVEDA PARAMETERS', items: ['Body Frame', 'Skin Type', 'Body Temperature'] },
                  { num: '02', title: 'MIND + BODY', items: ['Stress Response', 'Flexibility', 'Breathing Patterns'] },
                  { num: '03', title: 'LIFESTYLE', items: ['Physical Activity', 'Sleep Patterns', 'Energy Levels'] },
                  { num: '04', title: 'TRADITIONAL WELLNESS', items: ['Digestion', 'Appetite', 'Dietary Preferences'] },
                ].map((cat, i) => (
                  <div key={i} className="border border-brand-border/10 p-8 bg-[#111111] hover:bg-[#141414] transition-colors">
                    <div className="font-mono text-xs text-brand-text/40 mb-2">{cat.num}</div>
                    <div className="font-mono text-sm tracking-widest mb-6 uppercase text-brand-text/90">{cat.title}</div>
                    <ul className="flex flex-col gap-2 font-sans text-sm text-brand-muted">
                      {cat.items.map(item => <li key={item}>— {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DATA FLOW / ARCHITECTURE */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">ARCHITECTURE</h3>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-[#111111] p-8 md:p-12 border border-brand-border/10 font-mono text-xs sm:text-sm tracking-wider text-brand-text/70 uppercase">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <div className="text-brand-text/40 mb-4">CLIENT INTERFACE</div>
                  <div>[ USER ]</div>
                  <div className="pl-4 border-l border-brand-border/30 py-4 my-2 flex flex-col gap-2">
                    <div>↓ STREAMLIT INTERFACE</div>
                    <div>↓ QUESTIONNAIRE STATE</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="text-brand-text/40 mb-4">PROCESSING ENGINE</div>
                  <div>[ RULE-BASED SCORING ENGINE ]</div>
                  <div className="pl-4 border-l border-brand-border/30 py-4 my-2 flex flex-col gap-2">
                    <div>↓ DOSHA DISTRIBUTION</div>
                    <div>↓ RECOMMENDATION ENGINE</div>
                    <div>↓ PANDAS DATA PROCESSING</div>
                    <div>↓ PLOTLY VISUALIZATION</div>
                  </div>
                  <div className="text-brand-amber">[ RESULT DASHBOARD ]</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE RESULT VISUALIZATION */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16 chart-container">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">RESULT VISUALIZATION</h3>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-[#111111] border border-brand-border/10 p-8 md:p-12">
              <div className="font-mono text-xs text-brand-text/40 tracking-widest uppercase mb-12">PROFILE DISTRIBUTION_</div>
              
              <div className="flex flex-col gap-8 mb-16">
                {[
                  { label: 'VATA', val: 47, color: '#7a6b9e' },
                  { label: 'PITTA', val: 32, color: '#d95c3c' },
                  { label: 'KAPHA', val: 21, color: '#6b8e75' },
                ].map(dosha => (
                  <div key={dosha.label} className="flex flex-col gap-2">
                    <div className="flex justify-between font-mono text-sm uppercase">
                      <span className="tracking-widest">{dosha.label}</span>
                      <span style={{ color: dosha.color }}>{dosha.val}%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-bg relative overflow-hidden">
                      <div 
                        className="chart-bar-fill absolute top-0 left-0 h-full origin-left"
                        style={{ width: `${dosha.val}%`, backgroundColor: dosha.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12 border-t border-brand-border/10 pt-8">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-brand-text/40 tracking-widest uppercase">PRIMARY PROFILE</span>
                  <span className="font-display text-4xl text-[#7a6b9e]">VATA</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-brand-text/40 tracking-widest uppercase">SECONDARY PROFILE</span>
                  <span className="font-display text-4xl text-[#d95c3c]">PITTA</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
                <span className="px-3 py-1.5 border border-brand-border/20 text-brand-text/70">DIET</span>
                <span className="px-3 py-1.5 border border-brand-border/20 text-brand-text/70">YOGA</span>
                <span className="px-3 py-1.5 border border-brand-border/20 text-brand-text/70">ROUTINE</span>
                <span className="px-3 py-1.5 border border-brand-border/20 text-brand-text/70">SLEEP</span>
                <span className="px-3 py-1.5 border border-brand-border/20 text-brand-text/70">SEASONAL GUIDANCE</span>
              </div>
            </div>
            <div className="mt-4 font-mono text-[10px] text-brand-text/30 uppercase tracking-widest">
              * Design example representing the Plotly visual distribution.
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">TECH STACK</h3>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8 reveal-text">
            {[
              { tech: 'PYTHON', desc: 'Core application logic and scoring engine' },
              { tech: 'STREAMLIT', desc: 'Interactive application interface' },
              { tech: 'PANDAS', desc: 'Structured data handling' },
              { tech: 'PLOTLY', desc: 'Interactive result visualizations' }
            ].map(item => (
              <div key={item.tech} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-brand-border/10 pb-4">
                <div className="font-mono text-xl sm:text-2xl text-brand-text/90 uppercase min-w-[200px]">{item.tech}</div>
                <div className="font-sans text-brand-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ENGINEERING DECISIONS */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">ENGINEERING DECISIONS</h3>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 reveal-text">
            {[
              { num: '01', title: 'EXPLAINABILITY', text: 'A deterministic scoring system makes every result traceable to user responses.' },
              { num: '02', title: 'MODULARITY', text: 'Separate questionnaire data, calculation logic, recommendations and visual rendering into understandable functions.' },
              { num: '03', title: 'INTERACTIVITY', text: 'Convert raw scores into understandable visual distributions with interactive charts.' },
              { num: '04', title: 'PRIVACY', text: 'State is managed securely within the session without persisting sensitive user data.' }
            ].map((block) => (
              <div key={block.num} className="flex flex-col gap-4">
                <div className="font-mono text-xs text-brand-text/40">{block.num}</div>
                <h4 className="font-mono text-lg tracking-widest uppercase">{block.title}</h4>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT I LEARNED */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">WHAT I LEARNED</h3>
          </div>
          <div className="lg:col-span-8 reveal-text">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] tracking-[-0.02em] mb-12 uppercase text-brand-text">
              WHAT THIS<br />TAUGHT ME.
            </h2>
            <div className="font-sans text-xl md:text-2xl text-brand-muted leading-relaxed flex flex-col gap-6 max-w-3xl">
              <p>
                <span className="text-brand-text font-medium">This project taught me that not every problem needs machine learning.</span>
              </p>
              <p>
                When the domain rules are understandable, a transparent deterministic system can be easier to reason about, debug and explain than a black-box model.
              </p>
              <p>
                The difficult part wasn't simply calculating three scores. It was designing the complete pipeline from structured user input → scoring logic → normalization → profile generation → recommendations → visualization.
              </p>
            </div>
          </div>
        </section>

        {/* LIMITATIONS */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32 text-brand-amber">LIMITATIONS</h3>
          </div>
          <div className="lg:col-span-8 reveal-text">
            <p className="font-sans text-xl text-brand-text mb-8">
              This project is an educational wellness application, not a diagnostic system.
            </p>
            <ul className="flex flex-col gap-4 font-mono text-sm tracking-wide text-brand-text/70 list-disc pl-4 max-w-2xl">
              <li>Results should not be interpreted as medical diagnosis</li>
              <li>Traditional wellness concepts are not substitutes for professional medical care</li>
              <li>The system currently relies on predefined rules</li>
              <li>Recommendations are rule-driven rather than learned from clinical datasets</li>
            </ul>
          </div>
        </section>

        {/* NEXT ITERATION */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-border/20 pt-16">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-sm tracking-widest text-brand-text/50 uppercase sticky top-32">NEXT ITERATION</h3>
          </div>
          <div className="lg:col-span-8 reveal-text">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85] tracking-[-0.02em] mb-12 uppercase text-brand-text">
              IF I BUILT<br />V2 TODAY.
            </h2>
            <div className="font-mono text-xs text-brand-text/50 mb-8 tracking-widest uppercase">
              FUTURE WORK
            </div>
            <div className="flex flex-wrap gap-3 max-w-3xl">
              {[
                'API LAYER',
                'RULE CONFIGURATION SEPARATION',
                'EXPORTABLE REPORTS',
                'MOBILE-FIRST INTERFACE',
                'HISTORICAL ASSESSMENT TRACKING',
                'IMPROVED TESTING',
                'PERSISTENT USER PROFILES'
              ].map(item => (
                <span key={item} className="border border-brand-border/20 px-4 py-2 font-mono text-xs tracking-widest text-brand-text/80 uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER / GITHUB INTEGRATION */}
        <footer className="border-t border-brand-border/20 pt-32 pb-16 reveal-text">
          <div className="flex flex-col items-center justify-center text-center gap-12">
            <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.8] tracking-[-0.02em] uppercase text-brand-text">
              EXPLORE<br />THE BUILD.
            </h2>
            
            <div className="flex flex-col gap-6">
              <a 
                href="https://github.com/srijithabhandare-ds/dosha-profiling" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 font-mono text-sm tracking-widest text-brand-bg bg-brand-text px-8 py-4 rounded-full hover:bg-brand-amber hover:text-[#000] transition-all"
              >
                <Github size={18} />
                <span>VIEW SOURCE ON GITHUB</span>
              </a>
              
              <a 
                href="https://github.com/srijithabhandare-ds" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 font-mono text-xs tracking-widest text-brand-text/60 hover:text-brand-text transition-colors"
              >
                <span>MORE EXPERIMENTS & PROJECTS</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
