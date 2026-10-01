import { notFound, permanentRedirect } from "next/navigation";
import { getExperienceByIdAction } from "@/application/use-cases/experience.actions";
import { localizedPath } from "@/lib/seo";

/** Legacy URL: experiences now live at /experiences?experience=<id>. */
export default async function LegacyExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const experience = await getExperienceByIdAction(id);
    if (!experience) notFound();
    permanentRedirect(localizedPath("/experiences", experience.language, { experience: experience.id }));
}
