import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function YieldSignalsPage() {
  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-sky-100 bg-white p-8 shadow-xl shadow-sky-950/5 md:p-12">
          <p className="protocol-font mb-5 text-xs font-black uppercase tracking-[0.22em] text-sky-600">
            yield_signals
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Suivan yield routing is waiting for the new Sui integration.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            This route replaces the inherited AI optimizer screen with a neutral
            frontend boundary. Once the backend and contracts are finalized, this page
            can surface APY, idle-fund strategy, risk notes, and cycle-level yield data.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["APY signal", "Current and historical yield estimates."],
              ["Idle funds", "Where unused pool capital can be routed."],
              ["Risk notes", "Transparent strategy and protocol assumptions."],
            ].map(([title, copy]) => (
              <div className="border border-slate-100 bg-slate-50 p-5" key={title}>
                <p className="protocol-font text-xs font-black uppercase text-slate-400">{title}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>

          <Link
            className="mt-10 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-600"
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
