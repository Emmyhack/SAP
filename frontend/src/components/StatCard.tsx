interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'green' | 'blue';
}

export default function StatCard({ label, value, change, color = 'primary' }: StatCardProps) {
  const colorStyles = {
    primary: 'border-primary/30 hover:border-primary/70',
    secondary: 'border-secondary/30 hover:border-secondary/70',
    green: 'border-green-300 hover:border-green-500',
    blue: 'border-blue-300 hover:border-blue-500',
  };

  const colorText = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    green: 'text-green-600',
    blue: 'text-blue-600',
  };

  return (
    <div className={`bg-white border-2 rounded-xl p-6 group hover:shadow-lg transition-all ${colorStyles[color]}`}>
      <div className="mb-4">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">{label}</p>
        <p className={`text-4xl font-black group-hover:scale-110 transition-transform ${colorText[color]}`}>{value}</p>
      </div>
      {change && (
        <p className="text-xs text-gray-500">
          {change.includes('+') ? <span className="text-green-600">{change}</span> : change}
        </p>
      )}
    </div>
  );
}
