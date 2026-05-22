"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Confetti from "./Confetti";

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WinnerModal({ isOpen, onClose }: WinnerModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Confetti */}
      <Confetti active={isOpen} duration={5000} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm transition-all duration-500 ${
          showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl shadow-yellow-500/10">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-yellow-400/15 rounded-full blur-3xl" />

          {/* Header */}
          <div className="relative px-6 pt-8 pb-2 text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-white shadow-lg shadow-yellow-500/40 animate-float-gentle">
              <Image src="/suivan-icon.svg" alt="Suivan" width={64} height={64} className="w-16 h-16 object-contain" />
            </div>

            <div className="inline-block px-4 py-1 mb-3 text-[10px] font-bold tracking-widest text-yellow-300 uppercase bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              Monthly Winner - Round 3/5
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              Congratulations, You Won!
            </h2>
            <p className="text-gray-400 text-sm">
              Small Pool &mdash; Family Arisan
            </p>
          </div>

          {/* Breakdown */}
          <div className="px-6 py-5">
            <div className="space-y-3 bg-gray-900/60 rounded-2xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-400">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Monthly Arisan Pot</span>
                </div>
                <span className="text-white font-semibold text-sm">50 USDC</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-purple-400">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7.55 9.71a.75.75 0 011.06-1.06l2.224 2.224a20.923 20.923 0 015.142-5.09l-3.018.81a.75.75 0 01-.92-.53l.54.074z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Yield (DeFi Staking)</span>
                </div>
                <span className="text-green-400 font-semibold text-sm">+ 1.25 USDC</span>
              </div>

              <div className="border-t border-dashed border-gray-700/50" />

              <div className="flex justify-between items-center pt-1">
                <span className="text-white font-bold">Total You Receive</span>
                <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  51.25 USDC
                </span>
              </div>
            </div>

            <div className="mt-3 px-3 py-2.5 bg-blue-500/5 border border-blue-500/10 rounded-xl">
              <p className="text-[11px] text-blue-400/80 text-center leading-relaxed">
                Arisan pot from 5 members x 10 USDC/month contributions. Yield is generated from AI-optimized DeFi staking of pool collateral automatically via Lendle, Agni, and Merchant Moe on Mantle.
              </p>
            </div>
          </div>

          {/* Tx info */}
          <div className="px-6 pb-3">
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Settled on Mantle Network</span>
              <span className="text-gray-700">|</span>
              <a href="https://sepolia.mantlescan.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                0x8f3a...c21d
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 pb-6 pt-2 space-y-2.5">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-yellow-500/25 active:scale-[0.98]"
            >
              Claim Reward
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-medium text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
