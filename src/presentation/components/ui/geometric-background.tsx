"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

// ─── Geometric Shapes ────────────────────────────────────────────────────────

interface Shape {
  id: number;
  type: "hexagon" | "triangle" | "square" | "diamond" | "circle" | "cross";
  x: string;
  y: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  rotate: number;
}

const shapes: Shape[] = [
  { id: 1, type: "hexagon", x: "8%", y: "12%", size: 40, opacity: 0.06, duration: 25, delay: 0, rotate: 30 },
  { id: 2, type: "triangle", x: "85%", y: "8%", size: 32, opacity: 0.05, duration: 20, delay: 2, rotate: 0 },
  { id: 3, type: "cross", x: "50%", y: "5%", size: 20, opacity: 0.04, duration: 18, delay: 1, rotate: 45 },
  { id: 4, type: "diamond", x: "20%", y: "28%", size: 28, opacity: 0.05, duration: 22, delay: 3, rotate: 0 },
  { id: 5, type: "circle", x: "72%", y: "22%", size: 36, opacity: 0.04, duration: 30, delay: 0, rotate: 0 },
  { id: 6, type: "square", x: "92%", y: "30%", size: 24, opacity: 0.05, duration: 19, delay: 4, rotate: 15 },
  { id: 7, type: "hexagon", x: "4%", y: "50%", size: 48, opacity: 0.04, duration: 28, delay: 1, rotate: 0 },
  { id: 8, type: "triangle", x: "40%", y: "45%", size: 22, opacity: 0.03, duration: 24, delay: 5, rotate: 60 },
  { id: 9, type: "cross", x: "95%", y: "52%", size: 18, opacity: 0.05, duration: 16, delay: 2, rotate: 0 },
  { id: 10, type: "diamond", x: "65%", y: "65%", size: 34, opacity: 0.05, duration: 26, delay: 0, rotate: 45 },
  { id: 11, type: "square", x: "15%", y: "72%", size: 30, opacity: 0.04, duration: 21, delay: 3, rotate: 30 },
  { id: 12, type: "circle", x: "48%", y: "70%", size: 26, opacity: 0.03, duration: 32, delay: 1, rotate: 0 },
  { id: 13, type: "hexagon", x: "78%", y: "85%", size: 38, opacity: 0.05, duration: 23, delay: 2, rotate: 15 },
  { id: 14, type: "triangle", x: "30%", y: "90%", size: 28, opacity: 0.04, duration: 27, delay: 4, rotate: 120 },
  { id: 15, type: "cross", x: "5%", y: "92%", size: 22, opacity: 0.05, duration: 17, delay: 0, rotate: 22 },
];

function ShapeSVG({ type, size }: { type: Shape["type"]; size: number }) {
  const stroke = "rgba(99, 102, 241, 1)";
  const strokeWidth = 1;

  switch (type) {
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon points="50,5 95,95 5,95" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <rect x="5" y="5" width="90" height="90" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon points="50,2 98,50 50,98 2,50" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="10" x2="50" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="10" y1="50" x2="90" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
  }
}

// ─── Star Particles Config ───────────────────────────────────────────────────

const particlesConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ffffff", "#c7d2fe", "#a5b4fc", "#818cf8"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.9 },
      animation: {
        enable: true,
        speed: 3,
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 3 },
      animation: {
        enable: true,
        speed: 4,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    twinkle: {
      particles: {
        enable: true,
        frequency: 0.15,
        opacity: 1,
        color: {
          value: "#c7d2fe",
        },
      },
    },
    wobble: {
      enable: true,
      distance: 5,
      speed: { min: -3, max: 3 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 120,
        links: {
          opacity: 0.15,
          color: "#818cf8",
        },
      },
    },
  },
  detectRetina: true,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function GeometricBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(() => particlesConfig, []);

  return (
    <div className="geometric-bg fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 geometric-grid opacity-[0.2]" />

      {/* Star particles */}
      {ready && (
        <Particles
          className="absolute inset-0 pointer-events-auto"
          options={options}
        />
      )}

      {/* Animated floating geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            opacity: shape.opacity * 3,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [shape.rotate, shape.rotate + 360],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} />
        </motion.div>
      ))}

      {/* Connecting line accents */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.3]">
        <motion.line
          x1="10%" y1="20%" x2="30%" y2="40%"
          stroke="rgb(99, 102, 241)" strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="70%" y1="15%" x2="90%" y2="35%"
          stroke="rgb(99, 102, 241)" strokeWidth="1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.line
          x1="60%" y1="60%" x2="80%" y2="80%"
          stroke="rgb(99, 102, 241)" strokeWidth="1.5"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.line
          x1="5%" y1="70%" x2="25%" y2="90%"
          stroke="rgb(99, 102, 241)" strokeWidth="1.5"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
}
