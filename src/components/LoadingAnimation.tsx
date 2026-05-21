"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }, 2500); // 2.5 seconds animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-fadeIn">
      {/* Main container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Swipe/Wipe Circle Animation - menggunakan SVG circle dengan stroke-dasharray */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="8"
            opacity="0.2"
          />

          {/* Animated swipe circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="10"
            strokeLinecap="round"
            className="animate-swipeCircle"
            style={{
              strokeDasharray: "565",
              strokeDashoffset: "565",
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo Archa di tengah - rounded circle dengan background putih */}
        <div className="relative z-10 w-48 h-48 flex items-center justify-center animate-fadeInScale">
          <div className="relative w-44 h-44 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-4 border-gray-100">
            <div className="relative w-full h-full">
              <Image
                src="/logo Archa.png"
                alt="Archa Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-fadeInScale">
        <p className="text-gray-600 text-sm tracking-wider flex items-center gap-2">
          Initializing
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </span>
        </p>
      </div>
    </div>
  );
}
