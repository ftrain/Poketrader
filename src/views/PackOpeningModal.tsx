import type { CollectionCard } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';
import { Button } from '../components';

interface PackOpeningModalProps {
  packResults: CollectionCard[];
  revealedCards: CollectionCard[];
  onClose: () => void;
}

export function PackOpeningModal({ packResults, revealedCards, onClose }: PackOpeningModalProps) {
  const allRevealed = revealedCards.length === packResults.length;
  const totalValue = packResults.reduce((sum, c) => sum + c.currentPrice, 0);

  return (
    <div className="modal-backdrop pack-opening">
      <h2 className="pack-opening-title">🎴 Pack Opening!</h2>

      <div className="pack-cards-container">
        {packResults.map((card) => {
          const isRevealed = revealedCards.includes(card);
          const isSpecial = ['secret-rare', 'legendary', 'chase'].includes(card.rarity);
          const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);

          return (
            <div
              key={card.collectionId}
              className={`pack-card-reveal ${isRevealed ? 'revealed' : ''}`}
              style={{
                background: isRevealed
                  ? `linear-gradient(145deg, ${TYPE_COLORS[card.type]}44, ${TYPE_COLORS[card.type]}22)`
                  : 'linear-gradient(145deg, #333, #222)',
                border: `3px solid ${isRevealed ? RARITY_COLORS[card.rarity] : '#444'}`,
                boxShadow: isRevealed && isSpecial
                  ? `0 0 20px ${RARITY_COLORS[card.rarity]}`
                  : 'none'
              }}
            >
              {isRevealed ? (
                <>
                  <div className="reveal-sprite">
                    <img
                      src={spriteUrl}
                      alt={card.name}
                      className={`sprite-small ${card.shiny ? 'shiny' : ''}`}
                    />
                  </div>
                  <div className="reveal-name">{card.name}</div>
                  <div
                    className="reveal-rarity"
                    style={{ color: RARITY_COLORS[card.rarity] }}
                  >
                    {card.rarity}
                  </div>
                  <div className="reveal-price">${card.currentPrice.toFixed(0)}</div>
                </>
              ) : (
                <div className="reveal-hidden">❓</div>
              )}
            </div>
          );
        })}
      </div>

      {allRevealed && (
        <>
          <div className="pack-total-value">
            <div className="total-label">Total Value</div>
            <div className="total-amount">${totalValue.toFixed(0)}</div>
          </div>
          <Button onClick={onClose}>
            Collect Cards ✓
          </Button>
        </>
      )}
    </div>
  );
}
