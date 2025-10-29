import { NextResponse, NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Supabase-powered billing is disabled. Please contact the venue directly for account or billing support.",
    },
    { status: 503 }
  );
}
