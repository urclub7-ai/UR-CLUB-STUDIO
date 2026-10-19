import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.urclubstudio.com").replace(
    "https://urclubstudio.com",
    "https://www.urclubstudio.com"
  );

  const staticPages = [
    "",
    "/order",
    "/about",
    "/portfolio",
    "/certificates",
    "/experience",
    "/services",
    "/contact",
    "/privacy",
    "/terms",
    "/policies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/privacy") || route.startsWith("/terms") || route.startsWith("/policies") ? 0.5 : 0.8,
  }));

  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    projectPages = projects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn("Could not query projects for sitemap at build time (database might be offline):", error);
  }

  return [...staticPages, ...projectPages];
}
