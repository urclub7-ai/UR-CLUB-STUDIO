import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, ExternalLink, Star, Eye, EyeOff } from "lucide-react";
import prisma from "@/lib/prisma";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectsListClient from "./ProjectsListClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      images: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800">
        <div>
          <span className="mono-tag text-xs text-zinc-400 block mb-1">Portfolio Archive</span>
          <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Projects Manager</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create, edit, publish, or rearrange portfolio case studies.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Client List with Search, Reordering, and Action Controls */}
      <ProjectsListClient initialProjects={projects} />
    </div>
  );
}

