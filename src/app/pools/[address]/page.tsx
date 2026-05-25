"use client";

import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import { SuccessCelebration } from "@/components/Confetti";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PoolAnalyticsChart from "@/components/PoolAnalyticsChart";
import SharePool from "@/components/SharePool";
import SuiFeeProfile from "@/components/SuiFeeProfile";
import {
  useCurrentYield,
  useHasDepositedThisCycle,
  useJoinPool,
  useLastWinner,
  useMakeDeposit,
  useParticipantInfo,
  useParticipantList,
  usePoolInfo,
  useRequiredCollateral,
  useUSDCBalance,
} from "@/hooks/useContracts";

export default function PoolDetailPage() {
  const params = useParams();
  const poolAddress = params.address as string;
  const account = useCurrentAccount();
  const { isConnected } = useCurrentWallet();
  const address = account?.address;
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSuccessCelebration, setShowSuccessCelebration] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });

  const { poolInfo, isLoading: poolLoading, refetch: refetchPool } = usePoolInfo(poolAddress);
  const { participantAddresses, participantCount, isLoading: participantsLoading } = useParticipantList(poolAddress);
  const { collateral: requiredCollateral } = useRequiredCollateral(poolAddress);
  const { currentYield, refetch: refetchYield } = useCurrentYield(poolAddress);
  const { lastWinner } = useLastWinner(poolAddress);
  const { participantInfo, refetch: refetchParticipant } = useParticipantInfo(poolAddress, address);
  const { balance: usdcBalance, refetch: refetchBalance } = useUSDCBalance(address);
  const { hasDeposited, refetch: refetchHasDeposited } = useHasDepositedThisCycle(poolAddress, address);
  const { joinPool, isPending: joining, isConfirming: confirmingJoin, isSuccess: joinSuccess } = useJoinPool();
  const { makeDeposit, isPending: depositing, isConfirming: confirmingDeposit, isSuccess: depositSuccess } = useMakeDeposit();

  const pool = useMemo(() => {
    if (!poolInfo) return null;
    const status: "open" | "active" | "completed" = poolInfo.started
      ? poolInfo.active
        ? "active"
        : "completed"
      : "open";

    return {
      name:
        poolInfo.depositAmount === 25
          ? "Jakarta Builders Pool"
          : poolInfo.depositAmount === 50
            ? "Global Remit Circle"
            : poolInfo.depositAmount === 100
              ? "Creator Savings Guild"
              : "Community Pool",
      status,
      depositAmount: poolInfo.depositAmount,
      maxParticipants: poolInfo.maxParticipants,
      currentParticipants: poolInfo.currentParticipants,
      totalFunds: poolInfo.totalFunds,
      currentCycle: poolInfo.cycle,
    };
  }, [poolInfo]);

  const isParticipant = participantInfo?.isActive || false;
  const hasEnoughBalance = requiredCollateral ? usdcBalance >= requiredCollateral : true;
  const hasEnoughForDeposit = pool ? usdcBalance >= pool.depositAmount : true;

  useEffect(() => {
    if (!joinSuccess) return;
    const timer = window.setTimeout(() => {
      setShowJoinModal(false);
      setSuccessMessage({
        title: "Joined on Sui",
        message: "Your one-click ROSCA join flow completed. Sponsored transaction support is wired for the Suivan relayer.",
      });
      setShowSuccessCelebration(true);
      refetchPool();
      refetchParticipant();
      refetchBalance();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [joinSuccess, refetchBalance, refetchParticipant, refetchPool]);

  useEffect(() => {
    if (!depositSuccess) return;
    const timer = window.setTimeout(() => {
      setShowDepositModal(false);
      setSuccessMessage({
        title: "Contribution Submitted",
        message: "Your cycle contribution was submitted through the Sui transaction flow.",
      });
      setShowSuccessCelebration(true);
      refetchPool();
      refetchParticipant();
      refetchBalance();
      refetchHasDeposited();
      refetchYield();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [depositSuccess, refetchBalance, refetchHasDeposited, refetchParticipant, refetchPool, refetchYield]);

  if (poolLoading || !pool) {
    return (
      <main className="min-h-screen bg-[#fbf7ed]">
        <Header />
        <div className="flex items-center justify-center pb-16 pt-32">
          <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white px-6 py-5 shadow-[5px_5px_0_#06111f]">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-950 border-b-sky-400" />
              <p className="protocol-font text-sm font-black text-slate-600">Loading Sui pool object...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const capacity = Math.round((pool.currentParticipants / pool.maxParticipants) * 100);

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />

      <section className="relative isolate overflow-hidden px-5 pb-10 pt-32 md:px-10 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(94,200,255,0.32),transparent_30%),linear-gradient(180deg,#fbf7ed,#f8fbff)]" />
        <div className="mx-auto max-w-6xl">
          <Link href="/pools" className="protocol-font mb-6 inline-flex items-center rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5">
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pools
          </Link>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-7xl">
                  {pool.name}
                </h1>
                <span className="protocol-font rounded-full border-2 border-slate-950 bg-[#dff8ff] px-3 py-1 text-xs font-black">
                  {pool.status.toUpperCase()}
                </span>
              </div>
              <div className="protocol-font inline-flex max-w-full items-center gap-1.5 overflow-hidden rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-[4px_4px_0_#06111f]">
                Sui object {poolAddress.slice(0, 10)}...{poolAddress.slice(-8)}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SharePool
                poolAddress={poolAddress}
                poolName={pool.name}
                monthlyDeposit={pool.depositAmount}
                participants={pool.currentParticipants}
                maxParticipants={pool.maxParticipants}
                apy={8.5}
              />
              {!isConnected && <ConnectWallet variant="header" scrolled={true} />}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[5px_5px_0_#06111f]">
              <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">Sponsored tx</p>
              <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">Gas covered by Suivan</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                The action model is prepared for a relayer-backed gasless UX.
              </p>
            </div>
            <div className="rounded-[1.5rem] border-2 border-slate-950 bg-[#d9f8df] p-5 shadow-[5px_5px_0_#06111f]">
              <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-slate-500">zkLogin</p>
              <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">Social onboarding ready</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                The UI supports wallet users now and leaves room for Google-based zkLogin.
              </p>
            </div>
            <div className="rounded-[1.5rem] border-2 border-slate-950 bg-[#dff8ff] p-5 shadow-[5px_5px_0_#06111f]">
              <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-slate-500">Sui objects</p>
              <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">Pool state is composable</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                Pools, participants, and cycle progress map cleanly to object-centric data.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]">
                <h2 className="mb-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Pool Information</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    ["DEPOSIT", `${pool.depositAmount} USDC`, "bg-[#fbf7ed]"],
                    ["MEMBERS", `${pool.currentParticipants}/${pool.maxParticipants}`, "bg-[#dff8ff]"],
                    ["CYCLE", `${pool.currentCycle}/${pool.maxParticipants}`, "bg-[#fff1c7]"],
                    ["FUNDS", `$${pool.totalFunds.toFixed(2)}`, "bg-[#d9f8df]"],
                  ].map(([label, value, bg]) => (
                    <div className={`rounded-2xl border-2 border-slate-950 p-4 ${bg}`} key={label}>
                      <p className="protocol-font mb-1 text-xs font-black text-slate-500">{label}</p>
                      <p className="protocol-font text-xl font-black text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="protocol-font text-xs font-black text-slate-500">Pool Capacity</span>
                    <span className="protocol-font text-sm font-black text-slate-950">{capacity}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full border-2 border-slate-950 bg-slate-100">
                    <div className="h-full bg-teal-400 transition-all duration-500" style={{ width: `${capacity}%` }} />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Yield and Cycle Signals</h2>
                  <SuiFeeProfile transactionType="join" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border-2 border-slate-950 bg-[#e8e0ff] p-4">
                    <p className="protocol-font mb-1 text-xs font-black text-slate-500">YIELD</p>
                    <p className="protocol-font text-xl font-black text-slate-950">${currentYield.toFixed(2)}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-slate-950 bg-[#d9f8df] p-4">
                    <p className="protocol-font mb-1 text-xs font-black text-slate-500">EST APY</p>
                    <p className="protocol-font text-xl font-black text-slate-950">8.5%</p>
                  </div>
                  <div className="rounded-2xl border-2 border-slate-950 bg-[#dff8ff] p-4">
                    <p className="protocol-font mb-1 text-xs font-black text-slate-500">COMMITMENT</p>
                    <p className="protocol-font text-xl font-black text-slate-950">{requiredCollateral?.toFixed(0) || 0} USDC</p>
                  </div>
                </div>
              </div>

              <PoolAnalyticsChart title={`${pool.name} Performance`} poolAddress={poolAddress} />

              <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]">
                <h2 className="mb-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Participants ({participantCount})</h2>
                {participantsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-950 border-b-sky-400" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {participantAddresses.map((participantAddress, index) => (
                      <div
                        className={`flex items-center justify-between rounded-xl border-2 border-slate-950 p-4 ${
                          participantAddress.toLowerCase() === address?.toLowerCase() ? "bg-[#d9f8df]" : "bg-[#f8fbff]"
                        }`}
                        key={participantAddress}
                      >
                        <div className="flex items-center gap-3">
                          <div className="protocol-font flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 font-black text-slate-950">
                            {index + 1}
                          </div>
                          <div>
                            <p className="protocol-font text-sm font-bold text-slate-950">
                              {participantAddress.slice(0, 6)}...{participantAddress.slice(-4)}
                            </p>
                            {participantAddress.toLowerCase() === address?.toLowerCase() && (
                              <span className="protocol-font text-xs font-black text-teal-700">You</span>
                            )}
                          </div>
                        </div>
                        {participantAddress.toLowerCase() === lastWinner?.toLowerCase() && (
                          <span className="protocol-font rounded-full border-2 border-slate-950 bg-[#fff1c7] px-3 py-1 text-xs font-black">
                            Last winner
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {isConnected ? (
                <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]">
                  <h2 className="mb-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Your Status</h2>
                  {isParticipant ? (
                    <div className="space-y-4">
                      <div className="rounded-2xl border-2 border-slate-950 bg-[#d9f8df] p-4">
                        <p className="font-black text-slate-950">Active participant</p>
                        <p className="mt-1 text-sm font-semibold text-slate-600">Your cycle status is tracked in the pool object.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="protocol-font text-xs font-black text-slate-500">Commitment</span>
                          <span className="protocol-font font-black">{participantInfo?.collateralAmount.toFixed(2)} USDC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="protocol-font text-xs font-black text-slate-500">Deposited</span>
                          <span className="protocol-font font-black">{participantInfo?.totalDeposited.toFixed(2)} USDC</span>
                        </div>
                      </div>
                      {pool.status === "active" && !hasDeposited && (
                        <button
                          onClick={() => setShowDepositModal(true)}
                          className="protocol-font w-full rounded-xl border-2 border-slate-950 bg-sky-400 py-3 font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5"
                        >
                          Contribute This Cycle
                        </button>
                      )}
                      {pool.status === "active" && hasDeposited && (
                        <div className="rounded-2xl border-2 border-slate-950 bg-[#dff8ff] p-4 text-center">
                          <p className="font-black text-slate-950">Contribution complete for this cycle</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-2xl border-2 border-slate-950 bg-[#fbf7ed] p-4">
                        <p className="font-semibold text-slate-600">You are not a participant in this pool.</p>
                      </div>
                      {pool.status === "open" && (
                        <button
                          onClick={() => setShowJoinModal(true)}
                          className="protocol-font w-full rounded-xl border-2 border-slate-950 bg-sky-400 py-3 font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5"
                        >
                          Join Pool
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 text-center shadow-[6px_6px_0_#06111f]">
                  <h2 className="mb-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Get Started</h2>
                  <p className="mb-4 font-semibold text-slate-500">Connect a Sui wallet to join with one transaction.</p>
                  <ConnectWallet variant="header" scrolled={true} />
                </div>
              )}

              {isConnected && (
                <div className="rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]">
                  <h2 className="mb-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Your Wallet</h2>
                  <div className="rounded-2xl border-2 border-slate-950 bg-[#fbf7ed] p-4">
                    <p className="protocol-font mb-1 text-xs font-black text-slate-500">USDC Balance</p>
                    <p className="protocol-font text-2xl font-black text-slate-950">{usdcBalance.toFixed(2)} USDC</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showJoinModal && (
        <ActionModal
          title={`Join ${pool.name}`}
          primaryLabel="Join Pool"
          pendingLabel={joining ? "Joining..." : "Finalizing..."}
          pending={joining || confirmingJoin}
          disabled={!hasEnoughBalance}
          onClose={() => setShowJoinModal(false)}
          onSubmit={() => joinPool(poolAddress)}
          rows={[
            ["Cycle Deposit", `${pool.depositAmount} USDC`],
            ["Commitment", `${requiredCollateral?.toFixed(0) || 0} USDC`],
            ["Transaction", "Sponsored-ready Sui transaction"],
          ]}
          warning={!hasEnoughBalance ? `Insufficient USDC. You need ${requiredCollateral} USDC but only have ${usdcBalance.toFixed(2)} USDC.` : undefined}
        />
      )}

      {showDepositModal && (
        <ActionModal
          title="Contribute This Cycle"
          primaryLabel="Submit Contribution"
          pendingLabel={depositing ? "Submitting..." : "Finalizing..."}
          pending={depositing || confirmingDeposit}
          disabled={!hasEnoughForDeposit}
          onClose={() => setShowDepositModal(false)}
          onSubmit={() => makeDeposit(poolAddress)}
          rows={[
            ["Deposit Amount", `${pool.depositAmount} USDC`],
            ["Current Cycle", `${pool.currentCycle} of ${pool.maxParticipants}`],
            ["Flow", "One Sui transaction"],
          ]}
          warning={!hasEnoughForDeposit ? `Insufficient USDC. You need ${pool.depositAmount} USDC but only have ${usdcBalance.toFixed(2)} USDC.` : undefined}
        />
      )}

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

function ActionModal({
  title,
  primaryLabel,
  pendingLabel,
  pending,
  disabled,
  onClose,
  onSubmit,
  rows,
  warning,
}: {
  title: string;
  primaryLabel: string;
  pendingLabel: string;
  pending: boolean;
  disabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  rows: Array<[string, string]>;
  warning?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[1.75rem] border-2 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#06111f]">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">{title}</h3>
          <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 text-slate-950 transition hover:-translate-y-0.5">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 space-y-4">
          {rows.map(([label, value], index) => (
            <div className={`rounded-2xl border-2 border-slate-950 p-4 ${index === 1 ? "bg-[#dff8ff]" : "bg-[#fbf7ed]"}`} key={label}>
              <p className="protocol-font mb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
              <p className="protocol-font text-xl font-black text-slate-950">{value}</p>
            </div>
          ))}
          {warning && (
            <div className="rounded-2xl border-2 border-slate-950 bg-[#ffe0d8] p-4">
              <p className="text-sm font-bold text-slate-700">{warning}</p>
            </div>
          )}
        </div>

        <button
          onClick={onSubmit}
          disabled={disabled || pending}
          className={`protocol-font w-full rounded-xl border-2 border-slate-950 py-3 font-black transition-all ${
            disabled || pending
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-sky-400 text-slate-950 shadow-[4px_4px_0_#06111f] hover:-translate-y-0.5"
          }`}
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-b-white" />
              {pendingLabel}
            </span>
          ) : (
            primaryLabel
          )}
        </button>
      </div>
    </div>
  );
}
