import { useAccount } from 'wagmi';
import StatCard from '../components/StatCard';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Connect Wallet
          </h1>
          <p className="text-gray-400 text-lg">
            Please connect your wallet to view and manage your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-dark via-dark to-dark/95">
      <div className="container-custom">
        {/* Profile Header - Enhanced */}
        <div className="mb-16 pb-8 border-b border-border/30">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-6">
            <div>
              <p className="text-xs font-bold text-accent/70 mb-3 tracking-widest uppercase">Account Profile</p>
              <h1 className="text-5xl md:text-6xl font-black text-white font-mono mb-4">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-gray-400 text-sm">Somnia Testnet • Chain 50312</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Statistics Grid - Enhanced */}
        <div className="mb-16">
          <p className="text-xs font-bold text-gray-300 mb-8 uppercase tracking-widest">Performance Metrics</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              label="Reputation Score"
              value="0"
              color="primary"
            />
            <StatCard
              label="Arena Points"
              value="0"
              color="accent"
            />
            <StatCard
              label="Total Victories"
              value="0"
              color="green"
            />
            <StatCard
              label="Challenges Entered"
              value="0"
              color="blue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Account Details - Enhanced */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-gray-300 mb-8 uppercase tracking-widest">Account Information</p>
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg shadow-primary/5">
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wide">Wallet Address</p>
                <p className="font-mono text-sm text-accent break-all font-semibold bg-dark/40 rounded-lg p-4 border border-border/30">{address}</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg shadow-cyan-500/5">
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wide">Network Details</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Network Name</p>
                    <p className="text-white font-bold">Somnia</p>
                  </div>
                  <div className="h-px bg-border/30"></div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Chain ID</p>
                    <p className="text-white font-bold">50312</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg shadow-green-500/5">
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wide">Passport Status</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-green-400 font-bold text-sm">Active & Verified</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Your soulbound NFT is fully verified and active on the Somnia blockchain. Your identity is permanent and non-transferable.</p>
              </div>
            </div>
          </div>

          {/* Profile Quick Stats - Enhanced */}
          <div>
            <p className="text-xs font-bold text-gray-300 mb-8 uppercase tracking-widest">Quick Stats</p>
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-md shadow-lg shadow-cyan-500/5">
                <p className="text-xs text-cyan-400/70 font-bold mb-3 uppercase tracking-wide">Member Since</p>
                <p className="text-white font-bold text-lg mb-1">Recent</p>
                <p className="text-gray-400 text-xs">Profile created on Somnia</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-md shadow-lg shadow-purple-500/5">
                <p className="text-xs text-purple-400/70 font-bold mb-3 uppercase tracking-wide">Win Rate</p>
                <p className="text-white font-bold text-lg mb-1">—</p>
                <p className="text-gray-400 text-xs">No completed challenges yet</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-md shadow-lg shadow-orange-500/5">
                <p className="text-xs text-orange-400/70 font-bold mb-3 uppercase tracking-wide">Total Earnings</p>
                <p className="text-accent font-bold text-lg mb-1">0 ETH</p>
                <p className="text-gray-400 text-xs">From challenge rewards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started - Enhanced */}
        <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-lg shadow-cyan-500/5">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
              <span className="text-cyan-400 font-black text-lg">→</span>
            </div>
            <div>
              <p className="text-cyan-400/70 text-xs font-bold tracking-widest uppercase mb-2">Next Steps</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Getting Started</h2>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-10 leading-relaxed max-w-3xl">
            You're now part of the Somnia Arena community. Follow these steps to start competing, earning reputation, and building your gaming legacy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <div className="absolute -top-8 left-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-cyan-500/30">
                1
              </div>
              <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                <p className="font-bold text-white mb-2 text-sm">Explore Challenges</p>
                <p className="text-gray-400 text-xs leading-relaxed">Browse the growing marketplace of competitions with different difficulty levels and rewards</p>
              </div>
            </div>
            <div className="hidden md:relative md:block">
              <div className="absolute -top-8 left-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-cyan-500/30">
                2
              </div>
              <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                <p className="font-bold text-white mb-2 text-sm">Enter Challenges</p>
                <p className="text-gray-400 text-xs leading-relaxed">Pay the entry fee and formally commit to a competition to gain reputation points</p>
              </div>
            </div>
            <div className="hidden lg:relative lg:block">
              <div className="absolute -top-8 left-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-cyan-500/30">
                3
              </div>
              <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                <p className="font-bold text-white mb-2 text-sm">Compete & Win</p>
                <p className="text-gray-400 text-xs leading-relaxed">Participate in challenges and earn reputation, arena points, and ETH rewards</p>
              </div>
            </div>
            <div className="hidden lg:relative lg:block">
              <div className="absolute -top-8 left-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 font-black text-white border border-cyan-500/30">
                4
              </div>
              <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm pt-10">
                <p className="font-bold text-white mb-2 text-sm">Grow Your Reputation</p>
                <p className="text-gray-400 text-xs leading-relaxed">Build your skill rating and climb the global leaderboard for exclusive rewards</p>
              </div>
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="md:hidden mt-6 space-y-4">
            <div className="relative pl-12">
              <div className="absolute -left-2 top-1 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-cyan-500/30">
                2
              </div>
              <p className="font-bold text-white text-sm">Enter Challenges</p>
              <p className="text-gray-400 text-xs">Pay the entry fee and formally commit to a competition</p>
            </div>
            <div className="relative pl-12">
              <div className="absolute -left-2 top-1 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-cyan-500/30">
                3
              </div>
              <p className="font-bold text-white text-sm">Compete & Win</p>
              <p className="text-gray-400 text-xs">Earn reputation, arena points, and ETH rewards</p>
            </div>
            <div className="relative pl-12">
              <div className="absolute -left-2 top-1 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 text-xs font-black text-white border border-cyan-500/30">
                4
              </div>
              <p className="font-bold text-white text-sm">Grow Your Reputation</p>
              <p className="text-gray-400 text-xs">Build your skill rating and climb the leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
