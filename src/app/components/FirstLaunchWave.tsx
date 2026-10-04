"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = "@#$?!abc;:+*=-,.`";
const DURATION = 3000;
const WAVE_COLORS = ["#c65f43", "#c99a36", "#76985c", "#4c94a6", "#9873aa"];
const DARK_WAVE_COLORS = ["#df896d", "#d8b45c", "#9fbb84", "#80b8c8", "#b69acb"];

export default function FirstLaunchWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.display = "";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      canvas.style.display = "none";
      return;
    }

    const context = canvas.getContext("2d");
    const glyphs = document.createElement("canvas");
    const glyphContext = glyphs.getContext("2d");
    if (!context || !glyphContext) return;

    let width = 0;
    let height = 0;
    let scale = 1;
    const cellSize = 15;
    let bandWidth = 0;
    let wavePadding = 0;
    let canvasHeight = 0;
    let glyphSize = 0;
    let animationFrame = 0;
    let startedAt = 0;
    const fontFamily = window.getComputedStyle(document.body).fontFamily;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      scale = Math.min(window.devicePixelRatio || 1, width <= 640 ? 1.5 : 2);
      bandWidth = width <= 640 ? 92 : 135;
      // Keep the bitmap around the wave instead of compositing a full screen.
      wavePadding = bandWidth + 52 + 78 + cellSize;
      canvasHeight = wavePadding * 2;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.ceil(canvasHeight * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);

      // Rasterize each character once, then copy its pixels during the animation.
      glyphSize = Math.ceil(cellSize * scale);
      glyphs.width = glyphSize * CHARACTERS.length;
      glyphs.height = glyphSize;
      glyphContext.font = `${cellSize * 0.82 * scale}px ${fontFamily}`;
      glyphContext.textAlign = "center";
      glyphContext.textBaseline = "middle";
      glyphContext.fillStyle = "#fff";
      for (let index = 0; index < CHARACTERS.length; index += 1) {
        glyphContext.fillText(CHARACTERS[index], (index + 0.5) * glyphSize, glyphSize / 2);
      }
    };

    const render = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / DURATION, 1);
      // A steady sweep avoids the long, nearly stationary start of cubic easing.
      const crest = -wavePadding + progress * (height + wavePadding * 2);
      const offsetY = crest - wavePadding;
      const fadeIn = Math.min(progress / 0.06, 1);
      const fadeOut = progress > 0.82 ? (1 - progress) / 0.18 : 1;
      const overallFade = fadeIn * fadeOut;

      canvas.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      context.clearRect(0, 0, width, canvasHeight);

      for (let x = -cellSize; x < width + cellSize; x += cellSize) {
        const curve =
          crest +
          Math.sin(x * 0.011 + progress * 5.5) * 52 +
          Math.sin(x * 0.0035 - progress * 3) * 78;
        // Only visit rows inside the wave, instead of scanning the whole screen.
        const firstY = Math.max(-cellSize, Math.ceil((curve - bandWidth) / cellSize) * cellSize);
        const lastY = Math.min(height + cellSize, curve + bandWidth);
        for (let y = firstY; y < lastY; y += cellSize) {
          const distance = Math.abs(y - curve);

          const intensity = Math.pow(1 - distance / bandWidth, 1.35) * overallFade;
          const ripple = (Math.sin(x * 0.06 + y * 0.035 - progress * 14) + 1) / 2;
          const characterIndex = Math.min(
            CHARACTERS.length - 1,
            Math.floor((1 - intensity * (0.72 + ripple * 0.28)) * CHARACTERS.length)
          );
          const jitter = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          if (jitter - Math.floor(jitter) > 0.9 + intensity * 0.08) continue;

          context.globalAlpha = (0.08 + intensity * 0.63) * overallFade;
          const size = glyphSize / scale;
          context.drawImage(
            glyphs,
            characterIndex * glyphSize, 0, glyphSize, glyphSize,
            x - size / 2, y - offsetY - size / 2, size, size
          );
        }
      }

      context.globalAlpha = 1;
      // Apply the same continuous color gradient to the cached glyphs in one pass.
      const waveColor = context.createLinearGradient(0, wavePadding - bandWidth, width, wavePadding + bandWidth);
      const colors = document.documentElement.dataset.theme === "dark" ? DARK_WAVE_COLORS : WAVE_COLORS;
      colors.forEach((color, index) => {
        waveColor.addColorStop(index / (colors.length - 1), color);
      });
      context.globalCompositeOperation = "source-in";
      context.fillStyle = waveColor;
      context.fillRect(0, 0, width, canvasHeight);
      context.globalCompositeOperation = "source-over";

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        context.clearRect(0, 0, width, canvasHeight);
        canvas.style.display = "none";
        window.removeEventListener("resize", resize);
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
