import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="protocol-font mb-5 text-xs font-black uppercase tracking-[0.22em] text-sky-300">
            protocol_demo
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Suivan demo flow is being rebuilt for Sui.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-300">
            The previous demo was tied to legacy assumptions. This placeholder keeps the
            route safe while the frontend prepares a new ROSCA walkthrough for joining,
            contributing, payout tracking, collateral state, and yield progress.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {["Join", "Contribute", "Payout", "Settle"].map((step, index) => (
              <div className="border border-white/10 bg-white/[0.05] p-5" key={step}>
                <p className="protocol-font text-sm font-black text-white/40">0{index + 1}</p>
                <p className="mt-8 text-2xl font-black">{step}</p>
              </div>
            ))}
          </div>

          <Link
            className="mt-10 inline-flex rounded-full bg-sky-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-white"
            href="/"
          >
            Back to Landing
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
