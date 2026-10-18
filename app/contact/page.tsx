import prisma from "@/lib/prisma";
import ContactContentClient from "@/components/public/ContactContentClient";
import { defaultSiteSettings } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Collaboration Inquiries",
  description: "Initiate a web design, frontend development, or creative technology project with Mohammad Nazif Yosufi.",
};

export default async function ContactPage() {
  let settings = defaultSiteSettings;
  try {
    const dbSettings = await prisma.siteSettings.findUnique({
      where: { id: "default-settings" },
    });
    if (dbSettings) settings = dbSettings;
  } catch (e) {
    console.warn("ContactPage fallback active:", e);
  }

  return (
    <ContactContentClient settings={settings} />
  );
}
