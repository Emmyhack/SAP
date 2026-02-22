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
  icon: string;
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
  icon,
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
      <div className="flex gap-6 items-start">
        {/* Icon */}
        <div className="text-6xl group-hover:scale-110 transition-transform flex-shrink-0">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-black text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500 font-bold mb-1">PARTICIPANTS</p>
              <p className="text-2xl font-black text-accent">{participants}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 py-4 border-y border-border/50 mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold mb-1">DIFFICULTY</p>
              <p className={`font-black ${difficultyColor[difficulty]}`}>{difficultyLabel[difficulty]}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold mb-1">ENTRY FEE</p>
              <p className="text-sm font-black text-accent">{entryFee} ETH</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold mb-1">DURATION</p>
              <p className="text-sm font-black text-blue-400">{duration}s</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold mb-1">REWARD</p>
              <p className="text-sm font-black text-yellow-400">{reward}</p>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-end">
            <Button
              onClick={(e) => {
                e.stopPropagation();
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
    </div>
  );
}
