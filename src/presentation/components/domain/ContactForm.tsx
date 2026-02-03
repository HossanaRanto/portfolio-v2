"use client"
import { createMessageAction } from "@/application/use-cases/message.actions";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await createMessageAction({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                subject: formData.get('subject') as string,
                content: formData.get('content') as string,
            });
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center"
            >
                <h3 className="text-2xl font-bold mb-2 text-white">Message Sent! 🚀</h3>
                <p className="text-zinc-400 mb-6">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button 
                    onClick={() => setSuccess(false)} 
                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors"
                >
                    Send another message
                </button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-950/50 p-6 md:p-8 rounded-3xl border border-zinc-900/50 backdrop-blur-sm">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-zinc-300">
                    Name
                </label>
                <input 
                    required 
                    type="text" 
                    name="name" 
                    id="name"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                    placeholder="Your name"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-zinc-300">
                    Email
                </label>
                <input 
                    required 
                    type="email" 
                    name="email" 
                    id="email"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                    placeholder="your@email.com"
                />
            </div>

            <div className="space-y-2">
                 <label htmlFor="subject" className="text-sm font-semibold text-zinc-300">
                    Subject
                </label>
                <input 
                    type="text" 
                    name="subject" 
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                    placeholder="Project inquiry"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-semibold text-zinc-300">
                    Message
                </label>
                <textarea 
                    required 
                    name="content" 
                    id="content"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-600 resize-none"
                    placeholder="Tell me about your project..."
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Send Message
                        <div className="bg-white/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                             <Send className="w-4 h-4" />
                        </div>
                    </>
                )}
            </button>
        </form>
    );
}

