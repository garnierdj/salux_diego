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
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <stripe-pricing-table
            pricing-table-id="prctbl_1Sqk0eCKkTO5w5FCQugnrfMO"
            publishable-key="pk_test_51SpiBWCKkTO5w5FCjAaAi8BPmgvv6XloqkpujxSFYUhvfosYazlX3hI0Eb2xMNgW5zfv62zqyjLJD0ZE2wP6jOmw00KWnMGPyU"
          />
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
