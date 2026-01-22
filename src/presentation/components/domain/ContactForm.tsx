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
                phone: formData.get('phone') as string
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
                className="p-8 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-2xl text-center border border-green-200 dark:border-green-800"
            >
                <h3 className="text-2xl font-bold mb-2">Message Sent! 🚀</h3>
                <p className="text-lg mb-6">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button 
                    onClick={() => setSuccess(false)} 
                    className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                    Send another message
                </button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                    <input 
                        required 
                        type="text" 
                        name="name" 
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                    <input 
                        required 
                        type="email" 
                        name="email" 
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone (Optional)</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
                    <input 
                        type="text" 
                        name="subject" 
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Project Inquiry"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                <textarea 
                    required 
                    name="content" 
                    id="content" 
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="Tell me about your project..."
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" /> Sending...
                    </>
                ) : (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
            </button>
        </form>
    )
}
