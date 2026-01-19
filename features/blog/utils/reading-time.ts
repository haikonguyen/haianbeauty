import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Calculate estimated reading time for blog content
 * @param content - Notion blocks or text content
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(
  content: (PartialBlockObjectResponse | BlockObjectResponse)[] | string,
): number {
  if (!content) return 1;

  let wordCount = 0;

  if (typeof content === "string") {
    wordCount = countWordsInString(content);
  } else if (Array.isArray(content)) {
    wordCount = countWordsInBlocks(content);
  }

  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
}

function countWordsInString(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

function countWordsInBlocks(
  blocks: (PartialBlockObjectResponse | BlockObjectResponse)[],
): number {
  let count = 0;

  for (const block of blocks) {
    if (!("type" in block)) continue;

    const richText = getRichTextFromBlock(block);
    if (richText) {
      for (const text of richText) {
        if (text.plain_text) {
          count += countWordsInString(text.plain_text);
        }
      }
    }
  }
  return count;
}

function getRichTextFromBlock(
  block: BlockObjectResponse,
): RichTextItemResponse[] | undefined {
  switch (block.type) {
    case "paragraph":
      return block.paragraph.rich_text;
    case "heading_1":
      return block.heading_1.rich_text;
    case "heading_2":
      return block.heading_2.rich_text;
    case "heading_3":
      return block.heading_3.rich_text;
    case "callout":
      return block.callout.rich_text;
    case "quote":
      return block.quote.rich_text;
    default:
      return undefined;
  }
}
