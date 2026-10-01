import { ProjectForm } from "@/presentation/components/domain/ProjectForm";
import { getProjectByIdAction } from "@/application/use-cases/project.actions";

export default async function NewProjectPage(props: { searchParams: Promise<{ from?: string }> }) {
    const { from } = await props.searchParams;
    const original = from ? await getProjectByIdAction(from) : null;

    return (
        <div className="max-w-4xl mx-auto">
             <h1 className="text-2xl font-bold mb-6">{original ? 'Duplicate Project' : 'New Project'}</h1>
             {original && (
                <p className="mb-6 p-4 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20 text-sm text-indigo-800 dark:text-indigo-300">
                    Copy of <strong>{original.title}</strong> ({original.language.toUpperCase()}), switched to {original.language === 'fr' ? 'English' : 'French'}.
                    Translate the fields, then save to create the new project. The original stays unchanged.
                </p>
             )}
             <ProjectForm duplicateFrom={original ?? undefined} />
        </div>
    )
}
