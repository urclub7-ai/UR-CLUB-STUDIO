"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { siteSettingsSchema, socialLinkSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function updateSiteSettings(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = siteSettingsSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default-settings" },
      update: parsed.data,
      create: {
        id: "default-settings",
        ...parsed.data,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Site settings updated successfully",
      data: settings,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update settings";
    return { success: false, message };
  }
}

export async function saveSocialLinks(links: Array<{ id?: string; platform: string; url: string; icon: string; displayOrder: number; active: boolean }>): Promise<ActionResponse> {
  try {
    await requireAdmin();

    // Remove existing links
    await prisma.socialLink.deleteMany({
      where: { siteSettingsId: "default-settings" },
    });

    // Create new links
    await prisma.socialLink.createMany({
      data: links.map((link, index) => ({
        platform: link.platform,
        url: link.url,
        icon: link.icon || "Globe",
        displayOrder: link.displayOrder ?? index + 1,
        active: link.active ?? true,
        siteSettingsId: "default-settings",
      })),
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");

    return { success: true, message: "Social links saved successfully" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save social links";
    return { success: false, message };
  }
}

