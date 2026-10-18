import prisma from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="pb-8 border-b border-zinc-800">
        <span className="mono-tag text-xs text-zinc-400 block mb-1">Career & Roles</span>
        <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Experience Timeline Manager</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage career milestones, employment dates, responsibilities, and studio credits.
        </p>
      </div>

      <ExperienceClient initialExperiences={experiences} />
    </div>
  );
}

