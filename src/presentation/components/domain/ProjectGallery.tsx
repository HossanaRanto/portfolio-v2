"use client"

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -50) {
            nextSlide();
        } else if (info.offset.x > 50) {
            prevSlide();
        }
    };

    // Calculate visible range (circular)
    const getVisibleImages = () => {
        const total = images.length;
        if (total === 1) return [{ idx: 0, position: 0 }];
        
        // We want typically Previous, Current, Next
        const prevIdx = (activeIndex - 1 + total) % total;
        const nextIdx = (activeIndex + 1) % total;
        
        // If only 2 images, special case or just handle basic
        if (total === 2) {
             return [
                { idx: activeIndex, position: 0 },
                { idx: nextIdx, position: 1 } // Right
             ];
        }

        return [
            { idx: prevIdx, position: -1 },
            { idx: activeIndex, position: 0 },
            { idx: nextIdx, position: 1 }
        ];
    };

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-black/5 dark:bg-black/40 rounded-xl my-8 group">
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                {/* Swipe Area */}
                <motion.div 
                    className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                />

                <AnimatePresence initial={false} mode="popLayout">
                    {getVisibleImages().map(({ idx, position }) => (
                        <motion.div
                            key={images[idx]} 
                            initial={{ 
                                scale: 0.8, 
                                opacity: 0, 
                                x: position === 1 ? "100%" : position === -1 ? "-100%" : "0%",
                                zIndex: 0,
                                filter: 'blur(10px)'
                            }}
                            animate={{ 
                                scale: position === 0 ? 1 : 0.85, 
                                opacity: position === 0 ? 1 : 0.6, 
                                x: position === 0 ? "0%" : position === 1 ? "60%" : "-60%",
                                zIndex: position === 0 ? 10 : 5,
                                filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
                            }}
                            exit={{ 
                                scale: 0.8, 
                                opacity: 0, 
                                zIndex: 0,
                                filter: 'blur(10px)'
                            }}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.32, 0.72, 0, 1] // Custom snappy spring-like bezier
                            }}
                            className="absolute w-[70%] md:w-[60%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
                        >
                            <Image 
                                src={images[idx]} 
                                alt={`${title} screenshot ${idx + 1}`} 
                                fill 
                                className="object-cover"
                            />
                             {/* Overlay for non-active items */}
                             {position !== 0 && (
                                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                             )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                 {/* Navigation Buttons - Visible on hover or always on mobile? */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
                
                {/* Dots */}
                <div className="absolute bottom-6 z-40 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === activeIndex 
                                    ? "bg-white w-8" 
                                    : "bg-white/30 w-1.5 hover:bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper for "glowing" tags
export function GlowingTag({ text }: { text: string }) {
    return (
        <span className="relative inline-flex items-center justify-center px-4 py-1.5 text-sm font-bold text-white transition-all duration-300 rounded-full group cursor-default">
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-sm group-hover:blur-md transition-all" />
            <span className="absolute inset-0 w-full h-full rounded-full border border-indigo-500/30 bg-black/40 backdrop-blur-sm" />
            <span className="relative text-indigo-100 group-hover:text-indigo-50 transition-colors">{text}</span>
        </span>
    );
}
