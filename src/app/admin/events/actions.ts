"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { uploadMedia } from "@/lib/supabase/upload";
import { requireAdmin } from "@/lib/auth/require-admin";

export type EventState = { ok?: boolean; message?: string };

export async function addEvent(
  _prev: EventState,
  formData: FormData
): Promise<EventState> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "") || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "").trim() || null;
  const image = formData.get("image") as File | null;

  if (!title) return { ok: false, message: "Please enter a title." };

  const imageUrl = await uploadMedia(image, "events");

  const supabase = createAdminClient();
  const { error } = await supabase.from("events").insert({
    title,
    event_date: eventDate,
    description,
    category,
    image_url: imageUrl,
  });

  if (error) return { ok: false, message: "Could not add the event." };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { ok: true, message: "Event added." };
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
