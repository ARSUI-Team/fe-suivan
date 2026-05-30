"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight } from "lucide-react";
import SuivanLogo from "./SuivanLogo";

gsap.registerPlugin(ScrollTrigger);

const heroStats = [
  { label: "demo pools", value: "18+", tone: "bg-white" },
  { label: "cycle members", value: "1.2K", tone: "bg-[#dff8ff]" },
  { label: "testnet volume", value: "$680K", tone: "bg-[#fff1c7]" },
  { label: "yield signal", value: "8.1%", tone: "bg-[#d9f8df]" },
] as const;

const roscaPoints = [
  "A group contributes on a recurring cycle.",
  "One member receives the pooled payout each round.",
  "The rotation continues until everyone has received a turn.",
] as const;

const suiReasons = [
  {
    label: "fast settlement",
    title: "Cycles can resolve quickly",
    copy: "Sui keeps contribution, payout, and participant state responsive for global groups.",
  },
  {
    label: "object model",
    title: "Pools become inspectable objects",
    copy: "Each pool can map to readable object state: members, cycle progress, collateral, and yield assumptions.",
  },
  {
    label: "low fees",
    title: "Community finance needs cheap actions",
    copy: "Small recurring contributions should not feel expensive before a user even understands the product.",
  },
] as const;

const flowSteps = [
  {
    code: "01",
    title: "Join a pool",
    copy: "Inspect deposit size, cycle length, participant count, and commitment rules before joining.",
    color: "bg-[#dff8ff]",
    Icon: HandIcon,
  },
  {
    code: "02",
    title: "Contribute each cycle",
    copy: "Member status stays simple: ready, pending, contributed, missed, or paid out.",
    color: "bg-[#fff1c7]",
    Icon: CycleIcon,
  },
  {
    code: "03",
    title: "Rotate payout",
    copy: "The pool tracks who has received a payout and keeps every turn visible to the group.",
    color: "bg-[#d9f8df]",
    Icon: PotIcon,
  },
  {
    code: "04",
    title: "Read yield signals",
    copy: "Idle-fund APY is shown as a modular signal, ready to connect to the final backend and contracts.",
    color: "bg-[#eaf6ff]",
    Icon: YieldIcon,
  },
] as const;

const poolCards = [
  {
    name: "Global ROSCA",
    object: "0x72a...c4d9",
    members: "9 / 12",
    cycle: "08 / 12",
    apy: "8.1%",
    progress: "75%",
    tone: "bg-[#dff8ff]",
  },
  {
    name: "Creator Circle",
    object: "0xa31...88f0",
    members: "14 / 20",
    cycle: "03 / 10",
    apy: "7.4%",
    progress: "30%",
    tone: "bg-[#fff1c7]",
  },
  {
    name: "Builder Guild",
    object: "0x6cf...27aa",
    members: "32 / 40",
    cycle: "11 / 20",
    apy: "6.8%",
    progress: "55%",
    tone: "bg-[#d9f8df]",
  },
] as const;

const trustItems = [
  "Transparent contribution schedule",
  "Readable participant status",
  "Non-custodial product direction",
  "Backend and Move contract adapters kept swappable",
] as const;

