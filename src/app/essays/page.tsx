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
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-4">essays</h1>
        <div className="space-y-4 font-[var(--font-space-mono)] text-sm">
          <div className="flex items-start">
            <Link
              href="/essays/hello-world"
              className="w-[45%] shrink-0 pr-4 text-gray-800 hover:text-gray-400 transition-colors underline"
            >
              hello world
            </Link>
            <span className="text-gray-500 flex-1">
              hi! i'm sriram. welcome to my website.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
