import { cache } from "react";
import fs from "fs/promises";
import path from "path";

export interface Post {
  title: string;
  slug: string;
  date: string;
}

export interface PostMetadata {
  title: string;
  date: string;
}

function validateMetadata(metadata: any, slug: string): PostMetadata {
  if (!metadata.title) {
    throw new Error(`Missing title in post: ${slug}`);
  }
  if (!metadata.date) {
    throw new Error(
      `Missing date in post: ${slug}. Please add a date field to your MDX frontmatter (e.g., date: "2024-01-20")`
    );
  }

  // Validate date format
  const date = new Date(metadata.date);
  if (isNaN(date.getTime())) {
    throw new Error(
      `Invalid date format in post: ${slug}. Please use ISO format (e.g., "2024-01-20")`
    );
  }

  return {
    title: metadata.title,
    date: metadata.date,
  };
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const posts = await fs.readdir("app/posts/");

  // Map files to an array of promises
  const checkDirPromises = posts.map(async (file): Promise<string | null> => {
    const filePath = path.join("app/posts", file);
    const stats = await fs.stat(filePath);

    // Return the file name if it's a directory, else null
    return stats.isDirectory() ? file : null;
  });

  // Wait for all the checks to complete
  const dirs = (await Promise.all(checkDirPromises)).filter(
    (dir): dir is string => dir !== null
  );

  const postsData = await Promise.all(
    dirs.map(async (dir): Promise<Post> => {
      // import the metadata and content from the MDX file
      const { metadata } = await import(`../app/posts/${dir}/page.mdx`);

      // Validate metadata
      const validatedMetadata = validateMetadata(metadata, dir);

      return {
        title: validatedMetadata.title,
        slug: dir,
        date: validatedMetadata.date,
      };
    })
  );

  // Sort posts by date, most recent first
  return postsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
