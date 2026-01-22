"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Liquid Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full blur-[100px]" 
                 />
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/20 rounded-full blur-[100px]" 
                 />
            </div>

            <div className="text-center z-10 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
                        Building <span className="text-indigo-600 dark:text-indigo-400">Digital</span> Experiences
                    </h1>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-6 text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed"
                >
                    Senior Full Stack Developer specializing in reliable & scalable applications using React, Next.js and Domain-Driven Design.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link 
                        href="/projects"
                        className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowRight size={20} />
                    </Link>
                    <Link 
                        href="/contact"
                        className="px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-semibold"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
