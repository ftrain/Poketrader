import type { AdvisorTip as AdvisorTipType } from '../data';

interface AdvisorTipProps {
  tip: AdvisorTipType;
  onDismiss: () => void;
}

export function AdvisorTip({ tip, onDismiss }: AdvisorTipProps) {
  const priorityColors = {
    high: '#dc2626',
    medium: '#f59e0b',
    low: '#3b82f6'
  };

  return (
    <div className={`advisor-tip priority-${tip.priority}`}>
      <div className="advisor-tip-header">
        <span className="advisor-icon">{tip.icon}</span>
        <span className="advisor-name">{tip.advisor}</span>
        <button className="advisor-dismiss" onClick={onDismiss}>✕</button>
      </div>
      <div className="advisor-message">{tip.message}</div>
      <div
        className="advisor-action"
        style={{ borderLeftColor: priorityColors[tip.priority] }}
      >
        {tip.action}
      </div>
    </div>
  );
}
