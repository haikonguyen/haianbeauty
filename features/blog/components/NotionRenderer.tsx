"use client";

import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface NotionRendererProps {
  content: (PartialBlockObjectResponse | BlockObjectResponse)[];
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

function NotionBlock({
  block,
}: {
  block: PartialBlockObjectResponse | BlockObjectResponse;
}) {
  if (!("type" in block)) {
    return null;
  }

  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4 text-foreground leading-relaxed">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="mt-8 mb-4 font-bold font-serif text-3xl text-foreground md:text-4xl">
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="mt-6 mb-3 font-bold font-serif text-2xl text-foreground md:text-3xl">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="mt-4 mb-2 font-semibold font-serif text-foreground text-xl md:text-2xl">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <ul className="mb-2 ml-6 list-disc">
          <li className="mb-1 text-foreground leading-relaxed">
            <RichText richText={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="mb-2 ml-6 list-decimal">
          <li className="mb-1 text-foreground leading-relaxed">
            <RichText richText={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-6 border-primary border-l-4 bg-muted/50 py-3 pr-4 pl-6 text-foreground italic">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-foreground text-sm">
            {block.code.rich_text[0]?.plain_text || ""}
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-8 border-border" />;

    case "image": {
      const imageBlock = block as Extract<
        BlockObjectResponse,
        { type: "image" }
      >;
      let imageUrl: string | undefined;

      if (imageBlock.image.type === "external") {
        imageUrl = imageBlock.image.external.url;
      } else if (imageBlock.image.type === "file") {
        imageUrl = imageBlock.image.file.url;
      }

      return imageUrl ? (
        <div className="my-6">
          <img
            src={imageUrl}
            alt={imageBlock.image.caption?.[0]?.plain_text || "Image"}
            className="rounded-lg"
          />
        </div>
      ) : null;
    }

    default:
      return null;
  }
}

function RichText({ richText }: { richText: RichTextItemResponse[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, index) => {
        const key = `${text.plain_text}-${index}`;
        let content: React.ReactNode = text.plain_text;

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

        if (text.annotations.bold) {
          content = <strong className="font-semibold">{content}</strong>;
        }

        if (text.annotations.italic) {
          content = <em>{content}</em>;
        }

        if (text.annotations.code) {
          content = (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {content}
            </code>
          );
        }

        if (text.annotations.strikethrough) {
          content = <s>{content}</s>;
        }

        if (text.annotations.underline) {
          content = <u>{content}</u>;
        }

        return <span key={key}>{content}</span>;
      })}
    </>
  );
}
