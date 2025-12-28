import { UPGRADES, UPGRADE_CATEGORIES, canPurchaseUpgrade } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';
import type { UpgradeCategory } from '../types';

interface UpgradesViewProps {
  money: number;
  ownedUpgrades: number[];
  onBuyUpgrade: (upgradeId: number) => void;
}

const CATEGORY_ORDER: UpgradeCategory[] = ['basics', 'grading', 'retail', 'media', 'events', 'wholesale', 'empire'];

export function UpgradesView({ money, ownedUpgrades, onBuyUpgrade }: UpgradesViewProps) {
  return (
    <div className="view">
      <h2>Build Your Card Empire</h2>
      <p className="view-subtitle">Each upgrade teaches real business principles</p>

      {CATEGORY_ORDER.map(category => {
        const categoryData = UPGRADE_CATEGORIES[category];
        const upgrades = UPGRADES.filter(u => u.category === category);
        const ownedInCategory = upgrades.filter(u => ownedUpgrades.includes(u.id)).length;

        return (
          <div key={category} className="upgrade-category">
            <div
              className="category-header"
              style={{ borderColor: categoryData.color }}
            >
              <span>{categoryData.icon} {categoryData.name}</span>
              <span className="category-progress">{ownedInCategory}/{upgrades.length}</span>
            </div>

            <div className="upgrade-grid compact">
              {upgrades.map(upgrade => {
                const owned = ownedUpgrades.includes(upgrade.id);
                const canAfford = money >= upgrade.cost;
                const meetsReqs = canPurchaseUpgrade(upgrade.id, ownedUpgrades);
                const locked = !meetsReqs && !owned;

                return (
                  <div
                    key={upgrade.id}
                    className={`upgrade-card ${owned ? 'owned' : ''} ${locked ? 'locked' : ''}`}
                    style={{
                      borderColor: owned ? '#10b981' : locked ? '#9ca3af' : canAfford ? categoryData.color : '#d1d5db',
                    }}
                  >
                    <div className="upgrade-header">
                      <span className="upgrade-icon">{upgrade.icon}</span>
                      <div className="upgrade-info">
                        <div className="upgrade-name">{upgrade.name}</div>
                        <div className="upgrade-description">{upgrade.description}</div>
                      </div>
                      <div
                        className="upgrade-cost"
                        style={{ color: owned ? '#10b981' : canAfford ? '#f59e0b' : '#9ca3af' }}
                      >
                        {owned ? '✓' : formatMoney(upgrade.cost)}
                      </div>
                    </div>

                    {locked && upgrade.requires && (
                      <div className="upgrade-requires">
                        Requires: {upgrade.requires.map(reqId => {
                          const req = UPGRADES.find(u => u.id === reqId);
                          return req ? req.name : '';
                        }).join(', ')}
                      </div>
                    )}

                    {!owned && !locked && (
                      <Button
                        onClick={() => onBuyUpgrade(upgrade.id)}
                        disabled={!canAfford}
                        fullWidth
                      >
                        {canAfford ? 'Purchase' : 'Need ' + formatMoney(upgrade.cost)}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
