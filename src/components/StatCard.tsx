interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color?: string;
  subtext?: string;
}

export function StatCard({ icon, label, value, color, subtext }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{icon} {label}</div>
      <div className="stat-value" style={{ color }}>
        {value}
      </div>
      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
}
