export const clerkAppearance = {
  variables: {
    colorPrimary: "#0066CC",
    colorText: "#111827",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#111827",
    colorAlphaShade: "#000000",
    fontFamily: "var(--font-geist-sans)",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "shadow-2xl border border-gray-200 rounded-2xl",
    headerTitle: "text-gray-900",
    headerSubtitle: "text-gray-500",
    socialButtonsBlockButton:
      "border-gray-200 hover:bg-gray-50 text-gray-700",
    formButtonPrimary: "bg-[#0066CC] hover:bg-[#0052A3]",
    footerActionLink: "text-[#0066CC] hover:text-[#0052A3]",
    formFieldInput:
      "border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]",
  },
} as const;
