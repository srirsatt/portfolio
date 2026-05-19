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
        will be attending{" "}
        <a href="https://events.ycombinator.com/startup-school-2026" className="font-bold">
          <SiYcombinator style={{ color: "#F26522", display: "inline-block", verticalAlign: "-0.2em" }} size={16} />
          {" "}Startup School
        </a>
        {" "}— connect with me if you&apos;re also going!
      </span>
    </div>
  );
}
