import { NextResponse, NextRequest } from "next/server";
import contentConfig from '@/config/content.json';

export async function POST(_req: NextRequest) {
  const message =
    contentConfig?.global?.ui?.messages?.billingDisabled ||
    'Billing portal is currently unavailable.';
  return NextResponse.json({ error: message }, { status: 503 });
}
