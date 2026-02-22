import Button from './Button';

interface ChallengeCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  entryFee: number;
  duration: number;
  participants: number;
  reward: string;
  icon?: string;
  onClick?: () => void;
  onJoin?: () => void;
  loading?: boolean;
}

export default function ChallengeCard({
  id,
  title,
  description,
  difficulty,
  entryFee,
  duration,
  participants,
  reward,
  onClick,
  onJoin,
  loading = false,
}: ChallengeCardProps) {
  const difficultyColor = {
    1: 'text-green-400',
    2: 'text-yellow-400',
    3: 'text-red-400',
  };

  const difficultyLabel = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
  };

  return (
    <div
      onClick={onClick}
      className="group card cursor-pointer border-2 border-border hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 transition-all"
    >
      <div className="space-y-6">
        {/* Title and Description */}
        <div>
          <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border/50">
          <div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Level</p>
            <p className={`font-black text-sm ${difficultyColor[difficulty]}`}>
              {difficultyLabel[difficulty]}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Entry Fee</p>
            <p className="text-sm font-black text-accent">{entryFee} ETH</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Duration</p>
            <p className="text-sm font-black text-blue-400">{duration}s</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Reward</p>
            <p className="text-sm font-black text-yellow-400">{reward}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase">Participants</p>
            <p className="text-lg font-black text-accent">{participants}</p>
          </div>
          <Button
            onClick={(e) => {
              e?.stopPropagation?.();
              onJoin?.();
            }}
            loading={loading}
            variant="accent"
            size="md"
          >
            Enter Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}
