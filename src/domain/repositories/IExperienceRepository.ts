import { Experience } from "../entities/Experience";

export interface IExperienceRepository {
    getAll(): Promise<Experience[]>;
    getById(id: string): Promise<Experience | null>;
    create(experience: Omit<Experience, 'id' | 'createdAt'>): Promise<Experience>;
    update(id: string, experience: Partial<Experience>): Promise<Experience>;
    delete(id: string): Promise<void>;
}
