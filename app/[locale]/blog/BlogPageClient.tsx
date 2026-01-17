"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { BlogGrid } from "@/features/blog/components/BlogGrid";
import { CategoryFilter } from "@/features/blog/components/CategoryFilter";
import type { BlogCategory, BlogListItem } from "@/features/blog/types";

interface BlogPageClientProps {
  posts: BlogListItem[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all",
  );

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.category.includes(activeCategory));
  }, [posts, activeCategory]);

  // Calculate item counts per category
  const itemCounts: Record<BlogCategory | "all", number> = useMemo(() => {
    const counts: any = {
      all: posts.length,
      "customer-stories": 0,
      "beauty-tips": 0,
      promotions: 0,
      "behind-the-scenes": 0,
      news: 0,
    };

    for (const post of posts) {
      for (const cat of post.category) {
        if (counts[cat] !== undefined) {
          counts[cat]++;
        }
      }
    }

    return counts;
  }, [posts]);

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-12">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          itemCounts={itemCounts}
        />
      </div>

      {/* Blog Grid */}
      <div className="animate-fade-in">
        <BlogGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
