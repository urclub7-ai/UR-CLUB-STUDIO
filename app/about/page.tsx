import prisma from "@/lib/prisma";
import AboutContentClient from "@/components/public/AboutContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Me",
  description: "Personal background, design approach, skills and technical capabilities of Mohammad Nazif Yosufi.",
};

export default async function AboutPage() {
  const about = await prisma.aboutContent.findUnique({
    where: { id: "default-about" },
  });

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default-settings" },
  });

  const skills = await prisma.skill.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

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
