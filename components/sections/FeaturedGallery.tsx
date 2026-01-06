"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GalleryItemComponent } from "@/features/gallery/components/GalleryItem";
import { GalleryLightbox } from "@/features/gallery/components/GalleryLightbox";
import {
  GALLERY_ITEMS,
  getFeaturedGalleryItems,
} from "@/features/gallery/data/gallery-items";
import { Link } from "@/i18n/routing";

export function FeaturedGallery() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const featuredItems = getFeaturedGalleryItems(6);

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured Gallery Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {featuredItems.map((item, index) => (
            <GalleryItemComponent
              key={item.id}
              item={item}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">{t("viewFullPortfolio")}</Link>
          </Button>
        </div>

        {/* Lightbox */}
        <GalleryLightbox
          items={GALLERY_ITEMS}
          index={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
        />
      </div>
    </section>
  );
}
