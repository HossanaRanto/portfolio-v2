export interface Experience {
    id: string;
    role: string;
    company: string;
    companyUrl?: string;
    location?: string;
    startDate: Date;
    endDate?: Date | null;
    description: string[];
    logo?: string;
    technologies?: string[];
    createdAt: Date;
}
