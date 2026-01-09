"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { GalleryCategory, GalleryFilterOption } from "../types";

interface GalleryFiltersProps {
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
  itemCounts?: Record<GalleryCategory, number>;
}

export function GalleryFilters({
  activeCategory,
  onCategoryChange,
  itemCounts,
}: GalleryFiltersProps) {
  const t = useTranslations("gallery.filters");

  const filters: GalleryFilterOption[] = [
    { value: "all", labelKey: "all" },
    { value: "nails", labelKey: "nails" },
    { value: "lashes", labelKey: "lashes" },
    { value: "pmu", labelKey: "pmu" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {filters.map((filter) => {
        const isActive = activeCategory === filter.value;
        const count = itemCounts?.[filter.value];

        return (
          <Button
            key={filter.value}
            variant={isActive ? "default" : "outline"}
            size="lg"
            onClick={() => onCategoryChange(filter.value)}
            className={cn(
              "transition-all duration-300",
              isActive && "shadow-lg",
            )}
          >
            {t(filter.labelKey)}
            {count !== undefined && count > 0 && (
              <span className="ml-2 text-xs opacity-70">({count})</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
