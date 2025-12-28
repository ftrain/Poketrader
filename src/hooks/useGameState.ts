import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  MarketCard,
  CollectionCard,
  MarketEvent,
  Notification,
  ClickEffect,
  ViewType,
  PackStats,
  Card,
  PackType,
  Rarity
} from '../types';
import {
  CARD_DATABASE,
  ALL_PULLABLE_CARDS,
  MARKET_EVENTS,
  UPGRADES,
  ACHIEVEMENTS,
  generatePokemonMessage
} from '../data';
import type { MessageCategory } from '../data';

const RARE_PLUS: Rarity[] = ['rare', 'ultra-rare', 'secret-rare', 'legendary', 'chase'];
const ULTRA_RARE_PLUS: Rarity[] = ['ultra-rare', 'secret-rare', 'legendary', 'chase'];

export function useGameState() {
  const [money, setMoney] = useState(100);
  const [totalEarned, setTotalEarned] = useState(100);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [collection, setCollection] = useState<CollectionCard[]>([]);
  const [market, setMarket] = useState<MarketCard[]>([]);
  const [upgrades, setUpgrades] = useState<number[]>([]);
  const [achievements, setAchievements] = useState<number[]>([]);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [eventTimer, setEventTimer] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [discount, setDiscount] = useState(1);
  const [sellBonus, setSellBonus] = useState(1);
  const [capacity, setCapacity] = useState(20);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showLesson, setShowLesson] = useState<string | null>(null);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [gameTime, setGameTime] = useState(0);
  const [longestHold, setLongestHold] = useState(0);
  const [view, setView] = useState<ViewType>('market');
  const [packsOpened, setPacksOpened] = useState(0);
  const [packResults, setPackResults] = useState<CollectionCard[] | null>(null);
  const [packStats, setPackStats] = useState<PackStats>({ spent: 0, totalValue: 0, bestPull: null });
  const [isOpeningPack, setIsOpeningPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState<CollectionCard[]>([]);

  // Combo system state
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);
  const lastClickTime = useRef(0);
  const comboResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentEventRef = useRef(currentEvent);
  const eventTimerRef = useRef(eventTimer);
  const passiveIncomeRef = useRef(passiveIncome);

  useEffect(() => { currentEventRef.current = currentEvent; }, [currentEvent]);
  useEffect(() => { eventTimerRef.current = eventTimer; }, [eventTimer]);
  useEffect(() => { passiveIncomeRef.current = passiveIncome; }, [passiveIncome]);

  const calculatePrice = useCallback((card: Card, event: MarketEvent | null): number => {
    let price = card.basePrice;
    const volatility = 0.1 + (card.rarity === 'legendary' ? 0.2 : card.rarity === 'ultra-rare' ? 0.15 : 0.05);
    price *= (1 + (Math.random() - 0.5) * volatility);
    if (event) {
      if (event.effect === 'all' || event.effect === card.rarity || event.effect === card.type) {
        price *= event.multiplier;
      }
    }
    return Math.max(1, Math.round(price * 100) / 100);
  }, []);

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

  const refreshMarket = useCallback(() => {
    const available = [...CARD_DATABASE]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map(card => ({
        ...card,
        currentPrice: calculatePrice(card, currentEventRef.current),
        marketId: Date.now() + Math.random(),
        priceHistory: [] as number[]
      }));
    setMarket(available);
  }, [calculatePrice]);

  // Update longest hold time
  useEffect(() => {
    if (collection.length > 0) {
      const maxHold = Math.max(...collection.map(c => c.holdTime || 0));
      if (maxHold > longestHold) setLongestHold(maxHold);
    }
  }, [collection, longestHold]);

  // Initialize market
  useEffect(() => { refreshMarket(); }, [refreshMarket]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(t => t + 1);

      if (passiveIncomeRef.current > 0) {
        setMoney(m => m + passiveIncomeRef.current);
        setTotalEarned(t => t + passiveIncomeRef.current);
      }

      setMarket(prev => prev.map(card => ({
        ...card,
        currentPrice: calculatePrice(card, currentEventRef.current),
        priceHistory: [...(card.priceHistory || []).slice(-20), card.currentPrice]
      })));

      setCollection(prev => prev.map(card => ({
        ...card,
        holdTime: (card.holdTime || 0) + 1,
        currentPrice: calculatePrice(card, currentEventRef.current)
      })));

      if (currentEventRef.current && eventTimerRef.current > 0) {
        setEventTimer(t => {
          const newTime = t - 1;
          if (newTime <= 0) setCurrentEvent(null);
          return newTime;
        });
      }

      if (!currentEventRef.current && Math.random() < 0.02) {
        const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
        setCurrentEvent(event);
        setEventTimer(event.duration);
        addNotification(`${event.title}`, 'event');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculatePrice, addNotification]);

  // Check achievements - apply utility benefits instead of money
  useEffect(() => {
    const state = { money, collection, totalSold, totalProfit, longestHold, packsOpened, packStats };
    ACHIEVEMENTS.forEach(ach => {
      if (!achievements.includes(ach.id) && ach.condition(state)) {
        setAchievements(prev => [...prev, ach.id]);

        // Apply the achievement effect
        switch (ach.effect) {
          case 'capacity':
            setCapacity(c => c + ach.value);
            break;
          case 'discount':
            setDiscount(d => d * ach.value);
            break;
          case 'sellBonus':
            setSellBonus(b => b * ach.value);
            break;
          case 'clickPower':
            setClickPower(p => p * ach.value);
            break;
          // marketSpeed and priceInsight are handled in UI
        }

        addNotification(`Achievement: ${ach.name}! ${ach.benefit}`, 'achievement');
      }
    });
  }, [money, collection, totalSold, totalProfit, longestHold, packsOpened, packStats, achievements, addNotification]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    lastClickTime.current = now;

    // Clear existing combo reset timer
    if (comboResetTimer.current) {
      clearTimeout(comboResetTimer.current);
    }

    // Combo logic: clicks within 600ms build combo
    let newCombo = comboCount;
    let newMultiplier = 1;
    const isRapidClick = timeSinceLastClick < 600;

    if (isRapidClick) {
      newCombo = Math.min(comboCount + 1, 50); // Max 50x combo
      // Combo multiplier: starts at 1, scales to 2.5x at 50 combo
      newMultiplier = 1 + (newCombo * 0.03);
    } else {
      newCombo = 0;
      newMultiplier = 1;
    }

    setComboCount(newCombo);
    setComboMultiplier(newMultiplier);
    setTotalClicks(c => c + 1);

    // Reset combo after 1.5 seconds of no clicking
    comboResetTimer.current = setTimeout(() => {
      setComboCount(0);
      setComboMultiplier(1);
    }, 1500);

    // Critical hit chance (5% base, +0.5% per combo level, max 15%)
    const critChance = Math.min(0.05 + (newCombo * 0.005), 0.15);
    const isCritical = Math.random() < critChance;

    // Calculate final earnings
    const baseEarned = clickPower;
    const comboBonus = Math.floor(baseEarned * (newMultiplier - 1));
    const critBonus = isCritical ? baseEarned * 2 : 0;
    const totalEarned = baseEarned + comboBonus + critBonus;

    setMoney(m => m + totalEarned);
    setTotalEarned(t => t + totalEarned);

    // Visual feedback
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setClickEffects(prev => [...prev, {
      id,
      x,
      y,
      value: totalEarned,
      isCombo: newCombo >= 5,
      isCritical,
      comboLevel: newCombo
    }]);
    setTimeout(() => setClickEffects(prev => prev.filter(ef => ef.id !== id)), 1200);

    // Combo milestone notifications
    if (newCombo === 10) {
      addNotification("COMBO x10! Keep clicking!", 'achievement');
    } else if (newCombo === 25) {
      addNotification("COMBO x25! You're on fire!", 'achievement');
    } else if (newCombo === 50) {
      addNotification("MAX COMBO x50! INCREDIBLE!", 'achievement');
    }

    if (isCritical) {
      addNotification(`CRITICAL HIT! +$${totalEarned}`, 'profit');
    }
  }, [clickPower, comboCount, addNotification]);

  const buyCard = useCallback((card: MarketCard) => {
    const price = Math.round(card.currentPrice * discount * 100) / 100;
    if (money >= price && collection.length < capacity) {
      setMoney(m => m - price);
      setCollection(prev => [...prev, {
        ...card,
        purchasePrice: price,
        purchaseTime: gameTime,
        holdTime: 0,
        collectionId: Date.now() + Math.random()
      }]);
      addNotification(`Bought ${card.name} for $${price.toFixed(2)}`, 'purchase');
    }
  }, [money, collection.length, capacity, discount, gameTime, addNotification]);

  const sellCard = useCallback((card: CollectionCard) => {
    const sellPrice = Math.round(card.currentPrice * sellBonus * 100) / 100;
    const profit = sellPrice - card.purchasePrice;
    setMoney(m => m + sellPrice);
    setTotalEarned(t => t + Math.max(0, profit));
    setTotalProfit(p => p + profit);
    setTotalSold(s => s + 1);
    setCollection(prev => prev.filter(c => c.collectionId !== card.collectionId));
    addNotification(`Sold ${card.name} for $${sellPrice.toFixed(2)} (${profit >= 0 ? '+' : ''}$${profit.toFixed(2)})`, profit >= 0 ? 'profit' : 'loss');
  }, [sellBonus, addNotification]);

  const buyUpgrade = useCallback((upgradeId: number) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || money < upgrade.cost || upgrades.includes(upgrade.id)) return;

    setMoney(m => m - upgrade.cost);
    setUpgrades(prev => [...prev, upgrade.id]);

    switch (upgrade.effect) {
      case 'clickPower': setClickPower(p => p * upgrade.value); break;
      case 'discount': setDiscount(d => d * upgrade.value); break;
      case 'passive': setPassiveIncome(p => p + upgrade.value); break;
      case 'sellBonus': setSellBonus(b => b * upgrade.value); break;
      case 'capacity': setCapacity(c => c + upgrade.value); break;
    }
    setShowLesson(upgrade.lesson);
    addNotification(`Purchased upgrade: ${upgrade.name}`, 'upgrade');
  }, [money, upgrades, addNotification]);

  const pullCardFromPack = useCallback((packType: PackType): Card => {
    const roll = Math.random();
    let cumulative = 0;
    let selectedRarity: Rarity = 'common';

    for (const [rarity, rate] of Object.entries(packType.pullRates)) {
      cumulative += rate;
      if (roll < cumulative) {
        selectedRarity = rarity as Rarity;
        break;
      }
    }

    const cardsOfRarity = ALL_PULLABLE_CARDS.filter(c => c.rarity === selectedRarity);
    if (cardsOfRarity.length === 0) {
      const commons = ALL_PULLABLE_CARDS.filter(c => c.rarity === 'common');
      return commons[Math.floor(Math.random() * commons.length)];
    }
    return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
  }, []);

  const openPack = useCallback((packType: PackType) => {
    if (money < packType.price) return;
    if (collection.length >= capacity) {
      addNotification("Storage full! Sell some cards first.", 'warning');
      return;
    }

    setMoney(m => m - packType.price);
    setIsOpeningPack(true);
    setRevealedCards([]);

    const pulledCards: CollectionCard[] = [];
    for (let i = 0; i < packType.cardCount; i++) {
      let card = pullCardFromPack(packType);

      // Check guarantees on last card
      if (i === packType.cardCount - 1) {
        if (packType.guaranteedRare && !pulledCards.some(c => RARE_PLUS.includes(c.rarity))) {
          const rareCards = ALL_PULLABLE_CARDS.filter(c => RARE_PLUS.includes(c.rarity));
          card = rareCards[Math.floor(Math.random() * rareCards.length)];
        }
        if (packType.guaranteedUltraRare && !pulledCards.some(c => ULTRA_RARE_PLUS.includes(c.rarity))) {
          const ultraRares = ALL_PULLABLE_CARDS.filter(c => ULTRA_RARE_PLUS.includes(c.rarity));
          card = ultraRares[Math.floor(Math.random() * ultraRares.length)];
        }
      }

      pulledCards.push({
        ...card,
        currentPrice: calculatePrice(card, currentEventRef.current),
        purchasePrice: 0,
        purchaseTime: gameTime,
        holdTime: 0,
        collectionId: Date.now() + Math.random() + i,
        fromPack: packType.name
      });
    }

    setPackResults(pulledCards);

    // Reveal cards one by one
    pulledCards.forEach((card, index) => {
      setTimeout(() => setRevealedCards(prev => [...prev, card]), index * 400);
    });

    // Add to collection after reveal
    setTimeout(() => {
      const totalValue = pulledCards.reduce((sum, c) => sum + c.currentPrice, 0);
      const bestPull = pulledCards.reduce((best: Card | null, c) =>
        (!best || c.basePrice > best.basePrice) ? c : best, null);

      setPacksOpened(p => p + 1);
      setPackStats(prev => ({
        spent: prev.spent + packType.price,
        totalValue: prev.totalValue + totalValue,
        bestPull: (!prev.bestPull || (bestPull && bestPull.basePrice > prev.bestPull.basePrice))
          ? bestPull
          : prev.bestPull
      }));

      const spaceAvailable = capacity - collection.length;
      const cardsToAdd = pulledCards.slice(0, spaceAvailable);
      setCollection(prev => [...prev, ...cardsToAdd]);

      if (cardsToAdd.length < pulledCards.length) {
        addNotification(`Only ${cardsToAdd.length}/${pulledCards.length} cards added - storage full!`, 'warning');
      }

      pulledCards
        .filter(c => ['secret-rare', 'legendary', 'chase'].includes(c.rarity))
        .forEach(c => addNotification(`Amazing pull: ${c.name}!`, 'pack'));
    }, pulledCards.length * 400 + 500);
  }, [money, collection.length, capacity, gameTime, calculatePrice, pullCardFromPack, addNotification]);

  const closePackResults = useCallback(() => {
    setIsOpeningPack(false);
    setPackResults(null);
    setRevealedCards([]);
  }, []);

  return {
    // State
    money,
    totalEarned,
    totalProfit,
    totalSold,
    collection,
    market,
    upgrades,
    achievements,
    currentEvent,
    eventTimer,
    clickPower,
    passiveIncome,
    discount,
    sellBonus,
    capacity,
    notifications,
    showLesson,
    clickEffects,
    gameTime,
    longestHold,
    view,
    packsOpened,
    packResults,
    packStats,
    isOpeningPack,
    revealedCards,
    // Combo system
    comboCount,
    comboMultiplier,
    totalClicks,

    // Actions
    setView,
    setShowLesson,
    handleClick,
    buyCard,
    sellCard,
    buyUpgrade,
    openPack,
    closePackResults,
    refreshMarket,
    addNotification,
  };
}
