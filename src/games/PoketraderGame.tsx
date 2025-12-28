/**
 * PoketraderGame - React Component using JSON Game Engine
 *
 * This component uses the JSON game engine for state management while
 * managing complex card arrays and UI logic in React.
 *
 * Design:
 * - Engine handles: money, stats, flags, passive income, upgrades, events
 * - React handles: card arrays (collection, market), pack opening, grading, mini-games
 * - Communication: Engine emits events, React responds via callbacks
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useGameEngine } from '../engine/useGameEngine';
import { poketraderGame } from './poketrader';
import type {
  MarketCard,
  CollectionCard,
  GradingSubmission,
  GradedCard,
  GradeResult,
  Appraiser,
  CardType,
  CardCondition,
  Card,
  Notification,
  ClickEffect,
  ViewType,
  PackStats,
  PackType,
  Rarity
} from '../types';
import { CONDITION_MULTIPLIERS } from '../types';
import {
  CARD_DATABASE,
  ALL_PULLABLE_CARDS,
  generatePokemonMessage
} from '../data';
import type { MessageCategory } from '../data';
import {
  StatCard,
  EventBanner,
  ClickerButton,
  Navigation,
  Notifications,
  LessonModal,
  StartupModal,
  EnvelopeModal,
  AdvisorTip
} from '../components';
import {
  MarketView,
  PacksView,
  CollectionView,
  UpgradesView,
  LessonsView,
  PackOpeningModal,
  RulesView,
  GradingView,
  SpeedAppraisalGame
} from '../views';
import type { RuleEngineState } from '../engine';
import { formatMoney } from '../utils';
import {
  VERSION,
  getEventTips,
  getCollectionTips,
  getMarketTips,
  getStrategyTip
} from '../data';
import type { AdvisorTip as AdvisorTipType } from '../data';
import '../App.css';

// Constants
const RARE_PLUS: Rarity[] = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];
const APPRAISER_NAMES = [
  'Prof. Oak', 'Prof. Elm', 'Prof. Birch', 'Prof. Rowan',
  'Bill', 'Mr. Pokemon', 'Brock', 'Misty', 'Lt. Surge'
];

// Helper functions
function generateCondition(): CardCondition {
  const roll = Math.random();
  if (roll < 0.05) return 'mint';
  if (roll < 0.20) return 'near-mint';
  if (roll < 0.50) return 'excellent';
  if (roll < 0.75) return 'good';
  if (roll < 0.92) return 'fair';
  return 'poor';
}

function calculatePrice(card: Card, eventMultiplier: number, eventType: string): number {
  let price = card.basePrice;
  const volatility = 0.1 + (card.rarity === 'legendary' ? 0.2 : card.rarity === 'ultra-rare' ? 0.15 : 0.05);
  price *= (1 + (Math.random() - 0.5) * volatility);
  if (eventType && (eventType === 'all' || eventType === card.rarity || eventType === card.type)) {
    price *= eventMultiplier;
  }
  return Math.max(1, Math.round(price * 100) / 100);
}

interface PoketraderGameProps {
  onNavigateToHub: () => void;
}

export function PoketraderGame({ onNavigateToHub }: PoketraderGameProps) {
  // JSON Game Engine
  const game = useGameEngine(poketraderGame, { autoStart: true, autoLoad: true });

  // React-managed card state
  const [collection, setCollection] = useState<CollectionCard[]>([]);
  const [market, setMarket] = useState<MarketCard[]>([]);
  const [gradingQueue, setGradingQueue] = useState<GradingSubmission[]>([]);
  const [gradedCards, setGradedCards] = useState<GradedCard[]>([]);
  const [appraisers, setAppraisers] = useState<Appraiser[]>([]);

  // UI state
  const [view, setView] = useState<ViewType>('market');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [showLesson, setShowLesson] = useState<string | null>(null);
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());
  const [envelopeCard, setEnvelopeCard] = useState<GradedCard | null>(null);

  // Pack opening state
  const [packResults, setPackResults] = useState<CollectionCard[] | null>(null);
  const [revealedCards, setRevealedCards] = useState<CollectionCard[]>([]);
  const [isOpeningPack, setIsOpeningPack] = useState(false);
  const [packStats, setPackStats] = useState<PackStats>({ spent: 0, totalValue: 0, bestPull: null });

  // Combo system
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const lastClickTime = useRef(0);
  const comboResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ID counters
  const gradingIdCounter = useRef(1);
  const appraiserIdCounter = useRef(1);
  const collectionIdCounter = useRef(1);
  const marketIdCounter = useRef(1);

  // Refs for callbacks
  const collectionRef = useRef(collection);
  const marketRef = useRef(market);
  useEffect(() => { collectionRef.current = collection; }, [collection]);
  useEffect(() => { marketRef.current = market; }, [market]);

  // Derived state from engine
  const money = (game.state.money as number) || 0;
  const debt = (game.state.debt as number) || 0;
  const totalProfit = (game.state.totalProfit as number) || 0;
  const totalSold = (game.state.cardsSold as number) || 0;
  const capacity = (game.state.capacity as number) || 20;
  const marketSize = (game.state.marketSize as number) || 8;
  const clickPower = (game.state.clickPower as number) || 1;
  const passiveIncome = (game.state.passiveIncome as number) || 0;
  const discount = (game.state.discount as number) || 1;
  const sellBonus = (game.state.sellBonus as number) || 1;
  const packDiscount = (game.state.packDiscount as number) || 1;
  const critBonus = (game.state.critBonus as number) || 0;
  const packsOpened = (game.state.packsOpened as number) || 0;
  const gameTime = (game.state.gameTime as number) || 0;
  const longestHold = (game.state.longestHold as number) || 0;
  const hasChosenStarter = game.state.hasChosenStarter as boolean;
  const eventName = game.state.eventName as string;
  const eventMultiplier = (game.state.eventMultiplier as number) || 1;
  const eventAffectedType = game.state.eventAffectedType as string;
  const eventTicksRemaining = (game.state.eventTicksRemaining as number) || 0;
  const showGrading = game.state.showGrading as boolean;
  const showAppraisal = game.state.showAppraisal as boolean;
  const appraiserIncome = (game.state.appraiserIncome as number) || 0;

  // Calculate collection value
  const collectionValue = useMemo(() =>
    collection.reduce((sum, card) => sum + card.currentPrice, 0),
    [collection]
  );

  // Current market event object for UI
  const currentEvent = useMemo(() => {
    if (!eventName) return null;
    return {
      title: eventName,
      effect: eventAffectedType,
      multiplier: eventMultiplier,
      duration: Math.ceil(eventTicksRemaining / 10),
      lesson: ''
    };
  }, [eventName, eventAffectedType, eventMultiplier, eventTicksRemaining]);

  // Add notification helper
  const addNotification = useCallback((message: string, category?: MessageCategory) => {
    const id = Date.now();
    if (category) {
      const { advisor, message: pokemonMessage } = generatePokemonMessage(message, category);
      setNotifications(prev => [...prev, {
        id,
        message: pokemonMessage,
        advisor: { name: advisor.name, spriteId: advisor.spriteId, color: advisor.color }
      }]);
    } else {
      setNotifications(prev => [...prev, { id, message }]);
    }
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  }, []);

  // Refresh market
  const refreshMarket = useCallback(() => {
    const available = [...CARD_DATABASE]
      .sort(() => Math.random() - 0.5)
      .slice(0, marketSize)
      .map(card => {
        const condition = generateCondition();
        const conditionMult = CONDITION_MULTIPLIERS[condition];
        return {
          ...card,
          condition,
          currentPrice: calculatePrice(card, eventMultiplier, eventAffectedType) * conditionMult,
          marketId: marketIdCounter.current++,
          priceHistory: [] as number[]
        };
      });
    setMarket(available);
  }, [marketSize, eventMultiplier, eventAffectedType]);

  // Initialize market on start
  useEffect(() => {
    if (hasChosenStarter && market.length === 0) {
      refreshMarket();
    }
  }, [hasChosenStarter, refreshMarket, market.length]);

  // Market size change handler
  useEffect(() => {
    if (hasChosenStarter && market.length !== marketSize) {
      refreshMarket();
    }
  }, [marketSize, hasChosenStarter]);

  // Game tick effect - update prices
  useEffect(() => {
    if (!hasChosenStarter) return;

    const interval = setInterval(() => {
      // Update market prices
      setMarket(prev => prev.map(card => ({
        ...card,
        currentPrice: calculatePrice(card, eventMultiplier, eventAffectedType) * CONDITION_MULTIPLIERS[card.condition],
        priceHistory: [...(card.priceHistory || []).slice(-20), card.currentPrice]
      })));

      // Update collection prices and hold time
      setCollection(prev => prev.map(card => ({
        ...card,
        holdTime: (card.holdTime || 0) + 1,
        currentPrice: calculatePrice(card, eventMultiplier, eventAffectedType) * CONDITION_MULTIPLIERS[card.condition]
      })));

      // Update longest hold in engine
      const maxHold = Math.max(...collectionRef.current.map(c => c.holdTime || 0), 0);
      if (maxHold > (game.state.longestHold as number || 0)) {
        game.setState('longestHold', maxHold);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasChosenStarter, eventMultiplier, eventAffectedType, game]);

  // Handle engine events
  useEffect(() => {
    // Auto-sell check
    const handleAutoSell = () => {
      if (collectionRef.current.length === 0) return;
      const profitableCard = collectionRef.current.find(c =>
        c.currentPrice * sellBonus > c.purchasePrice * 1.1
      );
      if (profitableCard) {
        sellCard(profitableCard.collectionId);
        addNotification(`🏪 Auto-sold ${profitableCard.name}`, 'sale');
      }
    };

    // Auto-buy check
    const handleAutoBuy = () => {
      if (collectionRef.current.length >= capacity) return;
      const goodDeal = marketRef.current.find(c =>
        c.currentPrice < c.basePrice * 0.8 && c.currentPrice * discount <= money
      );
      if (goodDeal) {
        buyCard(goodDeal.marketId);
        addNotification(`📦 Auto-bought ${goodDeal.name}`, 'purchase');
      }
    };

    // Listen to engine messages for event triggers
    const lastMessage = game.messages[game.messages.length - 1];
    if (lastMessage) {
      if (lastMessage.text.includes('Auto-sell enabled')) {
        handleAutoSell();
      }
      if (lastMessage.text.includes('Auto-buy enabled')) {
        handleAutoBuy();
      }
    }
  }, [game.messages, sellBonus, capacity, money, discount]);

  // Grading queue processing
  useEffect(() => {
    const checkGrading = setInterval(() => {
      setGradingQueue(prev => {
        const completed = prev.filter(g => gameTime >= g.returnTime);
        const pending = prev.filter(g => gameTime < g.returnTime);

        // Process completed grading
        completed.forEach(submission => {
          const gradeRoll = Math.random();
          let grade: GradeResult;
          let gradeMultiplier: number;
          let isForgery = false;

          if (gradeRoll < 0.01) {
            grade = 'FORGERY';
            gradeMultiplier = 0;
            isForgery = true;
          } else if (gradeRoll < 0.05) {
            grade = 'PSA 10';
            gradeMultiplier = 5;
          } else if (gradeRoll < 0.20) {
            grade = 'PSA 9';
            gradeMultiplier = 3;
          } else if (gradeRoll < 0.45) {
            grade = 'PSA 8';
            gradeMultiplier = 2;
          } else if (gradeRoll < 0.70) {
            grade = 'PSA 7';
            gradeMultiplier = 1.5;
          } else {
            grade = 'PSA 6';
            gradeMultiplier = 1.2;
          }

          const gradedCard: GradedCard = {
            ...submission.card,
            grade,
            gradeMultiplier,
            isForgery,
            currentPrice: submission.card.currentPrice * gradeMultiplier
          };

          setGradedCards(cards => [...cards, gradedCard]);
          setEnvelopeCard(gradedCard);
          game.setState('hasGradedCard', true);
        });

        game.setState('gradingQueueSize', pending.length);
        return pending;
      });
    }, 1000);

    return () => clearInterval(checkGrading);
  }, [gameTime, game]);

  // Handle click
  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    lastClickTime.current = now;

    // Reset combo timer
    if (comboResetTimer.current) {
      clearTimeout(comboResetTimer.current);
    }

    // Build combo (clicks within 1s)
    let newComboCount = comboCount;
    let newMultiplier = comboMultiplier;

    if (timeSinceLastClick < 1000) {
      newComboCount = Math.min(comboCount + 1, 20);
      newMultiplier = 1 + (newComboCount * 0.1);
    } else {
      newComboCount = 1;
      newMultiplier = 1;
    }

    setComboCount(newComboCount);
    setComboMultiplier(newMultiplier);

    // Start combo decay timer
    comboResetTimer.current = setTimeout(() => {
      setComboCount(0);
      setComboMultiplier(1);
    }, 2000);

    // Calculate earnings
    const basePower = clickPower;
    const isCrit = Math.random() < (0.05 + critBonus);
    const critMult = isCrit ? 3 : 1;
    const earnings = Math.round(basePower * newMultiplier * critMult * 100) / 100;

    // Update engine state
    game.setState('money', money + earnings);
    game.setState('totalEarned', (game.state.totalEarned as number || 0) + earnings);
    game.playerAction('recordClick');

    // Show click effect
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const effect: ClickEffect = {
      id: now,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      value: earnings,
      isCombo: newComboCount > 1,
      isCritical: isCrit,
      comboLevel: newComboCount
    };
    setClickEffects(prev => [...prev, effect]);
    setTimeout(() => setClickEffects(prev => prev.filter(ef => ef.id !== effect.id)), 1000);
  }, [comboCount, comboMultiplier, clickPower, critBonus, money, game]);

  // Buy card from market
  const buyCard = useCallback((cardOrId: MarketCard | number) => {
    const marketId = typeof cardOrId === 'number' ? cardOrId : cardOrId.marketId;
    const card = typeof cardOrId === 'number' ? market.find(c => c.marketId === marketId) : cardOrId;
    if (!card) return;

    const price = Math.round(card.currentPrice * discount * 100) / 100;
    if (money < price) {
      addNotification('Not enough money!', 'warning');
      return;
    }
    if (collection.length >= capacity) {
      addNotification('Collection full!', 'warning');
      return;
    }

    const collectionCard: CollectionCard = {
      ...card,
      collectionId: collectionIdCounter.current++,
      purchasePrice: price,
      purchaseTime: gameTime,
      holdTime: 0
    };

    setCollection(prev => [...prev, collectionCard]);
    setMarket(prev => prev.filter(c => c.marketId !== marketId));
    game.setState('money', money - price);
    game.setState('totalSpent', (game.state.totalSpent as number || 0) + price);
    game.playerAction('recordBuy');

    addNotification(`Bought ${card.name}!`, 'purchase');
  }, [market, money, discount, collection.length, capacity, gameTime, game, addNotification]);

  // Sell card from collection
  const sellCard = useCallback((cardOrId: CollectionCard | number) => {
    const collectionId = typeof cardOrId === 'number' ? cardOrId : cardOrId.collectionId;
    const card = typeof cardOrId === 'number' ? collection.find(c => c.collectionId === collectionId) : cardOrId;
    if (!card) return;

    const sellPrice = Math.round(card.currentPrice * sellBonus * 100) / 100;
    const profit = sellPrice - card.purchasePrice;

    // Handle debt payment (20% of profit)
    let netEarnings = sellPrice;
    if (debt > 0 && profit > 0) {
      const debtPayment = Math.min(debt, profit * 0.2);
      netEarnings = sellPrice - debtPayment;
      game.setState('debt', debt - debtPayment);
    }

    setCollection(prev => prev.filter(c => c.collectionId !== collectionId));
    game.setState('money', money + netEarnings);
    game.setState('totalEarned', (game.state.totalEarned as number || 0) + Math.max(0, profit));
    game.setState('totalProfit', (game.state.totalProfit as number || 0) + profit);
    if (sellPrice > (game.state.highestSale as number || 0)) {
      game.setState('highestSale', sellPrice);
    }
    game.playerAction('recordSell');

    addNotification(`Sold ${card.name} for ${formatMoney(sellPrice)}!`, 'sale');
  }, [collection, sellBonus, debt, money, game, addNotification]);

  // Batch sell
  const batchSellCards = useCallback((cardsOrIds: CollectionCard[] | number[]) => {
    cardsOrIds.forEach(item => sellCard(item as CollectionCard | number));
  }, [sellCard]);

  // Open pack
  const openPack = useCallback((packType: PackType) => {
    const price = Math.round(packType.price * packDiscount * 100) / 100;
    if (money < price) {
      addNotification('Not enough money!', 'warning');
      return;
    }
    if (collection.length + packType.cardCount > capacity) {
      addNotification('Not enough space!', 'warning');
      return;
    }

    game.setState('money', money - price);
    game.setState('totalSpent', (game.state.totalSpent as number || 0) + price);

    // Generate cards
    const pulledCards: CollectionCard[] = [];
    let guaranteedRare = packType.guaranteedRare;
    let guaranteedUltraRare = packType.guaranteedUltraRare;

    for (let i = 0; i < packType.cardCount; i++) {
      let rarity: Rarity;
      const roll = Math.random();
      let cumulative = 0;

      // Force guaranteed pulls on last card if needed
      if (i === packType.cardCount - 1) {
        if (guaranteedUltraRare) {
          rarity = 'ultra-rare';
        } else if (guaranteedRare) {
          rarity = 'rare';
        } else {
          for (const [r, rate] of Object.entries(packType.pullRates)) {
            cumulative += rate;
            if (roll < cumulative) {
              rarity = r as Rarity;
              break;
            }
          }
          rarity = rarity! || 'common';
        }
      } else {
        for (const [r, rate] of Object.entries(packType.pullRates)) {
          cumulative += rate;
          if (roll < cumulative) {
            rarity = r as Rarity;
            break;
          }
        }
        rarity = rarity! || 'common';
      }

      // Check if guaranteed has been satisfied
      if (RARE_PLUS.includes(rarity)) guaranteedRare = false;
      if (['ultra-rare', 'secret-rare', 'legendary', 'chase'].includes(rarity)) guaranteedUltraRare = false;

      // Get random card of rarity
      const pool = ALL_PULLABLE_CARDS.filter(c => c.rarity === rarity);
      const card = pool[Math.floor(Math.random() * pool.length)] || CARD_DATABASE[0];
      const condition = generateCondition();

      const collectionCard: CollectionCard = {
        ...card,
        condition,
        collectionId: collectionIdCounter.current++,
        currentPrice: card.basePrice * CONDITION_MULTIPLIERS[condition],
        purchasePrice: 0,
        purchaseTime: gameTime,
        holdTime: 0,
        fromPack: packType.id
      };

      pulledCards.push(collectionCard);
    }

    setPackResults(pulledCards);
    setRevealedCards([]);
    setIsOpeningPack(true);
    game.playerAction('recordPackOpen');

    // Update pack stats
    const totalValue = pulledCards.reduce((sum, c) => sum + c.currentPrice, 0);
    const bestPull = pulledCards.reduce((best, c) =>
      c.basePrice > (best?.basePrice || 0) ? c : best, packStats.bestPull);
    setPackStats(prev => ({
      spent: prev.spent + price,
      totalValue: prev.totalValue + totalValue,
      bestPull
    }));
  }, [money, packDiscount, collection.length, capacity, gameTime, game, addNotification, packStats]);

  // Close pack results and add to collection
  const closePackResults = useCallback(() => {
    if (packResults) {
      setCollection(prev => [...prev, ...packResults]);
    }
    setPackResults(null);
    setIsOpeningPack(false);
    setRevealedCards([]);
  }, [packResults]);

  // Submit for grading
  const submitForGrading = useCallback((cardOrId: CollectionCard | number) => {
    const collectionId = typeof cardOrId === 'number' ? cardOrId : cardOrId.collectionId;
    const card = typeof cardOrId === 'number' ? collection.find(c => c.collectionId === collectionId) : cardOrId;
    if (!card) return;

    const gradingCost = 50;
    if (money < gradingCost) {
      addNotification('Need $50 for grading!', 'warning');
      return;
    }

    game.setState('money', money - gradingCost);
    setCollection(prev => prev.filter(c => c.collectionId !== collectionId));

    const submission: GradingSubmission = {
      id: gradingIdCounter.current++,
      card,
      submittedAt: gameTime,
      returnTime: gameTime + 60, // 60 seconds
      cost: gradingCost
    };

    setGradingQueue(prev => [...prev, submission]);
    game.setState('gradingQueueSize', gradingQueue.length + 1);
    addNotification(`Submitted ${card.name} for grading`, 'purchase');
  }, [collection, money, gameTime, game, gradingQueue.length, addNotification]);

  // Collect graded card
  const collectGradedCard = useCallback((submissionOrId: GradingSubmission | number) => {
    // If a submission is passed, get the card from gradedCards by matching the submission's card
    const cardId = typeof submissionOrId === 'number'
      ? submissionOrId
      : submissionOrId.card.collectionId;

    const card = gradedCards.find(c => c.collectionId === cardId);
    if (!card) return;

    if (!card.isForgery) {
      setCollection(prev => [...prev, card]);
    }
    setGradedCards(prev => prev.filter(c => c.collectionId !== cardId));
  }, [gradedCards]);

  // Speed Appraisal game handlers
  const startAppraisalGame = useCallback(() => {
    if (money < 50) return false;
    game.setState('money', money - 50);
    return true;
  }, [money, game]);

  const winAppraisalGame = useCallback((specialty: CardType) => {
    const name = APPRAISER_NAMES[Math.floor(Math.random() * APPRAISER_NAMES.length)];
    const appraiser: Appraiser = {
      id: appraiserIdCounter.current++,
      name,
      level: 1,
      experience: 0,
      specialty,
      earnRate: 1
    };
    setAppraisers(prev => [...prev, appraiser]);
    game.setState('appraiserCount', appraisers.length + 1);
    game.setState('appraiserIncome', appraiserIncome + 1);
    addNotification(`Hired ${name}!`, 'achievement');
  }, [appraisers.length, appraiserIncome, game, addNotification]);

  const trainAppraiser = useCallback((appraiserId: number) => {
    const appraiser = appraisers.find(a => a.id === appraiserId);
    if (!appraiser) return;

    const cost = Math.round(100 * Math.pow(1.5, appraiser.level - 1));
    if (money < cost) return;

    game.setState('money', money - cost);
    setAppraisers(prev => prev.map(a => {
      if (a.id !== appraiserId) return a;
      const newEarnRate = a.earnRate + 0.5;
      return { ...a, level: a.level + 1, earnRate: newEarnRate };
    }));

    // Update total appraiser income
    const newTotalIncome = appraisers.reduce((sum, a) =>
      sum + (a.id === appraiserId ? a.earnRate + 0.5 : a.earnRate), 0);
    game.setState('appraiserIncome', newTotalIncome);
  }, [appraisers, money, game]);

  // Buy upgrade handler for legacy upgrade view
  const buyUpgrade = useCallback((upgradeId: number) => {
    game.purchaseProject(`upgrade-${upgradeId}`);
  }, [game]);

  // Get owned upgrades for legacy view
  const ownedUpgrades = useMemo(() => {
    const owned: number[] = [];
    for (let i = 1; i <= 64; i++) {
      if (game.state[`upgrade_${i}`]) {
        owned.push(i);
      }
    }
    return owned;
  }, [game.state]);

  // Achievements
  const achievements = useMemo(() => {
    const earned: number[] = [];
    for (let i = 1; i <= 12; i++) {
      if (game.state[`achievement_${i}`]) {
        earned.push(i);
      }
    }
    return earned;
  }, [game.state]);

  // Advisor tips
  const currentTip = useMemo((): AdvisorTipType | null => {
    const eventTip = getEventTips(currentEvent as any);
    if (eventTip && !dismissedTips.has(eventTip.id)) return eventTip;

    const collectionTip = getCollectionTips(collection, money, currentEvent as any);
    if (collectionTip && !dismissedTips.has(collectionTip.id)) return collectionTip;

    const marketTip = getMarketTips(market, money, collection);
    if (marketTip && !dismissedTips.has(marketTip.id)) return marketTip;

    const strategyTip = getStrategyTip(totalSold, packsOpened);
    if (strategyTip && !dismissedTips.has(strategyTip.id)) return strategyTip;

    return null;
  }, [currentEvent, collection, money, market, totalSold, packsOpened, dismissedTips]);

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => new Set([...prev, tipId]));
    setTimeout(() => {
      setDismissedTips(prev => {
        const next = new Set(prev);
        next.delete(tipId);
        return next;
      });
    }, 60000);
  };

  // Pay debt helper
  const payDebt = useCallback((amount: number) => {
    if (money < amount) return;
    const payment = Math.min(debt, amount);
    game.setState('money', money - payment);
    game.setState('debt', debt - payment);
  }, [money, debt, game]);

  // Reset game
  const resetGame = useCallback(() => {
    game.reset();
    setCollection([]);
    setMarket([]);
    setGradingQueue([]);
    setGradedCards([]);
    setAppraisers([]);
    setPackStats({ spent: 0, totalValue: 0, bestPull: null });
    setView('market');
  }, [game]);

  // Show startup modal if no path chosen
  if (!hasChosenStarter) {
    return (
      <div className="app">
        <button className="back-to-hub" onClick={onNavigateToHub}>
          ← Back to Hub
        </button>
        <StartupModal onChoosePath={(path) => game.playerAction(`choose${path.charAt(0).toUpperCase() + path.slice(1)}`)} />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div>
          <span className="terminal-title">POKE-TERMINAL v{VERSION}</span>
          <span className="terminal-subtitle">Pokemon Trading Economics Simulator</span>
        </div>
        <div className="header-buttons">
          <button className="hub-btn" onClick={onNavigateToHub} title="Back to Game Hub">
            🎮
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              if (window.confirm('Reset game? All progress will be lost!')) {
                resetGame();
              }
            }}
          >
            ↺
          </button>
        </div>
      </div>

      {/* Debt Banner */}
      {debt > 0 && (
        <div
          className="debt-banner"
          onClick={() => payDebt(50)}
          style={{ cursor: money >= 50 ? 'pointer' : 'default' }}
        >
          <span className="debt-label">Debt: {formatMoney(debt)}</span>
          {money >= 50 && (
            <button className="debt-pay-btn">Pay $50</button>
          )}
          <span className="debt-info">20% auto-pay</span>
        </div>
      )}

      {/* Header Stats */}
      <div className="stats-grid">
        <StatCard
          icon="💰"
          label="Balance"
          value={formatMoney(money)}
          color="#4caf50"
        />
        <StatCard
          icon="📈"
          label="Total Profit"
          value={`${totalProfit >= 0 ? '+' : ''}${formatMoney(totalProfit)}`}
          color={totalProfit >= 0 ? '#4caf50' : '#f44336'}
        />
        <StatCard
          icon="🃏"
          label="Collection"
          value={formatMoney(collectionValue)}
          subtext={`${capacity - collection.length} slots free`}
          color="#9c27b0"
        />
        <StatCard
          icon="⚡"
          label="Per Click"
          value={`$${clickPower}`}
          color="#ff9800"
        />
      </div>

      {/* Market Event Banner */}
      {currentEvent && (
        <EventBanner
          event={currentEvent as any}
          timer={Math.ceil(eventTicksRemaining / 10)}
          onClick={() => setShowLesson(currentEvent.title)}
        />
      )}

      {/* Advisor Tip */}
      {currentTip && (
        <AdvisorTip
          tip={currentTip}
          onDismiss={() => dismissTip(currentTip.id)}
        />
      )}

      {/* Clicker Button */}
      <ClickerButton
        clickPower={clickPower}
        clickEffects={clickEffects}
        comboCount={comboCount}
        comboMultiplier={comboMultiplier}
        onClick={handleClick}
      />

      {/* Navigation Tabs */}
      <Navigation
        currentView={view}
        onViewChange={setView}
        showGrading={showGrading || totalSold >= 5 || collection.some(c => c.currentPrice >= 50)}
        showGame={showAppraisal || totalSold >= 3}
      />

      {/* Views */}
      {view === 'market' && (
        <MarketView
          market={market}
          money={money}
          discount={discount}
          collectionSize={collection.length}
          capacity={capacity}
          onBuyCard={buyCard}
          onRefresh={refreshMarket}
        />
      )}

      {view === 'packs' && (
        <PacksView
          money={money}
          packsOpened={packsOpened}
          packStats={packStats}
          collectionSize={collection.length}
          capacity={capacity}
          onOpenPack={openPack}
        />
      )}

      {view === 'collection' && (
        <CollectionView
          collection={collection}
          sellBonus={sellBonus}
          onSellCard={sellCard}
          onBatchSell={batchSellCards}
        />
      )}

      {view === 'grading' && (
        <GradingView
          collection={collection}
          gradingQueue={gradingQueue}
          gradedCards={gradedCards}
          money={money}
          gameTime={gameTime}
          onSubmitForGrading={submitForGrading}
          onCollectGradedCard={collectGradedCard}
        />
      )}

      {view === 'appraisal' && (
        <SpeedAppraisalGame
          money={money}
          appraisers={appraisers}
          onStartGame={startAppraisalGame}
          onWinGame={winAppraisalGame}
          onTrainAppraiser={trainAppraiser}
        />
      )}

      {view === 'upgrades' && (
        <UpgradesView
          money={money}
          ownedUpgrades={ownedUpgrades}
          onBuyUpgrade={buyUpgrade}
        />
      )}

      {view === 'lessons' && (
        <LessonsView unlockedAchievements={achievements} />
      )}

      {view === 'rules' && (
        <RulesView
          gameState={{
            money,
            collection,
            totalSold,
            totalProfit,
            longestHold,
            packsOpened,
            packStats,
            market,
            currentEvent,
            eventTimer: Math.ceil(eventTicksRemaining / 10),
            gameTime,
            upgrades: ownedUpgrades,
            clickPower,
            passiveIncome: passiveIncome + appraiserIncome,
            discount,
            sellBonus,
            capacity
          } as RuleEngineState}
        />
      )}

      {/* Pack Opening Modal */}
      {isOpeningPack && packResults && (
        <PackOpeningModal
          packResults={packResults}
          revealedCards={revealedCards}
          onClose={closePackResults}
        />
      )}

      {/* Lesson Modal */}
      {showLesson && (
        <LessonModal
          lesson={showLesson}
          onClose={() => setShowLesson(null)}
        />
      )}

      {/* Envelope Modal for Grading Results */}
      {envelopeCard && (
        <EnvelopeModal
          gradedCard={envelopeCard}
          onClose={() => setEnvelopeCard(null)}
        />
      )}

      {/* Notifications */}
      <Notifications notifications={notifications} />
    </div>
  );
}

export default PoketraderGame;
