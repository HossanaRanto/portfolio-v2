import { IExperienceRepository } from "@/domain/repositories/IExperienceRepository";
import { Experience } from "@/domain/entities/Experience";
import { createClient, createAdminClient } from "../supabase/server";
import { Database } from "../supabase/types";

type ExperienceRow = Database['public']['Tables']['experiences']['Row'];
type ExperienceInsert = Database['public']['Tables']['experiences']['Insert'];
type ExperienceUpdate = Database['public']['Tables']['experiences']['Update'];

export class SupabaseExperienceRepository implements IExperienceRepository {

    private mapToDomain(data: ExperienceRow): Experience {
        return {
            id: data.id,
            role: data.role,
            company: data.company,
            companyUrl: data.company_url || undefined,
            location: data.location || undefined,
            startDate: new Date(data.start_date),
            endDate: data.end_date ? new Date(data.end_date) : null,
            description: data.description || [],
            logo: data.logo || undefined,
            technologies: data.technologies || [],
            createdAt: new Date(data.created_at),
        };
    }

    async getAll(): Promise<Experience[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('experiences').select('*').order('start_date', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as ExperienceRow[]).map(this.mapToDomain);
    }

    async create(experience: Omit<Experience, "id" | "createdAt">): Promise<Experience> {
        const supabase = await createAdminClient();
        const dbData: ExperienceInsert = {
            role: experience.role,
            company: experience.company,
            company_url: experience.companyUrl,
            location: experience.location,
            start_date: experience.startDate.toISOString(),
            end_date: experience.endDate ? experience.endDate.toISOString() : null,
            description: experience.description,
            logo: experience.logo,
            technologies: experience.technologies,
        };
        const { data, error } = await supabase.from('experiences').insert(dbData).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ExperienceRow);
    }

    async update(id: string, experience: Partial<Experience>): Promise<Experience> {
        const supabase = await createAdminClient();
        const dbData: ExperienceUpdate = {};
        if (experience.role !== undefined) dbData.role = experience.role;
        if (experience.company !== undefined) dbData.company = experience.company;
        if (experience.companyUrl !== undefined) dbData.company_url = experience.companyUrl;
        if (experience.location !== undefined) dbData.location = experience.location;
        if (experience.startDate !== undefined) dbData.start_date = experience.startDate.toISOString();
        if (experience.endDate !== undefined) dbData.end_date = experience.endDate ? experience.endDate.toISOString() : null;
        if (experience.description !== undefined) dbData.description = experience.description;
        if (experience.logo !== undefined) dbData.logo = experience.logo;
        if (experience.technologies !== undefined) dbData.technologies = experience.technologies;

        const { data, error } = await supabase.from('experiences').update(dbData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ExperienceRow);
    }


    async delete(id: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase.from('experiences').delete().eq('id', id);
        if (error) throw new Error(error.message);
    }
}
