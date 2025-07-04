import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Body before call :", body);

    if (!body) {
      return NextResponse.json(
        { error: "Missing caller or uri" },
        { status: 400 }
      );
    }

    // Forward the data to the external backend
    const response = await fetch(
      "https://postmintbackend.onrender.com/coin-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("Body after call", body);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to forward to backend:", errorText);
      return NextResponse.json({ error: "Failed to forward to backend" });
    }

    const data = await response.json();
    console.log("✅ Forwarded successfully:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error in /api/coin-details:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
