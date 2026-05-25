"use client";

import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const STEPS = [
  {
    title: "Choose a pool",
    copy: "Review members, commitment, cycle length, and APY signal before joining.",
    stat: "8 members",
  },
  {
    title: "Join in one Sui transaction",
    copy: "No pre-authorization step. Suivan prepares one transaction and can route it through a sponsored relayer.",
    stat: "Gasless-ready",
  },
  {
    title: "Contribute each cycle",
    copy: "Your participant status, progress, and contribution state stay visible in the pool view.",
    stat: "Cycle 2/8",
  },
  {
    title: "Track payout and yield",
    copy: "Payout order, idle-fund yield, and completion state are exposed as simple member progress.",
    stat: "8.5% APY",
  },
] as const;

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border-2 border-slate-950 bg-slate-950 p-8 text-white shadow-[8px_8px_0_#14b8a6] md:p-12">
            <p className="protocol-font mb-5 inline-flex rounded-full border-2 border-white bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950">
              interactive_walkthrough
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Try the Suivan pool flow.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
              A judge-friendly walkthrough of how a global ROSCA pool works on Sui: choose, join,
              contribute, and track payout progress.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-3">
              {STEPS.map((item, index) => (
                <button
                  className={`w-full rounded-[1.25rem] border-2 border-slate-950 p-5 text-left shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5 ${
                    activeStep === index ? "bg-sky-400" : "bg-white"
                  }`}
                  key={item.title}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-slate-500">Step 0{index + 1}</p>
                  <p className="mt-2 text-xl font-black tracking-[-0.03em]">{item.title}</p>
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-[2rem] border-2 border-slate-950 bg-white shadow-[8px_8px_0_#06111f]">
              <div className="border-b-2 border-slate-950 bg-[#dff8ff] p-6">
                <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                  live_demo_panel
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">{step.title}</h2>
                <p className="mt-4 max-w-xl font-semibold leading-7 text-slate-600">{step.copy}</p>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-[1.5rem] border-2 border-slate-950 bg-[#fbf7ed] p-5">
                  <p className="protocol-font text-xs font-black uppercase tracking-[0.16em] text-slate-500">Current state</p>
                  <p className="protocol-font mt-10 text-4xl font-black">{step.stat}</p>
                </div>
                <div className="rounded-[1.5rem] border-2 border-slate-950 bg-[#d9f8df] p-5">
                  <p className="protocol-font text-xs font-black uppercase tracking-[0.16em] text-slate-500">Sui UX</p>
                  <p className="mt-10 text-lg font-black leading-7">Wallet Standard, sponsored transaction ready, zkLogin ready.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t-2 border-slate-950 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  {STEPS.map((item, index) => (
                    <span
                      className={`h-3 rounded-full border-2 border-slate-950 transition-all ${
                        activeStep === index ? "w-10 bg-sky-400" : "w-3 bg-white"
                      }`}
                      key={item.title}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    className="protocol-font rounded-full border-2 border-slate-950 bg-white px-5 py-3 text-sm font-black transition hover:bg-[#fff1c7]"
                    onClick={() => setActiveStep((value) => Math.max(value - 1, 0))}
                    type="button"
                  >
                    Previous
                  </button>
                  <button
                    className="protocol-font rounded-full border-2 border-slate-950 bg-sky-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5"
                    onClick={() => setActiveStep((value) => (value + 1) % STEPS.length)}
                    type="button"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[5px_5px_0_#06111f]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">testnet_action</p>
                <p className="mt-2 text-lg font-black">Connect a Sui wallet to test the same flow on pool pages.</p>
              </div>
              <ConnectWallet variant="header" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
