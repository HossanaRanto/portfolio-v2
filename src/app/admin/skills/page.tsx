import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSkillsAction, deleteSkillAction } from "@/application/use-cases/skill.actions";
import { revalidatePath } from "next/cache";

export default async function AdminSkillsPage() {
  const skills = await getSkillsAction();

  async function deleteSkill(id: string) {
    "use server"
    await deleteSkillAction(id);
    revalidatePath('/admin/skills');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Skill</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${skill.color}1a` }}>
              {skill.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={skill.logo} alt={skill.name} className="w-9 h-9 object-contain" />
              ) : (
                <span className="text-xl font-black" style={{ color: skill.color }}>{skill.name.charAt(0)}</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{skill.name}</h3>
              <span className="text-xs text-zinc-500">{skill.category} · #{skill.sortOrder}</span>
            </div>
            <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 w-full justify-center">
              <Link
                href={`/admin/skills/${skill.id}/edit`}
                className="p-2 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors"
              >
                <Pencil size={16} />
              </Link>
              <form action={deleteSkill.bind(null, skill.id)}>
                <button
                  type="submit"
                  className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
            <p>No skills yet. Create one from the logo library to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
