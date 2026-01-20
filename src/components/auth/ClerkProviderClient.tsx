"use client";

import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

export default function ClerkProviderClient({
  children,
}: PropsWithChildren) {
  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
}
