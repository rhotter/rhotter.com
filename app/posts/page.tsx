import { formatDate } from "@/lib/formatDate";
import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 ml-2" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Page = async () => {
  const posts = await getPosts();

  const twitterThreads = [
    {
      date: "2025-01-05",
      title: "Why are MRIs so damn heavy?",
      url: "https://x.com/raffi_hotter/status/1876127020855529920",
    },
    {
      date: "2024-05-29",
      title: "The Neuralink compression challenge is mathematically impossible",
      url: "https://x.com/raffi_hotter/status/1795910298936705098",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
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

      <div className="flex flex-col gap-4">
        <h4 className="flex items-center">
          X Threads
          <TwitterIcon />
        </h4>
        {twitterThreads.map((thread, idx) => (
          <Link
            key={idx}
            href={thread.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-800 no-underline group"
          >
            <span className="w-28 flex-shrink-0 font-normal text-gray-400">
              {formatDate(thread.date)}
            </span>
            <span>{thread.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
