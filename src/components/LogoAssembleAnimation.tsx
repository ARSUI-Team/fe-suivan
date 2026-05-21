"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoAssembleAnimationProps {
  isVisible: boolean;
}

// Animation phases: scattered -> assembled -> move right -> move left -> scattered -> repeat
type AnimationPhase = "scattered" | "assembling" | "assembled" | "moveRight" | "moveLeft" | "scattering";

export default function LogoAssembleAnimation({ isVisible }: LogoAssembleAnimationProps) {
  const [hasError, setHasError] = useState(false);
  const [phase, setPhase] = useState<AnimationPhase>("scattered");

  // Positions untuk pecahan logo - lebih jauh ke pojok-pojok
  const pieces = [
    { id: 1, scatteredX: -550, scatteredY: -400, scatteredRotate: -45 },   // pojok kiri atas
    { id: 2, scatteredX: 550, scatteredY: -400, scatteredRotate: 60 },    // pojok kanan atas
    { id: 3, scatteredX: -550, scatteredY: 400, scatteredRotate: -30 },   // pojok kiri bawah
    { id: 4, scatteredX: 550, scatteredY: 400, scatteredRotate: 45 },     // pojok kanan bawah
    { id: 5, scatteredX: 0, scatteredY: 450, scatteredRotate: 90 },       // bawah tengah
    { id: 6, scatteredX: -600, scatteredY: 0, scatteredRotate: -60 },     // kiri tengah
    { id: 7, scatteredX: 600, scatteredY: 0, scatteredRotate: 30 },       // kanan tengah
    { id: 8, scatteredX: 0, scatteredY: -450, scatteredRotate: -90 },     // atas tengah
    { id: 9, scatteredX: -400, scatteredY: -350, scatteredRotate: 120 },  // kiri atas dalam
  ];

  useEffect(() => {
    if (!isVisible) {
      setPhase("scattered");
      return;
    }

    // Start animation cycle when visible
    setPhase("assembling");

    const cycleAnimation = () => {
      // Phase 1: Assembling (scattered -> center)
      setPhase("assembling");

      setTimeout(() => {
        // Phase 2: Assembled (hold in center)
        setPhase("assembled");
      }, 2000);

      setTimeout(() => {
        // Phase 3: Move to right
        setPhase("moveRight");
      }, 3500);

      setTimeout(() => {
        // Phase 4: Move to left
        setPhase("moveLeft");
      }, 5000);

      setTimeout(() => {
        // Phase 5: Scattering
        setPhase("scattering");
      }, 6500);

      setTimeout(() => {
        // Phase 6: Back to scattered, then restart
        setPhase("scattered");
      }, 8000);
    };

    // Initial cycle
    cycleAnimation();

    // Repeat the cycle
    const interval = setInterval(cycleAnimation, 9000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const getTransform = (piece: typeof pieces[0], index: number) => {
    const delay = index * 0.1;

    switch (phase) {
      case "scattered":
      case "scattering":
        return {
          transform: `translate(${piece.scatteredX}px, ${piece.scatteredY}px) rotate(${piece.scatteredRotate}deg) scale(0.4)`,
          opacity: phase === "scattered" ? 0 : 0.06,
          transitionDelay: `${delay}s`,
        };
      case "assembling":
      case "assembled":
        return {
          transform: "translate(0, 0) rotate(0deg) scale(1)",
          opacity: 0.08,
          transitionDelay: `${delay}s`,
        };
      case "moveRight":
        return {
          transform: "translate(150px, 0) rotate(15deg) scale(0.9)",
          opacity: 0.08,
          transitionDelay: "0s",
        };
      case "moveLeft":
        return {
          transform: "translate(-150px, 0) rotate(-15deg) scale(0.9)",
          opacity: 0.08,
          transitionDelay: "0s",
        };
      default:
        return {
          transform: "translate(0, 0) rotate(0deg) scale(1)",
          opacity: 0.08,
          transitionDelay: "0s",
        };
    }
  };

  const getMainLogoTransform = () => {
    switch (phase) {
      case "scattered":
      case "scattering":
        return {
          opacity: 0,
          transform: "scale(0.5) rotate(0deg)",
        };
      case "assembling":
      case "assembled":
        return {
          opacity: 0.1,
          transform: "scale(1) rotate(0deg)",
        };
      case "moveRight":
        return {
          opacity: 0.1,
          transform: "scale(0.95) rotate(10deg) translateX(100px)",
        };
      case "moveLeft":
        return {
          opacity: 0.1,
          transform: "scale(0.95) rotate(-10deg) translateX(-100px)",
        };
      default:
        return {
          opacity: 0.1,
          transform: "scale(1) rotate(0deg)",
        };
    }
  };

  const getGlowTransform = () => {
    switch (phase) {
      case "scattered":
      case "scattering":
        return {
          opacity: 0,
          transform: "scale(0)",
        };
      case "assembling":
      case "assembled":
        return {
          opacity: 0.3,
          transform: "scale(1)",
        };
      case "moveRight":
        return {
          opacity: 0.25,
          transform: "scale(0.9) translateX(100px)",
        };
      case "moveLeft":
        return {
          opacity: 0.25,
          transform: "scale(0.9) translateX(-100px)",
        };
      default:
        return {
          opacity: 0.3,
          transform: "scale(1)",
        };
    }
  };

  if (hasError) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Glow effect behind main logo */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] rounded-full bg-gradient-to-r from-green-200 via-blue-200 to-orange-200 blur-3xl transition-all duration-1000 ease-in-out"
        style={getGlowTransform()}
      />

      {/* Multiple scattered logo pieces that assemble */}
      {pieces.map((piece, index) => {
        const styles = getTransform(piece, index);
        return (
          <div
            key={piece.id}
            className="absolute transition-all duration-1500 ease-in-out"
            style={{
              transform: styles.transform,
              opacity: styles.opacity,
              transitionDelay: styles.transitionDelay,
            }}
          >
            <Image
              src="/logo Archa.png"
              alt=""
              width={500}
              height={500}
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
              onError={() => setHasError(true)}
            />
          </div>
        );
      })}

      {/* Main centered logo */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={getMainLogoTransform()}
      >
        <Image
          src="/logo Archa.png"
          alt=""
          width={800}
          height={800}
          className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] object-contain"
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  );
}
