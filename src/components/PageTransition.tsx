"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    setProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 50);

    // Update content and complete transition
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setProgress(100);
      clearInterval(progressInterval);

      // Hide loading overlay after completion
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [pathname, children]);

  return (
    <>
      {/* Loading Overlay with Archa Logo */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Circular Progress Animation */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />

              {/* Animated progress circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  strokeDasharray: "502.4",
                  strokeDashoffset: `${502.4 - (502.4 * progress) / 100}`,
                  transition: "stroke-dashoffset 0.3s ease-out",
                }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Archa Logo in center */}
            <div className="relative z-10 w-32 h-32 flex items-center justify-center">
              <div className="relative w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center p-6 border-2 border-gray-100">
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
          </div>
        </div>
      )}

      {/* Page Content */}
      <div
        className={`min-h-screen transition-opacity duration-300 ease-out ${
          isTransitioning
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
}
