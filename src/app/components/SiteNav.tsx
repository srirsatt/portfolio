"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/projects" },
  { label: "BLOG", href: "/blog" },
  { label: "MUSIC", href: "/music" },
];

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getIsDark() {
  return document.documentElement.dataset.theme !== "light";
}

export default function SiteNav() {
  const pathname = usePathname();
  const isDark = useSyncExternalStore(subscribeToTheme, getIsDark, () => true);
  const currentPath = pathname.replace(/\/$/, "") || "/";
  if (!navigation.some((item) => item.href === currentPath)) return null;

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => {
          const theme = getIsDark() ? "light" : "dark";
          document.documentElement.dataset.theme = theme;
          try {
            localStorage.setItem("theme", theme);
          } catch {
            // Keep the toggle working when browser storage is unavailable.
          }
        }}
      >
        {isDark ? <FiSun size={17} aria-hidden="true" /> : <FiMoon size={17} aria-hidden="true" />}
      </button>
    </header>
  );
}
