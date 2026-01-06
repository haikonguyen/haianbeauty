import type { GalleryItem } from "../types";

/**
 * Sample gallery items for the beauty/nail studio
 *
 * IMPORTANT: Replace these placeholder paths with your actual ImageKit.io image paths
 * after uploading your images to ImageKit.io
 *
 * Image path format: "gallery/{category}/{filename}.{ext}"
 * Example: "gallery/nails/gel-manicure-pink.jpg"
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  // Nails Category
  {
    id: "nails-1",
    type: "image",
    path: "gallery/nails/gel-manicure-1.jpg",
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
    path: "gallery/nails/classic-manicure-1.jpg",
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
    path: "gallery/nails/nail-art-1.jpg",
    width: 1080,
    height: 1350,
    category: "nails",
    captionKey: "gallery.items.nails3",
    alt: "Creative nail art design",
  },
  {
    id: "nails-4",
    type: "image",
    path: "gallery/nails/pedicure-1.jpg",
    width: 1080,
    height: 1080,
    category: "nails",
    captionKey: "gallery.items.nails4",
    alt: "Luxury pedicure with spa treatment",
    serviceId: "luxury-pedicure",
  },

  // Beauty Category
  {
    id: "beauty-1",
    type: "image",
    path: "gallery/beauty/facial-1.jpg",
    width: 1080,
    height: 1350,
    category: "beauty",
    captionKey: "gallery.items.beauty1",
    alt: "Relaxing facial treatment",
    serviceId: "facial-treatment",
  },
  {
    id: "beauty-2",
    type: "image",
    path: "gallery/beauty/anti-aging-1.jpg",
    width: 1080,
    height: 1080,
    category: "beauty",
    captionKey: "gallery.items.beauty2",
    alt: "Anti-aging facial with LED therapy",
    serviceId: "anti-aging-facial",
  },
  {
    id: "beauty-3",
    type: "image",
    path: "gallery/beauty/skincare-1.jpg",
    width: 1080,
    height: 1350,
    category: "beauty",
    captionKey: "gallery.items.beauty3",
    alt: "Premium skincare products",
  },

  // Spa Category
  {
    id: "spa-1",
    type: "image",
    path: "gallery/spa/hot-stone-1.jpg",
    width: 1080,
    height: 1350,
    category: "spa",
    captionKey: "gallery.items.spa1",
    alt: "Hot stone massage therapy",
    serviceId: "hot-stone-massage",
  },
  {
    id: "spa-2",
    type: "image",
    path: "gallery/spa/body-scrub-1.jpg",
    width: 1080,
    height: 1080,
    category: "spa",
    captionKey: "gallery.items.spa2",
    alt: "Exfoliating body scrub treatment",
    serviceId: "body-scrub",
  },
  {
    id: "spa-3",
    type: "image",
    path: "gallery/spa/relaxation-1.jpg",
    width: 1080,
    height: 1350,
    category: "spa",
    captionKey: "gallery.items.spa3",
    alt: "Tranquil spa environment",
  },

  // Massage Category
  {
    id: "massage-1",
    type: "image",
    path: "gallery/massage/swedish-1.jpg",
    width: 1080,
    height: 1350,
    category: "massage",
    captionKey: "gallery.items.massage1",
    alt: "Swedish massage session",
    serviceId: "swedish-massage",
  },
  {
    id: "massage-2",
    type: "image",
    path: "gallery/massage/deep-tissue-1.jpg",
    width: 1080,
    height: 1080,
    category: "massage",
    captionKey: "gallery.items.massage2",
    alt: "Deep tissue massage therapy",
    serviceId: "deep-tissue-massage",
  },

  // Example video item (optional)
  {
    id: "video-1",
    type: "video",
    path: "gallery/videos/spa-tour.mp4",
    thumbnailPath: "gallery/videos/spa-tour-thumb.jpg",
    width: 1920,
    height: 1080,
    category: "spa",
    captionKey: "gallery.items.video1",
    alt: "Virtual tour of our spa facilities",
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
