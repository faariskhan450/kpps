"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { uploadMedia } from "@/lib/supabase/upload";
import { requireAdmin } from "@/lib/auth/require-admin";

export type GalleryState = { ok?: boolean; message?: string };

export async function addGalleryImage(
  _prev: GalleryState,
  formData: FormData
): Promise<GalleryState> {
  await requireAdmin();

  const caption = String(formData.get("caption") ?? "").trim() || null;
  const image = formData.get("image") as File | null;

  if (!image || image.size === 0)
    return { ok: false, message: "Please choose an image." };

  const imageUrl = await uploadMedia(image, "gallery");
  if (!imageUrl) return { ok: false, message: "Image upload failed." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("gallery")
    .insert({ caption, image_url: imageUrl });

  if (error) return { ok: false, message: "Could not save the image." };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { ok: true, message: "Image added." };
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("gallery").delete().eq("id", id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
