import Link from "next/link";

export default function Essays() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12">
            <div className="relative w-full max-w-md text-left">
                <Link
                    href="/"
                    className="absolute -top-12 left-0 font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors"
                >
                    ← back
                </Link>
                <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-4">music</h1>
                <div className="space-y-4 font-[var(--font-space-mono)] text-sm">
                    <p className="text-gray-400 italic">nothing here ... yet. coming soon.</p>
                </div>
            </div>
        </div>
    );
}
