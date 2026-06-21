import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Stagger, Item } from "@/components/animations";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A glimpse into daily life and special moments at Kids Planet School.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery")
    .select("id, caption, image_url")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from our world"
        subtitle="A peek into the happy, colourful days inside our classrooms and play spaces."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {(images ?? []).length === 0 ? (
          <p className="text-center font-sans text-ink/60">Photos coming soon.</p>
        ) : (
          <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {(images ?? []).map((item, i) => (
              <Item key={item.id} className="group text-center">
                <div className="relative mx-auto aspect-square w-full">
                  <div className={`${i % 2 ? "blob" : "blob-alt"} absolute -inset-2 bg-mint/40`} />
                  <div className={`${i % 2 ? "blob-alt" : "blob"} relative h-full w-full overflow-hidden`}>
                    <Image
                      src={item.image_url}
                      alt={item.caption ?? "Gallery photo"}
                      fill
                      sizes="(max-width:640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                {item.caption && (
                  <p className="mt-4 font-display text-sm font-bold text-deep">{item.caption}</p>
                )}
              </Item>
            ))}
          </Stagger>
        )}
      </section>
    </>
  );
}
