"use client";

import { PricingTable } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage subscriptions and plans with Clerk Billing.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <PricingTable appearance={clerkAppearance} />
        </div>
      </div>
    </div>
  );
}
