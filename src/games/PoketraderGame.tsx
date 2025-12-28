/**
 * PoketraderGame - React Component using JSON Game Engine with Entities
 *
 * All game state is stored in the engine:
 * - Scalar values (money, stats, flags) in engine state
 * - Card arrays stored as entities in the engine
 * - React is purely a rendering layer
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useGameEngine } from '../engine/useGameEngine';
import { poketraderGame } from './poketrader';
import type {
  CardType,
  CardCondition,
  Notification,
  ClickEffect,
  ViewType,
  PackStats,
  PackType,
  Rarity,
  GradeResult
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
import type { SpawnedEntity } from '../engine/types';
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

function calculatePrice(basePrice: number, rarity: string, type: string, eventMultiplier: number, eventType: string): number {
  let price = basePrice;
  const volatility = 0.1 + (rarity === 'legendary' ? 0.2 : rarity === 'ultra-rare' ? 0.15 : 0.05);
  price *= (1 + (Math.random() - 0.5) * volatility);
  if (eventType && (eventType === 'all' || eventType === rarity || eventType === type)) {
    price *= eventMultiplier;
  }
  return Math.max(1, Math.round(price * 100) / 100);
}

// Convert entity to card format for views
function entityToMarketCard(entity: SpawnedEntity) {
  const p = entity.properties;
  return {
    id: Number(p.cardId) || 0,
    marketId: entity.id,
    name: String(p.name || ''),
    rarity: String(p.rarity || 'common') as Rarity,
    type: String(p.cardType || 'normal') as CardType,
    basePrice: Number(p.basePrice) || 0,
    currentPrice: Number(p.currentPrice) || 0,
    condition: String(p.condition || 'good') as CardCondition,
    spriteId: Number(p.spriteId) || 1,
    shiny: Boolean(p.shiny),
    priceHistory: [] as number[],
    img: '',
    hp: 0,
    attack: 0,
    defense: 0
  };
}

function entityToCollectionCard(entity: SpawnedEntity) {
  const p = entity.properties;
  return {
    id: Number(p.cardId) || 0,
    collectionId: entity.id,
    name: String(p.name || ''),
    rarity: String(p.rarity || 'common') as Rarity,
    type: String(p.cardType || 'normal') as CardType,
    basePrice: Number(p.basePrice) || 0,
    currentPrice: Number(p.currentPrice) || 0,
    condition: String(p.condition || 'good') as CardCondition,
    spriteId: Number(p.spriteId) || 1,
    shiny: Boolean(p.shiny),
    purchasePrice: Number(p.purchasePrice) || 0,
    purchaseTime: Number(p.purchaseTime) || 0,
    holdTime: Number(p.holdTime) || 0,
    fromPack: p.fromPack ? String(p.fromPack) : undefined,
    img: '',
    hp: 0,
    attack: 0,
    defense: 0
  };
}

function entityToGradingSubmission(entity: SpawnedEntity) {
  const p = entity.properties;
  return {
    id: entity.id,
    card: {
      id: Number(p.cardId) || 0,
      collectionId: entity.id,
      name: String(p.name || ''),
      rarity: String(p.rarity || 'common') as Rarity,
      type: String(p.cardType || 'normal') as CardType,
      basePrice: Number(p.basePrice) || 0,
      currentPrice: Number(p.currentPrice) || 0,
      condition: String(p.condition || 'good') as CardCondition,
      spriteId: Number(p.spriteId) || 1,
      shiny: Boolean(p.shiny),
      purchasePrice: Number(p.purchasePrice) || 0,
      purchaseTime: Number(p.purchaseTime) || 0,
      holdTime: Number(p.holdTime) || 0,
      img: '',
      hp: 0,
      attack: 0,
      defense: 0
    },
    submittedAt: Number(p.submittedAt) || 0,
    returnTime: Number(p.returnTime) || 0,
    cost: Number(p.cost) || 50
  };
}

function entityToGradedCard(entity: SpawnedEntity) {
  const p = entity.properties;
  return {
    id: Number(p.cardId) || 0,
    collectionId: entity.id,
    name: String(p.name || ''),
    rarity: String(p.rarity || 'common') as Rarity,
    type: String(p.cardType || 'normal') as CardType,
    basePrice: Number(p.basePrice) || 0,
    currentPrice: Number(p.currentPrice) || 0,
    condition: String(p.condition || 'good') as CardCondition,
    spriteId: Number(p.spriteId) || 1,
    shiny: Boolean(p.shiny),
    purchasePrice: Number(p.purchasePrice) || 0,
    purchaseTime: Number(p.purchaseTime) || 0,
    holdTime: Number(p.holdTime) || 0,
    grade: String(p.grade || 'PSA 7') as GradeResult,
    gradeMultiplier: Number(p.gradeMultiplier) || 1,
    isForgery: Boolean(p.isForgery),
    img: '',
    hp: 0,
    attack: 0,
    defense: 0
  };
}

function entityToAppraiser(entity: SpawnedEntity) {
  const p = entity.properties;
  return {
    id: entity.id,
    name: String(p.name || 'Appraiser'),
    level: Number(p.level) || 1,
    experience: Number(p.experience) || 0,
    specialty: String(p.specialty || 'normal') as CardType,
    earnRate: Number(p.earnRate) || 1
  };
}

interface PoketraderGameProps {
  onNavigateToHub: () => void;
}

export function PoketraderGame({ onNavigateToHub }: PoketraderGameProps) {
  // JSON Game Engine with entities
  const game = useGameEngine(poketraderGame, { autoStart: true, autoLoad: true });

  // UI state only (not game data)
  const [view, setView] = useState<ViewType>('market');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [showLesson, setShowLesson] = useState<string | null>(null);
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());
  const [envelopeCard, setEnvelopeCard] = useState<ReturnType<typeof entityToGradedCard> | null>(null);

  // Pack opening UI state
  const [packResults, setPackResults] = useState<ReturnType<typeof entityToCollectionCard>[] | null>(null);
  const [revealedCards, setRevealedCards] = useState<ReturnType<typeof entityToCollectionCard>[]>([]);
  const [isOpeningPack, setIsOpeningPack] = useState(false);
  const [packStats, setPackStats] = useState<PackStats>({ spent: 0, totalValue: 0, bestPull: null });

  // Combo system
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const lastClickTime = useRef(0);
  const comboResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Derive cards from entities
  const marketCards = useMemo(() =>
    game.entities.filter(e => e.type === 'marketCard').map(entityToMarketCard),
    [game.entities]
  );

  const collection = useMemo(() =>
    game.entities.filter(e => e.type === 'collectionCard').map(entityToCollectionCard),
    [game.entities]
  );

  const gradingQueue = useMemo(() =>
    game.entities.filter(e => e.type === 'gradingCard').map(entityToGradingSubmission),
    [game.entities]
  );

  const gradedCards = useMemo(() =>
    game.entities.filter(e => e.type === 'gradedCard').map(entityToGradedCard),
    [game.entities]
  );

  const appraisers = useMemo(() =>
    game.entities.filter(e => e.type === 'appraiser').map(entityToAppraiser),
    [game.entities]
  );

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

  // Spawn market cards
  const refreshMarket = useCallback(() => {
    // Clear existing market cards
    game.entities.filter(e => e.type === 'marketCard').forEach(e => game.removeEntity(e.id));

    // Spawn new market cards
    const available = [...CARD_DATABASE]
      .sort(() => Math.random() - 0.5)
      .slice(0, marketSize);

    available.forEach(card => {
      const condition = generateCondition();
      const conditionMult = CONDITION_MULTIPLIERS[condition];
      const currentPrice = calculatePrice(card.basePrice, card.rarity, card.type, eventMultiplier, eventAffectedType) * conditionMult;

      game.spawnEntity('marketCard', {
        cardId: card.id,
        name: card.name,
        rarity: card.rarity,
        cardType: card.type,
        basePrice: card.basePrice,
        currentPrice,
        condition,
        spriteId: card.spriteId,
        shiny: card.shiny || false
      });
    });
  }, [game, marketSize, eventMultiplier, eventAffectedType]);

  // Initialize market on start
  useEffect(() => {
    if (hasChosenStarter && marketCards.length === 0) {
      refreshMarket();
    }
  }, [hasChosenStarter, refreshMarket, marketCards.length]);

  // Market size change handler
  useEffect(() => {
    if (hasChosenStarter && marketCards.length !== marketSize && marketCards.length > 0) {
      refreshMarket();
    }
  }, [marketSize, hasChosenStarter, marketCards.length, refreshMarket]);

  // Game tick effect - update prices
  useEffect(() => {
    if (!hasChosenStarter) return;

    const interval = setInterval(() => {
      // Update market card prices
      game.entities.filter(e => e.type === 'marketCard').forEach(entity => {
        const p = entity.properties;
        const newPrice = calculatePrice(
          Number(p.basePrice),
          String(p.rarity),
          String(p.cardType),
          eventMultiplier,
          eventAffectedType
        ) * CONDITION_MULTIPLIERS[String(p.condition) as CardCondition];
        game.modifyEntity(entity.id, { currentPrice: newPrice });
      });

      // Update collection card prices and hold time
      game.entities.filter(e => e.type === 'collectionCard').forEach(entity => {
        const p = entity.properties;
        const newHoldTime = (Number(p.holdTime) || 0) + 1;
        const newPrice = calculatePrice(
          Number(p.basePrice),
          String(p.rarity),
          String(p.cardType),
          eventMultiplier,
          eventAffectedType
        ) * CONDITION_MULTIPLIERS[String(p.condition) as CardCondition];
        game.modifyEntity(entity.id, {
          holdTime: newHoldTime,
          currentPrice: newPrice
        });
      });

      // Update longest hold in engine
      const collectionEntities = game.entities.filter(e => e.type === 'collectionCard');
      const maxHold = Math.max(...collectionEntities.map(e => Number(e.properties.holdTime) || 0), 0);
      if (maxHold > longestHold) {
        game.setState('longestHold', maxHold);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasChosenStarter, eventMultiplier, eventAffectedType, game, longestHold]);

  // Grading queue processing
  useEffect(() => {
    const checkGrading = setInterval(() => {
      const gradingEntities = game.entities.filter(e => e.type === 'gradingCard');

      gradingEntities.forEach(entity => {
        const returnTime = Number(entity.properties.returnTime) || 0;
        if (gameTime >= returnTime) {
          // Process completed grading
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

          const p = entity.properties;
          const gradedPrice = Number(p.currentPrice) * gradeMultiplier;

          // Spawn graded card entity
          game.spawnEntity('gradedCard', {
            ...p,
            grade,
            gradeMultiplier,
            isForgery,
            currentPrice: gradedPrice
          });

          // Remove from grading queue
          game.removeEntity(entity.id);

          // Set envelope card for modal
          setEnvelopeCard({
            id: Number(p.cardId) || 0,
            collectionId: entity.id,
            name: String(p.name || ''),
            rarity: String(p.rarity || 'common') as Rarity,
            type: String(p.cardType || 'normal') as CardType,
            basePrice: Number(p.basePrice) || 0,
            currentPrice: gradedPrice,
            condition: String(p.condition || 'good') as CardCondition,
            spriteId: Number(p.spriteId) || 1,
            shiny: Boolean(p.shiny),
            purchasePrice: Number(p.purchasePrice) || 0,
            purchaseTime: Number(p.purchaseTime) || 0,
            holdTime: Number(p.holdTime) || 0,
            grade,
            gradeMultiplier,
            isForgery,
            img: '',
            hp: 0,
            attack: 0,
            defense: 0
          });

          game.setState('hasGradedCard', true);
        }
      });

      const remaining = game.entities.filter(e => e.type === 'gradingCard').length;
      game.setState('gradingQueueSize', remaining);
    }, 1000);

    return () => clearInterval(checkGrading);
  }, [gameTime, game]);

  // Handle click
  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    lastClickTime.current = now;

    if (comboResetTimer.current) {
      clearTimeout(comboResetTimer.current);
    }

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

    comboResetTimer.current = setTimeout(() => {
      setComboCount(0);
      setComboMultiplier(1);
    }, 2000);

    const basePower = clickPower;
    const isCrit = Math.random() < (0.05 + critBonus);
    const critMult = isCrit ? 3 : 1;
    const earnings = Math.round(basePower * newMultiplier * critMult * 100) / 100;

    game.setState('money', money + earnings);
    game.setState('totalEarned', (game.state.totalEarned as number || 0) + earnings);
    game.playerAction('recordClick');

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
  const buyCard = useCallback((cardOrId: ReturnType<typeof entityToMarketCard> | string) => {
    const marketId = typeof cardOrId === 'string' ? cardOrId : cardOrId.marketId;
    const entity = game.entities.find(e => e.id === marketId && e.type === 'marketCard');
    if (!entity) return;

    const currentPrice = Number(entity.properties.currentPrice) || 0;
    const price = Math.round(currentPrice * discount * 100) / 100;

    if (money < price) {
      addNotification('Not enough money!', 'warning');
      return;
    }
    if (collection.length >= capacity) {
      addNotification('Collection full!', 'warning');
      return;
    }

    // Spawn collection card
    game.spawnEntity('collectionCard', {
      ...entity.properties,
      purchasePrice: price,
      purchaseTime: gameTime,
      holdTime: 0
    });

    // Remove from market
    game.removeEntity(marketId);

    game.setState('money', money - price);
    game.setState('totalSpent', (game.state.totalSpent as number || 0) + price);
    game.playerAction('recordBuy');

    addNotification(`Bought ${entity.properties.name}!`, 'purchase');
  }, [game, money, discount, collection.length, capacity, gameTime, addNotification]);

  // Sell card from collection
  const sellCard = useCallback((cardOrId: ReturnType<typeof entityToCollectionCard> | string) => {
    const collectionId = typeof cardOrId === 'string' ? cardOrId : cardOrId.collectionId;
    const entity = game.entities.find(e => e.id === collectionId && e.type === 'collectionCard');
    if (!entity) return;

    const currentPrice = Number(entity.properties.currentPrice) || 0;
    const purchasePrice = Number(entity.properties.purchasePrice) || 0;
    const sellPrice = Math.round(currentPrice * sellBonus * 100) / 100;
    const profit = sellPrice - purchasePrice;

    let netEarnings = sellPrice;
    if (debt > 0 && profit > 0) {
      const debtPayment = Math.min(debt, profit * 0.2);
      netEarnings = sellPrice - debtPayment;
      game.setState('debt', debt - debtPayment);
    }

    game.removeEntity(collectionId);

    game.setState('money', money + netEarnings);
    game.setState('totalEarned', (game.state.totalEarned as number || 0) + Math.max(0, profit));
    game.setState('totalProfit', (game.state.totalProfit as number || 0) + profit);
    if (sellPrice > (game.state.highestSale as number || 0)) {
      game.setState('highestSale', sellPrice);
    }
    game.playerAction('recordSell');

    addNotification(`Sold ${entity.properties.name} for ${formatMoney(sellPrice)}!`, 'sale');
  }, [game, sellBonus, debt, money, addNotification]);

  // Batch sell
  const batchSellCards = useCallback((cardsOrIds: ReturnType<typeof entityToCollectionCard>[] | string[]) => {
    cardsOrIds.forEach(item => {
      const id = typeof item === 'string' ? item : item.collectionId;
      sellCard(id);
    });
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

    const pulledCards: ReturnType<typeof entityToCollectionCard>[] = [];
    let guaranteedRare = packType.guaranteedRare;
    let guaranteedUltraRare = packType.guaranteedUltraRare;

    for (let i = 0; i < packType.cardCount; i++) {
      let rarity: Rarity;
      const roll = Math.random();
      let cumulative = 0;

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

      if (RARE_PLUS.includes(rarity)) guaranteedRare = false;
      if (['ultra-rare', 'secret-rare', 'legendary', 'chase'].includes(rarity)) guaranteedUltraRare = false;

      const pool = ALL_PULLABLE_CARDS.filter(c => c.rarity === rarity);
      const card = pool[Math.floor(Math.random() * pool.length)] || CARD_DATABASE[0];
      const condition = generateCondition();
      const currentPrice = card.basePrice * CONDITION_MULTIPLIERS[condition];

      const collectionCard = {
        id: card.id,
        collectionId: `temp_${Date.now()}_${i}`,
        name: card.name,
        rarity: card.rarity as Rarity,
        type: card.type as CardType,
        basePrice: card.basePrice,
        currentPrice,
        condition,
        spriteId: card.spriteId,
        shiny: card.shiny || false,
        purchasePrice: 0,
        purchaseTime: gameTime,
        holdTime: 0,
        fromPack: packType.id,
        img: card.img || '',
        hp: card.hp || 0,
        attack: card.attack || 0,
        defense: card.defense || 0
      };

      pulledCards.push(collectionCard);
    }

    setPackResults(pulledCards);
    setRevealedCards([]);
    setIsOpeningPack(true);
    game.playerAction('recordPackOpen');

    const totalValue = pulledCards.reduce((sum, c) => sum + c.currentPrice, 0);
    const bestPull = pulledCards.reduce((best, c) =>
      c.basePrice > (best?.basePrice || 0) ? c : best, packStats.bestPull as typeof pulledCards[0] | null);
    setPackStats(prev => ({
      spent: prev.spent + price,
      totalValue: prev.totalValue + totalValue,
      bestPull
    }));
  }, [money, packDiscount, collection.length, capacity, gameTime, game, addNotification, packStats]);

  // Close pack results and add to collection
  const closePackResults = useCallback(() => {
    if (packResults) {
      packResults.forEach(card => {
        game.spawnEntity('collectionCard', {
          cardId: card.id,
          name: card.name,
          rarity: card.rarity,
          cardType: card.type,
          basePrice: card.basePrice,
          currentPrice: card.currentPrice,
          condition: card.condition,
          spriteId: card.spriteId,
          shiny: card.shiny,
          purchasePrice: 0,
          purchaseTime: gameTime,
          holdTime: 0,
          fromPack: card.fromPack || ''
        });
      });
    }
    setPackResults(null);
    setIsOpeningPack(false);
    setRevealedCards([]);
  }, [packResults, game, gameTime]);

  // Submit for grading
  const submitForGrading = useCallback((cardOrId: ReturnType<typeof entityToCollectionCard> | string) => {
    const collectionId = typeof cardOrId === 'string' ? cardOrId : cardOrId.collectionId;
    const entity = game.entities.find(e => e.id === collectionId && e.type === 'collectionCard');
    if (!entity) return;

    const gradingCost = 50;
    if (money < gradingCost) {
      addNotification('Need $50 for grading!', 'warning');
      return;
    }

    game.setState('money', money - gradingCost);

    // Spawn grading card
    game.spawnEntity('gradingCard', {
      ...entity.properties,
      submittedAt: gameTime,
      returnTime: gameTime + 60,
      cost: gradingCost
    });

    // Remove from collection
    game.removeEntity(collectionId);

    const queueSize = game.entities.filter(e => e.type === 'gradingCard').length;
    game.setState('gradingQueueSize', queueSize);
    addNotification(`Submitted ${entity.properties.name} for grading`, 'purchase');
  }, [game, money, gameTime, addNotification]);

  // Collect graded card
  const collectGradedCard = useCallback((submissionOrId: ReturnType<typeof entityToGradingSubmission> | string) => {
    const cardId = typeof submissionOrId === 'string' ? submissionOrId : submissionOrId.id;
    const entity = game.entities.find(e => e.id === cardId && e.type === 'gradedCard');
    if (!entity) return;

    if (!entity.properties.isForgery) {
      game.spawnEntity('collectionCard', {
        ...entity.properties,
      });
    }
    game.removeEntity(cardId);
  }, [game]);

  // Speed Appraisal game handlers
  const startAppraisalGame = useCallback(() => {
    if (money < 50) return false;
    game.setState('money', money - 50);
    return true;
  }, [money, game]);

  const winAppraisalGame = useCallback((specialty: CardType) => {
    const name = APPRAISER_NAMES[Math.floor(Math.random() * APPRAISER_NAMES.length)];
    game.spawnEntity('appraiser', {
      name,
      level: 1,
      experience: 0,
      specialty,
      earnRate: 1
    });
    game.setState('appraiserCount', appraisers.length + 1);
    game.setState('appraiserIncome', appraiserIncome + 1);
    addNotification(`Hired ${name}!`, 'achievement');
  }, [appraisers.length, appraiserIncome, game, addNotification]);

  const trainAppraiser = useCallback((appraiserId: string | number) => {
    const id = String(appraiserId);
    const entity = game.entities.find(e => e.id === id && e.type === 'appraiser');
    if (!entity) return;

    const level = Number(entity.properties.level) || 1;
    const cost = Math.round(100 * Math.pow(1.5, level - 1));
    if (money < cost) return;

    game.setState('money', money - cost);

    const newEarnRate = (Number(entity.properties.earnRate) || 1) + 0.5;
    game.modifyEntity(id, {
      level: level + 1,
      earnRate: newEarnRate
    });

    const newTotalIncome = game.entities
      .filter(e => e.type === 'appraiser')
      .reduce((sum, e) => sum + (Number(e.properties.earnRate) || 0), 0);
    game.setState('appraiserIncome', newTotalIncome);
  }, [game, money]);

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

    const collectionTip = getCollectionTips(collection as any, money, currentEvent as any);
    if (collectionTip && !dismissedTips.has(collectionTip.id)) return collectionTip;

    const marketTip = getMarketTips(marketCards as any, money, collection as any);
    if (marketTip && !dismissedTips.has(marketTip.id)) return marketTip;

    const strategyTip = getStrategyTip(totalSold, packsOpened);
    if (strategyTip && !dismissedTips.has(strategyTip.id)) return strategyTip;

    return null;
  }, [currentEvent, collection, money, marketCards, totalSold, packsOpened, dismissedTips]);

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

  // Convert appraisers for the view
  const appraisersForView = appraisers.map(a => ({
    ...a,
    id: typeof a.id === 'string' ? parseInt(a.id.replace(/\D/g, '')) || 0 : a.id
  }));

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
          market={marketCards as any}
          money={money}
          discount={discount}
          collectionSize={collection.length}
          capacity={capacity}
          onBuyCard={buyCard as any}
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
          collection={collection as any}
          sellBonus={sellBonus}
          onSellCard={sellCard as any}
          onBatchSell={batchSellCards as any}
        />
      )}

      {view === 'grading' && (
        <GradingView
          collection={collection as any}
          gradingQueue={gradingQueue as any}
          gradedCards={gradedCards as any}
          money={money}
          gameTime={gameTime}
          onSubmitForGrading={submitForGrading as any}
          onCollectGradedCard={collectGradedCard as any}
        />
      )}

      {view === 'appraisal' && (
        <SpeedAppraisalGame
          money={money}
          appraisers={appraisersForView as any}
          onStartGame={startAppraisalGame}
          onWinGame={winAppraisalGame}
          onTrainAppraiser={trainAppraiser as any}
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
            collection: collection as any,
            totalSold,
            totalProfit,
            longestHold,
            packsOpened,
            packStats,
            market: marketCards as any,
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
          packResults={packResults as any}
          revealedCards={revealedCards as any}
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
          gradedCard={envelopeCard as any}
          onClose={() => setEnvelopeCard(null)}
        />
      )}

      {/* Notifications */}
      <Notifications notifications={notifications} />
    </div>
  );
}

export default PoketraderGame;
