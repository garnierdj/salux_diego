"use client";

import { UserProfile } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-10">
      <UserProfile
        appearance={clerkAppearance}
        path="/profile"
        routing="path"
      />
    </div>
  );
}
