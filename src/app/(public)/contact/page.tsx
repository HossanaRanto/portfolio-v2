import { ContactForm } from "@/presentation/components/domain/ContactForm";
import { Metadata } from "next";
import { buildAlternates, localizedPath, normalizeLanguage, OG_LOCALES } from "@/lib/seo";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const COPY = {
    en: {
        metaDescription: "Get in touch with Ranto Mahefaniaina for collaborations, questions, or just to say hi.",
        title: "Let's Work",
        title2: "Together",
        subtitle: "I'm currently available for new projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
        open: "Open to Collaborations",
    },
    fr: {
        metaDescription: "Contactez Ranto Mahefaniaina pour une collaboration, une question ou simplement pour dire bonjour.",
        title: "Travaillons",
        title2: "Ensemble",
        subtitle: "Je suis actuellement disponible pour de nouveaux projets. Que vous ayez une question ou que vous vouliez simplement dire bonjour, je ferai de mon mieux pour vous répondre !",
        open: "Ouvert aux Collaborations",
    },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const lang = normalizeLanguage((await searchParams).lang as string);
    return {
        title: "Contact",
        description: COPY[lang as "en" | "fr"].metaDescription,
        alternates: buildAlternates("/contact", lang),
        openGraph: { url: localizedPath("/contact", lang), locale: OG_LOCALES[lang] },
    };
}

export default async function ContactPage(props: Props) {
    const lang = normalizeLanguage((await props.searchParams).lang as string);
    const t = COPY[lang as "en" | "fr"];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-12 pt-10">
                        {/* Title */}
                        <div className="space-y-4">
                             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                                <span className="bg-blue-700 px-4 inline-block transform -rotate-1">{t.title}</span>
                                <br />
                                <span className="bg-blue-700 px-4 inline-block transform rotate-1 mt-2">{t.title2}</span>
                            </h1>
                        </div>

                         {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-xl">
                            {t.subtitle}
                        </p>

                         {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-lime-900 bg-lime-900/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                            </span>
                            <span className="text-lime-400 font-medium">{t.open}</span>
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
