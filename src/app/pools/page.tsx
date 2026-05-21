"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/ConnectWallet";
import USDCFaucet from "@/components/USDCFaucet";
import TestnetInfo from "@/components/TestnetInfo";
import {
  useAllPoolsWithInfo,
  useRequiredCollateral,
  useUSDCBalance,
  useUSDCAllowance,
  useApproveUSDC,
  useJoinPool,
  useCreatePool,
  FormattedPool,
} from "@/hooks/useContracts";

type PoolStatus = "all" | "open" | "active" | "completed";

export default function PoolsPage() {
  const { isConnected, address } = useAccount();
  const [filter, setFilter] = useState<PoolStatus>("all");
  const [selectedPool, setSelectedPool] = useState<FormattedPool | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch pools from contract
  const { pools, isLoading: poolsLoading, refetch: refetchPools } = useAllPoolsWithInfo();

  // Get USDC balance
  const { balance: usdcBalance, refetch: refetchBalance } = useUSDCBalance(address);

  // Get required collateral for selected pool
  const { collateral: requiredCollateral } = useRequiredCollateral(
    selectedPool?.address
  );

  // Get allowance for selected pool
  const { allowance, refetch: refetchAllowance } = useUSDCAllowance(
    address,
    selectedPool?.address
  );

  // Approve USDC
  const {
    approve,
    isPending: approving,
    isConfirming: confirmingApprove,
    isSuccess: approveSuccess,
  } = useApproveUSDC();

  // Join pool
  const {
    joinPool,
    isPending: joining,
    isConfirming: confirmingJoin,
    isSuccess: joinSuccess,
  } = useJoinPool();

  // Create pool
  const {
    createPool,
    isPending: creating,
    isConfirming: confirmingCreate,
    isSuccess: createSuccess,
  } = useCreatePool();

  // Create pool form state
  const [createForm, setCreateForm] = useState({
    depositAmount: 25,
    maxParticipants: 8,
    cycleDuration: 30,
  });

  // Refetch allowance after approve success
  useEffect(() => {
    if (approveSuccess) {
      refetchAllowance();
    }
  }, [approveSuccess, refetchAllowance]);

  // Handle join success
  const handleJoinSuccess = () => {
    setSelectedPool(null);
    refetchPools();
    refetchBalance();
  };

  useEffect(() => {
    if (joinSuccess) {
      handleJoinSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinSuccess]);

  // Handle create success
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    refetchPools();
  };

  useEffect(() => {
    if (createSuccess) {
      handleCreateSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess]);

  const filteredPools = pools
    ? filter === "all"
      ? pools
      : pools.filter((pool) => pool.status === filter)
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const handleApprove = () => {
    if (selectedPool && requiredCollateral) {
      approve(selectedPool.address, requiredCollateral);
    }
  };

  const handleJoinPool = () => {
    if (selectedPool) {
      joinPool(selectedPool.address);
    }
  };

  const handleCreatePool = () => {
    createPool(createForm.depositAmount, createForm.maxParticipants, createForm.cycleDuration);
  };

  const hasEnoughAllowance = requiredCollateral ? allowance >= requiredCollateral : false;
  const hasEnoughBalance = requiredCollateral ? usdcBalance >= requiredCollateral : false;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              Explore{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Arisan Pools
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Join an arisan pool and start earning yield with AI optimization
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testnet Info Banner */}
          <TestnetInfo />

          {/* USDC Faucet Banner */}
          <USDCFaucet />

          {/* Stats Bar */}
          {pools && pools.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-500">Total Pools</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{pools.length}</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-500">Open Pools</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {pools.filter((p) => p.status === "open").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-500">Active Pools</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {pools.filter((p) => p.status === "active").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-500">Your USDC Balance</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  {isConnected ? `${usdcBalance.toFixed(2)}` : "---"}
                </p>
              </div>
            </div>
          )}

          {/* Filters & Create */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Filter Tabs */}
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm min-w-max">
                {(["all", "open", "active", "completed"] as PoolStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[44px] ${
                      filter === status
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Create Pool Button */}
            {isConnected ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 min-h-[44px] whitespace-nowrap"
              >
                + Create Custom Pool
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <span className="text-sm text-gray-500 text-center sm:text-left">Connect wallet to create pool</span>
                <ConnectWallet variant="header" scrolled={true} />
              </div>
            )}
          </div>

          {/* Loading State */}
          {poolsLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <span className="ml-4 text-gray-600">Loading pools from blockchain...</span>
            </div>
          )}

          {/* Pool Grid */}
          {!poolsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPools.map((pool) => (
                <div
                  key={pool.address}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Pool Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{pool.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-mono">
                          {pool.address.slice(0, 6)}...{pool.address.slice(-4)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          pool.status
                        )}`}
                      >
                        {getStatusText(pool.status)}
                      </span>
                    </div>

                    {/* APY Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-2 bg-purple-50 rounded-xl w-fit">
                      <svg
                        className="w-4 h-4 text-purple-600 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-purple-700">{pool.apy}% APY</span>
                      <span className="text-xs text-purple-500 whitespace-nowrap">(AI Optimized)</span>
                    </div>
                  </div>

                  {/* Pool Stats */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Deposit</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{pool.depositAmount} USDC</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Cycle</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{pool.cycleDuration} days</p>
                      </div>
                    </div>

                    {/* Participants Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Participants</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {pool.currentParticipants}/{pool.maxParticipants}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(pool.currentParticipants / pool.maxParticipants) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Total Funds */}
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Pool Funds</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${pool.totalFunds.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="space-y-2">
                      {pool.status === "open" && (
                        <button
                          onClick={() => setSelectedPool(pool)}
                          disabled={!isConnected}
                          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 min-h-[44px] text-sm sm:text-base ${
                            isConnected
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:shadow-green-500/25"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isConnected ? "Join Pool" : "Connect Wallet to Join"}
                        </button>
                      )}
                      <a
                        href={`/pools/${pool.address}`}
                        className={`block w-full py-3 text-center rounded-xl font-semibold transition-all duration-300 min-h-[44px] text-sm sm:text-base ${
                          pool.status === "open"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : pool.status === "active"
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!poolsLoading && filteredPools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pools found</h3>
              <p className="text-gray-500">
                {pools && pools.length === 0
                  ? "No pools have been created yet. Be the first to create one!"
                  : `There are no ${filter} pools at the moment.`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Pool Modal */}
      {selectedPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPool(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Join {selectedPool.name}</h3>
              <button
                onClick={() => setSelectedPool(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Monthly Deposit</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {selectedPool.depositAmount} USDC
                </p>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 rounded-xl">
                <p className="text-xs sm:text-sm text-blue-600 mb-1">Required Collateral</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">
                  {requiredCollateral
                    ? `${requiredCollateral} USDC`
                    : `${Math.ceil(selectedPool.depositAmount * (selectedPool.maxParticipants - 1) * 1.25)} USDC`}
                </p>
                <p className="text-xs text-blue-500 mt-1">125% of remaining deposits - returned at end + yield bonus</p>
              </div>

              <div className="p-3 sm:p-4 bg-purple-50 rounded-xl">
                <p className="text-xs sm:text-sm text-purple-600 mb-1">Estimated APY</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">{selectedPool.apy}%</p>
                <p className="text-xs text-purple-500 mt-1">AI Yield Optimizer active</p>
              </div>

              {/* Balance Warning */}
              {!hasEnoughBalance && requiredCollateral && (
                <div className="p-3 sm:p-4 bg-red-50 rounded-xl">
                  <p className="text-xs sm:text-sm text-red-600">
                    Insufficient USDC balance. You need {requiredCollateral} USDC but only have{" "}
                    {usdcBalance.toFixed(2)} USDC.
                  </p>
                </div>
              )}

              {/* Allowance Status */}
              {hasEnoughBalance && (
                <div className="p-3 sm:p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-green-600">USDC Allowance</span>
                    <span className="text-xs sm:text-sm font-semibold text-green-700">
                      {allowance.toFixed(2)} / {requiredCollateral?.toFixed(2) || "0"} USDC
                    </span>
                  </div>
                  {hasEnoughAllowance && (
                    <p className="text-xs text-green-500 mt-1">Ready to join!</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!hasEnoughAllowance ? (
                <button
                  onClick={handleApprove}
                  disabled={!hasEnoughBalance || approving || confirmingApprove}
                  className={`w-full py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm sm:text-base ${
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
                  className={`w-full py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm sm:text-base ${
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

            <p className="mt-4 text-center text-xs text-gray-500">
              By joining, you agree to make monthly deposits for {selectedPool.maxParticipants}{" "}
              months
            </p>
          </div>
        </div>
      )}

      {/* Create Pool Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Create Custom Pool</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {/* Deposit Amount */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Monthly Deposit (USDC)
                </label>
                <input
                  type="number"
                  min="1"
                  value={createForm.depositAmount}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, depositAmount: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base min-h-[44px]"
                />
              </div>

              {/* Max Participants */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Max Participants (2-50)
                </label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={createForm.maxParticipants}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, maxParticipants: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base min-h-[44px]"
                />
              </div>

              {/* Cycle Duration */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Cycle Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  value={createForm.cycleDuration}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, cycleDuration: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base min-h-[44px]"
                />
              </div>

              {/* Summary */}
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl space-y-2">
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="text-gray-500">Total Pool Value</span>
                  <span className="font-semibold">
                    {createForm.depositAmount * createForm.maxParticipants} USDC
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="text-gray-500">Pool Duration</span>
                  <span className="font-semibold">
                    {createForm.cycleDuration * createForm.maxParticipants} days
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="text-gray-500">Required Collateral (125%)</span>
                  <span className="font-semibold">
                    {Math.ceil(createForm.depositAmount * (createForm.maxParticipants - 1) * 1.25)} USDC
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreatePool}
              disabled={creating || confirmingCreate}
              className={`w-full py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm sm:text-base ${
                creating || confirmingCreate
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg"
              }`}
            >
              {creating || confirmingCreate ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {creating ? "Creating..." : "Confirming..."}
                </span>
              ) : (
                "Create Pool"
              )}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
