"use client";

import { useEffect, useRef, useState } from "react";
import HowItWorksSlideshow from "./HowItWorksSlideshow";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  // Auto-advance active step
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-green-400 to-emerald-500",
      borderColor: "border-green-200",
    },
    {
      number: "02",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "from-blue-400 to-cyan-500",
      borderColor: "border-blue-200",
    },
    {
      number: "03",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-purple-400 to-violet-500",
      borderColor: "border-purple-200",
    },
    {
      number: "04",
      title: t("howItWorks.step4.title"),
      description: t("howItWorks.step4.desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "from-orange-400 to-amber-500",
      borderColor: "border-orange-200",
    },
    {
      number: "05",
      title: t("howItWorks.step5.title"),
      description: t("howItWorks.step5.desc"),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      color: "from-pink-400 to-rose-500",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="cara-kerja"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Slideshow */}
      <HowItWorksSlideshow activeStep={activeStep} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t("howItWorks.badge")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {t("howItWorks.title")}{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t("howItWorks.titleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className="relative h-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Step Card */}
                <div
                  className={`relative group cursor-pointer ${
                    activeStep === index ? "z-20" : "z-10"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Glow effect for active step */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-3xl blur-xl transition-all duration-500 ${
                      activeStep === index ? "opacity-40 scale-105" : "opacity-0 scale-100"
                    }`}
                  />

                  {/* Main Card */}
                  <div
                    className={`relative bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-500 ${
                      activeStep === index
                        ? `${step.borderColor} shadow-2xl scale-105 lg:scale-110`
                        : "border-white/50 shadow-lg hover:shadow-xl hover:scale-102"
                    }`}
                  >
                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-500 ${
                        activeStep === index ? "scale-110 ring-4 ring-white" : ""
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-4 transition-all duration-500 ${
                        activeStep === index ? "scale-110 shadow-lg" : "group-hover:scale-105"
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p
                      className={`text-sm text-gray-600 leading-relaxed transition-all duration-500 ${
                        activeStep === index ? "text-gray-700" : ""
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Active indicator line */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r ${step.color} rounded-full transition-all duration-500 ${
                        activeStep === index ? "w-3/4 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? "bg-gradient-to-r from-green-400 to-blue-400 w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/70 mb-6">
            {t("howItWorks.bottomText")}
          </p>
          <a
            href="#keunggulan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            {t("howItWorks.cta")}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
