import { Metadata } from "next";
import { FeaturedProjects } from "@/presentation/components/domain/FeaturedProjects";
import { ProjectDialog } from "@/presentation/components/domain/ProjectDialog";
import { findProjectWithTranslations, projectJsonLd, projectMetadata } from "@/presentation/seo/detail-metadata";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildAlternates, localizedPath, normalizeLanguage, OG_LOCALES } from "@/lib/seo";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const COPY = {
  en: { title: "Projects", description: "Web and mobile projects by Ranto Mahefaniaina, Full Stack Developer: Next.js, React, NestJS, Django, Flutter and more." },
  fr: { title: "Projets", description: "Projets web et mobiles de Ranto Mahefaniaina, Développeur Full Stack : Next.js, React, NestJS, Django, Flutter et plus." },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const lang = normalizeLanguage(params.lang as string);

  const found = typeof params.project === "string" ? await findProjectWithTranslations(params.project) : null;
  if (found) return projectMetadata(found.project, found.versions);

  return {
    title: COPY[lang as "en" | "fr"].title,
    description: COPY[lang as "en" | "fr"].description,
    alternates: buildAlternates("/projects", lang),
    openGraph: { url: localizedPath("/projects", lang), locale: OG_LOCALES[lang] },
  };
}

export default async function ProjectsPage(props: Props) {
  const params = await props.searchParams;
  const lang = normalizeLanguage(params.lang as string);
  const found = typeof params.project === "string" ? await findProjectWithTranslations(params.project) : null;

  return (
    <div className="pt-16">
      <FeaturedProjects lang={lang} basePath="/projects" asPageHeading />
      <ProjectDialog project={found?.project ?? null} closeHref={localizedPath("/projects", lang)} />
      {found && <JsonLd data={projectJsonLd(found.project)} />}
    </div>
  );
}
