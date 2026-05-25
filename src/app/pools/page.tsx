"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import ConnectWallet from "@/components/ConnectWallet";
import {
  useAllPoolsWithInfo,
  useRequiredCollateral,
  useUSDCBalance,
  useJoinPool,
  useCreatePool,
  FormattedPool,
} from "@/hooks/useContracts";

type PoolStatus = "all" | "open" | "active" | "completed";

export default function PoolsPage() {
  const account = useCurrentAccount();
  const { isConnected } = useCurrentWallet();
  const address = account?.address;
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

  const handleJoinPool = () => {
    if (selectedPool) {
      joinPool(selectedPool.address);
    }
  };

  const handleCreatePool = () => {
    createPool(createForm.depositAmount, createForm.maxParticipants, createForm.cycleDuration);
  };

  const hasEnoughBalance = requiredCollateral ? usdcBalance >= requiredCollateral : false;

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />

      <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 md:px-10 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(94,200,255,0.32),transparent_30%),linear-gradient(180deg,#fbf7ed,#f8fbff)]" />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="protocol-font mb-5 inline-flex rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] shadow-[4px_4px_0_#06111f]">
              pool_explorer
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-7xl">
              Explore ROSCA Pools
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              Discover rotating savings pools with visible cycle state, participant progress,
              and APY signals prepared for the next Suivan protocol integration.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[5px_5px_0_#06111f]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.2em] text-sky-700">
                  Sui-native pool registry
                </p>
                <h2 className="mt-1 text-lg font-black text-slate-950">One-click joins, visible cycles, gasless-ready actions.</h2>
                <p className="mt-1 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
                  Suivan models ROSCA pools as Sui objects with clear member progress, payout order,
                  and sponsored transaction hooks for consumer-grade onboarding.
                </p>
              </div>
              <span className="protocol-font rounded-full border-2 border-slate-950 bg-[#dff8ff] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                Testnet-ready
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          {pools && pools.length > 0 && (
            <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl border-2 border-slate-950 bg-white p-4 shadow-[4px_4px_0_#06111f]">
                <p className="protocol-font text-xs font-black text-slate-400">TOTAL POOLS</p>
                <p className="protocol-font mt-2 text-3xl font-black text-slate-950">{pools.length}</p>
              </div>
              <div className="rounded-2xl border-2 border-slate-950 bg-[#d9f8df] p-4 shadow-[4px_4px_0_#06111f]">
                <p className="protocol-font text-xs font-black text-slate-500">OPEN</p>
                <p className="protocol-font mt-2 text-3xl font-black text-slate-950">
                  {pools.filter((p) => p.status === "open").length}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-slate-950 bg-[#dff8ff] p-4 shadow-[4px_4px_0_#06111f]">
                <p className="protocol-font text-xs font-black text-slate-500">ACTIVE</p>
                <p className="protocol-font mt-2 text-3xl font-black text-slate-950">
                  {pools.filter((p) => p.status === "active").length}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-slate-950 bg-[#fff1c7] p-4 shadow-[4px_4px_0_#06111f]">
                <p className="protocol-font text-xs font-black text-slate-500">USDC</p>
                <p className="protocol-font mt-2 text-3xl font-black text-slate-950">
                  {isConnected ? `${usdcBalance.toFixed(2)}` : "---"}
                </p>
              </div>
            </div>
          )}

          {/* Filters & Create */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Filter Tabs */}
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max items-center gap-2 rounded-full border-2 border-slate-950 bg-white p-1 shadow-[4px_4px_0_#06111f]">
                {(["all", "open", "active", "completed"] as PoolStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`protocol-font min-h-[44px] whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition-all duration-200 ${
                      filter === status
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-[#dff8ff] hover:text-slate-950"
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
              className="protocol-font min-h-[44px] w-full whitespace-nowrap rounded-full border-2 border-slate-950 bg-sky-400 px-6 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5 md:w-auto"
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
              <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white px-6 py-5 shadow-[5px_5px_0_#06111f]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-950 border-b-sky-400" />
                  <div>
                    <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                      syncing
                    </p>
                    <p className="mt-1 font-bold text-slate-600">Loading pool state...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pool Grid */}
          {!poolsLoading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredPools.map((pool) => (
                <div
                  key={pool.address}
                  className="overflow-hidden rounded-[1.5rem] border-2 border-slate-950 bg-white shadow-[6px_6px_0_#06111f] transition hover:-translate-y-1"
                >
                  <div className="border-b-2 border-slate-950 bg-[#f8fbff] p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="protocol-font text-xs font-black uppercase text-slate-400">object::pool</p>
                        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">{pool.name}</h3>
                        <p className="protocol-font mt-1 text-xs font-bold text-slate-500">
                          {pool.address.slice(0, 6)}...{pool.address.slice(-4)}
                        </p>
                      </div>
                      <span
                        className={`protocol-font rounded-full border-2 border-slate-950 px-3 py-1 text-xs font-black ${getStatusColor(
                          pool.status
                        )}`}
                      >
                        {getStatusText(pool.status)}
                      </span>
                    </div>

                    {/* APY Badge */}
                    <div className="flex w-fit flex-wrap items-center gap-2 rounded-full border-2 border-slate-950 bg-[#fff1c7] px-3 py-2">
                      <span className="protocol-font text-xs font-black text-slate-950">{pool.apy}% APY</span>
                      <span className="protocol-font whitespace-nowrap text-xs font-black text-slate-500">Yield signal</span>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="protocol-font mb-1 text-xs font-black text-slate-400">DEPOSIT</p>
                        <p className="protocol-font text-lg font-black text-slate-950">{pool.depositAmount} USDC</p>
                      </div>
                      <div>
                        <p className="protocol-font mb-1 text-xs font-black text-slate-400">CYCLE</p>
                        <p className="protocol-font text-lg font-black text-slate-950">{pool.cycleDuration} days</p>
                      </div>
                    </div>

                    {/* Participants Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="protocol-font text-xs font-black text-slate-500">Participants</span>
                        <span className="protocol-font text-sm font-black text-slate-950">
                          {pool.currentParticipants}/{pool.maxParticipants}
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full border-2 border-slate-950 bg-slate-100">
                        <div
                          className="h-full bg-teal-400 transition-all duration-500"
                          style={{
                            width: `${(pool.currentParticipants / pool.maxParticipants) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Total Funds */}
                    <div className="rounded-2xl border-2 border-slate-950 bg-[#fbf7ed] p-3">
                      <div className="flex items-center justify-between">
                        <span className="protocol-font text-xs font-black text-slate-500">Total Pool Funds</span>
                        <span className="protocol-font text-lg font-black text-slate-950">
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
                              ? "border-2 border-slate-950 bg-sky-400 text-slate-950 shadow-[3px_3px_0_#06111f] hover:-translate-y-0.5"
                              : "cursor-not-allowed border-2 border-slate-200 bg-slate-100 text-slate-400"
                          }`}
                        >
                          {isConnected ? "Join Pool" : "Connect Wallet to Join"}
                        </button>
                      )}
                      <a
                        href={`/pools/${pool.address}`}
                        className={`block w-full py-3 text-center rounded-xl font-semibold transition-all duration-300 min-h-[44px] text-sm sm:text-base ${
                          pool.status === "open"
                            ? "border-2 border-slate-950 bg-white text-slate-950 hover:bg-[#dff8ff]"
                            : pool.status === "active"
                            ? "border-2 border-slate-950 bg-[#dff8ff] text-slate-950 hover:bg-sky-200"
                            : "border-2 border-slate-950 bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white py-16 text-center shadow-[6px_6px_0_#06111f]">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-950 bg-[#dff8ff]">
                <svg
                  className="h-8 w-8 text-slate-950"
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
              <h3 className="mb-2 text-2xl font-black tracking-[-0.03em] text-slate-950">No pools found</h3>
              <p className="font-semibold text-slate-500">
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
          <div className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] border-2 border-slate-950 bg-[#fbf7ed] p-5 shadow-[8px_8px_0_#06111f] sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                  join_cycle
                </p>
                <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">Join {selectedPool.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPool(null)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 p-2 text-slate-950 transition hover:-translate-y-0.5"
              >
                <svg
                  className="h-5 w-5"
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
              <div className="rounded-2xl border-2 border-slate-950 bg-white p-3 sm:p-4">
                <p className="protocol-font mb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Monthly Deposit</p>
                <p className="protocol-font text-xl font-black text-slate-950 sm:text-2xl">
                  {selectedPool.depositAmount} USDC
                </p>
              </div>

              <div className="rounded-2xl border-2 border-slate-950 bg-[#dff8ff] p-3 sm:p-4">
                <p className="protocol-font mb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Required Collateral</p>
                <p className="protocol-font text-xl font-black text-slate-950 sm:text-2xl">
                  {requiredCollateral
                    ? `${requiredCollateral} USDC`
                    : `${Math.ceil(selectedPool.depositAmount * (selectedPool.maxParticipants - 1) * 1.25)} USDC`}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">125% of remaining deposits, returned at cycle end plus yield bonus</p>
              </div>

              <div className="rounded-2xl border-2 border-slate-950 bg-[#fff1c7] p-3 sm:p-4">
                <p className="protocol-font mb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Estimated APY</p>
                <p className="protocol-font text-xl font-black text-slate-950 sm:text-2xl">{selectedPool.apy}%</p>
                <p className="mt-1 text-xs font-semibold text-slate-600">Yield routing signal for Suivan pools</p>
              </div>

              {/* Balance Warning */}
              {!hasEnoughBalance && requiredCollateral && (
                <div className="rounded-2xl border-2 border-slate-950 bg-[#ffe0d8] p-3 sm:p-4">
                  <p className="text-xs font-bold text-slate-700 sm:text-sm">
                    Insufficient USDC balance. You need {requiredCollateral} USDC but only have{" "}
                    {usdcBalance.toFixed(2)} USDC.
                  </p>
                </div>
              )}

              {hasEnoughBalance && (
                <div className="rounded-2xl border-2 border-slate-950 bg-[#d9f8df] p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="protocol-font text-xs font-black uppercase tracking-[0.12em] text-slate-500 sm:text-sm">Sui Flow</span>
                    <span className="protocol-font text-xs font-black text-slate-950 sm:text-sm">One click</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-600">No pre-authorization step. Suivan will submit one Sui transaction.</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleJoinPool}
                disabled={!hasEnoughBalance || joining || confirmingJoin}
                className={`w-full py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm sm:text-base ${
                  !hasEnoughBalance || joining || confirmingJoin
                    ? "cursor-not-allowed border-2 border-slate-200 bg-slate-100 text-slate-400"
                    : "border-2 border-slate-950 bg-sky-400 text-slate-950 shadow-[3px_3px_0_#06111f] hover:-translate-y-0.5"
                }`}
              >
                {joining || confirmingJoin ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-b-white"></div>
                    {joining ? "Joining..." : "Finalizing..."}
                  </span>
                ) : (
                  "Join Pool"
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs font-semibold text-slate-500">
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
          <div className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] border-2 border-slate-950 bg-[#fbf7ed] p-5 shadow-[8px_8px_0_#06111f] sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                  create_pool
                </p>
                <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">Create Custom Pool</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 p-2 text-slate-950 transition hover:-translate-y-0.5"
              >
                <svg
                  className="h-5 w-5"
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
                <label className="protocol-font mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
                  Monthly Deposit (USDC)
                </label>
                <input
                  type="number"
                  min="1"
                  value={createForm.depositAmount}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, depositAmount: Number(e.target.value) })
                  }
                  className="min-h-[44px] w-full rounded-2xl border-2 border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:bg-[#dff8ff] sm:text-base"
                />
              </div>

              {/* Max Participants */}
              <div>
                <label className="protocol-font mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
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
                  className="min-h-[44px] w-full rounded-2xl border-2 border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:bg-[#dff8ff] sm:text-base"
                />
              </div>

              {/* Cycle Duration */}
              <div>
                <label className="protocol-font mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
                  Cycle Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  value={createForm.cycleDuration}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, cycleDuration: Number(e.target.value) })
                  }
                  className="min-h-[44px] w-full rounded-2xl border-2 border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:bg-[#dff8ff] sm:text-base"
                />
              </div>

              {/* Summary */}
              <div className="space-y-2 rounded-2xl border-2 border-slate-950 bg-white p-3 sm:p-4">
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="font-semibold text-slate-500">Total Pool Value</span>
                  <span className="protocol-font font-black text-slate-950">
                    {createForm.depositAmount * createForm.maxParticipants} USDC
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="font-semibold text-slate-500">Pool Duration</span>
                  <span className="protocol-font font-black text-slate-950">
                    {createForm.cycleDuration * createForm.maxParticipants} days
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="font-semibold text-slate-500">Required Collateral (125%)</span>
                  <span className="protocol-font font-black text-slate-950">
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
                  ? "cursor-not-allowed border-2 border-slate-200 bg-slate-100 text-slate-400"
                  : "border-2 border-slate-950 bg-sky-400 text-slate-950 shadow-[3px_3px_0_#06111f] hover:-translate-y-0.5"
              }`}
            >
              {creating || confirmingCreate ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-b-white"></div>
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
