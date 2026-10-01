import type { Metadata } from "next";
import { localizedPath, LANGUAGES, DEFAULT_LANGUAGE } from "./seo-routes.mjs";

export { localizedPath, normalizeLanguage, projectTranslationKey, experienceTranslationKey, LANGUAGES, DEFAULT_LANGUAGE } from "./seo-routes.mjs";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://ranto.mahefaniaina.com").replace(/\/$/, "");
export const SITE_NAME = "Ranto Mahefaniaina";

export const OG_LOCALES: Record<string, string> = { en: "en_US", fr: "fr_FR" };

/**
 * Canonical + hreflang alternates for a page.
 * `versions` maps each available language to that version's params
 * (e.g. the id of the translated project); omit a language that doesn't exist.
 */
export function buildAlternates(
    path: string,
    lang: string,
    versions: Partial<Record<string, Record<string, string>>> = Object.fromEntries(LANGUAGES.map(l => [l, {}])),
): Metadata["alternates"] {
    const languages: Record<string, string> = {};
    for (const [l, params] of Object.entries(versions)) {
        if (params) languages[l] = localizedPath(path, l, params);
    }
    const fallback = languages[DEFAULT_LANGUAGE] ?? Object.values(languages)[0];
    if (fallback) languages["x-default"] = fallback;

    return {
        canonical: localizedPath(path, lang, versions[lang] ?? {}),
        languages,
    };
}
