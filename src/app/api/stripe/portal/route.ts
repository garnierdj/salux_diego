import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripePost } from "@/lib/stripe";

type StripePortalSession = {
  id: string;
  url: string;
};

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const billingCustomer = await prisma.billingCustomer.findUnique({
      where: { userId: session.user.id },
    });

    if (!billingCustomer) {
      return NextResponse.json(
        { error: "No billing profile found for this account." },
        { status: 404 }
      );
    }

    const requestHeaders = await headers();
    const origin =
      requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const portalParams = new URLSearchParams();
    portalParams.set("customer", billingCustomer.stripeCustomerId);
    portalParams.set("return_url", `${origin}/settings?portal=return`);

    const portalSession = await stripePost<StripePortalSession>("/billing_portal/sessions", portalParams);

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
  }
}
