"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  className = "",
  parentClassName = "",
  animateOn = "hover", // "hover", "view"
}: {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  className?: string;
  parentClassName?: string;
  animateOn?: "hover" | "view";
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (animateOn === "view" && isInView && !isScrambling) {
      scramble();
    }
  }, [isInView, animateOn]);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = text.split("");
    let iterations = 0;

    intervalRef.current = setInterval(() => {
      let revealedCount = 0;

      const newText = originalText
        .map((char, index) => {
          let shouldReveal = false;

          if (sequential) {
            if (revealDirection === "start") {
              shouldReveal = index < (iterations / maxIterations) * originalText.length;
            } else if (revealDirection === "end") {
              shouldReveal =
                index > originalText.length - (iterations / maxIterations) * originalText.length;
            } else if (revealDirection === "center") {
              const center = Math.floor(originalText.length / 2);
              const offset = Math.floor((iterations / maxIterations) * (originalText.length / 2));
              shouldReveal = index >= center - offset && index <= center + offset;
            }
          } else {
             shouldReveal = iterations >= maxIterations;
          }

          if (char === " " || shouldReveal) {
            revealedCount++;
            return char;
          }

          if (useOriginalCharsOnly) {
            const availableChars = originalText.filter((c) => c !== " ");
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          }

          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayText(newText);
      iterations++;

      if (sequential ? revealedCount >= originalText.length : iterations >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  return (
    <motion.span
      ref={ref}
      className={`${parentClassName} inline-block`}
      onMouseEnter={() => {
        if (animateOn === "hover") {
            setIsHovering(true);
            scramble();
        }
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={className}>{displayText}</span>
    </motion.span>
  );
};
