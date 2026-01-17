"use client";

import { Calendar, Clock, Play } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { BlogListItem } from "../types";

interface BlogCardProps {
  post: BlogListItem;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      href={{
        pathname: "/blog/[slug]",
        params: { slug: post.slug },
      }}
      className="group block"
    >
      <article className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="font-serif text-4xl text-primary/20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Video indicator */}
          {post.mediaType === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                <Play className="h-8 w-8 text-primary" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          {post.category.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {t(`categories.${cat}`)}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-2 font-serif text-xl font-bold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{t("readingTime", { minutes: post.readingTime })}</span>
            </div>
          </div>

          {/* Language availability */}
          {post.availableLanguages.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{t("availableIn")}:</span>
              <div className="flex gap-1">
                {post.availableLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded bg-muted px-2 py-0.5 font-medium uppercase"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
