import { STARTER_PATHS } from '../hooks';
import { formatMoney } from '../utils';

interface StartupModalProps {
  onChoosePath: (pathId: 'solo' | 'partner' | 'investor') => void;
}

export function StartupModal({ onChoosePath }: StartupModalProps) {
  return (
    <div className="modal-backdrop startup-modal">
      <div className="startup-content">
        <h1 className="startup-title">Welcome to Poke-Terminal</h1>
        <p className="startup-subtitle">Choose your starting path</p>

        <div className="path-grid">
          {STARTER_PATHS.map(path => (
            <div
              key={path.id}
              className={`path-card path-${path.id}`}
              onClick={() => onChoosePath(path.id as 'solo' | 'partner' | 'investor')}
            >
              <div className="path-icon">{path.icon}</div>
              <h3 className="path-name">{path.name}</h3>
              <p className="path-description">{path.description}</p>

              <div className="path-stats">
                <div className="path-stat">
                  <span className="stat-label">Starting Cash</span>
                  <span className="stat-value good">{formatMoney(path.startingMoney)}</span>
                </div>
                {path.debt > 0 && (
                  <div className="path-stat">
                    <span className="stat-label">Debt to Repay</span>
                    <span className="stat-value debt">-{formatMoney(path.debt)}</span>
                  </div>
                )}
                <div className="path-stat">
                  <span className="stat-label">Click Power</span>
                  <span className="stat-value">{path.clickPower}x</span>
                </div>
              </div>

              <div className="path-bonus">{path.bonus}</div>
            </div>
          ))}
        </div>

        <p className="startup-tip">
          Tip: Debt is repaid automatically from 20% of your card sale profits
        </p>
      </div>
    </div>
  );
}
