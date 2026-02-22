interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'green' | 'blue';
}

export default function StatCard({ label, value, change, icon, color = 'primary' }: StatCardProps) {
  const colorStyles = {
    primary: 'text-primary border-primary/30 hover:border-primary/70',
    accent: 'text-accent border-accent/30 hover:border-accent/70',
    green: 'text-green-400 border-green-400/30 hover:border-green-400/70',
    blue: 'text-blue-400 border-blue-400/30 hover:border-blue-400/70',
  };

  return (
    <div className={`card group hover:shadow-xl transition-all border-2 ${colorStyles[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">{label}</p>
          <p className="text-4xl font-black group-hover:scale-110 transition-transform">{value}</p>
        </div>
        {icon && <span className="text-3xl group-hover:animate-float">{icon}</span>}
      </div>
      {change && (
        <p className="text-xs text-gray-500">
          {change.includes('+') ? <span className="text-green-400">{change}</span> : change}
        </p>
      )}
    </div>
  );
}
