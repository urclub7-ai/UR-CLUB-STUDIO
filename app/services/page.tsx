import prisma from "@/lib/prisma";
import ServicesContentClient from "@/components/public/ServicesContentClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Design Packages",
  description: "Comprehensive web design, frontend development, and digital craft services by Mohammad Nazif Yosufi.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <ServicesContentClient services={services} />
  );
}
