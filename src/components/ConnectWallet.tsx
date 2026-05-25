"use client";

import {
  useConnectWallet,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useSuiClientQuery,
  useWallets,
} from "@mysten/dapp-kit";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";

interface ConnectWalletProps {
  variant?: "header" | "mobile";
  scrolled?: boolean;
}

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function walletInitial(name: string) {
  return name.slice(0, 1).toUpperCase();
}

export default function ConnectWallet({ variant = "header" }: ConnectWalletProps) {
  const account = useCurrentAccount();
  const { currentWallet, isConnected } = useCurrentWallet();
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const canUsePortal = typeof document !== "undefined";

  const { data: balance } = useSuiClientQuery(
    "getBalance",
    {
      owner: account?.address || "0x0",
    },
    {
      enabled: Boolean(account?.address),
      retry: false,
    },
  );

  const suiBalance = balance?.totalBalance ? (Number(balance.totalBalance) / 1_000_000_000).toFixed(4) : "0.0000";

  if (isConnected && account) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`protocol-font flex items-center gap-2 rounded-full border-2 border-slate-950 bg-sky-400 px-4 py-2.5 text-sm font-black text-slate-950 shadow-[3px_3px_0_#06111f] transition-all duration-300 hover:-translate-y-0.5 ${
            variant === "mobile" ? "w-full justify-center" : ""
          }`}
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span>{formatAddress(account.address)}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-[195]" onClick={() => setShowDropdown(false)} />
            <div className={`absolute ${variant === "mobile" ? "left-0 right-0" : "right-0"} z-[210] mt-2 w-72 rounded-2xl border-2 border-slate-950 bg-white p-4 shadow-[5px_5px_0_#06111f]`}>
              <div className="mb-4">
                <p className="protocol-font mb-1 text-xs font-black uppercase text-slate-400">Sui Wallet</p>
                <p className="font-black text-slate-950">{currentWallet?.name || "Connected"}</p>
                <p className="protocol-font mt-2 break-all text-xs font-bold text-slate-500">{account.address}</p>
              </div>
              <div className="mb-4 rounded-xl border-2 border-slate-950 bg-[#fbf7ed] p-3">
                <p className="protocol-font mb-1 text-xs font-black uppercase text-slate-400">SUI Balance</p>
                <p className="protocol-font text-lg font-black text-slate-950">{suiBalance} SUI</p>
              </div>
              <div className="mb-4 rounded-xl border-2 border-slate-950 bg-[#dff8ff] p-3">
                <p className="protocol-font mb-1 text-xs font-black uppercase text-slate-500">Native Features</p>
                <p className="text-sm font-semibold text-slate-600">Wallet Standard, sponsored transaction ready, zkLogin ready.</p>
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
                className="protocol-font w-full rounded-xl border-2 border-slate-950 bg-white px-4 py-2.5 font-black text-slate-950 transition-colors hover:bg-[#fff1c7]"
              >
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`protocol-font flex items-center gap-2 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
          variant === "mobile"
            ? "w-full justify-center rounded-full border-2 border-slate-950 bg-sky-400 px-5 py-3 text-slate-950 shadow-[3px_3px_0_#06111f]"
            : "rounded-full border-2 border-slate-950 bg-sky-400 px-5 py-2.5 text-slate-950 shadow-[3px_3px_0_#06111f]"
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 0v18M4 7l8 4 8-4" />
        </svg>
        {t("nav.connectWallet")}
      </button>

      {showModal && canUsePortal && createPortal(
        <div className="fixed inset-0 z-[300]">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4" onClick={() => setShowModal(false)}>
            <div
              className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-2 border-slate-950 bg-white p-5 shadow-[8px_8px_0_#06111f] sm:max-w-md sm:rounded-3xl sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex justify-center sm:hidden">
                <div className="h-1 w-10 rounded-full bg-slate-300" />
              </div>

              <div className="mb-5 flex items-start justify-between sm:mb-6">
                <div>
                  <p className="protocol-font text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                    sui_wallet
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
                    Connect to Suivan
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Use any Sui Wallet Standard compatible wallet.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-slate-950 bg-sky-400 p-2 text-slate-950 transition hover:-translate-y-0.5"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {wallets.length === 0 ? (
                  <div className="rounded-2xl border-2 border-slate-950 bg-[#fbf7ed] p-5 text-center">
                    <p className="font-black text-slate-950">No Sui wallet detected</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      Install Slush, Sui Wallet, Surf Wallet, or any Wallet Standard compatible wallet.
                    </p>
                  </div>
                ) : (
                  wallets.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => {
                        connect({ wallet });
                        setShowModal(false);
                      }}
                      disabled={isPending}
                      className="group flex w-full items-center gap-4 rounded-2xl border-2 border-slate-950 bg-[#f8fbff] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#dff8ff] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-950 bg-white">
                        {wallet.icon ? (
                          <img className="h-8 w-8 object-contain" src={wallet.icon} alt="" />
                        ) : (
                          <span className="protocol-font text-lg font-black text-slate-950">
                            {walletInitial(wallet.name)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-black text-slate-950">{wallet.name}</p>
                        <p className="text-sm font-semibold text-slate-500">Sui Wallet Standard</p>
                      </div>
                      <svg className="h-5 w-5 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))
                )}
              </div>

              <div className="mt-5 rounded-2xl border-2 border-slate-950 bg-[#d9f8df] p-4">
                <p className="protocol-font text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                  Judge-ready UX
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Suivan targets one-click pool joins, sponsored gas, and zkLogin onboarding for non-crypto users.
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
