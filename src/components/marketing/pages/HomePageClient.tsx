"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Cloud, FileText, Calendar, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePageClient() {
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative pt-16 pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
              >
                Modern Healthcare,{" "}
                <span className="text-[#0066CC]">Simplified</span>
                <br />
                for High-Performing Practices
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-xl text-gray-600 mb-8"
              >
                Salux is a secure, cloud-based platform that helps healthcare teams manage medical records, streamline scheduling,
                and reduce administrative work—so you can focus on patient care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button asChild size="lg" className="h-12 px-8 text-base bg-[#0066CC] hover:bg-[#0052A3]">
                  <Link href="/sign-up">
                    Create Account <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="https://salux-diego.vercel.app/pricing">View Pricing</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
                  <Shield className="w-4 h-4 text-[#0066CC]" />
                  Security-first
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
                  <Cloud className="w-4 h-4 text-[#0066CC]" />
                  Cloud-native
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1">
                  <Zap className="w-4 h-4 text-[#0066CC]" />
                  Fast workflows
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Value Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Built to run your practice with confidence</h2>
            <p className="mt-4 text-lg text-gray-600">
              An elegant experience for teams—backed by modern infrastructure, secure access controls, and scalable performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066CC] mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Access Control & Security</h3>
              <p className="text-gray-600">
                Role-based access, secure authentication, and privacy-first architecture designed for healthcare data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066CC] mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Modern Medical Records</h3>
              <p className="text-gray-600">
                Keep patient histories organized with structured records and secure file attachments—easy to find, easy to trust.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066CC] mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Scheduling that Fits Your Workflow</h3>
              <p className="text-gray-600">
                Streamlined scheduling and reminders that help reduce missed appointments and keep teams aligned.
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066CC] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Built for Teams</h3>
              <p className="text-gray-600">
                Designed for collaboration between providers, staff, and patients—with workflows that scale from solo practices to multi-clinic organizations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066CC] mb-6">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cloud Storage & Secure Uploads</h3>
              <p className="text-gray-600">
                Store documents safely with direct-to-cloud uploads and controlled access—optimized for performance and reliability.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
              <div className="text-left">
                <p className="text-base font-semibold text-gray-900">Ready to get started?</p>
                <p className="text-sm text-gray-600">Create your account in minutes and explore Salux today.</p>
              </div>
                <Button asChild className="bg-[#0066CC] hover:bg-[#0052A3] h-11 px-6">
                <Link href="/sign-up">
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
