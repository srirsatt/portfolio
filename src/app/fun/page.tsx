import Link from "next/link";

export default function Fun() {
    return (
        <div className="min-h-screen flex items-center pl-[35vw] py-20">
            <div className="relative text-left max-w-md w-full">
                <Link
                    href="/"
                    className="absolute -top-12 left-0 font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors"
                >
                    ← back
                </Link>
                <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-4">fun</h1>
                <div className="space-y-6 font-[var(--font-space-mono)] text-sm">
                    <p className="text-gray-400 italic">nothing here ... yet. coming soon.</p>
                </div>
            </div>
        </div>
    );
}
