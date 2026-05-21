"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  description: string;
  target?: string;
  icon: React.ReactNode;
}

const ONBOARDING_STEPS: Step[] = [
  {
    title: "Welcome to Archa!",
    description: "Archa brings traditional Indonesian arisan to blockchain with AI-powered yield optimization. Let's show you around!",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Connect Your Wallet",
    description: "Click 'Connect Wallet' to link your MetaMask or WalletConnect wallet. Make sure you're on Mantle Sepolia Testnet.",
    target: "connect-wallet",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Browse Arisan Pools",
    description: "Explore available pools with different deposit amounts (10/50/100 USDC). Each pool has unique participants and AI-optimized yields.",
    target: "pools",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Join a Pool",
    description: "Select a pool and deposit collateral to join. Your collateral earns yield while securing your commitment to the arisan.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "AI Yield Optimizer",
    description: "Our AI analyzes 5+ DeFi protocols on Mantle to maximize your yield. Check the AI dashboard for real-time recommendations!",
    target: "ai",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "You're Ready!",
    description: "Start earning yield with transparent, on-chain arisan. Good luck and happy saving!",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);

  useEffect(() => {
    // Check if user has seen the tutorial
    const seen = localStorage.getItem("archa_tutorial_seen");
    if (!seen) {
      setHasSeenTutorial(false);
      // Auto-open tutorial for new users after a short delay
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    localStorage.setItem("archa_tutorial_seen", "true");
    setHasSeenTutorial(true);
  };

  const handleReopen = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <>
      {/* Help Button - Always visible */}
      <button
        onClick={handleReopen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Help"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
        {!hasSeenTutorial && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
        <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Need help?
        </span>
      </button>

      {/* Tutorial Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-green-600">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {ONBOARDING_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? "w-6 bg-green-500"
                        : idx < currentStep
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="px-8 pb-8 flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Back
              </button>

              <button
                onClick={handleClose}
                className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
