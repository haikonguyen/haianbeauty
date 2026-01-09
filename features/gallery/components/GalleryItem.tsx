"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "../types";
import {
  getGalleryImageUrl,
  getImageKitPlaceholder,
  getVideoThumbnail,
} from "../utils/imagekit";

interface GalleryItemProps {
  item: GalleryItem;
  onClick: () => void;
}

export function GalleryItemComponent({ item, onClick }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // For videos, use ImageKit's video thumbnail feature
  // ImageKit can extract a thumbnail from video by using ik-thumbnail.jpg
  const imageSrc =
    item.type === "video"
      ? item.path.startsWith("test/")
        ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        : item.thumbnailPath
          ? getVideoThumbnail(item.thumbnailPath)
          : `https://ik.imagekit.io/8qy7obkhf/${item.path}/ik-thumbnail.jpg`
      : getGalleryImageUrl(item.path);

  const placeholder = getImageKitPlaceholder(
    item.type === "video" && item.thumbnailPath
      ? item.thumbnailPath
      : item.path,
  );

  return (
    <button
      type="button"
      className="group relative w-full cursor-pointer overflow-hidden border-0 rounded-lg bg-muted p-0"
      onClick={onClick}
      aria-label={item.alt}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-500",
            "group-hover:scale-110",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL={placeholder}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Video play icon */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/90 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 fill-primary text-primary" />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
