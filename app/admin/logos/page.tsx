import prisma from "@/lib/prisma";
import LogosClient from "./LogosClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدیریت لوگوها و پوسترها | UR CLUB Admin",
};

export default async function AdminLogosPage() {
  const assets = await prisma.brandAsset.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <LogosClient initialAssets={assets} />;
}
