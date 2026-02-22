import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useHasPassport, useMintPassport, usePassportData } from '../hooks/useWeb3';
import Button from '../components/Button';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { mint, isLoading: minting, error: mintError } = useMintPassport();
  const { passportData } = usePassportData();
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintSuccess, setMintSuccess] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Access your Somnia Arena dashboard. Once connected, you'll be able to mint your passport, browse challenges, and compete globally.
          </p>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-8 md:p-12">
            <p className="text-gray-300 font-bold mb-6">What you can do:</p>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  1
                </div>
                <div>
                  <p className="font-bold text-white">Mint your soulbound Passport</p>
                  <p className="text-gray-400 text-sm">Create your permanent gaming identity</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  2
                </div>
                <div>
                  <p className="font-bold text-white">Browse and enter challenges</p>
                  <p className="text-gray-400 text-sm">Find competitions at all difficulty levels</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                  3
                </div>
                <div>
                  <p className="font-bold text-white">Track your reputation</p>
                  <p className="text-gray-400 text-sm">Build your score and climb the leaderboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-dark via-dark to-dark/95">
      <div className="container-custom">
        {/* Header with Enhanced Styling */}
        <div className="mb-16 pb-8 border-b border-border/30">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-accent/70 mb-3 tracking-widest uppercase">Dashboard</p>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                Your Arena
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
          </p>
        </div>

        {/* Passport Section - Enhanced */}
        {passportLoading ? (
          <div className="bg-dark/50 border border-border/50 rounded-2xl p-12 mb-16 animate-pulse backdrop-blur-sm">
            <div className="h-40 bg-gray-700/20 rounded-xl"></div>
          </div>
        ) : !hasPassport ? (
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/30 rounded-2xl p-8 md:p-12 mb-16 backdrop-blur-md shadow-lg shadow-primary/5">
            <div className="max-w-2xl">
              <p className="text-accent/70 text-xs font-bold mb-3 tracking-widest uppercase">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Mint Your Passport
              </h2>
              <p className="text-gray-300 mb-10 text-base leading-relaxed">
                Your soulbound NFT identity. Non-transferable, permanent, and yours forever. Unlock instant access to all challenges.
              </p>
              <Button
                onClick={() => setShowMintModal(true)}
                variant="primary"
                size="lg"
              >
                Mint Passport
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Passport Active - Enhanced */}
            <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/30 rounded-2xl p-8 md:p-12 mb-16 backdrop-blur-md shadow-lg shadow-green-500/5">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-400 text-xs font-bold tracking-widest uppercase">Active</p>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Passport Verified
                  </h2>
                  <p className="text-gray-300 max-w-md text-base">
                    Your identity is live on chain. Ready to compete, build reputation, and earn rewards.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics - Enhanced */}
            {passportData && (
              <div className="mb-16">
                <h3 className="text-2xl font-black text-white mb-8">Your Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatCard
                    label="Reputation Score"
                    value={`${passportData[0] || 0}`}
                    color="primary"
                  />
                  <StatCard
                    label="Arena Points"
                    value={`${passportData[1] || 0}`}
                    color="accent"
                  />
                  <StatCard
                    label="Total Victories"
                    value={`${passportData[2] || 0}`}
                    color="green"
                  />
                  <StatCard
                    label="Challenges Entered"
                    value={`${passportData[3] || 0}`}
                    color="blue"
                  />
                </div>
              </div>
            )}

            {/* Next Steps - Enhanced */}
            <div className="bg-gradient-to-br from-accent/5 via-primary/5 to-transparent border border-accent/30 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-lg shadow-accent/5">
              <p className="text-accent/70 text-xs font-bold mb-3 tracking-widest uppercase">Next Steps</p>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-10">Continue Your Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white mb-4 border border-primary/30">
                    1
                  </div>
                  <p className="font-bold text-white mb-2 text-lg">Explore Challenges</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Browse available competitions across all difficulty levels and find your next opportunity.</p>
                </div>
                <div className="flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white mb-4 border border-primary/30">
                    2
                  </div>
                  <p className="font-bold text-white mb-2 text-lg">Enter Challenges</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Pay the entry fee and formally join your first competition with confidence.</p>
                </div>
                <div className="flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 font-black text-white mb-4 border border-primary/30">
                    3
                  </div>
                  <p className="font-bold text-white mb-2 text-lg">Compete & Win</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Build your reputation and climb the global leaderboard with every victory.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mint Modal */}
      {showMintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            onClick={() => setShowMintModal(false)}
          ></div>
          <div className="relative bg-dark border border-primary/40 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl shadow-primary/20 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-primary/70 text-xs font-bold tracking-widest uppercase mb-2">Complete Setup</p>
                <h3 className="text-3xl font-black text-white">Mint Passport</h3>
              </div>
              <button
                onClick={() => {
                  setShowMintModal(false);
                  setMintSuccess(null);
                }}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 backdrop-blur-md">
                <p className="text-sm text-gray-300 mb-4 font-bold uppercase tracking-wide">What you'll get:</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3 items-start">
                    <span className="text-accent/70 font-bold text-lg mt-px">→</span>
                    <span className="text-gray-300">Soulbound NFT passport (non-transferable, forever yours)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-accent/70 font-bold text-lg mt-px">→</span>
                    <span className="text-gray-300">Permanent gaming identity on the blockchain</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-accent/70 font-bold text-lg mt-px">→</span>
                    <span className="text-gray-300">Full access to all challenges and competitions</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-accent/70 font-bold text-lg mt-px">→</span>
                    <span className="text-gray-300">Real-time reputation tracking and verification</span>
                  </li>
                </ul>
              </div>

              {mintSuccess && (
                <div className="bg-green-500/15 border border-green-500/40 rounded-xl p-4 backdrop-blur-md">
                  <p className="text-green-400 text-sm font-semibold">{mintSuccess}</p>
                </div>
              )}

              {mintError && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-4 backdrop-blur-md">
                  <p className="text-red-400 text-sm font-semibold">{mintError.message}</p>
                </div>
              )}
            </div>

            <Button
              onClick={async () => {
                try {
                  const hash = await mint();
                  setMintSuccess(`Transaction sent: ${hash?.slice(0, 10)}...`);
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

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              One transaction on Somnia • Non-transferable • Permanent identity • Zero gas fees*
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
