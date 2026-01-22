import { ProjectForm } from "@/presentation/components/domain/ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="max-w-4xl mx-auto">
             <h1 className="text-2xl font-bold mb-6">New Project</h1>
             <ProjectForm />
        </div>
    )
}
