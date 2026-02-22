import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useChallenges, useChallenge, useEnterChallenge, useLeaderboard } from '../hooks/useWeb3';

export default function ArenaPage() {
  const { address, isConnected } = useAccount();
  const { challengeCount, isLoading: challengesLoading } = useChallenges();
  const { enter, isLoading: entering } = useEnterChallenge();
  const { leaderboard, isLoading: leaderboardLoading } = useLeaderboard();
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [challenges, setChallenges] = useState<any[]>([]);

  // Mock challenges for demo (in production, fetch from contract)
  useEffect(() => {
    setChallenges([
      {
        id: 0,
        title: 'Speed Challenge',
        difficulty: 1,
        reward: 100,
        timeLimit: 300,
        participants: 42,
      },
      {
        id: 1,
        title: 'Logic Puzzle',
        difficulty: 2,
        reward: 250,
        timeLimit: 600,
        participants: 28,
      },
      {
        id: 2,
        title: 'Master Challenge',
        difficulty: 3,
        reward: 500,
        timeLimit: 900,
        participants: 12,
      },
    ]);
  }, []);

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-gradient mb-4">Somnia Arena</h1>
        <p className="text-gray-400 text-lg">Connect your wallet to access competitive challenges.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-2">Arena Challenges</h1>
        <p className="text-gray-400">Complete challenges, earn points, and climb the leaderboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenges List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`card cursor-pointer transition-all ${
                  selectedChallenge === challenge.id
                    ? 'border-primary/100'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedChallenge(challenge.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>Difficulty: <span className="text-primary font-semibold">{challenge.difficulty}/3</span></span>
                      <span>Reward: <span className="text-accent font-semibold">{challenge.reward} pts</span></span>
                      <span>Time: <span className="font-semibold">{challenge.timeLimit}s</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{challenge.reward}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">{challenge.participants} participants</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      enter(challenge.id);
                    }}
                    disabled={entering}
                    className="btn btn-accent text-sm disabled:opacity-50"
                  >
                    {entering ? 'Joining...' : 'Join Challenge'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold mb-6">🏆 Leaderboard</h2>

            {leaderboardLoading ? (
              <div className="text-center py-8 text-gray-400">
                Loading leaderboard...
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((entry, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      entry.user === address
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-dark/50 hover:bg-dark/80'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {entry.user === address
                          ? 'You'
                          : `${entry.user.slice(0, 6)}...${entry.user.slice(-4)}`}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-accent">{entry.score}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">No leaderboard data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">
                {challenges[selectedChallenge]?.title}
              </h3>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-dark rounded p-4">
                <p className="text-gray-400 text-sm mb-2">Challenge Details</p>
                <p className="text-gray-300">
                  Test your skills in this {['easy', 'medium', 'hard'][challenges[selectedChallenge]?.difficulty - 1]} difficulty challenge. Complete it to earn {challenges[selectedChallenge]?.reward} points!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark rounded p-4">
                  <p className="text-gray-400 text-sm">Time Limit</p>
                  <p className="text-xl font-bold text-primary">
                    {challenges[selectedChallenge]?.timeLimit}s
                  </p>
                </div>
                <div className="bg-dark rounded p-4">
                  <p className="text-gray-400 text-sm">Reward</p>
                  <p className="text-xl font-bold text-accent">
                    {challenges[selectedChallenge]?.reward} pts
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                enter(selectedChallenge);
                setSelectedChallenge(null);
              }}
              disabled={entering}
              className="btn btn-accent w-full disabled:opacity-50"
            >
              {entering ? 'Joining Challenge...' : 'Accept Challenge'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
