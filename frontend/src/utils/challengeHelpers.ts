import { createPublicClient, http, formatUnits } from 'viem';
import { contracts } from '../config/contracts';
import { somniaChain } from '../config/wagmi';

const publicClient = createPublicClient({
  chain: somniaChain,
  transport: http('https://dream-rpc.somnia.network'),
});

export async function fetchAllChallenges() {
  try {
    // Get challenge count
    const count = await publicClient.readContract({
      address: contracts.ArenaEngine.address as any,
      abi: contracts.ArenaEngine.abi,
      functionName: 'getChallengeIdCounter',
    });

    const challengeCount = Number(count);
    const challenges = [];

    // Fetch each challenge
    for (let i = 1; i < challengeCount; i++) {
      try {
        const challenge = await publicClient.readContract({
          address: contracts.ArenaEngine.address as any,
          abi: contracts.ArenaEngine.abi,
          functionName: 'getChallenge',
          args: [BigInt(i)],
        });

        if (challenge && challenge.id !== BigInt(0)) {
          const participants = await publicClient.readContract({
            address: contracts.ArenaEngine.address as any,
            abi: contracts.ArenaEngine.abi,
            functionName: 'getParticipantCount',
            args: [BigInt(i)],
          });

          challenges.push({
            id: Number(challenge.id),
            title: `Challenge #${challenge.id}`,
            description: `Competition with ${participants} participants`,
            creator: challenge.creator,
            entryFee: formatUnits(challenge.entryFee, 18),
            duration: Number(challenge.duration),
            startTime: Number(challenge.startTime),
            totalPrize: formatUnits(challenge.totalPrize, 18),
            finalized: challenge.finalized,
            topPlayer: challenge.topPlayer,
            topScore: Number(challenge.topScore),
            participants: Number(participants),
            difficulty: 'medium', // Default difficulty - could be enhanced
          });
        }
      } catch (err) {
        console.error(`Failed to fetch challenge ${i}:`, err);
      }
    }

    return challenges;
  } catch (err) {
    console.error('Failed to fetch challenges:', err);
    return [];
  }
}
