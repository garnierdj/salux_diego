"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import DashboardClient from "@/app/(app)/dashboard/DashboardClient";

export default function DashboardWithClerk() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn || !user) {
    return <div className="min-h-screen flex items-center justify-center">Please sign in to view the dashboard.</div>;
  }

  const mappedUser = {
    id: (user as any)?.id || "",
    name:
      (user as any)?.firstName || (user as any)?.fullName || (user as any)?.username || ((user as any)?.primaryEmailAddress?.emailAddress) || "User",
    email: (user as any)?.primaryEmailAddress?.emailAddress || ((user as any)?.emailAddresses && (user as any).emailAddresses[0]?.emailAddress) || "",
    image: (user as any)?.profileImageUrl || null,
  };

  return <DashboardClient user={mappedUser} />;
}
