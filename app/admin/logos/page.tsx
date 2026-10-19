import { getBrandAssets } from "@/lib/actions/brand-asset-actions";
import LogosClient from "./LogosClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدیریت لوگوها و پوسترها | UR CLUB Admin",
};

export default async function AdminLogosPage() {
  const assets = await getBrandAssets();
  return <LogosClient initialAssets={assets} />;
}
