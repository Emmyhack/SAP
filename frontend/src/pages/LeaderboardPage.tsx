import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { contracts } from '../config/contracts';

interface UserStat {
  address: string;
  reputation: number;
  wins: number;
  losses: number;
  participation: number;
  totalEarnings: number;
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [sortBy, setSortBy] = useState<'reputation' | 'wins' | 'participation'>('reputation');
  const [users, setUsers] = useState<UserStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user statistics from smart contracts
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Placeholder: In production, this would call an API or indexing service
        // to fetch all user statistics from the ReputationCore contract
        // For now, we'll fetch mock data that demonstrates the structure
        const mockUsers: UserStat[] = [
          {
            address: '0x1234...5678',
            reputation: 1250,
            wins: 24,
            losses: 3,
            participation: 27,
            totalEarnings: 15.5,
          },
          {
            address: '0x8765...4321',
            reputation: 1180,
            wins: 22,
            losses: 4,
            participation: 26,
            totalEarnings: 14.2,
          },
          {
            address: '0xabcd...efgh',
            reputation: 1050,
            wins: 19,
            losses: 5,
            participation: 24,
            totalEarnings: 12.8,
          },
          {
            address: '0xijkl...mnop',
            reputation: 920,
            wins: 17,
            losses: 6,
            participation: 23,
            totalEarnings: 11.5,
          },
          {
            address: '0xqrst...uvwx',
            reputation: 850,
            wins: 15,
            losses: 7,
            participation: 22,
            totalEarnings: 10.2,
          },
        ];

        setUsers(mockUsers);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch leaderboard data';
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, [timeframe]);

  // Sort users based on selected criteria
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'reputation') return b.reputation - a.reputation;
    if (sortBy === 'wins') return b.wins - a.wins;
    return b.participation - a.participation;
  });

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
  };

  const getTierColor = (reputation: number) => {
    if (reputation >= 1000) return 'bg-yellow-100 text-yellow-900';
    if (reputation >= 750) return 'bg-blue-100 text-blue-900';
    if (reputation >= 500) return 'bg-purple-100 text-purple-900';
    return 'bg-gray-100 text-gray-900';
  };

  const getTierName = (reputation: number) => {
    if (reputation >= 1000) return 'Legendary';
    if (reputation >= 750) return 'Elite';
    if (reputation >= 500) return 'Veteran';
    return 'Novice';
  };

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
                        : 'bg-white border border-border text-dark hover:border-primary hover:text-primary'
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
                        : 'bg-white border border-border text-dark hover:border-primary hover:text-primary'
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        {isLoading ? (
          <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-16 text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-6 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-dark">Loading leaderboard...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-16 text-center mb-16">
            <p className="text-lg font-semibold text-red-900">{error}</p>
          </div>
        ) : sortedUsers.length === 0 ? (
          <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-16 text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-black text-dark mb-6">No Rankings Yet</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
              Rankings will populate as players mint passports and complete challenges. Your position will update in real-time based on wins, reputation points, and participation.
            </p>
          </div>
        ) : (
          <div className="mb-16 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-t border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-bold text-dark">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-dark">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-dark">Tier</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-dark">Reputation</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-dark">Wins</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-dark">W/L Ratio</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-dark">Participation</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-dark">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user, index) => {
                    const badge = getRankBadge(index);
                    const wlRatio = user.losses > 0 ? (user.wins / (user.wins + user.losses)).toFixed(2) : '1.00';
                    const tierColor = getTierColor(user.reputation);
                    const tierName = getTierName(user.reputation);

                    return (
                      <tr
                        key={user.address}
                        className="border-b border-border hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-left font-bold text-dark">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{badge}</span>
                            <span className="text-lg">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-primary font-bold text-sm">
                                {user.address.substring(2, 4).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-dark text-sm">{user.address}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${tierColor}`}
                          >
                            {tierName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-primary text-lg">{user.reputation}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-dark">{user.wins}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-dark">{wlRatio}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-dark">{user.participation}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-bold text-primary">Ⓢ {user.totalEarnings}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ranking Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 className="text-xl font-bold text-dark mb-0">Ranking Factors</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-dark text-sm mb-1">Reputation Points</p>
                <p className="text-gray-600 text-sm">Earned by winning challenges and defeating quality opponents</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-dark text-sm mb-1">Total Victories</p>
                <p className="text-gray-600 text-sm">Number of challenges won and successfully completed</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-dark text-sm mb-1">Win-Loss Ratio</p>
                <p className="text-gray-600 text-sm">Your success rate across all competitions</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-bold text-dark mb-0">How to Climb Rankings</h3>
            </div>
            <div className="space-y-3">
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <p className="font-bold text-dark text-sm mb-0">Mint Your Passport</p>
              </div>
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p className="font-bold text-dark text-sm mb-0">Enter Challenges</p>
              </div>
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p className="font-bold text-dark text-sm mb-0">Win & Earn Reputation</p>
              </div>
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <p className="font-bold text-dark text-sm mb-0">Reach Top Positions</p>
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
