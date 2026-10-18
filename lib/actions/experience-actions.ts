"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function createExperience(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = experienceSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const experience = await prisma.experience.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Experience added successfully",
      data: experience,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create experience";
    return { success: false, message };
  }
}

export async function updateExperience(id: string, data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = experienceSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Experience updated successfully",
      data: experience,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update experience";
    return { success: false, message };
  }
}

export async function deleteExperience(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const exp = await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `Experience at "${exp.company}" deleted`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete experience";
    return { success: false, message };
  }
}

