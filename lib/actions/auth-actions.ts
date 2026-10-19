"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  signAdminSession,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  verifyPassword,
  hashPassword,
  getAdminSession,
  requireAdmin,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export async function loginAdmin(formData: FormData): Promise<ActionResponse> {
  try {
    const password = (formData.get("password") as string)?.trim();

    if (!password || password.length === 0) {
      return {
        success: false,
        message: "لطفاً کد دسترسی را وارد کنید / Please enter passcode",
      };
    }

    // Check master code 2010 immediately
    if (password === "2010") {
      const token = await signAdminSession({
        adminId: "master-admin-levi",
        email: "urclub7@gmail.com",
        name: "Mohammad Nazif Yosufi",
        role: "SUPER_ADMIN",
      });
      setAdminSessionCookie(token);
      return {
        success: true,
        message: "ورود موفقیت‌آمیز / Login successful",
        data: { name: "Mohammad Nazif Yosufi", email: "urclub7@gmail.com" },
      };
    }

    // Otherwise check database admin
    let admin = null;
    try {
      admin = await prisma.admin.findFirst();
    } catch (e) {
      // db offline
    }

    if (!admin) {
      return {
        success: false,
        message: "کد دسترسی نادرست است / Invalid Access Code",
      };
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);

    if (!isMatch) {
      return {
        success: false,
        message: "کد دسترسی نادرست است / Invalid Access Code",
      };
    }

    const token = await signAdminSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    setAdminSessionCookie(token);

    return {
      success: true,
      message: "ورود موفقیت‌آمیز / Login successful",
      data: { name: admin.name, email: admin.email },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected login error occurred";
    return { success: false, message };
  }
}

export async function logoutAdmin(): Promise<ActionResponse> {
  try {
    clearAdminSessionCookie();
    return { success: true, message: "Logged out successfully" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to logout";
    return { success: false, message };
  }
}

export async function checkAdminSession(): Promise<ActionResponse> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "No active session" };
  }
  return { success: true, data: session };
}

export async function updateAdminProfile(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const name = formData.get("name") as string;
    const newPassword = formData.get("newPassword") as string;

    const dataToUpdate: { name?: string; passwordHash?: string } = {};
    if (name && name.trim()) {
      dataToUpdate.name = name.trim();
    }
    if (newPassword && newPassword.length >= 6) {
      dataToUpdate.passwordHash = await hashPassword(newPassword);
    }

    const updated = await prisma.admin.update({
      where: { id: session.adminId },
      data: dataToUpdate,
    });

    revalidatePath("/admin");
    return { success: true, message: "Profile updated successfully", data: { name: updated.name } };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return { success: false, message };
  }
}

