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

type DisplayChar = { char: string; scrambling: boolean };

function useScramble() {
  const [displayChars, setDisplayChars] = useState<DisplayChar[]>(
    ORIGINAL_NAME.split("").map((char) => ({ char, scrambling: false }))
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleTo = useCallback((target: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const padded = target.padEnd(ORIGINAL_NAME.length);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayChars(
        padded.split("").map((char, i) => {
          if (i < iteration) return { char: padded[i], scrambling: false };
          if (char === " ") return { char: " ", scrambling: false };
          return { char: CHARS[Math.floor(Math.random() * CHARS.length)], scrambling: true };
        })
      );

      iteration += 1;

      if (iteration > padded.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayChars(target.split("").map((char) => ({ char, scrambling: false })));
      }
    }, 30);
  }, []);

  const reset = useCallback(() => {
    scrambleTo(ORIGINAL_NAME);
  }, [scrambleTo]);

  return { displayChars, scrambleTo, reset };
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
    href: "mailto:srirams@cs.utexas.edu",
    label: "srirams@cs.utexas.edu",
  },
];

export default function Home() {
  const { displayChars, scrambleTo, reset } = useScramble();

  return (
    <div className="min-h-screen flex items-center justify-center p-8 sm:p-12">
      <div className="w-full max-w-md text-left">
        <h1 className="font-[var(--font-space-mono)] font-bold text-lg whitespace-pre">
          {displayChars.map((item, i) => (
            <span
              key={i}
              style={{ color: "inherit" }}
            >
              {item.char}
            </span>
          ))}
        </h1>
        <div className="flex space-x-5 my-4">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
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
          building with cool tech :). interested in CUDA & LLMs.
        </p>
        <div
          className="mt-4 flex flex-col gap-1 font-[var(--font-space-mono)] text-sm tracking-tight leading-relaxed"
          style={{ wordSpacing: "-3px" }}
        >
          <p>
            <a href="mailto:srirams@cs.utexas.edu" className="underline hover:text-black">
              srirams@cs.utexas.edu
            </a>
            
          </p>
        </div>
        <div
          className="mt-4 flex flex-col gap-2 font-[var(--font-space-mono)] text-sm tracking-tight leading-relaxed"
          style={{ wordSpacing: "-3px" }}
        >
          <a href="/projects" className="group text-black font-bold transition-colors">projects <span className="ml-[1px] inline-block text-[11px] transition-transform duration-150 ease-out group-hover:translate-x-1">→</span>
          </a>
          <a href="/blog" className="group text-black font-bold transition-colors">blog <span className="ml-[1px] inline-block text-[11px] transition-transform duration-150 ease-out group-hover:translate-x-1">→</span></a>
        </div>
        <LocalTime />
      </div>
    </div>
  );
}
