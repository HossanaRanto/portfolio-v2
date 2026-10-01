export interface Education {
    degree: string;
    school: string;
    start: string;
    end: string;
    description: string;
}

export interface SpokenLanguage {
    name: string;
    level: string;
    certificate?: string;
}

export interface Profile {
    language: string;
    fullName: string;
    headline: string;
    summary: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    education: Education[];
    spokenLanguages: SpokenLanguage[];
    softSkills: string[];
    interests: string[];
    updatedAt: Date;
}
