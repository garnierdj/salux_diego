"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground rounded-2xl shadow-2xl border p-8">
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Go to home">
              <Logo className="cursor-pointer" />
            </Link>
          </div>

          <SignIn routing="path" path="/login" signUpUrl="/register" />
        </div>
      </div>
    </div>
  );
}
