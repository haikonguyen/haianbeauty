"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { GalleryFilters } from "@/features/gallery/components/GalleryFilters";
import { GalleryGrid } from "@/features/gallery/components/GalleryGrid";
import {
  GALLERY_ITEMS,
  getGalleryItemsByCategory,
} from "@/features/gallery/data/gallery-items";
import type { GalleryCategory } from "@/features/gallery/types";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const filteredItems = getGalleryItemsByCategory(activeCategory);

  // Calculate item counts per category
  const itemCounts: Record<GalleryCategory, number> = {
    all: GALLERY_ITEMS.length,
    nails: getGalleryItemsByCategory("nails").length,
    beauty: getGalleryItemsByCategory("beauty").length,
    spa: getGalleryItemsByCategory("spa").length,
    massage: getGalleryItemsByCategory("massage").length,
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12">
        <GalleryFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          itemCounts={itemCounts}
        />
      </div>

      {/* Gallery Grid */}
      <div className="animate-fade-in">
        <GalleryGrid items={filteredItems} />
      </div>
    </div>
  );
}
