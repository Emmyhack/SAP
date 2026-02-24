import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { fetchAllChallenges } from '../utils/challengeHelpers';

export default function ChallengesPage() {
  const { isConnected } = useAccount();
  const { count: challengeCount, isLoading: countLoading } = useChallengesCount();
  const [allChallenges, setAllChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    const loadChallenges = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllChallenges();
        setAllChallenges(data);
      } catch (err) {
        console.error('Failed to load challenges:', err);
        setAllChallenges([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChallenges();
  }, []);

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
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedDifficulty === level
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-white border border-border text-dark hover:border-primary hover:text-primary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges List or Empty State */}
        {isLoading ? (
          <div className="bg-gray-100 border border-border rounded-2xl p-16 text-center animate-pulse">
            <p className="text-gray-600">Loading challenges...</p>
          </div>
        ) : allChallenges.length === 0 ? (
          <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-16 text-center mb-16 animate-fade-in">

          <h2 className="text-4xl font-black text-dark mb-6">No Challenges Available Yet</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            The challenge marketplace is being populated with competitions. Once challenges are created, you'll be able to browse, filter, and join competitions to start earning.
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/dashboard'}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
        ) : (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl font-black text-dark mb-8">Available Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allChallenges.map((challenge: any) => (
                <div key={challenge.id} className="bg-white border border-border rounded-xl p-6 hover:shadow-medium transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-dark text-lg mb-1">{challenge.title || `Challenge #${challenge.id}`}</h3>
                      <p className="text-xs text-gray-500">{`Challenge #${challenge.id}`}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      challenge.difficulty === 'hard' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {challenge.difficulty?.charAt(0).toUpperCase() + (challenge.difficulty?.slice(1) || 'N/A')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description || 'Challenge description'}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entry Fee:</span>
                      <span className="font-bold text-dark">{challenge.entryFee || '0'} SMN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prize Pool:</span>
                      <span className="font-bold text-primary">{challenge.totalPrize || '0'} SMN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-bold text-dark">{challenge.participants || '0'}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" fullWidth className="text-sm">
                    Enter Challenge
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-bold text-dark mb-0">Challenge Features</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start p-3 bg-white rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-700">Browse challenges at all difficulty levels</span>
              </li>
              <li className="flex gap-3 items-start p-3 bg-white rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-700">Filter by difficulty, duration, and reward</span>
              </li>
              <li className="flex gap-3 items-start p-3 bg-white rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-700">See live player counts and competitiveness ratings</span>
              </li>
              <li className="flex gap-3 items-start p-3 bg-white rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-700">Pay entry fees and participate instantly</span>
              </li>
              <li className="flex gap-3 items-start p-3 bg-white rounded-lg">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-700">Track challenge history and earnings</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-dark mb-0">How It Works</h3>
            </div>
            <div className="space-y-3">
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <p className="font-bold text-dark text-sm mb-1">Browse Available Challenges</p>
                <p className="text-xs text-gray-600 mb-0">Find competitions that interest you</p>
              </div>
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p className="font-bold text-dark text-sm mb-1">Pay Entry Fee</p>
                <p className="text-xs text-gray-600 mb-0">Commit to participating in the challenge</p>
              </div>
              <div className="relative pl-8 p-3 bg-white rounded-lg">
                <div className="absolute -left-1 top-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p className="font-bold text-dark text-sm mb-1">Compete & Win</p>
                <p className="text-xs text-gray-600 mb-0">Earn rewards and reputation points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
