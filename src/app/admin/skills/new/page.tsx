import { SkillForm } from "@/presentation/components/domain/SkillForm";

export default function NewSkillPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Skill</h1>
      </div>
      <SkillForm />
    </div>
  );
}
