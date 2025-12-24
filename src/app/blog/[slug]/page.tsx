export const dynamic = "force-static";

import { getAllPosts } from "@/data/blog";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <section>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
