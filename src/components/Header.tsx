"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ConnectWallet from "./ConnectWallet";
import SuivanLogo from "./SuivanLogo";

const navItems = [
  { label: "ROSCA", href: "/#rosca" },
  { label: "Cycles", href: "/#cycles" },
  { label: "Pools", href: "/pools" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[200] px-4 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-slate-950 bg-white/90 px-4 py-3 shadow-[5px_5px_0_#06111f] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-slate-950 shadow-sm shadow-sky-500/20">
            <SuivanLogo className="size-10" priority size={40} />
          </span>
          <div className="leading-none">
            <span className="block text-lg font-black text-slate-950">Suivan</span>
            <span className="protocol-font block text-xs font-bold text-sky-600">Community Wealth Protocol</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              className="protocol-font rounded-full px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-[#dff8ff] hover:text-slate-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ConnectWallet variant="header" />
          <Link
            href="/pools"
            className="protocol-font inline-flex h-11 items-center gap-2 rounded-full border-2 border-slate-950 bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-sky-500 hover:text-slate-950"
          >
            Explore
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <button
          aria-label="Toggle navigation menu"
          className="grid size-11 place-items-center rounded-full border-2 border-slate-950 text-slate-950 md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-2xl border-2 border-slate-950 bg-white p-4 shadow-[5px_5px_0_#06111f] md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                className="protocol-font rounded-lg px-4 py-3 text-sm font-bold text-slate-700 hover:bg-sky-50"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-3">
              <ConnectWallet variant="mobile" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
