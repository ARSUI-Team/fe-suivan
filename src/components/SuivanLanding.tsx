"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  Droplets,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Active pool surfaces", value: 18, suffix: "+" },
  { label: "Members coordinated", value: 1240, suffix: "+" },
  { label: "Cycle volume tracked", value: 680, prefix: "$", suffix: "K" },
  { label: "Current APY signal", value: 8.1, suffix: "%" },
];

const cycleSteps = [
  {
    title: "Join a pool",
    copy: "Members enter a transparent ROSCA pool with clear cadence, commitment rules, and payout order.",
    icon: UsersRound,
  },
  {
    title: "Contribute every cycle",
    copy: "Each cycle shows who is ready, who has contributed, and when the next window closes.",
    icon: Clock3,
  },
  {
    title: "Rotate payout",
    copy: "Payout state is presented as a visible protocol surface before any signing moment.",
    icon: CircleDollarSign,
  },
  {
    title: "Route idle yield",
    copy: "APY is framed as a modular yield layer, separated from core savings logic until integration is final.",
    icon: Layers3,
  },
];

const pools = [
  {
    name: "Women Founders Circle",
    region: "Jakarta to Singapore",
    apy: "7.4%",
    progress: 68,
    members: "14 / 20",
    cadence: "Monthly",
  },
  {
    name: "Diaspora Builders Pool",
    region: "Global remote community",
    apy: "6.8%",
    progress: 45,
    members: "31 / 40",
    cadence: "Bi-weekly",
  },
  {
    name: "Sui Creators Collective",
    region: "APAC creator network",
    apy: "8.1%",
    progress: 82,
    members: "9 / 12",
    cadence: "Monthly",
  },
];

const headlineWords = ["Suivan", "rotates", "community", "wealth", "on", "Sui."];

