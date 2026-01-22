"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/domain/entities/Project";
import { createClient } from "@/infrastructure/supabase/client";
import { createProjectAction, updateProjectAction } from "@/application/use-cases/project.actions";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export function ProjectForm({ project }: { project?: Project }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(project?.coverImage || null);

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
             // Handle Image Upload
            const coverFile = formData.get('cover_file') as File;
            let coverUrl = project?.coverImage || "";
            
            if (coverFile && coverFile.size > 0) {
                const supabase = createClient();
                const filename = `${Date.now()}-${coverFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                
                // Ensure bucket exists or handle error (Assuming 'projects-assets' or 'projects' bucket exists)
                const { data, error } = await supabase.storage.from('projects').upload(filename, coverFile);
                
                if (error) {
                    console.error('Upload error:', error);
                    // Fallback or alert? For now log.
                    // If bucket doesn't exist, this fails.
                    // Assuming user setups bucket 'projects'
                }

                if (data) {
                    const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(filename);
                    coverUrl = publicUrl;
                }
            }

            const projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>  = {
                title: formData.get('title') as string,
                slug: formData.get('slug') as string,
                description: formData.get('description') as string,
                content: formData.get('content') as string,
                status: formData.get('status') as Project['status'],
                featured: formData.get('featured') === 'on',
                technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()).filter(Boolean),
                demoUrl: formData.get('demoUrl') as string,
                repoUrl: formData.get('repoUrl') as string,
                coverImage: coverUrl
            };

            if (project) {
                await updateProjectAction(project.id, projectData);
            } else {
                await createProjectAction(projectData);
            }
            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save project. Check console.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input 
                        name="title" 
                        defaultValue={project?.title} 
                        required 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <input 
                        name="slug" 
                        defaultValue={project?.slug} 
                        required 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                    name="description" 
                    defaultValue={project?.description} 
                    required 
                    rows={3}
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4">
                    <div className="relative w-32 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700">
                        {preview ? (
                            <Image src={preview} alt="Preview" fill className="object-cover" />
                        ) : (
                            <Upload className="text-zinc-400" />
                        )}
                    </div>
                    <input 
                        type="file" 
                        name="cover_file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select 
                        name="status" 
                        defaultValue={project?.status || 'IN_PROGRESS'}
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    >
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ARCHIVED">Archived</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 pt-8">
                    <input 
                        type="checkbox" 
                        name="featured" 
                        id="featured" 
                        defaultChecked={project?.featured}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                </div>
            </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma separated)</label>
                <input 
                    name="technologies" 
                    defaultValue={project?.technologies.join(', ')} 
                    placeholder="React, Next.js, TypeScript"
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Demo URL</label>
                    <input 
                        name="demoUrl" 
                        type="url"
                        defaultValue={project?.demoUrl} 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Repo URL</label>
                    <input 
                        name="repoUrl" 
                        type="url"
                        defaultValue={project?.repoUrl} 
                        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Content (Markdown)</label>
                <textarea 
                    name="content" 
                    defaultValue={project?.content} 
                    rows={10}
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent font-mono text-sm"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Project'}
                </button>
            </div>
        </form>
    )
}
