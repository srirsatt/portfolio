import type { Metadata } from "next";
import Image from "next/image";
import BackButton from "../../components/BackButton";

export const metadata: Metadata = {
  title: "Internship links without Instagram | Sriram Sattiraju",
  description: "Why I built Sudo Scraper to bring zero2sudo’s internship stories to Telegram, with local Qwen3-VL inference and a review flow on my Mac mini.",
};

export default function SudoScraper() {
  return (
    <main className="builds-page blog-post">
      <article className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <div className="blog-title-row">
            <BackButton />
            <h1 className="text-lg font-bold leading-relaxed">Internship links without Instagram</h1>
          </div>
          <time dateTime="2026-11-05" className="mt-2 block text-sm text-[var(--subtle)]">
            Nov 5, 2026
          </time>
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)] [&_code]:break-words [&_code]:text-[var(--foreground)] [&_h2]:font-bold [&_h2]:text-[var(--foreground)]">
          <p>
            I wanted to get off Instagram, but there was one thing I kept going back for: the internship postings zero2sudo shares on their stories. Opening the app for an application link still meant opening the app, and it was easy to stick around longer than I meant to.
          </p>
          <p>
            So I built Sudo Scraper. It checks those stories, finds coding-related internships, and sends the application links to Telegram. I can check the opportunities without going through the feed.
          </p>

          <h2>How it works</h2>
          <p>
            Collection and inference run on my M4 Pro Mac mini with 24 GB of unified memory. The code is Python, and Qwen3-VL runs locally through Ollama. Telegram is the interface on my phone, so I didn’t need to build a separate app.
          </p>
          <figure>
            <div className="build-media">
              <Image
                className="build-image-light"
                src="/images/sudo-scraper-pipeline.svg"
                alt="Instagram stories and links pass through local Qwen3-VL inference to become Telegram job alerts. Uncertain results go through an Approve or Skip review step."
                fill
                sizes="(max-width: 768px) 88vw, 672px"
              />
              <Image
                className="build-image-dark"
                src="/images/sudo-scraper-pipeline-dark.svg"
                alt="Instagram stories and links pass through local Qwen3-VL inference to become Telegram job alerts. Uncertain results go through an Approve or Skip review step."
                fill
                sizes="(max-width: 768px) 88vw, 672px"
              />
            </div>
            <figcaption className="mt-3 text-xs text-[var(--subtle)]">
              A simplified view of the pipeline. Classification tries the linked job description before using vision.
            </figcaption>
          </figure>
          <p>
            The collector uses <code>instagrapi</code> to save the available images, videos, metadata, and original application URLs. The classifier works from those saved stories. Keeping collection separate means I can change the prompt or rerun inference without fetching everything from Instagram again.
          </p>
          <p>
            In auto mode, the classifier first tries to read the linked job description. If the page is blocked, ambiguous, or just a JavaScript shell, it falls back to looking at the story image or sampled video frames. The model returns a structured decision with a role, evidence, and a reason; a validation step checks for both an internship or co-op and coding-related work.
          </p>
          <p>
            The filter is deliberately broad. ML, robotics, scripting, automation, and hybrid roles can all count. Requiring “Software Engineer” in the title would leave out internships I’d still want to apply to.
          </p>

          <h2>When the model isn’t sure</h2>
          <p>
            Unclear stories go to a private Telegram review chat with their saved media and two buttons: Approve or Skip. That includes positive decisions based on sampled video frames, since a few frames can miss context and the pipeline doesn’t transcribe audio. I can review the story without opening Instagram.
          </p>
          <p>
            Review decisions live in SQLite, separately from the model’s output. An approval goes through the same delivery tracker as an automatic match, and it still needs an application link and has to pass the age and job-status checks. Unchanged stories keep their decisions across reruns and restarts.
          </p>

          <h2>Keeping it running</h2>
          <p>
            It’s been running on the Mac mini, with a watcher collecting, classifying, and delivering roughly every ten minutes, plus a separate worker handling review cards and button taps. A slow pass delays the next check. Saved downloads and cached classifications keep repeated passes from doing the same work again.
          </p>
          <p>
            A lot of the engineering ended up being about what happens around the model. Delivery is tracked per story and recipient, so restarting doesn’t resend confirmed alerts. If Telegram times out and the message might have arrived, the sender saves that ambiguity for inspection instead of blindly retrying.
          </p>
          <p>
            One surprisingly annoying bug was a library setting called <code>request_timeout</code>. I read it as a network timeout, but it actually meant “sleep before each request.” That explained a very slow collection run.
          </p>
          <p>
            It still depends on unofficial Instagram access, and stories can be missed. But the useful part is up and running: internship links arrive somewhere I already check, and getting to an application no longer requires a trip through Instagram.
          </p>
          <p className="text-[var(--foreground)]">
            <a href="https://github.com/srirsatt/sudo_scraper" className="underline underline-offset-4 hover:opacity-60">[Code]</a>
          </p>
        </div>
      </article>
    </main>
  );
}
