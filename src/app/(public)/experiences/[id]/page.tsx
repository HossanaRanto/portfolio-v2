import { getExperienceByIdAction, getExperiencesAction } from "@/application/use-cases/experience.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export async function generateStaticParams() {
    const experiences = await getExperiencesAction();
    return experiences.map((exp) => ({
        id: exp.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const experience = await getExperienceByIdAction(id);

    if (!experience) {
        return {
            title: "Experience Not Found",
        };
    }

    return {
        title: `${experience.role} at ${experience.company} | Ranto Mahefaniaina`,
        description: `My experience as ${experience.role} at ${experience.company}.`,
        openGraph: {
            title: `${experience.role} at ${experience.company}`,
            description: `My experience as ${experience.role} at ${experience.company}.`,
        },
    };
}

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const experience = await getExperienceByIdAction(id);

    if (!experience) {
        notFound();
    }

    // JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization', // Or 'Person' with 'alumniOf' logic, but keeping simple
        name: experience.company,
        url: experience.companyUrl,
        logo: experience.logo,
        description: `Role: ${experience.role}. ${experience.description.join(' ')}`
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20">
             <div className="container mx-auto px-4 max-w-3xl">
                 <div className="mb-8">
                     <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                        &larr; Back to Home
                     </Link>
                 </div>
                 
                 <article className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <header className="flex items-start justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{experience.role}</h1>
                            <div className="text-xl text-indigo-600 font-medium">
                                {experience.companyUrl ? (
                                    <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {experience.company}
                                    </a>
                                ) : (
                                    experience.company
                                )}
                            </div>
                            <div className="text-sm text-zinc-500 mt-2">
                                {new Date(experience.startDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} - 
                                {experience.endDate 
                                    ? new Date(experience.endDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
                                    : ' Present'}
                            </div>
                            {experience.location && (
                                <div className="text-sm text-zinc-400 mt-1">{experience.location}</div>
                            )}
                        </div>
                        {experience.logo && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800">
                                <Image 
                                    src={experience.logo} 
                                    alt={experience.company}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-4">Description</h3>
                        <ul className="space-y-2">
                            {experience.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>

                        {experience.technologies && experience.technologies.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                 </article>
            </div>

            <Script
                id="experience-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
