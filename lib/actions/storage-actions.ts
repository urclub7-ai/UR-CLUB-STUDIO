"use server";

import { requireAdmin } from "@/lib/auth";
import { uploadToStorage, type StorageBucket } from "@/lib/supabase";
import type { ActionResponse } from "./auth-actions";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_DOC_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function uploadAssetAction(
  formData: FormData,
  bucket: StorageBucket = "portfolio"
): Promise<ActionResponse<{ url: string }>> {
  try {
    await requireAdmin();

    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, message: "No file was provided for upload" };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "File exceeds the 10MB maximum size limit" };
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isDoc = ALLOWED_DOC_TYPES.includes(file.type);

    if (!isImage && !isDoc) {
      return {
        success: false,
        message: "Unsupported file format. Please upload JPG, PNG, WEBP, SVG, GIF or PDF.",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop() || (isDoc ? "pdf" : "jpg");
    const sanitizedBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const uniquePath = `${bucket}/${Date.now()}_${sanitizedBase}.${ext}`;

    const { url, error } = await uploadToStorage(bucket, uniquePath, buffer, file.type);
    if (error || !url) {
      return { success: false, message: error || "Upload to storage failed" };
    }

    return {
      success: true,
      message: "File uploaded successfully",
      data: { url },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload asset";
    return { success: false, message };
  }
}

