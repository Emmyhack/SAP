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
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-dark via-dark to-dark/95">
      <div className="container-custom">
        {/* Header - Enhanced */}
        <div className="mb-16 pb-8 border-b border-border/30">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-accent/70 mb-3 tracking-widest uppercase">Challenge Marketplace</p>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                Challenges
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Browse available competitions across all difficulty levels and enter challenges to build your reputation
          </p>
        </div>

        {/* Filters - Enhanced */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/30 rounded-2xl p-8 mb-16 backdrop-blur-md shadow-lg shadow-primary/5">
          {/* Search */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-300 mb-4 block uppercase tracking-widest">Search Challenges</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark/50 border border-border/50 focus-within:border-primary/50 transition-all backdrop-blur-sm">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
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
            <label className="text-xs font-bold text-gray-300 mb-4 block uppercase tracking-widest">Filter by Difficulty</label>
            <div className="flex flex-wrap gap-3">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all bg-dark/50 border border-border/50 text-gray-300 hover:border-primary/50 hover:text-white hover:shadow-lg hover:shadow-primary/10"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State - Enhanced */}
        <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-2xl p-12 md:p-16 text-center backdrop-blur-md shadow-lg shadow-accent/5 mb-16">
          <p className="text-accent/70 text-xs font-bold mb-3 tracking-widest uppercase">Coming Soon</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">No Challenges Available</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-base leading-relaxed">
            The challenge marketplace is being populated. Once challenges are created by platform administrators, they'll appear here. You'll be able to browse, filter, and enter competitions to build your reputation.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/dashboard'}
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Challenge System Info - Enhanced */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-lg shadow-cyan-500/5">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
              <span className="text-cyan-400 font-black text-lg">⚙</span>
            </div>
            <div>
              <p className="text-cyan-400/70 text-xs font-bold tracking-widest uppercase mb-2">Technical Overview</p>
              <h3 className="text-2xl md:text-3xl font-black text-white">Challenge System Infrastructure</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            The challenge system is fully integrated with our smart contract infrastructure. It provides a decentralized marketplace where administrators can create challenges and users can participate, earn rewards, and build provable reputation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-cyan-400/70 text-xs font-bold mb-3 tracking-widest uppercase">Marketplace Features</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Multi-difficulty challenge hierarchy</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Dynamic difficulty filters and sorting</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Entry fee management and collection</span>
                </li>
              </ul>
            </div>
            <div className="bg-dark/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-cyan-400/70 text-xs font-bold mb-3 tracking-widest uppercase">Participation Workflow</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Browse and explore available challenges</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Pay entry fee and claim participation</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>Track history and earnings on-chain</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
