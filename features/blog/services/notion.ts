import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";
import type {
  BlogCategory,
  BlogListItem,
  BlogMediaType,
  BlogPost,
} from "../types";
import { calculateReadingTime } from "../utils/reading-time";

// Lazy initialization of a Notion client with a specific API version
function getNotionClient() {
  return new Client({
    auth: process.env.NOTION_API_KEY,
    notionVersion: "2022-02-22",
  });
}

const DATABASE_IDS = {
  cs: process.env.NOTION_DATABASE_ID_CS || "",
  en: process.env.NOTION_DATABASE_ID_EN || "",
  vi: process.env.NOTION_DATABASE_ID_VI || "",
  ru: process.env.NOTION_DATABASE_ID_RU || "",
};

// Type-safe helper functions for extracting Notion property values
type NotionProperties = PageObjectResponse["properties"];

function getRichTextValue(properties: NotionProperties, key: string): string {
  const prop = properties[key];
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text[0].plain_text;
  }
  return "";
}

function getTitleValue(properties: NotionProperties, key: string): string {
  const prop = properties[key];
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title[0].plain_text;
  }
  return "";
}

function getUrlValue(
  properties: NotionProperties,
  key: string,
): string | undefined {
  const prop = properties[key];
  if (prop?.type === "url") {
    return prop.url || undefined;
  }
  return undefined;
}

function getSelectValue(properties: NotionProperties, key: string): string {
  const prop = properties[key];
  if (prop?.type === "select" && prop.select) {
    return prop.select.name;
  }
  return "";
}

function getMultiSelectValues(
  properties: NotionProperties,
  key: string,
): string[] {
  const prop = properties[key];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
}

function getDateValue(properties: NotionProperties, key: string): string {
  const prop = properties[key];
  if (prop?.type === "date" && prop.date) {
    return prop.date.start;
  }
  return "";
}

function getNumberValue(properties: NotionProperties, key: string): number {
  const prop = properties[key];
  if (prop?.type === "number" && prop.number !== null) {
    return prop.number;
  }
  return 0;
}

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

    const posts: BlogListItem[] = response.results.map((page) => {
      const pageData = page as PageObjectResponse;
      const properties = pageData.properties;

      // Get featured image from property or fall back to page cover
      let coverUrl: string | undefined;
      if (pageData.cover?.type === "external") {
        coverUrl = pageData.cover.external.url;
      } else if (pageData.cover?.type === "file") {
        coverUrl = pageData.cover.file.url;
      }

      const featuredImage =
        getUrlValue(properties, "Featured Image") || coverUrl;

      return {
        id: pageData.id,
        slug: getRichTextValue(properties, "Slug"),
        title: getTitleValue(properties, "Title") || "Untitled",
        excerpt: getRichTextValue(properties, "Excerpt"),
        featuredImage,
        videoUrl: getUrlValue(properties, "Video URL"),
        mediaType: (getSelectValue(properties, "Media Type").toLowerCase() ||
          "text") as BlogMediaType,
        category: getMultiSelectValues(
          properties,
          "Category",
        ) as BlogCategory[],
        publishedDate: getDateValue(properties, "Published Date"),
        readingTime: getNumberValue(properties, "Reading Time") || 5,
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

    const pageData = response.results[0] as PageObjectResponse;
    const properties = pageData.properties;

    // Fetch the page content blocks
    const blocks = await notion.blocks.children.list({
      // biome-ignore lint/style/useNamingConvention: Notion API uses snake_case
      block_id: pageData.id,
    });

    // Get featured image from property or fall back to page cover
    let coverUrl: string | undefined;
    if (pageData.cover?.type === "external") {
      coverUrl = pageData.cover.external.url;
    } else if (pageData.cover?.type === "file") {
      coverUrl = pageData.cover.file.url;
    }

    const featuredImage = getUrlValue(properties, "Featured Image") || coverUrl;

    return {
      id: pageData.id,
      slug: getRichTextValue(properties, "Slug"),
      title: getTitleValue(properties, "Title") || "Untitled",
      excerpt: getRichTextValue(properties, "Excerpt"),
      content: blocks.results,
      featuredImage,
      videoUrl: getUrlValue(properties, "Video URL"),
      mediaType: (getSelectValue(properties, "Media Type").toLowerCase() ||
        "text") as BlogMediaType,
      category: getMultiSelectValues(properties, "Category") as BlogCategory[],
      tags: getMultiSelectValues(properties, "Tags"),
      publishedDate: getDateValue(properties, "Published Date"),
      readingTime:
        getNumberValue(properties, "Reading Time") ||
        calculateReadingTime(blocks.results),
      seoDescription: getRichTextValue(properties, "SEO Description"),
      canonicalUrl: getUrlValue(properties, "Canonical URL"),
      ogImage: getUrlValue(properties, "OG Image"),
      twitterImage: getUrlValue(properties, "Twitter Image"),
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
function getAvailableLanguages(properties: NotionProperties): string[] {
  const languages: string[] = [];

  if (getUrlValue(properties, "Translation CS")) languages.push("cs");
  if (getUrlValue(properties, "Translation EN")) languages.push("en");
  if (getUrlValue(properties, "Translation VI")) languages.push("vi");
  if (getUrlValue(properties, "Translation RU")) languages.push("ru");

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
