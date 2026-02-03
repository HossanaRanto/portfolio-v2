"use client"
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const xPos = (event.clientX - left) / width - 0.5;
        const yPos = (event.clientY - top) / height - 0.5;
        
        x.set(xPos);
        y.set(yPos);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`cursor-pointer ${className}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full rounded-2xl bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
            >
                {/* Shine effect */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                    style={{ zIndex: 1 }}
                />
                
                <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};
