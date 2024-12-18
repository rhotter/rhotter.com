import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

const formatDate = (dateStr: string) => {
  // Parse the date and force it to be interpreted at noon UTC
  // This ensures the date doesn't shift due to timezone differences
  const [year, month, day] = dateStr.split("-").map((num) => parseInt(num, 10));
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // Ensure consistent date display regardless of local timezone
  });
};

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
