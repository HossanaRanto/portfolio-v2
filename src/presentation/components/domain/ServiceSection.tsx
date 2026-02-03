"use client"
import { Service } from "@/domain/entities/Service";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { TiltCard } from "@/presentation/components/ui/tilt-card";
import { BlurText } from "@/presentation/components/ui/blur-text";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function ServiceSection({ services }: { services: Service[] }) {
    const { t } = useLanguage();

    if (!services || services.length === 0) return null;

    return (
        <section id="services" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-950/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        {t('services.subtitle')}
                    </h2>
                    <BlurText 
                        text={t('services.title')} 
                        className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white"
                        animateBy="words"
                        direction="bottom"
                    />
                     <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        {t('services.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        // Dynamic Icon
                        const IconComponent = (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Code;
                        
                        return (
                            <TiltCard key={service.id} className="h-full">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </TiltCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
