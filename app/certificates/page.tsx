import prisma from "@/lib/prisma";
import CertificatesContentClient from "@/components/public/CertificatesContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certificates & Accreditations",
  description: "Official professional accreditations, web architecture qualifications, and technical certifications of Mohammad Nazif Yosufi.",
};

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <CertificatesContentClient certificates={certificates} />
  );
}
