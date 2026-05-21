"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAIDashboard } from "@/hooks/useAI";
import { activeContracts } from "@/config/contracts";

export default function AIOptimizerPage() {
  const {
    riskTolerance,
    setRiskTolerance,
    yields,
    strategy,
    recommendation,
    isLoading,
    refetchAll,
  } = useAIDashboard();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "high":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return "↗";
      case "bearish":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                <span className="text-purple-300 text-xs sm:text-sm font-medium">AI-Powered</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-300 text-xs sm:text-sm font-medium">DeFiLlama Live Data</span>
              </div>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              AI Yield{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Optimizer
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Advanced AI analyzes 5+ DeFi protocols to maximize your yield while managing risk
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Risk Tolerance Selector */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Risk Tolerance</h2>
                <p className="text-xs sm:text-sm text-gray-500">Select your preferred risk level for AI recommendations</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-full p-1 w-full sm:w-auto">
                  {(["conservative", "moderate", "aggressive"] as const).map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setRiskTolerance(risk)}
                      className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] ${
                        riskTolerance === risk
                          ? risk === "conservative"
                            ? "bg-green-500 text-white"
                            : risk === "moderate"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={refetchAll}
                  className="w-full sm:w-auto px-4 py-2.5 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-200 transition-colors min-h-[44px]"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-4 text-gray-600">AI is analyzing protocols...</span>
            </div>
          )}

          {/* Main Dashboard */}
          {!isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* AI Recommendation Card */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">AI Recommendation</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Optimal strategy for {riskTolerance} risk</p>
                    </div>
                  </div>
                </div>

                {recommendation && (
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Top Protocol */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-4 bg-purple-50 rounded-xl">
                      <div>
                        <p className="text-xs sm:text-sm text-purple-600 font-medium">Recommended Protocol</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-900">{recommendation.recommendedProtocol}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-purple-600">Expected APY</p>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                          {recommendation.expectedApy.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* Confidence & Risk */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">AI Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${recommendation.confidence}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-gray-900">{recommendation.confidence}%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(
                            recommendation.riskLevel
                          )}`}
                        >
                          {recommendation.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Allocation Strategy */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Allocation Strategy</h4>
                      <div className="space-y-2">
                        {recommendation.allocation.map((alloc, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{alloc.protocol}</span>
                                <span className="text-sm text-gray-500">{alloc.percentage}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                  style={{ width: `${alloc.percentage}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-green-600">
                              +{alloc.expectedYield.toFixed(2)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Reasoning
                      </h4>
                      <ul className="space-y-1">
                        {recommendation.reasoning.map((reason, idx) => (
                          <li key={idx} className="text-sm text-blue-600 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Protocol List & Market Stats */}
              <div className="space-y-4 sm:space-y-6">
                {/* Market Conditions */}
                {yields?.market && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Market Conditions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Volatility Index</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                yields.market.volatilityIndex > 60
                                  ? "bg-red-500"
                                  : yields.market.volatilityIndex > 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${yields.market.volatilityIndex}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{yields.market.volatilityIndex}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Market Trend</span>
                        <span
                          className={`text-sm font-semibold ${
                            yields.market.trendDirection === "bullish"
                              ? "text-green-600"
                              : yields.market.trendDirection === "bearish"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {getTrendIcon(yields.market.trendDirection)} {yields.market.trendDirection}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Gas Price</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {yields.market.gasPrice} gwei
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Protocol Stats */}
                {yields?.stats && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Protocol Stats</h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 bg-green-50 rounded-xl">
                        <p className="text-xs text-green-600">Max APY</p>
                        <p className="text-lg sm:text-xl font-bold text-green-700">{yields.stats.maxApy}%</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-xl">
                        <p className="text-xs text-blue-600">Avg APY</p>
                        <p className="text-lg sm:text-xl font-bold text-blue-700">{yields.stats.avgApy}%</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-purple-50 rounded-xl">
                        <p className="text-xs text-purple-600">Total TVL</p>
                        <p className="text-lg sm:text-xl font-bold text-purple-700">
                          ${(yields.stats.totalTvl / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-600">Protocols</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-700">{yields.stats.protocolCount}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Protocol List */}
                {yields?.protocols && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">All Protocols</h3>
                    <div className="space-y-3">
                      {yields.protocols
                        .sort((a, b) => b.apy - a.apy)
                        .map((protocol, idx) => (
                          <div
                            key={protocol.address}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  idx === 0
                                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                    : idx === 1
                                    ? "bg-gradient-to-br from-gray-300 to-gray-400"
                                    : idx === 2
                                    ? "bg-gradient-to-br from-orange-300 to-orange-400"
                                    : "bg-gray-300"
                                }`}
                              >
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{protocol.name}</p>
                                <p className="text-xs text-gray-500">Risk: {protocol.riskScore}/10</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">{protocol.apy.toFixed(2)}%</p>
                              <p className="text-xs text-gray-500">
                                ${(protocol.tvl / 1000000).toFixed(1)}M TVL
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Advantage Section */}
          {strategy?.aiAdvantage && (
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex flex-col items-start sm:items-center gap-6">
                <div className="w-full text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">AI Optimization Advantage</h3>
                  <p className="text-sm sm:text-base text-purple-100">
                    {strategy.aiAdvantage.riskReduction}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 sm:gap-8">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-purple-200">Single Protocol</p>
                    <p className="text-2xl sm:text-3xl font-bold">{strategy.aiAdvantage.singleProtocolApy}%</p>
                  </div>
                  <div className="text-3xl sm:text-4xl rotate-90 sm:rotate-0">→</div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-purple-200">AI Optimized</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-300">
                      {strategy.aiAdvantage.diversifiedApy}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* On-Chain Vault Contracts */}
          {"vaults" in activeContracts && (
            <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Deployed Vault Contracts</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Verified on Mantle Sepolia Testnet</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Lendle Vault", address: (activeContracts as { vaults: Record<string, string> }).vaults.lendle },
                  { name: "Merchant Moe Vault", address: (activeContracts as { vaults: Record<string, string> }).vaults.merchantMoe },
                  { name: "Agni Finance Vault", address: (activeContracts as { vaults: Record<string, string> }).vaults.agni },
                  { name: "Minterest Vault", address: (activeContracts as { vaults: Record<string, string> }).vaults.minterest },
                  { name: "KTX Vault", address: (activeContracts as { vaults: Record<string, string> }).vaults.ktx },
                ].map((vault) => (
                  <a
                    key={vault.name}
                    href={`https://sepolia.mantlescan.xyz/address/${vault.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-gray-900">{vault.name}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500 group-hover:text-blue-500 transition-colors">
                      {vault.address.slice(0, 6)}...{vault.address.slice(-4)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
