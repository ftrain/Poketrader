import type { Card, MarketCard, CollectionCard } from '../types';
import { CONDITION_LABELS } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';

interface CardDisplayProps {
  card: Card | MarketCard | CollectionCard;
  showPrice?: boolean;
  discount?: number;
  priceHistory?: number[];
  children?: React.ReactNode;
}

function renderMiniChart(history: number[]) {
  if (!history || history.length < 2) return null;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;

  return (
    <svg width="60" height="24" style={{ marginLeft: 8 }}>
      <polyline
        points={history.map((p, i) => `${i * (60 / history.length)},${24 - ((p - min) / range) * 20}`).join(' ')}
        fill="none"
        stroke={history[history.length - 1] > history[0] ? '#4caf50' : '#f44336'}
        strokeWidth="1.5"
      />
    </svg>
  );
}

const HOLO_RARITIES = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];

const CONDITION_COLORS: Record<string, string> = {
  'mint': '#22c55e',
  'near-mint': '#84cc16',
  'excellent': '#eab308',
  'good': '#f97316',
  'fair': '#ef4444',
  'poor': '#6b7280'
};

export function CardDisplay({ card, showPrice, discount = 1, priceHistory, children }: CardDisplayProps) {
  const currentPrice = 'currentPrice' in card ? card.currentPrice : card.basePrice;
  const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);
  const isHolo = HOLO_RARITIES.includes(card.rarity);
  const condition = 'condition' in card ? card.condition : null;

  return (
    <div
      className={`card-display ${isHolo ? 'holo' : ''}`}
      style={{
        background: `linear-gradient(145deg, ${TYPE_COLORS[card.type]}22, ${TYPE_COLORS[card.type]}44)`,
        border: `2px solid ${RARITY_COLORS[card.rarity]}`,
      }}
    >
      <div
        className="card-rarity-badge"
        style={{ background: RARITY_COLORS[card.rarity] }}
      >
        {card.rarity}
      </div>
      {condition && (
        <div
          className="card-condition-badge"
          style={{ background: CONDITION_COLORS[condition] }}
        >
          {CONDITION_LABELS[condition]}
        </div>
      )}
      <div className="card-sprite">
        <img
          src={spriteUrl}
          alt={card.name}
          className={`sprite ${card.shiny ? 'shiny' : ''}`}
        />
      </div>
      <div className="card-name">{card.name}</div>

      {showPrice && (
        <div className="card-price-row">
          <span className="card-price">${(currentPrice * discount).toFixed(2)}</span>
          {priceHistory && renderMiniChart(priceHistory)}
        </div>
      )}

      {children}
    </div>
  );
}
