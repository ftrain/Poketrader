import { useState } from 'react';
import type { CollectionCard, GradingSubmission, GradedCard } from '../types';
import { CONDITION_LABELS } from '../types';
import { getSpriteUrl } from '../data';
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

const MIN_VALUE_FOR_GRADING = 50; // Only cards worth $50+ can be graded
const GRADING_COST_BASE = 25;
const GRADING_TIME = 30;

export function GradingView({
  collection,
  gradingQueue,
  gradedCards,
  money,
  gameTime,
  onSubmitForGrading,
  onCollectGradedCard
}: GradingViewProps) {
  const [tab, setTab] = useState<'submit' | 'pending' | 'graded'>('submit');

  const getGradingCost = (card: CollectionCard) => {
    return Math.max(GRADING_COST_BASE, Math.round(card.currentPrice * 0.1));
  };

  // Filter cards eligible for grading (worth $50+)
  const eligibleCards = collection.filter(c => c.currentPrice >= MIN_VALUE_FOR_GRADING);
  const readyToCollect = gradingQueue.filter(g => gameTime >= g.returnTime);
  const stillPending = gradingQueue.filter(g => gameTime < g.returnTime);

  return (
    <div className="grading-view">
      <div className="grading-header">
        <h2>Card Grading</h2>
        <p>Professional authentication for valuable cards ($50+)</p>
      </div>

      {/* Alert for ready cards */}
      {readyToCollect.length > 0 && (
        <div className="grading-ready-alert">
          {readyToCollect.length} card{readyToCollect.length > 1 ? 's' : ''} ready!
        </div>
      )}

      {/* Tabs */}
      <div className="grading-tabs">
        <button
          className={`grading-tab ${tab === 'submit' ? 'active' : ''}`}
          onClick={() => setTab('submit')}
        >
          Submit ({eligibleCards.length})
        </button>
        <button
          className={`grading-tab ${tab === 'pending' ? 'active' : ''}`}
          onClick={() => setTab('pending')}
        >
          Pending ({gradingQueue.length})
        </button>
        <button
          className={`grading-tab ${tab === 'graded' ? 'active' : ''}`}
          onClick={() => setTab('graded')}
        >
          Graded ({gradedCards.length})
        </button>
      </div>

      {/* Submit Tab */}
      {tab === 'submit' && (
        <div className="grading-content">
          {eligibleCards.length === 0 ? (
            <div className="grading-empty">
              <p>No cards eligible for grading.</p>
              <p className="grading-hint">Cards must be worth at least {formatMoney(MIN_VALUE_FOR_GRADING)}</p>
            </div>
          ) : (
            <div className="grading-list">
              {eligibleCards.map(card => {
                const cost = getGradingCost(card);
                const canAfford = money >= cost;
                return (
                  <div key={card.collectionId} className="grading-item">
                    <img
                      src={getSpriteUrl(card.spriteId, card.shiny)}
                      alt={card.name}
                      className="grading-sprite"
                    />
                    <div className="grading-item-info">
                      <span className="grading-item-name">{card.name}</span>
                      <span className="grading-item-value">{formatMoney(card.currentPrice)}</span>
                      {card.condition && (
                        <span className="grading-item-condition">{CONDITION_LABELS[card.condition]}</span>
                      )}
                    </div>
                    <Button
                      onClick={() => onSubmitForGrading(card)}
                      disabled={!canAfford}
                      variant="primary"
                    >
                      {formatMoney(cost)}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Pending Tab */}
      {tab === 'pending' && (
        <div className="grading-content">
          {gradingQueue.length === 0 ? (
            <div className="grading-empty">
              <p>No cards being graded.</p>
            </div>
          ) : (
            <div className="grading-list">
              {readyToCollect.map(submission => (
                <div key={submission.id} className="grading-item ready">
                  <img
                    src={getSpriteUrl(submission.card.spriteId, submission.card.shiny)}
                    alt={submission.card.name}
                    className="grading-sprite"
                  />
                  <div className="grading-item-info">
                    <span className="grading-item-name">{submission.card.name}</span>
                    <span className="grading-item-ready">Ready to open!</span>
                  </div>
                  <Button onClick={() => onCollectGradedCard(submission)} variant="success">
                    Open
                  </Button>
                </div>
              ))}
              {stillPending.map(submission => {
                const timeLeft = Math.max(0, submission.returnTime - gameTime);
                const progress = ((GRADING_TIME - timeLeft) / GRADING_TIME) * 100;
                return (
                  <div key={submission.id} className="grading-item pending">
                    <img
                      src={getSpriteUrl(submission.card.spriteId, submission.card.shiny)}
                      alt={submission.card.name}
                      className="grading-sprite"
                    />
                    <div className="grading-item-info">
                      <span className="grading-item-name">{submission.card.name}</span>
                      <div className="grading-progress">
                        <div className="grading-progress-bar" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="grading-item-time">{timeLeft}s</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Graded Tab */}
      {tab === 'graded' && (
        <div className="grading-content">
          {gradedCards.length === 0 ? (
            <div className="grading-empty">
              <p>No graded cards yet.</p>
            </div>
          ) : (
            <div className="grading-list">
              {gradedCards.map(card => (
                <div
                  key={card.collectionId}
                  className={`grading-item graded ${card.isForgery ? 'forgery' : ''}`}
                >
                  <img
                    src={getSpriteUrl(card.spriteId, card.shiny)}
                    alt={card.name}
                    className="grading-sprite"
                  />
                  <div className="grading-item-info">
                    <span className="grading-item-name">{card.name}</span>
                    <span className={`grading-grade ${card.isForgery ? 'forgery' : ''}`}>
                      {card.grade}
                    </span>
                  </div>
                  <div className="grading-item-value">
                    {card.isForgery ? (
                      <span className="forgery-text">Worthless</span>
                    ) : (
                      <span>{formatMoney(card.currentPrice * card.gradeMultiplier)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info box */}
      <div className="grading-info">
        <strong>How grading works:</strong>
        <ul>
          <li>Submit cards worth $50+ for professional grading</li>
          <li>Wait ~30 seconds for results</li>
          <li>Higher grades multiply card value (up to 3x)</li>
          <li>Warning: ~8% chance of forgery detection!</li>
        </ul>
      </div>
    </div>
  );
}
