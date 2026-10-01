import { ISkillRepository } from "@/domain/repositories/ISkillRepository";
import { Skill } from "@/domain/entities/Skill";
import { createClient, createAdminClient } from "../supabase/server";
import { Database } from "../supabase/types";

type SkillRow = Database['public']['Tables']['skills']['Row'];
type SkillUpdate = Database['public']['Tables']['skills']['Update'];

export class SupabaseSkillRepository implements ISkillRepository {

    private mapToDomain(data: SkillRow): Skill {
        return {
            id: data.id,
            name: data.name,
            category: data.category,
            color: data.color,
            logo: data.logo || undefined,
            sortOrder: data.sort_order,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }

    async getAll(): Promise<Skill[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: true });
        if (error) throw new Error(error.message);
        if (!data) return [];
        return (data as SkillRow[]).map(this.mapToDomain);
    }

    async getById(id: string): Promise<Skill | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('skills').select('*').eq('id', id).single();
        if (error) return null;
        return this.mapToDomain(data as SkillRow);
    }

    async create(skill: Omit<Skill, "id" | "createdAt" | "updatedAt">): Promise<Skill> {
        const supabase = await createAdminClient();
        const { data, error } = await supabase.from('skills').insert({
            name: skill.name,
            category: skill.category,
            color: skill.color,
            logo: skill.logo || null,
            sort_order: skill.sortOrder,
        }).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as SkillRow);
    }

    async update(id: string, skill: Partial<Skill>): Promise<Skill> {
        const supabase = await createAdminClient();
        const dbData: SkillUpdate = { updated_at: new Date().toISOString() };
        if (skill.name !== undefined) dbData.name = skill.name;
        if (skill.category !== undefined) dbData.category = skill.category;
        if (skill.color !== undefined) dbData.color = skill.color;
        if (skill.logo !== undefined) dbData.logo = skill.logo || null;
        if (skill.sortOrder !== undefined) dbData.sort_order = skill.sortOrder;

        const { data, error } = await supabase.from('skills').update(dbData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as SkillRow);
    }

    async delete(id: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) throw new Error(error.message);
    }
}
