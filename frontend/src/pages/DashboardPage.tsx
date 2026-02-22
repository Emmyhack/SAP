import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useHasPassport, useMintPassport, usePassportData } from '../hooks/useWeb3';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import ChallengeCard from '../components/ChallengeCard';

const challenges = [
  {
    id: 0,
    title: 'Speed Challenge',
    difficulty: 1 as const,
    entryFee: 0.01,
    duration: 300,
    participants: 42,
    description: 'Complete the challenge within 5 minutes',
    icon: '⚡',
    reward: '500 Rep'
  },
  {
    id: 1,
    title: 'Logic Puzzle',
    difficulty: 2 as const,
    entryFee: 0.05,
    duration: 600,
    participants: 28,
    description: 'Solve complex logic problems',
    icon: '🧩',
    reward: '1,500 Rep'
  },
  {
    id: 2,
    title: 'Master Challenge',
    difficulty: 3 as const,
    entryFee: 0.1,
    duration: 900,
    participants: 12,
    description: 'Advanced challenge - only for the best',
    icon: '👑',
    reward: '5,000 Rep'
  },
];

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { mint, isLoading: minting, error: mintError } = useMintPassport();
  const { passportData } = usePassportData();
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintSuccess, setMintSuccess] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent flex items-center justify-center px-4">
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="text-7xl mb-6">🎮</div>
          <h1 className="text-4xl font-black mb-4">Connect to Get Started</h1>
          <p className="text-gray-400 text-lg mb-8">
            Connect your wallet to access the Somnia Arena dashboard and start your competitive journey.
          </p>
          <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <p className="text-gray-300 mb-4">Once connected, you'll be able to:</p>
            <ul className="text-left space-y-2 text-gray-400 text-sm mb-6">
              <li>✓ Mint your soulbound Passport</li>
              <li>✓ Browse & enter challenges</li>
              <li>✓ Track your reputation</li>
              <li>✓ Compete globally</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/30 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">Welcome Back</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </h1>
          <p className="text-gray-400 text-lg">Your competitive gaming dashboard</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Passport Status Card */}
        {passportLoading ? (
          <div className="mb-12 card animate-pulse">
            <div className="h-40 bg-gray-700/30 rounded-lg"></div>
          </div>
        ) : !hasPassport ? (
          <div className="mb-12 card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black mb-3">Mint Your Passport</h2>
                <p className="text-gray-400 mb-6">
                  Your soulbound NFT is your ticket to the arena. Mint it now to unlock all challenges and start building your reputation.
                </p>
                <ul className="space-y-2 text-sm mb-8">
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-accent">✓</span> Permanent blockchain identity
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-accent">✓</span> Non-transferable (soulbound)
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-accent">✓</span> Instant access to all challenges
                  </li>
                </ul>
                <Button
                  onClick={() => setShowMintModal(true)}
                  variant="primary"
                  size="lg"
                >
                  🚀 Mint Your Passport
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="text-9xl animate-float">🎖️</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Passport Active Card */}
            <div className="mb-12 card border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-bold text-sm">PASSPORT ACTIVE</span>
                  </div>
                  <h2 className="text-2xl font-black mb-2">Your Passport is Ready</h2>
                  <p className="text-gray-400">You're all set to compete! Browse challenges and start your journey.</p>
                </div>
                <div className="text-6xl animate-float">🎖️</div>
              </div>
            </div>

            {/* Stats Grid */}
            {passportData && (
              <div className="mb-12">
                <h2 className="text-2xl font-black mb-6">Your Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    label="Reputation"
                    value={passportData[0] || 0}
                    icon="📈"
                    color="primary"
                  />
                  <StatCard
                    label="Arena Points"
                    value={passportData[1] || 0}
                    icon="⭐"
                    color="accent"
                  />
                  <StatCard
                    label="Victories"
                    value={passportData[2] || 0}
                    icon="🏆"
                    color="green"
                  />
                  <StatCard
                    label="Participation"
                    value={passportData[3] || 0}
                    icon="⚡"
                    color="blue"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Featured Challenges */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-black mb-2">Featured Challenges</h2>
            <p className="text-gray-400">Browse the latest challenges and find one that suits you</p>
          </div>

          <div className="space-y-5">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                loading={false}
                onJoin={() => console.log('Join challenge', challenge.id)}
              />
            ))}
          </div>
        </section>
      </main>

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
                <p className="text-sm text-gray-400 mb-2">What you'll get:</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✓ Soulbound NFT passport</li>
                  <li>✓ Permanent gaming identity</li>
                  <li>✓ Access to all challenges</li>
                  <li>✓ Reputation tracking</li>
                </ul>
              </div>

              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-gray-400 mb-2">Transaction details:</p>
                <p className="text-sm text-accent font-semibold">One-time minting fee</p>
              </div>

              {mintSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 text-sm font-semibold">✓ {mintSuccess}</p>
                </div>
              )}

              {mintError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm font-semibold">⚠️ {mintError.message}</p>
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
              🚀 {minting ? 'Minting...' : 'Mint Now'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              One transaction · Non-transferable · Forever yours
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
