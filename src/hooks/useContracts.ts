"use client";

import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mantleSepoliaTestnet } from "wagmi/chains";
import { activeContracts } from "@/config/contracts";
import { ARISAN_FACTORY_ABI, ARISAN_POOL_ABI, ERC20_ABI } from "@/config/abis";
import { formatUnits, parseUnits } from "viem";

// Use Mantle Sepolia chain for all contract reads
const CHAIN_ID = mantleSepoliaTestnet.id;

// Types
export interface PoolInfo {
  address: `0x${string}`;
  depositAmount: bigint;
  maxParticipants: bigint;
  currentParticipants: bigint;
  cycle: bigint;
  started: boolean;
  active: boolean;
  totalFunds: bigint;
  yield: bigint;
}

export interface FormattedPool {
  id: number;
  address: `0x${string}`;
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

// Hook to get all pools from factory
export function useAllPools() {
  const { data: poolAddresses, isLoading, error, refetch } = useReadContract({
    address: activeContracts.factory,
    abi: ARISAN_FACTORY_ABI,
    functionName: "getAllPools",
    chainId: CHAIN_ID,
  });

  return {
    poolAddresses: poolAddresses as `0x${string}`[] | undefined,
    isLoading,
    error,
    refetch,
  };
}

// Hook to get pool info for a single pool
export function usePoolInfo(poolAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "getPoolInfo",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  const poolInfo: PoolInfo | undefined = data ? {
    address: poolAddress!,
    depositAmount: data[0],
    maxParticipants: data[1],
    currentParticipants: data[2],
    cycle: data[3],
    started: data[4],
    active: data[5],
    totalFunds: data[6],
    yield: data[7],
  } : undefined;

  return {
    poolInfo,
    isLoading,
    error,
    refetch,
  };
}

// Hook to get pool info for multiple pools
export function usePoolsInfo(poolAddresses: `0x${string}`[] | undefined) {
  const contracts = poolAddresses?.map((address) => ({
    address,
    abi: ARISAN_POOL_ABI,
    functionName: "getPoolInfo" as const,
    chainId: CHAIN_ID,
  })) || [];

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts,
    query: {
      enabled: !!poolAddresses && poolAddresses.length > 0,
    },
  });

  const poolsInfo: PoolInfo[] | undefined = data?.map((result, index) => {
    if (result.status === "success" && result.result) {
      const r = result.result as [bigint, bigint, bigint, bigint, boolean, boolean, bigint, bigint];
      return {
        address: poolAddresses![index],
        depositAmount: r[0],
        maxParticipants: r[1],
        currentParticipants: r[2],
        cycle: r[3],
        started: r[4],
        active: r[5],
        totalFunds: r[6],
        yield: r[7],
      };
    }
    return null;
  }).filter((p): p is PoolInfo => p !== null);

  return {
    poolsInfo,
    isLoading,
    error,
    refetch,
  };
}

// Combined hook to get all pools with their info
export function useAllPoolsWithInfo() {
  const { poolAddresses, isLoading: addressesLoading, refetch: refetchAddresses } = useAllPools();
  const { poolsInfo, isLoading: infoLoading, refetch: refetchInfo } = usePoolsInfo(poolAddresses);

  // Format pools for display
  const formattedPools: FormattedPool[] | undefined = poolsInfo?.map((pool, index) => {
    const depositAmount = Number(formatUnits(pool.depositAmount, 6)); // USDC has 6 decimals
    const totalFunds = Number(formatUnits(pool.totalFunds, 6));
    const yieldAmount = Number(formatUnits(pool.yield, 6));

    // Calculate APY based on yield
    const apy = totalFunds > 0 ? (yieldAmount / totalFunds) * 100 * 12 : 8.5; // Default 8.5% APY

    // Determine status
    let status: "open" | "active" | "completed" = "open";
    if (pool.started && pool.active) {
      status = "active";
    } else if (pool.started && !pool.active) {
      status = "completed";
    } else if (Number(pool.currentParticipants) < Number(pool.maxParticipants)) {
      status = "open";
    }

    // Generate name based on deposit amount
    let name = "Custom Pool";
    if (depositAmount === 10) name = "Small Pool";
    else if (depositAmount === 50) name = "Medium Pool";
    else if (depositAmount === 100) name = "Large Pool";

    return {
      id: index + 1,
      address: pool.address,
      name,
      depositAmount,
      maxParticipants: Number(pool.maxParticipants),
      currentParticipants: Number(pool.currentParticipants),
      cycleDuration: 30, // Default 30 days
      totalFunds,
      status,
      apy: Math.round(apy * 10) / 10, // Round to 1 decimal
      currentCycle: Number(pool.cycle),
    };
  });

  const refetch = () => {
    refetchAddresses();
    refetchInfo();
  };

  return {
    pools: formattedPools,
    isLoading: addressesLoading || infoLoading,
    refetch,
  };
}

// Hook to get required collateral for a pool
export function useRequiredCollateral(poolAddress: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "getRequiredCollateral",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    collateral: data ? Number(formatUnits(data, 6)) : undefined,
    collateralRaw: data,
    isLoading,
    error,
  };
}

// Hook to get USDC balance
export function useUSDCBalance(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: activeContracts.usdc,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: data ? Number(formatUnits(data, 6)) : 0,
    balanceRaw: data,
    isLoading,
    error,
    refetch,
  };
}

