import prisma from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  let certificates: any[] = [];
  try {
    certificates = await prisma.certificate.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("Certificates DB offline fallback:", e);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="pb-8 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <span className="mono-tag text-xs text-zinc-400 block mb-1">Accreditations</span>
          <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Certificates Manager</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your verified professional certificates, typography masteries, and PDF assets.
          </p>
        </div>
      </div>

      <CertificatesClient initialCertificates={certificates} />
    </div>
  );
}
