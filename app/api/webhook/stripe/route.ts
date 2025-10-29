import { NextResponse, NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Stripe webhooks are disabled because Supabase storage is not available. Please manage customer updates manually.",
    },
    { status: 503 }
  );
}
