import { Service } from "../entities/Service";

export interface IServiceRepository {
    getAll(lang?: string): Promise<Service[]>;
    getById(id: string): Promise<Service | null>;
    create(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service>;
    update(id: string, service: Partial<Service>): Promise<Service>;
    delete(id: string): Promise<void>;
}
