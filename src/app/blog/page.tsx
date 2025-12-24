import BlurFade from "@/components/magicui/blur-fade";
import { getAllPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <section>
      <ul className="space-y-6">
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <BlurFade>
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-medium"
              >
                {post.metadata.title}
              </Link>
              <p className="text-sm text-neutral-500">
                {post.metadata.summary}
              </p>
            </BlurFade>
          </li>
        ))}
      </ul>
    </section>
  );
}
