"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/clerk-react";

import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-card text-card-foreground rounded-2xl shadow-2xl border p-8">
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Go to home">
              <Logo className="cursor-pointer" />
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in to access your dashboard
          </p>

          <div className="flex justify-center">
            <SignIn routing="path" path="/login" signUpUrl="/register" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
