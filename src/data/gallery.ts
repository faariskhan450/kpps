/**
 * Gallery items — seeded in code for now.
 * Later (Phase 9) photos will be uploaded by the admin and stored in
 * Supabase Storage. For now each item shows a tasteful gradient
 * placeholder so the layout is ready for real photos.
 *
 * When you have real photos: put them in /public/gallery and set
 * `image` to e.g. "/gallery/storytime.jpg".
 */
export type GalleryItem = {
  id: string;
  caption: string;
  image?: string; // optional path to a real image in /public
};

export const gallery: GalleryItem[] = [
  { id: "1", caption: "Story time" },
  { id: "2", caption: "Art & craft corner" },
  { id: "3", caption: "Outdoor play" },
  { id: "4", caption: "Music & movement" },
  { id: "5", caption: "Building blocks" },
  { id: "6", caption: "Celebration day" },
  { id: "7", caption: "Garden visit" },
  { id: "8", caption: "Snack time" },
];
