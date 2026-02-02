import { IMessageRepository } from "@/domain/repositories/IMessageRepository";
import { Message } from "@/domain/entities/Message";
import { createClient, createAdminClient } from "../supabase/server";
import { Database } from "../supabase/types";

type MessageRow = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export class SupabaseMessageRepository implements IMessageRepository {
    
    private mapToDomain(data: MessageRow): Message {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            subject: data.subject || undefined,
            content: data.content,
            read: data.read || false,
            createdAt: new Date(data.created_at),
        };
    }

    async create(message: Omit<Message, "id" | "createdAt" | "read">): Promise<Message> {
        const supabase = await createClient();
        const dbData: MessageInsert = {
            name: message.name,
            email: message.email,
            phone: message.phone,
            subject: message.subject,
            content: message.content,
        };
        const { data, error } = await supabase.from('messages').insert(dbData).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as MessageRow);
    }

    async getAll(): Promise<Message[]> {
        const supabase = await createAdminClient();
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as MessageRow[]).map(this.mapToDomain);
    }

    async markAsRead(id: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase.from('messages').update({ read: true }).eq('id', id);
        if (error) throw new Error(error.message);
    }

    async delete(id: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw new Error(error.message);
    }
}
