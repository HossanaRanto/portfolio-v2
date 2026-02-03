import { getProjectsAction } from "@/application/use-cases/project.actions";
import { ProjectCard } from "./ProjectCard";

const translations = {
    en: {
        subtitle: 'Selected Works',
        title: 'Latest Projects',
        description: 'Showcasing effective solutions and creative experiments.'
    },
    fr: {
        subtitle: 'Travaux Sélectionnés',
        title: 'Derniers Projets',
        description: 'Mise en avant de solutions efficaces et d\'expériences créatives.'
    }
}

export async function FeaturedProjects({ lang }: { lang?: string }) {
    const projects = await getProjectsAction(lang);
    const t = translations[(lang as 'en' | 'fr') || 'en'];

    // If no projects, don't render the section
    if (projects.length === 0) return null;

    return (
        <section id="projects" className="py-24 px-4 relative">
             <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="space-y-4">
                        <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">{t.subtitle}</span>
                        <h2 className="text-3xl md:text-5xl font-bold">{t.title}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
                            {t.description}
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
             </div>
        </section>
    )
}
