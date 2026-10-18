import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProjectDetailClient from "@/components/public/ProjectDetailClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Mohammad Nazif Yosufi`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      images: {
        orderBy: { displayOrder: "asc" },
      },
    },
  });

  if (!project || !project.published) {
    notFound();
  }

  const allProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
    select: { slug: true, title: true },
  });

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
