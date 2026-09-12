import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "TeXercise Demo",
  robots: { index: false, follow: false },
};

export default function TeXerciseImagePage() {
  return (
    <main style={{ minHeight: "100svh", background: "#fff" }}>
      <Image
        src="/bevofit-imgs/texercise.png"
        alt="TeXercise logged-in demo screenshot"
        width={1206}
        height={2622}
        unoptimized
        preload
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </main>
  );
}
