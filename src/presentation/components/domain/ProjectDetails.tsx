import { Project } from "@/domain/entities/Project";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";

export function ProjectDetails({ project }: { project: Project }) {
    return (
        <div className="space-y-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                {project.coverImage ? (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                        <span className="text-zinc-400">No Preview Available</span>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                     <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {project.description}
                    </p>
                    {project.content && (
                        <div className="mt-4 whitespace-pre-wrap">
                            {project.content}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    {project.demoUrl && (
                        <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                        >
                            <Globe size={16} />
                            Live Demo
                        </Link>
                    )}
                    {project.repoUrl && (
                        <Link
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <Github size={16} />
                            Source Code
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
