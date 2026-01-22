import { Message } from "../entities/Message";

export interface IMessageRepository {
    create(message: Omit<Message, 'id' | 'createdAt' | 'read'>): Promise<Message>;
    getAll(): Promise<Message[]>;
    markAsRead(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
