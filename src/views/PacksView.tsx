import type { PackType, PackStats } from '../types';
import { PACK_TYPES, ALL_PULLABLE_CARDS } from '../data';
import { StatCard, Button } from '../components';
import { formatMoney } from '../utils/format';

interface PacksViewProps {
  money: number;
  packsOpened: number;
  packStats: PackStats;
  collectionSize: number;
  capacity: number;
  onOpenPack: (pack: PackType) => void;
}

function calculateExpectedValue(packType: PackType): number {
  let ev = 0;
  for (const [rarity, rate] of Object.entries(packType.pullRates)) {
    const cardsOfRarity = ALL_PULLABLE_CARDS.filter(c => c.rarity === rarity);
    if (cardsOfRarity.length > 0) {
      const avgValue = cardsOfRarity.reduce((sum, c) => sum + c.basePrice, 0) / cardsOfRarity.length;
      ev += rate * avgValue;
    }
  }
  return ev * packType.cardCount;
}

export function PacksView({
  money,
  packsOpened,
  packStats,
  collectionSize,
  capacity,
  onOpenPack
}: PacksViewProps) {
  const netPnL = packStats.totalValue - packStats.spent;

  return (
    <div className="view">
      <h2>🎴 Booster Packs</h2>
      <p className="view-subtitle">Test your luck! Each pack teaches economics of gambling.</p>

      <div className="stats-grid compact">
        <StatCard icon="" label="Packs Opened" value={String(packsOpened)} />
        <StatCard icon="" label="Total Spent" value={formatMoney(packStats.spent)} color="#f44336" />
        <StatCard icon="" label="Cards Value" value={formatMoney(packStats.totalValue)} color="#4caf50" />
        <StatCard
          icon=""
          label="Net P&L"
          value={`${netPnL >= 0 ? '+' : ''}${formatMoney(netPnL)}`}
          color={netPnL >= 0 ? '#4caf50' : '#f44336'}
        />
      </div>

      <div className="pack-grid">
        {PACK_TYPES.map(pack => {
          const ev = calculateExpectedValue(pack);
          const evDiff = ev - pack.price;
          const canBuy = money >= pack.price && collectionSize < capacity;

          return (
            <div
              key={pack.id}
              className="pack-card"
              style={{
                background: `linear-gradient(145deg, ${pack.color}22, ${pack.color}44)`,
                border: `2px solid ${pack.color}`,
              }}
            >
              <div className="pack-img">{pack.img}</div>
              <h3 className="pack-name">{pack.name}</h3>
              <p className="pack-description">{pack.description}</p>

              <div className="pack-stats">
                <div className="pack-stat">
                  <span className="pack-stat-label">Price</span>
                  <span className="pack-stat-value">${pack.price}</span>
                </div>
                <div className="pack-stat">
                  <span className="pack-stat-label">Expected Value</span>
                  <span
                    className="pack-stat-value"
                    style={{ color: evDiff >= 0 ? '#4caf50' : '#ff9800' }}
                  >
                    ${ev.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="pack-lesson">
                💡 {pack.lesson.substring(0, 80)}...
              </div>

              <Button
                onClick={() => onOpenPack(pack)}
                disabled={!canBuy}
                fullWidth
                style={{
                  background: canBuy
                    ? `linear-gradient(135deg, ${pack.color}, ${pack.color}cc)`
                    : '#555'
                }}
              >
                {collectionSize >= capacity
                  ? '📦 Storage Full'
                  : money < pack.price
                    ? '🔒 Need More Money'
                    : '🎴 Open Pack'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