export default function SuivanLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const cleanupTiltListeners: Array<() => void> = [];
      const ctx = gsap.context(() => {
        gsap.from(".suivan-pop", {
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
        });

        gsap.to(".suivan-orbit", {
          rotate: 18,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: ".suivan-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".suivan-hero-card", {
          y: -28,
          rotate: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".suivan-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".suivan-reveal").forEach((el) => {
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".suivan-tilt").forEach((card) => {
          const handlePointerMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
              rotateX: y * -5,
              rotateY: x * 6,
              y: -4,
              duration: 0.35,
              ease: "power2.out",
            });
          };

          const handlePointerLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              duration: 0.45,
              ease: "elastic.out(1, 0.45)",
            });
          };

          card.addEventListener("pointermove", handlePointerMove);
          card.addEventListener("pointerleave", handlePointerLeave);
          cleanupTiltListeners.push(() => {
            card.removeEventListener("pointermove", handlePointerMove);
            card.removeEventListener("pointerleave", handlePointerLeave);
          });
        });
      }, rootRef);

      return () => {
        cleanupTiltListeners.forEach((cleanup) => cleanup());
        ctx.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="bg-[#fbf7ed] text-slate-950">
      <section className="suivan-hero relative isolate overflow-hidden px-5 pb-16 pt-32 md:px-10 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(94,200,255,0.38),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(20,184,166,0.24),transparent_24%),linear-gradient(180deg,#fbf7ed,#f5fbff_58%,#fbf7ed)]" />
        <GridPattern className="absolute inset-0 -z-10 opacity-[0.28]" />
        <div className="suivan-orbit absolute -right-28 top-28 -z-10 h-72 w-72 rounded-full border border-sky-300/50 md:h-96 md:w-96">
          <div className="absolute left-10 top-8 h-5 w-5 rounded-full border-2 border-slate-950 bg-sky-400" />
          <div className="absolute bottom-20 right-2 h-7 w-7 rounded-full border-2 border-slate-950 bg-teal-300" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="suivan-pop mb-5 inline-flex items-center gap-2 rounded-full border-2 border-slate-950 bg-white px-4 py-2 shadow-[4px_4px_0_#06111f]">
              <SuivanLogo className="size-5" size={20} />
              <span className="protocol-font text-xs font-black uppercase tracking-[0.18em]">
                Sui community wealth protocol
              </span>
            </div>

            <h1 className="suivan-pop max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.065em] md:text-7xl lg:text-8xl">
              Global ROSCA pools, rebuilt for Sui communities.
            </h1>

            <p className="suivan-pop mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              Suivan explains Arisan as a local form of ROSCA, then turns collective savings into a clear Sui-native interface for pool discovery, cycle progress, member status, and APY signals.
            </p>

            <div className="suivan-pop mt-8 flex flex-wrap gap-3">
              <Link
                className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-slate-950 bg-sky-400 px-6 text-sm font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#06111f]"
                href="/pools"
              >
                Explore Pools
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                className="inline-flex h-12 items-center rounded-full border-2 border-slate-950 bg-white px-6 text-sm font-black text-slate-950 shadow-[4px_4px_0_#06111f] transition hover:-translate-y-0.5 hover:bg-[#dff8ff]"
                href="#how"
              >
                How ROSCA Works
              </a>
            </div>

            <div className="suivan-pop mt-8 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              <span className="rounded-full border border-slate-950/20 bg-white px-3 py-2">zkLogin ready UI</span>
              <span className="rounded-full border border-slate-950/20 bg-white px-3 py-2">Sponsored tx direction</span>
              <span className="rounded-full border border-slate-950/20 bg-white px-3 py-2">Walrus metadata ready</span>
            </div>
          </div>

          <div className="suivan-pop suivan-hero-card mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border-2 border-slate-950 bg-white p-4 shadow-[12px_12px_0_#06111f]">
              <div className="rounded-[1.5rem] border-2 border-slate-950 bg-[#dff8ff] p-5">
                <ObjectScene />
                <div className="mt-5 rounded-2xl border-2 border-slate-950 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="protocol-font text-xs font-black uppercase text-slate-400">
                        pool_object
                      </p>
                      <p className="mt-1 text-xl font-black">Sui Creators Circle</p>
                    </div>
                    <span className="protocol-font rounded-full border-2 border-slate-950 bg-[#fff1c7] px-3 py-1 text-sm font-black">
                      8.1% APY
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {["9 / 12", "cycle 08", "testnet"].map((item) => (
                      <span className="protocol-font rounded-xl border border-slate-950/20 bg-[#fbf7ed] px-2 py-2 text-[11px] font-black text-slate-600" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-slate-950 bg-slate-100">
                    <div className="h-full w-[82%] bg-gradient-to-r from-sky-400 to-teal-300" />
                  </div>
                  <div className="protocol-font mt-3 flex justify-between text-xs font-black text-slate-500">
                    <span>cycle progress</span>
                    <span>82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="suivan-pop mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
          {heroStats.map((stat) => (
            <div className={`rounded-2xl border-2 border-slate-950 ${stat.tone} p-4 shadow-[4px_4px_0_#06111f]`} key={stat.label}>
              <p className="protocol-font text-xs font-black uppercase tracking-[0.12em] text-slate-500">{stat.label}</p>
              <p className="protocol-font mt-2 text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="rosca" className="px-5 py-20 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="suivan-reveal">
            <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-sky-700">
              what_is_rosca
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
              Arisan is local. ROSCA is global.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              ROSCA stands for Rotating Savings and Credit Association. It is a collective savings model already familiar across many cultures. Suivan keeps that social trust, then adds transparent digital rails for global groups.
            </p>
          </div>

          <div className="grid gap-4">
            {roscaPoints.map((point, index) => (
              <article className="suivan-reveal suivan-tilt rounded-[1.5rem] border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#06111f]" key={point}>
                <div className="flex items-start gap-4">
                  <span className="protocol-font grid size-11 shrink-0 place-items-center rounded-full border-2 border-slate-950 bg-sky-400 text-sm font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-black tracking-[-0.03em] text-slate-950">{point}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="suivan-reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                why_on_sui
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
                Sui makes community finance feel inspectable.
              </h2>
            </div>
            <p className="max-w-sm text-base font-semibold leading-7 text-slate-300">
              The frontend is designed around Sui objects, not old EVM assumptions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {suiReasons.map((reason) => (
              <article className="suivan-reveal rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_0_60px_rgba(94,200,255,0.08)]" key={reason.label}>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.16em] text-sky-300">{reason.label}</p>
                <h3 className="mt-8 text-3xl font-black tracking-[-0.045em]">{reason.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-300">{reason.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="suivan-reveal rounded-[2rem] border-2 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#06111f]">
            <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-teal-700">
              apy_signal
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
              Yield shown as signal, not a promise.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Idle pool funds can surface APY visibility from Sui DeFi data while the final contract and backend remain modular. The UI labels yield as an observable signal so users understand the assumption before joining.
            </p>
          </div>

          <div className="suivan-reveal rounded-[2rem] border-2 border-slate-950 bg-[#dff8ff] p-6 shadow-[8px_8px_0_#06111f]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-slate-500">current_yield_route</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">Sui stablecoin strategy</h3>
              </div>
              <span className="protocol-font rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black">8.1%</span>
            </div>

            <YieldChart />

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["TVL", "$680K"],
                ["Risk", "low"],
                ["Source", "DeFiLlama"],
              ].map(([label, value]) => (
                <div className="rounded-2xl border-2 border-slate-950 bg-white p-3" key={label}>
                  <p className="protocol-font text-[10px] font-black uppercase text-slate-400">{label}</p>
                  <p className="protocol-font mt-1 text-lg font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="px-5 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="suivan-reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-sky-700">
                cycle_state
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
                Four states a community can understand.
              </h2>
            </div>
            <p className="max-w-sm text-base font-semibold leading-7 text-slate-600">
              Suivan should feel like a friendly protocol dashboard, not a crowded DeFi terminal.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {flowSteps.map(({ code, title, copy, color, Icon }) => (
              <article className={`suivan-reveal suivan-tilt rounded-[1.75rem] border-2 border-slate-950 ${color} p-5 shadow-[6px_6px_0_#06111f]`} key={title}>
                <div className="mb-8 flex items-center justify-between">
                  <Icon />
                  <span className="protocol-font text-sm font-black">{code}</span>
                </div>
                <h3 className="text-3xl font-black tracking-[-0.045em]">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="suivan-reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-teal-700">
                explore_pools
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
                Pool cards built for live Sui data.
              </h2>
            </div>
            <Link
              className="protocol-font inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-slate-950 bg-slate-950 px-6 text-sm font-black text-white shadow-[4px_4px_0_#61d7ff] transition hover:-translate-y-0.5 hover:bg-sky-400 hover:text-slate-950"
              href="/pools"
            >
              Open Explorer
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {poolCards.map((pool) => (
              <article className={`suivan-reveal suivan-tilt rounded-[1.75rem] border-2 border-slate-950 ${pool.tone} p-5 shadow-[7px_7px_0_#06111f]`} key={pool.name}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="protocol-font text-xs font-black uppercase tracking-[0.14em] text-slate-500">object::pool</p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">{pool.name}</h3>
                    <p className="protocol-font mt-2 text-xs font-black text-slate-500">{pool.object}</p>
                  </div>
                  <span className="protocol-font rounded-full border-2 border-slate-950 bg-white px-3 py-1 text-xs font-black">{pool.apy}</span>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-2">
                  {[
                    ["members", pool.members],
                    ["cycle", pool.cycle],
                  ].map(([label, value]) => (
                    <div className="rounded-2xl border-2 border-slate-950 bg-white p-3" key={label}>
                      <p className="protocol-font text-[10px] font-black uppercase text-slate-400">{label}</p>
                      <p className="protocol-font mt-1 text-lg font-black">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-slate-950 bg-white">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-teal-300" style={{ width: pool.progress }} />
                </div>
                <p className="protocol-font mt-3 text-xs font-black uppercase text-slate-500">cycle progress</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 lg:px-12">
        <div className="suivan-reveal mx-auto grid max-w-6xl gap-6 rounded-[2rem] border-2 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#06111f] md:grid-cols-[0.82fr_1.18fr] md:p-8">
          <TrustIcon />
          <div>
            <p className="protocol-font text-xs font-black uppercase tracking-[0.22em] text-teal-700">
              trust_layer
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl">
              Less noise. More confidence.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              Suivan should explain what matters before a user connects a wallet: contribution schedule, participant state, payout progress, collateral direction, and yield assumptions.
            </p>
            <div className="mt-6 grid gap-2 md:grid-cols-2">
              {trustItems.map((item) => (
                <div className="protocol-font rounded-2xl border-2 border-slate-950 bg-[#fbf7ed] px-4 py-3 text-xs font-black uppercase tracking-[0.1em]" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GridPattern({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" aria-hidden="true">
      <defs>
        <pattern id="suivan-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" stroke="#06111f" strokeOpacity="0.18" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#suivan-grid)" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg className="h-16 w-16" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M28 57c8-10 17-14 28-10l8 3c5 2 7 8 4 13-4 8-14 12-26 10l-18-3" fill="#fff" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 58l-10 3 7 18 12-5" fill="#61d7ff" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M47 47l8-19 10 4-7 19" fill="#fff1c7" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M39 52h20" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg className="h-16 w-16" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="28" fill="#fff" stroke="#06111f" strokeWidth="4" />
      <path d="M47 20c13 0 25 9 28 22" stroke="#14b8a6" strokeWidth="8" strokeLinecap="round" />
      <path d="M49 76c-13 0-25-9-28-22" stroke="#61d7ff" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 42l17 1-10-13" fill="#14b8a6" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M38 54l-17-1 10 13" fill="#61d7ff" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

function PotIcon() {
  return (
    <svg className="h-16 w-16" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M24 40h48l-6 33H30l-6-33Z" fill="#fff" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M34 40c0-9 6-16 14-16s14 7 14 16" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="55" r="4" fill="#14b8a6" />
      <circle cx="50" cy="55" r="4" fill="#61d7ff" />
      <circle cx="58" cy="66" r="4" fill="#f6c85f" />
      <path d="M20 73h56" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function YieldIcon() {
  return (
    <svg className="h-16 w-16" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M20 72h58" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
      <path d="M26 66V50h13v16" fill="#61d7ff" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M43 66V36h13v30" fill="#14b8a6" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 66V26h13v40" fill="#fff1c7" stroke="#06111f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 31c13 3 27-2 40-15" stroke="#06111f" strokeWidth="4" strokeLinecap="round" />
      <path d="M63 16h13v13" stroke="#06111f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ObjectScene() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 360 260" fill="none" aria-hidden="true">
      <rect x="24" y="28" width="312" height="190" rx="28" fill="#fbf7ed" stroke="#06111f" strokeWidth="5" />
      <circle cx="108" cy="94" r="31" fill="#61d7ff" stroke="#06111f" strokeWidth="5" />
      <circle cx="180" cy="72" r="31" fill="#14b8a6" stroke="#06111f" strokeWidth="5" />
      <circle cx="252" cy="96" r="31" fill="#fff1c7" stroke="#06111f" strokeWidth="5" />
      <path d="M132 92c15-10 31-15 48-15s33 5 48 15" stroke="#06111f" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 152h176" stroke="#06111f" strokeWidth="6" strokeLinecap="round" />
      <path d="M92 180h112" stroke="#06111f" strokeWidth="6" strokeLinecap="round" />
      <rect x="76" y="137" width="208" height="60" rx="18" fill="#fff" stroke="#06111f" strokeWidth="5" />
      <path d="M103 165h44M169 165h88" stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" />
      <path d="M55 67l14-14M60 48l5 24" stroke="#06111f" strokeWidth="5" strokeLinecap="round" />
      <path d="M295 181l18 18M316 181l-24 18" stroke="#06111f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function YieldChart() {
  return (
    <svg className="mt-6 h-auto w-full" viewBox="0 0 520 220" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="504" height="204" rx="28" fill="#fbf7ed" stroke="#06111f" strokeWidth="4" />
      {[70, 110, 150].map((y) => (
        <path d={`M52 ${y}H468`} stroke="#06111f" strokeOpacity="0.14" strokeWidth="2" key={y} />
      ))}
      <path d="M54 170L98 140L142 150L186 112L230 126L274 86L318 103L362 68L406 80L466 52" stroke="#06111f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 170L98 140L142 150L186 112L230 126L274 86L318 103L362 68L406 80L466 52V181H54V170Z" fill="#14b8a6" fillOpacity="0.18" />
      {[54, 98, 142, 186, 230, 274, 318, 362, 406, 466].map((x, index) => {
        const y = [170, 140, 150, 112, 126, 86, 103, 68, 80, 52][index];
        return <circle cx={x} cy={y} r="8" fill="#8ee8d8" stroke="#06111f" strokeWidth="4" key={x} />;
      })}
      <text x="54" y="202" fill="#64748b" fontSize="16" fontWeight="800">APR 25</text>
      <text x="394" y="202" fill="#64748b" fontSize="16" fontWeight="800">MAY 25</text>
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg className="h-auto w-full max-w-sm" viewBox="0 0 320 260" fill="none" aria-hidden="true">
      <rect x="20" y="34" width="280" height="178" rx="32" fill="#dff8ff" stroke="#06111f" strokeWidth="5" />
      <path d="M78 104h164M78 138h116M78 172h140" stroke="#06111f" strokeWidth="7" strokeLinecap="round" />
      <path d="M226 62l32 18v36c0 26-14 47-32 56-18-9-32-30-32-56V80l32-18Z" fill="#14b8a6" stroke="#06111f" strokeWidth="5" strokeLinejoin="round" />
      <path d="M211 116l11 11 22-29" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="64" cy="66" r="14" fill="#fff1c7" stroke="#06111f" strokeWidth="5" />
      <path d="M48 224h224" stroke="#06111f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
