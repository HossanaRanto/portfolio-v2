"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

type BlurTextProps = {
  text: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number; transform: string };
    visible: { filter: string; opacity: number; transform: string };
  };
  duration?: number;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom'; 
};

export const BlurText = ({
  text,
  className = '',
  variant,
  duration = 1,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
}: BlurTextProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const defaultVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      transform: direction === 'top' ? 'translate3d(0,-50px,0)' : 'translate3d(0,50px,0)',
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {animateBy === 'words'
        ? text.split(' ').map((word, index) => (
            <motion.span
              key={index}
              variants={combinedVariants}
              transition={{
                duration: duration,
                delay: delay + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))
        : text.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={combinedVariants}
              transition={{
                duration: duration,
                delay: delay + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
    </motion.div>
  );
};
