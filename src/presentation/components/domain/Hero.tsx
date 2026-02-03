"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";
import { BlurText } from "../ui/blur-text";
import { DecryptedText } from "../ui/decrypted-text";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/20 via-zinc-100/20 to-zinc-50 dark:from-indigo-900/40 dark:via-zinc-900/40 dark:to-black">
                {/* Dot Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='currentColor'/%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[100px]" 
                 />
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px]" 
                 />
            </div>

            <motion.div 
                style={{ y, opacity }}
                className="text-center z-10 px-4 max-w-5xl mx-auto space-y-8"
            >
                <div className="flex justify-center">
                    <DecryptedText 
                        text="Available for new projects"
                        animateOn="view"
                        speed={50}
                        maxIterations={15}
                        className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium border border-indigo-100 dark:border-indigo-500/20 backdrop-blur-sm"
                    />
                </div>

                <div className="overflow-visible flex flex-col items-center">
                    <BlurText 
                        text="Building Digital"
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-2"
                        delay={0.2}
                        animateBy="words"
                        direction="bottom" 
                    />
                    
                    <div className="relative inline-block mt-2">
                         <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                             Experiences
                         </span>
                         <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                            className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-indigo-500"
                            viewBox="0 0 200 9" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.00021 6.99998C38.5002 3.49999 104.5 -1.49999 198 4.49999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </motion.svg>
                    </div>
                </div>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed"
                >
                    Senior Full Stack Developer specializing in reliable & scalable applications using React, Next.js and Domain-Driven Design.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                >
                    <Link 
                        href="#projects"
                        onClick={(e) => scrollToSection(e, "projects")}
                        className="group px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 flex items-center gap-2"
                    >
                        View Projects 
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <SocialLink href="https://github.com" icon={<Github size={20} />} label="GitHub" />
                        <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} label="LinkedIn" />
                        <SocialLink href="/contact" icon={<Mail size={20} />} label="Email" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
                    <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a 
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1"
            aria-label={label}
        >
            {icon}
        </a>
    )
}
