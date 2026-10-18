"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function getBrandAssets() {
  return prisma.brandAsset.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function createBrandAsset(formData: FormData): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const type = (formData.get("type") as string) || "logo";
    const title = (formData.get("title") as string)?.trim() || "";
    const title_fa = (formData.get("title_fa") as string)?.trim() || title;
    const category = (formData.get("category") as string)?.trim() || (type === "logo" ? "Branding" : "Poster");
    const category_fa = (formData.get("category_fa") as string)?.trim() || (type === "logo" ? "طراحی لوگو و برند" : "پوستر تبلیغاتی");
    const description = (formData.get("description") as string)?.trim() || "";
    const description_fa = (formData.get("description_fa") as string)?.trim() || "";
    const image = (formData.get("image") as string)?.trim() || "";
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    if (!title || !image) {
      return { success: false, message: "عنوان و تصویر الزامی هستند / Title and image are required" };
    }

    const asset = await prisma.brandAsset.create({
      data: {
        type,
        title,
        title_fa,
        category,
        category_fa,
        description,
        description_fa,
        image,
        displayOrder,
        active,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/logos");
    return { success: true, message: "لوگو/پوستر با موفقیت ایجاد شد", data: asset };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating asset";
    return { success: false, message };
  }
}

export async function updateBrandAsset(id: string, formData: FormData): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const type = (formData.get("type") as string) || "logo";
    const title = (formData.get("title") as string)?.trim() || "";
    const title_fa = (formData.get("title_fa") as string)?.trim() || title;
    const category = (formData.get("category") as string)?.trim() || (type === "logo" ? "Branding" : "Poster");
    const category_fa = (formData.get("category_fa") as string)?.trim() || (type === "logo" ? "طراحی لوگو و برند" : "پوستر تبلیغاتی");
    const description = (formData.get("description") as string)?.trim() || "";
    const description_fa = (formData.get("description_fa") as string)?.trim() || "";
    const image = (formData.get("image") as string)?.trim() || "";
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    if (!title || !image) {
      return { success: false, message: "عنوان و تصویر الزامی هستند / Title and image are required" };
    }

    const updated = await prisma.brandAsset.update({
      where: { id },
      data: {
        type,
        title,
        title_fa,
        category,
        category_fa,
        description,
        description_fa,
        image,
        displayOrder,
        active,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/logos");
    return { success: true, message: "تغییرات با موفقیت ذخیره شد", data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating asset";
    return { success: false, message };
  }
}

export async function deleteBrandAsset(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();
    await prisma.brandAsset.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/logos");
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting asset";
    return { success: false, message };
  }
}

export async function toggleBrandAssetActive(id: string, currentActive: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();
    const updated = await prisma.brandAsset.update({
      where: { id },
      data: { active: !currentActive },
    });
    revalidatePath("/");
    revalidatePath("/admin/logos");
    return { success: true, data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error toggling status";
    return { success: false, message };
  }
}
