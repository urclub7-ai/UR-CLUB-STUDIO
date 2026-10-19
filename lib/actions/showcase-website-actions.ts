"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { defaultShowcaseWebsites } from "@/lib/fallback-data";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

const DATA_FILE = path.join(process.cwd(), "data", "showcase-websites.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultShowcaseWebsites, null, 2), "utf-8");
  }
}

function readLocalWebsites(): any[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaultShowcaseWebsites;
  }
}

function writeLocalWebsites(websites: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(websites, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local showcase websites file:", e);
  }
}

export async function getShowcaseWebsites() {
  try {
    const dbWebsites = await prisma.showcaseWebsite.findMany({
      orderBy: { displayOrder: "asc" },
    });
    if (dbWebsites && dbWebsites.length > 0) {
      writeLocalWebsites(dbWebsites);
      return dbWebsites;
    }
  } catch (e) {
    // Database offline
  }
  return readLocalWebsites();
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

    let website: any = null;
    try {
      website = await prisma.showcaseWebsite.create({
        data: {
          name: name || name_fa,
          name_fa,
          url,
          displayOrder,
          active,
        },
      });
    } catch (e) {
      console.warn("Prisma createShowcaseWebsite fallback:", e);
    }

    if (!website) {
      website = {
        id: `web-${Date.now()}`,
        name: name || name_fa,
        name_fa,
        url,
        displayOrder,
        active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const current = readLocalWebsites();
    const updated = [...current, website];
    writeLocalWebsites(updated);

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

    let updated: any = null;
    try {
      updated = await prisma.showcaseWebsite.update({
        where: { id },
        data: {
          name: name || name_fa,
          name_fa,
          url,
          displayOrder,
          active,
        },
      });
    } catch (e) {
      console.warn("Prisma updateShowcaseWebsite fallback:", e);
    }

    const current = readLocalWebsites();
    const index = current.findIndex((w: any) => w.id === id);
    if (index !== -1) {
      current[index] = {
        ...current[index],
        name: name || name_fa,
        name_fa,
        url,
        displayOrder,
        active,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = current[index];
      writeLocalWebsites(current);
    }

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
    try {
      await prisma.showcaseWebsite.delete({ where: { id } });
    } catch (e) {
      console.warn("Prisma deleteShowcaseWebsite fallback:", e);
    }

    const current = readLocalWebsites();
    const updated = current.filter((w: any) => w.id !== id);
    writeLocalWebsites(updated);

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
    let updated: any = null;
    try {
      updated = await prisma.showcaseWebsite.update({
        where: { id },
        data: { active: !currentActive },
      });
    } catch (e) {
      console.warn("Prisma toggleShowcaseWebsiteActive fallback:", e);
    }

    const current = readLocalWebsites();
    const index = current.findIndex((w: any) => w.id === id);
    if (index !== -1) {
      current[index] = {
        ...current[index],
        active: !currentActive,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = current[index];
      writeLocalWebsites(current);
    }

    revalidatePath("/");
    revalidatePath("/admin/websites");
    return { success: true, data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error toggling status";
    return { success: false, message };
  }
}
