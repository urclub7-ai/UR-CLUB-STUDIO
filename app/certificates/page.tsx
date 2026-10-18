import prisma from "@/lib/prisma";
import CertificatesContentClient from "@/components/public/CertificatesContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certificates & Accreditations",
  description: "Official professional accreditations, web architecture qualifications, and technical certifications of Mohammad Nazif Yosufi.",
};

export default async function CertificatesPage() {
  let certificates: any[] = [];
  try {
    certificates = await prisma.certificate.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("CertificatesPage fallback active:", e);
  }

  return (
    <CertificatesContentClient certificates={certificates} />
  );
}
