import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function YieldSignalsPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border-2 border-slate-950 bg-white p-8 shadow-[8px_8px_0_#06111f] md:p-12">
          <p className="protocol-font mb-5 inline-flex rounded-full border-2 border-slate-950 bg-[#dff8ff] px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
            yield_signals
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Yield routing will plug into the new Sui layer.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            This page is a clean integration boundary for APY, idle-fund strategy,
            risk notes, and cycle-level yield data once the backend and contracts are finalized.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["APY", "Current and historical yield estimates."],
              ["IDLE", "Where unused pool capital can be routed."],
              ["RISK", "Transparent strategy and protocol assumptions."],
            ].map(([title, copy], index) => (
              <div
                className={`rounded-[1.5rem] border-2 border-slate-950 p-5 shadow-[5px_5px_0_#06111f] ${
                  index === 0 ? "bg-[#dff8ff]" : index === 1 ? "bg-[#fff1c7]" : "bg-[#d9f8df]"
                }`}
                key={title}
              >
                <p className="protocol-font text-xs font-black uppercase text-slate-500">{title}</p>
                <p className="mt-8 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>

          <Link
            className="protocol-font mt-10 inline-flex rounded-full border-2 border-slate-950 bg-sky-400 px-6 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5"
            href="/pools"
          >
            Explore Pools
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
