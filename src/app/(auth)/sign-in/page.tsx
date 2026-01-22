"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  // Use forceRedirectUrl to ensure SSO callbacks land on /dashboard-test
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const forceRedirectUrl = origin ? `${origin}/dashboard-test` : "/dashboard-test";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <SignIn path="/sign-in" routing="path" forceRedirectUrl={forceRedirectUrl} />
      </div>
    </div>
  );
}
