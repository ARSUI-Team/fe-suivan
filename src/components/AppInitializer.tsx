"use client";

import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if animation was already shown in this session
    const hasShownAnimation = sessionStorage.getItem("archa-animation-shown");

    if (hasShownAnimation) {
      setShowLoading(false);
      setIsReady(true);
    } else {
      setShowLoading(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem("archa-animation-shown", "true");
    setShowLoading(false);
    setTimeout(() => {
      setIsReady(true);
    }, 300); // Small delay for smooth transition
  };

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleAnimationComplete} />}
      <div className={`transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
