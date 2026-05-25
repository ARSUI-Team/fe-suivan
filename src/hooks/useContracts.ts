"use client";

import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClientQuery } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMemo, useState } from "react";
import { SUI_CONFIG } from "@/config/contracts";

export interface PoolInfo {
  address: string;
  depositAmount: number;
  maxParticipants: number;
  currentParticipants: number;
  cycle: number;
  started: boolean;
  active: boolean;
  totalFunds: number;
  yield: number;
}

export interface ParticipantInfo {
  addr: string;
  collateralAmount: number;
  totalDeposited: number;
  missedPayments: number;
  hasReceivedPayout: boolean;
  isActive: boolean;
  joinedAt: number;
}

export interface FormattedPool {
  id: number;
  address: string;
  name: string;
  depositAmount: number;
  maxParticipants: number;
  currentParticipants: number;
  cycleDuration: number;
  totalFunds: number;
  status: "open" | "active" | "completed";
  apy: number;
  currentCycle: number;
}

const isConfiguredPackage = !/^0x0+$/.test(SUI_CONFIG.packageId);

const SEEDED_POOLS: FormattedPool[] = [
  {
    id: 1,
    address: "0x8d6f5b2d2c7b9a0f4e1a3349c2b6f901a0ce7d4bb7f0a9d99e6754c34e3a1201",
    name: "Jakarta Builders Pool",
    depositAmount: 25,
    maxParticipants: 8,
    currentParticipants: 6,
    cycleDuration: 14,
    totalFunds: 1200,
    status: "open",
    apy: 8.8,
    currentCycle: 2,
  },
  {
    id: 2,
    address: "0xa42b84268c3c7f9a250b9cfbd6dc8e8bc1124d6ae75bbf91f20191db4f743a02",
    name: "Global Remit Circle",
    depositAmount: 50,
    maxParticipants: 10,
    currentParticipants: 10,
    cycleDuration: 30,
    totalFunds: 5000,
    status: "active",
    apy: 9.4,
    currentCycle: 4,
  },
  {
    id: 3,
    address: "0xd25ee8155eec779dd06fd9ac41f0a9445af1a6a7110e5aeb3f24e7e019facd33",
    name: "Creator Savings Guild",
    depositAmount: 100,
    maxParticipants: 12,
    currentParticipants: 9,
    cycleDuration: 21,
    totalFunds: 8400,
    status: "open",
    apy: 7.9,
    currentCycle: 1,
  },
  {
    id: 4,
    address: "0x74a0de5f399dc806dc0d626bce529f30287bb8f397ff3aa121f933ebcdd8f6b0",
    name: "Campus Mutual Pool",
    depositAmount: 15,
    maxParticipants: 6,
    currentParticipants: 6,
    cycleDuration: 14,
    totalFunds: 540,
    status: "completed",
    apy: 6.7,
    currentCycle: 6,
  },
];

const SEEDED_PARTICIPANTS = [
  "0x4e935421b4f3a8a8fb3ff6d7c86482f5d9819bbd39ce011e77a691f9a9ac3f8b",
  "0x77b6a3586c0a753d2f0c4ff8e17657515f38bda9d3a20e5f8275fbc23f77a351",
  "0x1fc6fd3af308c948aa2e1fd239ba36d088133d4c18ffcb7c2c85441f11d0a712",
  "0x6c28b837dfdc8cfd8cb53c99d30fae74807826f57c5f6f0be91135afc16151cd",
  "0x19be91a89e487fd0323aa80d30c7f6332be331f6b154819cf935711217d0d4f8",
  "0xa51c99f8d34d5d3f44eeef1598d0ddde15060eebc86d51999782c691c51954a0",
];

const toPoolInfo = (pool: FormattedPool): PoolInfo => ({
  address: pool.address,
  depositAmount: pool.depositAmount,
  maxParticipants: pool.maxParticipants,
  currentParticipants: pool.currentParticipants,
  cycle: pool.currentCycle,
  started: pool.status !== "open",
  active: pool.status === "active",
  totalFunds: pool.totalFunds,
  yield: Number((pool.totalFunds * (pool.apy / 100) * (pool.cycleDuration / 365)).toFixed(2)),
});

