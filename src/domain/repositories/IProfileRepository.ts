import { Profile } from "../entities/Profile";

export interface IProfileRepository {
    getByLanguage(lang: string): Promise<Profile | null>;
    upsert(profile: Omit<Profile, 'updatedAt'>): Promise<Profile>;
    getPhotoUrl(): Promise<string | null>;
    setPhotoUrl(url: string): Promise<void>;
}
