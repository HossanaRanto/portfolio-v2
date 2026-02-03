import { Hero } from "@/presentation/components/domain/Hero";
import { FeaturedProjects } from "@/presentation/components/domain/FeaturedProjects";
import { ExperienceTimeline } from "@/presentation/components/domain/ExperienceTimeline";
import { getExperiencesAction } from "@/application/use-cases/experience.actions";
import { ContactForm } from "@/presentation/components/domain/ContactForm";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { DecryptedText } from "@/presentation/components/ui/decrypted-text";

export default async function Home() {
  const experiences = await getExperiencesAction();
  
  return (
    <div>
      <Hero />
      <ExperienceTimeline experiences={experiences} />
      <FeaturedProjects />
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-24 px-4 bg-white dark:bg-black text-zinc-900 dark:text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-12 pt-10 sticky top-24">
                        {/* Title */}
                        <div className="space-y-4">
                             <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-zinc-900 dark:text-white">
                                <span className="block">Let&apos;s Work</span>
                                <span className="block text-indigo-600 dark:text-indigo-500">Together</span>
                            </h1>
                        </div>

                         {/* Subtitle */}
                        <div className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                            <DecryptedText text="I'm currently available for new projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!" animateOn="view" speed={80} />
                        </div>

                         {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-indigo-700 dark:text-indigo-400 font-medium">Open to Collaborations</span>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-8">
                             {/* Email */}
                            <div className="space-y-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                                    Email
                                </span>
                                <div className="block">
                                    <a href="mailto:mahefaniairindra@gmail.com" className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        mahefaniairindra@gmail.com
                                    </a>
                                </div>
                            </div>

                             {/* Phone */}
                            <div className="space-y-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                                    Phone
                                </span>
                                <div className="block">
                                    <a href="tel:+268380628561" className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        +268 38 06 285 61
                                    </a>
                                </div>
                            </div>

                             {/* Social */}
                            <div className="space-y-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                                    Social
                                </span>
                                <div className="flex gap-4">
                                    <Link href="https://github.com" target="_blank" className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-zinc-200 dark:border-zinc-800">
                                         <Github className="w-4 h-4" /> GitHub
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-zinc-200 dark:border-zinc-800">
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
      </section>
    </div>
  );
}
