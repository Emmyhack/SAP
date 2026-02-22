import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useEnterChallenge } from '../hooks/useWeb3';
import Button from '../components/Button';
import ChallengeCard from '../components/ChallengeCard';
import Modal from '../components/Modal';

const allChallenges = [
  {
    id: 0,
    title: 'Speed Challenge',
    difficulty: 1 as const,
    entryFee: 0.01,
    duration: 300,
    participants: 42,
    description: 'Complete the challenge within 5 minutes. Race against time and prove your speed.',
    icon: '⚡',
    reward: '500 Rep',
    category: 'speed'
  },
  {
    id: 1,
    title: 'Logic Puzzle',
    difficulty: 2 as const,
    entryFee: 0.05,
    duration: 600,
    participants: 28,
    description: 'Solve complex logic problems and demonstrate your analytical skills.',
    icon: '🧩',
    reward: '1,500 Rep',
    category: 'puzzle'
  },
  {
    id: 2,
    title: 'Master Challenge',
    difficulty: 3 as const,
    entryFee: 0.1,
    duration: 900,
    participants: 12,
    description: 'Advanced challenge - only for the best. Test your limits.',
    icon: '👑',
    reward: '5,000 Rep',
    category: 'master'
  },
  {
    id: 3,
    title: 'Quick Fire',
    difficulty: 1 as const,
    entryFee: 0.005,
    duration: 120,
    participants: 156,
    description: '2-minute sprint. Fast-paced action that anyone can enter.',
    icon: '🔥',
    reward: '200 Rep',
    category: 'speed'
  },
  {
    id: 4,
    title: 'Strategy Master',
    difficulty: 2 as const,
    entryFee: 0.08,
    duration: 1800,
    participants: 15,
    description: 'Long-form strategic competition. Show off your planning skills.',
    icon: '♟️',
    reward: '2,000 Rep',
    category: 'strategy'
  },
  {
    id: 5,
    title: 'Elite Gauntlet',
    difficulty: 3 as const,
    entryFee: 0.2,
    duration: 1200,
    participants: 5,
    description: 'The ultimate test. Only top competitors dare enter.',
    icon: '👹',
    reward: '10,000 Rep',
    category: 'master'
  },
];

export default function ChallengesPage() {
  const { isConnected } = useAccount();
  const { enter, isLoading: entering } = useEnterChallenge();
  const [selectedChallenge, setSelectedChallenge] = useState<typeof allChallenges[0] | null>(null);
  const [difficulty, setDifficulty] = useState<'all' | 1 | 2 | 3>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChallenges = allChallenges.filter((challenge) => {
    const matchesDifficulty = difficulty === 'all' || challenge.difficulty === difficulty;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent/5 to-transparent flex items-center justify-center px-4">
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="text-7xl mb-6">🎯</div>
          <h1 className="text-4xl font-black mb-4">Connect to Browse Challenges</h1>
          <p className="text-gray-400 text-lg">
            Connect your wallet and mint your passport to start competing in challenges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border-b border-accent/30 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-2">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">The Arena</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Challenges</h1>
          <p className="text-gray-400 text-lg">Browse and enter challenges to earn reputation and rewards</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-12 sticky top-24 bg-dark/80 backdrop-blur-sm p-4 rounded-lg border border-border z-30">
          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-dark border border-border focus-within:border-primary transition-colors">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2">
            {(['all', 1, 2, 3] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  difficulty === level
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                    : 'bg-secondary border border-border text-gray-300 hover:border-primary/50'
                }`}
              >
                {level === 'all' ? 'All Difficulties' : `Difficulty ${level}`}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-400 mt-4">
            {filteredChallenges.length} challenge{filteredChallenges.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12 card">
            <p className="text-2xl font-black mb-2">No Challenges Found</p>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                loading={entering}
                onClick={() => setSelectedChallenge(challenge)}
                onJoin={() => {
                  setSelectedChallenge(challenge);
                  enter(challenge.id);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedChallenge(null)}
          title={selectedChallenge.title}
          size="lg"
        >
          <div className="space-y-6">
            {/* Challenge Meta */}
            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <div className="text-6xl">{selectedChallenge.icon}</div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Category</p>
                <p className="text-xl font-bold capitalize">{selectedChallenge.category}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-400 mb-2 font-bold">ABOUT</p>
              <p className="text-gray-300 leading-relaxed">{selectedChallenge.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-gray-500 font-bold mb-2">DIFFICULTY</p>
                <p className="text-lg font-black text-primary">
                  {'⭐'.repeat(selectedChallenge.difficulty)}
                </p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-gray-500 font-bold mb-2">ENTRY FEE</p>
                <p className="text-lg font-black text-accent">{selectedChallenge.entryFee} ETH</p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-gray-500 font-bold mb-2">DURATION</p>
                <p className="text-lg font-black text-blue-400">{selectedChallenge.duration}s</p>
              </div>
              <div className="bg-dark/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-gray-500 font-bold mb-2">TOP REWARD</p>
                <p className="text-lg font-black text-yellow-400">{selectedChallenge.reward}</p>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-dark/50 rounded-lg p-4 border border-border">
              <p className="text-xs text-gray-500 font-bold mb-2">CURRENT PARTICIPANTS</p>
              <p className="text-2xl font-black text-accent">{selectedChallenge.participants}</p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => {
                enter(selectedChallenge.id);
                setSelectedChallenge(null);
              }}
              loading={entering}
              variant="primary"
              fullWidth
              size="lg"
            >
              🎮 Enter Challenge
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
