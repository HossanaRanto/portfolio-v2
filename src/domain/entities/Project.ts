export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    content?: string;
    coverImage: string;
    images?: string[];
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
    featured: boolean;
    language: string;
    /** Custom SEO tags, merged with technologies (see mergeTags) */
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
