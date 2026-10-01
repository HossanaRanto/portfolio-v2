export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    language: string;
    /** Custom SEO tags, merged with technologies (see mergeTags) */
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
