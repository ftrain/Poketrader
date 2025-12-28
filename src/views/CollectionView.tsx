import { useState, useMemo } from 'react';
import type { CollectionCard } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';

interface CollectionViewProps {
  collection: CollectionCard[];
  sellBonus: number;
  onSellCard: (card: CollectionCard) => void;
  onBatchSell?: (cards: CollectionCard[]) => void;
}

const HOLO_RARITIES = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];

export function CollectionView({ collection, sellBonus, onSellCard, onBatchSell }: CollectionViewProps) {
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [batchMode, setBatchMode] = useState(false);

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
        <h2>Your Collection</h2>
        <Button
          onClick={() => {
            setBatchMode(!batchMode);
            if (batchMode) setSelectedCards(new Set());
          }}
          variant={batchMode ? 'primary' : 'secondary'}
        >
          {batchMode ? '✕ Cancel' : '☑ Batch Sell'}
        </Button>
      </div>

      {batchMode && (
        <div className="batch-controls">
          <div className="batch-selection">
            <Button onClick={selectAll} variant="secondary">Select All</Button>
            <Button onClick={selectNone} variant="secondary">Select None</Button>
            <span className="batch-count">{selectedCards.size} selected</span>
          </div>
          {selectedCards.size > 0 && (
            <Button onClick={handleBatchSell} variant="success">
              💰 Sell {selectedCards.size} cards for {formatMoney(selectedTotal)}
            </Button>
          )}
        </div>
      )}

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
          const isSelected = selectedCards.has(card.collectionId);

          return (
            <div
              key={card.collectionId}
              className={`collection-card ${isHolo ? 'holo' : ''} ${isSelected ? 'selected' : ''}`}
              style={{
                background: `linear-gradient(145deg, ${TYPE_COLORS[card.type]}22, ${TYPE_COLORS[card.type]}44)`,
                border: `2px solid ${isSelected ? '#3b82f6' : RARITY_COLORS[card.rarity]}`,
              }}
              onClick={batchMode ? () => toggleCard(card.collectionId) : undefined}
            >
              {batchMode && (
                <div className={`select-checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected ? '✓' : ''}
                </div>
              )}
              {card.japanese && (
                <div className="jp-badge">🇯🇵 JP</div>
              )}
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

              {!batchMode && (
                <Button onClick={() => onSellCard(card)} variant="success" fullWidth>
                  💰 Sell for ${currentValue.toFixed(2)}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
