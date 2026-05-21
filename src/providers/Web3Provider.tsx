"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mantle, mantleSepoliaTestnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { ReactNode, useState } from "react";

// WalletConnect Project ID - Get free Project ID from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";

const connectors = [
  injected({
    target() {
      return {
        id: "injected",
        name: "MetaMask",
        provider: typeof window !== "undefined" ? window.ethereum : undefined,
      };
    },
  }),
  // WalletConnect - always included (uses demo ID if not configured)
  walletConnect({
    projectId: projectId || "demo-project-id",
    showQrModal: true,
    metadata: {
      name: "Archa - Arisan On-Chain",
      description: "Decentralized Arisan Platform on Mantle Network",
      url: "https://archa.app",
      icons: ["https://archa.app/logo.png"],
    },
  }),
];

const config = createConfig({
  chains: [mantleSepoliaTestnet, mantle, sepolia],
  connectors,
  transports: {
    [mantleSepoliaTestnet.id]: http("https://rpc.sepolia.mantle.xyz"),
    [mantle.id]: http("https://rpc.mantle.xyz"),
    [sepolia.id]: http("https://gateway.tenderly.co/public/sepolia"),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
