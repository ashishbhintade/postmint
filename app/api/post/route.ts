import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  if (!cid) {
    return NextResponse.json({ error: "CID is required" }, { status: 400 });
  }

  const res = await fetch(`https://postmintbackend.onrender.com/post/${cid}`);
  const data = await res.json();
  return NextResponse.json(data);
}
