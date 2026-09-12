import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "IMLeagues Demo",
  robots: { index: false, follow: false },
};

export default function IMLeaguesImagePage() {
  return (
    <main style={{ minHeight: "100svh", background: "#fff" }}>
      <Image
        src="/bevofit-imgs/imleagues.png"
        alt="IMLeagues logged-in demo screenshot"
        width={1206}
        height={2622}
        unoptimized
        preload
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </main>
  );
}
