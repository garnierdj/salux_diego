// src/app/(app)/dashboard/page.tsx

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    const { userId } = await auth();

    // If no session → redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    // Fetch full user data from Clerk
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId as string).catch(() => null);

    const user = {
        id: clerkUser?.id ?? (userId as string),
        name: clerkUser?.firstName ?? clerkUser?.fullName ?? "",
        email:
            // Clerk stores primary email under `primaryEmailAddress.emailAddress` in newer versions
            (clerkUser as any)?.primaryEmailAddress?.emailAddress ??
            (clerkUser as any)?.emailAddresses?.[0]?.emailAddress ??
            "",
        image: (clerkUser as any)?.profileImageUrl ?? null,
    };

    return (
        <main className="min-h-screen w-full bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-6xl">
                {/* DashboardClient expects a `user` prop with id/name/email/image */}
                <DashboardClient user={user} />
            </div>
        </main>
    );
}
