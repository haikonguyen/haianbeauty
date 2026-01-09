import type { GalleryItem } from "../types";

/**
 * Sample gallery items for the beauty/nail studio
 *
 * IMPORTANT: Replace these placeholder paths with your actual ImageKit.io image paths
 * after uploading your images to ImageKit.io
 *
 * Image path format: "haianbeauty-cz/portfolio/{category}/{filename}"
 * Example: "haianbeauty-cz/portfolio/nails/gel-manicure-pink"
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  // Nails Category
  {
    id: "nails-1",
    type: "image",
    path: "haianbeauty-cz/portfolio/nails/nail-01",
    width: 1080,
    height: 1350,
    category: "nails",
    captionKey: "gallery.items.nails1",
    alt: "Elegant gel manicure with nude polish",
    serviceId: "gel-manicure",
  },
  {
    id: "nails-2",
    type: "image",
    path: "haianbeauty-cz/portfolio/nails/nail-02",
    width: 1080,
    height: 1080,
    category: "nails",
    captionKey: "gallery.items.nails2",
    alt: "Classic French manicure",
    serviceId: "classic-manicure",
  },
  {
    id: "nails-3",
    type: "image",
    path: "haianbeauty-cz/portfolio/nails/nail-03",
    width: 1080,
    height: 1350,
    category: "nails",
    captionKey: "gallery.items.nails3",
    alt: "Creative nail art design",
  },
  {
    id: "nails-4",
    type: "image",
    path: "haianbeauty-cz/portfolio/nails/nail-04",
    width: 1080,
    height: 1080,
    category: "nails",
    captionKey: "gallery.items.nails4",
    alt: "Luxury pedicure with spa treatment",
    serviceId: "luxury-pedicure",
  },

  // Lashes Category
  {
    id: "lashes-1",
    type: "image",
    path: "haianbeauty-cz/portfolio/beauty/lash-01",
    width: 1080,
    height: 1350,
    category: "lashes",
    captionKey: "gallery.items.lashes1",
    alt: "Beautiful lash extensions",
    serviceId: "lash-extensions",
  },
  {
    id: "lashes-2",
    type: "image",
    path: "haianbeauty-cz/portfolio/beauty/lash-02",
    width: 1080,
    height: 1080,
    category: "lashes",
    captionKey: "gallery.items.lashes2",
    alt: "Volume lash extensions",
    serviceId: "volume-lashes",
  },
  {
    id: "lashes-3",
    type: "image",
    path: "haianbeauty-cz/portfolio/beauty/lash-03",
    width: 1080,
    height: 1350,
    category: "lashes",
    captionKey: "gallery.items.lashes3",
    alt: "Classic lash extensions",
  },
  {
    id: "lashes-4",
    type: "image",
    path: "haianbeauty-cz/portfolio/beauty/lash-04",
    width: 1080,
    height: 1350,
    category: "lashes",
    captionKey: "gallery.items.lashes4",
    alt: "Natural lash extensions",
  },
  {
    id: "lashes-video-1",
    type: "video",
    path: "haianbeauty-cz/portfolio/beauty/lash-video-01-new.mp4",
    width: 1080,
    height: 1920,
    category: "lashes",
    captionKey: "gallery.items.lashesVideo1",
    alt: "Lash extension application video",
  },
  {
    id: "lashes-video-2",
    type: "video",
    path: "haianbeauty-cz/portfolio/beauty/lash-video-02.mp4",
    width: 1080,
    height: 1920,
    category: "lashes",
    captionKey: "gallery.items.lashesVideo2",
    alt: "Lash extension results video",
  },

  // PMU (Permanent Makeup) Category
  {
    id: "pmu-1",
    type: "image",
    path: "haianbeauty-cz/portfolio/pmu/eyebrows/eyebrows-01",
    width: 1080,
    height: 1350,
    category: "pmu",
    captionKey: "gallery.items.pmu1",
    alt: "Permanent makeup eyebrows",
  },
  {
    id: "pmu-2",
    type: "image",
    path: "haianbeauty-cz/portfolio/pmu/eyebrows/eyebrows-02",
    width: 1080,
    height: 1080,
    category: "pmu",
    captionKey: "gallery.items.pmu2",
    alt: "Microblading eyebrows",
  },
  {
    id: "pmu-3",
    type: "image",
    path: "haianbeauty-cz/portfolio/pmu/eyebrows/eyebrows-03",
    width: 1080,
    height: 1350,
    category: "pmu",
    captionKey: "gallery.items.pmu3",
    alt: "Powder brows permanent makeup",
  },
  {
    id: "pmu-4",
    type: "image",
    path: "haianbeauty-cz/portfolio/pmu/eyebrows/eyebrows-04",
    width: 1080,
    height: 1080,
    category: "pmu",
    captionKey: "gallery.items.pmu4",
    alt: "Ombre eyebrows",
  },
  {
    id: "pmu-5",
    type: "image",
    path: "haianbeauty-cz/portfolio/pmu/eyebrows/eyebrows-05",
    width: 1080,
    height: 1350,
    category: "pmu",
    captionKey: "gallery.items.pmu5",
    alt: "Natural eyebrow permanent makeup",
  },
];

/**
 * Get gallery items by category
 */
export function getGalleryItemsByCategory(
  category: GalleryItem["category"],
): GalleryItem[] {
  if (category === "all") {
    return GALLERY_ITEMS;
  }
  return GALLERY_ITEMS.filter((item) => item.category === category);
}

/**
 * Get gallery item by ID
 */
export function getGalleryItemById(id: string): GalleryItem | undefined {
  return GALLERY_ITEMS.find((item) => item.id === id);
}

/**
 * Get featured gallery items for homepage
 */
export function getFeaturedGalleryItems(count = 6): GalleryItem[] {
  // Return first N items, or implement your own logic
  return GALLERY_ITEMS.slice(0, count);
}
