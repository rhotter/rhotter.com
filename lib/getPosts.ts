import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  description: string;
  slug: string;
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const posts = await fs.readdir("app/posts/");

  const checkDirPromises = posts.map(async (file): Promise<string | null> => {
    const filePath = path.join("app/posts", file);
    const stats = await fs.stat(filePath);

    return stats.isDirectory() ? file : null;
  });

  const dirs = (await Promise.all(checkDirPromises)).filter(
    (dir): dir is string => dir !== null
  );

  return Promise.all(
    dirs.map(async (dir): Promise<Post> => {
      const filePath = path.join("app/posts", dir, "page.mdx");
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data: metadata } = matter(fileContents);

      return {
        title: metadata.title,
        description: metadata.description,
        slug: dir,
      };
    })
  );
});
