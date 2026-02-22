import { useState } from 'react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [sortBy, setSortBy] = useState<'reputation' | 'wins' | 'participation'>('reputation');

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Global Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Track competitive rankings and see where you stand in the Somnia Arena
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-400 font-bold mb-4 uppercase">Timeframe</label>
              <div className="flex flex-wrap gap-2">
                {(['all-time', 'monthly', 'weekly'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize ${
                      timeframe === tf
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                        : 'bg-secondary border-2 border-border text-gray-300 hover:border-primary/50'
                    }`}
                  >
                    {tf.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 font-bold mb-4 uppercase">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {(['reputation', 'wins', 'participation'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize ${
                      sortBy === sort
                        ? 'bg-gradient-to-r from-accent to-primary text-dark shadow-lg shadow-accent/50'
                        : 'bg-secondary border-2 border-border text-gray-300 hover:border-accent/50'
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-12">
          <h2 className="text-3xl font-black text-white mb-4">Leaderboard Coming Soon</h2>
          <p className="text-gray-400 max-w-2xl mb-8">
            The competitive leaderboard will populate as players mint passports and enter challenges. Rankings are calculated in real-time based on:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white mb-2">Reputation Points</h3>
              <p className="text-gray-400 text-sm">Earned by winning challenges and defeating competitors</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Total Victories</h3>
              <p className="text-gray-400 text-sm">Number of challenges won and completed</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Participation Count</h3>
              <p className="text-gray-400 text-sm">Total number of challenges entered</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Win-Loss Ratio</h3>
              <p className="text-gray-400 text-sm">Your success rate across all competitions</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="text-xl font-black text-white mb-6">How Rankings Work</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  1
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Mint Your Passport</p>
                  <p className="text-gray-400 text-sm">Create your permanent gaming identity</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  2
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Enter Challenges</p>
                  <p className="text-gray-400 text-sm">Participate in available competitions</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  3
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Win & Earn</p>
                  <p className="text-gray-400 text-sm">Gain reputation points and climbing rankings</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  4
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Reach Top 100</p>
                  <p className="text-gray-400 text-sm">Compete for prizes and exclusive badges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
