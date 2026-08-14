"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import FirstLaunchWave from "./components/FirstLaunchWave";

const DEFAULT_NAME = "Sriram Sattiraju";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-";

const navigation = [
  { label: "BLOG", href: "/blog" },
  { label: "BUILDS", href: "/projects" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/srirsatt", label: "srirsatt", name: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sriram-sattiraju-4a4514150/", label: "sriram-sattiraju", name: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/SattirajuSriram", label: "@SattirajuSriram", name: "X" },
  { icon: FaGoogleScholar, href: "https://scholar.google.com/citations?user=AZf9PRMAAAAJ&hl=en", label: "Sriram Sattiraju", name: "Google Scholar" },
  { icon: MdEmail, href: "mailto:srirams@cs.utexas.edu", label: "srirams@cs.utexas.edu", name: "Email" },
];

function useScramble() {
  const [text, setText] = useState(DEFAULT_NAME);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrambleTo = useCallback((target: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let settled = 0;

    setText(
      target
        .split("")
        .map((character) => character === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
        .join("")
    );

    intervalRef.current = setInterval(() => {
      setText(
        target
          .split("")
          .map((character, index) => {
            if (index < settled || character === " ") return character;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      settled += 1;

      if (settled > target.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(target);
      }
    }, 28);
  }, []);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { text, scrambleTo };
}

export default function Home() {
  const { text, scrambleTo } = useScramble();

  useEffect(() => {
    const timer = window.setTimeout(() => scrambleTo(DEFAULT_NAME), 140);
    return () => window.clearTimeout(timer);
  }, [scrambleTo]);

  return (
    <main className="minimal-home">
      <FirstLaunchWave />
      <div className="identity">
        <h1 className="minimal-name">{text}</h1>
        <p className="identity-subtitle">student @ UTCS. interested in CUDA &amp; LLMs.</p>
        <div className="social-links" aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.name}
              onMouseEnter={() => scrambleTo(social.label)}
              onMouseLeave={() => scrambleTo(DEFAULT_NAME)}
              onFocus={() => scrambleTo(social.label)}
              onBlur={() => scrambleTo(DEFAULT_NAME)}
            >
              <social.icon aria-hidden="true" size={17} />
            </a>
          ))}
        </div>
        <nav className="minimal-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
