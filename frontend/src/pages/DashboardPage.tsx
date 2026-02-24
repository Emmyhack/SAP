import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useHasPassport, useMintPassport, usePassportData } from '../hooks/useWeb3';
import Button from '../components/Button';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { mint, isLoading: minting, error: mintError } = useMintPassport();
  const { passportData, isLoading: dataLoading } = usePassportData();
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintSuccess, setMintSuccess] = useState<string | null>(null);

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
          <p className="text-xl text-gray-600 mb-8">
            Connect to access your dashboard, manage your passport, and view your competitive statistics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-border animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome {address?.slice(0, 6)}...{address?.slice(-4)} • Manage your profile and track your progress
          </p>
        </div>

        {/* Passport Section */}
        {passportLoading ? (
          <div className="bg-gray-100 border border-border rounded-2xl p-12 mb-16 animate-pulse">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
        ) : !hasPassport ? (
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/30 rounded-3xl p-12 md:p-16 mb-16 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">
                  Set Up Your Passport
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl text-lg leading-relaxed">
                  Your soulbound NFT gaming identity. This is a non-transferable, permanent record of your competitive history on the blockchain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    onClick={() => setShowMintModal(true)}
                    variant="primary"
                    size="lg"
                  >
                    Mint Passport Now
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20"></div>
                  <svg className="w-48 h-48 text-primary relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Passport Active */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-primary rounded-2xl p-12 mb-16 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <p className="text-primary font-semibold">Active & Verified</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
                Passport Verified
              </h2>
              <p className="text-gray-700">
                Your identity is live on the Somnia blockchain. Ready to compete and build your reputation.
              </p>
            </div>

            {/* Statistics */}
            {dataLoading ? (
              <div className="mb-16">
                <h3 className="text-2xl font-black text-dark mb-8">Your Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="card-lg animate-pulse">
                      <div className="h-3 w-20 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 w-24 bg-gray-200 rounded mb-3"></div>
                      <div className="h-2 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : passportData ? (
              <div className="mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <h3 className="text-2xl font-black text-dark mb-8">Your Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    label="Reputation Score"
                    value={`${passportData[0] || 0}`}
                    color="primary"
                  />
                  <StatCard
                    label="Arena Points"
                    value={`${passportData[1] || 0}`}
                    color="secondary"
                  />
                  <StatCard
                    label="Total Victories"
                    value={`${passportData[2] || 0}`}
                    color="primary"
                  />
                  <StatCard
                    label="Challenges Entered"
                    value={`${passportData[3] || 0}`}
                    color="secondary"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-16 p-8 rounded-lg border border-dashed border-gray-300 text-center">
                <p className="text-gray-500">No passport data available</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <h3 className="text-2xl font-black text-dark mb-10">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-dark mb-2">Browse Challenges</h4>
                  <p className="text-gray-600">Explore available competitions and find opponents that match your skill level.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-dark mb-2">Join a Challenge</h4>
                  <p className="text-gray-600">Pay the entry fee and compete against players from around the world.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-dark mb-2">Win & Earn</h4>
                  <p className="text-gray-600">Build your reputation and climbthe global leaderboard for exclusive rewards.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mint Modal */}
      {showMintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative bg-white rounded-2xl p-8 md:p-12 max-w-md w-full animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-dark">Mint Your Passport</h3>
              <button
                onClick={() => setShowMintModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6 border border-border">
                <p className="text-sm font-bold text-dark mb-4 uppercase tracking-wide">What You'll Get:</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold">→</span>
                    <span>Soulbound NFT that proves your competitive identity</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold">→</span>
                    <span>Permanent history of all your competitive achievements</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold">→</span>
                    <span>Access to all Arena challenges and competitions</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-primary font-bold">→</span>
                    <span>Real-time reputation tracking and verification</span>
                  </li>
                </ul>
              </div>

              {mintSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 text-sm font-semibold">{mintSuccess}</p>
                </div>
              )}

              {mintError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm font-semibold">{mintError.message}</p>
                </div>
              )}
            </div>

            <Button
              onClick={async () => {
                try {
                  const hash = await mint();
                  setMintSuccess(`Transaction confirmed: ${hash?.slice(0, 10)}...`);
                  setTimeout(() => {
                    setShowMintModal(false);
                    setMintSuccess(null);
                  }, 2000);
                } catch (err) {
                  console.error('Mint failed:', err);
                }
              }}
              loading={minting}
              error={mintError?.message || null}
              variant="primary"
              fullWidth
              size="lg"
              className="mb-4"
            >
              {minting ? 'Minting...' : 'Confirm & Mint'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              One transaction • Non-transferable • Forever yours • Chain 50312
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
