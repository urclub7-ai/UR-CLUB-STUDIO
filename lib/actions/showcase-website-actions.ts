"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function getShowcaseWebsites() {
  return prisma.showcaseWebsite.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function createShowcaseWebsite(formData: FormData): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const name = (formData.get("name") as string)?.trim() || "";
    const name_fa = (formData.get("name_fa") as string)?.trim() || name;
    const url = (formData.get("url") as string)?.trim() || "";
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    if (!name_fa || !url) {
      return { success: false, message: "نام و آدرس وبسایت الزامی هستند / Name and URL are required" };
    }

    const website = await prisma.showcaseWebsite.create({
      data: {
        name: name || name_fa,
        name_fa,
        url,
        displayOrder,
        active,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/websites");
    return { success: true, message: "وب‌سایت با موفقیت به کادر آنلاین اضافه شد", data: website };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating showcase website";
    return { success: false, message };
  }
}

export async function updateShowcaseWebsite(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const name = (formData.get("name") as string)?.trim() || "";
    const name_fa = (formData.get("name_fa") as string)?.trim() || name;
    const url = (formData.get("url") as string)?.trim() || "";
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    if (!name_fa || !url) {
      return { success: false, message: "نام و آدرس وبسایت الزامی هستند / Name and URL are required" };
    }

    const updated = await prisma.showcaseWebsite.update({
      where: { id },
      data: {
        name: name || name_fa,
        name_fa,
        url,
        displayOrder,
        active,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/websites");
    return { success: true, message: "تغییرات با موفقیت ذخیره شد", data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating showcase website";
    return { success: false, message };
  }
}

export async function deleteShowcaseWebsite(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();
    await prisma.showcaseWebsite.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/websites");
    return { success: true, message: "با موفقیت از کادر آنلاین حذف شد" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting showcase website";
    return { success: false, message };
  }
}

export async function toggleShowcaseWebsiteActive(id: string, currentActive: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const updated = await prisma.showcaseWebsite.update({
      where: { id },
      data: { active: !currentActive },
    });
    revalidatePath("/");
    revalidatePath("/admin/websites");
    return { success: true, data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error toggling status";
    return { success: false, message };
  }
}
