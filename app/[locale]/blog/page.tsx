import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCachedBlogPosts } from "@/features/blog/services/notion";
import { BlogPageClient } from "./BlogPageClient";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getCachedBlogPosts(locale);

  return <BlogPageClient posts={posts} />;
}
