"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import Logo from "@/components/Logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-xl">
          <div className="flex justify-center mb-6">
            <Link href="/" aria-label="Go to home">
              <Logo className="cursor-pointer" />
            </Link>
          </div>

          <SignUp routing="path" path="/register" signInUrl="/login" />
        </div>
      </div>
    </div>
  );
}
