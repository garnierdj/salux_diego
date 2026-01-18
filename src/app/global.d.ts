declare namespace JSX {
  interface IntrinsicElements {
    "stripe-pricing-table": {
      "pricing-table-id": string;
      "publishable-key": string;

      // Opcionales por si los usas
      "client-reference-id"?: string;
      "customer-email"?: string;
      "customer-session-client-secret"?: string;

      // Permite cualquier otro atributo HTML/custom sin pelearse con TS
      [key: string]: any;
    };
  }
}

export {};
