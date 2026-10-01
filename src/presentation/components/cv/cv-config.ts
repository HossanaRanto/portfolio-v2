import { Experience } from "@/domain/entities/Experience";
import { Profile } from "@/domain/entities/Profile";
import { Project } from "@/domain/entities/Project";
import { Skill } from "@/domain/entities/Skill";

export type CvStyle = 'colorful' | 'simple';

export interface CvTheme {
    name: string;
    primary: string;
    dark: string;
    soft: string;
}

export const CV_THEMES: Record<string, CvTheme> = {
    indigo: { name: 'Indigo', primary: '#4f46e5', dark: '#312e81', soft: '#eef2ff' },
    emerald: { name: 'Emerald', primary: '#059669', dark: '#064e3b', soft: '#ecfdf5' },
    rose: { name: 'Rose', primary: '#e11d48', dark: '#881337', soft: '#fff1f2' },
    amber: { name: 'Amber', primary: '#d97706', dark: '#78350f', soft: '#fffbeb' },
    sky: { name: 'Sky', primary: '#0284c7', dark: '#0c4a6e', soft: '#f0f9ff' },
    violet: { name: 'Violet', primary: '#7c3aed', dark: '#4c1d95', soft: '#f5f3ff' },
    slate: { name: 'Slate', primary: '#334155', dark: '#0f172a', soft: '#f1f5f9' },
};

export const DEFAULT_THEME = 'indigo';

export const CV_LABELS = {
    en: {
        profile: 'Profile',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        languages: 'Languages',
        softSkills: 'Soft Skills',
        interests: 'Interests',
        projects: 'Selected Projects',
        demo: 'Demo',
        code: 'Code',
        contact: 'Contact',
        present: 'Present',
        colorful: 'Colorful',
        simple: 'Simple',
        theme: 'Theme',
        print: 'Print / Save PDF',
        empty: 'The CV is not available yet.',
    },
    fr: {
        profile: 'Profil',
        experience: 'Expérience',
        education: 'Formation',
        skills: 'Compétences',
        languages: 'Langues',
        softSkills: 'Savoir-être',
        interests: 'Centres d\'intérêt',
        projects: 'Projets Sélectionnés',
        demo: 'Démo',
        code: 'Code',
        contact: 'Contact',
        present: 'Présent',
        colorful: 'Coloré',
        simple: 'Simple',
        theme: 'Thème',
        print: 'Imprimer / PDF',
        empty: 'Le CV n\'est pas encore disponible.',
    },
};

export type CvLabels = typeof CV_LABELS['en'];

export interface CvData {
    lang: string;
    labels: CvLabels;
    profile: Profile;
    photoUrl: string;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
}

export function formatPeriod(start: Date, end: Date | null | undefined, data: Pick<CvData, 'lang' | 'labels'>) {
    const fmt = new Intl.DateTimeFormat(data.lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' });
    return `${fmt.format(new Date(start))} – ${end ? fmt.format(new Date(end)) : data.labels.present}`;
}

export function displayUrl(url: string) {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function contactItems(profile: Profile) {
    return [
        profile.location && { key: 'location', text: profile.location },
        profile.email && { key: 'email', text: profile.email, href: `mailto:${profile.email}` },
        profile.phone && { key: 'phone', text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
        profile.website && { key: 'website', text: displayUrl(profile.website), href: profile.website },
        profile.linkedin && { key: 'linkedin', text: displayUrl(profile.linkedin), href: profile.linkedin },
        profile.github && { key: 'github', text: displayUrl(profile.github), href: profile.github },
    ].filter(Boolean) as { key: string; text: string; href?: string }[];
}

/**
 * Print rules for the CV page. Pages have no margin so the colored sidebar
 * bleeds edge to edge; vertical spacing comes from <PrintPageSpacing>.
 */
export const CV_PRINT_CSS = `
@media print {
    @page { size: A4; margin: 0; }
    html, body { background: #ffffff !important; }
    .cv-sheet, .cv-sidebar-print-bg {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    /* Fixed elements repeat on every printed page */
    .cv-sidebar-print-bg { top: 0; bottom: 0; }
}
`;
