import { NextResponse, NextRequest } from "next/server";
import contentConfig from '@/config/content.json';

// Supabase-backed checkout is disabled. Return a clear response for any callers.
export async function POST(_req: NextRequest) {
  const message =
    contentConfig?.global?.ui?.messages?.checkoutDisabled ||
    'Checkout is currently unavailable.';
  return NextResponse.json({ error: message }, { status: 503 });
}
