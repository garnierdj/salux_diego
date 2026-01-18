"use client";

import * as React from "react";
import Script from "next/script";

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
    </>
  );
}
