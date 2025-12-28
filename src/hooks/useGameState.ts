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

export type StarterPath = 'solo' | 'partner' | 'investor' | null;

export interface StarterPathInfo {
  id: StarterPath;
  name: string;
  icon: string;
  startingMoney: number;
  debt: number;
  clickPower: number;
  bonus: string;
  description: string;
}

export const STARTER_PATHS: StarterPathInfo[] = [
  {
    id: 'solo',
    name: 'Solo Hustler',
    icon: '🎒',
    startingMoney: 150,
    debt: 0,
    clickPower: 1,
    bonus: 'No debt, full independence',
    description: 'Start small and build from scratch. Every dollar is yours to keep.'
  },
  {
    id: 'partner',
    name: "Oak's Lab Partner",
    icon: '🔬',
    startingMoney: 400,
    debt: 300,
    clickPower: 2,
    bonus: '+$300 capital, 2x click power',
    description: 'Professor Oak fronts you $300 for equipment. Pay it back as you grow.'
  },
  {
    id: 'investor',
    name: 'Silph Co. Backed',
    icon: '🏢',
    startingMoney: 800,
    debt: 600,
    clickPower: 3,
    bonus: '+$700 capital, 3x click power, +10 storage',
    description: 'Silph Co. sees potential. Big money, but they expect returns.'
  }
];

const SAVE_KEY = 'poketrader_save';

function loadSavedGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load save:', e);
  }
  return null;
}

