import type { ClickEffect } from '../types';

interface ClickerButtonProps {
  clickPower: number;
  clickEffects: ClickEffect[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ClickerButton({ clickPower, clickEffects, onClick }: ClickerButtonProps) {
  return (
    <div className="clicker-button" onClick={onClick}>
      <div className="clicker-icon">🎴</div>
      <div className="clicker-text">Click to Appraise Cards</div>
      <div className="clicker-subtext">+${clickPower} per click</div>
      {clickEffects.map(ef => (
        <div
          key={ef.id}
          className="click-effect"
          style={{ left: ef.x, top: ef.y }}
        >
          +${ef.value}
        </div>
      ))}
    </div>
  );
}
