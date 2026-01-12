"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";

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

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) router.push("/log-in");
    else alert("Registration failed");
  };

  // Front-end only: no redirects yet (SSO will be wired later)
  const handleGoogleSSO = () => {
    // TODO: Implement Google SSO later (e.g., NextAuth provider)
    // Example later: signIn("google", { callbackUrl: "/dashboard" });
    console.log("Google SSO coming soon");
  };

  const handleAppleSSO = () => {
    // TODO: Implement Apple SSO later (e.g., NextAuth provider)
    // Example later: signIn("apple", { callbackUrl: "/dashboard" });
    console.log("Apple SSO coming soon");
  };

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

          {/* SSO Buttons (no redirect for now) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSSO}
              className="w-full border rounded-lg py-2.5 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <GoogleIcon className="h-5 w-5" />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={handleAppleSSO}
              className="w-full border rounded-lg py-2.5 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <AppleIcon className="h-5 w-5" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px w-full bg-gray-200" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          {/* Keep existing registration behavior intact */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold text-center mb-2">
              Create Your Account
            </h1>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="border p-2 rounded"
              />
            </div>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="border p-2 rounded w-full"
            />

            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
              className="border p-2 rounded w-full"
            />

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="border p-2 rounded w-full"
            />

            <input
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />

            <button
              disabled={loading}
              className="bg-black text-white rounded-lg w-full py-2 font-semibold"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          {/* Bottom: Sign in link if user already has an account */}
          <div className="mt-6">
            <Link
              href="/login"
              className="block w-full text-center border rounded-lg py-2.5 font-semibold hover:bg-gray-50 transition"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
