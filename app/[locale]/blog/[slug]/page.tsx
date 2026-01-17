import { Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NotionRenderer } from "@/features/blog/components/NotionRenderer";
import { SocialShare } from "@/features/blog/components/SocialShare";
import { VideoPlayer } from "@/features/blog/components/VideoPlayer";
import {
  getAllBlogSlugs,
  getCachedBlogPostBySlug,
} from "@/features/blog/services/notion";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 60;

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const slugs = await getAllBlogSlugs(locale);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getCachedBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = `${SITE_CONFIG.url}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getCachedBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pageUrl = `${SITE_CONFIG.url}/${locale}/blog/${slug}`;

  return (
    <article className="container mx-auto max-w-4xl px-4 pt-32 pb-16">
      {/* Post Header */}
      <header className="mb-8">
        {/* Categories */}
        {post.category.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.category.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {t(`categories.${cat}`)}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <time dateTime={post.publishedDate}>
              {formatDate(post.publishedDate)}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{t("readingTime", { minutes: post.readingTime })}</span>
          </div>
        </div>
      </header>

      {/* Featured Image or Video */}
      {post.mediaType === "video" && post.videoUrl ? (
        <div className="mb-8">
          <VideoPlayer url={post.videoUrl} title={post.title} />
        </div>
      ) : post.featuredImage ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {/* Post Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <NotionRenderer content={post.content} />
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Social Share */}
      <div className="mt-12 border-t pt-8">
        <SocialShare url={pageUrl} title={post.title} />
      </div>
    </article>
  );
}
