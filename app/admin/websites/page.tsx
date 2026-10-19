import { getShowcaseWebsites } from "@/lib/actions/showcase-website-actions";
import WebsitesClient from "./WebsitesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدیریت کادر آنلاین وب‌سایت‌ها | UR CLUB Admin",
};

export default async function AdminWebsitesPage() {
  const websites = await getShowcaseWebsites();
  return <WebsitesClient initialWebsites={websites} />;
}
