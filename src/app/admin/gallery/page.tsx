import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { AdminGalleryForm } from "@/components/admin-gallery-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteGalleryImage } from "./actions";

export const metadata = { title: "Gallery — Admin — Kids Planet School" };

export default async function AdminGalleryPage() {
  const supabase = createAdminClient();
  const { data: images } = await supabase
    .from("gallery")
    .select("id, caption, image_url")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink/60 transition-colors hover:text-deep">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Manage gallery
      </h1>

      <div className="mt-8">
        <AdminGalleryForm />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">
        Photos ({(images ?? []).length})
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(images ?? []).map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image src={img.image_url} alt={img.caption ?? "Gallery photo"} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <form action={deleteGalleryImage} className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
              <input type="hidden" name="id" value={img.id} />
              <div className="rounded-full bg-surface/90">
                <ConfirmDeleteButton title="Delete photo?" message="This photo will be removed from the gallery." ariaLabel="Delete photo" />
              </div>
            </form>
            {img.caption && (
              <span className="absolute bottom-2 left-2 font-sans text-xs font-medium text-surface">
                {img.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