// Hook to get USDC allowance
export function useUSDCAllowance(owner: `0x${string}` | undefined, spender: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: activeContracts.usdc,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    chainId: CHAIN_ID,
    query: {
      enabled: !!owner && !!spender,
    },
  });

  return {
    allowance: data ? Number(formatUnits(data, 6)) : 0,
    allowanceRaw: data,
    isLoading,
    error,
    refetch,
  };
}

// Hook to approve USDC
export function useApproveUSDC() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (spender: `0x${string}`, amount: number) => {
    const amountInWei = parseUnits(amount.toString(), 6);
    writeContract({
      address: activeContracts.usdc,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spender, amountInWei],
    });
  };

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to join pool
export function useJoinPool() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const joinPool = (poolAddress: `0x${string}`) => {
    writeContract({
      address: poolAddress,
      abi: ARISAN_POOL_ABI,
      functionName: "joinPool",
    });
  };

  return {
    joinPool,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to create custom pool
export function useCreatePool() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createPool = (depositAmount: number, maxParticipants: number, cycleDurationDays: number) => {
    const depositInWei = parseUnits(depositAmount.toString(), 6);
    const cycleDurationSeconds = BigInt(cycleDurationDays * 24 * 60 * 60);

    writeContract({
      address: activeContracts.factory,
      abi: ARISAN_FACTORY_ABI,
      functionName: "createCustomPool",
      args: [depositInWei, BigInt(maxParticipants), cycleDurationSeconds],
    });
  };

  return {
    createPool,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to create pool from template
export function useCreatePoolFromTemplate() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createFromTemplate = (templateId: number) => {
    writeContract({
      address: activeContracts.factory,
      abi: ARISAN_FACTORY_ABI,
      functionName: "createPoolFromTemplate",
      args: [BigInt(templateId)],
    });
  };

  return {
    createFromTemplate,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to make deposit
export function useMakeDeposit() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const makeDeposit = (poolAddress: `0x${string}`) => {
    writeContract({
      address: poolAddress,
      abi: ARISAN_POOL_ABI,
      functionName: "makeDeposit",
    });
  };

  return {
    makeDeposit,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

// Hook to get participant info
export function useParticipantInfo(poolAddress: `0x${string}` | undefined, participantAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "participants",
    args: participantAddress ? [participantAddress] : undefined,
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress && !!participantAddress,
    },
  });

  const participantInfo = data ? {
    addr: data[0] as `0x${string}`,
    collateralAmount: Number(formatUnits(data[1] as bigint, 6)),
    totalDeposited: Number(formatUnits(data[2] as bigint, 6)),
    missedPayments: Number(data[3] as bigint),
    hasReceivedPayout: data[4] as boolean,
    isActive: data[5] as boolean,
    joinedAt: Number(data[6] as bigint),
  } : undefined;

  return {
    participantInfo,
    isLoading,
    error,
    refetch,
  };
}

// Hook to get participant list
export function useParticipantList(poolAddress: `0x${string}` | undefined) {
  const { data: count, isLoading: countLoading } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "getParticipantCount",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  // Get each participant address
  const participantCount = count ? Number(count) : 0;
  const contracts = Array.from({ length: participantCount }, (_, i) => ({
    address: poolAddress!,
    abi: ARISAN_POOL_ABI,
    functionName: "participantList" as const,
    args: [BigInt(i)],
    chainId: CHAIN_ID,
  }));

  const { data: addresses, isLoading: addressesLoading, refetch } = useReadContracts({
    contracts,
    query: {
      enabled: !!poolAddress && participantCount > 0,
    },
  });

  const participantAddresses = addresses
    ?.filter((r) => r.status === "success")
    .map((r) => r.result as `0x${string}`) || [];

  return {
    participantAddresses,
    participantCount,
    isLoading: countLoading || addressesLoading,
    refetch,
  };
}

// Hook to check if user has deposited this cycle
export function useHasDepositedThisCycle(poolAddress: `0x${string}` | undefined, userAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "hasDepositedThisCycle",
    args: userAddress ? [userAddress] : undefined,
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress && !!userAddress,
    },
  });

  return {
    hasDeposited: data as boolean | undefined,
    isLoading,
    error,
    refetch,
  };
}

// Hook to get cycle winner
export function useCycleWinner(poolAddress: `0x${string}` | undefined, cycle: number) {
  const { data, isLoading, error } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "cycleWinners",
    args: [BigInt(cycle)],
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress && cycle > 0,
    },
  });

  return {
    winner: data as `0x${string}` | undefined,
    isLoading,
    error,
  };
}

// Hook to get last winner
export function useLastWinner(poolAddress: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "lastWinner",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    lastWinner: data as `0x${string}` | undefined,
    isLoading,
    error,
  };
}

// Hook to get current yield
export function useCurrentYield(poolAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "getCurrentYield",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    currentYield: data ? Number(formatUnits(data, 6)) : 0,
    isLoading,
    error,
    refetch,
  };
}

// Hook to check if cycle is complete
export function useIsCycleComplete(poolAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: ARISAN_POOL_ABI,
    functionName: "isCycleComplete",
    chainId: CHAIN_ID,
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    isCycleComplete: data as boolean | undefined,
    isLoading,
    error,
    refetch,
  };
}
