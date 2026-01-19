"use client";

import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryItem } from "../types";
import { GalleryItemComponent } from "./GalleryItem";
import { GalleryLightbox } from "./GalleryLightbox";

interface GalleryGridProps {
  items: GalleryItem[];
  isLoading?: boolean;
}

export function GalleryGrid({ items, isLoading = false }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons are static
          <Skeleton key={`skeleton-${i}`} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-lg text-muted-foreground">
          No gallery items found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <GalleryItemComponent
            key={item.id}
            item={item}
            onClick={() => {
              const index = items.findIndex((i) => i.id === item.id);
              setLightboxIndex(index);
            }}
          />
        ))}
      </div>

      <GalleryLightbox
        items={items}
        index={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
      />
    </>
  );
}
