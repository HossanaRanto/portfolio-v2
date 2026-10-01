#!/usr/bin/env node
// Generates sitemap.xml and robots.txt at the project root from the Supabase data.
// Usage: npm run seo:generate (also runs as part of `npm run build`; the output files are gitignored).
// Re-run it after adding or removing projects or experiences.
//
// Reads NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and
// NEXT_PUBLIC_APP_URL from the environment, .env.local or .env.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
    DEFAULT_LANGUAGE, LANGUAGES, experienceTranslationKey, localizedPath, projectTranslationKey,
} from "../src/lib/seo-routes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
config({ path: join(ROOT, ".env.local"), quiet: true });
config({ path: join(ROOT, ".env"), quiet: true });

/** Public pages, listed in every language. */
const STATIC_PAGES = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/projects", changefreq: "weekly", priority: 0.9 },
    { path: "/experiences", changefreq: "monthly", priority: 0.9 },
    { path: "/contact", changefreq: "yearly", priority: 0.9 },
    { path: "/about", changefreq: "yearly", priority: 0.7 },
    { path: "/cv", changefreq: "monthly", priority: 0.6 },
];

const DISALLOWED = ["/admin", "/auth", "/login"];

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        console.error(`✖ Missing ${name} (set it in .env or the environment).`);
        process.exit(1);
    }
    return value;
}

const escapeXml = (value) => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * One <url> entry per language version, each listing all versions as
 * hreflang alternates (Google's recommended sitemap format).
 * @param {string} siteUrl
 * @param {string} path
 * @param {Record<string, Record<string, string>>} versions language -> query params
 * @param {{ lastmod: string, changefreq: string, priority: number }} meta
 */
function urlEntries(siteUrl, path, versions, meta) {
    const href = (lang) => `${siteUrl}${localizedPath(path, lang, versions[lang])}`;
    const langs = Object.keys(versions);
    const xDefault = versions[DEFAULT_LANGUAGE] ? DEFAULT_LANGUAGE : langs[0];
    const alternates = [
        ...langs.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href(lang))}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href(xDefault))}"/>`,
    ].join("\n");

    return langs.map(lang => [
        "  <url>",
        `    <loc>${escapeXml(href(lang))}</loc>`,
        `    <lastmod>${meta.lastmod}</lastmod>`,
        `    <changefreq>${meta.changefreq}</changefreq>`,
        `    <priority>${meta.priority.toFixed(1)}</priority>`,
        alternates,
        "  </url>",
    ].join("\n"));
}

/** Groups rows that are translations of each other. */
function groupTranslations(rows, keyOf) {
    const groups = new Map();
    for (const row of rows) {
        const key = keyOf(row);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(row);
    }
    return [...groups.values()];
}

const latest = (dates) => new Date(Math.max(...dates.map(d => new Date(d).getTime()))).toISOString();

async function main() {
    const siteUrl = requireEnv("NEXT_PUBLIC_APP_URL").replace(/\/$/, "");
    const supabase = createClient(
        requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
        requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
        { auth: { persistSession: false } },
    );

    const [projectsRes, experiencesRes] = await Promise.all([
        supabase.from("projects").select("id, slug, language, updated_at").order("created_at", { ascending: false }),
        supabase.from("experiences").select("id, company, start_date, language, created_at").order("start_date", { ascending: false }),
    ]);
    if (projectsRes.error) throw new Error(`projects: ${projectsRes.error.message}`);
    if (experiencesRes.error) throw new Error(`experiences: ${experiencesRes.error.message}`);
    const projects = projectsRes.data;
    const experiences = experiencesRes.data;

    const today = new Date().toISOString();
    const allLanguages = Object.fromEntries(LANGUAGES.map(lang => [lang, {}]));
    const entries = [];

    for (const page of STATIC_PAGES) {
        let lastmod = today;
        if (page.path === "/projects" && projects.length) lastmod = latest(projects.map(p => p.updated_at));
        if (page.path === "/experiences" && experiences.length) lastmod = latest(experiences.map(e => e.created_at));
        entries.push(...urlEntries(siteUrl, page.path, allLanguages, { ...page, lastmod }));
    }

    for (const group of groupTranslations(projects, p => projectTranslationKey(p.slug))) {
        const versions = Object.fromEntries(group.map(p => [p.language, { project: p.id }]));
        entries.push(...urlEntries(siteUrl, "/projects", versions, {
            lastmod: latest(group.map(p => p.updated_at)), changefreq: "monthly", priority: 0.8,
        }));
    }

    for (const group of groupTranslations(experiences, e => experienceTranslationKey(e.company, e.start_date))) {
        const versions = Object.fromEntries(group.map(e => [e.language, { experience: e.id }]));
        entries.push(...urlEntries(siteUrl, "/experiences", versions, {
            lastmod: latest(group.map(e => e.created_at)), changefreq: "yearly", priority: 0.7,
        }));
    }

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        "</urlset>",
        "",
    ].join("\n");

    const robots = [
        "User-agent: *",
        "Allow: /",
        ...DISALLOWED.map(path => `Disallow: ${path}`),
        "",
        `Sitemap: ${siteUrl}/sitemap.xml`,
        "",
    ].join("\n");

    await writeFile(join(ROOT, "sitemap.xml"), sitemap);
    await writeFile(join(ROOT, "robots.txt"), robots);

    console.log(`✓ sitemap.xml — ${entries.length} URLs (${projects.length} projects, ${experiences.length} experiences, ${LANGUAGES.join("/")})`);
    console.log(`✓ robots.txt — sitemap at ${siteUrl}/sitemap.xml`);
}

main().catch((error) => {
    console.error(`✖ SEO generation failed: ${error.message}`);
    process.exit(1);
});
