"use client";

import { useEffect, useRef, useState } from "react";
import LogoAssembleAnimation from "./LogoAssembleAnimation";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

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

  const problems = [
    {
      icon: "❌",
      title: t("about.problem1.title"),
      description: t("about.problem1.desc"),
    },
    {
      icon: "❌",
      title: t("about.problem2.title"),
      description: t("about.problem2.desc"),
    },
    {
      icon: "❌",
      title: t("about.problem3.title"),
      description: t("about.problem3.desc"),
    },
    {
      icon: "❌",
      title: t("about.problem4.title"),
      description: t("about.problem4.desc"),
    },
  ];

  const solutions = [
    {
      icon: "✅",
      title: t("about.solution1.title"),
      description: t("about.solution1.desc"),
    },
    {
      icon: "✅",
      title: t("about.solution2.title"),
      description: t("about.solution2.desc"),
    },
    {
      icon: "✅",
      title: t("about.solution3.title"),
      description: t("about.solution3.desc"),
    },
    {
      icon: "✅",
      title: t("about.solution4.title"),
      description: t("about.solution4.desc"),
    },
  ];

  // Description with HTML formatting
  const getDescription = () => {
    if (language === "id") {
      return (
        <>
          <strong className="text-gray-900">Archa</strong> adalah protokol arisan terdesentralisasi yang dibangun di atas
          <strong className="text-blue-600"> Mantle Network</strong>. Setiap peserta menyetorkan <strong className="text-blue-600">USDC</strong> secara berkala,
          dan giliran penerima ditentukan secara adil melalui smart contract.
          Yang membuat Archa berbeda: <strong className="text-purple-600">AI Yield Optimizer</strong> secara otomatis memutar dana ke protokol DeFi terbaik untuk menghasilkan yield optimal.
          Di akhir arisan, <span className="font-semibold text-gray-900">collateral dikembalikan + bonus yield untuk semua peserta</span>!
        </>
      );
    }
    return (
      <>
        <strong className="text-gray-900">Archa</strong> is a decentralized arisan protocol built on
        <strong className="text-blue-600"> Mantle Network</strong>. Each participant deposits <strong className="text-blue-600">USDC</strong> periodically,
        and the recipient&apos;s turn is determined fairly through smart contracts.
        What makes Archa different: <strong className="text-purple-600">AI Yield Optimizer</strong> automatically invests funds into the best DeFi protocols for optimal yield.
        At the end of the arisan, <span className="font-semibold text-gray-900">collateral is returned + yield bonus for all participants</span>!
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Logo Animation */}
      <LogoAssembleAnimation isVisible={isVisible} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top - Logo & Intro */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-gray-700">{t("about.badge")}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {t("about.title")}{" "}
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              {t("about.titleHighlight")}
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify">
            {getDescription()}
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems Card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative group">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-300 via-red-200 to-orange-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 rounded-3xl p-8 border border-red-100/50 shadow-xl shadow-red-100/20 backdrop-blur-sm overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                {/* Header */}
                <div className="relative mb-8">
                  <h3 className="text-xl font-bold text-gray-900">{t("about.problemTitle")}</h3>
                  <p className="text-sm text-red-500/70 mt-1">{t("about.problemSubtitle")}</p>
                </div>

                {/* Problem items with staggered animation */}
                <div className="relative space-y-4">
                  {problems.map((problem, index) => (
                    <div
                      key={index}
                      className={`group/item flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100/50 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-1 transition-all duration-300 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${400 + index * 150}ms`,
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors duration-300">{problem.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{problem.description}</p>
                      </div>
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-300 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Card */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative group">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-200 to-blue-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 rounded-3xl p-8 border border-green-100/50 shadow-xl shadow-green-100/20 backdrop-blur-sm overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                {/* Animated particles */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30" />
                <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }} />

                {/* Header */}
                <div className="relative mb-8">
                  <h3 className="text-xl font-bold text-gray-900">{t("about.solutionTitle")}</h3>
                  <p className="text-sm text-green-500/70 mt-1">{t("about.solutionSubtitle")}</p>
                </div>

                {/* Solution items with staggered animation */}
                <div className="relative space-y-4">
                  {solutions.map((solution, index) => (
                    <div
                      key={index}
                      className={`group/item flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100/50 shadow-sm hover:shadow-md hover:border-green-200 hover:-translate-y-1 transition-all duration-300 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${600 + index * 150}ms`,
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover/item:text-green-600 transition-colors duration-300">{solution.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{solution.description}</p>
                      </div>
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mt-2 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <blockquote className="text-xl md:text-2xl font-medium text-gray-700 italic max-w-3xl mx-auto">
            &ldquo;{t("about.quote")}{" "}
            <span className="text-green-600 font-bold not-italic">{t("about.quoteBrand")}</span>{" "}
            {t("about.quoteEnd")}&rdquo;
          </blockquote>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#cara-kerja"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              {t("about.cta")}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
