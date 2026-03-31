"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaGoogleScholar, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLanguage } from "react-icons/md";

const ORIGINAL_NAME = "Sriram Sattiraju";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 mt-5 text-gray-400 font-[var(--font-space-mono)] text-xs">
      <MdLanguage size={14} />
      <span>austin, tx</span>
      <span>·</span>
      <span>{time} local time</span>
    </div>
  );
}
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-";

function useScramble() {
  const [displayText, setDisplayText] = useState(ORIGINAL_NAME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleTo = useCallback((target: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Pad target to match length for smoother effect
    const padded = target.padEnd(ORIGINAL_NAME.length);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        padded
          .split("")
          .map((char, i) => {
            if (i < iteration) return padded[i];
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration > padded.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(target);
      }
    }, 30);
  }, []);

  const reset = useCallback(() => {
    scrambleTo(ORIGINAL_NAME);
  }, [scrambleTo]);

  return { displayText, scrambleTo, reset };
}

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/srirsatt",
    label: "srirsatt",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/sriram-sattiraju-4a4514150/",
    label: "Sriram Sattiraju",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/SattirajuSriram",
    label: "@SattirajuSriram",
  },
  {
    icon: FaGoogleScholar,
    href: "https://scholar.google.com/citations?user=AZf9PRMAAAAJ&hl=en",
    label: "Sriram Sattiraju",
  },
  {
    icon: MdEmail,
    href: "mailto:sriramsattiraju07@gmail.com",
    label: "sriramsattiraju07@gmail.com",
  },
];

export default function Home() {
  const { displayText, scrambleTo, reset } = useScramble();

  return (
    <div className="h-screen pt-[35vh] pl-[35vw]">
      <div className="text-left max-w-md">
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg whitespace-pre">
          {displayText}
        </h1>
        <div className="flex space-x-5 my-4">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors"
              onMouseEnter={() => social.label !== ORIGINAL_NAME && scrambleTo(social.label)}
              onMouseLeave={reset}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
        <p
          className="font-[var(--font-space-mono)] text-sm tracking-tight leading-relaxed"
          style={{ wordSpacing: "-3px" }}
        >
          currently building with LLMs, ML, GPUs, and end-to-end systems.
        </p>
        <p
          className="font-[var(--font-space-mono)] text-sm tracking-tight leading-relaxed mt-4"
          style={{ wordSpacing: "-3px" }}
        >
          student @ UT CS. feel free to reach out anytime.
        </p>
        <div className="flex space-x-5 mt-5 font-[var(--font-space-mono)] text-sm">
          <a href="/projects" className="underline text-gray-400 hover:text-black transition-colors hover-bounce">projects</a>
          <a href="/essays" className="underline text-gray-400 hover:text-black transition-colors hover-bounce">essays</a>
        </div>
        <LocalTime />
      </div>
    </div>
  );
}
