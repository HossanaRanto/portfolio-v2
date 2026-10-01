import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { buildAlternates, localizedPath, normalizeLanguage, OG_LOCALES } from "@/lib/seo";
import { getProfilePhotoAction } from "@/application/use-cases/profile.actions";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const COPY = {
    en: {
        metaTitle: "About Me",
        metaDescription: "Learn more about Ranto Mahefaniaina's journey, interests, and background.",
        eyebrow: "About Me",
        hello: "Hello, I'm",
        intro: "I am a web developer with a passion for creating innovative web solutions. I am enthusiastic and always eager to learn new technologies.",
        journey: "My Journey",
        journey1: "Initially, I had no intention of pursuing a career in software development, especially since my older brother had already chosen that path. Logically, I considered exploring a different field. However, during my final year of high school, I briefly engaged with one of my brother's projects and found myself captivated by it.",
        journey2: "I pursued a degree in Software Engineering at Adventist University Zurcher in Madagascar. This institution is part of a global network of 116 Adventist universities, and I was fortunate to study at one of them.",
        personal: "Personal Details",
        family: "An interesting fact about my family is that all of my brothers are software developers:",
        olderBrother: "Older Brother:",
        olderBrotherText: "Harena Mahefaniaina (Mobile Developer)",
        twinBrother: "Twin Brother:",
        twinBrotherText: "Rindra Mahefaniaina (Fullstack Web Developer)",
        interests: "My Interests",
        volleyball: "Volleyball",
        volleyballText: "While I may not be a professional athlete, I am an avid fan and enjoy playing the sport recreationally.",
        chess: "Chess",
        chessText: "I consider myself at an intermediate level. If you're interested in a game, feel free to connect with me.",
        playChess: "Play on Chess.com",
    },
    fr: {
        metaTitle: "À Propos",
        metaDescription: "Découvrez le parcours, les centres d'intérêt et l'histoire de Ranto Mahefaniaina.",
        eyebrow: "À Propos",
        hello: "Bonjour, je suis",
        intro: "Je suis un développeur web passionné par la création de solutions web innovantes. Enthousiaste, j'ai toujours envie d'apprendre de nouvelles technologies.",
        journey: "Mon Parcours",
        journey1: "Au départ, je n'avais pas l'intention de faire carrière dans le développement logiciel, d'autant plus que mon grand frère avait déjà choisi cette voie. Logiquement, j'envisageais un autre domaine. Pourtant, en terminale, j'ai brièvement participé à l'un des projets de mon frère et j'ai été captivé.",
        journey2: "J'ai ensuite obtenu un diplôme en Génie Logiciel à l'Université Adventiste Zurcher, à Madagascar. Cet établissement fait partie d'un réseau mondial de 116 universités adventistes, et j'ai eu la chance d'étudier dans l'une d'elles.",
        personal: "Informations Personnelles",
        family: "Fait intéressant sur ma famille : tous mes frères sont développeurs :",
        olderBrother: "Grand frère :",
        olderBrotherText: "Harena Mahefaniaina (Développeur Mobile)",
        twinBrother: "Frère jumeau :",
        twinBrotherText: "Rindra Mahefaniaina (Développeur Web Fullstack)",
        interests: "Mes Centres d'Intérêt",
        volleyball: "Volley-ball",
        volleyballText: "Sans être un athlète professionnel, je suis un grand passionné et j'aime y jouer pour le loisir.",
        chess: "Échecs",
        chessText: "Je me considère de niveau intermédiaire. Si une partie vous tente, n'hésitez pas à me contacter.",
        playChess: "Jouer sur Chess.com",
    },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const lang = normalizeLanguage((await searchParams).lang as string);
    const t = COPY[lang as "en" | "fr"];
    return {
        title: t.metaTitle,
        description: t.metaDescription,
        alternates: buildAlternates("/about", lang),
        openGraph: { url: localizedPath("/about", lang), locale: OG_LOCALES[lang] },
    };
}

export default async function AboutPage(props: Props) {
    const lang = normalizeLanguage((await props.searchParams).lang as string);
    const t = COPY[lang as "en" | "fr"];
    const photoUrl = await getProfilePhotoAction();

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen space-y-24">
            
            {/* Hero / Intro Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto md:ml-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image 
                        src={photoUrl}
                        alt="Ranto Mahefaniaina"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-indigo-500 font-bold tracking-widest text-sm uppercase">{t.eyebrow}</span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
                            {t.hello} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                                Ranto Mahefaniaina
                            </span>
                        </h1>
                    </div>
                    
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {t.intro}
                    </p>
                    
                    <div className="flex gap-4">
                    </div>
                </div>
            </section>

            {/* My Journey */}
            <section className="space-y-8 max-w-4xl mx-auto">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{t.journey}</h2>
                    <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
                </div>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none text-center md:text-left bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <p>
                        {t.journey1}
                    </p>
                    <p>
                        {t.journey2}
                    </p>
                </div>
            </section>

            {/* Personal Details & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Personal Details */}
                <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-full">
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        {t.personal}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {t.family}
                    </p>
                    <ul className="space-y-3">
                         <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                                <strong className="text-zinc-900 dark:text-white">{t.olderBrother}</strong> {t.olderBrotherText}
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                                <strong className="text-zinc-900 dark:text-white">{t.twinBrother}</strong> {t.twinBrotherText}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* My Interests */}
                <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-full">
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        {t.interests}
                    </h3>
                    <ul className="space-y-6">
                        <li>
                            <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{t.volleyball}</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                {t.volleyballText}
                            </p>
                        </li>
                        <li>
                             <h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{t.chess}</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">
                                {t.chessText}
                            </p>
                            <Link 
                                href="https://chess.com/member/rantohossana" 
                                target="_blank"
                                className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 text-sm font-medium transition-colors"
                            >
                                {t.playChess}
                                <ExternalLink size={14} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
