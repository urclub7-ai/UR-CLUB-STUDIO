"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
import type { ActionResponse } from "./auth-actions";

export async function createService(data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = serviceSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const service = await prisma.service.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Service created successfully",
      data: service,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create service";
    return { success: false, message };
  }
}

export async function updateService(id: string, data: unknown): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const parsed = serviceSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const service = await prisma.service.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Service updated successfully",
      data: service,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update service";
    return { success: false, message };
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const serv = await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `Service "${serv.title}" deleted`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete service";
    return { success: false, message };
  }
}

