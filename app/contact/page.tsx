import prisma from "@/lib/prisma";
import ContactContentClient from "@/components/public/ContactContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Collaboration Inquiries",
  description: "Initiate a web design, frontend development, or creative technology project with Mohammad Nazif Yosufi.",
};

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default-settings" },
  });

  return (
    <ContactContentClient settings={settings} />
  );
}
