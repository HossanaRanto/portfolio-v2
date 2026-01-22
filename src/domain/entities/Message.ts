export interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    content: string;
    read: boolean;
    createdAt: Date;
}
