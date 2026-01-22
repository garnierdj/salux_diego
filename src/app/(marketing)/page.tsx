export default function MarketingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-4xl font-bold mb-4">Cooper Health Platform</h1>
            <p className="text-lg text-gray-600 max-w-xl mb-6">
                Your centralized health record and provider coordination hub.
            </p>
            <div className="flex gap-4">
                <a href="/sign-in" className="px-6 py-2 bg-black text-white rounded-lg">
                    Log In
                </a>
                <a href="/sign-up" className="px-6 py-2 border border-black rounded-lg">
                    Get Started
                </a>
            </div>
        </main>
    );
}
