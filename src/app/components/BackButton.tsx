import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/blog" className="builds-back" aria-label="Back to blog">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 6-6 6 6 6" />
      </svg>
    </Link>
  );
}
