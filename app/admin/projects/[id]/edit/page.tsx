import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: PageProps) {
  let project: any = null;
  try {
    project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });
  } catch (e) {
    console.warn("Project edit DB error:", e);
  }

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
