import Link from "next/link";

export default function HelloWorld() {
  return (
    <div className="min-h-screen flex items-center pl-[35vw] py-20">
      <div className="relative text-left max-w-md w-full">
        <Link
          href="/essays"
          className="absolute -top-12 left-0 font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors"
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
    </div>
  );
}
