import { useState } from 'react';
import StatCard from '../components/StatCard';

const leaderboardData = [
  { rank: 1, address: '0x1234...5678', reputation: 45230, wins: 156, participation: 320, badge: '👑' },
  { rank: 2, address: '0x2345...6789', reputation: 42180, wins: 148, participation: 310, badge: '🥈' },
  { rank: 3, address: '0x3456...7890', reputation: 39920, wins: 142, participation: 298, badge: '🥉' },
  { rank: 4, address: '0x4567...8901', reputation: 37650, wins: 135, participation: 285, badge: '⭐' },
  { rank: 5, address: '0x5678...9012', reputation: 35480, wins: 128, participation: 271, badge: '⭐' },
  { rank: 6, address: '0x6789...0123', reputation: 33220, wins: 120, participation: 258, badge: '' },
  { rank: 7, address: '0x7890...1234', reputation: 31050, wins: 112, participation: 245, badge: '' },
  { rank: 8, address: '0x8901...2345', reputation: 28790, wins: 104, participation: 232, badge: '' },
  { rank: 9, address: '0x9012...3456', reputation: 26520, wins: 96, participation: 219, badge: '' },
  { rank: 10, address: '0x0123...4567', reputation: 24350, wins: 88, participation: 206, badge: '' },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [sortBy, setSortBy] = useState<'reputation' | 'wins' | 'participation'>('reputation');

  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'reputation') return b.reputation - a.reputation;
    if (sortBy === 'wins') return b.wins - a.wins;
    return b.participation - a.participation;
  });

  const topThree = sortedLeaderboard.slice(0, 3);
  const restOfLeaderboard = sortedLeaderboard.slice(3);

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 border-b border-primary/30 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-2">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">🏆 Global Rankings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Leaderboard</h1>
          <p className="text-gray-400 text-lg">See where you stand in the competitive landscape</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-black mb-6">Global Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Total Competitors"
              value="2,847"
              icon="👥"
              color="primary"
            />
            <StatCard
              label="Challenges Completed"
              value="145,923"
              icon="✅"
              color="accent"
            />
            <StatCard
              label="Total Prize Pool"
              value="125K ETH"
              icon="💰"
              color="green"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm text-gray-400 font-bold mb-2">TIMEFRAME</label>
            <div className="flex gap-2">
              {(['all-time', 'monthly', 'weekly'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                    timeframe === tf
                      ? 'bg-primary text-white shadow-lg shadow-primary/50'
                      : 'bg-secondary border border-border text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {tf.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 font-bold mb-2">SORT BY</label>
            <div className="flex gap-2">
              {(['reputation', 'wins', 'participation'] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                    sortBy === sort
                      ? 'bg-accent text-dark shadow-lg shadow-accent/50'
                      : 'bg-secondary border border-border text-gray-300 hover:border-accent/50'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-6">Top Champions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((player, idx) => {
              const medals = { 0: '🥇', 1: '🥈', 2: '🥉' };
              return (
                <div
                  key={player.rank}
                  className="card group hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:scale-105"
                >
                  <div className="text-6xl mb-4 flex justify-between items-start">
                    <span>{medals[idx as keyof typeof medals]}</span>
                    <span className="text-4xl">{player.badge}</span>
                  </div>
                  <p className="text-xl font-bold mb-1"># {player.rank}</p>
                  <p className="text-sm text-gray-400 mb-4 font-mono">{player.address}</p>
                  <div className="space-y-2 border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-gray-500 font-bold">REPUTATION</p>
                      <p className="text-2xl font-black text-primary">{player.reputation.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500 font-bold">WINS</p>
                        <p className="font-bold text-green-400">{player.wins}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">PARTICIPATIONS</p>
                        <p className="font-bold text-blue-400">{player.participation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard  */}
        <div>
          <h2 className="text-2xl font-black mb-6">Full Rankings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="text-left px-4 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Player</th>
                  <th className="text-right px-4 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Reputation</th>
                  <th className="text-right px-4 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Wins</th>
                  <th className="text-right px-4 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Participations</th>
                </tr>
              </thead>
              <tbody>
                {restOfLeaderboard.map((player, idx) => (
                  <tr
                    key={player.rank}
                    className="border-b border-border/50 hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <span className="text-lg font-black text-primary">#{player.rank}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{player.badge || '⚪'}</span>
                        <span className="font-mono text-sm text-gray-300 group-hover:text-white">{player.address}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-black text-primary text-lg">{player.reputation.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-bold text-green-400">{player.wins}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-bold text-blue-400">{player.participation}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
