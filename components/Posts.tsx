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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();
      setData(posts);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse space-y-3 border-b pb-6 last:border-none"
            >
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-[90%] bg-gray-300 rounded"></div>
              <div className="h-4 w-[80%] bg-gray-300 rounded"></div>
            </div>
          ))
        : data.map((post, index) => (
            <div
              key={index}
              className={`${index === data.length - 1 ? "" : "border-b"} pb-6`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-500 text-sm">
                  By{" "}
                  {post.user
                    ? `${post.user.slice(0, 5)}...${post.user.slice(-5)}`
                    : "0x3fb...0370d"}
                </span>
              </div>

              <h2 className="text-xl font-bold mt-3 text-gray-900">
                <Link href={`/post/${post.cid}`} className="hover:underline">
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
