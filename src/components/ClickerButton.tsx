import type { ClickEffect } from '../types';

interface ClickerButtonProps {
  clickPower: number;
  clickEffects: ClickEffect[];
  comboCount: number;
  comboMultiplier: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ClickerButton({ clickPower, clickEffects, comboCount, comboMultiplier, onClick }: ClickerButtonProps) {
  const isComboActive = comboCount >= 5;
  const comboTier = comboCount >= 50 ? 'max' : comboCount >= 25 ? 'high' : comboCount >= 10 ? 'medium' : 'low';

  return (
    <div
      className={`clicker-button ${isComboActive ? `combo-active combo-${comboTier}` : ''}`}
      onClick={onClick}
    >
      <div className="clicker-icon">🎴</div>
      <div className="clicker-text">Click to Appraise Cards</div>
      <div className="clicker-subtext">+${clickPower} per click</div>

      {/* Combo Display */}
      {comboCount > 0 && (
        <div className={`combo-display combo-tier-${comboTier}`}>
          <span className="combo-count">x{comboCount}</span>
          <span className="combo-label">COMBO</span>
          {comboMultiplier > 1 && (
            <span className="combo-bonus">+{Math.round((comboMultiplier - 1) * 100)}%</span>
          )}
        </div>
      )}

      {/* Combo Progress Bar */}
      {comboCount > 0 && (
        <div className="combo-bar">
          <div
            className="combo-bar-fill"
            style={{ width: `${Math.min(100, (comboCount / 50) * 100)}%` }}
          />
        </div>
      )}

      {/* Click Effects */}
      {clickEffects.map(ef => (
        <div
          key={ef.id}
          className={`click-effect ${ef.isCritical ? 'critical' : ''} ${ef.isCombo ? 'combo' : ''}`}
          style={{ left: ef.x, top: ef.y }}
        >
          {ef.isCritical && <span className="crit-label">CRIT!</span>}
          +${ef.value}
        </div>
      ))}
    </div>
  );
}
