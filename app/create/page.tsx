"use client";

import dynamic from "next/dynamic";

const CreatePost = dynamic(() => import("@/components/CreatePost"), {
  ssr: false,
});

export default function Create() {
  return <CreatePost />;
}
