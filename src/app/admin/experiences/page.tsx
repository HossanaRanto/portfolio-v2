import { getExperiencesAction, deleteExperienceAction } from "@/application/use-cases/experience.actions";
import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";

export default async function AdminExperiencesPage() {
    const experiences = await getExperiencesAction();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Experiences</h1>
                <Link href="/admin/experiences/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} /> Add Experience
                </Link>
            </div>
             <div className="bg-white dark:bg-zinc-900 rounded-lg shadow border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase text-xs font-semibold">
                         <tr>
                            <th className="px-6 py-4">Role & Company</th>
                            <th className="px-6 py-4">Timeline</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                         {experiences.map(exp => (
                            <tr key={exp.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4">
                                    <div className="font-medium">{exp.role}</div>
                                    <div className="text-sm text-zinc-500">{exp.company}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-500">
                                    {new Date(exp.startDate).getFullYear()} - 
                                    {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                </td>
                                 <td className="px-6 py-4 text-right flex justify-end gap-2">
                                     {/* Edit link */}
                                    <Link href={`/admin/experiences/${exp.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                        <Pencil size={18} />
                                    </Link>
                                    <form action={async () => {
                                        "use server"
                                        await deleteExperienceAction(exp.id)
                                    }}>
                                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                            <Trash size={18} />
                                        </button>
                                    </form>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    )
}
