"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function PublicNavbar() {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
         { href: "/#experiences", label: t('nav.experiences') },
        { href: "/#projects", label: t('nav.projects') },
        { href: "/#contact", label: t('nav.contact') },
        { href: "/about", label: t('nav.about') },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50 py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/img/bitflow.png" alt="Ranto Logo" width={32} height={32} className="rounded-md" hidden/>
                    <span className="font-bold text-xl tracking-tight">Ranto Mahefaniaina</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={`text-sm font-medium hover:text-indigo-600 transition-colors ${
                                pathname === link.href ? "text-indigo-600" : "text-zinc-600 dark:text-zinc-300"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button 
                        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
                        aria-label="Toggle Language"
                    >
                        <Globe size={16} />
                        <span className="uppercase">{language}</span>
                    </button>
                </nav>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                     <button 
                        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                        className="flex items-center gap-1 text-sm font-medium p-2"
                    >
                        <span className="uppercase">{language}</span>
                    </button>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium ${
                                        pathname === link.href ? "text-indigo-600" : "text-zinc-600 dark:text-zinc-300"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
