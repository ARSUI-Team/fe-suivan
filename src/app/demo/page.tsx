"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import WinnerModal from "@/components/WinnerModal";
import CollateralReturnModal from "@/components/CollateralReturnModal";

type Step = "pool" | "join" | "contributing" | "round2" | "round3-win" | "round4" | "round5" | "completed";

const MEMBERS = [
  { name: "You (Alice)", address: "0x8f3a...c21d", avatar: "A", color: "from-blue-500 to-indigo-600" },
  { name: "Bob", address: "0x4b2e...a89f", avatar: "B", color: "from-green-500 to-emerald-600" },
  { name: "Carol", address: "0x7d1f...e3b2", avatar: "C", color: "from-purple-500 to-violet-600" },
  { name: "Dave", address: "0x2c8a...f4d1", avatar: "D", color: "from-orange-500 to-amber-600" },
  { name: "Eve", address: "0x9e5b...b7a3", avatar: "E", color: "from-pink-500 to-rose-600" },
];

const STEP_ORDER: Step[] = ["pool", "join", "contributing", "round2", "round3-win", "round4", "round5", "completed"];

// Animated number hook
function useAnimatedNumber(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const animRef = useRef<number | null>(null);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(from + diff * eased);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = target;
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [target, duration]);

  return display;
}

