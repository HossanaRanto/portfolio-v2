"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/domain/entities/Service";
import { createServiceAction, updateServiceAction } from "@/application/use-cases/service.actions";
import { Loader2 } from "lucide-react";

export function ServiceForm({ service }: { service?: Service }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            const serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>  = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                icon: formData.get('icon') as string,
                language: formData.get('language') as string,
            };

            if (service) {
                await updateServiceAction(service.id, serviceData);
            } else {
                await createServiceAction(serviceData);
            }
            router.push('/admin/services');
            router.refresh();
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save service. Check console.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
             {/* Language Selection */}
             <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select 
                    name="language" 
                    defaultValue={service?.language || 'en'}
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                >
                    <option value="en">English (en)</option>
                    <option value="fr">French (fr)</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input 
                    name="title" 
                    defaultValue={service?.title} 
                    required 
                    placeholder="e.g. Web Development"
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Icon (Lucide React Name)</label>
                <input 
                    name="icon" 
                    defaultValue={service?.icon} 
                    required 
                    placeholder="e.g. Code, Palette, Smartphone"
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
                <p className="text-xs text-zinc-500">Use icon names from <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="underline">Lucide React</a>.</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                    name="description" 
                    defaultValue={service?.description} 
                    required 
                    rows={4}
                    placeholder="Describe the service..."
                    className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
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
                    {service ? 'Update Service' : 'Create Service'}
                </button>
            </div>
        </form>
    );
}