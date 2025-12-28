import { useState, useMemo } from 'react';
import type { CollectionCard } from '../types';
import { CONDITION_LABELS } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';

const CONDITION_COLORS: Record<string, string> = {
  'mint': '#22c55e',
  'near-mint': '#84cc16',
  'excellent': '#eab308',
  'good': '#f97316',
  'fair': '#ef4444',
  'poor': '#6b7280'
};

interface CollectionViewProps {
  collection: CollectionCard[];
  sellBonus: number;
  onSellCard: (card: CollectionCard) => void;
  onBatchSell?: (cards: CollectionCard[]) => void;
}

const HOLO_RARITIES = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];

// Group cards by name + condition for stacking
interface CardStack {
  key: string;
  cards: CollectionCard[];
  representative: CollectionCard;
}

function groupCards(collection: CollectionCard[]): CardStack[] {
  const groups = new Map<string, CollectionCard[]>();

  collection.forEach(card => {
    // Group by name + condition for similar pricing
    const key = `${card.id}-${card.condition}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(card);
  });

  return Array.from(groups.entries()).map(([key, cards]) => ({
    key,
    cards,
    representative: cards[0]
  }));
}

export function CollectionView({ collection, sellBonus, onSellCard, onBatchSell }: CollectionViewProps) {
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [batchMode, setBatchMode] = useState(false);
  const [expandedStack, setExpandedStack] = useState<string | null>(null);

  const stacks = useMemo(() => groupCards(collection), [collection]);

  const selectedTotal = useMemo(() => {
    return collection
      .filter(c => selectedCards.has(c.collectionId))
      .reduce((sum, c) => sum + c.currentPrice * sellBonus, 0);
  }, [collection, selectedCards, sellBonus]);

  const toggleCard = (collectionId: number) => {
    setSelectedCards(prev => {
      const next = new Set(prev);
      if (next.has(collectionId)) {
        next.delete(collectionId);
      } else {
        next.add(collectionId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedCards(new Set(collection.map(c => c.collectionId)));
  };

  const selectNone = () => {
    setSelectedCards(new Set());
  };

  const handleBatchSell = () => {
    const cardsToSell = collection.filter(c => selectedCards.has(c.collectionId));
    if (onBatchSell && cardsToSell.length > 0) {
      onBatchSell(cardsToSell);
      setSelectedCards(new Set());
      setBatchMode(false);
    }
  };

  const sellOneFromStack = (stack: CardStack) => {
    onSellCard(stack.cards[0]);
    setExpandedStack(null);
  };

  const sellAllFromStack = (stack: CardStack) => {
    if (onBatchSell && stack.cards.length > 0) {
      onBatchSell(stack.cards);
      setExpandedStack(null);
    }
  };

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
      <div className="collection-header">
        <h2>Your Collection ({collection.length})</h2>
        <Button
          onClick={() => {
            setBatchMode(!batchMode);
            if (batchMode) setSelectedCards(new Set());
            setExpandedStack(null);
          }}
          variant={batchMode ? 'primary' : 'secondary'}
        >
          {batchMode ? '✕ Cancel' : '☑ Batch'}
        </Button>
      </div>

      {batchMode && (
        <div className="batch-controls">
          <div className="batch-selection">
            <Button onClick={selectAll} variant="secondary">All</Button>
            <Button onClick={selectNone} variant="secondary">None</Button>
            <span className="batch-count">{selectedCards.size} selected</span>
          </div>
          {selectedCards.size > 0 && (
            <Button onClick={handleBatchSell} variant="success">
              Sell {selectedCards.size} for {formatMoney(selectedTotal)}
            </Button>
          )}
        </div>
      )}

      <div className="card-grid">
        {stacks.map(stack => {
          const card = stack.representative;
          const count = stack.cards.length;
          const currentValue = card.currentPrice * sellBonus;
          const totalStackValue = stack.cards.reduce((sum, c) => sum + c.currentPrice * sellBonus, 0);
          const profit = currentValue - card.purchasePrice;
          const isFromPack = card.purchasePrice === 0;
          const profitPercent = isFromPack
            ? 100
            : ((currentValue / card.purchasePrice - 1) * 100);
          const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);
          const isHolo = HOLO_RARITIES.includes(card.rarity);
          const isExpanded = expandedStack === stack.key;

          // In batch mode, check if any cards in stack are selected
          const selectedInStack = stack.cards.filter(c => selectedCards.has(c.collectionId)).length;

          return (
            <div
              key={stack.key}
              className={`collection-card ${isHolo ? 'holo' : ''} ${isExpanded ? 'expanded' : ''}`}
              style={{
                background: `linear-gradient(145deg, ${TYPE_COLORS[card.type]}22, ${TYPE_COLORS[card.type]}44)`,
                border: `2px solid ${selectedInStack > 0 ? '#3b82f6' : RARITY_COLORS[card.rarity]}`,
              }}
              onClick={batchMode ? () => {
                // Toggle all cards in stack
                stack.cards.forEach(c => toggleCard(c.collectionId));
              } : undefined}
            >
              {/* Stack count badge */}
              {count > 1 && (
                <div className="stack-count">x{count}</div>
              )}

              {batchMode && (
                <div className={`select-checkbox ${selectedInStack > 0 ? 'checked' : ''}`}>
                  {selectedInStack > 0 ? selectedInStack : ''}
                </div>
              )}

              {card.japanese && (
                <div className="jp-badge">🇯🇵</div>
              )}

              {card.condition && (
                <div
                  className="condition-badge"
                  style={{ background: CONDITION_COLORS[card.condition] }}
                >
                  {CONDITION_LABELS[card.condition]}
                </div>
              )}

              <div
                className="profit-badge"
                style={{
                  background: isFromPack ? '#667eea' : (profit >= 0 ? '#4caf50' : '#f44336')
                }}
              >
                {isFromPack ? 'FREE' : `${profit >= 0 ? '+' : ''}${profitPercent.toFixed(0)}%`}
              </div>

              <div className="card-sprite">
                <img
                  src={spriteUrl}
                  alt={card.name}
                  className={`sprite ${card.shiny ? 'shiny' : ''}`}
                />
              </div>
              <div className="card-name">{card.name}</div>

              <div className="card-value-display">
                {formatMoney(currentValue)}
                {count > 1 && (
                  <span className="stack-total"> ({formatMoney(totalStackValue)} total)</span>
                )}
              </div>

              {!batchMode && (
                <div className="card-actions">
                  {count === 1 ? (
                    <Button onClick={() => onSellCard(card)} variant="success" fullWidth>
                      Sell {formatMoney(currentValue)}
                    </Button>
                  ) : (
                    <>
                      {isExpanded ? (
                        <div className="stack-actions">
                          <Button onClick={() => sellOneFromStack(stack)} variant="secondary">
                            Sell 1
                          </Button>
                          <Button onClick={() => sellAllFromStack(stack)} variant="success">
                            Sell All ({count})
                          </Button>
                          <button
                            className="close-stack-btn"
                            onClick={(e) => { e.stopPropagation(); setExpandedStack(null); }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setExpandedStack(stack.key)}
                          variant="success"
                          fullWidth
                        >
                          Sell ({count} cards)
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
