import Link from "next/link";
import ThingsNav from "../components/ThingsNav";

export default function Blog() {
  return (
    <main className="builds-page">
      <ThingsNav active="blog" />
      <div className="builds-shell">
        <Link href="/" className="builds-back">← back</Link>
        <h1 className="sr-only">Blog</h1>
        <p className="text-sm text-gray-400">posts coming soon. here &amp; on X.</p>
      </div>
    </main>
  );
}
