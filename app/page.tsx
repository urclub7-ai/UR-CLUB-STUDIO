import prisma from "@/lib/prisma";
import HomeContentClient from "@/components/public/HomeContentClient";
import {
  defaultHomeContent,
  defaultAboutContent,
  defaultShowcaseWebsites,
  defaultBrandAssets,
} from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let homeContent = defaultHomeContent;
  let aboutContent = defaultAboutContent;
  let projects: any[] = [];
  let experiences: any[] = [];
  let services: any[] = [];
  let certificates: any[] = [];
  let showcaseWebsites = defaultShowcaseWebsites;
  let brandAssets = defaultBrandAssets;

  try {
    const [
      dbHome,
      dbAbout,
      dbProjects,
      dbExperiences,
      dbServices,
      dbCertificates,
      dbShowcaseWebsites,
      dbBrandAssets,
    ] = await Promise.all([
      prisma.homeContent.findUnique({ where: { id: "default-home" } }),
      prisma.aboutContent.findUnique({ where: { id: "default-about" } }),
      prisma.project.findMany({
        where: { published: true },
        orderBy: { displayOrder: "asc" },
        take: 4,
      }),
      prisma.experience.findMany({
        where: { published: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.service.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.certificate.findMany({
        where: { published: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.showcaseWebsite.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.brandAsset.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);

    if (dbHome) homeContent = dbHome;
    if (dbAbout) aboutContent = dbAbout;
    if (dbProjects && dbProjects.length > 0) projects = dbProjects;
    if (dbExperiences && dbExperiences.length > 0) experiences = dbExperiences;
    if (dbServices && dbServices.length > 0) services = dbServices;
    if (dbCertificates && dbCertificates.length > 0) certificates = dbCertificates;
    if (dbShowcaseWebsites && dbShowcaseWebsites.length > 0) showcaseWebsites = dbShowcaseWebsites;
    if (dbBrandAssets && dbBrandAssets.length > 0) brandAssets = dbBrandAssets;
  } catch (error) {
    console.warn("HomePage fallback active (database connecting/offline):", error);
  }

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
