"use client";

import { useTranslations } from "next-intl";
import type { BlogCategory } from "../types";

interface CategoryFilterProps {
  activeCategory: BlogCategory | "all";
  onCategoryChange: (category: BlogCategory | "all") => void;
  itemCounts?: Record<BlogCategory | "all", number>;
}

const categories: (BlogCategory | "all")[] = [
  "all",
  "customer-stories",
  "beauty-tips",
  "promotions",
  "behind-the-scenes",
  "news",
];

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  itemCounts,
}: CategoryFilterProps) {
  const t = useTranslations("blog.categories");

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const count = itemCounts?.[category] ?? 0;
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`
              rounded-full px-6 py-2.5 font-medium transition-all
              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }
            `}
          >
            {t(category)}
            {itemCounts && <span className="ml-2 opacity-70">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}
