import { useState, useEffect } from 'react';
import type { GradedCard } from '../types';
import { getSpriteUrl } from '../data';
import { formatMoney } from '../utils/format';
import { Button } from './Button';

interface EnvelopeModalProps {
  gradedCard: GradedCard;
  onClose: () => void;
}

export function EnvelopeModal({ gradedCard, onClose }: EnvelopeModalProps) {
  const [stage, setStage] = useState<'envelope' | 'opening' | 'reveal'>('envelope');
  const spriteUrl = getSpriteUrl(gradedCard.spriteId, gradedCard.shiny);
  const gradedValue = gradedCard.currentPrice * gradedCard.gradeMultiplier;

  useEffect(() => {
    if (stage === 'opening') {
      const timer = setTimeout(() => setStage('reveal'), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleOpen = () => {
    setStage('opening');
  };

  return (
    <div className="modal-overlay envelope-modal">
      <div className={`envelope-container ${stage}`}>
        {stage === 'envelope' && (
          <>
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="envelope-logo">PSA</div>
                <div className="envelope-text">Professional Sports Authenticator</div>
              </div>
            </div>
            <Button onClick={handleOpen} variant="primary">
              📧 Open Envelope
            </Button>
          </>
        )}

        {stage === 'opening' && (
          <div className="envelope opening">
            <div className="envelope-flap open"></div>
            <div className="envelope-body">
              <div className="opening-text">Opening...</div>
            </div>
          </div>
        )}

        {stage === 'reveal' && (
          <div className={`grade-reveal ${gradedCard.isForgery ? 'forgery' : ''}`}>
            {gradedCard.isForgery ? (
              <>
                <div className="reveal-icon">🚨</div>
                <h2 className="reveal-title forgery">FORGERY DETECTED!</h2>
                <div className="card-display forgery">
                  <img src={spriteUrl} alt={gradedCard.name} className="sprite" />
                </div>
                <div className="card-name">{gradedCard.name}</div>
                <p className="forgery-message">
                  This card has been identified as a counterfeit.
                  It has been confiscated and is worthless.
                </p>
                <div className="lesson-box forgery">
                  💡 LESSON: In the collectibles market, authentication is crucial.
                  Always buy from reputable sources to avoid costly forgeries.
                </div>
              </>
            ) : (
              <>
                <div className="reveal-icon">🏅</div>
                <h2 className="reveal-title">{gradedCard.grade}!</h2>
                <div className="card-display graded">
                  <div className="psa-slab">
                    <div className="slab-header">{gradedCard.grade}</div>
                    <img src={spriteUrl} alt={gradedCard.name} className="sprite" />
                  </div>
                </div>
                <div className="card-name">{gradedCard.name}</div>
                <div className="value-increase">
                  <span className="multiplier">{gradedCard.gradeMultiplier}x value!</span>
                  <span className="new-value">{formatMoney(gradedValue)}</span>
                </div>
                <div className="lesson-box">
                  💡 LESSON: Professionally graded cards command premium prices.
                  The grade provides buyer confidence and liquidity.
                </div>
              </>
            )}
            <Button onClick={onClose} variant={gradedCard.isForgery ? 'secondary' : 'success'}>
              {gradedCard.isForgery ? 'Accept Loss' : 'Collect Card'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
