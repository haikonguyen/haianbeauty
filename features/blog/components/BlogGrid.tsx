import type { BlogListItem } from "../types";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogListItem[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
