import type { ImageKitTransformOptions } from "../types";

const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
  "https://ik.imagekit.io/8qy7obkhf";

/**
 * Generate an ImageKit.io URL with transformations
 * @param path - Relative path to the image (e.g., "gallery/nails/image.jpg")
 * @param options - Transformation options
 * @returns Full ImageKit URL with transformations
 */
export function getImageKitUrl(
  path: string,
  options: ImageKitTransformOptions = {},
): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Build transformation string
  const transformations: string[] = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);
  if (options.crop) transformations.push(`c-${options.crop}`);
  if (options.focus) transformations.push(`fo-${options.focus}`);
  if (options.blur) transformations.push(`bl-${options.blur}`);
  if (options.progressive) transformations.push("pr-true");

  // Construct URL
  const baseUrl = IMAGEKIT_URL_ENDPOINT.endsWith("/")
    ? IMAGEKIT_URL_ENDPOINT
    : `${IMAGEKIT_URL_ENDPOINT}/`;

  if (transformations.length === 0) {
    return `${baseUrl}${cleanPath}`;
  }

  return `${baseUrl}tr:${transformations.join(",")}/${cleanPath}`;
}

/**
 * Generate responsive srcset for an image
 * @param path - Relative path to the image
 * @param widths - Array of widths for srcset
 * @returns srcset string
 */
export function getImageKitSrcSet(
  path: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920],
): string {
  return widths
    .map((width) => {
      const url = getImageKitUrl(path, {
        width,
        format: "auto",
        quality: 80,
      });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Generate a low-quality image placeholder (LQIP) for lazy loading
 * @param path - Relative path to the image
 * @returns Blurred, low-quality image URL
 */
export function getImageKitPlaceholder(path: string): string {
  return getImageKitUrl(path, {
    width: 20,
    quality: 20,
    blur: 10,
    format: "auto",
  });
}

/**
 * Generate a thumbnail URL for videos
 * @param videoPath - Relative path to the video
 * @param options - Transformation options for the thumbnail
 * @returns Thumbnail URL
 */
export function getVideoThumbnail(
  videoPath: string,
  options: ImageKitTransformOptions = {},
): string {
  // ImageKit can generate video thumbnails automatically
  // by appending transformation parameters
  return getImageKitUrl(videoPath, {
    width: options.width || 800,
    quality: options.quality || 80,
    format: "jpg",
    ...options,
  });
}

/**
 * Get optimized image URL for gallery grid display
 * @param path - Relative path to the image
 * @param width - Target width (default: 800px for grid items)
 * @returns Optimized image URL
 */
export function getGalleryImageUrl(path: string, width = 800): string {
  return getImageKitUrl(path, {
    width,
    quality: 85,
    format: "auto",
    crop: "maintain_ratio",
    progressive: true,
  });
}

/**
 * Get full-size image URL for lightbox display
 * @param path - Relative path to the image
 * @returns High-quality image URL
 */
export function getLightboxImageUrl(path: string): string {
  return getImageKitUrl(path, {
    width: 2400,
    quality: 90,
    format: "auto",
    progressive: true,
  });
}
