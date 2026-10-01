import { notFound, permanentRedirect } from "next/navigation";
import { getProjectBySlugAction } from "@/application/use-cases/project.actions";
import { localizedPath } from "@/lib/seo";

/** Legacy URL: projects now live at /projects?project=<id>. */
export default async function LegacyProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlugAction(slug);
    if (!project) notFound();
    permanentRedirect(localizedPath("/projects", project.language, { project: project.id }));
}
