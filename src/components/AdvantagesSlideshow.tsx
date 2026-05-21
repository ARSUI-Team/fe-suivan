"use client";

import Image from "next/image";
import { useState } from "react";

interface AdvantagesSlideshowProps {
  activeIndex: number;
}

export default function AdvantagesSlideshow({ activeIndex }: AdvantagesSlideshowProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Background configurations for each advantage
  const backgrounds = [
    {
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
      alt: "Blockchain Security",
      gradient: "from-green-950 via-green-900 to-emerald-950",
      glowColor: "bg-green-500",
      accentGlow: "bg-emerald-400",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
      alt: "Transparent Analytics",
      gradient: "from-blue-950 via-blue-900 to-indigo-950",
      glowColor: "bg-blue-500",
      accentGlow: "bg-cyan-400",
    },
    {
      src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&q=80",
      alt: "Crypto Yield",
      gradient: "from-purple-950 via-purple-900 to-violet-950",
      glowColor: "bg-purple-500",
      accentGlow: "bg-violet-400",
    },
    {
      src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&q=80",
      alt: "Global Network",
      gradient: "from-orange-950 via-orange-900 to-amber-950",
      glowColor: "bg-orange-500",
      accentGlow: "bg-yellow-400",
    },
    {
      src: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
      alt: "Low Cost Transaction",
      gradient: "from-pink-950 via-rose-900 to-red-950",
      glowColor: "bg-pink-500",
      accentGlow: "bg-rose-400",
    },
    {
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&q=80",
      alt: "Fair Distribution",
      gradient: "from-teal-950 via-teal-900 to-cyan-950",
      glowColor: "bg-teal-500",
      accentGlow: "bg-cyan-400",
    },
  ];

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Layers */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Base Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`} />

          {/* Image */}
          <Image
            src={bg.src}
            alt={bg.alt}
            fill
            className={`object-cover transition-all duration-1000 ${
              loadedImages.has(index) ? "opacity-50" : "opacity-0"
            }`}
            onLoad={() => handleImageLoad(index)}
            onError={() => {}}
            priority={index === 0}
            sizes="100vw"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Animated Glow Effects */}
      {backgrounds.map((bg, index) => (
        <div
          key={`glow-${index}`}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top-left glow */}
          <div
            className={`absolute -top-32 -left-32 w-96 h-96 ${bg.glowColor} rounded-full blur-[120px] opacity-40 animate-pulse`}
            style={{ animationDuration: "4s" }}
          />

          {/* Top-right accent glow */}
          <div
            className={`absolute -top-20 -right-20 w-72 h-72 ${bg.accentGlow} rounded-full blur-[100px] opacity-30 animate-pulse`}
            style={{ animationDuration: "5s", animationDelay: "1s" }}
          />

          {/* Bottom-right glow */}
          <div
            className={`absolute -bottom-32 -right-32 w-[500px] h-[500px] ${bg.glowColor} rounded-full blur-[150px] opacity-30 animate-pulse`}
            style={{ animationDuration: "6s", animationDelay: "0.5s" }}
          />

          {/* Bottom-left accent glow */}
          <div
            className={`absolute -bottom-20 -left-20 w-80 h-80 ${bg.accentGlow} rounded-full blur-[100px] opacity-25 animate-pulse`}
            style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}
          />

          {/* Center subtle glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${bg.glowColor} rounded-full blur-[200px] opacity-20 animate-pulse`}
            style={{ animationDuration: "7s", animationDelay: "2s" }}
          />
        </div>
      ))}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Radial gradient for vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
}
