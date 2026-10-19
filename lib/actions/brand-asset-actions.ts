"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { defaultBrandAssets } from "@/lib/fallback-data";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

const DATA_FILE = path.join(process.cwd(), "data", "brand-assets.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultBrandAssets, null, 2), "utf-8");
  }
}

function readLocalBrandAssets(): any[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaultBrandAssets;
  }
}

function writeLocalBrandAssets(assets: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(assets, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local brand assets file:", e);
  }
}

export async function getBrandAssets() {
  try {
    const dbAssets = await prisma.brandAsset.findMany({
      orderBy: { displayOrder: "asc" },
    });
    if (dbAssets && dbAssets.length > 0) {
      writeLocalBrandAssets(dbAssets);
      return dbAssets;
    }
  } catch (e) {
    // Database offline
  }
  return readLocalBrandAssets();
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

    let asset: any = null;
    try {
      asset = await prisma.brandAsset.create({
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
    } catch (e) {
      console.warn("Prisma createBrandAsset fallback:", e);
    }

    if (!asset) {
      asset = {
        id: `asset-${Date.now()}`,
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const current = readLocalBrandAssets();
    const updated = [...current, asset];
    writeLocalBrandAssets(updated);

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

    let updated: any = null;
    try {
      updated = await prisma.brandAsset.update({
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
    } catch (e) {
      console.warn("Prisma updateBrandAsset fallback:", e);
    }

    const current = readLocalBrandAssets();
    const index = current.findIndex((a: any) => a.id === id);
    if (index !== -1) {
      current[index] = {
        ...current[index],
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
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = current[index];
      writeLocalBrandAssets(current);
    }

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
    try {
      await prisma.brandAsset.delete({ where: { id } });
    } catch (e) {
      console.warn("Prisma deleteBrandAsset fallback:", e);
    }

    const current = readLocalBrandAssets();
    const updated = current.filter((a: any) => a.id !== id);
    writeLocalBrandAssets(updated);

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
    let updated: any = null;
    try {
      updated = await prisma.brandAsset.update({
        where: { id },
        data: { active: !currentActive },
      });
    } catch (e) {
      console.warn("Prisma toggleBrandAssetActive fallback:", e);
    }

    const current = readLocalBrandAssets();
    const index = current.findIndex((a: any) => a.id === id);
    if (index !== -1) {
      current[index] = {
        ...current[index],
        active: !currentActive,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = current[index];
      writeLocalBrandAssets(current);
    }

    revalidatePath("/");
    revalidatePath("/admin/logos");
    return { success: true, data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error toggling status";
    return { success: false, message };
  }
}
