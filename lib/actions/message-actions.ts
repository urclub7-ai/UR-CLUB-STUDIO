"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { contactMessageSchema } from "@/lib/validations";
import { sendEmailNotification } from "@/lib/mail";
import type { ActionResponse } from "./auth-actions";

function safeRevalidate(path: string, type?: "layout" | "page") {
  try {
    if (type) {
      revalidatePath(path, type);
    } else {
      revalidatePath(path);
    }
  } catch {
    // Ignored when running outside Next.js request context (e.g. tests/scripts)
  }
}

export async function submitContactForm(data: unknown): Promise<ActionResponse<{ id: string }>> {
  try {
    const parsed = contactMessageSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Please ensure all required fields are filled properly.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    let messageId = "msg-" + Date.now();
    try {
      const newMessage = await prisma.contactMessage.create({
        data: {
          ...parsed.data,
          status: "NEW",
        },
      });
      messageId = newMessage.id;
    } catch (dbError) {
      console.warn("Contact message database storage unavailable, proceeding with direct notification:", dbError);
    }

    // Always send direct email notification to inbox
    try {
      await sendEmailNotification({
        subject: `[New Inquiry] ${parsed.data.name} (${parsed.data.service || "General"})`,
        senderName: parsed.data.name,
        senderEmail: parsed.data.email,
        senderPhone: parsed.data.company,
        serviceOrTopic: parsed.data.service,
        budget: parsed.data.budget,
        content: parsed.data.message,
      });
    } catch (mailError) {
      console.warn("Email notification error:", mailError);
    }

    safeRevalidate("/admin/messages");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: "پیام شما با موفقیت دریافت شد. تیم در کوتاه‌ترین زمان با شما در ارتباط خواهد بود.",
      data: { id: messageId },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send message";
    return { success: false, message };
  }
}

export async function submitProjectInquiry(data: {
  projectCode?: string;
  category?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  brandName?: string;
  websiteType?: string;
  domainTld?: string;
  suggestedDomain?: string;
  pageCount?: string;
  pageNames?: string[];
  primaryColor?: string;
  secondaryColors?: string;
  colorsToAvoid?: string;
  dominantColor?: string;
  designStyle?: string;
  colorScheme?: string;
  animationLevel?: string;
  hasThemeSwitcher?: boolean;
  isResponsive?: boolean;
  isMultilingual?: boolean;
  languagesList?: string[];
  logoStatus?: string;
  imageryStatus?: string;
  textsStatus?: string;
  referenceLinks?: string;
  lookDescription?: string;
  requiredFeatures?: string[];
  hasDomain?: boolean;
  domainName?: string;
  hasHosting?: boolean;
  hostingCompany?: string;
  budgetScope?: string;
  timeline?: string;
  additionalNotes?: string;
  formattedBrief: string;
}): Promise<ActionResponse<{ id: string; referenceNumber: string }>> {
  try {
    // Generate or validate 6-character uppercase alphanumeric ID
    let refNum = data.projectCode?.trim().toUpperCase();
    if (!refNum || refNum.length !== 6 || !/^[A-Z0-9]{6}$/.test(refNum)) {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      refNum = "";
      for (let i = 0; i < 6; i++) {
        refNum += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    const clientName = data.clientName?.trim() || "کاربر ناشناس (ثبت مستقیم)";
    const clientEmail = (data.clientEmail?.trim() && data.clientEmail.includes("@"))
      ? data.clientEmail.trim()
      : "urclub7+order@gmail.com";
    const categoryTitle = data.category || data.websiteType || "سفارش پروژه";

    let orderMessageId = "order-" + Date.now();
    try {
      const newMessage = await prisma.contactMessage.create({
        data: {
          name: clientName,
          email: clientEmail,
          company: data.brandName || `Project ID: ${refNum}`,
          service: `سفارش: ${categoryTitle} [${refNum}]`,
          budget: data.budgetScope || "مشخص شده در بریف",
          projectUrl: data.suggestedDomain || data.domainName || null,
          message: data.formattedBrief,
          status: "NEW",
        },
      });
      orderMessageId = newMessage.id;
    } catch (dbErr) {
      console.warn("Order inquiry database storage offline, proceeding directly:", dbErr);
    }

    // Send full project specification directly to urclub7@gmail.com
    await sendEmailNotification({
      subject: `[UrClub Order: ${refNum}] ${data.brandName || clientName} - ${categoryTitle}`,
      senderName: clientName,
      senderEmail: clientEmail,
      senderPhone: data.clientPhone,
      serviceOrTopic: `${categoryTitle} (شناسه پوشه و پیگیری: ${refNum})`,
      budget: data.budgetScope,
      content: data.formattedBrief,
    });

    // Do not trigger page revalidation to prevent router refresh on public client

    return {
      success: true,
      message: "سفارش شما با موفقیت ثبت شد. شناسه پیگیری: " + refNum,
      data: { id: newMessage.id, referenceNumber: refNum },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit project specification";
    return { success: false, message };
  }
}

export async function updateMessageStatus(id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED"): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const msg = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    safeRevalidate("/admin/messages");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: `Message marked as ${status.toLowerCase()}`,
      data: msg,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update status";
    return { success: false, message };
  }
}

export async function deleteMessage(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin();

    await prisma.contactMessage.delete({
      where: { id },
    });

    safeRevalidate("/admin/messages");
    safeRevalidate("/admin/dashboard");

    return {
      success: true,
      message: "Message deleted successfully",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete message";
    return { success: false, message };
  }
}

