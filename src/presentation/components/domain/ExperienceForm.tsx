"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Experience } from "@/domain/entities/Experience";
import { uploadImageAction } from "@/application/use-cases/storage.actions";
import { createExperienceAction, updateExperienceAction } from "@/application/use-cases/experience.actions";
import { Upload } from "lucide-react";
import Image from "next/image";

export function ExperienceForm({ experience }: { experience?: Experience }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(experience?.logo || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            // Handle Logo Upload
            const logoFile = formData.get('logo_file') as File;
            let logoUrl = experience?.logo || "";
            
            if (logoFile && logoFile.size > 0) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', logoFile);
                try {
                    logoUrl = await uploadImageAction(uploadFormData);
                } catch (err) {
                    console.error('Upload failed:', err);
                    alert('Image upload failed. See console.');
                    setLoading(false);
                    return;
                }
            }

            const startDateStr = formData.get('startDate') as string;
            const endDateStr = formData.get('endDate') as string;

            const experienceData: Omit<Experience, 'id' | 'createdAt'>  = {
                role: formData.get('role') as string,
                company: formData.get('company') as string,
                companyUrl: formData.get('companyUrl') as string,
                location: formData.get('location') as string,
                startDate: new Date(startDateStr),
                endDate: endDateStr ? new Date(endDateStr) : null,
                description: (formData.get('description') as string).split('\n').map(l => l.trim()).filter(Boolean),
                technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()).filter(Boolean),
                logo: logoUrl
            };

            if (experience) {
                await updateExperienceAction(experience.id, experienceData);
            } else {
                await createExperienceAction(experienceData);
            }
            router.push('/admin/experiences');
            router.refresh();
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save experience. Check console.');
        } finally {
            setLoading(false);
        }
    }

    // Helper to format date for input type="date"
    const formatDate = (date?: Date | null) => {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <input 
                        name="role" 
                        defaultValue={experience?.role} 
                        required 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input 
                        name="company" 
                        defaultValue={experience?.company} 
                        required 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Company URL</label>
                    <input 
                        name="companyUrl" 
                        defaultValue={experience?.companyUrl} 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input 
                        name="location" 
                        defaultValue={experience?.location} 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input 
                        type="date"
                        name="startDate" 
                        defaultValue={formatDate(experience?.startDate)} 
                        required 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">End Date (Leave empty if current)</label>
                    <input 
                        type="date"
                        name="endDate" 
                        defaultValue={formatDate(experience?.endDate)} 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description (One item per line)</label>
                <textarea 
                    name="description" 
                    defaultValue={experience?.description.join('\n')}
                    required
                    rows={5}
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (Comma separated)</label>
                 <input 
                    name="technologies" 
                    defaultValue={experience?.technologies?.join(', ')}
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium block">Company Logo</label>
                <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        {preview ? (
                            <Image src={preview} alt="Preview" fill className="object-cover" />
                        ) : (
                            <span className="text-zinc-400 text-xs">No image</span>
                        )}
                    </div>
                    <label className="cursor-pointer bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                        <Upload size={16} />
                        Choose File
                        <input type="file" name="logo_file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : 'Save Projects'}
                </button>
            </div>
        </form>
    );
}
