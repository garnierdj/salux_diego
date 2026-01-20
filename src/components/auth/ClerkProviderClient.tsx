"use client";

import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderClient({ children }: PropsWithChildren) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
}
