import Link from "next/link";

export default function ThingsNav({ active }: { active: "builds" | "music" | "blog" }) {
  return (
    <header className="things-header">
      <nav className="things-nav builds-title" aria-label="Output">
        <Link href="/projects" aria-current={active === "builds" ? "page" : undefined}>
          BUILDS
        </Link>
        <Link href="/music" aria-current={active === "music" ? "page" : undefined}>
          MUSIC
        </Link>
        <Link href="/blog" aria-current={active === "blog" ? "page" : undefined}>
          BLOG
        </Link>
      </nav>
    </header>
  );
}
