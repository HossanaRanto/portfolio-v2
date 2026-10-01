import { SkillForm } from "@/presentation/components/domain/SkillForm";
import { getSkillByIdAction } from "@/application/use-cases/skill.actions";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage(props: PageProps) {
  const params = await props.params;
  const skill = await getSkillByIdAction(params.id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Skill</h1>
      </div>
      <SkillForm skill={skill} />
    </div>
  );
}
