"use client";

import Image from "next/image";
import { useState } from "react";

interface ArchaLogoProps {
  size?: number;
  className?: string;
}

export default function ArchaLogo({ size = 180, className = "" }: ArchaLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Fallback: SVG logo representation
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Green figure - top */}
          <path
            d="M100 20 L100 60 Q130 40 140 70 Q110 60 100 60 Q90 60 60 70 Q70 40 100 20"
            fill="#22c55e"
          />
          <circle cx="100" cy="45" r="12" fill="#22c55e" />

          {/* Blue figure - top right */}
          <path
            d="M160 50 L140 85 Q165 75 180 95 Q160 80 140 85 Q135 95 150 120 Q170 90 160 50"
            fill="#3b82f6"
          />
          <circle cx="155" cy="75" r="12" fill="#3b82f6" />

          {/* Yellow figure - left */}
          <path
            d="M40 50 L60 85 Q35 75 20 95 Q40 80 60 85 Q65 95 50 120 Q30 90 40 50"
            fill="#eab308"
          />
          <circle cx="45" cy="75" r="12" fill="#eab308" />

          {/* Orange figure - bottom right */}
          <path
            d="M150 130 L130 115 Q155 125 165 145 Q145 130 130 115 Q120 120 130 150 Q155 140 150 130"
            fill="#f97316"
          />
          <circle cx="145" cy="125" r="12" fill="#f97316" />

          {/* Red/Pink figure - bottom */}
          <path
            d="M50 130 L70 115 Q45 125 35 145 Q55 130 70 115 Q80 120 70 150 Q45 140 50 130"
            fill="#ef4444"
          />
          <circle cx="55" cy="125" r="12" fill="#ef4444" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src="/logo Archa.png"
      alt="Archa - Arisan Onchain"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
