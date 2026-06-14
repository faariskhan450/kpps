import type { Metadata } from "next";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { gallery } from "@/data/gallery";
import { Reveal, Stagger, Item } from "@/components/animations";

export const metadata: Metadata = {
  title: "Gallery — Kids Planet School",
  description: "A glimpse into daily life and special moments at Kids Planet School.",
};

// A few on-brand gradients to vary the placeholder tiles
const gradients = [
  "from-mint to-teal",
  "from-teal to-deep",
  "from-deep to-teal",
  "from-mint to-deep",
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="max-w-3xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-teal">
          Gallery
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Moments from our world
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-ink/65">
          A peek into the happy, colourful days inside our classrooms and play
          spaces.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((item, i) => (
          <Item key={item.id}>
            <figure className="group relative aspect-square overflow-hidden rounded-3xl">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                    gradients[i % gradients.length]
                  } transition-transform duration-500 group-hover:scale-105`}
                >
                  <ImageIcon className="text-surface/40" size={28} />
                </div>
              )}
              {/* caption overlay */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-4">
                <span className="font-sans text-sm font-medium text-surface">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