export function useGameState() {
  const savedGame = loadSavedGame();

  const [starterPath, setStarterPath] = useState<StarterPath>(savedGame?.starterPath ?? null);
  const [debt, setDebt] = useState(savedGame?.debt ?? 0);
  const [money, setMoney] = useState(savedGame?.money ?? 0);
  const [totalEarned, setTotalEarned] = useState(savedGame?.totalEarned ?? 0);
  const [totalProfit, setTotalProfit] = useState(savedGame?.totalProfit ?? 0);
  const [totalSold, setTotalSold] = useState(savedGame?.totalSold ?? 0);
  const [collection, setCollection] = useState<CollectionCard[]>(savedGame?.collection ?? []);
  const [market, setMarket] = useState<MarketCard[]>([]);
  const [upgrades, setUpgrades] = useState<number[]>(savedGame?.upgrades ?? []);
  const [achievements, setAchievements] = useState<number[]>(savedGame?.achievements ?? []);
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [eventTimer, setEventTimer] = useState(0);
  const [clickPower, setClickPower] = useState(savedGame?.clickPower ?? 1);
  const [passiveIncome, setPassiveIncome] = useState(savedGame?.passiveIncome ?? 0);
  const [discount, setDiscount] = useState(savedGame?.discount ?? 1);
  const [sellBonus, setSellBonus] = useState(savedGame?.sellBonus ?? 1);
  const [capacity, setCapacity] = useState(savedGame?.capacity ?? 20);
  const [marketSize, setMarketSize] = useState(savedGame?.marketSize ?? 8);
  const [packDiscount, setPackDiscount] = useState(savedGame?.packDiscount ?? 1);
  const [critBonus, setCritBonus] = useState(savedGame?.critBonus ?? 0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showLesson, setShowLesson] = useState<string | null>(null);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [gameTime, setGameTime] = useState(savedGame?.gameTime ?? 0);
  const [longestHold, setLongestHold] = useState(savedGame?.longestHold ?? 0);
  const [view, setView] = useState<ViewType>('market');
  const [packsOpened, setPacksOpened] = useState(savedGame?.packsOpened ?? 0);
  const [packResults, setPackResults] = useState<CollectionCard[] | null>(null);
  const [packStats, setPackStats] = useState<PackStats>(savedGame?.packStats ?? { spent: 0, totalValue: 0, bestPull: null });
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
  const critBonusRef = useRef(critBonus);
  const upgradesRef = useRef(upgrades);
  const collectionRef = useRef(collection);
  const moneyRef = useRef(money);
  const capacityRef = useRef(capacity);
  const sellBonusRef = useRef(sellBonus);
  const discountRef = useRef(discount);
  const debtRef = useRef(debt);
  const marketRef = useRef(market);

  useEffect(() => { currentEventRef.current = currentEvent; }, [currentEvent]);
  useEffect(() => { eventTimerRef.current = eventTimer; }, [eventTimer]);
  useEffect(() => { passiveIncomeRef.current = passiveIncome; }, [passiveIncome]);
  useEffect(() => { critBonusRef.current = critBonus; }, [critBonus]);
  useEffect(() => { upgradesRef.current = upgrades; }, [upgrades]);
  useEffect(() => { collectionRef.current = collection; }, [collection]);
  useEffect(() => { moneyRef.current = money; }, [money]);
  useEffect(() => { capacityRef.current = capacity; }, [capacity]);
  useEffect(() => { sellBonusRef.current = sellBonus; }, [sellBonus]);
  useEffect(() => { discountRef.current = discount; }, [discount]);
  useEffect(() => { debtRef.current = debt; }, [debt]);
  useEffect(() => { marketRef.current = market; }, [market]);

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
      .slice(0, marketSize)
      .map(card => ({
        ...card,
        currentPrice: calculatePrice(card, currentEventRef.current),
        marketId: Date.now() + Math.random(),
        priceHistory: [] as number[]
      }));
    setMarket(available);
  }, [calculatePrice, marketSize]);

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
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setGameTime((t: number) => t + 1);

      if (passiveIncomeRef.current > 0) {
        setMoney((m: number) => m + passiveIncomeRef.current);
        setTotalEarned((t: number) => t + passiveIncomeRef.current);
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

      // AUTO-SELL: Stores automatically sell profitable cards
      // 21 = eBay Store, 23 = Pop-up Booth, 24 = Dedicated Storefront
      const hasEbay = upgradesRef.current.includes(21);
      const hasPopup = upgradesRef.current.includes(23);
      const hasStore = upgradesRef.current.includes(24);
      const autoSellRate = hasStore ? 2 : hasPopup ? 4 : hasEbay ? 6 : 0;

      if (autoSellRate > 0 && tick % autoSellRate === 0 && collectionRef.current.length > 0) {
        // Find a card with profit
        const profitableCard = collectionRef.current.find(c =>
          c.currentPrice * sellBonusRef.current > c.purchasePrice * 1.1
        );
        if (profitableCard) {
          const sellPrice = Math.round(profitableCard.currentPrice * sellBonusRef.current * 100) / 100;
          const profit = sellPrice - profitableCard.purchasePrice;

          // Handle debt payment
          let netProfit = sellPrice;
          if (debtRef.current > 0 && profit > 0) {
            const debtPayment = Math.min(debtRef.current, profit * 0.2);
            netProfit = sellPrice - debtPayment;
            setDebt((d: number) => Math.max(0, d - debtPayment));
          }

          setMoney((m: number) => m + netProfit);
          setTotalEarned((t: number) => t + Math.max(0, profit));
          setTotalProfit((p: number) => p + profit);
          setTotalSold((s: number) => s + 1);
          setCollection(prev => prev.filter(c => c.collectionId !== profitableCard.collectionId));
          addNotification(`🏪 Auto-sold ${profitableCard.name} for $${sellPrice.toFixed(0)}`, 'sale');
        }
      }

      // AUTO-BUY: Wholesale upgrades auto-buy good deals
      // 50 = Bulk Buyer Network, 51 = Distributor Partnership
      const hasBulkBuyer = upgradesRef.current.includes(50);
      const hasDistributor = upgradesRef.current.includes(51);
      const autoBuyRate = hasDistributor ? 5 : hasBulkBuyer ? 8 : 0;

      if (autoBuyRate > 0 && tick % autoBuyRate === 0) {
        const canBuy = collectionRef.current.length < capacityRef.current;
        const goodDeal = marketRef.current.find(c =>
          c.currentPrice < c.basePrice * 0.85 * discountRef.current &&
          c.currentPrice * discountRef.current <= moneyRef.current
        );
        if (canBuy && goodDeal) {
          const price = Math.round(goodDeal.currentPrice * discountRef.current * 100) / 100;
          if (moneyRef.current >= price) {
            setMoney((m: number) => m - price);
            setCollection(prev => [...prev, {
              ...goodDeal,
              purchasePrice: price,
              purchaseTime: tick,
              holdTime: 0,
              collectionId: Date.now() + Math.random()
            }]);
            addNotification(`📦 Auto-bought ${goodDeal.name} for $${price.toFixed(0)} (deal!)`, 'purchase');
          }
        }
      }

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
            setCapacity((c: number) => c + ach.value);
            break;
          case 'discount':
            setDiscount((d: number) => d * ach.value);
            break;
          case 'sellBonus':
            setSellBonus((b: number) => b * ach.value);
            break;
          case 'clickPower':
            setClickPower((p: number) => p * ach.value);
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

    // Critical hit chance (5% base, +0.5% per combo level, +critBonus from upgrades, max 30%)
    const critChance = Math.min(0.05 + (newCombo * 0.005) + critBonusRef.current, 0.30);
    const isCritical = Math.random() < critChance;

    // Calculate final earnings
    const baseEarned = clickPower;
    const comboBonus = Math.floor(baseEarned * (newMultiplier - 1));
    const critBonus = isCritical ? baseEarned * 2 : 0;
    const totalEarned = baseEarned + comboBonus + critBonus;

    setMoney((m: number) => m + totalEarned);
    setTotalEarned((t: number) => t + totalEarned);

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

  }, [clickPower, comboCount]);

  const buyCard = useCallback((card: MarketCard) => {
    const price = Math.round(card.currentPrice * discount * 100) / 100;
    if (money >= price && collection.length < capacity) {
      setMoney((m: number) => m - price);
      setCollection(prev => [...prev, {
        ...card,
        purchasePrice: price,
        purchaseTime: gameTime,
        holdTime: 0,
        collectionId: Date.now() + Math.random()
      }]);
    }
  }, [money, collection.length, capacity, discount, gameTime]);

  const sellCard = useCallback((card: CollectionCard) => {
    const sellPrice = Math.round(card.currentPrice * sellBonus * 100) / 100;
    const profit = sellPrice - card.purchasePrice;

    // Auto-pay debt from profits
    setDebt((currentDebt: number) => {
      if (currentDebt > 0 && profit > 0) {
        const debtPayment = Math.min(currentDebt, profit * 0.2); // 20% of profits go to debt
        setMoney((m: number) => m + sellPrice - debtPayment);
        if (debtPayment > 0 && currentDebt - debtPayment <= 0) {
          addNotification("🎉 Debt fully repaid! You're free!", 'achievement');
        }
        return Math.max(0, currentDebt - debtPayment);
      }
      setMoney((m: number) => m + sellPrice);
      return currentDebt;
    });

    setTotalEarned((t: number) => t + Math.max(0, profit));
    setTotalProfit((p: number) => p + profit);
    setTotalSold((s: number) => s + 1);
    setCollection(prev => prev.filter(c => c.collectionId !== card.collectionId));
  }, [sellBonus, addNotification]);

  const batchSellCards = useCallback((cards: CollectionCard[]) => {
    if (cards.length === 0) return;

    let totalSellPrice = 0;
    let totalProfitAmount = 0;

    cards.forEach(card => {
      const sellPrice = Math.round(card.currentPrice * sellBonus * 100) / 100;
      const profit = sellPrice - card.purchasePrice;
      totalSellPrice += sellPrice;
      totalProfitAmount += profit;
    });

    // Auto-pay debt from profits
    setDebt((currentDebt: number) => {
      if (currentDebt > 0 && totalProfitAmount > 0) {
        const debtPayment = Math.min(currentDebt, totalProfitAmount * 0.2);
        setMoney((m: number) => m + totalSellPrice - debtPayment);
        if (debtPayment > 0 && currentDebt - debtPayment <= 0) {
          addNotification("🎉 Debt fully repaid! You're free!", 'achievement');
        }
        return Math.max(0, currentDebt - debtPayment);
      }
      setMoney((m: number) => m + totalSellPrice);
      return currentDebt;
    });

    setTotalEarned((t: number) => t + Math.max(0, totalProfitAmount));
    setTotalProfit((p: number) => p + totalProfitAmount);
    setTotalSold((s: number) => s + cards.length);

    const cardIds = new Set(cards.map(c => c.collectionId));
    setCollection(prev => prev.filter(c => !cardIds.has(c.collectionId)));

    addNotification(`💰 Sold ${cards.length} cards for $${totalSellPrice.toFixed(2)}!`, 'sale');
  }, [sellBonus, addNotification]);

  const buyUpgrade = useCallback((upgradeId: number) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || money < upgrade.cost || upgrades.includes(upgrade.id)) return;

    // Check requirements
    if (upgrade.requires) {
      const hasAllReqs = upgrade.requires.every(reqId => upgrades.includes(reqId));
      if (!hasAllReqs) return;
    }

    setMoney((m: number) => m - upgrade.cost);
    setUpgrades(prev => [...prev, upgrade.id]);

    switch (upgrade.effect) {
      case 'clickPower': setClickPower((p: number) => p * upgrade.value); break;
      case 'discount': setDiscount((d: number) => d * upgrade.value); break;
      case 'passive': setPassiveIncome((p: number) => p + upgrade.value); break;
      case 'sellBonus': setSellBonus((b: number) => b * upgrade.value); break;
      case 'capacity': setCapacity((c: number) => c + upgrade.value); break;
      case 'marketSize': setMarketSize((s: number) => s + upgrade.value); break;
      case 'packDiscount': setPackDiscount((d: number) => d * upgrade.value); break;
      case 'critChance': setCritBonus((b: number) => b + upgrade.value); break;
      // eventDuration, bulkBonus, refreshDiscount, rareChance handled elsewhere or not yet implemented
    }
    setShowLesson(upgrade.lesson);
    addNotification(`${upgrade.icon} ${upgrade.name}`, 'upgrade');
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
    const actualPrice = Math.round(packType.price * packDiscount);
    if (money < actualPrice) return;
    if (collection.length >= capacity) {
      addNotification("Storage full! Sell some cards first.", 'warning');
      return;
    }

    setMoney((m: number) => m - actualPrice);
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

      setPacksOpened((p: number) => p + 1);
      setPackStats(prev => ({
        spent: prev.spent + actualPrice,
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
    }, pulledCards.length * 400 + 500);
  }, [money, collection.length, capacity, gameTime, calculatePrice, pullCardFromPack, addNotification, packDiscount]);

  const closePackResults = useCallback(() => {
    setIsOpeningPack(false);
    setPackResults(null);
    setRevealedCards([]);
  }, []);

  const chooseStarterPath = useCallback((pathId: 'solo' | 'partner' | 'investor') => {
    const path = STARTER_PATHS.find(p => p.id === pathId);
    if (!path) return;

    setStarterPath(pathId);
    setMoney(path.startingMoney);
    setTotalEarned(path.startingMoney);
    setDebt(path.debt);
    setClickPower(path.clickPower);

    // Investor path gets bonus capacity
    if (pathId === 'investor') {
      setCapacity(30);
    }

    // Initialize market
    refreshMarket();

    addNotification(`${path.icon} Starting as ${path.name}!`, 'achievement');
  }, [refreshMarket, addNotification]);

  const payDebt = useCallback((amount: number) => {
    const payment = Math.min(amount, debt, money);
    if (payment > 0) {
      setMoney((m: number) => m - payment);
      setDebt((d: number) => {
        const newDebt = d - payment;
        if (newDebt <= 0) {
          addNotification("🎉 Debt fully repaid! You're free!", 'achievement');
        }
        return Math.max(0, newDebt);
      });
    }
  }, [debt, money, addNotification]);

  // Auto-save game state every 5 seconds
  useEffect(() => {
    if (!starterPath) return; // Don't save if game hasn't started

    const saveGame = () => {
      const saveData = {
        starterPath,
        debt,
        money,
        totalEarned,
        totalProfit,
        totalSold,
        collection,
        upgrades,
        achievements,
        clickPower,
        passiveIncome,
        discount,
        sellBonus,
        capacity,
        marketSize,
        packDiscount,
        critBonus,
        gameTime,
        longestHold,
        packsOpened,
        packStats
      };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      } catch (e) {
        console.error('Failed to save game:', e);
      }
    };

    const saveInterval = setInterval(saveGame, 5000);
    saveGame(); // Save immediately on state change

    return () => clearInterval(saveInterval);
  }, [starterPath, debt, money, totalEarned, totalProfit, totalSold, collection, upgrades, achievements, clickPower, passiveIncome, discount, sellBonus, capacity, marketSize, packDiscount, critBonus, gameTime, longestHold, packsOpened, packStats]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    window.location.reload();
  }, []);

  // Calculate total collection value
  const collectionValue = collection.reduce((sum, card) => sum + card.currentPrice, 0);

  return {
    // State
    starterPath,
    debt,
    money,
    totalEarned,
    totalProfit,
    totalSold,
    collection,
    collectionValue,
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
    batchSellCards,
    buyUpgrade,
    openPack,
    closePackResults,
    refreshMarket,
    addNotification,
    chooseStarterPath,
    payDebt,
    resetGame,
  };
}
