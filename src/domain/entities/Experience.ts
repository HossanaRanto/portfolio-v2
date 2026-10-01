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
    language: string;
    /** Custom SEO tags, merged with technologies (see mergeTags) */
    tags: string[];
    createdAt: Date;
}
