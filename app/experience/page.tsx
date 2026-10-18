import prisma from "@/lib/prisma";
import ExperienceContentClient from "@/components/public/ExperienceContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Experience & Independent Projects",
  description: "Career milestones, practical web projects, and independent design practice of Mohammad Nazif Yosufi.",
};

export default async function ExperiencePage() {
  let experiences: any[] = [];
  try {
    experiences = await prisma.experience.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("ExperiencePage fallback active:", e);
  }

  return (
    <ExperienceContentClient experiences={experiences} />
  );
}