export default function SuivanLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".suivan-word", {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
        });

        gsap.from(".suivan-hero-copy", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          delay: 0.25,
          ease: "power3.out",
        });

        gsap.from(".suivan-device", {
          y: 46,
          rotate: -3,
          opacity: 0,
          duration: 1,
          delay: 0.18,
          ease: "power3.out",
        });

        gsap.to(".suivan-device", {
          y: -28,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".suivan-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const value = Number(el.dataset.value || "0");
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const decimals = value % 1 === 0 ? 0 : 1;
          const state = { value: 0 };

          gsap.to(state, {
            value,
            duration: 1.4,
            delay: 0.45,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${prefix}${state.value.toLocaleString("en-US", {
                maximumFractionDigits: decimals,
                minimumFractionDigits: decimals,
              })}${suffix}`;
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".suivan-reveal").forEach((el) => {
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".suivan-step").forEach((el, index) => {
          gsap.from(el, {
            x: index % 2 === 0 ? -34 : 34,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
            },
          });
        });

        gsap.from(".suivan-pool-object", {
          y: 42,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".suivan-pools",
            start: "top 72%",
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="bg-[#f8fbff] text-slate-950">
      <section className="suivan-hero min-h-[92vh] overflow-hidden bg-[#f8fbff] px-5 pt-32 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="suivan-hero-copy mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
              <Droplets className="size-4" />
              <span className="protocol-font">{"<sui>"} community wealth protocol {"</sui>"}</span>
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-slate-950 md:text-7xl">
              {headlineWords.map((word, index) => (
                <span className="suivan-word mr-3 inline-block" key={word}>
                  {word === "Sui." ? <span className="text-sky-500">{word}</span> : word}
                  {index < headlineWords.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>

            <p className="suivan-hero-copy mt-6 max-w-xl text-lg font-medium leading-8 text-slate-600">
              Arisan is a local expression of ROSCA. Suivan turns rotating savings into
              a Sui-native pool experience with visible cycles, member state, APY signals,
              and payout progress.
            </p>

            <div className="suivan-hero-copy mt-8 flex flex-wrap gap-3">
              <Link
                href="/pools"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                Explore Pools
                <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="#cycles"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 transition hover:border-sky-200 hover:text-sky-700"
              >
                How ROSCA Works
              </a>
            </div>
          </div>

          <div className="suivan-device relative mx-auto w-full max-w-md">
            <div className="absolute -right-6 top-10 hidden h-24 w-24 rounded-full bg-[#6fbcff] opacity-20 blur-2xl md:block" />
            <div className="rotate-2 border border-slate-200 bg-white p-3 shadow-2xl shadow-sky-950/10">
              <div className="bg-slate-950 p-4 text-white">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="protocol-font text-xs uppercase text-sky-200">pool_object::live</p>
                    <p className="font-bold">Sui Creators Collective</p>
                  </div>
                  <span className="protocol-font rounded-full bg-sky-400 px-3 py-1 text-xs font-bold text-slate-950">8.1% APY</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/8 p-3">
                    <div className="protocol-font mb-2 flex justify-between text-xs text-slate-300">
                      <span>Cycle progress</span>
                      <span>82%</span>
                    </div>
                    <div className="h-2 bg-white/10">
                      <div className="h-full w-[82%] bg-sky-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/8 p-3">
                      <p className="protocol-font text-xs uppercase text-slate-300">members</p>
                      <p className="protocol-font mt-2 text-xl font-black">9 / 12</p>
                    </div>
                    <div className="bg-white/8 p-3">
                      <p className="protocol-font text-xs uppercase text-slate-300">payout</p>
                      <p className="protocol-font mt-2 text-xl font-black">30d</p>
                    </div>
                  </div>

                  <div className="bg-[#e8fbff] p-3 text-slate-950">
                    <p className="protocol-font text-xs font-bold uppercase text-sky-700">next_action</p>
                    <p className="mt-1 text-sm font-bold">Final cycle contribution window is live.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="suivan-hero-copy mx-auto mt-10 grid max-w-6xl grid-cols-2 border-y border-slate-200 bg-white md:grid-cols-4">
          {stats.map((stat) => (
            <div className="border-slate-200 p-5 md:border-r last:md:border-r-0" key={stat.label}>
              <p
                className="protocol-font text-3xl font-black text-slate-950"
                data-counter
                data-prefix={stat.prefix || ""}
                data-suffix={stat.suffix || ""}
                data-value={stat.value}
              >
                0
              </p>
              <p className="protocol-font mt-2 text-sm font-semibold text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="rosca" className="px-5 py-24 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="suivan-reveal">
            <p className="protocol-font mb-4 text-sm font-black uppercase text-sky-600">{"<rosca>"} globally legible {"</rosca>"}</p>
            <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Arisan energy, protocol clarity.
            </h2>
          </div>
          <div className="suivan-reveal space-y-5 text-lg font-medium leading-8 text-slate-600">
            <p>
              ROSCA stands for Rotating Savings and Credit Association. Communities already
              understand the behavior: members contribute regularly, and each cycle rotates
              the payout to one participant.
            </p>
            <p>
              Suivan makes that flow inspectable for global groups: pool rules, contribution
              cadence, participant progress, payout state, and yield context are presented
              before the user signs.
            </p>
          </div>
        </div>
      </section>

      <section id="cycles" className="bg-slate-950 px-5 py-24 text-white md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="suivan-reveal max-w-3xl">
            <p className="protocol-font mb-4 text-sm font-black uppercase text-sky-300">cycle_state_machine</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Four states a member should understand instantly.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {cycleSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article className="suivan-step border border-white/10 bg-white/[0.04] p-5" key={step.title}>
                  <div className="mb-10 flex items-center justify-between">
                    <Icon className="size-6 text-sky-300" />
                    <span className="protocol-font text-sm font-black text-white/40">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-black">{step.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-300">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pools" className="suivan-pools px-5 py-24 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="suivan-reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="protocol-font mb-4 text-sm font-black uppercase text-sky-600">pool_objects</p>
              <h2 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                Pool cards should feel like live Sui objects.
              </h2>
            </div>
            <Link
              href="/pools"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-sky-500 px-6 text-sm font-black text-white transition hover:bg-slate-950"
            >
              Open Explorer
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {pools.map((pool) => (
              <article className="suivan-pool-object border border-slate-200 bg-white p-5 shadow-sm" key={pool.name}>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="protocol-font text-xs font-black uppercase text-slate-400">{pool.region}</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-950">{pool.name}</h3>
                  </div>
                  <span className="protocol-font rounded-full bg-[#e8fbff] px-3 py-1 text-sm font-black text-sky-700">{pool.apy}</span>
                </div>

                <div className="mt-8">
                  <div className="protocol-font mb-2 flex justify-between text-sm font-bold text-slate-500">
                    <span>Cycle progress</span>
                    <span>{pool.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100">
                    <div className="h-full bg-sky-500" style={{ width: `${pool.progress}%` }} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="border border-slate-100 p-3">
                    <p className="protocol-font font-bold uppercase text-slate-400">members</p>
                    <p className="protocol-font mt-1 font-black text-slate-950">{pool.members}</p>
                  </div>
                  <div className="border border-slate-100 p-3">
                    <p className="protocol-font font-bold uppercase text-slate-400">cadence</p>
                    <p className="protocol-font mt-1 font-black text-slate-950">{pool.cadence}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8fbff] px-5 py-24 md:px-10 lg:px-12">
        <div className="suivan-reveal mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="protocol-font mb-4 text-sm font-black uppercase text-sky-700">why_sui</p>
            <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Fast settlement fits rotating savings.
            </h2>
          </div>
          <div className="grid gap-4">
            <div className="flex gap-4 border border-sky-100 bg-white p-5">
              <Droplets className="mt-1 size-6 text-sky-500" />
              <p className="font-semibold leading-7 text-slate-600">
                Low-fee, fast execution lets contribution windows and payout events feel immediate.
              </p>
            </div>
            <div className="flex gap-4 border border-sky-100 bg-white p-5">
              <ShieldCheck className="mt-1 size-6 text-sky-500" />
              <p className="font-semibold leading-7 text-slate-600">
                Transparent rules can be surfaced cleanly without tying the frontend to old Archa contracts.
              </p>
            </div>
            <div className="flex gap-4 border border-sky-100 bg-white p-5">
              <LockKeyhole className="mt-1 size-6 text-sky-500" />
              <p className="font-semibold leading-7 text-slate-600">
                The UI stays modular while the backend and smart contract team finalizes the new integration layer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
