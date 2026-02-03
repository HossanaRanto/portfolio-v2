import { ServiceForm } from "@/presentation/components/domain/ServiceForm";
import { getServiceByIdAction } from "@/application/use-cases/service.actions";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage(props: PageProps) {
  const params = await props.params;
  const service = await getServiceByIdAction(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Service</h1>
      </div>
      <ServiceForm service={service} />
    </div>
  );
}