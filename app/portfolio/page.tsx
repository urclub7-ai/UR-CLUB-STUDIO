import prisma from "@/lib/prisma";
import PortfolioContentClient from "@/components/public/PortfolioContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio & Selected Works",
  description: "Browse comprehensive brand identity systems, typography, web development, and interactive interfaces by Mohammad Nazif Yosufi.",
};

export default async function PortfolioPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("PortfolioPage fallback active:", e);
  }

  const categorySet = new Set<string>(["All"]);
  projects.forEach((p) => {
    if (p.category) categorySet.add(p.category);
  });
  const categories = Array.from(categorySet);

  return (
    <PortfolioContentClient
      projects={projects}
      categories={categories}
    />
  );
}
