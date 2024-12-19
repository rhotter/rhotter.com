import { formatDate } from "@/lib/formatDate";
import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

const Page = async () => {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, idx) => (
        <Link
          key={idx}
          href={`/posts/${post.slug}`}
          className="flex items-center text-gray-600 hover:text-gray-800 no-underline"
        >
          <span className="w-28 flex-shrink-0 font-normal text-gray-400">
            {formatDate(post.date)}
          </span>
          <span>{post.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Page;
