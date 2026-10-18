"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
  Search,
  ArrowUpDown,
  Check,
  Globe,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import {
  deleteProject,
  toggleProjectPublished,
  toggleProjectFeatured,
} from "@/lib/actions/project-actions";
import { EDITORIAL_EASE } from "@/lib/motion";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  client?: string | null;
  projectYear?: string;
  thumbnail: string;
  projectUrl?: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export default function ProjectsListClient({
  initialProjects,
}: {
  initialProjects: ProjectItem[];
}) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleTogglePublished = async (id: string, current: boolean) => {
    const next = !current;
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: next } : p))
    );
    await toggleProjectPublished(id, next);
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const next = !current;
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: next } : p))
    );
    await toggleProjectFeatured(id, next);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteProject(deleteId);
    setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, client, slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((c) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`mono-tag text-[10px] px-3 py-1.5 rounded-full border transition-colors ${
                selectedCategory === c
                  ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-semibold shadow-sm"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Table / Cards List */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
        {filtered.length > 0 ? (
          <div className="divide-y divide-zinc-900">
            <AnimatePresence>
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25), ease: EDITORIAL_EASE }}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/30 transition-colors"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 group flex items-center justify-center">
                      {project.thumbnail && project.thumbnail.trim().length > 0 ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : project.projectUrl ? (
                        <div className="flex flex-col items-center justify-center text-[#00C3FF] gap-0.5">
                          <Globe className="w-4 h-4" />
                          <span className="text-[8px] font-mono font-semibold text-zinc-400">LIVE</span>
                        </div>
                      ) : (
                        <div className="text-zinc-600 text-[10px] font-mono">No Cover</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="mono-tag text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {project.projectYear}
                        </span>
                        {project.featured && <StatusBadge status="FEATURED" />}
                        <StatusBadge status={project.published ? "PUBLISHED" : "DRAFT"} />
                      </div>
                      <h3 className="text-sm font-medium text-zinc-100 truncate">
                        {project.title}
                      </h3>
                      <span className="mono-tag text-[10px] text-zinc-400 truncate block">
                        /{project.slug} {project.client ? `• ${project.client}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:self-center self-end flex-shrink-0">
                    {/* Featured Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      title={project.featured ? "Unmark featured" : "Mark as featured"}
                      className={`p-2 rounded-lg border transition-colors ${
                        project.featured
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </motion.button>

                    {/* Published Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTogglePublished(project.id, project.published)}
                      title={project.published ? "Unpublish (Hide)" : "Publish (Show)"}
                      className={`p-2 rounded-lg border transition-colors ${
                        project.published
                          ? "bg-[#00C3FF]/15 text-[#00C3FF] border-[#00C3FF]/40 shadow-[0_0_8px_rgba(0, 195, 255,0.2)]"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                      }`}
                    >
                      {project.published ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </motion.button>

                    {/* View Public */}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        target="_blank"
                        title="View public page"
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center justify-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>

                    {/* Edit */}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-850 transition-colors flex items-center justify-center"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>

                    {/* Delete */}
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#f87171" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setDeleteId(project.id)}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-zinc-500">
            No projects matched the search criteria.
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Project Case Study"
        description="This will permanently delete this project and all attached gallery images from the PostgreSQL database."
      />
    </div>
  );
}

