"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  cid: string;
  title: string;
  user: string;
  description: string;
};

export default function Posts() {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();
      setData(posts);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {data.map((post: Post, index: number) => (
        <div
          key={index}
          className={`${index === data.length - 1 ? "" : "border-b"} pb-6`}
        >
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-800">{post.user}</span>
          </div>

          <h2 className="text-xl font-bold mt-3 text-gray-900">
            <Link
              href={`/${post.cid}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-gray-700 mt-2">
            {post.description.length > 500
              ? post.description.slice(0, 500) + "..."
              : post.description}
          </p>
        </div>
      ))}
    </div>
  );
}
