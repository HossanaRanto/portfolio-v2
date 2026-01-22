import Link from "next/link";
import { Briefcase, FolderGit2, Mail, LayoutDashboard, LogOut } from "lucide-react";

export function AdminSidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 z-50">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg"></div>
                <span className="font-bold text-xl">Admin</span>
            </div>
            
            <nav className="space-y-1">
                <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
                    <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link href="/admin/projects" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
                    <FolderGit2 size={20} /> Projects
                </Link>
                <Link href="/admin/experiences" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
                    <Briefcase size={20} /> Experiences
                </Link>
                <Link href="/admin/messages" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white">
                    <Mail size={20} /> Messages
                </Link>
            </nav>

             <div className="absolute bottom-4 left-4 right-4">
                 {/* Logout functionality would be here */}
            </div>
        </aside>
    )
}
