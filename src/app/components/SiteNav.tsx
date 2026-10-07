"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const highlight = highlightRef.current;
    const activeLabel = nav?.querySelector<HTMLElement>('[aria-current="page"] span');
    if (!nav || !highlight || !activeLabel) return;

    const updateHighlight = () => {
      const navBounds = nav.getBoundingClientRect();
      const labelBounds = activeLabel.getBoundingClientRect();
      const left = labelBounds.left - navBounds.left;
      const right = navBounds.right - labelBounds.right;
      highlight.style.clipPath = `inset(0 ${right}px 0 ${left}px)`;
    };

    updateHighlight();
    if (!nav.dataset.highlightReady) {
      // Establish the initial selection before enabling the sliding transition.
      highlight.getBoundingClientRect();
      nav.dataset.highlightReady = "true";
    }

    const observer = new ResizeObserver(updateHighlight);
    observer.observe(nav);
    observer.observe(activeLabel);
    return () => observer.disconnect();
  }, [currentPath]);

  if (!navigation.some((item) => item.href === currentPath)) return null;

  return (
    <header className="site-header">
      <nav ref={navRef} className="site-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>
            <span>{item.label}</span>
          </Link>
        ))}
        <span ref={highlightRef} className="site-nav-highlight" aria-hidden="true">
          {navigation.map((item) => <span key={item.href}>{item.label}</span>)}
        </span>
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
