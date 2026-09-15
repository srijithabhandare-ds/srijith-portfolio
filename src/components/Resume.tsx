import React from 'react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function Resume() {
  return (
    <section id="resume" className="relative w-full py-32 px-6 md:px-12 bg-brand-bg border-y border-brand-text/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-brand-text/10 pb-12">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-brand-text mb-2"
            >
              RESUME
            </motion.h2>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-brand-text/50 tracking-[0.2em] uppercase"
            >
              PROFESSIONAL RECORD //
            </motion.span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <MagneticButton href="mailto:srijithabhandar@gmail.com" className="flex items-center justify-between gap-6 px-6 py-4 border border-brand-text/20 text-brand-text font-mono text-xs font-bold tracking-widest uppercase hover:bg-brand-text/5 transition-colors duration-500 ease-out-expo">
              GET IN TOUCH
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 relative z-10">
          
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col gap-16">
            
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-text/40 mb-6">SUMMARY</h3>
              <p className="font-sans text-brand-text/70 text-sm md:text-base leading-relaxed text-justify md:text-left">
                B.Tech Data Science student with a strong interest in Artificial Intelligence, Machine Learning, and Software Development. Currently building skills in Python, Java, SQL, Data Structures and Algorithms, and core computer science concepts. Experienced in developing academic and personal projects involving web development, databases, authentication systems, and programming. Actively participating in hackathons and technical challenges to strengthen problem-solving and practical development skills. Aspiring to build a career as an AI Engineer and Software Engineer while continuously improving technical, communication, and teamwork abilities.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-text/40 mb-6">EDUCATION</h3>
              <div className="flex flex-col gap-6">
                <div className="border-l border-brand-text/20 pl-6 relative before:content-[''] before:absolute before:left-[-3px] before:top-2 before:w-[5px] before:h-[5px] before:bg-brand-text/40 before:rounded-full">
                  <div className="font-mono text-brand-text/50 text-[10px] tracking-widest uppercase mb-2">Sep 2025 — Present</div>
                  <div className="font-display text-2xl uppercase tracking-tight text-brand-text/90 mb-1">B.Tech in Computer Science</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-brand-text/60">GM University</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-brand-text/40 mt-3">CGPA: 7.5</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column */}
          <div className="md:col-span-7 flex flex-col gap-16">
            
            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-text/40 mb-6">PROJECTS</h3>
              <div className="flex flex-col gap-8">
                
                <div className="group border-b border-brand-text/10 pb-8 hover:border-brand-text/30 transition-colors duration-500 ease-out-expo">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="font-display text-2xl uppercase tracking-tight text-brand-text/90 group-hover:text-brand-text transition-colors duration-500">
                        Dosha Profiling System
                      </div>
                      <div className="font-mono text-[10px] tracking-widest uppercase text-brand-text/40">
                        Python, Streamlit, Pandas, Plotly
                      </div>
                    </div>
                    <p className="font-sans text-brand-text/60 text-sm leading-relaxed">
                      Build a rule-based Ayurvedic wellness assessment application that evaluates user responses across multiple parameters and determines a primary and secondary Dosha profile.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-text/40 mb-6">CERTIFICATIONS</h3>
              <div className="flex flex-col gap-8">
                
                <div className="group border-b border-brand-text/10 pb-6 hover:border-brand-text/30 transition-colors duration-500 ease-out-expo">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl uppercase tracking-tight text-brand-text/90 group-hover:text-brand-text transition-colors duration-500">
                        Code Rush - 24hrs Hackathon
                      </div>
                      <div className="font-mono text-[10px] tracking-widest text-brand-text/50 uppercase mt-2">
                        GM University
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group border-b border-brand-text/10 pb-6 hover:border-brand-text/30 transition-colors duration-500 ease-out-expo">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl uppercase tracking-tight text-brand-text/90 group-hover:text-brand-text transition-colors duration-500">
                        Idea Sprint - National Innovation Challenge
                      </div>
                      <div className="font-mono text-[10px] tracking-widest text-brand-text/50 uppercase mt-2">
                        Indian Institute of Technology (IIT), Tirupati
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group border-b border-brand-text/10 pb-6 hover:border-brand-text/30 transition-colors duration-500 ease-out-expo">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl uppercase tracking-tight text-brand-text/90 group-hover:text-brand-text transition-colors duration-500">
                        ISRO Bharatiya Antariksh Hackathon 2026
                      </div>
                      <div className="font-mono text-[10px] tracking-widest text-brand-text/50 uppercase mt-2">
                        ISRO
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>

        {/* Brutalist Download Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 border-t border-brand-text/10 pt-12"
        >
          <a 
            href="/resume.pdf" 
            download="Srijith_A_Bhandare_Resume.pdf"
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-brand-text/20 p-8 md:p-12 hover:bg-brand-text transition-colors duration-500 ease-out"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest text-brand-text/50 uppercase group-hover:text-brand-bg/60 transition-colors duration-500">
                PDF Document // 1 PAGE
              </span>
              <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-brand-text/90 group-hover:text-brand-bg transition-colors duration-500">
                Download Resume
              </h3>
            </div>
            <div className="flex-shrink-0 w-16 h-16 rounded-full border border-brand-text/20 flex items-center justify-center group-hover:border-transparent group-hover:bg-brand-bg text-brand-text group-hover:text-brand-text transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
