interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color?: string;
}

export function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{icon} {label}</div>
      <div className="stat-value" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
