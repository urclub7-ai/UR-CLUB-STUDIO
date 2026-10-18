"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // safely ignored outside request context
  }
}

import { slugify } from "@/lib/utils";

function cleanUrl(url?: string | null): string {
  if (!url || !url.trim()) return "";
  let trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed) && trimmed.length > 0) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

function cleanSlug(title: string, slug?: string | null): string {
  let s = slug?.trim() ? slugify(slug) : slugify(title);
  if (!s || s.length === 0) {
    s = `project-${Date.now()}`;
  }
  return s;
}
export async function createProject(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const raw = typeof data === "object" && data !== null ? (data as Record<string, any>) : {};
    const cleanedProjectUrl = cleanUrl(raw.projectUrl);
    const preprocessed = {
      ...raw,
      slug: cleanSlug(raw.title || "", raw.slug),
      projectUrl: cleanedProjectUrl,
      behanceUrl: cleanUrl(raw.behanceUrl),
      thumbnail: raw.thumbnail?.trim() || "",
      shortDescription: raw.shortDescription?.trim() || raw.fullDescription?.slice(0, 160) || "Case study project",
      fullDescription: raw.fullDescription?.trim() || raw.shortDescription?.trim() || "Detailed case study and project description.",
    };

    const parsed = projectSchema.safeParse(preprocessed);
    if (!parsed.success) {
      const rawErrors = parsed.error.flatten().fieldErrors;
      const fieldErrors: Record<string, string[]> = {};
      for (const [key, val] of Object.entries(rawErrors)) {
        if (val && val.length > 0) {
          fieldErrors[key] = val;
        }
      }
      const errorKeys = Object.keys(fieldErrors);
      const firstError = errorKeys.length > 0 && fieldErrors[errorKeys[0]]?.[0] ? fieldErrors[errorKeys[0]][0] : null;

      return {
        success: false,
        message: firstError || "Validation failed. Please review the project details.",
        errors: fieldErrors,
      };
    }

    const { images, ...projectData } = parsed.data;

    let finalSlug = projectData.slug || `project-${Date.now()}`;
    const existing = await prisma.project.findUnique({
      where: { slug: finalSlug },
    });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await prisma.project.create({
      data: {
        ...projectData,
        slug: finalSlug,
        images: {
          create: images.map((img, index) => ({
            imageUrl: img.imageUrl,
            altText: img.altText || projectData.title,
            caption: img.caption || null,
            displayOrder: img.displayOrder ?? index,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate(`/portfolio/${project.slug}`);
    safeRevalidate("/admin/projects");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return { success: false, message };
  }
}

export async function updateProject(id: string, data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const raw = typeof data === "object" && data !== null ? (data as Record<string, any>) : {};
    const cleanedProjectUrl = cleanUrl(raw.projectUrl);
    const preprocessed = {
      ...raw,
      slug: cleanSlug(raw.title || "", raw.slug),
      projectUrl: cleanedProjectUrl,
      behanceUrl: cleanUrl(raw.behanceUrl),
      thumbnail: raw.thumbnail?.trim() || "",
      shortDescription: raw.shortDescription?.trim() || raw.fullDescription?.slice(0, 160) || "Case study project",
      fullDescription: raw.fullDescription?.trim() || raw.shortDescription?.trim() || "Detailed case study and project description.",
    };

    const parsed = projectSchema.safeParse(preprocessed);
    if (!parsed.success) {
      const rawErrors = parsed.error.flatten().fieldErrors;
      const fieldErrors: Record<string, string[]> = {};
      for (const [key, val] of Object.entries(rawErrors)) {
        if (val && val.length > 0) {
          fieldErrors[key] = val;
        }
      }
      const errorKeys = Object.keys(fieldErrors);
      const firstError = errorKeys.length > 0 && fieldErrors[errorKeys[0]]?.[0] ? fieldErrors[errorKeys[0]][0] : null;

      return {
        success: false,
        message: firstError || "Validation failed",
        errors: fieldErrors,
      };
    }

    const { images, ...projectData } = parsed.data;
    let finalSlug = projectData.slug || `project-${Date.now()}`;

    const existingSlug = await prisma.project.findFirst({
      where: {
        slug: finalSlug,
        NOT: { id },
      },
    });
    if (existingSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    await prisma.projectImage.deleteMany({
      where: { projectId: id },
    });

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        slug: finalSlug,
        images: {
          create: images.map((img, index) => ({
            imageUrl: img.imageUrl,
            altText: img.altText || projectData.title,
            caption: img.caption || null,
            displayOrder: img.displayOrder ?? index,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate(`/portfolio/${project.slug}`);
    safeRevalidate("/admin/projects");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: "Project updated successfully",
      data: project,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    return { success: false, message };
  }
}

export async function deleteProject(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const project = await prisma.project.delete({
      where: { id },
    });

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate(`/portfolio/${project.slug}`);
    safeRevalidate("/admin/projects");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: `Project "${project.title}" deleted successfully`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    return { success: false, message };
  }
}

export async function toggleProjectPublished(id: string, published: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const project = await prisma.project.update({
      where: { id },
      data: { published },
    });

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate(`/portfolio/${project.slug}`);
    safeRevalidate("/admin/projects");

    return {
      success: true,
      message: `Project ${published ? "published" : "unpublished"}`,
      data: project,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle status";
    return { success: false, message };
  }
}

export async function toggleProjectFeatured(id: string, featured: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const project = await prisma.project.update({
      where: { id },
      data: { featured },
    });

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate("/admin/projects");

    return {
      success: true,
      message: `Project ${featured ? "marked as featured" : "unmarked as featured"}`,
      data: project,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle featured state";
    return { success: false, message };
  }
}

export async function reorderProjects(orderedIds: string[]): Promise<ActionResponse> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { displayOrder: index + 1 },
        })
      )
    );

    safeRevalidate("/");
    safeRevalidate("/portfolio");
    safeRevalidate("/admin/projects");

    return { success: true, message: "Projects reordered successfully" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reorder projects";
    return { success: false, message };
  }
}