function useSuiPoolAction(action: "join" | "deposit" | "create") {
  const account = useCurrentAccount();
  const { mutate: signAndExecute, data, isPending: walletPending, isSuccess: walletSuccess, error } =
    useSignAndExecuteTransaction();
  const [localPending, setLocalPending] = useState(false);
  const [localDigest, setLocalDigest] = useState<string | undefined>();

  const executeDemo = () => {
    setLocalPending(true);
    window.setTimeout(() => {
      setLocalDigest(`suivan-demo-${action}-${Date.now().toString(36)}`);
      setLocalPending(false);
    }, 700);
  };

  const executeMoveCall = (
    target: string,
    buildArguments?: (tx: Transaction) => Parameters<Transaction["moveCall"]>[0]["arguments"],
  ) => {
    if (!account) return;

    if (!isConfiguredPackage) {
      executeDemo();
      return;
    }

    const tx = new Transaction();
    tx.moveCall({
      target,
      arguments: buildArguments ? buildArguments(tx) : [],
    });

    signAndExecute({
      transaction: tx,
      chain: `sui:${SUI_CONFIG.network}`,
    });
  };

  return {
    executeMoveCall,
    hash: data && "digest" in data ? data.digest : localDigest,
    isPending: walletPending || localPending,
    isConfirming: walletPending,
    isSuccess: walletSuccess || Boolean(localDigest),
    error,
  };
}

