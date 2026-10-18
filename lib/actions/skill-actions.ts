"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { skillSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function createSkill(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = skillSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const skill = await prisma.skill.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      success: true,
      message: "Skill added successfully",
      data: skill,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create skill";
    return { success: false, message };
  }
}

export async function updateSkill(id: string, data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = skillSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      success: true,
      message: "Skill updated successfully",
      data: skill,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update skill";
    return { success: false, message };
  }
}

export async function deleteSkill(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const skill = await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      success: true,
      message: `Skill "${skill.name}" deleted`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete skill";
    return { success: false, message };
  }
}

export async function toggleSkillActive(id: string, active: boolean): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const skill = await prisma.skill.update({
      where: { id },
      data: { active },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      success: true,
      message: `Skill ${active ? "activated" : "deactivated"}`,
      data: skill,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update skill state";
    return { success: false, message };
  }
}

