import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-service-key";

// Client for public reads if needed
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Admin / Server client with elevated privileges for Storage management
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export type StorageBucket = "portfolio" | "certificates" | "profile" | "experience" | "site";

import fs from "fs";
import pathModule from "path";

/**
 * Upload a file to Supabase Storage or local public/uploads directory
 */
export async function uploadToStorage(
  bucket: StorageBucket,
  path: string,
  fileBuffer: Buffer | Uint8Array,
  contentType: string
): Promise<{ url: string | null; error: string | null }> {
  try {
    // If Supabase credentials are not configured, save directly to local disk in public/uploads/
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      const filename = pathModule.basename(path);
      const uploadsDir = pathModule.join(process.cwd(), "public", "uploads");
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = pathModule.join(uploadsDir, filename);
      fs.writeFileSync(filePath, Buffer.from(fileBuffer));

      const publicUrl = `/uploads/${filename}`;
      return { url: publicUrl, error: null };
    }

    // Ensure bucket exists or attempt upload in Supabase
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      if (error.message.includes("Bucket not found") || (error as { statusCode?: string }).statusCode === "404") {
        await supabaseAdmin.storage.createBucket(bucket, { public: true });
        const retry = await supabaseAdmin.storage.from(bucket).upload(path, fileBuffer, {
          contentType,
          upsert: true,
        });
        if (retry.error) {
          // Fallback to local disk if Supabase bucket fails
          const filename = pathModule.basename(path);
          const uploadsDir = pathModule.join(process.cwd(), "public", "uploads");
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const filePath = pathModule.join(uploadsDir, filename);
          fs.writeFileSync(filePath, Buffer.from(fileBuffer));
          return { url: `/uploads/${filename}`, error: null };
        }
      } else {
        // Fallback to local disk
        const filename = pathModule.basename(path);
        const uploadsDir = pathModule.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = pathModule.join(uploadsDir, filename);
        fs.writeFileSync(filePath, Buffer.from(fileBuffer));
        return { url: `/uploads/${filename}`, error: null };
      }
    }

    const { data: publicData } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return { url: publicData.publicUrl, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return { url: null, error: message };
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFromStorage(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return { success: true, error: null };
    }

    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return { success: false, error: message };
  }
}

