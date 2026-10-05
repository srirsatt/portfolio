import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UI Checks with Jev and Playwright | Sriram Sattiraju",
  description: "An experiment with Jev and Playwright: comparing a coding agent’s UI changes with the original request, using accessibility diffs and browser health checks.",
};

const benchmarks = [
  ["Combined check, median / p95", "192 / 273 ms"],
  ["Jev request, median", "156 ms"],
  ["Agreement with predefined labels", "24/30 (80%)"],
  ["Seeded violations detected", "12/12"],
  ["Insufficient-evidence answers", "13/30"],
];

export default function JevUIChecks() {
  return (
    <main className="builds-page blog-post">
      <article className="mx-auto w-full max-w-2xl">
        <Link href="/blog" className="builds-back">← back</Link>
        <header className="mb-8">
          <h1 className="text-lg font-bold leading-relaxed">UI Checks with Jev and Playwright</h1>
          <time dateTime="2026-10-03" className="mt-2 block text-sm text-[var(--subtle)]">
            Oct 3, 2026
          </time>
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)] [&_code]:break-words [&_code]:text-[var(--foreground)]">
          <p>
            I’ve been experimenting with Jev by TypeSafe AI for checking UI changes. The idea: when a coding agent finishes an edit, compare what actually changed in the browser with what I asked for.
          </p>
          <p>
            For example, imagine asking for a “Remember me” checkbox and getting the checkbox, but losing the login button along the way. The page could still load without errors. I wanted a check that could flag that kind of change.
          </p>
          <p>
            I built <code>jev-uicheck-fast</code> around Playwright and TypeScript. Playwright captures the page’s accessibility tree before and after an edit: the headings, buttons, labels, and other accessible content. TypeScript computes a diff, then sends it with the original prompt to Jev.
          </p>
          <p>
            One request asks three questions: did the edit satisfy the request, did anything unrelated change, and did it remove or break an existing capability? Each answer is <code>satisfied</code>, <code>violated</code>, or <code>insufficient_evidence</code>, with probabilities. Console errors, failed requests, and other browser errors get checked locally too.
          </p>
          <p>
            The initial benchmark used 30 synthetic prompt/change pairs across login, shopping, and settings pages, repeated three times with real Jev calls. Label agreement uses only the first run of each case, with one question scored per case.
          </p>

          <table className="w-full border-collapse text-xs sm:text-sm">
            <caption className="sr-only">Initial benchmark results</caption>
            <thead className="text-[var(--foreground)]">
              <tr className="border-b border-[var(--subtle)]">
                <th scope="col" className="py-3 pr-4 text-left font-medium">Metric</th>
                <th scope="col" className="py-3 text-right font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map(([metric, result]) => (
                <tr key={metric} className="border-b border-[var(--subtle)]/25">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">{metric}</th>
                  <td className="whitespace-nowrap py-3 text-right tabular-nums">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            The timing uses a warm browser and includes the after-capture, diff, browser health checks, and Jev. Browser startup and the initial before-capture are excluded. The fixtures share templates, and a coding agent wrote the expected labels, so this is an early experiment with a small synthetic dataset.
          </p>
          <p>
            The interesting part for me was the uncertainty. Jev sometimes abstained on correct changes, and it made one unsupported judgment about a visual change. Accessibility text can show that a button exists; testing what happens when you click it requires more evidence. Colors and layout need screenshots too.
          </p>
          <p>
            So Jev’s judgments stay advisory. The project also has Claude Code and Codex hook adapters that capture before a task and check when the agent tries to finish. Confirmed browser errors can request up to three repairs. Those adapters have browser integration tests; live agent sessions still need validation.
          </p>
          <p>
            I’d like to add click-and-check scenarios next, then try a wider set of real apps. Lowk, getting useful feedback on an agent’s UI edits with this little overhead feels promising 😸.
          </p>
          <p className="text-[var(--foreground)]">
            <a href="https://github.com/srirsatt/jev-uicheck" className="underline underline-offset-4 hover:opacity-60">Code</a>
            {" · "}
            <a href="https://github.com/srirsatt/jev-uicheck/blob/main/benchmarks/RESULTS.md" className="underline underline-offset-4 hover:opacity-60">Benchmark details</a>
          </p>
        </div>
      </article>
    </main>
  );
}
