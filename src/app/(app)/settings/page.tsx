import BillingSettings from "@/components/billing/BillingSettings";

export default function Page() {
  return (
    <div className="space-y-8 p-10 text-gray-800">
      <div>
        <h1 className="text-3xl font-bold capitalize">settings</h1>
        <p className="mt-4 text-gray-600">This is the settings page.</p>
      </div>
      <BillingSettings />
    </div>
  );
}
