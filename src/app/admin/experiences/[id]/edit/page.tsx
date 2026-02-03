import { ExperienceForm } from "@/presentation/components/domain/ExperienceForm";
import { getExperienceByIdAction } from "@/application/use-cases/experience.actions";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
    const { id } = await params;
    const experience = await getExperienceByIdAction(id);

    if (!experience) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>
            <ExperienceForm experience={experience} />
        </div>
    )
}
