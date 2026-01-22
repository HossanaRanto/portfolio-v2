"use client"
import useEmblaCarousel from 'embla-carousel-react'
import { Project } from "@/domain/entities/Project";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' });

    return (
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-6 py-4">
                {projects.map(project => (
                    <div className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-6" key={project.id}>
                         <Link href={`/projects/${project.slug}`} className="block group h-full">
                            <article className="h-full flex flex-col p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-lg hover:border-indigo-500/30 dark:hover:border-indigo-500/30">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-4">
                                    {project.coverImage ? (
                                        <Image 
                                            src={project.coverImage} 
                                            alt={project.title} 
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-zinc-400 bg-zinc-100 dark:bg-zinc-800">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                                        <div className="p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors transform -rotate-45 group-hover:rotate-0">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map(t => (
                                            <span key={t} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                                                {t}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                         </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
