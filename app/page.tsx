import prisma from "@/lib/prisma";
import HomeContentClient from "@/components/public/HomeContentClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homeContent = await prisma.homeContent.findUnique({
    where: { id: "default-home" },
  });

  const aboutContent = await prisma.aboutContent.findUnique({
    where: { id: "default-about" },
  });

  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
    take: 4,
  });

  const experiences = await prisma.experience.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

  const certificates = await prisma.certificate.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

  const showcaseWebsites = await prisma.showcaseWebsite.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

  const brandAssets = await prisma.brandAsset.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <HomeContentClient
      homeContent={homeContent}
      aboutContent={aboutContent}
      projects={projects}
      certificates={certificates}
      experiences={experiences}
      services={services}
      showcaseWebsites={showcaseWebsites}
      brandAssets={brandAssets}
    />
  );
}
