export type BlogCategory =
  | "customer-stories"
  | "beauty-tips"
  | "promotions"
  | "behind-the-scenes"
  | "news";

export type BlogMediaType = "text" | "video" | "gallery";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any; // Notion blocks
  featuredImage?: string;
  videoUrl?: string;
  mediaType: BlogMediaType;
  category: BlogCategory[];
  tags: string[];
  publishedDate: string;
  readingTime: number;
  seoDescription?: string;
  translationLinks?: {
    cs?: string;
    en?: string;
    vi?: string;
    ru?: string;
  };
}

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  videoUrl?: string;
  mediaType: BlogMediaType;
  category: BlogCategory[];
  publishedDate: string;
  readingTime: number;
  availableLanguages: string[];
}
