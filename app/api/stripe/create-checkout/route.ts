import { NextResponse, NextRequest } from "next/server";

// Supabase-backed checkout is disabled. Return a clear response for any callers.
export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Supabase-powered checkout is currently disabled. Please contact the venue directly to complete your booking.",
    },
    { status: 503 }
  );
}
