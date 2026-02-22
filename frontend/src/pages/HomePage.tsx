import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useHasPassport, useMintPassport, useReputation, useUserRank } from '../hooks/useWeb3';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { hasPassport, isLoading: passportLoading } = useHasPassport();
  const { mint, isLoading: minting, error } = useMintPassport();
  const { reputation } = useReputation();
  const { rank } = useUserRank();
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
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-gradient mb-4">Welcome to Somnia Arena</h1>
        <p className="text-gray-400 text-lg mb-8">
          Connect your wallet to get started and mint your Passport.
        </p>
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/50">
          <p className="text-gray-300">
            The Somnia Arena Passport is a soulbound NFT that grants you access to exclusive challenges and competitive gaming.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-2">Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</h1>
        <p className="text-gray-400">Manage your Somnia Arena Passport and track your reputation</p>
      </div>

      {/* Passport Section */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Passport</h2>
          {hasPassport && <span className="text-green-400 text-sm font-semibold">✓ Active</span>}
        </div>

        {passportLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-pulse">Loading passport...</div>
          </div>
        ) : hasPassport ? (
          <div className="space-y-4">
            <div className="bg-dark rounded-lg p-6 border border-border">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🎖️</span>
                </div>
                <p className="text-gray-400 mb-2">Your Somnia Arena Passport</p>
                <p className="text-sm text-gray-500">Soulbound NFT</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your passport is active and you're ready to compete in the arena. Enter challenges, complete them, and earn reputation points!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">You don't have a Passport yet. Mint one to get started!</p>
            <button
              onClick={handleMint}
              disabled={minting}
              className="btn btn-accent w-full disabled:opacity-50"
            >
              {minting ? 'Minting...' : 'Mint Passport'}
            </button>
            {error && <p className="text-red-400 text-sm">Error: {error.message}</p>}
            {txHash && <p className="text-green-400 text-sm">✓ Transaction: {txHash.slice(0, 10)}...</p>}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      {hasPassport && reputation && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Reputation Score</p>
            <p className="text-3xl font-bold text-primary">{reputation[0]}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Arena Points</p>
            <p className="text-3xl font-bold text-accent">{reputation[1]}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Wins</p>
            <p className="text-3xl font-bold text-green-400">{reputation[2]}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Participation</p>
            <p className="text-3xl font-bold text-blue-400">{reputation[3]}</p>
          </div>
        </div>
      )}

      {hasPassport && rank && (
        <div className="mt-8 card text-center">
          <p className="text-gray-400 mb-2">Your Rank</p>
          <p className="text-5xl font-bold text-gradient">Rank #{rank}</p>
        </div>
      )}
    </div>
  );
}
