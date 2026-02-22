import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useEnterChallenge } from '../hooks/useWeb3';

export default function ArenaPage() {
  const { address, isConnected } = useAccount();
  const { enter, isLoading: entering } = useEnterChallenge();
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  
  // Demo challenges (contract doesn't expose getAll, so we show examples)
  const challenges = [
    {
      id: 0,
      title: 'Speed Challenge',
      difficulty: 1,
      entryFee: 0.01,
      duration: 300,
      participants: 42,
      description: 'Complete the challenge within 5 minutes',
      icon: '⚡',
      reward: '500 Rep'
    },
    {
      id: 1,
      title: 'Logic Puzzle',
      difficulty: 2,
      entryFee: 0.05,
      duration: 600,
      participants: 28,
      description: 'Solve complex logic problems',
      icon: '🧩',
      reward: '1,500 Rep'
    },
    {
      id: 2,
      title: 'Master Challenge',
      difficulty: 3,
      entryFee: 0.1,
      duration: 900,
      participants: 12,
      description: 'Advanced challenge - only for the best',
      icon: '👑',
      reward: '5,000 Rep'
    },
  ];

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => {
        if (filter === 'easy') return c.difficulty === 1;
        if (filter === 'medium') return c.difficulty === 2;
        if (filter === 'hard') return c.difficulty === 3;
        return true;
      });

  if (!isConnected) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center py-32 px-4">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-black text-gradient mb-6">Enter the Arena</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12">
              Connect your wallet to access competitive challenges and battle for supremacy.
            </p>
            <div className="glass-effect rounded-2xl p-8 border border-accent/30 glow-border">
              <p className="text-gray-200 text-base leading-relaxed">
                The Somnia Arena is where champions are made. Sign in to challenge competitors, earn reputation, and claim rewards from an ever-growing prize pool.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-accent/5 to-transparent mb-12 -mx-4 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-2">Competitive Gaming</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              The Somnia Arena
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Choose your challenge, prove your skills, and dominate the leaderboard</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setFilter(difficulty)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                filter === difficulty
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                  : 'bg-secondary border border-border text-gray-300 hover:border-primary/50'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <div className="lg:col-span-2">
            <div className="space-y-5">
              {filteredChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`group card cursor-pointer transition-all border-2 hover:shadow-2xl hover:shadow-primary/30 ${
                    selectedChallenge === challenge.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/70'
                  }`}
                  onClick={() => setSelectedChallenge(challenge.id)}
                >
                  <div className="flex items-start gap-6">
                    {/* Challenge Icon */}
                    <div className="text-6xl group-hover:scale-110 transition-transform mt-2">
                      {challenge.icon}
                    </div>

                    {/* Challenge Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2">{challenge.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 font-bold mb-1">PARTICIPANTS</p>
                          <p className="text-3xl font-black text-accent">{challenge.participants}</p>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">DIFFICULTY</p>
                          <p className="text-lg font-black">
                            <span className="text-primary">{'⭐'.repeat(challenge.difficulty)}</span>
                            <span className="text-gray-600">{'⭐'.repeat(3 - challenge.difficulty)}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">ENTRY FEE</p>
                          <p className="text-lg font-black text-accent">{challenge.entryFee} SOL</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">DURATION</p>
                          <p className="text-lg font-black text-green-400">{challenge.duration}s</p>
                        </div>
                      </div>

                      {/* Reward and Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">TOP REWARD</p>
                          <p className="text-lg font-black text-yellow-400">{challenge.reward}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            enter(challenge.id);
                          }}
                          disabled={entering}
                          className="btn btn-accent font-bold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {entering ? 'Joining...' : 'Join Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Stats */}
              <div className="card group hover:border-primary/50 transition-all">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Your Status</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Wallet</p>
                    <p className="text-sm font-mono text-primary">{address?.slice(0, 8)}...{address?.slice(-6)}</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-gray-400 text-xs mb-1">Challenges Entered</p>
                    <p className="text-2xl font-black text-accent">8</p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="card glow-border">
                <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                  <span>📖</span> How It Works
                </h2>

                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Choose', desc: 'Pick a challenge' },
                    { step: '2', title: 'Enter', desc: 'Pay entry fee' },
                    { step: '3', title: 'Compete', desc: 'Beat the timer' },
                    { step: '4', title: 'Win', desc: 'Earn rewards' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 font-bold">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="card max-w-md w-full border-accent/50 glow-border">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{challenges[selectedChallenge]?.icon}</span>
                <div>
                  <h3 className="text-2xl font-black">
                    {challenges[selectedChallenge]?.title}
                  </h3>
                  <p className="text-sm text-gray-400">Challenge</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <p className="text-gray-300">
                {challenges[selectedChallenge]?.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Time Limit', value: `${challenges[selectedChallenge]?.duration}s`, color: 'text-green-400' },
                  { label: 'Entry Fee', value: `${challenges[selectedChallenge]?.entryFee} SOL`, color: 'text-accent' },
                  { label: 'Difficulty', value: `${'⭐'.repeat(challenges[selectedChallenge]?.difficulty || 1)}`, color: 'text-primary' },
                  { label: 'Prize', value: challenges[selectedChallenge]?.reward || '0 Rep', color: 'text-yellow-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-dark/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-bold mb-1">{stat.label.toUpperCase()}</p>
                    <p className={`font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                enter(selectedChallenge);
                setSelectedChallenge(null);
              }}
              disabled={entering}
              className="btn btn-accent w-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {entering ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Processing...
                </span>
              ) : (
                '🎮 Join Challenge'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
