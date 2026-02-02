import { getProjectsAction } from "@/application/use-cases/project.actions";
import { ProjectCard } from "@/presentation/components/domain/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | My Portfolio",
  description: "Explore my latest projects and experiments.",
};

export default async function ProjectsPage() {
  const projects = await getProjectsAction();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-3xl animate-pulse delay-700" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-6 tracking-tight">
            Featured Projects
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A collection of my work, featuring web applications, design systems, and technical experiments.
          </p>
        </header>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">No projects found yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Check back soon, I&apos;m working on something cool!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
