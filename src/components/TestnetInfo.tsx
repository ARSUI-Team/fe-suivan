"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { mantleSepoliaTestnet } from "wagmi/chains";

export default function TestnetInfo() {
  const { address, isConnected, chain } = useAccount();
  const [isDismissed, setIsDismissed] = useState(false);

  // Get MNT balance
  const { data: mntBalance } = useBalance({
    address,
    query: {
      enabled: isConnected && !!address && chain?.id === mantleSepoliaTestnet.id,
    },
  });

  // Only show on Mantle Sepolia Testnet
  if (!isConnected || chain?.id !== mantleSepoliaTestnet.id || isDismissed) {
    return null;
  }

  const balance = mntBalance ? Number(mntBalance.formatted) : 0;
  const hasLowBalance = balance < 0.1; // Less than 0.1 MNT

  return (
    <div className={`mb-6 p-4 rounded-2xl border ${
      hasLowBalance
        ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
        : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            hasLowBalance ? "bg-orange-100" : "bg-blue-100"
          }`}>
            {hasLowBalance ? (
              <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold mb-1 ${hasLowBalance ? "text-orange-900" : "text-gray-900"}`}>
              {hasLowBalance ? "⚠️ Low MNT Balance!" : "🧪 Testnet Mode Active"}
            </h3>
            <div className="space-y-2">
              {hasLowBalance ? (
                <p className="text-sm text-orange-700">
                  Your MNT balance is low (<span className="font-mono font-semibold">{balance.toFixed(4)} MNT</span>).
                  You need MNT for gas fees to claim USDC and join pools.
                </p>
              ) : (
                <p className="text-sm text-gray-700">
                  You're on Mantle Sepolia Testnet with <span className="font-mono font-semibold">{balance.toFixed(4)} MNT</span>
                </p>
              )}

              <div className={`flex flex-wrap items-center gap-2 text-sm ${hasLowBalance ? "text-orange-600" : "text-blue-600"}`}>
                <span className="font-medium">Need MNT for gas?</span>
                <a
                  href="https://faucet.sepolia.mantle.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    hasLowBalance
                      ? "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  }`}
                >
                  Get Free MNT
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {!hasLowBalance && (
                <p className="text-xs text-gray-500">
                  ℹ️ Once you have MNT, you can claim free USDC below to test pools
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-2 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
