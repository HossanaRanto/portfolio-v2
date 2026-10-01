export interface Skill {
    id: string;
    name: string;
    category: string;
    color: string;
    logo?: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
