import { Skill } from "../entities/Skill";

export interface ISkillRepository {
    getAll(): Promise<Skill[]>;
    getById(id: string): Promise<Skill | null>;
    create(skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill>;
    update(id: string, skill: Partial<Skill>): Promise<Skill>;
    delete(id: string): Promise<void>;
}
