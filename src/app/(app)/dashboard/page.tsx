// src/app/(app)/dashboard/page.tsx

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    const { userId } = auth();

    // If no session → redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
        redirect("/sign-in");
    }

    const name = [clerkUser.firstName, clerkUser.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

    const user = {
        id: clerkUser.id,
        name: name || clerkUser.username || "User",
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        image: clerkUser.imageUrl ?? null,
    };

    return (
        <main className="min-h-screen w-full bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <DashboardClient user={user} />
            </div>
        </main>
    );
}
