import { useAccount } from 'wagmi';
import StatCard from '../components/StatCard';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Connect Wallet</h1>
          <p className="text-gray-400">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  const userStats = {
    reputation: 5420,
    arenaPoints: 8230,
    wins: 42,
    participation: 98,
    joinDate: 'Jan 15, 2026',
    level: 'Elite',
    nextLevel: 'Legendary',
    progressToNext: 65,
  };

  const achievements = [
    { icon: '🥇', title: 'First Win', desc: 'Won your first challenge' },
    { icon: '🏆', title: '10 Wins', desc: 'Achieved 10 victories' },
    { icon: '🎖️', title: 'Consistent', desc: 'Participated in 50 challenges' },
    { icon: '👑', title: 'Master', desc: 'Won a Master difficulty challenge' },
    { icon: '⚡', title: 'Speed Runner', desc: 'Won 5 Speed challenges' },
    { icon: '📈', title: 'Reputation Climber', desc: 'Reached 5000 reputation' },
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'Won Challenge #234', reward: '+450 Rep' },
    { time: '5 hours ago', action: 'Entered Speed Challenge', fee: '-0.01 ETH' },
    { time: '1 day ago', action: 'Won Challenge #221', reward: '+320 Rep' },
    { time: '2 days ago', action: 'Minted Passport NFT', fee: '-0.05 ETH' },
  ];

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/30 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div>
              <p className="text-accent font-bold text-sm tracking-widest uppercase">Your Profile</p>
              <h1 className="text-3xl font-black">{address?.slice(0, 6)}...{address?.slice(-4)}</h1>
              <p className="text-gray-400">Joined {userStats.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Level Progress */}
        <div className="mb-12 card border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black">{userStats.level}</h2>
              <span className="text-sm text-gray-400 font-bold">NEXT: {userStats.nextLevel}</span>
            </div>
            <div className="w-full bg-dark rounded-full h-3 overflow-hidden border border-border">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${userStats.progressToNext}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{userStats.progressToNext}% progress to {userStats.nextLevel}</p>
          </div>
        </div>

        {/* Main Stats  */}
        <section>
          <h2 className="text-2xl font-black mb-6">Your Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard
              label="Reputation"
              value={userStats.reputation}
              change="+420 this month"
              icon="📈"
              color="primary"
            />
            <StatCard
              label="Arena Points"
              value={userStats.arenaPoints}
              change="+8.2K total"
              icon="⭐"
              color="accent"
            />
            <StatCard
              label="Victories"
              value={userStats.wins}
              change="+5 this week"
              icon="🏆"
              color="green"
            />
            <StatCard
              label="Participation"
              value={userStats.participation}
              change="+12 this month"
              icon="⚡"
              color="blue"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="card group hover:border-primary/70 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white mb-1">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      {('reward' in activity) ? (
                        <span className="font-bold text-green-400">{activity.reward}</span>
                      ) : (
                        <span className="font-bold text-primary">{activity.fee}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-black mb-6">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="card group hover:border-accent/70 hover:shadow-lg hover:shadow-accent/20 transition-all text-center"
                >
                  <p className="text-4xl mb-2 group-hover:scale-125 transition-transform">{achievement.icon}</p>
                  <p className="text-xs font-bold text-white mb-1">{achievement.title}</p>
                  <p className="text-xs text-gray-400">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Details */}
        <section className="mt-12">
          <h2 className="text-2xl font-black mb-6">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <p className="text-sm text-gray-400 font-bold mb-2">WALLET ADDRESS</p>
              <p className="font-mono text-sm text-primary font-semibold break-all">{address}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-400 font-bold mb-2">NETWORK</p>
              <p className="font-semibold">Somnia Testnet (Chain 50312)</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-400 font-bold mb-2">MEMBER SINCE</p>
              <p className="font-semibold">{userStats.joinDate}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-400 font-bold mb-2">PASSPORT STATUS</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="font-semibold text-green-400">Active & Verified</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
