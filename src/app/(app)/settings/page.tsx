import { CreateOrganization, OrganizationProfile } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            Organization Settings
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage team access, members, and organization details with Clerk.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <OrganizationProfile
              appearance={clerkAppearance}
              path="/settings"
              routing="path"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Create a new organization
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start a new workspace for your clinic or team.
            </p>
            <div className="mt-4">
              <CreateOrganization appearance={clerkAppearance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
