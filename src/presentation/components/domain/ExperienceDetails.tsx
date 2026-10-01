import Image from "next/image";
import { Experience } from "@/domain/entities/Experience";
import { mergeTags } from "@/lib/tags";

const LABELS = {
    en: { present: "Present", description: "Description", technologies: "Technologies" },
    fr: { present: "Présent", description: "Description", technologies: "Technologies" },
};

export function ExperienceDetails({ experience }: { experience: Experience }) {
    const lang = experience.language === "fr" ? "fr" : "en";
    const t = LABELS[lang];
    const fmt = (d: Date) => new Date(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { month: "long", year: "numeric" });
    const tags = mergeTags(experience.technologies);

    return (
        <article>
            <header className="flex items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{experience.role}</h2>
                    <div className="text-xl text-indigo-600 font-medium">
                        {experience.companyUrl ? (
                            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {experience.company}
                            </a>
                        ) : experience.company}
                    </div>
                    <div className="text-sm text-zinc-500 mt-2">
                        {fmt(experience.startDate)} – {experience.endDate ? fmt(experience.endDate) : t.present}
                    </div>
                    {experience.location && <div className="text-sm text-zinc-400 mt-1">{experience.location}</div>}
                </div>
                {experience.logo && (
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800">
                        <Image src={experience.logo} alt={experience.company} fill className="object-cover" />
                    </div>
                )}
            </header>

            <h3 className="text-lg font-semibold mb-4">{t.description}</h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
                {experience.description.map((desc, i) => <li key={i}>{desc}</li>)}
            </ul>

            {tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">{t.technologies}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
