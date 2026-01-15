"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type PlanOption = {
  key: "starter" | "pro" | "enterprise";
  name: string;
  price: string;
  description: string;
  highlighted?: boolean;
};

const planOptions: PlanOption[] = [
  {
    key: "starter",
    name: "Starter",
    price: "$4.99",
    description: "Great for getting started with a small team.",
  },
  {
    key: "pro",
    name: "Pro",
    price: "$7.99",
    description: "Ideal for growing practices.",
    highlighted: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "$14.99",
    description: "For organizations with advanced needs.",
  },
];

export default function BillingSettings() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (planKey: PlanOption["key"]) => {
    setError(null);
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to start checkout.");
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Stripe did not return a valid URL.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    setError(null);
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to open the portal.");
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Stripe did not return a valid URL.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Subscription</h2>
        <p className="mt-2 text-sm text-gray-600">
          Monthly recurring payments, no free trial. Choose the plan that fits your practice best.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {planOptions.map((plan) => (
          <div
            key={plan.key}
            className={`rounded-2xl border p-6 shadow-sm ${
              plan.highlighted ? "border-blue-500 bg-blue-50/50" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              <span className="text-lg font-semibold text-gray-900">{plan.price}</span>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={() => handleCheckout(plan.key)}
              disabled={loadingPlan === plan.key}
            >
              {loadingPlan === plan.key ? "Redirecting..." : "Subscribe"}
            </Button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Manage your plan</h3>
        <p className="mt-2 text-sm text-gray-600">
          If you already have an active subscription, use the portal to switch between Starter, Pro, or Enterprise.
        </p>
        <Button className="mt-4" variant="outline" onClick={handlePortal} disabled={portalLoading}>
          {portalLoading ? "Opening portal..." : "Open billing portal"}
        </Button>
      </div>
    </div>
  );
}
