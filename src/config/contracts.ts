export const SUI_NETWORK = (process.env.NEXT_PUBLIC_SUI_NETWORK || "testnet") as "testnet" | "mainnet";

export const SUI_CONFIG = {
  network: SUI_NETWORK,
  packageId:
    process.env.NEXT_PUBLIC_SUI_PACKAGE_ID ||
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  registryObjectId:
    process.env.NEXT_PUBLIC_SUI_REGISTRY_OBJECT_ID ||
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  sponsorEndpoint: process.env.NEXT_PUBLIC_SPONSOR_TX_ENDPOINT || "/api/sponsor",
  zkLoginIssuer: process.env.NEXT_PUBLIC_ZKLOGIN_ISSUER || "https://accounts.google.com",
  coinTypes: {
    sui: "0x2::sui::SUI",
    usdc:
      process.env.NEXT_PUBLIC_SUI_USDC_COIN_TYPE ||
      "0x0000000000000000000000000000000000000000000000000000000000000000::usdc::USDC",
  },
  modules: {
    rosca: "rosca_pool",
    registry: "pool_registry",
  },
} as const;

export const SUI_FEATURE_FLAGS = {
  sponsoredTransactions: true,
  zkLogin: true,
  walrusMetadata: true,
  suiNS: true,
} as const;
