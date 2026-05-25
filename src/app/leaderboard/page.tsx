"use client";

import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const INDEXER_SIGNALS = [
  ["Pool completion", "Cycles closed without missed contribution"],
  ["Reliability score", "Member consistency across community pools"],
  ["Yield earned", "Claimed payout and idle-fund yield attribution"],
] as const;

export default function LeaderboardPage() {
  const account = useCurrentAccount();
  const { isConnected } = useCurrentWallet();

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />

      <section className="px-5 pb-12 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="protocol-font inline-flex rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#06111f]">
            reputation_index
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Reputation will come from real Sui pool history.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            Suivan will only rank participants after the indexer can read real pool objects, completed
            cycles, and member contribution history. No synthetic leaderboard is shown to judges.
          </p>

          {isConnected && account ? (
            <div className="protocol-font mt-8 inline-flex rounded-full border-2 border-slate-950 bg-[#fff1c7] px-4 py-2 text-xs font-black shadow-[4px_4px_0_#06111f]">
              CONNECTED {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {INDEXER_SIGNALS.map(([title, copy], index) => (
            <div
              className={`rounded-[1.5rem] border-2 border-slate-950 p-5 shadow-[5px_5px_0_#06111f] ${
                index === 0 ? "bg-[#dff8ff]" : index === 1 ? "bg-[#d9f8df]" : "bg-[#fff1c7]"
              }`}
              key={title}
            >
              <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Signal 0{index + 1}
              </p>
              <h2 className="mt-8 text-2xl font-black tracking-[-0.04em]">{title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
