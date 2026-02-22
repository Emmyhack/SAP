import { useAccount } from 'wagmi';
import { useState } from 'react';
import Button from '../components/Button';

export default function ChallengesPage() {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">
            Connect to Browse Challenges
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect your wallet to access the challenge marketplace and start competing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-border">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-3">
            Challenges
          </h1>
          <p className="text-lg text-gray-600">
            Browse available competitions and start competing against players worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 border border-border rounded-2xl p-8 mb-16">
          {/* Search */}
          <div className="mb-8">
            <label className="text-sm font-bold text-dark mb-4 block uppercase tracking-wide">Search Challenges</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-border focus-within:border-primary transition-colors">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" stroke-linejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-dark placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-bold text-dark mb-4 block uppercase tracking-wide">Filter by Difficulty</label>
            <div className="flex flex-wrap gap-3">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all bg-white border border-border text-gray-700 hover:border-primary hover:text-primary"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-16 text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-black text-dark mb-6">No Challenges Available Yet</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            The challenge marketplace is being populated with competitions. Once challenges are created, you'll be able to browse, filter, and join competitions to start earning.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/dashboard'}
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-dark mb-6">Challenge Features</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-lg">→</span>
                <span>Browse challenges at all difficulty levels</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-lg">→</span>
                <span>Filter by difficulty, duration, and reward</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-lg">→</span>
                <span>Pay entry fees and participate instantly</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-lg">→</span>
                <span>Track challenge history and earnings</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-dark mb-6">How It Works</h3>
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <p className="font-bold text-dark">Browse Available Challenges</p>
                <p className="text-sm text-gray-600">Find competitions that interest you</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p className="font-bold text-dark">Pay Entry Fee</p>
                <p className="text-sm text-gray-600">Commit to participating in the challenge</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-1 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p className="font-bold text-dark">Compete & Win</p>
                <p className="text-sm text-gray-600">Earn rewards and reputation points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
