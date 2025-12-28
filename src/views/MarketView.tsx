import type { MarketCard } from '../types';
import { CardDisplay, Button } from '../components';

interface MarketViewProps {
  market: MarketCard[];
  money: number;
  discount: number;
  collectionSize: number;
  capacity: number;
  onBuyCard: (card: MarketCard) => void;
  onRefresh: () => void;
}

export function MarketView({
  market,
  money,
  discount,
  collectionSize,
  capacity,
  onBuyCard,
  onRefresh
}: MarketViewProps) {
  return (
    <div className="view">
      <div className="view-header">
        <h2>Available Cards</h2>
        <Button onClick={onRefresh} variant="secondary">
          🔄 Refresh
        </Button>
      </div>
      <div className="card-grid">
        {market.map(card => {
          const price = card.currentPrice * discount;
          const canBuy = money >= price && collectionSize < capacity;

          return (
            <CardDisplay
              key={card.marketId}
              card={card}
              showPrice
              discount={discount}
              priceHistory={card.priceHistory}
            >
              <Button
                onClick={() => onBuyCard(card)}
                disabled={!canBuy}
                variant="success"
                fullWidth
              >
                {collectionSize >= capacity ? '📦 Full' : '🛒 Buy'}
              </Button>
            </CardDisplay>
          );
        })}
      </div>
    </div>
  );
}
