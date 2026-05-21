"use client";

import { useEffect, useRef, useState } from "react";
import AdvantagesSlideshow from "./AdvantagesSlideshow";
import { useLanguage } from "@/context/LanguageContext";

interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

export default function AdvantagesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance active index
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const advantages: Advantage[] = [
    {
      title: t("advantages.adv1.title"),
      description: t("advantages.adv1.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-green-400 to-emerald-500",
      borderColor: "border-green-400",
    },
    {
      title: t("advantages.adv2.title"),
      description: t("advantages.adv2.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: "from-blue-400 to-cyan-500",
      borderColor: "border-blue-400",
    },
    {
      title: t("advantages.adv3.title"),
      description: t("advantages.adv3.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "from-purple-400 to-violet-500",
      borderColor: "border-purple-400",
    },
    {
      title: t("advantages.adv4.title"),
      description: t("advantages.adv4.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-orange-400 to-amber-500",
      borderColor: "border-orange-400",
    },
    {
      title: t("advantages.adv5.title"),
      description: t("advantages.adv5.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-pink-400 to-rose-500",
      borderColor: "border-pink-400",
    },
    {
      title: t("advantages.adv6.title"),
      description: t("advantages.adv6.desc"),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: "from-teal-400 to-cyan-500",
      borderColor: "border-teal-400",
    },
  ];

  const stats = [
    { value: t("advantages.stat1.value"), label: t("advantages.stat1.label") },
    { value: t("advantages.stat2.value"), label: t("advantages.stat2.label") },
    { value: t("advantages.stat3.value"), label: t("advantages.stat3.label") },
    { value: t("advantages.stat4.value"), label: t("advantages.stat4.label") },
  ];

  return (
    <section
      ref={sectionRef}
      id="keunggulan"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Slideshow */}
      <AdvantagesSlideshow activeIndex={activeIndex} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t("advantages.badge")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {t("advantages.title")}{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t("advantages.titleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("advantages.description")}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Card */}
              <div
                className={`relative group cursor-pointer ${
                  activeIndex === index ? "z-20" : "z-10"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Glow effect for active card */}
                <div
                  className={`absolute -inset-2 bg-gradient-to-r ${advantage.color} rounded-3xl blur-xl transition-all duration-500 ${
                    activeIndex === index ? "opacity-50 scale-105" : "opacity-0 scale-100"
                  }`}
                />

                {/* Main Card */}
                <div
                  className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-500 ${
                    activeIndex === index
                      ? `${advantage.borderColor} shadow-2xl scale-105`
                      : "border-white/20 shadow-lg hover:shadow-xl hover:border-white/40"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${advantage.color} flex items-center justify-center text-white mb-4 transition-all duration-500 ${
                      activeIndex === index ? "scale-110 shadow-lg" : "group-hover:scale-105"
                    }`}
                  >
                    {advantage.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2">{advantage.title}</h3>
                  <p
                    className={`text-sm text-white/70 leading-relaxed transition-all duration-500 ${
                      activeIndex === index ? "text-white/90" : ""
                    }`}
                  >
                    {advantage.description}
                  </p>

                  {/* Active indicator line */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r ${advantage.color} rounded-full transition-all duration-500 ${
                      activeIndex === index ? "w-3/4 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {advantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-gradient-to-r from-green-400 to-blue-400 w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to advantage ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/pools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore Arisan Pools</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
