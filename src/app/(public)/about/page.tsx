import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "About Me | Ranto Mahefaniaina",
    description: "Learn more about Ranto Mahefaniaina's journey, interests, and background.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen space-y-24">
            
            {/* Hero / Intro Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto md:ml-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image 
                        src="/img/profile.jpeg"
                        alt="Ranto Mahefaniaina"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-indigo-500 font-bold tracking-widest text-sm uppercase">About Me</span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
                            Hello, I&apos;m <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                                Ranto Mahefaniaina
                            </span>
                        </h1>
                    </div>
                    
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        I am a web developer with a passion for creating innovative web solutions. I am enthusiastic and always eager to learn new technologies.
                    </p>
                    
                    <div className="flex gap-4">
                        <Link 
                            href="mailto:mahefaniainaranto@gmail.com" 
                            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-500 hover:text-white transition-all text-zinc-600 dark:text-zinc-400"
                        >
                            <Mail size={20} />
                        </Link>
                        <Link 
                            href="https://github.com/HossanaRanto" 
                            target="_blank"
                            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white transition-all text-zinc-600 dark:text-zinc-400"
                        >
                            <Github size={20} />
                        </Link>
                        <Link 
                            href="https://www.linkedin.com/in/ranto-hossana-mahefaniaina-58aa87254/" 
                            target="_blank"
                            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white transition-all text-zinc-600 dark:text-zinc-400"
                        >
                            <Linkedin size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* My Journey */}
            <section className="space-y-8 max-w-4xl mx-auto">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">My Journey</h2>
                    <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
                </div>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none text-center md:text-left bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <p>
                        Initially, I had no intention of pursuing a career in software development, especially since my older brother had already chosen that path. Logically, I considered exploring a different field. However, during my final year of high school, I briefly engaged with one of my brother&apos;s projects and found myself captivated by it.
                    </p>
                    <p>
                        I pursued a degree in Software Engineering at Adventist University Zurcher in Madagascar. This institution is part of a global network of 116 Adventist universities, and I was fortunate to study at one of them.
                    </p>
                </div>
            </section>

            {/* Personal Details & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Personal Details */}
                <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-full">
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        Personal Details
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        An interesting fact about my family is that all of my brothers are software developers:
                    </p>
                    <ul className="space-y-3">
                         <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                                <strong className="text-zinc-900 dark:text-white">Older Brother:</strong> Harena Mahefaniaina (Mobile Developer)
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                                <strong className="text-zinc-900 dark:text-white">Twin Brother:</strong> Rindra Mahefaniaina (Fullstack Web Developer)
                            </span>
                        </li>
                    </ul>
                </div>

                {/* My Interests */}
                <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-full">
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        My Interests
                    </h3>
                    <ul className="space-y-6">
                        <li>
                            <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">Volleyball</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                While I may not be a professional athlete, I am an avid fan and enjoy playing the sport recreationally.
                            </p>
                        </li>
                        <li>
                             <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">Chess</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">
                                I consider myself at an intermediate level. If you&apos;re interested in a game, feel free to connect with me.
                            </p>
                            <Link 
                                href="https://chess.com/member/rantohossana" 
                                target="_blank"
                                className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 text-sm font-medium transition-colors"
                            >
                                Play on Chess.com
                                <ExternalLink size={14} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
