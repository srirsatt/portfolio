import Link from "next/link";

export default function Essays() {
  return (
    <div className="h-screen pt-[35vh] pl-[35vw]">
      <div className="text-left max-w-md">
        <Link
          href="/"
          className="font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors underline w-fit mb-8 block"
        >
          ← back
        </Link>
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-4">essays</h1>
        <div className="space-y-6 font-[var(--font-space-mono)] text-sm">
          <p className="text-gray-400 italic">nothing here ... yet. coming soon.</p>
        </div>
      </div>
    </div>
  );
}
