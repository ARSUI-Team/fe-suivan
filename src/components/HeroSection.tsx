"use client";

import { useState } from "react";
import HeroSlideshow from "./HeroSlideshow";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const [mounted] = useState(true);
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <HeroSlideshow />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-3 sm:mb-4 tracking-wide"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t("hero.preTitle1")}
          </span>
          <span
            className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white font-semibold mb-2 tracking-wide"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {t("hero.preTitle2")}
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white bg-clip-text font-bold mt-3 sm:mt-4"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            {t("hero.title")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed tracking-wide transition-all duration-1000 delay-400 px-2 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {t("hero.description")}
        </p>

        {/* Trust Indicators */}
        <div
          className={`mt-12 sm:mt-16 transition-all duration-1000 delay-[800ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6">
            {t("hero.techLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10">
            {/* Mantle */}
            <a
              href="https://mantle.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 min-h-[44px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#000"/>
                <path d="M25 35L50 20L75 35V65L50 80L25 65V35Z" fill="#65B3AE" stroke="#65B3AE" strokeWidth="2"/>
                <path d="M50 20V80M25 35L75 65M75 35L25 65" stroke="#000" strokeWidth="2"/>
              </svg>
              <span className="text-white/80 text-xs sm:text-sm font-medium whitespace-nowrap">Mantle Network</span>
            </a>

            {/* USDC */}
            <a
              href="https://circle.com/usdc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 min-h-[44px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#2775CA"/>
                <path d="M50 20C33.4 20 20 33.4 20 50s13.4 30 30 30 30-13.4 30-30S66.6 20 50 20zm0 55c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" fill="white"/>
                <text x="50" y="58" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">$</text>
              </svg>
              <span className="text-white/80 text-xs sm:text-sm font-medium whitespace-nowrap">USDC Stablecoin</span>
            </a>

            {/* AI */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 min-h-[44px]">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#8B5CF6"/>
                <path d="M50 25L65 40H55V55H65L50 75L35 55H45V40H35L50 25Z" fill="white"/>
                <circle cx="35" cy="35" r="5" fill="white"/>
                <circle cx="65" cy="35" r="5" fill="white"/>
                <circle cx="50" cy="65" r="5" fill="white"/>
              </svg>
              <span className="text-white/80 text-xs sm:text-sm font-medium whitespace-nowrap">AI Yield Optimizer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-[1000ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
