import { getProjectsAction } from "@/application/use-cases/project.actions";
import { getExperiencesAction } from "@/application/use-cases/experience.actions";
import { getMessagesAction } from "@/application/use-cases/message.actions";
import Link from "next/link";

export default async function AdminDashboard() {
    // In a real app we might want optimized count queries
    const projects = await getProjectsAction();
    const experiences = await getExperiencesAction();
    const messages = await getMessagesAction();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">Total Projects</h2>
                    <p className="text-4xl font-bold mt-2">{projects.length}</p>
                    <Link href="/admin/projects" className="text-sm text-indigo-600 hover:underline mt-4 block">Manage Projects &rarr;</Link>
                </div>
                 <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">Experiences</h2>
                    <p className="text-4xl font-bold mt-2">{experiences.length}</p>
                    <Link href="/admin/experiences" className="text-sm text-indigo-600 hover:underline mt-4 block">Manage Experiences &rarr;</Link>
                </div>
                 <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">Messages</h2>
                    <p className="text-4xl font-bold mt-2">{messages.length}</p>
                    <Link href="/admin/messages" className="text-sm text-indigo-600 hover:underline mt-4 block">View Messages &rarr;</Link>
                </div>
            </div>
        </div>
    )
}
