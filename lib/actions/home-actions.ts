"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { homeContentSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function updateHomeContent(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = homeContentSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const home = await prisma.homeContent.upsert({
      where: { id: "default-home" },
      update: parsed.data,
      create: {
        id: "default-home",
        ...parsed.data,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/home");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Home page content updated successfully",
      data: home,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update home content";
    return { success: false, message };
  }
}

