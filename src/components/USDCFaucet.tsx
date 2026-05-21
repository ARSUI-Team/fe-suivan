"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { mantleSepoliaTestnet } from "wagmi/chains";
import { parseUnits } from "viem";
import { activeContracts } from "@/config/contracts";

const MOCK_USDC_ADDRESS = activeContracts.usdc;
const FAUCET_AMOUNT = 10_000; // 10,000 USDC - enough to join all pools

const MOCK_USDC_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

export default function USDCFaucet() {
  const { address, isConnected, chain } = useAccount();
  const [isVisible, setIsVisible] = useState(true);

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleClaim = async () => {
    if (!address) return;
    try {
      writeContract({
        address: MOCK_USDC_ADDRESS,
        abi: MOCK_USDC_ABI,
        functionName: "mint",
        args: [address, parseUnits(String(FAUCET_AMOUNT), 6)],
        chainId: mantleSepoliaTestnet.id,
      });
    } catch (error) {
      console.error("Error claiming USDC:", error);
    }
  };

  if (!isConnected || chain?.id !== mantleSepoliaTestnet.id || !isVisible) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">USDC Claimed Successfully!</h3>
              <p className="text-sm text-gray-600">{FAUCET_AMOUNT.toLocaleString()} USDC has been added to your wallet</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border border-blue-200 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Need Test USDC?</h3>
            <p className="text-sm text-gray-600">Claim {FAUCET_AMOUNT.toLocaleString()} free USDC to test all Archa pools</p>
          </div>
        </div>
        <button
          onClick={handleClaim}
          disabled={isPending}
          className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Claiming...
            </span>
          ) : (
            "Claim USDC"
          )}
        </button>
      </div>
    </div>
  );
}
