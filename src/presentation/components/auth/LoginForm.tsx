"use client";

import { createClient } from "@/infrastructure/supabase/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
      console.error(error);
      setLoading(false);
      alert("Login failed: " + error.message);
    } else {
        router.push('/admin');
        router.refresh();
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    placeholder="admin@example.com"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    required
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
                {loading && <Loader2 className="animate-spin" size={20} />}
                <span>{loading ? "Signing in..." : "Sign In"}</span>
            </button>
        </form>

      <p className="mt-6 text-center text-xs text-zinc-400">
        Access restricted to authorized personnel only.
      </p>
    </div>
  );
}
