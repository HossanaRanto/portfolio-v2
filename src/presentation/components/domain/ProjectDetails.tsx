import { Project } from "@/domain/entities/Project";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import { ProjectGallery, GlowingTag } from "./ProjectGallery";

export function ProjectDetails({ project }: { project: Project }) {
    return (
        <div className="space-y-8 text-white relative">
             {/* Large Header Section */}
             <div className="text-center space-y-4 mb-8">
                 <div className="inline-block mb-2">
                     <span className="text-indigo-500 font-bold tracking-widest text-sm uppercase">
                         {project.status === 'COMPLETED' ? 'Project' : 'Development'}
                     </span>
                 </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                    {project.title}
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    {project.description}
                </p>
             </div>

            {/* Gallery Carousel */}
            {project.images && project.images.length > 0 ? (
                <ProjectGallery images={project.images} title={project.title} />
            ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
                    {project.coverImage ? (
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-900">
                            <span className="text-zinc-500">No Preview Available</span>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-8">
                {/* Tech Stack - Glowing */}
                <div className="flex flex-wrap justify-center gap-4">
                    {project.technologies.map((tech) => (
                        <GlowingTag key={tech} text={tech} />
                    ))}
                </div>

                <div className="prose prose-invert max-w-none px-4">
                    {project.content && (
                        <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-light">
                            {project.content}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-6 pt-8 border-t border-zinc-800">
                    {project.demoUrl && (
                        <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                        >
                            <Globe size={18} />
                            <span>Live Demo</span>
                        </Link>
                    )}
                    {project.repoUrl && (
                        <Link
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                        >
                            <Github size={18} />
                            <span>Source Code</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
