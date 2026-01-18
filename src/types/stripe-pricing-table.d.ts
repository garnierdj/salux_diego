import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "pricing-table-id": string;
        "publishable-key": string;
        "client-reference-id"?: string;
        "customer-email"?: string;
        "customer-session-client-secret"?: string;
      };
    }
  }
}

// Extra: por si tu build usa el namespace global JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": any;
    }
  }
}

export {};