export function useAllPools() {
  return {
    poolAddresses: SEEDED_POOLS.map((pool) => pool.address),
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function usePoolInfo(poolAddress: string | undefined) {
  const poolInfo = useMemo(() => {
    const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());
    return pool ? toPoolInfo(pool) : undefined;
  }, [poolAddress]);

  return {
    poolInfo,
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function usePoolsInfo(poolAddresses: string[] | undefined) {
  const poolsInfo = useMemo(() => {
    if (!poolAddresses) return undefined;
    return SEEDED_POOLS.filter((pool) => poolAddresses.includes(pool.address)).map(toPoolInfo);
  }, [poolAddresses]);

  return {
    poolsInfo,
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function useAllPoolsWithInfo() {
  return {
    pools: SEEDED_POOLS,
    isLoading: false,
    refetch: () => undefined,
  };
}

export function useRequiredCollateral(poolAddress: string | undefined) {
  const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());
  const collateral = pool ? Math.ceil(pool.depositAmount * Math.max(pool.maxParticipants - 1, 1) * 1.25) : undefined;

  return {
    collateral,
    collateralRaw: collateral,
    isLoading: false,
    error: null,
  };
}

export function useUSDCBalance(address: string | undefined) {
  const { data, isLoading, error, refetch } = useSuiClientQuery(
    "getBalance",
    {
      owner: address || "0x0",
      coinType: SUI_CONFIG.coinTypes.usdc,
    },
    {
      enabled: Boolean(address),
      retry: false,
    },
  );

  const balance = data?.totalBalance ? Number(data.totalBalance) / 1_000_000 : 1250;

  return {
    balance,
    balanceRaw: data?.totalBalance,
    isLoading,
    error,
    refetch,
  };
}

export function useJoinPool() {
  const action = useSuiPoolAction("join");

  const joinPool = (poolAddress: string) => {
    action.executeMoveCall(`${SUI_CONFIG.packageId}::${SUI_CONFIG.modules.rosca}::join_pool`, (tx) => [
      tx.object(poolAddress),
    ]);
  };

  return {
    joinPool,
    hash: action.hash,
    isPending: action.isPending,
    isConfirming: action.isConfirming,
    isSuccess: action.isSuccess,
    error: action.error,
  };
}

export function useCreatePool() {
  const action = useSuiPoolAction("create");

  const createPool = (depositAmount: number, maxParticipants: number, cycleDurationDays: number) => {
    if (!isConfiguredPackage) {
      action.executeMoveCall(`${SUI_CONFIG.packageId}::${SUI_CONFIG.modules.registry}::create_pool`);
      return;
    }

    action.executeMoveCall(`${SUI_CONFIG.packageId}::${SUI_CONFIG.modules.registry}::create_pool`, (tx) => [
      tx.pure.u64(Math.round(depositAmount * 1_000_000)),
      tx.pure.u64(maxParticipants),
      tx.pure.u64(cycleDurationDays * 24 * 60 * 60),
    ]);
  };

  return {
    createPool,
    hash: action.hash,
    isPending: action.isPending,
    isConfirming: action.isConfirming,
    isSuccess: action.isSuccess,
    error: action.error,
  };
}

export function useCreatePoolFromTemplate() {
  const action = useSuiPoolAction("create");

  const createFromTemplate = () => {
    action.executeMoveCall(`${SUI_CONFIG.packageId}::${SUI_CONFIG.modules.registry}::create_pool_from_template`);
  };

  return {
    createFromTemplate,
    hash: action.hash,
    isPending: action.isPending,
    isConfirming: action.isConfirming,
    isSuccess: action.isSuccess,
    error: action.error,
  };
}

export function useMakeDeposit() {
  const action = useSuiPoolAction("deposit");

  const makeDeposit = (poolAddress: string) => {
    action.executeMoveCall(`${SUI_CONFIG.packageId}::${SUI_CONFIG.modules.rosca}::contribute`, (tx) => [
      tx.object(poolAddress),
    ]);
  };

  return {
    makeDeposit,
    hash: action.hash,
    isPending: action.isPending,
    isConfirming: action.isConfirming,
    isSuccess: action.isSuccess,
    error: action.error,
  };
}

export function useParticipantInfo(poolAddress: string | undefined, participantAddress: string | undefined) {
  const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());
  const isActive = Boolean(participantAddress && pool?.status !== "open");

  const participantInfo: ParticipantInfo | undefined = participantAddress
    ? {
        addr: participantAddress,
        collateralAmount: pool ? Math.ceil(pool.depositAmount * Math.max(pool.maxParticipants - 1, 1) * 1.25) : 0,
        totalDeposited: pool ? pool.depositAmount * Math.max(pool.currentCycle - 1, 0) : 0,
        missedPayments: 0,
        hasReceivedPayout: false,
        isActive,
        joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
      }
    : undefined;

  return {
    participantInfo,
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function useParticipantList(poolAddress: string | undefined) {
  const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());
  const participantAddresses = SEEDED_PARTICIPANTS.slice(0, pool?.currentParticipants || 0);

  return {
    participantAddresses,
    participantCount: participantAddresses.length,
    isLoading: false,
    refetch: () => undefined,
  };
}

export function useHasDepositedThisCycle(poolAddress: string | undefined, userAddress: string | undefined) {
  return {
    hasDeposited: Boolean(poolAddress && userAddress && poolAddress.charCodeAt(2) % 2 === 0),
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function useCycleWinner(poolAddress: string | undefined, cycle: number) {
  return {
    winner: poolAddress && cycle > 0 ? SEEDED_PARTICIPANTS[cycle % SEEDED_PARTICIPANTS.length] : undefined,
    isLoading: false,
    error: null,
  };
}

export function useLastWinner(_poolAddress?: string) {
  void _poolAddress;
  return {
    lastWinner: SEEDED_PARTICIPANTS[1],
    isLoading: false,
    error: null,
  };
}

export function useCurrentYield(poolAddress: string | undefined) {
  const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());

  return {
    currentYield: pool ? Number((pool.totalFunds * (pool.apy / 100) * (pool.cycleDuration / 365)).toFixed(2)) : 0,
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}

export function useIsCycleComplete(poolAddress: string | undefined) {
  const pool = SEEDED_POOLS.find((item) => item.address.toLowerCase() === poolAddress?.toLowerCase());

  return {
    isCycleComplete: pool?.status === "completed",
    isLoading: false,
    error: null,
    refetch: () => undefined,
  };
}
