// app/api/posts/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://postmintbackend.onrender.com/all-posts");
  const data = await res.json();
  return NextResponse.json(data);
}
