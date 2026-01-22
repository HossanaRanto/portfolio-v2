import { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { Project } from "@/domain/entities/Project";
import { createClient } from "../supabase/server";
import { Database } from "../supabase/types";

type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export class SupabaseProjectRepository implements IProjectRepository {
    
    private mapToDomain(data: ProjectRow): Project {
        return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description || "",
            content: data.content || undefined,
            coverImage: data.cover_image || "",
            images: data.images || [],
            technologies: data.technologies || [],
            demoUrl: data.demo_url || undefined,
            repoUrl: data.repo_url || undefined,
            status: (data.status as Project['status']) || 'IN_PROGRESS',
            featured: data.featured || false,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at)
        };
    }

    private mapToDb(project: Partial<Project>): ProjectInsert {
        const payload: ProjectInsert = {
             title: project.title!,
             slug: project.slug!,
             // spread remaining optional properties safely if needed, but explicit mapping is safer for type checking
        };
        
        if (project.description !== undefined) payload.description = project.description;
        if (project.content !== undefined) payload.content = project.content;
        if (project.coverImage !== undefined) payload.cover_image = project.coverImage;
        if (project.images !== undefined) payload.images = project.images;
        if (project.technologies !== undefined) payload.technologies = project.technologies;
        if (project.demoUrl !== undefined) payload.demo_url = project.demoUrl;
        if (project.repoUrl !== undefined) payload.repo_url = project.repoUrl;
        if (project.status !== undefined) payload.status = project.status;
        if (project.featured !== undefined) payload.featured = project.featured;

        return payload;
    }

    async getAll(): Promise<Project[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as ProjectRow[]).map(this.mapToDomain);
    }


    async getFeatured(): Promise<Project[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select('*').eq('featured', true).order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as ProjectRow[]).map(this.mapToDomain);
    }

    async getById(id: string): Promise<Project | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        if (error) return null;
        return this.mapToDomain(data as ProjectRow);
    }

    async getBySlug(slug: string): Promise<Project | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
        if (error) return null;
        return this.mapToDomain(data as ProjectRow);
    }
    
    async create(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
        const supabase = await createClient();
        const dbData = this.mapToDb(project);
        const { data, error } = await supabase.from('projects').insert(dbData).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ProjectRow);
    }

    async update(id: string, project: Partial<Project>): Promise<Project> {
        const supabase = await createClient();
        // For update, we only map defined fields
        const dbData: ProjectUpdate = {};
        if (project.title !== undefined) dbData.title = project.title;
        if (project.slug !== undefined) dbData.slug = project.slug;
        if (project.description !== undefined) dbData.description = project.description;
        if (project.content !== undefined) dbData.content = project.content;
        if (project.coverImage !== undefined) dbData.cover_image = project.coverImage;
        if (project.images !== undefined) dbData.images = project.images;
        if (project.technologies !== undefined) dbData.technologies = project.technologies;
        if (project.demoUrl !== undefined) dbData.demo_url = project.demoUrl;
        if (project.repoUrl !== undefined) dbData.repo_url = project.repoUrl;
        if (project.status !== undefined) dbData.status = project.status;
        if (project.featured !== undefined) dbData.featured = project.featured;
        
        dbData.updated_at = new Date().toISOString();

        const { data, error } = await supabase.from('projects').update(dbData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ProjectRow);
    }

    async delete(id: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw new Error(error.message);
    }
}
