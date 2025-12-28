import { UPGRADES, UPGRADE_CATEGORIES, canPurchaseUpgrade } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';
import type { UpgradeCategory, Upgrade } from '../types';

interface UpgradesViewProps {
  money: number;
  ownedUpgrades: number[];
  onBuyUpgrade: (upgradeId: number) => void;
}

const CATEGORY_ORDER: UpgradeCategory[] = ['basics', 'grading', 'retail', 'media', 'events', 'wholesale', 'empire'];

// Determine which upgrades to show for progressive reveal
function getVisibleUpgrades(categoryUpgrades: Upgrade[], ownedUpgrades: number[]): Upgrade[] {
  const visible: Upgrade[] = [];
  let lockedShown = 0;
  const MAX_LOCKED_TO_SHOW = 2;

  // Sort by cost so we reveal in a sensible order
  const sorted = [...categoryUpgrades].sort((a, b) => a.cost - b.cost);

  for (const upgrade of sorted) {
    const owned = ownedUpgrades.includes(upgrade.id);
    const meetsReqs = canPurchaseUpgrade(upgrade.id, ownedUpgrades);

    if (owned) {
      // Always show owned
      visible.push(upgrade);
    } else if (meetsReqs) {
      // Always show purchasable (requirements met)
      visible.push(upgrade);
    } else if (lockedShown < MAX_LOCKED_TO_SHOW) {
      // Show a few locked ones as "teaser" for what's next
      // Only show if at least one requirement is owned or purchasable
      const hasVisiblePrereq = upgrade.requires?.some(reqId => {
        const isOwned = ownedUpgrades.includes(reqId);
        const reqMeetsReqs = canPurchaseUpgrade(reqId, ownedUpgrades);
        return isOwned || reqMeetsReqs;
      });

      if (hasVisiblePrereq || !upgrade.requires) {
        visible.push(upgrade);
        lockedShown++;
      }
    }
  }

  return visible;
}

export function UpgradesView({ money, ownedUpgrades, onBuyUpgrade }: UpgradesViewProps) {
  return (
    <div className="view">
      <h2>Build Your Card Empire</h2>
      <p className="view-subtitle">Each upgrade teaches real business principles</p>

      {CATEGORY_ORDER.map(category => {
        const categoryData = UPGRADE_CATEGORIES[category];
        const categoryUpgrades = UPGRADES.filter(u => u.category === category);
        const visibleUpgrades = getVisibleUpgrades(categoryUpgrades, ownedUpgrades);
        const ownedInCategory = categoryUpgrades.filter(u => ownedUpgrades.includes(u.id)).length;

        // Hide category if no visible upgrades
        if (visibleUpgrades.length === 0) return null;

        return (
          <div key={category} className="upgrade-category">
            <div
              className="category-header"
              style={{ borderColor: categoryData.color }}
            >
              <span>{categoryData.icon} {categoryData.name}</span>
              <span className="category-progress">{ownedInCategory}/{categoryUpgrades.length}</span>
            </div>

            <div className="upgrade-grid compact">
              {visibleUpgrades.map(upgrade => {
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
