import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SlideTransitionProps {
  slideKey: string | number;
  direction: number; // 1 = Next, -1 = Prev, 0 = Direct Jump / Home / End
  children: React.ReactNode;
  className?: string;
}

const transitionVariants = {
  enter: (dir: number) => {
    // If direction is 0 (direct jump), avoid horizontal movement
    const isDirectJump = dir === 0;
    return {
      opacity: 0,
      x: isDirectJump ? 0 : dir > 0 ? 18 : -18,
      scale: 0.985,
    };
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
    },
  },
  exit: (dir: number) => {
    const isDirectJump = dir === 0;
    return {
      opacity: 0,
      x: isDirectJump ? 0 : dir > 0 ? -16 : 16,
      scale: 0.985,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1], // Shorter exit for responsiveness
      },
    };
  },
};

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  slideKey,
  direction,
  children,
  className = 'w-full',
}) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slideKey}
        custom={direction}
        variants={transitionVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
