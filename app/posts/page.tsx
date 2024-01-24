import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

const Page = async () => {
  const posts = await getPosts();

  return (
    <div className="flex gap-4">
      {posts.map((post, idx) => (
        <div key={idx}>
          <Link
            href={`/posts/${post.slug}`}
            className="text-gray-600 hover:text-gray-800"
          >
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
