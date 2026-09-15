import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TransitionOverlayProps {
  isTransitioning: boolean;
  transitionWord: string;
}

export default function TransitionOverlay({ isTransitioning, transitionWord }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#090909] flex items-center justify-center pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,10vw,10rem)] uppercase text-brand-text tracking-[-0.02em]"
          >
            {transitionWord}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
