"use client";

import * as React from "react";
import Script from "next/script";
import { motion } from "framer-motion";

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
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
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

      {/* Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-4 md:p-8">
            <stripe-pricing-table
              pricing-table-id="prctbl_1Sqk0eCKkTO5w5FCQugnrfMO"
              publishable-key="pk_test_51SpiBWCKkTO5w5FCjAaAi8BPmgvv6XloqkpujxSFYUhvfosYazlX3hI0Eb2xMNgW5zfv62zqyjLJD0ZE2wP6jOmw00KWnMGPyU"
            ></stripe-pricing-table>
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
