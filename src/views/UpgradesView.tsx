import { UPGRADES } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';

interface UpgradesViewProps {
  money: number;
  ownedUpgrades: number[];
  onBuyUpgrade: (upgradeId: number) => void;
}

export function UpgradesView({ money, ownedUpgrades, onBuyUpgrade }: UpgradesViewProps) {
  return (
    <div className="view">
      <h2>Upgrades & Skills</h2>
      <p className="view-subtitle">Each upgrade teaches a real economics principle!</p>

      <div className="upgrade-grid">
        {UPGRADES.map(upgrade => {
          const owned = ownedUpgrades.includes(upgrade.id);
          const canAfford = money >= upgrade.cost;

          return (
            <div
              key={upgrade.id}
              className={`upgrade-card ${owned ? 'owned' : ''}`}
              style={{
                border: `2px solid ${owned ? '#4caf50' : canAfford ? '#667eea' : '#555'}`,
              }}
            >
              <div className="upgrade-header">
                <div>
                  <div className="upgrade-name">{upgrade.name}</div>
                  <div className="upgrade-description">{upgrade.description}</div>
                </div>
                <div
                  className="upgrade-cost"
                  style={{ color: owned ? '#4caf50' : canAfford ? '#ffd700' : '#888' }}
                >
                  {owned ? '✓' : formatMoney(upgrade.cost)}
                </div>
              </div>

              {!owned && (
                <Button
                  onClick={() => onBuyUpgrade(upgrade.id)}
                  disabled={!canAfford}
                  fullWidth
                >
                  {canAfford ? '📖 Purchase & Learn' : '🔒 Insufficient Funds'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
