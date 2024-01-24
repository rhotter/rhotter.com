import { getPosts } from "@/lib/getPosts";

const Page = async () => {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post, idx) => (
        <div key={idx}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
