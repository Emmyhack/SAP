import { useAccount } from 'wagmi';
import { useState } from 'react';
import Button from '../components/Button';
import { useCreateChallenge } from '../hooks/useWeb3';

export default function CreateChallengePage() {
  const { isConnected, address } = useAccount();
  const { create, isLoading: isCreating, error: contractError } = useCreateChallenge();
  const [entryFee, setEntryFee] = useState('0.1');
  const [duration, setDuration] = useState('86400'); // 1 day in seconds
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
            Connect Your Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Connect to create your own challenges and earn from competition fees
          </p>
        </div>
      </div>
    );
  }

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!title.trim()) {
        setError('Challenge title is required');
        setLoading(false);
        return;
      }

      if (!description.trim()) {
        setError('Challenge description is required');
        setLoading(false);
        return;
      }

      const entryFeeNum = parseFloat(entryFee);
      if (isNaN(entryFeeNum) || entryFeeNum < 0.01) {
        setError('Entry fee must be at least 0.01 SMN');
        setLoading(false);
        return;
      }

      const durationSeconds = parseInt(duration);

      // Call smart contract to create challenge
      const hash = await create(entryFeeNum, durationSeconds);
      
      setSuccess(`Challenge "${title}" created successfully! Transaction: ${hash?.slice(0, 10)}...`);
      
      // Reset form
      setTitle('');
      setDescription('');
      setEntryFee('0.1');
      setDuration('86400');
      setDifficulty('medium');

      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to create challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-border">
          <h1 className="text-5xl md:text-6xl font-black text-dark mb-3">
            Create a Challenge
          </h1>
          <p className="text-lg text-gray-600">
            Set up your own competition, attract players, and earn from entry fees
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateChallenge} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide">Challenge Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Speed Chess Tournament"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-border text-dark placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the challenge rules, objectives, and what winners will compete for..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-border text-dark placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-border text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Entry Fee */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide">Entry Fee (SMN)</label>
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                placeholder="0.1"
                step="0.01"
                min="0.01"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-border text-dark placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Minimum 0.01 ETH. This fee will be split between the prize pool and platform.</p>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide">Challenge Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-border text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="3600">1 Hour</option>
                <option value="21600">6 Hours</option>
                <option value="43200">12 Hours</option>
                <option value="86400">1 Day</option>
                <option value="259200">3 Days</option>
                <option value="604800">1 Week</option>
                <option value="2592000">30 Days</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">How long will the challenge remain open for entries?</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-semibold">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading || isCreating}
              fullWidth
              className="mt-6"
            >
              {loading || isCreating ? 'Creating Challenge...' : 'Create Challenge'}
            </Button>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-primary/5 border border-primary/30 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-dark mb-4">Challenge Benefits</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Earn from entry fees</span>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Build your reputation</span>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Customize rules & rewards</span>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Attract competitive players</span>
                </li>
              </ul>
            </div>

            <div className="bg-accent/5 border border-accent/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-dark mb-4">Fee Structure</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Your Earnings:</span>
                  <span className="font-bold text-primary">70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee:</span>
                  <span className="font-bold text-dark">30%</span>
                </div>
                <div className="h-px bg-border my-3"></div>
                <p className="text-xs text-gray-600">Payouts go to your connected wallet after challenge completion.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
