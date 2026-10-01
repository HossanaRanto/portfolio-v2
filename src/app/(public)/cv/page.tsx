import { Metadata } from "next";
import { getProfileAction, getProfilePhotoAction } from "@/application/use-cases/profile.actions";
import { getExperiencesAction } from "@/application/use-cases/experience.actions";
import { getSkillsAction } from "@/application/use-cases/skill.actions";
import { getProjectsAction } from "@/application/use-cases/project.actions";
import { CV_LABELS, CV_PRINT_CSS, CV_THEMES, CvStyle, DEFAULT_THEME } from "@/presentation/components/cv/cv-config";
import { CvToolbar } from "@/presentation/components/cv/CvToolbar";
import { CvColorful } from "@/presentation/components/cv/CvColorful";
import { CvSimple } from "@/presentation/components/cv/CvSimple";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const lang = (params.lang as string) || 'en';

  return {
    title: "CV",
    description: lang === 'fr'
      ? "Curriculum vitae de Ranto Mahefaniaina, Développeur Full Stack."
      : "Resume of Ranto Mahefaniaina, Full Stack Developer.",
    alternates: {
      canonical: '/cv',
      languages: {
        'en': '/cv?lang=en',
        'fr': '/cv?lang=fr',
      },
    },
  };
}

export default async function CvPage(props: Props) {
  const searchParams = await props.searchParams;
  const lang = searchParams.lang === 'fr' ? 'fr' : 'en';
  const style: CvStyle = searchParams.style === 'simple' ? 'simple' : 'colorful';
  const themeKey = (searchParams.theme as string) in CV_THEMES ? (searchParams.theme as string) : DEFAULT_THEME;
  const labels = CV_LABELS[lang];

  const [profile, photoUrl, experiences, skills, projects] = await Promise.all([
    getProfileAction(lang),
    getProfilePhotoAction(),
    getExperiencesAction(lang),
    getSkillsAction(),
    getProjectsAction(lang),
  ]);

  return (
    <div className="min-h-screen px-4 pt-28 pb-20 print:p-0">
      <style>{CV_PRINT_CSS}</style>
      <div className="max-w-[210mm] mx-auto">
        <CvToolbar style={style} theme={themeKey} labels={labels} />

        {!profile ? (
          <p className="text-center text-zinc-500 py-24">{labels.empty}</p>
        ) : style === 'simple' ? (
          <CvSimple data={{ lang, labels, profile, photoUrl, experiences, skills, projects }} />
        ) : (
          <CvColorful data={{ lang, labels, profile, photoUrl, experiences, skills, projects }} theme={CV_THEMES[themeKey]} />
        )}
      </div>
    </div>
  );
}
