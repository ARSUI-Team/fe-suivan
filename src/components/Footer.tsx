import Link from "next/link";
import { ArrowUpRight, Droplets } from "lucide-react";

const links = [
  { label: "ROSCA", href: "/#rosca" },
  { label: "Cycles", href: "/#cycles" },
  { label: "Pools", href: "/pools" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-14 text-white md:px-10 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-sky-500">
              <Droplets className="size-5" />
            </span>
            <div>
              <h3 className="text-2xl font-black">Suivan</h3>
              <p className="text-sm font-semibold text-sky-300">Community Wealth Protocol on Sui</p>
            </div>
          </div>
          <p className="max-w-xl font-medium leading-7 text-slate-300">
            A global ROSCA frontend direction built from Archa&apos;s product scope,
            redesigned for Sui-native cycles, pool state, and community trust.
          </p>
        </div>

        <div className="grid gap-6 md:justify-end">
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-sky-400 hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-300"
            href="https://sui.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            Built for Sui
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
