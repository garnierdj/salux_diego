"use client";

import Link from "next/link";
import { SignUp } from "@clerk/clerk-react";

import Logo from "@/components/Logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg rounded-xl">
          {/* Only the logo redirects to Home */}
          <div className="flex justify-center mb-6">
            <Link href="/" aria-label="Go to home">
              <Logo className="cursor-pointer" />
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h1>

          <div className="flex justify-center">
            <SignUp routing="path" path="/register" signInUrl="/login" />
          </div>
        </div>
      </div>
    </div>
  );
}
