/**
 * Calculate estimated reading time for blog content
 * @param content - Notion blocks or text content
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: any): number {
  if (!content) return 1;

  let wordCount = 0;

  // If content is a string, count words directly
  if (typeof content === "string") {
    wordCount = content
      .split(/\s+/)
      .filter((word: string) => word.length > 0).length;
  }
  // If content is Notion blocks array
  else if (Array.isArray(content)) {
    for (const block of content) {
      if (block.type === "paragraph" && block.paragraph?.rich_text) {
        for (const text of block.paragraph.rich_text) {
          if (text.plain_text) {
            wordCount += text.plain_text
              .split(/\s+/)
              .filter((word: string) => word.length > 0).length;
          }
        }
      }
      // Add support for other block types as needed
      else if (block.type === "heading_1" && block.heading_1?.rich_text) {
        for (const text of block.heading_1.rich_text) {
          if (text.plain_text) {
            wordCount += text.plain_text
              .split(/\s+/)
              .filter((word: string) => word.length > 0).length;
          }
        }
      } else if (block.type === "heading_2" && block.heading_2?.rich_text) {
        for (const text of block.heading_2.rich_text) {
          if (text.plain_text) {
            wordCount += text.plain_text
              .split(/\s+/)
              .filter((word: string) => word.length > 0).length;
          }
        }
      } else if (block.type === "heading_3" && block.heading_3?.rich_text) {
        for (const text of block.heading_3.rich_text) {
          if (text.plain_text) {
            wordCount += text.plain_text
              .split(/\s+/)
              .filter((word: string) => word.length > 0).length;
          }
        }
      }
    }
  }

  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(wordCount / 200);

  // Minimum 1 minute
  return Math.max(1, readingTime);
}
