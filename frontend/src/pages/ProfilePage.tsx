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
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <p className="text-gray-400 text-sm font-bold mb-2 uppercase">Your Profile</p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </h1>
              <p className="text-gray-400">
                Somnia Testnet • Chain 50312
              </p>
            </div>
          </div>

          {/* Main Stats */}
          <div className="mb-12">
            <p className="text-gray-400 text-sm font-bold mb-6 uppercase">Statistics</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Account Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-white mb-6">Account Information</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Wallet Address</p>
                <p className="font-mono text-sm text-accent break-all font-semibold">{address}</p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Network</p>
                <p className="text-white font-bold">Somnia Testnet</p>
                <p className="text-gray-400 text-sm">Chain ID: 50312</p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Passport Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <p className="text-white font-bold">Active & Verified</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">Your soulbound NFT is active on the blockchain</p>
              </div>
            </div>
          </div>

          {/* Profile Sections */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Quick Stats</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Member Since</p>
                <p className="text-white font-bold text-lg">Recent</p>
                <p className="text-gray-400 text-sm">Profile created</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Win Rate</p>
                <p className="text-white font-bold text-lg">—</p>
                <p className="text-gray-400 text-sm">No completed challenges yet</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-6">
                <p className="text-sm text-gray-400 font-bold mb-3 uppercase">Total Earnings</p>
                <p className="text-accent font-bold text-lg">0 ETH</p>
                <p className="text-gray-400 text-sm">From challenge rewards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Info */}
        <div className="mt-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-black text-white mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                1
              </div>
              <div>
                <p className="font-bold text-white mb-1">Enter Challenges</p>
                <p className="text-gray-400 text-sm">Browse available competitions and pay entry fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                2
              </div>
              <div>
                <p className="font-bold text-white mb-1">Compete & Win</p>
                <p className="text-gray-400 text-sm">Participate in challenges and earn reputation points</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                3
              </div>
              <div>
                <p className="font-bold text-white mb-1">Climb Rankings</p>
                <p className="text-gray-400 text-sm">Build your reputation and reach the global leaderboard</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                4
              </div>
              <div>
                <p className="font-bold text-white mb-1">Earn Rewards</p>
                <p className="text-gray-400 text-sm">Win ETH and exclusive badges from competitions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
