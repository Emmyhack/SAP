import { useState } from 'react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [sortBy, setSortBy] = useState<'reputation' | 'wins' | 'participation'>('reputation');

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-border">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-3">
            Global Leaderboard
          </h1>
          <p className="text-lg text-gray-600">
            Track competitive rankings and see where you stand against the best players
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 border border-border rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm font-bold text-dark mb-4 uppercase tracking-wide">Select Timeframe</label>
              <div className="flex flex-wrap gap-3">
                {(['all-time', 'monthly', 'weekly'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize ${
                      timeframe === tf
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-gray-700 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {tf.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-4 uppercase tracking-wide">Sort Rankings By</label>
              <div className="flex flex-wrap gap-3">
                {(['reputation', 'wins', 'participation'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize ${
                      sortBy === sort
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-gray-700 hover:border-primary hover:text-primary'
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
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-16 text-center mb-16">
          <h2 className="text-4xl font-black text-dark mb-6">Leaderboard Coming Soon</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Rankings will populate as players mint passports and complete challenges. Your position will update in real-time based on wins, reputation points, and participation.
          </p>
        </div>

        {/* Ranking Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-dark mb-6">Ranking Factors</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-dark text-sm mb-1">Reputation Points</p>
                <p className="text-gray-600 text-sm">Earned by winning challenges and defeating quality opponents</p>
              </div>
              <div className="h-px bg-border"></div>
              <div>
                <p className="font-bold text-dark text-sm mb-1">Total Victories</p>
                <p className="text-gray-600 text-sm">Number of challenges won and successfully completed</p>
              </div>
              <div className="h-px bg-border"></div>
              <div>
                <p className="font-bold text-dark text-sm mb-1">Win-Loss Ratio</p>
                <p className="text-gray-600 text-sm">Your success rate across all competitions</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-dark mb-6">How to Climb Rankings</h3>
            <div className="space-y-3">
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <p className="font-bold text-dark">Mint Your Passport</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p className="font-bold text-dark">Enter Challenges</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p className="font-bold text-dark">Win & Earn Reputation</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <p className="font-bold text-dark">Reach Top Positions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/30 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-black text-dark mb-4">Fair & Transparent Rankings</h3>
          <p className="text-gray-700 mb-6">
            All rankings are calculated automatically from on-chain data. Every win, every reputation point, and every statistic is verifiable directly from the blockchain.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="font-semibold text-gray-700">Live • Immutable • Verifiable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
