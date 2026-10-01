"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    name: "EDPower",
    src: "/images/wedison/motorcycles/edpower/edpower-landing-hero.webp",
    alt: "WEDISON EDPower electric motorcycle in front of a city skyline",
  },
  {
    name: "Athena",
    src: "/images/wedison/motorcycles/athena/athena-hero.webp",
    alt: "WEDISON Athena electric motorcycle in a studio setting",
  },
  {
    name: "Victory",
    src: "/images/wedison/motorcycles/victory/victory-hero.webp",
    alt: "WEDISON Victory electric motorcycle in a studio setting",
  },
] as const;

const SWIPE_DISTANCE = 50;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [active, paused, reducedMotion]);

  return (
    <div
      role="group"
      aria-label="WEDISON motorcycle showcase"
      className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
        const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(deltaX) < SWIPE_DISTANCE || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        setActive((current) => (current + (deltaX < 0 ? 1 : slides.length - 1)) % slides.length);
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.name}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-1 rounded-full bg-wedison-ink/75 p-1 sm:bottom-7 sm:left-7">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            aria-label={`Show ${slide.name}, slide ${index + 1} of ${slides.length}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={`rounded-full px-3 py-2 text-xs font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-green ${
              index === active ? "text-wedison-green" : "text-white/60 hover:text-white"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}
