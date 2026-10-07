import Link from "next/link";

export default function Blog() {
  return (
    <main className="builds-page">
      <div className="builds-shell">
        <h1 className="sr-only">Blog</h1>
        <article className="mx-auto mb-10 max-w-2xl">
          <time dateTime="2026-10-06" className="text-xs text-[var(--subtle)]">
            Oct 6, 2026
          </time>
          <h2 className="mt-2 text-sm">
            <Link href="/blog/t4-memory-bandwidth" className="underline underline-offset-4 transition-opacity hover:opacity-60">
              Day 1: How fast can a T4 actually move memory?
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Starting eight weeks of learning LLM inference from the GPU up by measuring real memory bandwidth on a Tesla T4.
          </p>
        </article>
        <article className="mx-auto max-w-2xl">
          <time dateTime="2026-10-03" className="text-xs text-[var(--subtle)]">
            Oct 3, 2026
          </time>
          <h2 className="mt-2 text-sm">
            <Link href="/blog/ui-checks-with-jev-and-playwright" className="underline underline-offset-4 transition-opacity hover:opacity-60">
              UI Checks with Jev and Playwright
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            I’ve been experimenting with Jev by TypeSafe AI for checking UI changes. The idea: when a coding agent finishes an edit, compare what actually changed in the browser with what I asked for.
          </p>
        </article>
      </div>
    </main>
  );
}
