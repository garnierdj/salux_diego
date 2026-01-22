"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const forceRedirectUrl = origin ? `${origin}/dashboard-test` : "/dashboard-test";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <SignUp path="/sign-up" routing="path" forceRedirectUrl={forceRedirectUrl} />
      </div>
    </div>
  );
}
