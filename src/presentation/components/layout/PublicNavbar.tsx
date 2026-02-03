"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function PublicNavbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
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
        { href: "/", label: t('nav.projects') },
        { href: "/about", label: t('nav.about') },
        { href: "/contact", label: t('nav.contact') },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50 py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    RM<span className="text-indigo-600">.</span>
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

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </button>
                    {/* Hacky way to handle absolute position of Moon icon inside relative container if needed, but here simple swap works if container is relative. Wait, the button has padding but not relative. */}
                    {/* Improved Theme Toggle */}
                </nav>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                     <button 
                        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                        className="flex items-center gap-1 text-sm font-medium p-2"
                    >
                        <span className="uppercase">{language}</span>
                    </button>

                     <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                         {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
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
