import { useState } from 'react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [sortBy, setSortBy] = useState<'reputation' | 'wins' | 'participation'>('reputation');

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-dark via-dark to-dark/95">
      <div className="container-custom">
        {/* Header - Enhanced */}
        <div className="mb-16 pb-8 border-b border-border/30">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-accent/70 mb-3 tracking-widest uppercase">Competitive Rankings</p>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                Global Leaderboard
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Track competitive rankings and discover where you stand in the Somnia Arena global community
          </p>
        </div>

        {/* Filters - Enhanced */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/30 rounded-2xl p-8 md:p-12 mb-16 backdrop-blur-md shadow-lg shadow-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-xs text-gray-300 font-bold mb-4 uppercase tracking-widest">Select Timeframe</label>
              <div className="flex flex-wrap gap-3">
                {(['all-time', 'monthly', 'weekly'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all capitalize ${
                      timeframe === tf
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50 border border-primary/50'
                        : 'bg-dark/50 border border-border/50 text-gray-300 hover:border-primary/50 hover:text-white'
                    }`}
                  >
                    {tf.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-bold mb-4 uppercase tracking-widest">Sort Rankings By</label>
              <div className="flex flex-wrap gap-3">
                {(['reputation', 'wins', 'participation'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all capitalize ${
                      sortBy === sort
                        ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg shadow-accent/50 border border-accent/50'
                        : 'bg-dark/50 border border-border/50 text-gray-300 hover:border-accent/50 hover:text-white'
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State - Enhanced */}
        <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/30 rounded-2xl p-12 md:p-16 backdrop-blur-md shadow-lg shadow-cyan-500/5 mb-16">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
              <span className="text-cyan-400 font-black text-xl">🏆</span>
            </div>
            <div>
              <p className="text-cyan-400/70 text-xs font-bold tracking-widest uppercase mb-2">Live Rankings</p>
              <h2 className="text-4xl md:text-5xl font-black text-white">Leaderboard Coming Soon</h2>
            </div>
          </div>
          
          <p className="text-gray-300 text-base mb-10 leading-relaxed max-w-3xl">
            The competitive leaderboard will automatically populate as players mint passports and participate in challenges. Rankings are calculated in real-time using our advanced reputation algorithm based on:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-cyan-400/70 text-xs font-bold mb-3 tracking-widest uppercase">Ranking Metrics</p>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-white text-sm mb-1">Reputation Points</p>
                  <p className="text-gray-400 text-xs">Earned by winning challenges and defeating quality opponents</p>
                </div>
                <div className="h-px bg-border/30"></div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">Total Victories</p>
                  <p className="text-gray-400 text-xs">Number of challenges won and successfully completed</p>
                </div>
                <div className="h-px bg-border/30"></div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">Win-Loss Ratio</p>
                  <p className="text-gray-400 text-xs">Your success rate calculated across all competitions</p>
                </div>
              </div>
            </div>

            <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-cyan-400/70 text-xs font-bold mb-3 tracking-widest uppercase">Additional Factors</p>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-white text-sm mb-1">Participation Count</p>
                  <p className="text-gray-400 text-xs">Total number of challenges you've actively participated in</p>
                </div>
                <div className="h-px bg-border/30"></div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">Streak Bonus</p>
                  <p className="text-gray-400 text-xs">Consecutive victories unlock exclusive streak bonuses</p>
                </div>
                <div className="h-px bg-border/30"></div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">Consistency</p>
                  <p className="text-gray-400 text-xs">Regular participation over time increases your standing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="pt-10 border-t border-border/30">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10">How Rankings Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative">
                <div className="absolute -top-8 left-5 w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-primary/30">
                  1
                </div>
                <div className="bg-dark/40 border border-primary/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                  <p className="font-bold text-white mb-2 text-sm">Mint Your Passport</p>
                  <p className="text-gray-400 text-xs leading-relaxed">Create your soulbound NFT gaming identity on the blockchain</p>
                </div>
              </div>
              <div className="hidden md:relative md:block">
                <div className="absolute -top-8 left-5 w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-primary/30">
                  2
                </div>
                <div className="bg-dark/40 border border-primary/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                  <p className="font-bold text-white mb-2 text-sm">Enter Challenges</p>
                  <p className="text-gray-400 text-xs leading-relaxed">Participate in available competitions with real stakes</p>
                </div>
              </div>
              <div className="hidden lg:relative lg:block">
                <div className="absolute -top-8 left-5 w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-primary/30">
                  3
                </div>
                <div className="bg-dark/40 border border-primary/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                  <p className="font-bold text-white mb-2 text-sm">Win & Earn</p>
                  <p className="text-gray-400 text-xs leading-relaxed">Gain reputation and climb the global rankings</p>
                </div>
              </div>
              <div className="hidden lg:relative lg:block">
                <div className="absolute -top-8 left-5 w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-primary/30">
                  4
                </div>
                <div className="bg-dark/40 border border-primary/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                  <p className="font-bold text-white mb-2 text-sm">Reach Top Positions</p>
                  <p className="text-gray-400 text-xs leading-relaxed">Compete for prizes, badges, and exclusive rewards</p>
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden mt-6 space-y-4">
              <div className="relative pl-12">
                <div className="absolute -left-2 top-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-primary/30">
                  2
                </div>
                <p className="font-bold text-white text-sm">Enter Challenges</p>
                <p className="text-gray-400 text-xs">Participate in available competitions with real stakes</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute -left-2 top-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-primary/30">
                  3
                </div>
                <p className="font-bold text-white text-sm">Win & Earn</p>
                <p className="text-gray-400 text-xs">Gain reputation and climb the global rankings</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute -left-2 top-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-primary/30">
                  4
                </div>
                <p className="font-bold text-white text-sm">Reach Top Positions</p>
                <p className="text-gray-400 text-xs">Compete for prizes, badges, and exclusive rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
