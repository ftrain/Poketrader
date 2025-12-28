import { useState } from 'react';
import type { CollectionCard, GradingSubmission, GradedCard } from '../types';
import { RARITY_COLORS, TYPE_COLORS, getSpriteUrl } from '../data';
import { Button } from '../components';
import { formatMoney } from '../utils/format';

interface GradingViewProps {
  collection: CollectionCard[];
  gradingQueue: GradingSubmission[];
  gradedCards: GradedCard[];
  money: number;
  gameTime: number;
  onSubmitForGrading: (card: CollectionCard) => void;
  onCollectGradedCard: (submission: GradingSubmission) => void;
}

const GRADING_COST_BASE = 25;
const GRADING_TIME = 30; // seconds

export function GradingView({
  collection,
  gradingQueue,
  gradedCards,
  money,
  gameTime,
  onSubmitForGrading,
  onCollectGradedCard
}: GradingViewProps) {
  const [selectedTab, setSelectedTab] = useState<'submit' | 'pending' | 'graded'>('submit');

  const getGradingCost = (card: CollectionCard) => {
    // Cost scales with card value
    return Math.max(GRADING_COST_BASE, Math.round(card.currentPrice * 0.1));
  };

  const readyToCollect = gradingQueue.filter(g => gameTime >= g.returnTime);
  const stillPending = gradingQueue.filter(g => gameTime < g.returnTime);

  return (
    <div className="view">
      <h2>🔍 Card Grading Service</h2>
      <p className="view-subtitle">Submit cards for professional grading - beware of forgeries!</p>

      {/* Notification for ready cards */}
      {readyToCollect.length > 0 && (
        <div className="grading-alert">
          📬 {readyToCollect.length} card{readyToCollect.length > 1 ? 's' : ''} ready to collect!
        </div>
      )}

      {/* Tab Navigation */}
      <div className="grading-tabs">
        <button
          className={`grading-tab ${selectedTab === 'submit' ? 'active' : ''}`}
          onClick={() => setSelectedTab('submit')}
        >
          Submit ({collection.length})
        </button>
        <button
          className={`grading-tab ${selectedTab === 'pending' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pending')}
        >
          Pending ({gradingQueue.length})
          {readyToCollect.length > 0 && <span className="tab-badge">{readyToCollect.length}</span>}
        </button>
        <button
          className={`grading-tab ${selectedTab === 'graded' ? 'active' : ''}`}
          onClick={() => setSelectedTab('graded')}
        >
          Graded ({gradedCards.length})
        </button>
      </div>

      {/* Submit Tab */}
      {selectedTab === 'submit' && (
        <div className="grading-section">
          {collection.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No cards to grade. Buy or open some packs first!</p>
            </div>
          ) : (
            <div className="card-grid compact">
              {collection.map(card => {
                const cost = getGradingCost(card);
                const canAfford = money >= cost;
                const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);

                return (
                  <div
                    key={card.collectionId}
                    className="grading-card"
                    style={{
                      borderColor: RARITY_COLORS[card.rarity],
                      background: `linear-gradient(145deg, ${TYPE_COLORS[card.type]}15, ${TYPE_COLORS[card.type]}30)`
                    }}
                  >
                    <div className="card-sprite small">
                      <img src={spriteUrl} alt={card.name} className="sprite" />
                    </div>
                    <div className="grading-card-info">
                      <div className="card-name">{card.name}</div>
                      <div className="card-value">{formatMoney(card.currentPrice)}</div>
                    </div>
                    <Button
                      onClick={() => onSubmitForGrading(card)}
                      disabled={!canAfford}
                      variant="primary"
                    >
                      Grade {formatMoney(cost)}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Pending Tab */}
      {selectedTab === 'pending' && (
        <div className="grading-section">
          {gradingQueue.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>No cards being graded. Submit some cards!</p>
            </div>
          ) : (
            <div className="pending-list">
              {/* Ready to collect first */}
              {readyToCollect.map(submission => {
                const spriteUrl = getSpriteUrl(submission.card.spriteId, submission.card.shiny);
                return (
                  <div key={submission.id} className="pending-card ready">
                    <div className="envelope-icon">📬</div>
                    <div className="card-sprite small">
                      <img src={spriteUrl} alt={submission.card.name} className="sprite" />
                    </div>
                    <div className="pending-info">
                      <div className="card-name">{submission.card.name}</div>
                      <div className="ready-text">Ready to open!</div>
                    </div>
                    <Button onClick={() => onCollectGradedCard(submission)} variant="success">
                      📧 Open Envelope
                    </Button>
                  </div>
                );
              })}

              {/* Still pending */}
              {stillPending.map(submission => {
                const timeLeft = Math.max(0, submission.returnTime - gameTime);
                const spriteUrl = getSpriteUrl(submission.card.spriteId, submission.card.shiny);
                const progress = ((GRADING_TIME - timeLeft) / GRADING_TIME) * 100;

                return (
                  <div key={submission.id} className="pending-card">
                    <div className="envelope-icon pending">📨</div>
                    <div className="card-sprite small">
                      <img src={spriteUrl} alt={submission.card.name} className="sprite" />
                    </div>
                    <div className="pending-info">
                      <div className="card-name">{submission.card.name}</div>
                      <div className="time-left">⏱️ {timeLeft}s remaining</div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Graded Tab */}
      {selectedTab === 'graded' && (
        <div className="grading-section">
          {gradedCards.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏅</div>
              <p>No graded cards yet. Submit cards for grading!</p>
            </div>
          ) : (
            <div className="card-grid">
              {gradedCards.map(card => {
                const spriteUrl = getSpriteUrl(card.spriteId, card.shiny);
                const gradedValue = card.currentPrice * card.gradeMultiplier;

                return (
                  <div
                    key={card.collectionId}
                    className={`graded-card ${card.isForgery ? 'forgery' : ''}`}
                    style={{
                      borderColor: card.isForgery ? '#ef4444' : '#fbbf24',
                      background: card.isForgery
                        ? 'linear-gradient(145deg, #fef2f2, #fee2e2)'
                        : 'linear-gradient(145deg, #fffbeb, #fef3c7)'
                    }}
                  >
                    <div className="grade-badge" style={{
                      background: card.isForgery ? '#ef4444' : getGradeColor(card.grade)
                    }}>
                      {card.grade}
                    </div>
                    <div className="card-sprite">
                      <img src={spriteUrl} alt={card.name} className={`sprite ${card.shiny ? 'shiny' : ''}`} />
                    </div>
                    <div className="card-name">{card.name}</div>
                    {card.isForgery ? (
                      <div className="forgery-warning">⚠️ WORTHLESS FORGERY</div>
                    ) : (
                      <div className="graded-value">
                        <span className="multiplier">{card.gradeMultiplier}x</span>
                        <span className="value">{formatMoney(gradedValue)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'PSA 10': return '#22c55e';
    case 'PSA 9': return '#84cc16';
    case 'PSA 8': return '#eab308';
    case 'PSA 7': return '#f97316';
    case 'PSA 6': return '#ef4444';
    default: return '#6b7280';
  }
}
