"use client";

import * as React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M23.49 12.27c0-.85-.07-1.49-.22-2.16H12v4.09h6.63c-.13 1.01-.85 2.53-2.45 3.55l-.02.14 3.56 2.76.25.02c2.3-2.13 3.52-5.27 3.52-8.4Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.79-2.94c-1.01.71-2.36 1.2-4.16 1.2-3.17 0-5.86-2.13-6.82-5.08l-.13.01-3.69 2.87-.04.12C3.29 21.3 7.33 24 12 24Z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M5.18 14.28A7.41 7.41 0 0 1 4.76 12c0-.8.14-1.57.4-2.28l-.01-.15-3.74-2.91-.12.06A11.9 11.9 0 0 0 0 12c0 1.94.46 3.78 1.28 5.4l3.9-3.12Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 4.64c2.27 0 3.8.98 4.67 1.8l3.41-3.33C17.95 1.17 15.24 0 12 0 7.33 0 3.29 2.7 1.29 6.6l3.86 3c.98-2.95 3.66-4.96 6.85-4.96Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.365 1.43c0 1.14-.47 2.21-1.23 3.02-.86.9-2.29 1.6-3.51 1.5-.16-1.12.37-2.23 1.13-3.02.84-.88 2.34-1.55 3.61-1.5ZM20.58 17.22c-.6 1.36-.9 1.96-1.67 3.17-1.08 1.68-2.6 3.77-4.49 3.79-1.68.02-2.12-1.1-4.39-1.09-2.27.01-2.76 1.11-4.44 1.09-1.89-.02-3.33-1.9-4.41-3.57C.14 18.74-.92 12.2 1.61 8.92c1.27-1.65 3.26-2.62 5.13-2.62 1.9 0 3.1 1.1 4.68 1.1 1.54 0 2.48-1.1 4.66-1.1 1.67 0 3.43.9 4.69 2.45-4.11 2.25-3.45 8.09.81 8.47Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [form, setForm] = React.useState({ email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
    });
  };

  // Front-end only (placeholders). Later you'll swap to: signIn("google") / signIn("apple")
  const handleGoogleSSO = () => {
    // TODO: Enable Google provider in NextAuth, then replace with:
    // signIn("google", { callbackUrl: "/dashboard" });
    console.log("Google SSO clicked (frontend placeholder)");
  };

  const handleAppleSSO = () => {
    // TODO: Enable Apple provider in NextAuth, then replace with:
    // signIn("apple", { callbackUrl: "/dashboard" });
    console.log("Apple SSO clicked (frontend placeholder)");
  };

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

          {/* SSO Buttons (frontend only) */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 text-base"
              onClick={handleGoogleSSO}
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-6 text-base"
              onClick={handleAppleSSO}
            >
              <AppleIcon className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px w-full bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px w-full bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                Remember me
              </label>

              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-6 text-lg">
              Sign In <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
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
