import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getProfileForEditAction, getProfilePhotoAction } from "@/application/use-cases/profile.actions";
import { ProfileForm, ProfilePhotoForm } from "@/presentation/components/domain/ProfileForm";

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
];

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function AdminProfilePage(props: PageProps) {
  const { lang } = await props.searchParams;
  const language = LANGUAGES.some(l => l.code === lang) ? lang! : 'en';

  const [profile, photoUrl] = await Promise.all([
    getProfileForEditAction(language),
    getProfilePhotoAction(),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile &amp; CV</h1>
        <Link href={`/cv?lang=${language}`} target="_blank" className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
          View CV <ExternalLink size={14} />
        </Link>
      </div>

      <ProfilePhotoForm photoUrl={photoUrl} />

      <div className="flex gap-2">
        {LANGUAGES.map(l => (
          <Link
            key={l.code}
            href={`/admin/profile?lang=${l.code}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              l.code === language
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {l.label} ({l.code})
          </Link>
        ))}
      </div>

      {/* key forces a fresh form when switching language */}
      <ProfileForm key={language} profile={profile} language={language} />
    </div>
  );
}
