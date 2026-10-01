import { Metadata } from "next";
import { getExperiencesAction } from "@/application/use-cases/experience.actions";
import { ExperienceTimeline } from "@/presentation/components/domain/ExperienceTimeline";
import { ExperienceDialog } from "@/presentation/components/domain/ExperienceDialog";
import { experienceJsonLd, experienceMetadata, findExperienceWithTranslations } from "@/presentation/seo/detail-metadata";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { buildAlternates, localizedPath, normalizeLanguage, OG_LOCALES } from "@/lib/seo";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const COPY = {
  en: { title: "Work Experience", description: "Professional journey of Ranto Mahefaniaina, Full Stack Developer: roles, companies and technologies." },
  fr: { title: "Expérience Professionnelle", description: "Parcours professionnel de Ranto Mahefaniaina, Développeur Full Stack : postes, entreprises et technologies." },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const lang = normalizeLanguage(params.lang as string);

  const found = typeof params.experience === "string" ? await findExperienceWithTranslations(params.experience) : null;
  if (found) return experienceMetadata(found.experience, found.versions);

  return {
    title: COPY[lang as "en" | "fr"].title,
    description: COPY[lang as "en" | "fr"].description,
    alternates: buildAlternates("/experiences", lang),
    openGraph: { url: localizedPath("/experiences", lang), locale: OG_LOCALES[lang] },
  };
}

export default async function ExperiencesPage(props: Props) {
  const params = await props.searchParams;
  const lang = normalizeLanguage(params.lang as string);
  const [experiences, found] = await Promise.all([
    getExperiencesAction(lang),
    typeof params.experience === "string" ? findExperienceWithTranslations(params.experience) : null,
  ]);

  return (
    <div className="pt-16">
      <h1 className="sr-only">{COPY[lang as "en" | "fr"].title}</h1>
      <ExperienceTimeline experiences={experiences} basePath="/experiences" />
      <ExperienceDialog experience={found?.experience ?? null} closeHref={localizedPath("/experiences", lang)} />
      {found && <JsonLd data={experienceJsonLd(found.experience)} />}
    </div>
  );
}
