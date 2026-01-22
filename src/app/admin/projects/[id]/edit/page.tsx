import { ProjectForm } from "@/presentation/components/domain/ProjectForm";
import { SupabaseProjectRepository } from "@/infrastructure/repositories/SupabaseProjectRepository";
import { notFound } from "next/navigation";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const repo = new SupabaseProjectRepository();
    const project = await repo.getById(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
             <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
             <ProjectForm project={project} />
        </div>
    )
}
