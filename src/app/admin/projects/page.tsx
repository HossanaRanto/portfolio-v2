import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";
import { getProjectsAction, deleteProjectAction } from "@/application/use-cases/project.actions";

export default async function AdminProjectsPage() {
    const projects = await getProjectsAction();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Link href="/admin/projects/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-transform active:scale-95">
                    <Plus size={18} /> Add Project
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Featured</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No projects found. Add one to get started.</td>
                            </tr>
                        ) : projects.map(project => (
                            <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium sm:max-w-xs truncate" title={project.title}>{project.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                        project.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                        project.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                        'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                                    }`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {project.featured ? (
                                        <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                                    ) : (
                                        <span className="text-zinc-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 text-sm">
                                        <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                            <Pencil size={18} />
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteProjectAction(project.id)
                                        }}>
                                            <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                                <Trash size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
