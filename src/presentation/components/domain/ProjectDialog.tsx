"use client"

import { useRouter } from "next/navigation";
import { Project } from "@/domain/entities/Project";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { ProjectDetails } from "./ProjectDetails";

const PUBLISHED = { en: "Published on", fr: "Publié le" };

/** Project popup driven by the URL: open while `?project=<id>` is present. */
export function ProjectDialog({ project, closeHref }: { project: Project | null; closeHref: string }) {
  const router = useRouter();
  const lang = project?.language === "fr" ? "fr" : "en";

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && router.push(closeHref, { scroll: false })}>
      {project && (
        <DialogContent inline className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw]">
          <DialogHeader>
            <DialogTitle className="sr-only">{project.title}</DialogTitle>
            <div className="flex flex-col gap-1 pb-4 text-left">
              <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {PUBLISHED[lang]} {new Date(project.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}
              </div>
            </div>
          </DialogHeader>
          <ProjectDetails project={project} />
        </DialogContent>
      )}
    </Dialog>
  );
}
