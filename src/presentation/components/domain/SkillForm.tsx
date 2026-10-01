"use client"

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Skill } from "@/domain/entities/Skill";
import { createSkillAction, updateSkillAction } from "@/application/use-cases/skill.actions";
import { uploadImageAction } from "@/application/use-cases/storage.actions";
import { SKILL_CATEGORIES, SKILL_PRESETS, SkillPreset } from "@/lib/skill-presets";
import { ImageDropzone } from "@/presentation/components/admin/ImageDropzone";
import { Loader2, Search } from "lucide-react";

export function SkillForm({ skill }: { skill?: Skill }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [name, setName] = useState(skill?.name || "");
    const [category, setCategory] = useState(skill?.category || "Frontend");
    const [color, setColor] = useState(skill?.color || "#6366f1");
    const [logo, setLogo] = useState(skill?.logo || "");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(skill?.logo || null);
    const [query, setQuery] = useState("");

    const presets = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q
            ? SKILL_PRESETS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
            : SKILL_PRESETS;
    }, [query]);

    const categories = SKILL_CATEGORIES.includes(category) ? SKILL_CATEGORIES : [category, ...SKILL_CATEGORIES];

    function applyPreset(preset: SkillPreset) {
        setName(preset.name);
        setCategory(preset.category);
        setColor(preset.color);
        setLogo(preset.logo);
        setPreview(preset.logo);
        setLogoFile(null);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            let logoUrl = logo;
            if (logoFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', logoFile);
                try {
                    logoUrl = await uploadImageAction(uploadFormData);
                } catch (err) {
                    console.error('Upload failed:', err);
                    alert('Logo upload failed. See console.');
                    setLoading(false);
                    return;
                }
            }

            const skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'> = {
                name,
                category,
                color,
                logo: logoUrl,
                sortOrder: Number(formData.get('sortOrder')) || 0,
            };

            if (skill) {
                await updateSkillAction(skill.id, skillData);
            } else {
                await createSkillAction(skillData);
            }
            router.push('/admin/skills');
            router.refresh();
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save skill. Check console.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {/* Preset library */}
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium">Pick from the logo library</label>
                    <div className="relative">
                        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search stacks..."
                            className="pl-7 pr-2 py-1 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                    {presets.map(preset => (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            title={preset.name}
                            className={`flex flex-col items-center gap-1 p-2 rounded-md border transition-colors ${
                                logo === preset.logo
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                    : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"
                            }`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preset.logo} alt={preset.name} className="w-8 h-8 object-contain" loading="lazy" />
                            <span className="text-[10px] leading-tight text-zinc-600 dark:text-zinc-400 truncate w-full text-center">{preset.name}</span>
                        </button>
                    ))}
                    {presets.length === 0 && (
                        <p className="col-span-full text-sm text-zinc-500 text-center py-4">No preset found — drop your own logo below.</p>
                    )}
                </div>
            </div>

            {/* Custom logo */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <ImageDropzone
                    value={preview}
                    onFile={(file, url) => { setLogoFile(file); setPreview(url); }}
                    onClear={() => { setLogoFile(null); setPreview(null); setLogo(""); }}
                    label="Drop a logo (SVG, PNG...) here, or click to browse"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. React"
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Accent color</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={/^#[0-9a-fA-F]{6}$/.test(color) ? color : "#6366f1"}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-12 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
                        />
                        <input
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="flex-1 p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent font-mono text-sm"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Display order</label>
                    <input
                        name="sortOrder"
                        type="number"
                        defaultValue={skill?.sortOrder ?? 0}
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                    <p className="text-xs text-zinc-500">Lower numbers are shown first.</p>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {skill ? 'Update Skill' : 'Create Skill'}
                </button>
            </div>
        </form>
    );
}
