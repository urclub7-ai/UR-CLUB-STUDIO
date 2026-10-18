"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { aboutContentSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function updateAboutContent(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = aboutContentSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const about = await prisma.aboutContent.upsert({
      where: { id: "default-about" },
      update: parsed.data,
      create: {
        id: "default-about",
        ...parsed.data,
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      success: true,
      message: "About page content updated successfully",
      data: about,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update about content";
    return { success: false, message };
  }
}

