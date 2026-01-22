import { AdminSidebar } from "@/presentation/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen pl-64 bg-background transition-all">
            <AdminSidebar />
            <main className="p-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    )
}
