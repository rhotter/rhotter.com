import { cache } from "react";
import fs from "fs/promises";
import path from "path";

export interface Post {
  title: string;
  description: string;
  slug: string;
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
  console.log({ dirs });

  return Promise.all(
    dirs.map(async (dir): Promise<Post> => {
      // import the metadata and content from the MDX file
      const { metadata } = await import(`../app/posts/${dir}/page.mdx`);

      return {
        title: metadata.title,
        description: metadata.description,
        slug: dir,
      };
    })
  );
});
