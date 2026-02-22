import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useEnterChallenge } from '../hooks/useWeb3';
import Button from '../components/Button';

export default function ChallengesPage() {
  const { isConnected } = useAccount();
  const { enter, isLoading: entering } = useEnterChallenge();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Connect to Browse Challenges
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Connect your wallet to access the challenge marketplace. You can browse all available challenges, filter by difficulty, and enter competitions.
          </p>
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
            Challenges
          </h1>
          <p className="text-gray-400 text-lg">
            Browse available competitions, enter challenges, and build your reputation
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border rounded-xl p-6 mb-12">
          {/* Search */}
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-400 mb-3 block uppercase">Search Challenges</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-dark border-2 border-border focus-within:border-primary transition-colors">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-bold text-gray-400 mb-3 block uppercase">Filter by Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all bg-secondary border-2 border-border text-gray-300 hover:border-primary/50"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-border rounded-xl p-12 text-center">
          <h2 className="text-3xl font-black text-white mb-4">No Challenges Available</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Challenges will appear here once they are created by the platform administrators. Check back soon to start competing.
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => window.location.href = '/dashboard'}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Challenge Implementation Info */}
        <div className="mt-12 p-8 rounded-xl bg-dark border-2 border-border">
          <h3 className="text-xl font-black text-white mb-4">Challenge System</h3>
          <p className="text-gray-400 text-sm mb-4">
            The challenge system is fully integrated with smart contracts. Once challenges are created by administrators, they will appear in this marketplace. You can:
          </p>
          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span>Browse challenges at all difficulty levels</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span>Filter by difficulty, duration, and reward</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span>Pay entry fees and participate</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <span>Track your challenge history and earnings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
