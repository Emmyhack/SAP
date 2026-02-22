import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useCallback, useState } from 'react';
import { contracts } from '../config/contracts';
import { Address } from 'viem';

// Hook to check if user has a passport
export function useHasPassport() {
  const { address } = useAccount();
  
  const { data: passportId, isLoading } = useReadContract({
    address: contracts.SomniaPassport.address as Address,
    abi: contracts.SomniaPassport.abi,
    functionName: 'passportOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return { hasPassport: (passportId as bigint)?.toString() !== '0' && !!passportId, isLoading };
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
        functionName: 'mintPassport',
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

// Hook to get user passport data
export function usePassportData() {
  const { address } = useAccount();

  const { data: passportData, isLoading, refetch } = useReadContract({
    address: contracts.SomniaPassport.address as Address,
    abi: contracts.SomniaPassport.abi,
    functionName: 'getPassport',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    passportData: passportData as any,
    isLoading,
    refetch,
  };
}

// Hook to get challenges count
export function useChallengesCount() {
  const { data: count, isLoading } = useReadContract({
    address: contracts.ArenaEngine.address as Address,
    abi: contracts.ArenaEngine.abi,
    functionName: 'getChallengeIdCounter',
  });

  return { count: count as bigint | undefined, isLoading };
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
