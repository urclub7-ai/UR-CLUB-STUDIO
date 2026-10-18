import prisma from "@/lib/prisma";
import WebsitesClient from "./WebsitesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدیریت کادر آنلاین وب‌سایت‌ها | UR CLUB Admin",
};

export default async function AdminWebsitesPage() {
  const websites = await prisma.showcaseWebsite.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <WebsitesClient initialWebsites={websites} />;
}
