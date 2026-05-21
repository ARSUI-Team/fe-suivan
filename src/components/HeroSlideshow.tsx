"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
    alt: "Friends gathering together happily",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=1920&q=80",
    alt: "People celebrating at a party",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80",
    alt: "Family enjoying time together",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=80",
    alt: "Group of friends at dinner",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80",
    alt: "People enjoying outdoor activities",
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleImageLoad = (index: number) => {
    setIsLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            fill
            priority={index === 0}
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              index === currentIndex ? "scale-110" : "scale-100"
            }`}
            onLoad={() => handleImageLoad(index)}
            sizes="100vw"
          />

          {/* Loading skeleton */}
          {!isLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
          )}
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl z-5 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl z-5 animate-pulse" style={{ animationDelay: "1s" }} />
    </div>
  );
}
