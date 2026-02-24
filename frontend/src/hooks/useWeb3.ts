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
    async (challengeId: number, entryFeeWei?: bigint) => {
      try {
        setIsLoading(true);
        setError(null);

        const hash = await writeContractAsync({
          address: contracts.ArenaEngine.address as Address,
          abi: contracts.ArenaEngine.abi,
          functionName: 'enterChallenge',
          args: [BigInt(challengeId)],
          ...(entryFeeWei && { value: entryFeeWei }),
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

// Hook to create a challenge
export function useCreateChallenge() {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(
    async (entryFeeSMN: number, durationSeconds: number) => {
      try {
        setIsLoading(true);
        setError(null);

        // Convert SMN to wei
        const entryFeeWei = BigInt(Math.floor(entryFeeSMN * 1e18));

        const hash = await writeContractAsync({
          address: contracts.ArenaEngine.address as Address,
          abi: contracts.ArenaEngine.abi,
          functionName: 'createChallenge',
          args: [entryFeeWei, BigInt(durationSeconds)],
        });

        return hash;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create challenge');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  return { create, isLoading, error };
}

// Hook to get all challenges
export function useAllChallenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: challengeCount } = useReadContract({
    address: contracts.ArenaEngine.address as Address,
    abi: contracts.ArenaEngine.abi,
    functionName: 'getChallengeIdCounter',
  });

  const fetchChallenges = useCallback(async () => {
    if (!challengeCount) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const challengesData = [];
      const count = Number(challengeCount);
      
      // Fetch each challenge from ID 1 to count-1
      for (let i = 1; i < count; i++) {
        try {
          // We'll fetch challenge data on-chain by reading the challenge mapping
          // For now, we'll note that we need the contract to expose getChallenge
          challengesData.push({ id: i });
        } catch (err) {
          console.error(`Failed to fetch challenge ${i}:`, err);
        }
      }
      
      setChallenges(challengesData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch challenges');
      setError(error);
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  }, [challengeCount]);

  return { challenges, isLoading, error, fetchChallenges };
}

// Hook to submit a score for a challenge
export function useSubmitScore() {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(
    async (challengeId: number, score: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const hash = await writeContractAsync({
          address: contracts.ArenaEngine.address as Address,
          abi: contracts.ArenaEngine.abi,
          functionName: 'submitScore',
          args: [BigInt(challengeId), BigInt(score)],
        });

        return hash;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to submit score');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  return { submit, isLoading, error };
}

// Hook to finalize a challenge
export function useFinalizeChallenge() {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const finalize = useCallback(
    async (challengeId: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const hash = await writeContractAsync({
          address: contracts.ArenaEngine.address as Address,
          abi: contracts.ArenaEngine.abi,
          functionName: 'finalizeChallenge',
          args: [BigInt(challengeId)],
        });

        return hash;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to finalize challenge');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [writeContractAsync]
  );

  return { finalize, isLoading, error };
}
