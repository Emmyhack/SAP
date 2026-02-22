import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useEnterChallenge } from '../hooks/useWeb3';

export default function ArenaPage() {
  const { address, isConnected } = useAccount();
  const { enter, isLoading: entering } = useEnterChallenge();
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  
  // Demo challenges (contract doesn't expose getAll, so we show examples)
  const challenges = [
    {
      id: 0,
      title: 'Speed Challenge',
      difficulty: 1,
      entryFee: 0.01,
      duration: 300,
      participants: 42,
      description: 'Complete the challenge within 5 minutes'
    },
    {
      id: 1,
      title: 'Logic Puzzle',
      difficulty: 2,
      entryFee: 0.05,
      duration: 600,
      participants: 28,
      description: 'Solve complex logic problems'
    },
    {
      id: 2,
      title: 'Master Challenge',
      difficulty: 3,
      entryFee: 0.1,
      duration: 900,
      participants: 12,
      description: 'Advanced challenge - only for the best'
    },
  ];

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
        <p className="text-gray-400">Complete challenges, earn points, and compete with others</p>
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
                      <span>Difficulty: <span className="text-primary font-semibold">{'⭐'.repeat(challenge.difficulty)}</span></span>
                      <span>Entry: <span className="text-accent font-semibold">{challenge.entryFee} ETH</span></span>
                      <span>Duration: <span className="font-semibold">{challenge.duration}s</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Joined</p>
                    <p className="text-2xl font-bold text-primary">{challenge.participants}</p>
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

        {/* Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold mb-6">📋 How It Works</h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">1. Choose a Challenge</h3>
                <p>Select a challenge based on difficulty and entry fee</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">2. Pay Entry Fee</h3>
                <p>Submit entry fee transaction (costs ETH)</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">3. Complete Challenge</h3>
                <p>Work against the timer to complete objectives</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">4. Submit Score</h3>
                <p>Submit your completion proof and score</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">5. Earn Rewards</h3>
                <p>Gain reputation and split the prize pool</p>
              </div>
            </div>
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
                <p className="text-gray-400 text-sm mb-2">Challenge Description</p>
                <p className="text-gray-300">
                  {challenges[selectedChallenge]?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark rounded p-4">
                  <p className="text-gray-400 text-sm">Time Limit</p>
                  <p className="text-xl font-bold text-primary">
                    {challenges[selectedChallenge]?.duration}s
                  </p>
                </div>
                <div className="bg-dark rounded p-4">
                  <p className="text-gray-400 text-sm">Entry Fee</p>
                  <p className="text-xl font-bold text-accent">
                    {challenges[selectedChallenge]?.entryFee} ETH
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
              {entering ? 'Processing...' : 'Join Challenge'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
