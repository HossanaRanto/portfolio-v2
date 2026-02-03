import { ServiceForm } from "@/presentation/components/domain/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Service</h1>
      </div>
      <ServiceForm />
    </div>
  );
}