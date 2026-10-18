import prisma from "@/lib/prisma";
import AboutContentClient from "@/components/public/AboutContentClient";
import { defaultAboutContent, defaultSiteSettings } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Me",
  description: "Personal background, design approach, skills and technical capabilities of Mohammad Nazif Yosufi.",
};

export default async function AboutPage() {
  let about = defaultAboutContent;
  let settings = defaultSiteSettings;
  let skills: any[] = [];

  try {
    const [dbAbout, dbSettings, dbSkills] = await Promise.all([
      prisma.aboutContent.findUnique({ where: { id: "default-about" } }),
      prisma.siteSettings.findUnique({ where: { id: "default-settings" } }),
      prisma.skill.findMany({
        where: { active: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);

    if (dbAbout) about = dbAbout;
    if (dbSettings) settings = dbSettings;
    if (dbSkills) skills = dbSkills;
  } catch (e) {
    console.warn("AboutPage fallback active:", e);
  }

  const designSkills = skills.filter((s) => s.category === "DESIGN");
  const webSkills = skills.filter((s) => s.category === "WEB");
  const techSkills = skills.filter((s) => s.category === "TECHNOLOGY");
  const aiSkills = skills.filter((s) => s.category === "AI & MODERN TECHNOLOGY");

  return (
    <AboutContentClient
      about={about}
      settings={settings}
      designSkills={designSkills}
      webSkills={webSkills}
      techSkills={techSkills}
      aiSkills={aiSkills}
    />
  );
}
