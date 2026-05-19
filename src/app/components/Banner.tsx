"use client";

import { useRef } from "react";
import confetti from "canvas-confetti";
import { SiYcombinator } from "react-icons/si";

export default function Banner() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cooldown = useRef(false);

  const handleMouseEnter = () => {
    if (cooldown.current || !textRef.current) return;
    cooldown.current = true;
    setTimeout(() => { cooldown.current = false; }, 1200);

    const rect = textRef.current.getBoundingClientRect();
    const leftX = rect.left / window.innerWidth;
    const rightX = rect.right / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      angle: 150,
      spread: 50,
      startVelocity: 18,
      scalar: 0.7,
      origin: { x: leftX, y },
      colors: ["#F26522", "#d4d4d4"],
    });

    confetti({
      particleCount: 18,
      angle: 30,
      spread: 50,
      startVelocity: 18,
      scalar: 0.7,
      origin: { x: rightX, y },
      colors: ["#F26522", "#d4d4d4"],
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full text-center pt-3 text-sm z-10 cursor-pointer">
      <span ref={textRef} onMouseEnter={handleMouseEnter} className="inline-block">
        <a href="https://events.ycombinator.com/startup-school-2026" target="_blank">
          will be attending{" "}

          <SiYcombinator style={{ color: "#F26522", display: "inline-block", verticalAlign: "-0.2em" }} size={16} />
          {" "}<span className="font-bold">Startup School</span>
          {" "}— connect with me if you&apos;re also going!
        </a>
      </span>
    </div>
  );
}
