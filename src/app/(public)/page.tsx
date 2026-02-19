import { Hero } from "@/presentation/components/domain/Hero";
import { FeaturedProjects } from "@/presentation/components/domain/FeaturedProjects";
import { ExperienceTimeline } from "@/presentation/components/domain/ExperienceTimeline";
import { ServiceSection } from "@/presentation/components/domain/ServiceSection";
import { SkillsSection } from "@/presentation/components/domain/SkillsSection";
import { getExperiencesAction } from "@/application/use-cases/experience.actions";
import { getServicesAction } from "@/application/use-cases/service.actions";
import { ContactForm } from "@/presentation/components/domain/ContactForm";
import Link from "next/link";
import { DecryptedText } from "@/presentation/components/ui/decrypted-text";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const lang = (params.lang as string) || 'en';
  
  return {
    title: lang === 'fr' ? "Accueil | Ranto Mahefaniaina" : "Home | Ranto Mahefaniaina",
    description: lang === 'fr' 
      ? "Porteur de solutions web fiables et créatives." 
      : "Building reliable and creative web solutions.",
    alternates: {
        canonical: '/',
        languages: {
            'en': '/?lang=en',
            'fr': '/?lang=fr',
        },
    },
  };
}

const translations = {
  en: {
    title: "Let's Work",
    title2: "Together",
    subtitle: "I'm currently available for new projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    open: "Open to Collaborations",
    email: "Email",
    phone: "Phone",
    social: "Social"
  },
  fr: {
    title: "Travaillons",
    title2: "Ensemble",
    subtitle: "Je suis actuellement disponible pour de nouveaux projets. Que vous ayez une question ou que vous vouliez simplement dire bonjour, je ferai de mon mieux pour vous répondre !",
    open: "Ouvert aux Collaborations",
    email: "Email",
    phone: "Téléphone",
    social: "Réseaux Sociaux"
  }
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const lang = (searchParams.lang as string) || 'en';
  const t = translations[lang as 'en' | 'fr'] || translations.en;

  const experiences = await getExperiencesAction(lang);
  const services = await getServicesAction(lang);
  
  return (
    <div>
      <Hero />
      
      {experiences && experiences.length > 0 && (
        <section id="experiences">
          <ExperienceTimeline experiences={experiences} />
        </section>
      )}
      
      <SkillsSection />

      <section id="projects">
        <FeaturedProjects lang={lang} />
      </section>

      <ServiceSection services={services} />
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-24 px-4 text-zinc-900 dark:text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-12 pt-10 sticky top-24">
                        {/* Title */}
                        <div className="space-y-4">
                             <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-zinc-900 dark:text-white">
                                <span className="block">{t.title}</span>
                                <span className="block text-indigo-600 dark:text-indigo-500">{t.title2}</span>
                            </h1>
                        </div>

                         {/* Subtitle */}
                        <div className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                            <DecryptedText text={t.subtitle} animateOn="view" speed={80} />
                        </div>

                         {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-indigo-700 dark:text-indigo-400 font-medium">{t.open}</span>
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
