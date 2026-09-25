import ThingsNav from "../components/ThingsNav";
import Link from "next/link";

export default function Music() {
  return (
    <main className="builds-page">
      <ThingsNav active="music" />
      <div className="builds-shell">
        <Link href="/" className="builds-back">← back</Link>
        <h1 className="sr-only">Music</h1>
        <p className="text-sm text-gray-400">guitar, piano &amp; production. coming soon.</p>
      </div>
    </main>
  );
}
