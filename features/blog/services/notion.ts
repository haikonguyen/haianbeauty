import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import type { BlogListItem, BlogPost } from "../types";
import { calculateReadingTime } from "../utils/reading-time";

// Lazy initialization of Notion client with specific API version
function getNotionClient() {
  return new Client({
    auth: process.env.NOTION_API_KEY,
    notionVersion: "2022-02-22", // Use older API version that supports databases.query
  });
}

const DATABASE_IDS = {
  cs: process.env.NOTION_DATABASE_ID_CS || "",
  en: process.env.NOTION_DATABASE_ID_EN || "",
  vi: process.env.NOTION_DATABASE_ID_VI || "",
  ru: process.env.NOTION_DATABASE_ID_RU || "",
};

/**
 * Fetch all published blog posts for a given locale
 */
export async function getBlogPosts(locale: string): Promise<BlogListItem[]> {
  const databaseId = DATABASE_IDS[locale as keyof typeof DATABASE_IDS];

  if (!databaseId) {
    console.error(`No database ID found for locale: ${locale}`);
    return [];
  }

  try {
    const notion = getNotionClient();
    const response = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: Notion API uses snake_case
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Done",
        },
      },
      sorts: [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
    });

    // biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
    const posts: BlogListItem[] = response.results.map((page: any) => {
      const properties = page.properties;

      // Get featured image from property or fall back to page cover
      const featuredImage =
        properties["Featured Image"]?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        undefined;

      return {
        id: page.id,
        slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
        title: properties.Title?.title?.[0]?.plain_text || "Untitled",
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
        featuredImage,
        videoUrl: properties["Video URL"]?.url || undefined,
        mediaType:
          properties["Media Type"]?.select?.name?.toLowerCase() || "text",
        category:
          properties.Category?.multi_select?.map(
            // biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
            (cat: any) => cat.name,
          ) || [],
        publishedDate: properties["Published Date"]?.date?.start || "",
        readingTime: properties["Reading Time"]?.number || 5,
        availableLanguages: getAvailableLanguages(properties),
      };
    });

    return posts;
  } catch (error) {
    console.error(`Error fetching blog posts for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  const databaseId = DATABASE_IDS[locale as keyof typeof DATABASE_IDS];

  if (!databaseId) {
    console.error(`No database ID found for locale: ${locale}`);
    return null;
  }

  try {
    const notion = getNotionClient();
    const response = await notion.databases.query({
      // biome-ignore lint/style/useNamingConvention: Notion API uses snake_case
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            // biome-ignore lint/style/useNamingConvention: Notion API uses snake_case
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Status",
            status: {
              equals: "Done",
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    // biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
    const page: any = response.results[0];
    const properties = page.properties;

    // Fetch the page content blocks
    const blocks = await notion.blocks.children.list({
      // biome-ignore lint/style/useNamingConvention: Notion API uses snake_case
      block_id: page.id,
    });

    // Get featured image from property or fall back to page cover
    const featuredImage =
      properties["Featured Image"]?.url ||
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      undefined;

    return {
      id: page.id,
      slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
      title: properties.Title?.title?.[0]?.plain_text || "Untitled",
      excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || "",
      content: blocks.results, // Notion blocks array
      featuredImage,
      videoUrl: properties["Video URL"]?.url || undefined,
      mediaType:
        properties["Media Type"]?.select?.name?.toLowerCase() || "text",
      category:
        properties.Category?.multi_select?.map(
          // biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
          (cat: any) => cat.name,
        ) || [],
      tags:
        properties.Tags?.multi_select?.map(
          // biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
          (tag: any) => tag.name,
        ) || [],
      publishedDate: properties["Published Date"]?.date?.start || "",
      readingTime:
        properties["Reading Time"]?.number ||
        calculateReadingTime(blocks.results),
      seoDescription:
        properties["SEO Description"]?.rich_text?.[0]?.plain_text || undefined,
      translationLinks: {
        cs: properties["Translation CS"]?.url || undefined,
        en: properties["Translation EN"]?.url || undefined,
        vi: properties["Translation VI"]?.url || undefined,
        ru: properties["Translation RU"]?.url || undefined,
      },
    };
  } catch (error) {
    console.error(
      `Error fetching blog post ${slug} for locale ${locale}:`,
      error,
    );
    return null;
  }
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllBlogSlugs(locale: string): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  return posts.map((post) => post.slug);
}

/**
 * Helper function to extract available languages from translation links
 */
// biome-ignore lint/suspicious/noExplicitAny: Notion API returns complex types
function getAvailableLanguages(properties: any): string[] {
  const languages: string[] = [];

  if (properties["Translation CS"]?.url) languages.push("cs");
  if (properties["Translation EN"]?.url) languages.push("en");
  if (properties["Translation VI"]?.url) languages.push("vi");
  if (properties["Translation RU"]?.url) languages.push("ru");

  return languages;
}

/**
 * Cached version of getBlogPosts for better performance
 */
export const getCachedBlogPosts = unstable_cache(
  async (locale: string) => getBlogPosts(locale),
  ["blog-posts"],
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ["blog"],
  },
);

/**
 * Cached version of getBlogPostBySlug for better performance
 */
export const getCachedBlogPostBySlug = unstable_cache(
  async (slug: string, locale: string) => getBlogPostBySlug(slug, locale),
  ["blog-post"],
  {
    revalidate: 60,
    tags: ["blog"],
  },
);
