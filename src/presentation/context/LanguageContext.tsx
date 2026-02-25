"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Language = 'en' | 'fr' | string;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Derived state from URL search params
    const language = (searchParams.get('lang') || 'en') as Language;

    const setLanguage = (lang: Language) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('lang', lang);
        router.push(`?${newParams.toString()}`);
    };

    const t = (key: string) => {
        // Simple translation dictionary for static UI elements
        const translations: Record<string, Record<string, string>> = {
            'nav.projects': { en: 'Projects', fr: 'Projets' },
            'nav.about': { en: 'About', fr: 'À Propos' },
            'nav.contact': { en: 'Contact', fr: 'Contact' },
            'nav.experiences': { en: 'Experiences', fr: 'Expériences' },
            'hero.title': { en: 'Building Digital Experiences', fr: 'Création d\'Expériences Numériques' },
            'hero.subtitle': { en: 'Full Stack Developer', fr: 'Développeur Full Stack' },
            'hero.cta': { en: 'View Work', fr: 'Voir mes projets' },
            'contact.title': { en: 'Let\'s Work Together', fr: 'Travaillons Ensemble' },
            'contact.name': { en: 'Name', fr: 'Nom' },
            'contact.email': { en: 'Email', fr: 'Email' },
            'contact.subject': { en: 'Subject', fr: 'Sujet' },
            'contact.message': { en: 'how can I help you?', fr: 'comment puis-je vous aider ?' },
            'contact.send': { en: 'Send Message', fr: 'Envoyer' },
            'contact.sending': { en: 'Sending...', fr: 'Envoi...' },
            'contact.sent': { en: 'Message Sent! 🚀', fr: 'Message Envoyé ! 🚀' },
            'contact.thanks': { en: 'Thanks for reaching out. I\'ll get back to you as soon as possible.', fr: 'Merci de m\'avoir contacté. Je vous répondrai dès que possible.' },
            'contact.sendAnother': { en: 'Send another message', fr: 'Envoyer un autre message' },
            'contact.phone': { en: 'Phone', fr: 'Téléphone' },
            'contact.social': { en: 'Social', fr: 'Réseaux Sociaux' },
            'experiences.title': { en: 'Work Experience', fr: 'Expérience Professionnelle' },
            'experiences.subtitle': { en: 'Professional Journey', fr: 'Parcours Professionnel' },
            'experiences.description': { en: 'A timeline of my professional career and the roles I have held.', fr: 'Une chronologie de ma carrière professionnelle et des postes que j\'ai occupés.' },
            'featured.subtitle': { en: 'Selected Works', fr: 'Travaux Sélectionnés' },
            'featured.title': { en: 'Latest Projects', fr: 'Derniers Projets' },
            'featured.description': { en: 'Showcasing effective solutions and creative experiments.', fr: 'Mise en avant de solutions efficaces et d\'expériences créatives.' },
            'hero.description': { 
                en: 'I am a web Full Stack Developer. I specialize in building reliable, scalable applications using React, Next.js, and Domain-Driven Design. I turn complex ideas into high-performing digital realities.', 
                fr: 'Je suis Développeur Full Stack. Je me spécialise dans la création d\'applications fiables et évolutives avec React, Next.js et la conception pilotée par le domaine. Je transforme des idées complexes en réalités numériques performantes.' 
            },
            'hero.logoDescription': { en: 'Crafted with passion & precision', fr: 'Conçu avec passion & précision' },
            'hero.scroll': { en: 'Scroll', fr: 'Défiler' },
            'services.title': { en: 'My Services', fr: 'Mes Services' },
            'services.subtitle': { en: 'What I Do', fr: 'Ce que je fais' },
            'services.description': { en: 'I help specialized brands and startups create high-performing digital products.', fr: 'J\'aide les marques spécialisées et les startups à créer des produits numériques performants.' },
            'skills.title': { en: 'Core Skills', fr: 'Compétences Clés' },
            'skills.subtitle': { en: 'Tech Stack', fr: 'Stack Technique' },
            'skills.description': { en: 'The technologies and frameworks I use to build modern, scalable applications.', fr: 'Les technologies et frameworks que j\'utilise pour créer des applications modernes et évolutives.' },
        };
        
        return translations[key]?.[language] || translations[key]?.['en'] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
