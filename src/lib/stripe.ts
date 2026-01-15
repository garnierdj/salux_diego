const STRIPE_API_BASE = "https://api.stripe.com/v1";

function getStripeSecretKey() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }
  return stripeSecretKey;
}

export async function stripePost<T>(path: string, params: URLSearchParams): Promise<T> {
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStripeSecretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stripe API error (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
}
