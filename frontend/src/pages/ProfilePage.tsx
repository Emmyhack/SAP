import { useAccount } from 'wagmi';
import StatCard from '../components/StatCard';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-lg text-gray-600">
            Connect to view your profile, statistics, and competitive history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="mb-16 pb-12 border-b border-border">
          <div className="flex items-end gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-xl"></div>
            <div>
              <p className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Wallet Address</p>
              <h1 className="text-4xl md:text-5xl font-black text-dark font-mono mb-3">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Somnia Testnet • Chain 50312</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-dark mb-8">Your Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Reputation Score" value="0" color="primary" />
            <StatCard label="Arena Points" value="0" color="secondary" />
            <StatCard label="Total Victories" value="0" color="primary" />
            <StatCard label="Challenges Entered" value="0" color="secondary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Account Information */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-dark mb-8">Account Details</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 border border-border rounded-xl p-8">
                <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">Connected Wallet</p>
                <div className="bg-white rounded-lg p-4 border border-border break-all font-mono text-sm text-gray-700">
                  {address}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <p className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">Network Details</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Network</p>
                    <p className="font-bold text-dark">Somnia</p>
                  </div>
                  <div className="h-px bg-border"></div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Chain ID</p>
                    <p className="font-bold text-dark">50312</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                <p className="text-sm font-bold text-green-600 mb-4 uppercase tracking-wide">Passport Status</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="font-bold text-green-700">Active & Verified</p>
                </div>
                <p className="text-gray-700 text-sm">
                  Your soulbound NFT is live on the blockchain. Your identity is permanent and non-transferable.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div>
            <h2 className="text-2xl font-black text-dark mb-8">Quick Info</h2>
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wide">Member Since</p>
                <p className="text-lg font-bold text-dark">Recent</p>
                <p className="text-sm text-gray-600">Profile created</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <p className="text-xs font-bold text-purple-600 mb-3 uppercase tracking-wide">Win Rate</p>
                <p className="text-lg font-bold text-dark">—</p>
                <p className="text-sm text-gray-600">No completed challenges</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <p className="text-xs font-bold text-orange-600 mb-3 uppercase tracking-wide">Total Earnings</p>
                <p className="text-lg font-bold text-dark">0 ETH</p>
                <p className="text-sm text-gray-600">From competitions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-12">
          <h2 className="text-3xl font-black text-dark mb-10">Your Next Steps</h2>
          
          <p className="text-gray-700 mb-10 text-lg">
            You're all set! Here's how to start building your reputation and earning rewards:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Browse Challenges', desc: 'Explore available competitions' },
              { step: 2, title: 'Enter Challenge', desc: 'Pay entry fee and compete' },
              { step: 3, title: 'Compete & Win', desc: 'Earn reputation and rewards' },
              { step: 4, title: 'Build Legacy', desc: 'Climb the global leaderboard' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="bg-white border border-border rounded-lg p-6 pt-12">
                  <h4 className="font-bold text-dark text-sm mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
