"use client";

import { loginAction } from "@/application/use-cases/auth.actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";
// Removed useRouter as navigation is handled by server action redirect

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  // router removed

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
        const result = await loginAction(formData);

        if (result?.error) {
            console.error(result.error);
            setLoading(false);
            alert("Login failed: " + result.error);
        }
        // If login is successful, the server action will redirect, 
        // effectively unmounting this component or navigating away.
    } catch (error) {
        console.error("Unexpected error:", error);
        setLoading(false);
        // Note: If the redirect implementation changes to throw, we might see it here, 
        // but typically Next.js Server Actions handle redirects gracefully.
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
