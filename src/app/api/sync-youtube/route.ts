import { NextResponse } from "next/server";
import { getLiveVideos } from "@/lib/youtube";

export async function GET() {
  const result = await getLiveVideos();
  return NextResponse.json(
    {
      success: true,
      ...result,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    }
  );
}
