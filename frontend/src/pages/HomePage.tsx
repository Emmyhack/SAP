import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useHasPassport, useMintPassport, usePassportData } from '../hooks/useWeb3';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { mint, isLoading: minting, error } = useMintPassport();
  const { passportData } = usePassportData();
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleMint = async () => {
    try {
      const hash = await mint();
      setTxHash(hash);
      setTimeout(() => setTxHash(null), 5000);
    } catch (err) {
      console.error('Mint failed:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center py-32 px-4">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-black text-gradient mb-6">Welcome Back</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12">
              Connect your wallet to unlock your Somnia Arena Passport and join the competitive ecosystem.
            </p>
            <div className="glass-effect rounded-2xl p-8 mb-8 border border-primary/30 glow-border">
              <p className="text-gray-200 mb-4 text-base leading-relaxed">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-bold">Somnia Arena Passport</span> is a soulbound NFT that grants you exclusive access to:
              </p>
              <ul className="text-left space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-accent font-bold">→</span> Competitive challenges and tournaments
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent font-bold">→</span> Real-time reputation tracking
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent font-bold">→</span> Exclusive rewards and badges
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent mb-12 -mx-4 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-2">Welcome Back</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Manage your Somnia Arena Passport and dominate the competitive scene</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Passport Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Your Passport</h2>
            {hasPassport && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/30">
                <span className="text-green-400 font-bold text-sm">✓ ACTIVE</span>
              </div>
            )}
          </div>

          {passportLoading ? (
            <div className="card">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin mb-4">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
                </div>
                <p className="text-gray-400">Loading your passport...</p>
              </div>
            </div>
          ) : hasPassport ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Passport Card */}
              <div className="lg:col-span-1 card group hover:border-accent/50 transition-all">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                      <span className="text-7xl animate-float">🎖️</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 font-semibold mb-1">Somnia Arena</p>
                  <p className="text-gray-500 text-sm">Soulbound Passport NFT</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Status</p>
                    <p className="text-green-400 font-bold">Active & Verified</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="lg:col-span-2">
                {passportData && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card group hover:border-primary/50 transition-all">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Reputation</p>
                      <div>
                        <p className="text-4xl font-black text-primary mb-1 group-hover:scale-110 transition-transform">{(passportData[0] || 0).toString()}</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                    <div className="card group hover:border-accent/50 transition-all">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Arena Points</p>
                      <div>
                        <p className="text-4xl font-black text-accent mb-1 group-hover:scale-110 transition-transform">{(passportData[1] || 0).toString()}</p>
                        <p className="text-xs text-gray-500">Total Earned</p>
                      </div>
                    </div>
                    <div className="card group hover:border-green-400/50 transition-all">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Victories</p>
                      <div>
                        <p className="text-4xl font-black text-green-400 mb-1 group-hover:scale-110 transition-transform">{(passportData[2] || 0).toString()}</p>
                        <p className="text-xs text-gray-500">Challenges Won</p>
                      </div>
                    </div>
                    <div className="card group hover:border-blue-400/50 transition-all">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Participation</p>
                      <div>
                        <p className="text-4xl font-black text-blue-400 mb-1 group-hover:scale-110 transition-transform">{(passportData[3] || 0).toString()}</p>
                        <p className="text-xs text-gray-500">Challenges Entered</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"></div>
              <div className="relative card border-primary/50 bg-dark/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Ready to Dominate?</h3>
                    <p className="text-gray-400 mb-6">
                      Mint your soulbound Passport NFT to gain access to the Somnia Arena. Join thousands of competitors, earn reputation, and claim your spot among champions.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-6">
                      <p className="flex items-center gap-2">
                        <span className="text-accent">✓</span> Instant access to all challenges
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-accent">✓</span> Start earning reputation immediately
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-accent">✓</span> Compete for exclusive rewards
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center animate-float">
                      <span className="text-6xl">🚀</span>
                    </div>
                    <button
                      onClick={handleMint}
                      disabled={minting}
                      className="btn btn-accent w-full md:w-auto px-8 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                    >
                      {minting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span> Minting...
                        </span>
                      ) : (
                        'Mint Passport Now'
                      )}
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      One-time creation • Soulbound to your wallet
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">
                      <span className="font-bold">Error:</span> {error.message}
                    </p>
                  </div>
                )}
                {txHash && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">
                      <span className="font-bold">✓ Success!</span> Transaction: {txHash.slice(0, 10)}...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
