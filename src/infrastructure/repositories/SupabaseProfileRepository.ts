import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { Education, Profile, SpokenLanguage } from "@/domain/entities/Profile";
import { createClient, createAdminClient } from "../supabase/server";
import { Database } from "../supabase/types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

const PHOTO_KEY = 'profile_photo';

export class SupabaseProfileRepository implements IProfileRepository {

    private mapToDomain(data: ProfileRow): Profile {
        return {
            language: data.language,
            fullName: data.full_name,
            headline: data.headline,
            summary: data.summary,
            location: data.location || undefined,
            email: data.email || undefined,
            phone: data.phone || undefined,
            website: data.website || undefined,
            linkedin: data.linkedin || undefined,
            github: data.github || undefined,
            education: (data.education as unknown as Education[]) || [],
            spokenLanguages: (data.spoken_languages as unknown as SpokenLanguage[]) || [],
            softSkills: data.soft_skills || [],
            interests: data.interests || [],
            updatedAt: new Date(data.updated_at),
        };
    }

    async getByLanguage(lang: string): Promise<Profile | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('profiles').select('*').eq('language', lang).maybeSingle();
        if (error) throw new Error(error.message);
        return data ? this.mapToDomain(data as ProfileRow) : null;
    }

    async upsert(profile: Omit<Profile, 'updatedAt'>): Promise<Profile> {
        const supabase = await createAdminClient();
        const dbData: ProfileInsert = {
            language: profile.language,
            full_name: profile.fullName,
            headline: profile.headline,
            summary: profile.summary,
            location: profile.location || null,
            email: profile.email || null,
            phone: profile.phone || null,
            website: profile.website || null,
            linkedin: profile.linkedin || null,
            github: profile.github || null,
            education: profile.education as unknown as ProfileInsert['education'],
            spoken_languages: profile.spokenLanguages as unknown as ProfileInsert['spoken_languages'],
            soft_skills: profile.softSkills,
            interests: profile.interests,
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase.from('profiles').upsert(dbData).select().single();
        if (error) throw new Error(error.message);
        return this.mapToDomain(data as ProfileRow);
    }

    async getPhotoUrl(): Promise<string | null> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('settings').select('value').eq('key', PHOTO_KEY).maybeSingle();
        if (error) return null;
        return data?.value || null;
    }

    async setPhotoUrl(url: string): Promise<void> {
        const supabase = await createAdminClient();
        const { error } = await supabase
            .from('settings')
            .upsert({ key: PHOTO_KEY, value: url, updated_at: new Date().toISOString() });
        if (error) throw new Error(error.message);
    }
}
