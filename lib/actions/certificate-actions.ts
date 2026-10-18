"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { certificateSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function createCertificate(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = certificateSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const certificate = await prisma.certificate.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Certificate added successfully",
      data: certificate,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to add certificate";
    return { success: false, message };
  }
}

export async function updateCertificate(id: string, data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = certificateSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update certificate";
    return { success: false, message };
  }
}

export async function deleteCertificate(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const cert = await prisma.certificate.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `Certificate "${cert.title}" deleted successfully`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete certificate";
    return { success: false, message };
  }
}

export async function toggleCertificatePublished(id: string, published: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const cert = await prisma.certificate.update({
      where: { id },
      data: { published },
    });

    revalidatePath("/");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");

    return {
      success: true,
      message: `Certificate ${published ? "published" : "hidden"}`,
      data: cert,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle status";
    return { success: false, message };
  }
}

export async function toggleCertificateFeatured(id: string, featured: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const cert = await prisma.certificate.update({
      where: { id },
      data: { featured },
    });

    revalidatePath("/");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");

    return {
      success: true,
      message: `Certificate ${featured ? "featured on home" : "removed from home"}`,
      data: cert,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle featured";
    return { success: false, message };
  }
}

