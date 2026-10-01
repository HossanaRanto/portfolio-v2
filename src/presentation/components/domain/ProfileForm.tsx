"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Education, Profile, SpokenLanguage } from "@/domain/entities/Profile";
import { saveProfileAction, setProfilePhotoAction } from "@/application/use-cases/profile.actions";
import { uploadImageAction } from "@/application/use-cases/storage.actions";
import { ImageDropzone } from "@/presentation/components/admin/ImageDropzone";
import { Loader2, Plus, Trash2 } from "lucide-react";

const inputClass = "w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent";
const emptyEducation: Education = { degree: "", school: "", start: "", end: "", description: "" };
const emptyLanguage: SpokenLanguage = { name: "", level: "", certificate: "" };

export function ProfilePhotoForm({ photoUrl }: { photoUrl: string }) {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(photoUrl);
    const [saving, setSaving] = useState(false);

    async function save() {
        if (!file) return;
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const url = await uploadImageAction(formData);
            await setProfilePhotoAction(url);
            setFile(null);
            router.refresh();
        } catch (error) {
            console.error('Photo upload failed:', error);
            alert('Photo upload failed. See console.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div>
                <h2 className="text-lg font-semibold">Profile photo</h2>
                <p className="text-sm text-zinc-500">Shared by every language. Used on the About page and the CV.</p>
            </div>
            <ImageDropzone
                value={preview}
                onFile={(f, url) => { setFile(f); setPreview(url); }}
                label="Drop a new photo here, or click to browse"
                previewClassName="w-32 h-32 object-cover rounded-full"
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={save}
                    disabled={!file || saving}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save photo
                </button>
            </div>
        </div>
    );
}

export function ProfileForm({ profile, language }: { profile: Profile | null; language: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState<Education[]>(profile?.education?.length ? profile.education : [emptyEducation]);
    const [languages, setLanguages] = useState<SpokenLanguage[]>(profile?.spokenLanguages?.length ? profile.spokenLanguages : [emptyLanguage]);

    function updateEducation(index: number, field: keyof Education, value: string) {
        setEducation(list => list.map((item, i) => i === index ? { ...item, [field]: value } : item));
    }

    function updateLanguage(index: number, field: keyof SpokenLanguage, value: string) {
        setLanguages(list => list.map((item, i) => i === index ? { ...item, [field]: value } : item));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const text = (key: string) => ((formData.get(key) as string) || "").trim();

        try {
            await saveProfileAction({
                language,
                fullName: text('fullName'),
                headline: text('headline'),
                summary: text('summary'),
                location: text('location'),
                email: text('email'),
                phone: text('phone'),
                website: text('website'),
                linkedin: text('linkedin'),
                github: text('github'),
                education: education.filter(ed => ed.degree.trim() || ed.school.trim()),
                spokenLanguages: languages
                    .filter(l => l.name.trim())
                    .map(l => ({ name: l.name.trim(), level: l.level.trim(), ...(l.certificate?.trim() && { certificate: l.certificate.trim() }) })),
                softSkills: text('softSkills').split(',').map(i => i.trim()).filter(Boolean),
                interests: text('interests').split(',').map(i => i.trim()).filter(Boolean),
            });
            router.refresh();
            alert('Profile saved.');
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save profile. Check console.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <section className="space-y-4">
                <h2 className="text-lg font-semibold">Identity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full name</label>
                        <input name="fullName" defaultValue={profile?.fullName} required className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Headline</label>
                        <input name="headline" defaultValue={profile?.headline} placeholder="e.g. Full Stack Developer" className={inputClass} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Summary</label>
                    <textarea name="summary" defaultValue={profile?.summary} rows={4} className={inputClass} />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="text-xs text-zinc-500">Leave a field empty to hide it from the CV.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone number</label>
                        <input name="phone" type="tel" defaultValue={profile?.phone} placeholder="e.g. +261 34 00 000 00" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input name="email" type="email" defaultValue={profile?.email} placeholder="you@example.com" className={inputClass} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        <input name="location" defaultValue={profile?.location} placeholder="e.g. Lot II A 12, Antananarivo, Madagascar" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Website</label>
                        <input name="website" defaultValue={profile?.website} placeholder="https://..." className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">LinkedIn</label>
                        <input name="linkedin" defaultValue={profile?.linkedin} placeholder="https://linkedin.com/in/..." className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub</label>
                        <input name="github" defaultValue={profile?.github} placeholder="https://github.com/..." className={inputClass} />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <button type="button" onClick={() => setEducation(list => [...list, emptyEducation])} className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
                        <Plus size={16} /> Add
                    </button>
                </div>
                {education.map((ed, i) => (
                    <div key={i} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input value={ed.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} placeholder="Degree" className={inputClass} />
                            <input value={ed.school} onChange={(e) => updateEducation(i, 'school', e.target.value)} placeholder="School" className={inputClass} />
                            <input value={ed.start} onChange={(e) => updateEducation(i, 'start', e.target.value)} placeholder="Start (e.g. 2017)" className={inputClass} />
                            <input value={ed.end} onChange={(e) => updateEducation(i, 'end', e.target.value)} placeholder="End (e.g. 2021)" className={inputClass} />
                        </div>
                        <div className="flex gap-3">
                            <input value={ed.description} onChange={(e) => updateEducation(i, 'description', e.target.value)} placeholder="Details (optional)" className={inputClass} />
                            <button type="button" onClick={() => setEducation(list => list.filter((_, j) => j !== i))} className="p-2 text-zinc-500 hover:text-red-600 rounded-md" aria-label="Remove education">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Languages</h2>
                        <p className="text-xs text-zinc-500">Certificate is optional (e.g. TOEIC 905, DELF B2).</p>
                    </div>
                    <button type="button" onClick={() => setLanguages(list => [...list, emptyLanguage])} className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
                        <Plus size={16} /> Add
                    </button>
                </div>
                {languages.map((l, i) => (
                    <div key={i} className="flex gap-3">
                        <input value={l.name} onChange={(e) => updateLanguage(i, 'name', e.target.value)} placeholder="Language (e.g. English)" className={inputClass} />
                        <input value={l.level} onChange={(e) => updateLanguage(i, 'level', e.target.value)} placeholder="Level (e.g. Fluent)" className={inputClass} />
                        <input value={l.certificate || ""} onChange={(e) => updateLanguage(i, 'certificate', e.target.value)} placeholder="Certificate (optional)" className={inputClass} />
                        <button type="button" onClick={() => setLanguages(list => list.filter((_, j) => j !== i))} className="p-2 text-zinc-500 hover:text-red-600 rounded-md" aria-label="Remove language">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </section>

            <section className="space-y-2">
                <h2 className="text-lg font-semibold">Soft skills</h2>
                <input name="softSkills" defaultValue={profile?.softSkills.join(', ')} placeholder="Comma separated, e.g. Teamwork, Communication, Problem solving" className={inputClass} />
            </section>

            <section className="space-y-2">
                <h2 className="text-lg font-semibold">Interests</h2>
                <input name="interests" defaultValue={profile?.interests.join(', ')} placeholder="Comma separated, e.g. Chess, Volleyball" className={inputClass} />
            </section>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save {language.toUpperCase()} profile
                </button>
            </div>
        </form>
    );
}
