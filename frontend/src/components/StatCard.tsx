interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success';
}

export default function StatCard({ label, value, change, color = 'primary' }: StatCardProps) {
  const colorStyles = {
    primary: 'border-primary/30 hover:border-primary/70 hover:shadow-green-glow',
    secondary: 'border-secondary/30 hover:border-secondary/70 hover:shadow-green-glow',
    accent: 'border-accent/30 hover:border-accent/70 hover:shadow-green-glow',
    success: 'border-green-200 hover:border-green-400 hover:shadow-green-glow',
  };

  const colorText = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-green-600',
  };

  return (
    <div className={`bg-white border-2 rounded-2xl p-6 group hover:shadow-medium transition-all ${colorStyles[color]}`}>
      <div className="mb-4">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">{label}</p>
        <p className={`text-4xl font-black group-hover:scale-110 transition-transform ${colorText[color]}`}>{value}</p>
      </div>
      {change && (
        <p className="text-xs text-gray-500">
          {change.includes('+') ? <span className="text-primary font-semibold">{change}</span> : change}
        </p>
      )}
    </div>
  );
}
