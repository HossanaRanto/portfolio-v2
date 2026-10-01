"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { localizedPath, normalizeLanguage } from "@/lib/seo-routes.mjs";

export function Footer() {
    const { t, language } = useLanguage();
    const currentYear = new Date().getFullYear();
    const lang = normalizeLanguage(language);

    return (
        <footer className="print:hidden bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/img/rumi.png" alt="Ranto Logo" width={150} height={150}/>
                        <span className="font-bold text-2xl tracking-tight">Ranto Mahefaniaina</span>
                    </div>

                    <div className="flex gap-8 text-base font-medium text-zinc-600 dark:text-zinc-400">
                        <Link href={localizedPath("/experiences", lang)} className="hover:text-indigo-600 transition-colors">{t('nav.experiences')}</Link>
                        <Link href={localizedPath("/projects", lang)} className="hover:text-indigo-600 transition-colors">{t('nav.projects')}</Link>
                        <Link href={localizedPath("/contact", lang)} className="hover:text-indigo-600 transition-colors">{t('nav.contact')}</Link>
                        <Link href={localizedPath("/about", lang)} className="hover:text-indigo-600 transition-colors">{t('nav.about')}</Link>
                        <Link href={localizedPath("/cv", lang)} className="hover:text-indigo-600 transition-colors">{t('nav.cv')}</Link>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-500">
                    <p>&copy; {currentYear} Ranto Mahefaniaina. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}