// Toast component
function TxToast({ show, status, message }: { show: boolean; status: "pending" | "success" | "error"; message: string }) {
  if (!show) return null;
  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md ${
        status === "pending" ? "bg-blue-900/80 border-blue-500/30 text-blue-200" :
        status === "success" ? "bg-green-900/80 border-green-500/30 text-green-200" :
        "bg-red-900/80 border-red-500/30 text-red-200"
      }`}>
        {status === "pending" && (
          <svg className="animate-spin w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        )}
        {status === "success" && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        )}
        <div>
          <p className="text-sm font-medium">{message}</p>
          <p className="text-[10px] opacity-60">Mantle Sepolia Network</p>
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<Step>("pool");
  const [showWinner, setShowWinner] = useState(false);
  const [showCollateral, setShowCollateral] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [balanceUSDC, setBalanceUSDC] = useState(150);
  const [balanceCollateral, setBalanceCollateral] = useState(0);
  const [yieldAccumulated, setYieldAccumulated] = useState(0);
  const [toast, setToast] = useState<{ show: boolean; status: "pending" | "success"; message: string }>({ show: false, status: "pending", message: "" });
  const [balanceFlash, setBalanceFlash] = useState<"up" | "down" | null>(null);

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  // Animated displays
  const displayUSDC = useAnimatedNumber(balanceUSDC);
  const displayCollateral = useAnimatedNumber(balanceCollateral);
  const displayYield = useAnimatedNumber(yieldAccumulated);

  const showToast = useCallback((message: string, status: "pending" | "success" = "pending") => {
    setToast({ show: true, status, message });
    if (status === "success") {
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
    }
  }, []);

  const flashBalance = useCallback((dir: "up" | "down") => {
    setBalanceFlash(dir);
    setTimeout(() => setBalanceFlash(null), 1000);
  }, []);

  const simulateTransaction = (txName: string, callback: () => void) => {
    setIsProcessing(true);
    showToast(`${txName}...`, "pending");
    setTimeout(() => {
      setIsProcessing(false);
      showToast(`${txName} confirmed!`, "success");
      callback();
    }, 1800);
  };

  const handleJoinPool = () => {
    simulateTransaction("Join Pool", () => {
      setBalanceUSDC((prev) => prev - 40);
      setBalanceCollateral(30);
      setYieldAccumulated((prev) => prev + 0.75);
      flashBalance("down");
      setCurrentStep("contributing");
    });
  };

  const handleContribute = (nextStep: Step) => {
    simulateTransaction("Contribute Round", () => {
      setBalanceUSDC((prev) => prev - 10);
      setYieldAccumulated((prev) => prev + 0.75);
      flashBalance("down");
      setCurrentStep(nextStep);
    });
  };

  const handleClaimWin = () => {
    setShowWinner(false);
    setBalanceUSDC((prev) => prev + 51.25 - 10); // claim pot+yield, pay Round 4 contribution
    setYieldAccumulated((prev) => prev + 0.75);
    flashBalance("up");
    showToast("Pot + Yield claimed! Round 4 contribution paid.", "success");
    setCurrentStep("round4");
  };

  const handleClaimCollateral = () => {
    setShowCollateral(false);
    setBalanceUSDC((prev) => prev + 33.75);
    setBalanceCollateral(0);
    setYieldAccumulated(0);
    flashBalance("up");
    showToast("Collateral + Yield withdrawn!", "success");
  };

  const handleReset = () => {
    setCurrentStep("pool");
    setBalanceUSDC(150);
    setBalanceCollateral(0);
    setYieldAccumulated(0);
    setShowWinner(false);
    setShowCollateral(false);
    setToast({ show: false, status: "pending", message: "" });
  };

  useEffect(() => {
    if (currentStep === "round3-win") {
      const timer = setTimeout(() => setShowWinner(true), 800);
      return () => clearTimeout(timer);
    }
    if (currentStep === "completed") {
      const timer = setTimeout(() => setShowCollateral(true), 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const formatNum = (n: number) => n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);

  const LoadingSpinner = () => (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      Confirming on Mantle...
    </span>
  );

  // Calculate final profit summary
  const totalContributed = 50; // 10 USDC x 5 rounds
  const potWon = 51.25;
  const collateralReturn = 33.75;
  const totalReceived = potWon + collateralReturn;
  const netProfit = totalReceived - totalContributed - 30; // minus contributions and collateral

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-gray-900 to-[#0a0a0a]">
      {/* Toast */}
      <TxToast show={toast.show} status={toast.status} message={toast.message} />

      {/* Nav */}
      <nav className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo Archa.png" alt="Archa" width={32} height={32} className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-white">Archa</span>
              <span className="text-xs text-gray-500 ml-1 border border-gray-700 px-2 py-0.5 rounded-full">Interactive Demo</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Mantle Sepolia
              </div>
              <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 text-blue-400 px-3 py-1.5 rounded-xl text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">A</div>
                0x8f3a...c21d
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Archa — On-Chain Arisan Demo</h1>
          <p className="text-gray-400">Full simulation of the arisan flow from joining to collateral + yield return</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            {[
              { label: "Pool", step: "pool" },
              { label: "Join", step: "join" },
              { label: "Round 1", step: "contributing" },
              { label: "Round 2", step: "round2" },
              { label: "Round 3", step: "round3-win" },
              { label: "Round 4", step: "round4" },
              { label: "Round 5", step: "round5" },
              { label: "Done", step: "completed" },
            ].map((s, i) => {
              const isActive = i === stepIndex;
              const isDone = i < stepIndex;
              const isWin = s.step === "round3-win";
              return (
                <div key={s.step} className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] font-bold border-2 transition-all duration-300 ${
                    isDone ? "bg-green-500 border-green-500 text-white" :
                    isActive ? (isWin ? "bg-yellow-500 border-yellow-500 text-white animate-pulse shadow-lg shadow-yellow-500/50" : "bg-blue-600 border-blue-600 text-white") :
                    "bg-gray-800 border-gray-700 text-gray-500"
                  }`}>
                    {isDone ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    ) : isWin && isActive ? "★" : i + 1}
                  </div>
                  <span className={`text-[9px] mt-1 hidden sm:block ${isActive ? (isWin ? "text-yellow-400 font-bold" : "text-white") : isDone ? "text-green-400" : "text-gray-600"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 rounded-full transition-all duration-700"
              style={{ width: `${(stepIndex / (STEP_ORDER.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pool overview */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image src="/logo Archa.png" alt="Archa" width={40} height={40} className="w-10 h-10 rounded-xl" />
                  <div>
                    <h3 className="text-white font-semibold">Small Pool — Family Arisan</h3>
                    <p className="text-gray-400 text-xs">5 Members &bull; 5 Rounds &bull; 30 days/cycle</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentStep === "pool" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                  currentStep === "completed" ? "bg-gray-500/10 text-gray-400 border border-gray-500/20" :
                  "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>
                  {currentStep === "pool" ? "Open" : currentStep === "completed" ? "Completed" : "Active"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Contribution", value: "10", sub: "USDC/month" },
                  { label: "Pot/Round", value: "50", sub: "USDC" },
                  { label: "Collateral", value: "30", sub: "USDC (staked)" },
                  { label: "Yield Est.", value: "~30%", sub: "APY (AI-DeFi)", isGreen: true },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-900/50 rounded-xl p-3 text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{item.label}</p>
                    <p className={`font-bold text-sm ${item.isGreen ? "text-green-400" : "text-white"}`}>{item.value}</p>
                    <p className="text-gray-500 text-[10px]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action cards */}
            {currentStep === "pool" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-green-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">1</span>
                  Pool Open — Ready to Join
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  This arisan pool requires 5 members. 4 have already joined, 1 slot remaining. Deposit 30 USDC collateral + first month contribution of 10 USDC.
                </p>
                <div className="bg-gray-900/50 rounded-xl p-3 mb-4 flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total to pay:</span>
                  <span className="text-white font-bold">40 USDC</span>
                </div>
                <button onClick={() => setCurrentStep("join")}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]">
                  Join Pool
                </button>
              </div>
            )}

            {currentStep === "join" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">2</span>
                  Approve & Join Pool
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center bg-gray-900/50 rounded-xl p-3 text-sm">
                    <span className="text-gray-400">Approve USDC spending</span>
                    <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                      Approved
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-900/50 rounded-xl p-3 text-sm">
                    <span className="text-gray-400">Month 1 Contribution</span>
                    <span className="text-white font-medium">10 USDC</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-900/50 rounded-xl p-3 text-sm">
                    <span className="text-gray-400">Collateral (staked to DeFi)</span>
                    <span className="text-white font-medium">30 USDC</span>
                  </div>
                </div>
                <button onClick={handleJoinPool} disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50">
                  {isProcessing ? <LoadingSpinner /> : "Confirm Join Pool"}
                </button>
              </div>
            )}

            {currentStep === "contributing" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">3</span>
                  Round 1 Complete — Winner: Bob
                </h3>
                <p className="text-gray-400 text-sm mb-3">Bob was selected as the Round 1 winner and received the 50 USDC pot. Time to contribute for Round 2.</p>
                <div className="bg-gray-900/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">B</div>
                    <span className="text-white text-sm font-medium">Bob won Round 1</span>
                    <span className="text-green-400 text-xs ml-auto">+50 USDC</span>
                  </div>
                  <p className="text-gray-500 text-xs">Randomly selected by smart contract</p>
                </div>
                <button onClick={() => handleContribute("round2")} disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50">
                  {isProcessing ? <LoadingSpinner /> : "Pay Round 2 Contribution — 10 USDC"}
                </button>
              </div>
            )}

            {currentStep === "round2" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">4</span>
                  Round 2 Complete — Winner: Dave
                </h3>
                <p className="text-gray-400 text-sm mb-3">Dave won Round 2. Your collateral keeps generating yield. Time to contribute for Round 3.</p>
                <div className="bg-gray-900/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold">D</div>
                    <span className="text-white text-sm font-medium">Dave won Round 2</span>
                    <span className="text-green-400 text-xs ml-auto">+50 USDC</span>
                  </div>
                  <p className="text-gray-500 text-xs">Your collateral yield: +{formatNum(yieldAccumulated)} USDC</p>
                </div>
                <button onClick={() => handleContribute("round3-win")} disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50">
                  {isProcessing ? <LoadingSpinner /> : "Pay Round 3 Contribution — 10 USDC"}
                </button>
              </div>
            )}

            {currentStep === "round3-win" && (
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-yellow-500/40 rounded-2xl p-5 animate-fade-in-up overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-500/5 animate-pulse rounded-2xl" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
                <div className="relative">
                  <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center text-yellow-300 text-xs shadow-lg shadow-yellow-500/30">★</span>
                    Round 3 — You Are the Winner!
                  </h3>
                  <p className="text-gray-300 text-sm">The smart contract selected you as the Round 3 winner! You receive the arisan pot + bonus yield.</p>
                </div>
              </div>
            )}

            {currentStep === "round4" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">6</span>
                  Round 4 Complete — Winner: Carol
                </h3>
                <p className="text-gray-400 text-sm mb-3">You already won in Round 3 but continue contributing until the pool ends. Carol won Round 4.</p>
                <div className="bg-gray-900/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">C</div>
                    <span className="text-white text-sm font-medium">Carol won Round 4</span>
                    <span className="text-green-400 text-xs ml-auto">+50 USDC</span>
                  </div>
                </div>
                <button onClick={() => handleContribute("round5")} disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50">
                  {isProcessing ? <LoadingSpinner /> : "Pay Round 5 (final) Contribution — 10 USDC"}
                </button>
              </div>
            )}

            {currentStep === "round5" && (
              <div className="bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 animate-fade-in-up">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">7</span>
                  Round 5 Complete — Winner: Eve
                </h3>
                <p className="text-gray-400 text-sm mb-3">Eve won the final round. The arisan pool is complete! Collateral + yield ready to be returned.</p>
                <div className="bg-gray-900/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-[10px] font-bold">E</div>
                    <span className="text-white text-sm font-medium">Eve won Round 5</span>
                    <span className="text-green-400 text-xs ml-auto">+50 USDC</span>
                  </div>
                </div>
                <button onClick={() => { simulateTransaction("Finalize Pool", () => setCurrentStep("completed")); }} disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] disabled:opacity-50">
                  {isProcessing ? <LoadingSpinner /> : "Finalize Pool & Claim Collateral"}
                </button>
              </div>
            )}

            {currentStep === "completed" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="bg-white/[0.03] backdrop-blur-sm border border-green-500/20 rounded-2xl p-5">
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Pool Complete — Collateral + Yield Returned
                  </h3>
                  <p className="text-gray-300 text-sm">All members have had their turn. Collateral is returned along with yield from DeFi staking.</p>
                </div>

                {/* Summary recap card */}
                <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-5">
                  <h3 className="text-white font-bold mb-4 text-center text-lg">Your Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Contributions (5 rounds)</span>
                      <span className="text-red-400">-{totalContributed} USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Collateral Deposit</span>
                      <span className="text-gray-300">30 USDC</span>
                    </div>
                    <div className="border-t border-gray-700/50 my-1" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pot Won (Round 3)</span>
                      <span className="text-green-400">+50 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pot Yield</span>
                      <span className="text-green-400">+1.25 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Collateral Returned</span>
                      <span className="text-green-400">+30 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Collateral Yield</span>
                      <span className="text-green-400">+3.75 USDC</span>
                    </div>
                    <div className="border-t border-gray-700/50 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Net Profit</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        +{formatNum(netProfit)} USDC
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 px-3 py-2 bg-green-500/5 border border-green-500/10 rounded-xl">
                    <p className="text-[11px] text-green-400/80 text-center">
                      With traditional arisan you only get a 50 USDC payout. With Archa, you get 50 + 5 USDC in yield. Your collateral also earns yield while staked.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Members */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Pool Members</h3>
              <div className="space-y-2">
                {MEMBERS.map((m, i) => {
                  const isUser = i === 0;
                  const hasWon = (i === 1 && stepIndex >= 2) || (i === 3 && stepIndex >= 3) || (i === 0 && stepIndex >= 4) || (i === 2 && stepIndex >= 5) || (i === 4 && stepIndex >= 6);
                  return (
                    <div key={m.name} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      isUser ? "bg-blue-600/5 border border-blue-600/10" :
                      hasWon ? "bg-yellow-500/5" : "bg-gray-900/30"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold`}>{m.avatar}</div>
                        <div>
                          <p className={`text-sm font-medium ${isUser ? "text-blue-400" : "text-white"}`}>{m.name}</p>
                          <p className="text-gray-500 text-[11px]">{m.address}</p>
                        </div>
                      </div>
                      {hasWon ? (
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full font-medium">Won</span>
                      ) : stepIndex >= 1 ? (
                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full font-medium">Active</span>
                      ) : i < 4 ? (
                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full font-medium">Joined</span>
                      ) : (
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">Waiting</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet balance with animated numbers */}
            <div className={`bg-white/[0.03] backdrop-blur-sm border rounded-2xl p-5 transition-all duration-500 ${
              balanceFlash === "up" ? "border-green-500/40 shadow-lg shadow-green-500/10" :
              balanceFlash === "down" ? "border-red-500/40 shadow-lg shadow-red-500/10" :
              "border-white/10"
            }`}>
              <h3 className="text-white font-semibold mb-3 text-sm">Wallet Balance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">USDC</span>
                  <span className={`font-bold text-lg tabular-nums transition-colors duration-300 ${
                    balanceFlash === "up" ? "text-green-400" :
                    balanceFlash === "down" ? "text-red-400" : "text-white"
                  }`}>
                    {formatNum(displayUSDC)}
                  </span>
                </div>
                <div className="border-t border-gray-800" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Collateral Locked</span>
                  <span className="text-blue-400 font-bold tabular-nums">{formatNum(displayCollateral)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Yield Accumulated</span>
                  <span className="text-green-400 font-bold tabular-nums">+{formatNum(displayYield)}</span>
                </div>
              </div>
            </div>

            {/* Round history */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-3 text-sm">Round History</h3>
              <div className="space-y-2">
                {[
                  { round: 1, winner: "Bob", step: 2 },
                  { round: 2, winner: "Dave", step: 3 },
                  { round: 3, winner: "You!", step: 4 },
                  { round: 4, winner: "Carol", step: 5 },
                  { round: 5, winner: "Eve", step: 6 },
                ].map((r) => (
                  <div key={r.round} className={`flex justify-between items-center text-sm p-2 rounded-lg transition-all duration-300 ${
                    stepIndex >= r.step ? (r.round === 3 ? "bg-yellow-500/10 border border-yellow-500/10" : "bg-gray-900/30") : "opacity-30"
                  }`}>
                    <span className="text-gray-400">Round {r.round}</span>
                    {stepIndex >= r.step ? (
                      <span className={`font-medium ${r.round === 3 ? "text-yellow-400" : "text-white"}`}>{r.winner} {r.round === 3 && "★"}</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DeFi yield info */}
            <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5">
              <h3 className="text-green-400 font-semibold mb-2 text-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7.55 9.71a.75.75 0 011.06-1.06l2.224 2.224a20.923 20.923 0 015.142-5.09l-3.018.81a.75.75 0 01-.92-.53l.54.074z" clipRule="evenodd" />
                </svg>
                AI-Optimized DeFi Yield
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Collateral is automatically staked to DeFi protocols on Mantle. AI optimizer reallocates between Lendle, Agni Finance & Merchant Moe for maximum yield.
              </p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Protocols</span>
                  <span className="text-white font-medium">Lendle, Agni, Moe</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">APY</span>
                  <span className="text-green-400 font-medium">~30%</span>
                </div>
              </div>
            </div>

            {stepIndex > 0 && (
              <button onClick={handleReset}
                className="w-full py-2.5 rounded-xl font-medium text-gray-500 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all text-sm">
                Reset Demo
              </button>
            )}
          </div>
        </div>
      </div>

      <WinnerModal isOpen={showWinner} onClose={handleClaimWin} />
      <CollateralReturnModal isOpen={showCollateral} onClose={handleClaimCollateral} />
    </div>
  );
}
