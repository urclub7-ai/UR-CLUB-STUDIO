import prisma from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="pb-8 border-b border-zinc-800">
        <span className="mono-tag text-xs text-zinc-400 block mb-1">Commercial Offerings</span>
        <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Services Manager</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Create and manage design commission packages, pricing tiers, turnaround times, and inclusions.
        </p>
      </div>

      <ServicesClient initialServices={services} />
    </div>
  );
}

