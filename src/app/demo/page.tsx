import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-slate-950">
      <Header />
      <section className="px-5 pb-20 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border-2 border-slate-950 bg-slate-950 p-8 text-white shadow-[8px_8px_0_#14b8a6] md:p-12">
          <p className="protocol-font mb-5 inline-flex rounded-full border-2 border-white bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950">
            protocol_demo
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Suivan demo flow is being rebuilt for Sui.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
            This route keeps the demo safe while the frontend prepares a new ROSCA
            walkthrough for joining, contributing, payout tracking, collateral state, and yield progress.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {["Join", "Contribute", "Payout", "Settle"].map((step, index) => (
              <div className="rounded-[1.5rem] border-2 border-white bg-white/[0.06] p-5" key={step}>
                <p className="protocol-font text-sm font-black text-sky-300">0{index + 1}</p>
                <p className="mt-8 text-2xl font-black">{step}</p>
              </div>
            ))}
          </div>

          <Link
            className="protocol-font mt-10 inline-flex rounded-full border-2 border-white bg-sky-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-white"
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
