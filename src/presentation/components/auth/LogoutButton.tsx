"use client";

import { logoutAction } from "@/application/use-cases/auth.actions";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await logoutAction();
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