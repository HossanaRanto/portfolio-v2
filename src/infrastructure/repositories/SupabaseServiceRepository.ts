import { IServiceRepository } from "@/domain/repositories/IServiceRepository";
import { Service } from "@/domain/entities/Service";
import { createClient, createAdminClient } from "../supabase/server";
import { Database } from "../supabase/types";

type ServiceRow = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export class SupabaseServiceRepository implements IServiceRepository {

    private mapToDomain(data: ServiceRow): Service {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            icon: data.icon,
            language: data.language || 'en',
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }

    private mapToDb(service: Partial<Service>): ServiceInsert {
        const payload: ServiceInsert = {
             title: service.title!,
             description: service.description!,
             icon: service.icon!,
        };
        
        if (service.language !== undefined) payload.language = service.language;
        return payload;
    }

    async getAll(lang?: string): Promise<Service[]> {
        const supabase = await createClient();
        let query = supabase.from('services').select('*').order('created_at', { ascending: true });
        
        if (lang) {
            query = query.eq('language', lang);
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);
        if (!data) return [];
        return (data as ServiceRow[]).map(this.mapToDomain);
    }

    async getById(id: string): Promise<Service | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
        if (error) return null;
        return this.mapToDomain(data as ServiceRow);
    }

    async create(service: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<Service> {
        const supabase = await createAdminClient();
        const dbData = this.mapToDb(service);
        const { data, error } = await supabase.from('services').insert(dbData).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ServiceRow);
    }

    async update(id: string, service: Partial<Service>): Promise<Service> {
        const supabase = await createAdminClient();
        const updateData: ServiceUpdate = {
            ...service.title && { title: service.title },
            ...service.description && { description: service.description },
            ...service.icon && { icon: service.icon },
            ...service.language && { language: service.language },
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase.from('services').update(updateData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ServiceRow);
    }

    async delete(id: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw new Error(error.message);
    }
}
