"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded: string[];
  highlighted: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "4.99",
    description: "For solo providers getting started with modern, secure workflows.",
    features: [
      "Up to 500 patients",
      "Core scheduling",
      "Electronic medical records (EMR)",
      "Patient portal",
      "Secure file uploads & storage",
      "Email support",
      "Mobile-friendly access",
    ],
    notIncluded: [
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
      "White-label options",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "7.99",
    description: "For growing practices that need speed, collaboration, and automation.",
    features: [
      "Up to 2,000 patients",
      "Advanced scheduling",
      "Electronic medical records (EMR)",
      "Patient portal",
      "Billing & payments",
      "Practice insights (basic analytics)",
      "Priority email support",
      "Mobile-friendly access",
      "API access",
    ],
    notIncluded: ["Custom integrations", "White-label options"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "14.99",
    description: "For organizations with complex requirements, compliance, and scale.",
    features: [
      "Unlimited patients",
      "Advanced scheduling",
      "Electronic medical records (EMR)",
      "Patient portal",
      "Billing & payments",
      "Advanced analytics & reporting",
      "Custom integrations",
      "24/7 support",
      "API access",
      "White-label options",
      "Dedicated account manager",
    ],
    notIncluded: [],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes. You can upgrade or downgrade at any time, and changes take effect immediately.",
  },
  {
    q: "Is there a contract?",
    a: "No. Plans are month-to-month. You can cancel whenever you want.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit cards. Enterprise plans can also support ACH and wire transfers.",
  },
  {
    q: "How do you protect patient data?",
    a: "Salux is built with security by design: strong authentication, access controls, and secure storage. We're happy to share security details during onboarding.",
  },
] as const;

export default function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Elegant, Transparent
              <span className="text-[#0066CC]"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600">
              Upgrade anytime as your practice grows—no long-term contracts.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              All plans include secure authentication, role-based access, and modern cloud infrastructure designed for healthcare workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl border-2 ${
                  plan.highlighted ? "border-[#0066CC] shadow-2xl md:scale-105" : "border-gray-200"
                } p-8 hover:shadow-xl transition-all duration-300`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0066CC] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Best Value
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    {plan.price === "Custom" ? (
                      <span className="text-4xl font-bold text-gray-900">Custom</span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-2">/month</span>
                      </>
                    )}
                  </div>

                  {plan.price !== "Custom" && <p className="mt-2 text-sm text-gray-500">Billed monthly. Cancel anytime.</p>}

                  {plan.price === "Custom" && (
                    <p className="mt-2 text-sm text-gray-500">
                      Tailored for multi-site teams, advanced needs, and custom security requirements.
                    </p>
                  )}
                </div>

                <Button
                  asChild
                  className={`w-full mb-6 ${
                    plan.highlighted ? "bg-[#0066CC] hover:bg-[#0052A3]" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  <Link href="/register">
                    {plan.price === "Custom" ? "Contact Sales" : "Create Account"}
                  </Link>
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-14 text-center">
            <p className="text-sm text-gray-500">
              Need help choosing? Start with Professional—most practices upgrade as soon as they want billing, insights, and API access.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
