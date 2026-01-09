export type GalleryCategory =
  | "all"
  | "nails"
  | "lashes"
  | "spa"
  | "massage"
  | "pmu";

export type MediaType = "image" | "video";

export interface GalleryItem {
  id: string;
  type: MediaType;
  // ImageKit.io path (relative to your endpoint)
  // Example: "gallery/nails/gel-manicure-1.jpg"
  path: string;
  // Image dimensions for layout calculation
  width: number;
  height: number;
  // Category for filtering
  category: GalleryCategory;
  // i18n translation key for caption
  captionKey?: string;
  // Alt text for accessibility (can also be i18n key)
  alt: string;
  // Optional: Link to related service
  serviceId?: string;
  // For videos: thumbnail image path
  thumbnailPath?: string;
}

export interface ImageKitTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "jpg" | "png";
  // Crop/resize strategy
  crop?: "maintain_ratio" | "force" | "at_least" | "at_max";
  // Focus area for smart cropping
  focus?: "auto" | "face" | "center";
  // Low Quality Image Placeholder
  blur?: number;
  // Progressive loading
  progressive?: boolean;
}

export interface GalleryFilterOption {
  value: GalleryCategory;
  labelKey: string;
  count?: number;
}
