"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SharePool from "@/components/SharePool";
import MantleGasSavings from "@/components/MantleGasSavings";
import PoolAnalyticsChart from "@/components/PoolAnalyticsChart";
import { SuccessCelebration } from "@/components/Confetti";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet";
import USDCFaucet from "@/components/USDCFaucet";
import TestnetInfo from "@/components/TestnetInfo";
import {
  usePoolInfo,
  useParticipantInfo,
  useParticipantList,
  useRequiredCollateral,
  useUSDCBalance,
  useUSDCAllowance,
  useApproveUSDC,
  useJoinPool,
  useMakeDeposit,
  useHasDepositedThisCycle,
  useCurrentYield,
  useLastWinner,
} from "@/hooks/useContracts";
import { formatUnits } from "viem";

export default function PoolDetailPage() {
  const params = useParams();
  const poolAddress = params.address as `0x${string}`;
  const { isConnected, address } = useAccount();

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSuccessCelebration, setShowSuccessCelebration] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });

  // Fetch pool data
  const { poolInfo, isLoading: poolLoading, refetch: refetchPool } = usePoolInfo(poolAddress);
  const { participantAddresses, participantCount, isLoading: participantsLoading } = useParticipantList(poolAddress);
  const { collateral: requiredCollateral } = useRequiredCollateral(poolAddress);
  const { currentYield, refetch: refetchYield } = useCurrentYield(poolAddress);
  const { lastWinner } = useLastWinner(poolAddress);

  // User-specific data
  const { participantInfo, refetch: refetchParticipant } = useParticipantInfo(poolAddress, address);
  const { balance: usdcBalance, refetch: refetchBalance } = useUSDCBalance(address);
  const { allowance, refetch: refetchAllowance } = useUSDCAllowance(address, poolAddress);
  const { hasDeposited, refetch: refetchHasDeposited } = useHasDepositedThisCycle(poolAddress, address);

  // Actions
  const { approve, isPending: approving, isConfirming: confirmingApprove, isSuccess: approveSuccess } = useApproveUSDC();
  const { joinPool, isPending: joining, isConfirming: confirmingJoin, isSuccess: joinSuccess } = useJoinPool();
  const { makeDeposit, isPending: depositing, isConfirming: confirmingDeposit, isSuccess: depositSuccess } = useMakeDeposit();

  // Format pool info
  const depositAmount = poolInfo ? Number(formatUnits(poolInfo.depositAmount, 6)) : 0;
  const maxParticipants = poolInfo ? Number(poolInfo.maxParticipants) : 0;
  const currentParticipants = poolInfo ? Number(poolInfo.currentParticipants) : 0;
  const totalFunds = poolInfo ? Number(formatUnits(poolInfo.totalFunds, 6)) : 0;
  const currentCycle = poolInfo ? Number(poolInfo.cycle) : 0;
  const isStarted = poolInfo?.started || false;
  const isActive = poolInfo?.active || false;

  // Determine pool status
  let status: "open" | "active" | "completed" = "open";
  if (isStarted && isActive) status = "active";
  else if (isStarted && !isActive) status = "completed";

  // Pool name based on deposit
  let poolName = "Custom Pool";
  if (depositAmount === 10) poolName = "Small Pool";
  else if (depositAmount === 50) poolName = "Medium Pool";
  else if (depositAmount === 100) poolName = "Large Pool";

  // User is participant
  const isParticipant = participantInfo?.isActive || false;

  // Allowance check
  const hasEnoughAllowance = requiredCollateral ? allowance >= requiredCollateral : false;
  const hasEnoughBalance = requiredCollateral ? usdcBalance >= requiredCollateral : false;
  const hasEnoughForDeposit = usdcBalance >= depositAmount;
  const hasDepositAllowance = allowance >= depositAmount;

  // Refetch on success
  useEffect(() => {
    if (approveSuccess) refetchAllowance();
  }, [approveSuccess, refetchAllowance]);

  // Handle join success
  const handleJoinSuccess = () => {
    setShowJoinModal(false);
    setSuccessMessage({ title: "Successfully Joined!", message: "Welcome to the arisan pool. Your collateral is now earning yield." });
    setShowSuccessCelebration(true);
    refetchPool();
    refetchParticipant();
    refetchBalance();
  };

  useEffect(() => {
    if (joinSuccess) {
      handleJoinSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinSuccess]);

  // Handle deposit success
  const handleDepositSuccess = () => {
    setShowDepositModal(false);
    setSuccessMessage({ title: "Deposit Complete!", message: "Your monthly deposit has been made successfully." });
    setShowSuccessCelebration(true);
    refetchPool();
    refetchParticipant();
    refetchBalance();
    refetchHasDeposited();
    refetchYield();
  };

  useEffect(() => {
    if (depositSuccess) {
      handleDepositSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositSuccess]);

  const handleApprove = (amount: number) => {
    approve(poolAddress, amount);
  };

  const handleJoinPool = () => {
    joinPool(poolAddress);
  };

  const handleMakeDeposit = () => {
    makeDeposit(poolAddress);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "open": return "bg-green-100 text-green-700";
      case "active": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (poolLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <span className="ml-4 text-gray-600">Loading pool data...</span>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/pools" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pools
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-space), sans-serif" }}>
                  {poolName}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <a
                href={`https://sepolia.mantlescan.xyz/address/${poolAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 font-mono text-sm hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
              >
                {poolAddress}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <SharePool
                poolAddress={poolAddress}
                poolName={poolName}
                monthlyDeposit={depositAmount}
                participants={currentParticipants}
                maxParticipants={maxParticipants}
                apy={8.5}
              />
              {!isConnected && <ConnectWallet variant="header" scrolled={true} />}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Testnet Info Banner */}
          <TestnetInfo />

          {/* USDC Faucet Banner */}
          <USDCFaucet />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pool Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pool Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pool Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Monthly Deposit</p>
                    <p className="text-2xl font-bold text-gray-900">{depositAmount} USDC</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Participants</p>
                    <p className="text-2xl font-bold text-gray-900">{currentParticipants}/{maxParticipants}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Current Cycle</p>
                    <p className="text-2xl font-bold text-gray-900">{currentCycle}/{maxParticipants}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Total Funds</p>
                    <p className="text-2xl font-bold text-gray-900">${totalFunds.toFixed(2)}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Pool Capacity</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round((currentParticipants / maxParticipants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(currentParticipants / maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Yield Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">AI Yield Optimizer</h2>
                  <MantleGasSavings transactionType="join" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-purple-600 mb-1">Current Yield</p>
                    <p className="text-2xl font-bold text-purple-700">${currentYield.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-600 mb-1">Est. APY</p>
                    <p className="text-2xl font-bold text-green-700">8.5%</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1">Collateral Required</p>
                    <p className="text-2xl font-bold text-blue-700">{requiredCollateral?.toFixed(0) || 0} USDC</p>
                  </div>
                </div>
              </div>

              {/* Pool Analytics Chart */}
              <PoolAnalyticsChart title={`${poolName} Performance`} poolAddress={poolAddress} />

              {/* Participants List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Participants ({participantCount})
                </h2>
                {participantsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : participantAddresses.length > 0 ? (
                  <div className="space-y-3">
                    {participantAddresses.map((addr, index) => (
                      <div
                        key={addr}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          addr.toLowerCase() === address?.toLowerCase()
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-mono text-sm text-gray-900">
                              {addr.slice(0, 6)}...{addr.slice(-4)}
                            </p>
                            {addr.toLowerCase() === address?.toLowerCase() && (
                              <span className="text-xs text-green-600 font-semibold">You</span>
                            )}
                          </div>
                        </div>
                        {addr.toLowerCase() === lastWinner?.toLowerCase() && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            Last Winner
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No participants yet. Be the first to join!</p>
                )}
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              {/* User Status Card */}
              {isConnected && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Your Status</h2>

                  {isParticipant ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-semibold text-green-700">Active Participant</span>
                        </div>
                        <p className="text-sm text-green-600">You are part of this arisan pool</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Collateral Locked</span>
                          <span className="font-semibold">{participantInfo?.collateralAmount.toFixed(2)} USDC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Total Deposited</span>
                          <span className="font-semibold">{participantInfo?.totalDeposited.toFixed(2)} USDC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Received Payout</span>
                          <span className={`font-semibold ${participantInfo?.hasReceivedPayout ? "text-green-600" : "text-gray-600"}`}>
                            {participantInfo?.hasReceivedPayout ? "Yes" : "Not yet"}
                          </span>
                        </div>
                      </div>

                      {/* Deposit Button for Active Pool */}
                      {status === "active" && !hasDeposited && (
                        <button
                          onClick={() => setShowDepositModal(true)}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Make Monthly Deposit
                        </button>
                      )}

                      {status === "active" && hasDeposited && (
                        <div className="p-4 bg-blue-50 rounded-xl text-center">
                          <p className="text-blue-700 font-semibold">Deposit complete for this cycle</p>
                          <p className="text-sm text-blue-500">Wait for next cycle</p>
                        </div>
                      )}

                      {/* Claim section for completed pool */}
                      {status === "completed" && (participantInfo?.collateralAmount ?? 0) > 0 && (
                        <div className="p-4 bg-yellow-50 rounded-xl">
                          <h3 className="font-semibold text-yellow-700 mb-2">Collateral Available</h3>
                          <p className="text-sm text-yellow-600 mb-3">
                            Your collateral + yield bonus has been returned automatically when the pool ended.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">You are not a participant in this pool.</p>
                      </div>

                      {status === "open" && (
                        <button
                          onClick={() => setShowJoinModal(true)}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Join This Pool
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Wallet Balance */}
              {isConnected && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Your Wallet</h2>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">USDC Balance</p>
                    <p className="text-2xl font-bold text-gray-900">{usdcBalance.toFixed(2)} USDC</p>
                  </div>
                </div>
              )}

              {/* Connect Wallet CTA */}
              {!isConnected && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Get Started</h2>
                  <p className="text-gray-500 mb-4">Connect your wallet to join this pool or view your status</p>
                  <ConnectWallet variant="header" scrolled={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Join Pool Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowJoinModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Join {poolName}</h3>
              <button onClick={() => setShowJoinModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Monthly Deposit</p>
                <p className="text-2xl font-bold text-gray-900">{depositAmount} USDC</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">Required Collateral (125%)</p>
                <p className="text-2xl font-bold text-blue-700">{requiredCollateral?.toFixed(0) || 0} USDC</p>
                <p className="text-xs text-blue-500 mt-1">Returned at end of arisan + yield bonus</p>
              </div>

              {!hasEnoughBalance && (
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-red-600">
                    Insufficient USDC. You need {requiredCollateral} USDC but only have {usdcBalance.toFixed(2)} USDC.
                  </p>
                </div>
              )}

              {hasEnoughBalance && (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">USDC Allowance</span>
                    <span className="text-sm font-semibold text-green-700">
                      {allowance.toFixed(2)} / {requiredCollateral?.toFixed(0)} USDC
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!hasEnoughAllowance ? (
                <button
                  onClick={() => handleApprove(requiredCollateral || 0)}
                  disabled={!hasEnoughBalance || approving || confirmingApprove}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    !hasEnoughBalance || approving || confirmingApprove
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  {approving || confirmingApprove ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {approving ? "Approving..." : "Confirming..."}
                    </span>
                  ) : (
                    "Approve USDC"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleJoinPool}
                  disabled={joining || confirmingJoin}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    joining || confirmingJoin
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  {joining || confirmingJoin ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {joining ? "Joining..." : "Confirming..."}
                    </span>
                  ) : (
                    "Join Pool"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Make Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDepositModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Make Monthly Deposit</h3>
              <button onClick={() => setShowDepositModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Deposit Amount</p>
                <p className="text-2xl font-bold text-gray-900">{depositAmount} USDC</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">Current Cycle</p>
                <p className="text-2xl font-bold text-blue-700">{currentCycle} of {maxParticipants}</p>
              </div>

              {!hasEnoughForDeposit && (
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-red-600">
                    Insufficient USDC. You need {depositAmount} USDC but only have {usdcBalance.toFixed(2)} USDC.
                  </p>
                </div>
              )}

              {hasEnoughForDeposit && (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Your Balance</span>
                    <span className="text-sm font-semibold text-green-700">{usdcBalance.toFixed(2)} USDC</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!hasDepositAllowance ? (
                <button
                  onClick={() => handleApprove(depositAmount)}
                  disabled={!hasEnoughForDeposit || approving || confirmingApprove}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    !hasEnoughForDeposit || approving || confirmingApprove
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  {approving || confirmingApprove ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {approving ? "Approving..." : "Confirming..."}
                    </span>
                  ) : (
                    "Approve USDC"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleMakeDeposit}
                  disabled={depositing || confirmingDeposit}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    depositing || confirmingDeposit
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  {depositing || confirmingDeposit ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {depositing ? "Depositing..." : "Confirming..."}
                    </span>
                  ) : (
                    "Make Deposit"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Celebration */}
      <SuccessCelebration
        show={showSuccessCelebration}
        title={successMessage.title}
        message={successMessage.message}
        onClose={() => setShowSuccessCelebration(false)}
      />

      <Footer />
    </main>
  );
}
