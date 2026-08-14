"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = "@#$?!abc;:+*=-,.`";
const DURATION = 3000;

export default function FirstLaunchWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      canvas.remove();
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let scale = 1;
    let animationFrame = 0;
    let startedAt = 0;
    const fontFamily = window.getComputedStyle(document.body).fontFamily;

    const resize = () => {
      scale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const easeInOut = (value: number) =>
      value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

    const render = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / DURATION, 1);
      const travel = easeInOut(progress);
      const cellSize = width < 640 ? 13 : 15;
      const bandWidth = width < 640 ? 92 : 135;
      const crest = -height * 0.08 + travel * height * 1.35;
      const fadeIn = Math.min(progress / 0.06, 1);
      const fadeOut = progress > 0.82 ? (1 - progress) / 0.18 : 1;
      const overallFade = fadeIn * fadeOut;

      context.clearRect(0, 0, width, height);
      context.font = `${cellSize * 0.82}px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let y = -cellSize; y < height + cellSize; y += cellSize) {
        for (let x = -cellSize; x < width + cellSize; x += cellSize) {
          const curve =
            crest +
            Math.sin(x * 0.011 + progress * 5.5) * 52 +
            Math.sin(x * 0.0035 - progress * 3) * 78;
          const distance = Math.abs(y - curve);
          if (distance > bandWidth) continue;

          const intensity = Math.pow(1 - distance / bandWidth, 1.35) * overallFade;
          const ripple = (Math.sin(x * 0.06 + y * 0.035 - progress * 14) + 1) / 2;
          const characterIndex = Math.min(
            CHARACTERS.length - 1,
            Math.floor((1 - intensity * (0.72 + ripple * 0.28)) * CHARACTERS.length)
          );
          const jitter = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          if (jitter - Math.floor(jitter) > 0.9 + intensity * 0.08) continue;

          context.fillStyle = `rgba(10, 10, 10, ${0.08 + intensity * 0.3})`;
          context.fillText(CHARACTERS[characterIndex], x, y);
        }
      }

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        context.clearRect(0, 0, width, height);
        canvas.remove();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="launch-wave" aria-hidden="true" />;
}
