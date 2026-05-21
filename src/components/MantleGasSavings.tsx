"use client";

import { useState, useEffect } from "react";

interface MantleGasSavingsProps {
  transactionType?: "join" | "deposit" | "claim";
  showDetailed?: boolean;
}

// Gas estimates in gwei
const GAS_ESTIMATES = {
  join: {
    gasUsed: 150000,
    mantleGasPrice: 0.02, // $0.02 per transaction on Mantle
    ethGasPrice: 5.50, // ~$5.50 per transaction on Ethereum mainnet
  },
  deposit: {
    gasUsed: 80000,
    mantleGasPrice: 0.01,
    ethGasPrice: 3.20,
  },
  claim: {
    gasUsed: 120000,
    mantleGasPrice: 0.015,
    ethGasPrice: 4.80,
  },
};

export default function MantleGasSavings({
  transactionType = "join",
  showDetailed = false,
}: MantleGasSavingsProps) {
  const [animatedSavings, setAnimatedSavings] = useState(0);

  const estimate = GAS_ESTIMATES[transactionType];
  const savings = estimate.ethGasPrice - estimate.mantleGasPrice;
  const savingsPercent = ((savings / estimate.ethGasPrice) * 100).toFixed(0);

  useEffect(() => {
    // Animate the savings number
    const duration = 1000;
    const steps = 30;
    const increment = savings / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= savings) {
        setAnimatedSavings(savings);
        clearInterval(timer);
      } else {
        setAnimatedSavings(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [savings]);

  if (showDetailed) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Mantle Gas Savings</h4>
            <p className="text-xs text-gray-500">Compared to Ethereum Mainnet</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">On Ethereum</p>
            <p className="text-lg font-bold text-red-500 line-through">${estimate.ethGasPrice.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">On Mantle</p>
            <p className="text-lg font-bold text-green-600">${estimate.mantleGasPrice.toFixed(2)}</p>
          </div>
          <div className="bg-green-500 rounded-xl p-3 text-center text-white">
            <p className="text-xs text-green-100 mb-1">You Save</p>
            <p className="text-lg font-bold">{savingsPercent}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-xl">
          <span className="text-sm text-gray-600">Total Savings</span>
          <span className="text-xl font-bold text-green-600">
            ${animatedSavings.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>Save ${savings.toFixed(2)} vs ETH</span>
      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
        {savingsPercent}% less
      </span>
    </div>
  );
}

// Aggregate savings component for showing total platform savings
export function TotalGasSavings() {
  // Simulated total savings across all users
  const totalSaved = 12450.75;
  const totalTransactions = 2340;

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35L50 20L75 35V65L50 80L25 65V35Z" fill="currentColor"/>
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-lg">Powered by Mantle</h4>
          <p className="text-green-100 text-sm">Low fees, high performance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-green-100 text-sm mb-1">Total Gas Saved</p>
          <p className="text-2xl font-bold">${totalSaved.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-green-100 text-sm mb-1">Transactions</p>
          <p className="text-2xl font-bold">{totalTransactions.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
        <span className="text-green-100 text-sm">Avg savings per tx</span>
        <span className="font-bold">${(totalSaved / totalTransactions).toFixed(2)}</span>
      </div>
    </div>
  );
}
