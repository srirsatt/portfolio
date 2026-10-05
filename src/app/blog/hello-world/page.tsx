import Link from "next/link";

export default function HelloWorld() {
  return (
    <main className="builds-page blog-post">
      <div className="mx-auto w-full max-w-md text-left">
        <Link
          href="/blog"
          className="builds-back"
        >
          ← back
        </Link>
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-6">hello world</h1>
        <div className="space-y-6 font-[var(--font-space-mono)] text-sm text-gray-500 leading-relaxed">
          <p>
            hi! my name is sriram, and i'm a 19 y/o developer currently studying at UT Austin. my essays will be my thoughts about whatever i find interesting, whether that be tech, music, or anything else.
          </p>
          <p>
            i'm not much of a writer, but i want to use this as a place to express my thoughts on whatever i'm currently building.
          </p>
        </div>
      </div>
    </main>
  );
}
