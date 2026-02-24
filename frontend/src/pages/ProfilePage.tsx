import { useAccount } from 'wagmi';
import StatCard from '../components/StatCard';
import { useHasPassport, usePassportData } from '../hooks/useWeb3';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { passportData, isLoading: dataLoading } = usePassportData();

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Wallet Address</p>
              <h1 className="text-4xl md:text-5xl font-black text-dark font-mono mb-4">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <p className="text-sm font-medium">Somnia Testnet • Chain 50312</p>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center border border-primary/30">
                <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-dark mb-8">Your Statistics</h2>
          {dataLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card-lg animate-pulse">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 w-24 bg-gray-200 rounded mb-3"></div>
                  <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : passportData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Reputation Score" value={`${passportData[0] || 0}`} color="primary" />
              <StatCard label="Arena Points" value={`${passportData[1] || 0}`} color="secondary" />
              <StatCard label="Total Victories" value={`${passportData[2] || 0}`} color="primary" />
              <StatCard label="Challenges Entered" value={`${passportData[3] || 0}`} color="secondary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Reputation Score" value="0" color="primary" />
              <StatCard label="Arena Points" value="0" color="secondary" />
              <StatCard label="Total Victories" value="0" color="primary" />
              <StatCard label="Challenges Entered" value="0" color="secondary" />
            </div>
          )}
        </div>

        {/* Passport Badge Section */}
        {passportLoading ? (
          <div className="mb-16 bg-gray-100 border border-border rounded-2xl p-12 animate-pulse">
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        ) : hasPassport ? (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-40"></div>
                  <div className="relative w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <span className="text-7xl animate-float">🎖️</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-dark mb-4">Your Passport</h2>
                <p className="text-gray-700 mb-6">
                  Your Somnia Arena Passport is your soulbound NFT identity. It's a permanent, non-transferable record of your competitive achievements and reputation on the blockchain.
                </p>
                <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg border border-green-300 w-fit">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="font-bold text-green-700">Active & Verified</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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

              <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <p className="text-sm font-bold text-primary mb-0 uppercase tracking-wide">Network Details</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <p className="text-gray-700 font-medium">Network</p>
                    <p className="font-bold text-dark">Somnia</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <p className="text-gray-700 font-medium">Chain ID</p>
                    <p className="font-bold text-dark">50312</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <p className="text-sm font-bold text-primary mb-0 uppercase tracking-wide">Passport Status</p>
                </div>
                <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <p className="font-bold text-primary">Active & Verified</p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Your soulbound NFT is live on the blockchain. Your identity is permanent and non-transferable.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div>
            <h2 className="text-2xl font-black text-dark mb-8">Quick Info</h2>
            <div className="space-y-5">
              <div className="bg-primary/5 border border-primary/30 rounded-xl p-6">
                <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">Member Since</p>
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
        <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 animate-fade-in">
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
