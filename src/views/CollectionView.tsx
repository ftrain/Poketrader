import type { CollectionCard } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';
import { Button } from '../components';

interface CollectionViewProps {
  collection: CollectionCard[];
  sellBonus: number;
  onSellCard: (card: CollectionCard) => void;
}

const HOLO_RARITIES = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];

export function CollectionView({ collection, sellBonus, onSellCard }: CollectionViewProps) {
  if (collection.length === 0) {
    return (
      <div className="view">
        <h2>Your Collection</h2>
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No cards yet! Visit the market or open packs!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view">
      <h2>Your Collection</h2>
      <div className="card-grid">
        {collection.map(card => {
          const currentValue = card.currentPrice * sellBonus;
          const profit = currentValue - card.purchasePrice;
          const isFromPack = card.purchasePrice === 0;
          const profitPercent = isFromPack
            ? 100
            : ((currentValue / card.purchasePrice - 1) * 100);
          const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);
          const isHolo = HOLO_RARITIES.includes(card.rarity);

          return (
            <div
              key={card.collectionId}
              className={`collection-card ${isHolo ? 'holo' : ''}`}
              style={{
                background: `linear-gradient(145deg, ${TYPE_COLORS[card.type]}22, ${TYPE_COLORS[card.type]}44)`,
                border: `2px solid ${RARITY_COLORS[card.rarity]}`,
              }}
            >
              {card.fromPack && (
                <div className="pack-badge">📦 Pack</div>
              )}
              <div
                className="profit-badge"
                style={{
                  background: isFromPack ? '#667eea' : (profit >= 0 ? '#4caf50' : '#f44336')
                }}
              >
                {isFromPack ? 'FREE' : `${profit >= 0 ? '+' : ''}${profitPercent.toFixed(1)}%`}
              </div>

              <div className="card-sprite">
                <img
                  src={spriteUrl}
                  alt={card.name}
                  className={`sprite ${card.shiny ? 'shiny' : ''}`}
                />
              </div>
              <div className="card-name">{card.name}</div>
              <div className="card-meta">
                {isFromPack ? 'From pack' : `Bought: $${card.purchasePrice.toFixed(2)}`} • Held: {card.holdTime}s
              </div>

              <div className="card-values">
                <div>
                  <div className="value-label">Current Value</div>
                  <div className="value-amount">${currentValue.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="value-label">{isFromPack ? 'Pure Profit' : 'P&L'}</div>
                  <div
                    className="value-amount"
                    style={{ color: isFromPack || profit >= 0 ? '#4caf50' : '#f44336' }}
                  >
                    {isFromPack || profit >= 0 ? '+' : ''}${isFromPack ? currentValue.toFixed(2) : profit.toFixed(2)}
                  </div>
                </div>
              </div>

              <Button onClick={() => onSellCard(card)} variant="success" fullWidth>
                💰 Sell for ${currentValue.toFixed(2)}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
