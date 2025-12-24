import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn("❌ content folder not found:", CONTENT_DIR);
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, file);
      const { data } = matter(fs.readFileSync(filePath, "utf-8"));

      return {
        slug,
        metadata: {
          title: data.title ?? "Untitled",
          publishedAt: data.publishedAt ?? "",
          summary: data.summary ?? "",
          image: data.image,
        },
      };
    });
}
