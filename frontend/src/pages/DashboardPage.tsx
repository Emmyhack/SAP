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
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Your Arena
          </h1>
          <p className="text-gray-400 text-lg">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
          </p>
        </div>

        {/* Passport Section */}
        {passportLoading ? (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-12 mb-12 animate-pulse">
            <div className="h-40 bg-gray-700/20 rounded-lg"></div>
          </div>
        ) : !hasPassport ? (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-8 md:p-12 mb-12">
            <div className="max-w-2xl">
              <p className="text-gray-400 text-sm font-bold mb-3 uppercase">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Mint Your Passport
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Your Somnia Arena Passport is a soulbound NFT that serves as your permanent gaming identity. Once minted, you'll have access to all challenges and can start building your reputation on the blockchain.
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
            {/* Passport Active */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-8 md:p-12 mb-12">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="text-green-400 text-sm font-bold mb-2 uppercase">Status</p>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Passport Active
                  </h2>
                  <p className="text-gray-400 max-w-md">
                    You are now ready to enter challenges and compete for reputation. View available challenges or check your statistics below.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {passportData && (
              <div className="mb-12">
                <p className="text-gray-400 text-sm font-bold mb-6 uppercase">Your Statistics</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-black text-white mb-6">Continue Your Journey</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Explore Challenges</p>
                    <p className="text-gray-400 text-sm">Browse available competitions across all difficulty levels</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Enter Challenges</p>
                    <p className="text-gray-400 text-sm">Pay the entry fee and join your first competition</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Compete & Win</p>
                    <p className="text-gray-400 text-sm">Build your reputation and climb the global leaderboard</p>
                  </div>
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMintModal(false)}
          ></div>
          <div className="relative card max-w-md w-full border-primary/50 glow-border animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Mint Passport</h3>
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

            <div className="space-y-4 mb-6">
              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-gray-400 mb-3 font-bold">What you'll get:</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Soulbound NFT passport</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Permanent gaming identity</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Access to all challenges</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Reputation tracking</span>
                  </li>
                </ul>
              </div>

              {mintSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 text-sm font-semibold">{mintSuccess}</p>
                </div>
              )}

              {mintError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
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
            >
              {minting ? 'Minting...' : 'Mint Now'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              One transaction • Non-transferable • Forever yours
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
