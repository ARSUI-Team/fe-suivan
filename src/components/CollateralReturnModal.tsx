"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CollateralReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollateralReturnModal({ isOpen, onClose }: CollateralReturnModalProps) {
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

      {/* Sparkle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-floatParticle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              width: "4px",
              height: "4px",
              backgroundColor: i % 2 === 0 ? "#60A5FA" : "#A78BFA",
              borderRadius: "50%",
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 6px ${i % 2 === 0 ? "#60A5FA" : "#A78BFA"}`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm transition-all duration-500 ${
          showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl shadow-blue-500/10">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Header */}
          <div className="relative px-6 pt-8 pb-2 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-white shadow-lg shadow-blue-500/30 animate-float-gentle">
              <Image src="/suivan-icon.svg" alt="Suivan" width={64} height={64} className="w-16 h-16 object-contain" />
            </div>

            <div className="inline-block px-4 py-1 mb-3 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
              Arisan Complete - Pool Completed
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              Collateral Returned
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
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                      <path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Initial Collateral</span>
                </div>
                <span className="text-white font-semibold text-sm">30 USDC</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-400">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7.55 9.71a.75.75 0 011.06-1.06l2.224 2.224a20.923 20.923 0 015.142-5.09l-3.018.81a.75.75 0 01-.92-.53l.54.074z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Yield Earned (5 months)</span>
                </div>
                <span className="text-green-400 font-semibold text-sm">+ 3.75 USDC</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Effective APY</span>
                </div>
                <span className="text-amber-400 font-semibold text-sm">~30% APY</span>
              </div>

              <div className="border-t border-dashed border-gray-700/50" />

              <div className="flex justify-between items-center pt-1">
                <span className="text-white font-bold">Total Returned</span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  33.75 USDC
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4 space-y-2">
              <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider px-1">AI-Optimized Staking Timeline</p>
              <div className="flex items-center gap-2 px-1">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full" />
                </div>
              </div>
              <div className="flex justify-between px-1">
                <span className="text-[10px] text-gray-500">Month 1</span>
                <span className="text-[10px] text-gray-500">Month 3</span>
                <span className="text-[10px] text-green-500 font-medium">Month 5 (Done)</span>
              </div>
            </div>

            <div className="mt-4 px-3 py-2.5 bg-green-500/5 border border-green-500/10 rounded-xl">
              <p className="text-[11px] text-green-400/80 text-center leading-relaxed">
                Collateral is automatically staked to Lendle, Agni Finance & Merchant Moe on Mantle Network. AI optimizer maximizes yield in real-time.
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
                0x4b2e...a89f
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 pb-6 pt-2 space-y-2.5">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
            >
              Withdraw to Wallet
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
