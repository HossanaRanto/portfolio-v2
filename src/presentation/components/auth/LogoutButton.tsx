"use client";

import { createClient } from "@/infrastructure/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login"); // or root '/'
        router.refresh();
    };

    return (
        <button 
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
        >
            <LogOut size={20} />
            <span>{loading ? "Logging out..." : "Logout"}</span>
        </button>
    );
}