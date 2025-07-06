import PostView from "@/components/Post";
import { notFound } from "next/navigation";

type Post = {
  title: string;
  user: string;
  created_at: string;
  description: string;
};

export default async function PostPage({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?cid=${cid}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return (
    <PostView
      title={post.title}
      user={post.user}
      created_at={post.created_at}
      description={post.description}
    />
  );
}
