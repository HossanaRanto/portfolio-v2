// Shared by the app (src/lib/seo.ts) and scripts/generate-seo.mjs, so page
// metadata and the generated sitemap always agree on URLs.

export const LANGUAGES = ["en", "fr"];
export const DEFAULT_LANGUAGE = "en";

/** @param {string | null | undefined} lang */
export function normalizeLanguage(lang) {
    return LANGUAGES.includes(lang ?? "") ? /** @type {string} */ (lang) : DEFAULT_LANGUAGE;
}

/**
 * Canonical URL path of a page in a language. The default language has no
 * `lang` parameter, so `/projects` and `/projects?lang=en` aren't duplicates.
 * @param {string} path
 * @param {string} lang
 * @param {Record<string, string>} [params]
 */
export function localizedPath(path, lang, params = {}) {
    const search = new URLSearchParams(params);
    if (lang !== DEFAULT_LANGUAGE) search.set("lang", lang);
    const query = search.toString();
    return query ? `${path}?${query}` : path;
}

/** Projects created with "Duplicate" share a slug base: `arqon`, `arqon-fr`. */
/** @param {string} slug */
export function projectTranslationKey(slug) {
    return slug.replace(/-(en|fr)$/, "");
}

/** Experience translations share the same company and start date. */
/** @param {string} company @param {string | Date} startDate */
export function experienceTranslationKey(company, startDate) {
    const day = new Date(startDate).toISOString().slice(0, 10);
    return `${company.trim().toLowerCase()}|${day}`;
}
