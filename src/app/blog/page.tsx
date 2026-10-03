import Link from "next/link";

export default function Blog() {
  return (
    <main className="builds-page">
      <div className="builds-shell">
        <h1 className="sr-only">Blog</h1>
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
