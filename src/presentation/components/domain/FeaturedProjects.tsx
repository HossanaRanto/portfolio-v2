import { getFeaturedProjectsAction, getProjectsAction } from "@/application/use-cases/project.actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

export async function FeaturedProjects() {
    let projects = await getFeaturedProjectsAction();

    // Fallback: If no projects are marked as featured, show the latest ones
    if (projects.length === 0) {
        const allProjects = await getProjectsAction();
        projects = allProjects.slice(0, 3);
    }

    // If still no projects, don't render the section
    if (projects.length === 0) return null;

    // Limit to 3 for display
    const displayProjects = projects.slice(0, 3);

    return (
        <section className="py-24 px-4 relative">
             <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="space-y-4">
                        <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Selected Works</span>
                        <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
                            Showcasing effective solutions and creative experiments.
                        </p>
                    </div>
                    <Link 
                        href="/projects" 
                        className="hidden md:flex items-center gap-2 text-zinc-900 dark:text-white font-medium hover:text-indigo-600 transition-colors group"
                    >
                        View All Projects 
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
                 
                 <div className="mt-8 md:hidden text-center">
                    <Link href="/projects" className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-2">
                        View All Projects <ArrowRight size={18} />
                    </Link>
                 </div>
             </div>
        </section>
    )
}
