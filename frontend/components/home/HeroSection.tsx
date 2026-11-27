"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import { CheckCircle2 } from "lucide-react";

// Curated high-resolution international healthcare photography (Doctor consultation appears 1st)
const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=2400&q=90",
    alt: "Sun Breeze Healthcare - International Specialist Care Coordination",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2400&q=90",
    alt: "Sun Breeze Healthcare - International Patient Care Center",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2400&q=90",
    alt: "Sun Breeze Healthcare - Accredited International Tertiary Medical Center",
  },
];

export const HeroSection: React.FC = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const [currentIdx, setCurrentIdx] = useState(0);

  // Silent ambient crossfade between images every 6 seconds (no UI indicator)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center border-b border-[#183F5B] overflow-hidden">
      {/* Full-bleed Crossfade Slideshow (Silent transition - no indicator dots/arrows) */}
      <div className="absolute inset-0 pointer-events-none">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
              suppressHydrationWarning
            />
          </div>
        ))}
      </div>

      {/* Solid Navy Overlay (Strictly solid color, absolutely NO gradients) */}
      <div className="absolute inset-0 bg-[#102D46]/80 lg:bg-[#102D46]/75" />

      {/* Solid geometric architectural facet accents */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 pointer-events-none hidden lg:block opacity-40"
        viewBox="0 0 300 300"
        fill="none"
      >
        <polygon points="120,0 300,0 300,180" fill="#183F5B" />
        <polygon points="220,0 300,0 300,80" fill="#147D78" />
      </svg>

      <div className="container-custom relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl xl:max-w-3xl space-y-6">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-white tracking-tight leading-[1.18]">
            {t("title")}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-normal max-w-2xl">
            {t("description")}
          </p>

          {/* Conversion CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button href="/inquiry" variant="teal" size="lg" className="shadow-none">
              {t("primaryCta")}
            </Button>
            <Button
              href="/destinations"
              variant="outline"
              size="lg"
              className="text-white border-white/60 hover:bg-white/10 hover:text-white"
            >
              {t("secondaryCta")}
            </Button>
          </div>

          {/* Trust statement */}
          <div className="pt-4 border-t border-white/15">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t("trustPledge")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
