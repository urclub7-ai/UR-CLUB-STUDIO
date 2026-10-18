import prisma from "@/lib/prisma";
import PortfolioContentClient from "@/components/public/PortfolioContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio & Selected Works",
  description: "Browse comprehensive brand identity systems, typography, web development, and interactive interfaces by Mohammad Nazif Yosufi.",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

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
