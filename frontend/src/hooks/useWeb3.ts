import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useCallback, useState } from 'react';
import { contracts } from '../config/contracts';
import { Address, parseAbi } from 'viem';

// Hook to check if user has a passport
export function useHasPassport() {
  const { address } = useAccount();
  
  const { data: hasPassport, isLoading } = useReadContract({
    address: contracts.SomniaPassport.address as Address,
    abi: contracts.SomniaPassport.abi,
    functionName: 'hasPassport',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return { hasPassport: hasPassport as boolean, isLoading };
}

// Hook to mint a passport
export function useMintPassport() {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mint = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const hash = await writeContractAsync({
        address: contracts.SomniaPassport.address as Address,
        abi: contracts.SomniaPassport.abi,
        functionName: 'mint',
      });

      return hash;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to mint passport');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [writeContractAsync]);

  return { mint, isLoading, error };
}

// Hook to get user reputation
export function useReputation() {
  const { address } = useAccount();

  const { data: reputation, isLoading, refetch } = useReadContract({
    address: contracts.ReputationCore.address as Address,
    abi: contracts.ReputationCore.abi,
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    reputation: reputation as [number, number, number, number] | undefined,
    isLoading,
    refetch,
  };
}

// Hook to get user rank
export function useUserRank() {
  const { address } = useAccount();

  const { data: rank, isLoading } = useReadContract({
    address: contracts.ReputationCore.address as Address,
    abi: contracts.ReputationCore.abi,
    functionName: 'getRank',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return { rank: rank as number | undefined, isLoading };
}

// Hook to get challenges
export function useChallenges() {
  const { data: challengeCount, isLoading: countLoading } = useReadContract({
    address: contracts.ArenaEngine.address as Address,
    abi: contracts.ArenaEngine.abi,
    functionName: 'challengeCount',
  });

  return {
    challengeCount: challengeCount as number | undefined,
    isLoading: countLoading,
  };
}

// Hook to get a specific challenge
export function useChallenge(challengeId: number) {
  const { data: challenge, isLoading } = useReadContract({
    address: contracts.ArenaEngine.address as Address,
    abi: contracts.ArenaEngine.abi,
    functionName: 'getChallenge',
    args: [BigInt(challengeId)],
  });

  return { challenge, isLoading };
}

// Hook to enter a challenge
export function useEnterChallenge() {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enter = useCallback(
    async (challengeId: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const hash = await writeContractAsync({
          address: contracts.ArenaEngine.address as Address,
          abi: contracts.ArenaEngine.abi,
          functionName: 'enterChallenge',
          args: [BigInt(challengeId)],
        });

        return hash;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to enter challenge');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  return { enter, isLoading, error };
}

// Hook to get top users (leaderboard)
export function useLeaderboard() {
  const { data, isLoading } = useReadContract({
    address: contracts.ReputationCore.address as Address,
    abi: contracts.ReputationCore.abi,
    functionName: 'getTopUsers',
  });

  const [users, scores] = data as [Address[], number[]] || [[], []];

  return {
    leaderboard: users?.map((user, i) => ({
      user,
      score: scores?.[i] || 0,
    })) || [],
    isLoading,
  };
}
