import "server-only";
import { createAdminClient } from "./admin-client";

/**
 * Uploads an image File to the public "media" bucket and returns its
 * public URL (or null if there was no file / it failed).
 * Runs with the service-role client, so only call from admin actions.
 */
export async function uploadMedia(
  file: File | null,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = createAdminClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from("media")
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    console.error("Media upload failed:", error.message);
    return null;
  }

  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}
