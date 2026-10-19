"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { defaultTeamMembers } from "@/lib/fallback-data";

const DATA_FILE = path.join(process.cwd(), "data", "team-members.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultTeamMembers, null, 2), "utf-8");
  }
}

function readLocalTeamMembers(): any[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaultTeamMembers;
  }
}

function writeLocalTeamMembers(members: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(members, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write local team members file:", e);
  }
}

export async function getTeamMembers() {
  try {
    const dbMembers = await prisma.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });
    if (dbMembers && dbMembers.length > 0) {
      writeLocalTeamMembers(dbMembers);
      return dbMembers;
    }
  } catch (e) {
    // Database offline or table not migrated yet
  }
  return readLocalTeamMembers();
}

export async function createTeamMember(formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim() || "";
    const name_fa = (formData.get("name_fa") as string)?.trim() || "";
    const nickname = (formData.get("nickname") as string)?.trim() || null;
    const role = (formData.get("role") as string)?.trim() || "";
    const role_fa = (formData.get("role_fa") as string)?.trim() || "";
    const location = (formData.get("location") as string)?.trim() || null;
    const location_fa = (formData.get("location_fa") as string)?.trim() || null;
    const age = (formData.get("age") as string)?.trim() || null;
    const avatar = (formData.get("avatar") as string)?.trim() || "/images/default_avatar.png";
    const bio = (formData.get("bio") as string)?.trim() || "";
    const bio_fa = (formData.get("bio_fa") as string)?.trim() || "";
    const skills = (formData.get("skills") as string)?.trim() || "";
    const skills_fa = (formData.get("skills_fa") as string)?.trim() || "";
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    const newMember = {
      id: `member-${Date.now()}`,
      name: name || name_fa,
      name_fa: name_fa || name,
      nickname,
      role: role || role_fa,
      role_fa: role_fa || role,
      location,
      location_fa,
      age,
      avatar,
      bio,
      bio_fa,
      skills,
      skills_fa,
      displayOrder,
      active,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Try DB first
    try {
      const created = await prisma.teamMember.create({
        data: {
          name: newMember.name,
          name_fa: newMember.name_fa,
          nickname: newMember.nickname,
          role: newMember.role,
          role_fa: newMember.role_fa,
          location: newMember.location ?? undefined,
          location_fa: newMember.location_fa ?? undefined,
          age: newMember.age,
          avatar: newMember.avatar,
          bio: newMember.bio,
          bio_fa: newMember.bio_fa,
          skills: newMember.skills,
          skills_fa: newMember.skills_fa,
          displayOrder: newMember.displayOrder,
          active: newMember.active,
        },
      });
      newMember.id = created.id;
    } catch (e) {
      console.warn("DB offline, persisting to local storage:", e);
    }

    // Always update local storage
    const current = readLocalTeamMembers();
    current.push(newMember);
    writeLocalTeamMembers(current);

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true, member: newMember };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create team member" };
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim();
    const name_fa = (formData.get("name_fa") as string)?.trim();
    const nickname = (formData.get("nickname") as string)?.trim() || null;
    const role = (formData.get("role") as string)?.trim();
    const role_fa = (formData.get("role_fa") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const location_fa = (formData.get("location_fa") as string)?.trim();
    const age = (formData.get("age") as string)?.trim() || null;
    const avatar = (formData.get("avatar") as string)?.trim();
    const bio = (formData.get("bio") as string)?.trim();
    const bio_fa = (formData.get("bio_fa") as string)?.trim();
    const skills = (formData.get("skills") as string)?.trim();
    const skills_fa = (formData.get("skills_fa") as string)?.trim();
    const displayOrder = parseInt((formData.get("displayOrder") as string) || "0", 10);
    const active = formData.get("active") === "true";

    const updatePayload: any = {
      name,
      name_fa,
      nickname,
      role,
      role_fa,
      location,
      location_fa,
      age,
      avatar,
      bio,
      bio_fa,
      skills,
      skills_fa,
      displayOrder,
      active,
      updatedAt: new Date(),
    };

    try {
      await prisma.teamMember.update({
        where: { id },
        data: updatePayload,
      });
    } catch (e) {
      console.warn("DB offline for update, updating local store:", e);
    }

    // Update local store
    const current = readLocalTeamMembers();
    const idx = current.findIndex((m: any) => m.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updatePayload, id };
      writeLocalTeamMembers(current);
    }

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    try {
      await prisma.teamMember.delete({ where: { id } });
    } catch (e) {
      console.warn("DB offline for delete, updating local store:", e);
    }

    const current = readLocalTeamMembers();
    const filtered = current.filter((m: any) => m.id !== id);
    writeLocalTeamMembers(filtered);

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete team member" };
  }
}

export async function toggleTeamMemberActive(id: string) {
  try {
    const current = readLocalTeamMembers();
    const item = current.find((m: any) => m.id === id);
    const nextActive = item ? !item.active : true;

    try {
      await prisma.teamMember.update({
        where: { id },
        data: { active: nextActive },
      });
    } catch (e) {
      // fallback
    }

    if (item) {
      item.active = nextActive;
      writeLocalTeamMembers(current);
    }

    revalidatePath("/");
    revalidatePath("/admin/team");
    return { success: true, active: nextActive };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to toggle status" };
  }
}
