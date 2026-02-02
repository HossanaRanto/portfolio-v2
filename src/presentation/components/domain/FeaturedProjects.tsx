import { getProjectsAction } from "@/application/use-cases/project.actions";
import { ProjectCard } from "./ProjectCard";

export async function FeaturedProjects() {
    const projects = await getProjectsAction();

    // If no projects, don't render the section
    if (projects.length === 0) return null;

    return (
        <section id="projects" className="py-24 px-4 relative">
             <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="space-y-4">
                        <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Selected Works</span>
                        <h2 className="text-3xl md:text-5xl font-bold">Latest Projects</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
                            Showcasing effective solutions and creative experiments.
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
