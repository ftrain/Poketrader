import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Card, Appraiser, CardType } from '../types';
import { CARD_DATABASE, getSpriteUrl } from '../data';
import { formatMoney } from '../utils/format';
import { Button } from '../components/Button';

interface SpeedAppraisalGameProps {
  money: number;
  appraisers: Appraiser[];
  onStartGame: () => boolean; // Returns true if can start (has money)
  onWinGame: (specialty: CardType) => void;
  onTrainAppraiser: (appraiserId: number) => void;
}

const GAME_DURATION = 20; // seconds
const CARDS_TO_SORT = 5;

const CARD_TYPES: CardType[] = [
  'electric', 'fire', 'grass', 'water', 'psychic', 'dragon', 'dark', 'ghost'
];

export function SpeedAppraisalGame({
  money,
  appraisers,
  onStartGame,
  onWinGame,
  onTrainAppraiser
}: SpeedAppraisalGameProps) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [cards, setCards] = useState<Card[]>([]);
  const [userOrder, setUserOrder] = useState<number[]>([]); // Card IDs in user's order
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [specialtyType, setSpecialtyType] = useState<CardType>('electric');

  // Refs to track latest state for timer callback
  const cardsRef = useRef<Card[]>([]);
  const userOrderRef = useRef<number[]>([]);

  // Keep refs updated
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    userOrderRef.current = userOrder;
  }, [userOrder]);

  // Generate random cards for the game
  const generateCards = useCallback(() => {
    const shuffled = [...CARD_DATABASE]
      .filter(c => c.basePrice >= 10) // Only cards with meaningful values
      .sort(() => Math.random() - 0.5)
      .slice(0, CARDS_TO_SORT);

    // Ensure unique prices by adding small variations
    const withVariation = shuffled.map((card, i) => ({
      ...card,
      basePrice: card.basePrice + (Math.random() * 2 - 1) + i * 0.01 // Small unique variations
    }));

    // Randomize the specialty type for this game
    const randomType = CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
    setSpecialtyType(randomType);

    return withVariation;
  }, []);

  // Start a new game
  const startGame = useCallback(() => {
    if (!onStartGame()) return; // Check if player can afford to start

    const newCards = generateCards();
    setCards(newCards);
    // Shuffle the order for user to sort
    const shuffledIds = newCards.map(c => c.id).sort(() => Math.random() - 0.5);
    setUserOrder(shuffledIds);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  }, [generateCards, onStartGame]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          checkWin();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Check if order is correct (LOW to HIGH - least valuable first)
  const checkWin = useCallback(() => {
    // Use refs to get latest values, avoiding stale closure in timer
    const currentCards = cardsRef.current;
    const currentUserOrder = userOrderRef.current;

    // Correct order is LOW to HIGH (least valuable at top, most valuable at bottom)
    const correctOrder = [...currentCards].sort((a, b) => a.basePrice - b.basePrice).map(c => c.id);
    const isCorrect = currentUserOrder.length === correctOrder.length &&
      currentUserOrder.every((id, i) => id === correctOrder[i]);

    if (isCorrect) {
      setGameState('won');
      onWinGame(specialtyType);
    } else {
      setGameState('lost');
    }
  }, [onWinGame, specialtyType]);

  // Submit early
  const handleSubmit = useCallback(() => {
    checkWin();
  }, [checkWin]);

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    // Reorder
    const newOrder = [...userOrder];
    const [removed] = newOrder.splice(draggingIndex, 1);
    newOrder.splice(index, 0, removed);
    setUserOrder(newOrder);
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  // Move card up/down with buttons (mobile friendly)
  const moveCard = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === userOrder.length - 1) return;

    const newOrder = [...userOrder];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    setUserOrder(newOrder);
  };

  // Get card by ID
  const getCardById = (id: number) => cards.find(c => c.id === id);

  // Calculate training cost
  const getTrainingCost = (level: number) => Math.round(100 * Math.pow(1.5, level - 1));

  // Total appraiser income
  const totalAppraiserIncome = useMemo(() =>
    appraisers.reduce((sum, a) => sum + a.earnRate, 0),
    [appraisers]
  );

  return (
    <div className="speed-appraisal-view">
      <div className="view-header">
        <h2>⚡ Speed Appraisal</h2>
        <p className="view-description">
          Sort cards by value (LEAST to MOST valuable) to hire expert appraisers!
        </p>
      </div>

      {/* Appraiser Stats */}
      <div className="appraiser-stats">
        <div className="stat-box">
          <span className="stat-label">Appraisers</span>
          <span className="stat-value">{appraisers.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Total Income</span>
          <span className="stat-value income">+{formatMoney(totalAppraiserIncome)}/s</span>
        </div>
      </div>

      {/* Game Area */}
      {gameState === 'idle' && (
        <div className="game-start">
          <div className="game-rules">
            <h3>How to Play</h3>
            <ul>
              <li>🃏 You'll see {CARDS_TO_SORT} Pokemon cards</li>
              <li>📊 Drag them in order from LEAST to MOST valuable</li>
              <li>⏱️ You have {GAME_DURATION} seconds</li>
              <li>✅ Get it right to hire a new appraiser!</li>
              <li>💰 Entry fee: $50</li>
            </ul>
          </div>
          <Button
            onClick={startGame}
            variant="primary"
            disabled={money < 50}
          >
            {money < 50 ? 'Need $50 to play' : '🎮 Start Game ($50)'}
          </Button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-active">
          <div className="game-timer">
            <span className={timeLeft <= 5 ? 'timer-critical' : ''}>
              ⏱️ {timeLeft}s
            </span>
          </div>

          <div className="sort-instruction">
            Drag to sort: <strong>LOWEST</strong> value at TOP ↑, <strong>HIGHEST</strong> at BOTTOM ↓
          </div>

          <div className="card-sort-list">
            {userOrder.map((cardId, index) => {
              const card = getCardById(cardId);
              if (!card) return null;

              return (
                <div
                  key={cardId}
                  className={`sort-card ${draggingIndex === index ? 'dragging' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="sort-rank">{index + 1}</div>
                  <img
                    src={getSpriteUrl(card.spriteId, card.shiny)}
                    alt={card.name}
                    className="sort-sprite"
                  />
                  <div className="sort-name">{card.name}</div>
                  <div className="sort-buttons">
                    <button
                      onClick={() => moveCard(index, 'up')}
                      disabled={index === 0}
                      className="move-btn"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveCard(index, 'down')}
                      disabled={index === userOrder.length - 1}
                      className="move-btn"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleSubmit} variant="success">
            ✅ Submit Order
          </Button>
        </div>
      )}

      {gameState === 'won' && (
        <div className="game-result won">
          <div className="result-icon">🎉</div>
          <h3>Perfect Appraisal!</h3>
          <p>You correctly sorted all cards from least to most valuable!</p>
          <div className="correct-order">
            {[...cards].sort((a, b) => a.basePrice - b.basePrice).map((card, i) => (
              <div key={card.id} className="correct-card">
                <span className="correct-rank">{i + 1}.</span>
                <span className="correct-name">{card.name}</span>
                <span className="correct-price">{formatMoney(card.basePrice)}</span>
              </div>
            ))}
          </div>
          <div className="new-appraiser-notice">
            <span className="notice-icon">👔</span>
            <span>New {specialtyType}-type appraiser hired!</span>
          </div>
          <Button onClick={() => setGameState('idle')} variant="primary">
            Play Again
          </Button>
        </div>
      )}

      {gameState === 'lost' && (
        <div className="game-result lost">
          <div className="result-icon">😅</div>
          <h3>Not Quite!</h3>
          <p>The correct order (least to most valuable) was:</p>
          <div className="correct-order">
            {[...cards].sort((a, b) => a.basePrice - b.basePrice).map((card, i) => (
              <div key={card.id} className="correct-card">
                <span className="correct-rank">{i + 1}.</span>
                <span className="correct-name">{card.name}</span>
                <span className="correct-price">{formatMoney(card.basePrice)}</span>
              </div>
            ))}
          </div>
          <Button onClick={() => setGameState('idle')} variant="secondary">
            Try Again
          </Button>
        </div>
      )}

      {/* Appraiser Management */}
      {appraisers.length > 0 && (
        <div className="appraiser-management">
          <h3>👔 Your Appraisers</h3>
          <div className="appraiser-list">
            {appraisers.map(appraiser => {
              const trainingCost = getTrainingCost(appraiser.level);
              const canTrain = money >= trainingCost;

              return (
                <div key={appraiser.id} className="appraiser-card">
                  <div className="appraiser-info">
                    <div className="appraiser-name">{appraiser.name}</div>
                    <div className="appraiser-specialty">
                      {appraiser.specialty}-type specialist
                    </div>
                    <div className="appraiser-level">Level {appraiser.level}</div>
                    <div className="appraiser-earn">
                      +{formatMoney(appraiser.earnRate)}/s
                    </div>
                  </div>
                  <Button
                    onClick={() => onTrainAppraiser(appraiser.id)}
                    variant="secondary"
                    disabled={!canTrain}
                  >
                    Train ({formatMoney(trainingCost)})
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
