import { Project } from "../entities/Project";

export interface IProjectRepository {
    getAll(): Promise<Project[]>;
    getFeatured(): Promise<Project[]>;
    getById(id: string): Promise<Project | null>;
    getBySlug(slug: string): Promise<Project | null>;
    create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
    update(id: string, project: Partial<Project>): Promise<Project>;
    delete(id: string): Promise<void>;
}
