"use client"
import { Project } from "@/domain/entities/Project";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { ProjectDetails } from "./ProjectDetails";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group w-full text-left h-full focus:outline-none"
        >
          <article className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/20 dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30">
            {/* Glass sheen effect */}
            <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-none" />

            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden border-b border-white/10">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800/50">
                  <span className="text-sm">No Preview</span>
                </div>
              )}
              
              {/* Overlay Gradient on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-bold text-zinc-800 transition-colors group-hover:text-amber-500 dark:text-zinc-100">
                  {project.title}
                </h3>
                <div className="flex size-8 items-center justify-center rounded-full bg-white/20 text-zinc-900 backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-amber-500 group-hover:text-white dark:bg-white/10 dark:text-white">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <p className="mb-6 line-clamp-2 flex-1 text-sm text-zinc-600 dark:text-zinc-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-indigo-50/50 px-2.5 py-1 text-xs font-medium text-indigo-700 backdrop-blur-sm dark:bg-indigo-500/10 dark:text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="rounded-full bg-zinc-100/50 px-2.5 py-1 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:bg-zinc-800/50 dark:text-zinc-400">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </article>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold sr-only">{project.title}</DialogTitle>
           {/* Visual title is inside ProjectDetails or we can move it here. 
               For semantic purpose, DialogTitle is required. I'll put it here.
               And ProjectDetails will handle the rest layout.
           */}
            <div className="flex flex-col gap-1 pb-4 text-left">
                <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Published on {new Date(project.createdAt).toLocaleDateString()}
                </div>
            </div>
        </DialogHeader>
        <ProjectDetails project={project} />
      </DialogContent>
    </Dialog>

  );
}
