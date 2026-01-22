import { NextResponse } from "next/server";

// Legacy NextAuth endpoint disabled because Clerk is the active auth provider.
// If you need this behavior restored, re-add NextAuth and restore the original handler.

export async function GET() {
  return NextResponse.json({ error: "NextAuth disabled" }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "NextAuth disabled" }, { status: 404 });
}
