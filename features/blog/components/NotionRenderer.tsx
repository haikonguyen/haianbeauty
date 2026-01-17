"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface NotionRendererProps {
  // biome-ignore lint/suspicious/noExplicitAny: Notion blocks can be complex
  content: any[];
}

export function NotionRenderer({ content }: NotionRendererProps) {
  if (!content || content.length === 0) {
    return <div className="text-muted-foreground">No content available.</div>;
  }

  return (
    <div className="notion-content space-y-4">
      {content.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: Notion blocks can be complex
function NotionBlock({ block }: { block: any }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4 leading-relaxed text-foreground">
          <RichText richText={block.paragraph?.rich_text || []} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="mb-4 mt-8 font-serif text-3xl font-bold text-foreground md:text-4xl">
          <RichText richText={block.heading_1?.rich_text || []} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="mb-3 mt-6 font-serif text-2xl font-bold text-foreground md:text-3xl">
          <RichText richText={block.heading_2?.rich_text || []} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="mb-2 mt-4 font-serif text-xl font-semibold text-foreground md:text-2xl">
          <RichText richText={block.heading_3?.rich_text || []} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <ul className="mb-2 ml-6 list-disc">
          <li className="mb-1 leading-relaxed text-foreground">
            <RichText richText={block.bulleted_list_item?.rich_text || []} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="mb-2 ml-6 list-decimal">
          <li className="mb-1 leading-relaxed text-foreground">
            <RichText richText={block.numbered_list_item?.rich_text || []} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-primary bg-muted/50 py-3 pl-6 pr-4 italic text-foreground">
          <RichText richText={block.quote?.rich_text || []} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-sm text-foreground">
            {block.code?.rich_text?.[0]?.plain_text || ""}
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-8 border-border" />;

    case "image": {
      // biome-ignore lint/suspicious/noExplicitAny: Notion image block type
      const imageUrl =
        (block.image as any)?.file?.url || (block.image as any)?.external?.url;
      return imageUrl ? (
        <div className="my-6">
          <img
            src={imageUrl}
            alt={block.image?.caption?.[0]?.plain_text || "Image"}
            className="rounded-lg"
          />
        </div>
      ) : null;
    }

    default:
      return null;
  }
}

// biome-ignore lint/suspicious/noExplicitAny: Notion rich text can be complex
function RichText({ richText }: { richText: any[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, index) => {
        const key = `${text.plain_text}-${index}`;
        let content = text.plain_text;

        if (text.href) {
          content = (
            <a
              href={text.href}
              className="font-medium text-primary underline decoration-primary/30 transition-colors hover:decoration-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        if (text.annotations?.bold) {
          content = <strong className="font-semibold">{content}</strong>;
        }

        if (text.annotations?.italic) {
          content = <em>{content}</em>;
        }

        if (text.annotations?.code) {
          content = (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {content}
            </code>
          );
        }

        if (text.annotations?.strikethrough) {
          content = <s>{content}</s>;
        }

        if (text.annotations?.underline) {
          content = <u>{content}</u>;
        }

        return <span key={key}>{content}</span>;
      })}
    </>
  );
}
