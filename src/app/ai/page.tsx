import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { fetchProtocolYields, generateYieldRecommendation } from "@/lib/ai-optimizer";

export const dynamic = "force-dynamic";

export default async function YieldSignalsPage() {
  const [protocols, recommendation] = await Promise.all([
    fetchProtocolYields(),
    generateYieldRecommendation("moderate"),
  ]);

  const avgApy = protocols.reduce((sum, protocol) => sum + protocol.apy, 0) / Math.max(protocols.length, 1);
  const totalTvl = protocols.reduce((sum, protocol) => sum + protocol.tvl, 0);

  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border-2 border-slate-950 bg-white p-8 shadow-[8px_8px_0_#06111f] md:p-12">
            <p className="protocol-font mb-5 inline-flex rounded-full border-2 border-slate-950 bg-[#dff8ff] px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
              live_sui_yield
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Sui yield signals for idle ROSCA capital.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              Suivan reads Sui yield pool data from DeFiLlama and turns it into simple risk-adjusted signals
              for future idle-fund routing.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["AVG APY", `${avgApy.toFixed(2)}%`, "bg-[#dff8ff]"],
                ["TOTAL TVL", `$${(totalTvl / 1_000_000).toFixed(1)}M`, "bg-[#fff1c7]"],
                ["BEST SIGNAL", recommendation.recommendedProtocol, "bg-[#d9f8df]"],
              ].map(([title, value, bg]) => (
                <div className={`rounded-[1.5rem] border-2 border-slate-950 p-5 shadow-[5px_5px_0_#06111f] ${bg}`} key={title}>
                  <p className="protocol-font text-xs font-black uppercase text-slate-500">{title}</p>
                  <p className="protocol-font mt-8 text-3xl font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[1.5rem] border-2 border-slate-950 bg-white shadow-[6px_6px_0_#06111f]">
              {protocols.map((protocol) => (
                <div className="grid gap-3 border-b-2 border-slate-950 p-5 last:border-b-0 md:grid-cols-[1fr_auto_auto]" key={protocol.address}>
                  <div>
                    <p className="font-black text-slate-950">{protocol.name}</p>
                    <p className="protocol-font mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      {protocol.pool || "Sui pool"} . {protocol.source}
                    </p>
                  </div>
                  <p className="protocol-font text-xl font-black text-teal-700">{protocol.apy.toFixed(2)}% APY</p>
                  <p className="protocol-font text-sm font-black text-slate-500">${(protocol.tvl / 1_000_000).toFixed(1)}M TVL</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0_#14b8a6]">
              <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-300">routing_recommendation</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">{recommendation.expectedApy.toFixed(2)}% blended APY</h2>
              <div className="mt-6 space-y-3">
                {recommendation.allocation.map((item) => (
                  <div className="rounded-2xl border-2 border-white/40 bg-white/10 p-4" key={item.protocol}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-black">{item.protocol}</span>
                      <span className="protocol-font text-sm font-black text-sky-300">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                className="protocol-font mt-6 inline-flex rounded-full border-2 border-white bg-sky-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-white"
                href="/pools"
              >
                Explore Pools
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
