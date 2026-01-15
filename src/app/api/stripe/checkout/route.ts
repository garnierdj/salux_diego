import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripePost } from "@/lib/stripe";

type StripeCheckoutSession = {
  id: string;
  url: string | null;
};

type StripeCustomer = {
  id: string;
};

const planPriceMap: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();
    if (typeof plan !== "string" || !(plan in planPriceMap)) {
      return NextResponse.json({ error: "Invalid plan selection" }, { status: 400 });
    }

    const priceId = planPriceMap[plan];
    if (!priceId) {
      return NextResponse.json(
        { error: "Missing Stripe price configuration for plan." },
        { status: 500 }
      );
    }

    const userId = session.user.id;
    const [user, contact, existingCustomer] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { firstName: true, lastName: true },
      }),
      prisma.userContact.findFirst({
        where: { userId },
        select: { primaryEmail: true },
      }),
      prisma.billingCustomer.findUnique({
        where: { userId },
      }),
    ]);

    let stripeCustomerId = existingCustomer?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customerParams = new URLSearchParams();
      if (contact?.primaryEmail) {
        customerParams.set("email", contact.primaryEmail);
      }
      if (user?.firstName || user?.lastName) {
        customerParams.set("name", `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim());
      }
      customerParams.set("metadata[userId]", userId);

      const customer = await stripePost<StripeCustomer>("/customers", customerParams);
      stripeCustomerId = customer.id;

      await prisma.billingCustomer.create({
        data: {
          userId,
          stripeCustomerId,
        },
      });
    }

    const origin = headers().get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const sessionParams = new URLSearchParams();
    sessionParams.set("mode", "subscription");
    sessionParams.set("customer", stripeCustomerId);
    sessionParams.set("line_items[0][price]", priceId);
    sessionParams.set("line_items[0][quantity]", "1");
    sessionParams.set("success_url", `${origin}/settings?checkout=success`);
    sessionParams.set("cancel_url", `${origin}/settings?checkout=cancel`);
    sessionParams.set("billing_address_collection", "auto");
    sessionParams.set("allow_promotion_codes", "false");
    sessionParams.set("subscription_data[metadata][userId]", userId);
    sessionParams.set("subscription_data[metadata][plan]", plan);

    const stripeSession = await stripePost<StripeCheckoutSession>("/checkout/sessions", sessionParams);

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
