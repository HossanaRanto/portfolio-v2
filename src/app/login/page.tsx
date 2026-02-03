import { LoginForm } from "@/presentation/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-4">
                <ArrowLeft size={16} />
                Back to Portfolio
            </Link>
          <h2 className="text-3xl font-bold tracking-tight">Admin Access</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Please sign in to access the dashboard.
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
