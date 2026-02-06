import { ContactForm } from "@/presentation/components/domain/ContactForm";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Ranto Mahefaniaina",
    description: "Get in touch with Ranto Mahefaniaina for collaborations, questions, or just to say hi.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-black text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-12 pt-10">
                        {/* Title */}
                        <div className="space-y-4">
                             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                                <span className="bg-blue-700 px-4 inline-block transform -rotate-1">Let&apos;s Work</span>
                                <br />
                                <span className="bg-blue-700 px-4 inline-block transform rotate-1 mt-2">Together</span>
                            </h1>
                        </div>

                         {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-xl">
                            I&apos;m currently available for new projects. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                        </p>

                         {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-lime-900 bg-lime-900/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                            </span>
                            <span className="text-lime-400 font-medium">Open to Collaborations</span>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-8">
                             {/* Email */}
                            <div className="space-y-2">
                                <span className="inline-block px-2 py-0.5 bg-blue-700 text-white text-xs font-bold uppercase tracking-wider">
                                    Email
                                </span>
                                <div className="block">
                                    <a href="mailto:mahefaniairindra@gmail.com" className="text-xl md:text-2xl font-medium bg-blue-900/50 hover:bg-blue-800 px-2 py-1 transition-colors text-blue-100">
                                        mahefaniairindra@gmail.com
                                    </a>
                                </div>
                            </div>

                             {/* Phone */}
                            <div className="space-y-2">
                                <span className="inline-block px-2 py-0.5 bg-blue-700 text-white text-xs font-bold uppercase tracking-wider">
                                    Phone
                                </span>
                                <div className="block">
                                    <a href="tel:+268380628561" className="text-xl md:text-2xl font-medium bg-blue-900/50 hover:bg-blue-800 px-2 py-1 transition-colors text-blue-100">
                                        +268 38 06 285 61
                                    </a>
                                </div>
                            </div>

                             {/* Social */}
                            <div className="space-y-2">
                                <span className="inline-block px-2 py-0.5 bg-blue-700 text-white text-xs font-bold uppercase tracking-wider">
                                    Social
                                </span>
                                <div className="flex gap-4">
                                    <Link href="https://github.com" target="_blank" className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                         <Github className="w-4 h-4" /> GitHub
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                         <Linkedin className="w-4 h-4" /> LinkedIn
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - FORM */}
                    <div>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    )
}
