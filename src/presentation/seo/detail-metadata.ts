import type { Metadata } from "next";
import { Project } from "@/domain/entities/Project";
import { Experience } from "@/domain/entities/Experience";
import { getProjectByIdAction, getProjectsAction } from "@/application/use-cases/project.actions";
import { getExperienceByIdAction, getExperiencesAction } from "@/application/use-cases/experience.actions";
import { toPlainText } from "@/lib/rich-text";
import { mergeTags } from "@/lib/tags";
import {
    buildAlternates, experienceTranslationKey, localizedPath, OG_LOCALES, projectTranslationKey, SITE_NAME, SITE_URL,
} from "@/lib/seo";

type Versions = Record<string, Record<string, string>>;

function excerpt(text: string, max = 160) {
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** A project plus the ids of its translations, keyed by language. */
export async function findProjectWithTranslations(id: string) {
    const project = await getProjectByIdAction(id);
    if (!project) return null;
    const key = projectTranslationKey(project.slug);
    const versions: Versions = {};
    for (const p of await getProjectsAction()) {
        if (projectTranslationKey(p.slug) === key) versions[p.language] = { project: p.id };
    }
    versions[project.language] = { project: project.id };
    return { project, versions };
}

export async function findExperienceWithTranslations(id: string) {
    const experience = await getExperienceByIdAction(id);
    if (!experience) return null;
    const key = experienceTranslationKey(experience.company, experience.startDate);
    const versions: Versions = {};
    for (const e of await getExperiencesAction()) {
        if (experienceTranslationKey(e.company, e.startDate) === key) versions[e.language] = { experience: e.id };
    }
    versions[experience.language] = { experience: experience.id };
    return { experience, versions };
}

export function projectMetadata(project: Project, versions: Versions): Metadata {
    const description = excerpt(toPlainText(project.description));
    const url = localizedPath("/projects", project.language, { project: project.id });
    return {
        title: project.title,
        description,
        keywords: mergeTags(project.technologies, project.tags),
        alternates: buildAlternates("/projects", project.language, versions),
        openGraph: {
            type: "article",
            url,
            title: project.title,
            description,
            locale: OG_LOCALES[project.language],
            siteName: SITE_NAME,
            images: project.coverImage ? [project.coverImage] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description,
            images: project.coverImage ? [project.coverImage] : undefined,
        },
    };
}

export function experienceMetadata(experience: Experience, versions: Versions): Metadata {
    const title = `${experience.role} — ${experience.company}`;
    const description = excerpt(experience.description.join(" ") || title);
    return {
        title,
        description,
        keywords: mergeTags(experience.technologies, experience.tags),
        alternates: buildAlternates("/experiences", experience.language, versions),
        openGraph: {
            type: "article",
            url: localizedPath("/experiences", experience.language, { experience: experience.id }),
            title,
            description,
            locale: OG_LOCALES[experience.language],
            siteName: SITE_NAME,
        },
    };
}

export function projectJsonLd(project: Project) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: toPlainText(project.description),
        url: `${SITE_URL}${localizedPath("/projects", project.language, { project: project.id })}`,
        image: project.coverImage || undefined,
        inLanguage: project.language,
        keywords: mergeTags(project.technologies, project.tags).join(", "),
        dateCreated: project.createdAt.toISOString(),
        dateModified: project.updatedAt.toISOString(),
        author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    };
}

export function experienceJsonLd(experience: Experience) {
    // schema.org Role pattern: Person.worksFor -> EmployeeRole -> Organization
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_URL,
        worksFor: {
            "@type": "EmployeeRole",
            roleName: experience.role,
            startDate: experience.startDate.toISOString().slice(0, 10),
            endDate: experience.endDate ? experience.endDate.toISOString().slice(0, 10) : undefined,
            description: experience.description.join(" "),
            worksFor: { "@type": "Organization", name: experience.company, url: experience.companyUrl || undefined },
        },
    };
}
