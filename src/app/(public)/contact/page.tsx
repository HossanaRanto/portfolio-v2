import { ContactForm } from "@/presentation/components/domain/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div>
                         <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <a href="mailto:ranto.dev@example.com" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors">
                                            ranto.dev@example.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                        <Phone size={24} />
                                    </div>
                                      <div>
                                        <h3 className="font-semibold text-lg">Phone</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">+261 34 00 000 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                                        <MapPin size={24} />
                                    </div>
                                      <div>
                                        <h3 className="font-semibold text-lg">Location</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">Antananarivo, Madagascar</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                             <h3 className="font-bold text-xl mb-4">Availability</h3>
                             <p className="text-zinc-600 dark:text-zinc-400">
                                 I am currently available for freelance projects and full-time opportunities.
                             </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl shadow-xl shadow-indigo-500/5 border border-zinc-100 dark:border-zinc-800">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
