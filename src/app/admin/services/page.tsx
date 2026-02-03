import Link from "next/link";
import { Plus, Pencil, Trash2, Globe, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { getServicesAction, deleteServiceAction } from "@/application/use-cases/service.actions";
import { revalidatePath } from "next/cache";

export default async function AdminServicesPage() {
  const services = await getServicesAction();

  async function deleteService(id: string) {
    "use server"
    await deleteServiceAction(id);
    revalidatePath('/admin/services');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link 
          href="/admin/services/new" 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Service</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          // Cast the string to keyof typeof Icons to avoid 'any'
          const IconComponent = (Icons[service.icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;
          return (
          <div key={service.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                        <span className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                            <IconComponent size={24} />
                        </span>
                        <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                    <Globe size={12} />
                    {service.language}
                  </span>
              </div>
              
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Link 
                href={`/admin/services/${service.id}/edit`}
                className="p-2 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors"
              >
                <Pencil size={18} />
              </Link>
              <form action={deleteService.bind(null, service.id)}>
                <button 
                  type="submit"
                  className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          </div>
        )})}

        {services.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
            <p>No services found. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}