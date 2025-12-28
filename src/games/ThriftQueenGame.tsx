/**
 * ThriftQueenGame - Vintage Fashion Empire 👗✨
 *
 * Build a sustainable fashion empire from thrift store finds to global brand!
 * Compete with fast fashion through style, sustainability, and social media savvy.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGameEngine } from '../engine/useGameEngine';
import { thriftQueenGame } from './thriftQueen';
import { ClothingVisual } from './ClothingVisual';
import type { ClothingItem as VisualClothingItem } from './ClothingVisual';
import type { SpawnedEntity } from '../engine/types';
import './ThriftQueenGame.css';

// ═══════════════════════════════════════════════════════════════
// 👗 CLOTHING DATA
// ═══════════════════════════════════════════════════════════════

type Era = '70s' | '80s' | '90s' | 'y2k' | 'vintage-designer';
type Category = 'dress' | 'coat' | 'jacket' | 'accessories' | 'denim' | 'sweater' | 'blouse' | 'skirt' | 'pants' | 'shoes';
type Condition = 'damaged' | 'fair' | 'good' | 'excellent' | 'mint';
type Rarity = 'common' | 'trendy' | 'statement' | 'designer' | 'couture';

interface ClothingItem {
  id: string;
  name: string;
  era: Era;
  category: Category;
  condition: Condition;
  rarity: Rarity;
  basePrice: number;
  currentPrice: number;
  brand?: string;
  description: string;
  emoji: string;
}

const CLOTHING_NAMES: Record<Category, string[]> = {
  dress: ['Maxi Dress', 'Mini Dress', 'Wrap Dress', 'Slip Dress', 'Shirt Dress', 'Bodycon Dress', 'A-Line Dress', 'Cocktail Dress'],
  coat: ['Trench Coat', 'Pea Coat', 'Fur Coat', 'Leather Jacket', 'Blazer', 'Cardigan Coat', 'Cape', 'Duster'],
  jacket: ['Denim Jacket', 'Bomber Jacket', 'Varsity Jacket', 'Moto Jacket', 'Cropped Jacket', 'Oversized Blazer'],
  accessories: ['Silk Scarf', 'Leather Belt', 'Statement Bag', 'Vintage Brooch', 'Chain Necklace', 'Sunglasses', 'Hair Clips'],
  denim: ['High-Waisted Jeans', 'Mom Jeans', 'Flare Jeans', 'Denim Shorts', 'Jean Jacket', 'Denim Skirt'],
  sweater: ['Cable Knit', 'Cardigan', 'Turtleneck', 'Crewneck', 'Vest', 'Mohair Sweater'],
  blouse: ['Silk Blouse', 'Peasant Top', 'Button-Up', 'Off-Shoulder', 'Crop Top', 'Halter Top'],
  skirt: ['Midi Skirt', 'Pleated Skirt', 'Pencil Skirt', 'Maxi Skirt', 'Tennis Skirt', 'Wrap Skirt'],
  pants: ['Wide Leg Pants', 'Corduroy', 'Palazzo Pants', 'Cigarette Pants', 'Cargo Pants', 'Culottes'],
  shoes: ['Platform Boots', 'Mary Janes', 'Kitten Heels', 'Loafers', 'Cowboy Boots', 'Sneakers']
};

const CATEGORY_EMOJI: Record<Category, string> = {
  dress: '👗',
  coat: '🧥',
  jacket: '🧥',
  accessories: '👜',
  denim: '👖',
  sweater: '🧶',
  blouse: '👚',
  skirt: '👗',
  pants: '👖',
  shoes: '👢'
};

const ERA_DETAILS: Record<Era, { emoji: string; adjectives: string[] }> = {
  '70s': { emoji: '🪩', adjectives: ['Disco', 'Groovy', 'Bohemian', 'Retro'] },
  '80s': { emoji: '💿', adjectives: ['Power', 'Neon', 'Bold', 'Glam'] },
  '90s': { emoji: '🎸', adjectives: ['Grunge', 'Minimalist', 'Slip', 'Casual'] },
  'y2k': { emoji: '💿', adjectives: ['Low-Rise', 'Butterfly', 'Sparkly', 'Cyber'] },
  'vintage-designer': { emoji: '💎', adjectives: ['Luxury', 'Classic', 'Timeless', 'Iconic'] }
};

const DESIGNER_BRANDS = ['Chanel', 'Dior', 'Versace', 'Gucci', 'Prada', 'YSL', 'Hermès', 'Balenciaga', 'Givenchy', 'Valentino'];

const CONDITION_MULTIPLIERS: Record<Condition, number> = {
  damaged: 0.3,
  fair: 0.6,
  good: 1.0,
  excellent: 1.5,
  mint: 2.5
};

const RARITY_BASE_PRICES: Record<Rarity, { min: number; max: number }> = {
  common: { min: 5, max: 25 },
  trendy: { min: 20, max: 60 },
  statement: { min: 50, max: 150 },
  designer: { min: 100, max: 500 },
  couture: { min: 300, max: 2000 }
};

// Generate a random clothing item
function generateClothingItem(findBonus: number, eventCategory: string, eventMultiplier: number): ClothingItem {
  const categories = Object.keys(CLOTHING_NAMES) as Category[];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const names = CLOTHING_NAMES[category];
  const name = names[Math.floor(Math.random() * names.length)];

  const eras: Era[] = ['70s', '80s', '90s', 'y2k', 'vintage-designer'];
  let era = eras[Math.floor(Math.random() * eras.length)];

  // Determine rarity with find bonus
  const rarityRoll = Math.random() + findBonus;
  let rarity: Rarity;
  if (rarityRoll > 0.98) rarity = 'couture';
  else if (rarityRoll > 0.90) rarity = 'designer';
  else if (rarityRoll > 0.70) rarity = 'statement';
  else if (rarityRoll > 0.40) rarity = 'trendy';
  else rarity = 'common';

  // Designer items get designer era
  if (rarity === 'designer' || rarity === 'couture') {
    era = 'vintage-designer';
  }

  // Determine condition
  const conditionRoll = Math.random();
  let condition: Condition;
  if (conditionRoll > 0.95) condition = 'mint';
  else if (conditionRoll > 0.80) condition = 'excellent';
  else if (conditionRoll > 0.50) condition = 'good';
  else if (conditionRoll > 0.20) condition = 'fair';
  else condition = 'damaged';

  // Calculate price
  const priceRange = RARITY_BASE_PRICES[rarity];
  let basePrice = priceRange.min + Math.random() * (priceRange.max - priceRange.min);
  let currentPrice = basePrice * CONDITION_MULTIPLIERS[condition];

  // Apply event multiplier
  if (eventCategory === 'all' ||
      eventCategory === era ||
      (eventCategory === 'denim' && category === 'denim') ||
      (eventCategory === 'designer' && (rarity === 'designer' || rarity === 'couture')) ||
      (eventCategory === 'statement' && rarity === 'statement') ||
      (eventCategory === 'linen' && (category === 'dress' || category === 'pants'))) {
    currentPrice *= eventMultiplier;
  }

  // Brand for designer items
  const brand = rarity === 'designer' || rarity === 'couture'
    ? DESIGNER_BRANDS[Math.floor(Math.random() * DESIGNER_BRANDS.length)]
    : undefined;

  const eraDetails = ERA_DETAILS[era];
  const adjective = eraDetails.adjectives[Math.floor(Math.random() * eraDetails.adjectives.length)];

  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: `${adjective} ${name}`,
    era,
    category,
    condition,
    rarity,
    basePrice: Math.round(basePrice * 100) / 100,
    currentPrice: Math.round(currentPrice * 100) / 100,
    brand,
    description: brand ? `${brand} ${eraDetails.emoji}` : `${eraDetails.emoji} ${era.toUpperCase()}`,
    emoji: CATEGORY_EMOJI[category]
  };
}

// Entity to ClothingItem converter
function entityToClothingItem(entity: SpawnedEntity): ClothingItem {
  const p = entity.properties;
  return {
    id: entity.id,
    name: String(p.name || 'Unknown Item'),
    era: String(p.era || '90s') as Era,
    category: String(p.category || 'dress') as Category,
    condition: String(p.condition || 'good') as Condition,
    rarity: String(p.rarity || 'common') as Rarity,
    basePrice: Number(p.basePrice) || 10,
    currentPrice: Number(p.currentPrice) || 10,
    brand: p.brand ? String(p.brand) : undefined,
    description: String(p.description || ''),
    emoji: String(p.emoji || '👗')
  };
}

// Convert game ClothingItem to VisualClothingItem for the visual component
function toVisualItem(item: ClothingItem): VisualClothingItem {
  // Map category to visual type
  const typeMap: Record<Category, VisualClothingItem['type']> = {
    dress: 'dress',
    coat: 'jacket',
    jacket: 'jacket',
    accessories: 'accessory',
    denim: 'pants',
    sweater: 'blouse',
    blouse: 'blouse',
    skirt: 'skirt',
    pants: 'pants',
    shoes: 'shoes'
  };

  // Map rarity
  const rarityMap: Record<Rarity, VisualClothingItem['rarity']> = {
    common: 'common',
    trendy: 'uncommon',
    statement: 'uncommon',
    designer: 'rare',
    couture: 'legendary'
  };

  // Map condition
  const conditionMap: Record<Condition, VisualClothingItem['condition']> = {
    damaged: 'poor',
    fair: 'fair',
    good: 'good',
    excellent: 'excellent',
    mint: 'mint'
  };

  return {
    id: item.id,
    name: item.name,
    type: typeMap[item.category],
    era: item.era,
    condition: conditionMap[item.condition],
    rarity: rarityMap[item.rarity],
    basePrice: item.basePrice
  };
}

// ═══════════════════════════════════════════════════════════════
// 🎮 GAME COMPONENT
// ═══════════════════════════════════════════════════════════════

interface ThriftQueenGameProps {
  onNavigateToHub: () => void;
}

type ViewType = 'source' | 'inventory' | 'listings' | 'upgrades' | 'stats';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function ThriftQueenGame({ onNavigateToHub }: ThriftQueenGameProps) {
  const game = useGameEngine(thriftQueenGame, { autoStart: true, autoLoad: true });

  // UI state
  const [view, setView] = useState<ViewType>('source');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sourceItems, setSourceItems] = useState<ClothingItem[]>([]);

  // Derived state from engine
  const cash = (game.state.cash as number) || 0;
  const debt = (game.state.debt as number) || 0;
  const totalProfit = (game.state.totalProfit as number) || 0;
  const totalRevenue = (game.state.totalRevenue as number) || 0;
  const reputation = (game.state.reputation as number) || 1;
  const ecoScore = (game.state.ecoScore as number) || 0;
  const styleCred = (game.state.styleCred as number) || 0;
  const followers = (game.state.followers as number) || 0;
  const subscribers = (game.state.subscribers as number) || 0;
  const itemsSold = (game.state.itemsSold as number) || 0;
  const inventoryCapacity = (game.state.inventoryCapacity as number) || 20;
  const listingsCapacity = (game.state.listingsCapacity as number) || 5;
  const priceMultiplier = (game.state.priceMultiplier as number) || 1;
  const sourcingDiscount = (game.state.sourcingDiscount as number) || 1;
  const findBonus = (game.state.findBonus as number) || 0;
  const autoSellChance = (game.state.autoSellChance as number) || 0;
  const passiveIncome = (game.state.passiveIncome as number) || 0;
  const storeIncome = (game.state.storeIncome as number) || 0;
  const hasChosenStarter = game.state.hasChosenStarter as boolean;
  const currentPhase = (game.state.currentPhase as string) || 'hustle';
  const eventName = game.state.eventName as string;
  const eventMultiplier = (game.state.eventMultiplier as number) || 1;
  const eventCategory = (game.state.eventCategory as string) || '';
  const eventTicksRemaining = (game.state.eventTicksRemaining as number) || 0;
  const hasWon = game.state.hasWon as boolean;
  const fastFashionDamage = (game.state.fastFashionDamage as number) || 0;
  const storeCount = (game.state.storeCount as number) || 0;
  const employeeCount = (game.state.employeeCount as number) || 0;
  const showUpgrades = game.state.showUpgrades as boolean;

  // Derive items from entities
  const inventory = useMemo(() =>
    game.entities.filter(e => e.type === 'inventoryItem').map(entityToClothingItem),
    [game.entities]
  );

  const listings = useMemo(() =>
    game.entities.filter(e => e.type === 'listing').map(entityToClothingItem),
    [game.entities]
  );

  // Get available projects - map them to UI-friendly format
  const availableUpgrades = useMemo(() => {
    return game.availableProjects
      .filter(p => !p.id.startsWith('pay-debt'))
      .map(p => ({
        ...p,
        affordable: game.canAffordProject(p.id)
      }));
  }, [game.availableProjects, game]);

  const debtProject = useMemo(() => {
    return game.availableProjects.find(p => p.id === 'pay-debt');
  }, [game.availableProjects]);

  // Add notification
  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3500);
  }, []);

  // Generate source items
  const refreshSourceItems = useCallback(() => {
    const items: ClothingItem[] = [];
    const count = 6 + Math.floor(findBonus * 4);
    for (let i = 0; i < count; i++) {
      items.push(generateClothingItem(findBonus, eventCategory, eventMultiplier));
    }
    setSourceItems(items);
  }, [findBonus, eventCategory, eventMultiplier]);

  // Initialize source items
  useEffect(() => {
    if (hasChosenStarter && sourceItems.length === 0) {
      refreshSourceItems();
    }
  }, [hasChosenStarter, sourceItems.length, refreshSourceItems]);

  // Refresh source items periodically
  useEffect(() => {
    if (!hasChosenStarter) return;
    const interval = setInterval(refreshSourceItems, 30000);
    return () => clearInterval(interval);
  }, [hasChosenStarter, refreshSourceItems]);

  // Auto-sell logic
  useEffect(() => {
    if (!hasChosenStarter || autoSellChance <= 0 || listings.length === 0) return;

    const interval = setInterval(() => {
      if (Math.random() < autoSellChance * 0.1) {
        // Pick a random listing to sell
        const listing = listings[Math.floor(Math.random() * listings.length)];
        if (listing) {
          const salePrice = listing.currentPrice * priceMultiplier;
          game.setState('cash', cash + salePrice);
          game.setState('totalRevenue', totalRevenue + salePrice);
          game.removeEntity(listing.id);
          game.playerAction('recordSale');
          game.playerAction('removeListing');
          addNotification(`💰 SOLD! ${listing.emoji} ${listing.name} for $${salePrice.toFixed(2)}! 🎉`, 'success');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [hasChosenStarter, autoSellChance, listings, priceMultiplier, cash, totalRevenue, game, addNotification]);

  // Source an item (buy from thrift)
  const sourceItem = useCallback((item: ClothingItem) => {
    const cost = item.basePrice * sourcingDiscount;
    if (cash < cost) {
      addNotification('❌ Not enough cash! Hustle harder! 💪', 'error');
      return;
    }
    if (inventory.length >= inventoryCapacity) {
      addNotification('❌ Inventory full! List some items first! 📦', 'error');
      return;
    }

    // Deduct cash and add to inventory
    game.setState('cash', cash - cost);
    game.setState('totalSpent', (game.state.totalSpent as number || 0) + cost);

    game.spawnEntity('inventoryItem', {
      name: item.name,
      era: item.era,
      category: item.category,
      condition: item.condition,
      rarity: item.rarity,
      basePrice: item.basePrice,
      currentPrice: item.currentPrice,
      brand: item.brand || '',
      description: item.description,
      emoji: item.emoji,
      sourcedAt: Date.now()
    });

    game.playerAction('recordSource');

    // Remove from source list
    setSourceItems(prev => prev.filter(i => i.id !== item.id));

    addNotification(`✨ Scored! ${item.emoji} ${item.name} for $${cost.toFixed(2)}! 🛍️`, 'success');
  }, [cash, sourcingDiscount, inventory.length, inventoryCapacity, game, addNotification]);

  // List an item for sale
  const listItem = useCallback((item: ClothingItem) => {
    if (listings.length >= listingsCapacity) {
      addNotification('❌ Too many listings! Wait for sales! 📱', 'error');
      return;
    }

    // Move from inventory to listings
    game.removeEntity(item.id);

    game.spawnEntity('listing', {
      name: item.name,
      era: item.era,
      category: item.category,
      condition: item.condition,
      rarity: item.rarity,
      basePrice: item.basePrice,
      currentPrice: item.currentPrice * priceMultiplier,
      brand: item.brand || '',
      description: item.description,
      emoji: item.emoji,
      listedAt: Date.now()
    });

    game.playerAction('recordListing');

    addNotification(`📸 Listed! ${item.emoji} ${item.name} for $${(item.currentPrice * priceMultiplier).toFixed(2)}! 💅`, 'success');
  }, [listings.length, listingsCapacity, priceMultiplier, game, addNotification]);

  // Sell a listed item
  const sellItem = useCallback((item: ClothingItem) => {
    const salePrice = item.currentPrice;
    game.setState('cash', cash + salePrice);
    game.setState('totalRevenue', totalRevenue + salePrice);
    game.removeEntity(item.id);
    game.playerAction('recordSale');
    game.playerAction('removeListing');

    addNotification(`💰 SOLD! ${item.emoji} ${item.name} for $${salePrice.toFixed(2)}! 🎉`, 'success');
  }, [cash, totalRevenue, game, addNotification]);

  // Handle upgrade purchase
  const handleUpgrade = useCallback((projectId: string) => {
    const success = game.purchaseProject(projectId);
    if (!success) {
      addNotification('❌ Can\'t afford that yet! Keep hustling! 💪', 'error');
    }
  }, [game, addNotification]);

  // Format numbers
  const formatMoney = (n: number) => `$${n.toFixed(2)}`;
  const formatCompact = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return Math.floor(n).toString();
  };

  // ═══════════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ═══════════════════════════════════════════════════════════════

  // Starter selection screen
  if (!hasChosenStarter) {
    return (
      <div className="thrift-game">
        <div className="starter-screen">
          <h1 className="game-title">👑 Thrift Queen 👑</h1>
          <p className="game-subtitle">Build Your Vintage Fashion Empire</p>
          <p className="game-tagline">Beat fast fashion. Save the planet. Slay the game. 💚</p>

          <div className="starter-paths">
            <button className="starter-card thrifter" onClick={() => game.playerAction('chooseThrifter')}>
              <span className="starter-emoji">🛍️</span>
              <h3>Thrift Warrior</h3>
              <p>Start with $100, no debt</p>
              <p>Pure hustle mode</p>
              <span className="starter-bonus">50 followers</span>
            </button>

            <button className="starter-card influencer" onClick={() => game.playerAction('chooseInfluencer')}>
              <span className="starter-emoji">📱</span>
              <h3>Micro-Influencer</h3>
              <p>Start with $200, no debt</p>
              <p>500 followers ready to shop!</p>
              <span className="starter-bonus">+0.5 followers/sec</span>
            </button>

            <button className="starter-card investor" onClick={() => game.playerAction('chooseInvestor')}>
              <span className="starter-emoji">💰</span>
              <h3>Investor Backed</h3>
              <p>Start with $500</p>
              <p>$400 debt (go big!)</p>
              <span className="starter-bonus">+10 inventory slots</span>
            </button>
          </div>

          <button className="back-to-hub" onClick={onNavigateToHub}>
            ← Back to Game Hub
          </button>
        </div>
      </div>
    );
  }

  // Win screen
  if (hasWon) {
    return (
      <div className="thrift-game">
        <div className="win-screen">
          <h1>👑💚 YOU DID IT! 💚👑</h1>
          <h2>Sustainable Fashion Queen</h2>
          <p className="win-stats">
            💰 ${formatCompact(totalRevenue)} Revenue<br />
            ⭐ {Math.floor(reputation)} Reputation<br />
            💚 {formatCompact(ecoScore)} EcoScore<br />
            👗 {itemsSold} Items Rehomed<br />
            🏪 {storeCount} Stores<br />
            👥 {formatCompact(followers)} Followers
          </p>
          <p className="win-message">
            You've built a sustainable fashion empire and proven that vintage beats fast fashion!
            The fashion industry will never be the same. 🌍✨
          </p>
          <button className="play-again-btn" onClick={() => {
            game.reset();
            window.location.reload();
          }}>
            👑 Play Again
          </button>
          <button className="back-to-hub" onClick={onNavigateToHub}>
            ← Back to Game Hub
          </button>
        </div>
      </div>
    );
  }

  // Main game UI
  return (
    <div className="thrift-game">
      {/* Header */}
      <header className="game-header">
        <div className="header-left">
          <button className="hub-btn" onClick={onNavigateToHub}>← Hub</button>
          <h1 className="game-logo">👑 Thrift Queen</h1>
        </div>
        <div className="header-stats">
          <div className="stat cash">💵 {formatMoney(cash)}</div>
          {debt > 0 && <div className="stat debt">💳 -{formatMoney(debt)}</div>}
          <div className="stat rep">⭐ {Math.floor(reputation)}</div>
          <div className="stat eco">💚 {formatCompact(ecoScore)}</div>
          <div className="stat followers">📱 {formatCompact(followers)}</div>
        </div>
        <div className="header-right">
          <div className="phase-badge">{currentPhase.toUpperCase()}</div>
        </div>
      </header>

      {/* Event Banner */}
      {eventName && (
        <div className="event-banner">
          <span className="event-name">{eventName}</span>
          <span className="event-timer">{Math.ceil(eventTicksRemaining / 10)}s</span>
        </div>
      )}

      {/* Notifications */}
      <div className="notifications">
        {notifications.map(n => (
          <div key={n.id} className={`notification ${n.type}`}>
            {n.message}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="game-nav">
        <button className={view === 'source' ? 'active' : ''} onClick={() => setView('source')}>
          🛍️ Source
        </button>
        <button className={view === 'inventory' ? 'active' : ''} onClick={() => setView('inventory')}>
          📦 Inventory ({inventory.length}/{inventoryCapacity})
        </button>
        <button className={view === 'listings' ? 'active' : ''} onClick={() => setView('listings')}>
          📱 Listings ({listings.length}/{listingsCapacity})
        </button>
        {showUpgrades && (
          <button className={view === 'upgrades' ? 'active' : ''} onClick={() => setView('upgrades')}>
            ✨ Upgrades ({availableUpgrades.length})
          </button>
        )}
        <button className={view === 'stats' ? 'active' : ''} onClick={() => setView('stats')}>
          📊 Empire
        </button>
      </nav>

      {/* Main Content */}
      <main className="game-content">
        {/* SOURCE VIEW */}
        {view === 'source' && (
          <div className="source-view">
            <div className="view-header">
              <h2>🛍️ Thrift the Racks</h2>
              <button className="refresh-btn" onClick={refreshSourceItems}>🔄 New Finds</button>
            </div>
            <p className="view-subtitle">Find hidden gems! Tip: Watch for trends to maximize profits 📈</p>

            <div className="items-grid">
              {sourceItems.map(item => (
                <div key={item.id} className={`item-card ${item.rarity}`}>
                  <div className="item-visual">
                    <ClothingVisual item={toVisualItem(item)} size="small" showDetails />
                  </div>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-details">
                      <span className="item-era">{item.description}</span>
                      <span className={`item-condition ${item.condition}`}>{item.condition}</span>
                    </div>
                    {item.brand && <div className="item-brand">✨ {item.brand}</div>}
                    <div className="item-prices">
                      <span className="buy-price">Buy: {formatMoney(item.basePrice * sourcingDiscount)}</span>
                      <span className="sell-price">Sell: ~{formatMoney(item.currentPrice * priceMultiplier)}</span>
                    </div>
                  </div>
                  <button
                    className="source-btn"
                    onClick={() => sourceItem(item)}
                    disabled={cash < item.basePrice * sourcingDiscount || inventory.length >= inventoryCapacity}
                  >
                    {cash < item.basePrice * sourcingDiscount ? '💸 Too $$$' :
                     inventory.length >= inventoryCapacity ? '📦 Full!' : '🛒 Grab It!'}
                  </button>
                </div>
              ))}
            </div>

            <div className="source-actions">
              <button className="loan-btn" onClick={() => game.playerAction('takeLoan')}>
                💳 Take Loan (+$200)
              </button>
              {debtProject && (
                <button className="pay-debt-btn" onClick={() => handleUpgrade('pay-debt')}>
                  💳 Pay Debt (-$100)
                </button>
              )}
            </div>
          </div>
        )}

        {/* INVENTORY VIEW */}
        {view === 'inventory' && (
          <div className="inventory-view">
            <div className="view-header">
              <h2>📦 Your Inventory</h2>
              <span className="count">{inventory.length}/{inventoryCapacity}</span>
            </div>
            <p className="view-subtitle">Style and list these finds to sell! 📸</p>

            {inventory.length === 0 ? (
              <div className="empty-state">
                <span className="empty-emoji">👗</span>
                <p>No items yet! Go source some vintage gems! 🛍️</p>
              </div>
            ) : (
              <div className="items-grid">
                {inventory.map(item => (
                  <div key={item.id} className={`item-card ${item.rarity}`}>
                    <div className="item-visual">
                      <ClothingVisual item={toVisualItem(item)} size="small" showDetails />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-details">
                        <span className="item-era">{item.description}</span>
                        <span className={`item-condition ${item.condition}`}>{item.condition}</span>
                      </div>
                      {item.brand && <div className="item-brand">✨ {item.brand}</div>}
                      <div className="item-prices">
                        <span className="sell-price">Value: {formatMoney(item.currentPrice * priceMultiplier)}</span>
                      </div>
                    </div>
                    <button
                      className="list-btn"
                      onClick={() => listItem(item)}
                      disabled={listings.length >= listingsCapacity}
                    >
                      {listings.length >= listingsCapacity ? '📱 Max Listed' : '📸 List It!'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LISTINGS VIEW */}
        {view === 'listings' && (
          <div className="listings-view">
            <div className="view-header">
              <h2>📱 Active Listings</h2>
              <span className="count">{listings.length}/{listingsCapacity}</span>
            </div>
            <p className="view-subtitle">
              {autoSellChance > 0
                ? `Auto-selling at ${Math.floor(autoSellChance * 100)}% rate! Or tap to instant-sell 💅`
                : 'Tap an item to make an instant sale! Get Depop shop for auto-sell 🛍️'}
            </p>

            {listings.length === 0 ? (
              <div className="empty-state">
                <span className="empty-emoji">📸</span>
                <p>No listings yet! List items from your inventory! 💅</p>
              </div>
            ) : (
              <div className="items-grid">
                {listings.map(item => (
                  <div key={item.id} className={`item-card ${item.rarity} listed`}>
                    <div className="item-visual">
                      <ClothingVisual item={toVisualItem(item)} size="small" showDetails />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-details">
                        <span className="item-era">{item.description}</span>
                        <span className={`item-condition ${item.condition}`}>{item.condition}</span>
                      </div>
                      {item.brand && <div className="item-brand">✨ {item.brand}</div>}
                      <div className="item-prices">
                        <span className="sell-price">💰 {formatMoney(item.currentPrice)}</span>
                      </div>
                    </div>
                    <button className="sell-btn" onClick={() => sellItem(item)}>
                      💸 Sell Now!
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPGRADES VIEW */}
        {view === 'upgrades' && (
          <div className="upgrades-view">
            <div className="view-header">
              <h2>✨ Level Up Your Empire</h2>
            </div>

            <div className="upgrades-grid">
              {availableUpgrades.map(project => (
                <button
                  key={project.id}
                  className={`upgrade-card ${project.affordable ? 'affordable' : 'locked'}`}
                  onClick={() => handleUpgrade(project.id)}
                  disabled={!project.affordable}
                >
                  <div className="upgrade-icon">{project.icon}</div>
                  <div className="upgrade-name">{project.name}</div>
                  <div className="upgrade-desc">{project.description}</div>
                  <div className="upgrade-cost">{project.priceTag}</div>
                </button>
              ))}
            </div>

            {availableUpgrades.length === 0 && (
              <div className="empty-state">
                <span className="empty-emoji">🌟</span>
                <p>No upgrades available yet! Keep selling to unlock more! 💪</p>
              </div>
            )}
          </div>
        )}

        {/* STATS VIEW */}
        {view === 'stats' && (
          <div className="stats-view">
            <div className="view-header">
              <h2>📊 Your Fashion Empire</h2>
            </div>

            <div className="empire-stats">
              <div className="stat-section">
                <h3>💰 Financials</h3>
                <div className="stat-row"><span>Cash:</span><span>{formatMoney(cash)}</span></div>
                <div className="stat-row"><span>Debt:</span><span>{formatMoney(debt)}</span></div>
                <div className="stat-row"><span>Total Profit:</span><span>{formatMoney(totalProfit)}</span></div>
                <div className="stat-row"><span>Total Revenue:</span><span>{formatMoney(totalRevenue)}</span></div>
                <div className="stat-row"><span>Passive Income:</span><span>{formatMoney(passiveIncome + storeIncome)}/sec</span></div>
              </div>

              <div className="stat-section">
                <h3>⭐ Brand Power</h3>
                <div className="stat-row"><span>Reputation:</span><span>{Math.floor(reputation)}/100</span></div>
                <div className="stat-row"><span>Style Cred:</span><span>{styleCred}</span></div>
                <div className="stat-row"><span>Price Bonus:</span><span>+{Math.floor((priceMultiplier - 1) * 100)}%</span></div>
              </div>

              <div className="stat-section">
                <h3>💚 Sustainability</h3>
                <div className="stat-row"><span>EcoScore:</span><span>{formatCompact(ecoScore)}</span></div>
                <div className="stat-row"><span>Fast Fashion Damage:</span><span>{formatCompact(fastFashionDamage)}</span></div>
                <div className="stat-row"><span>Items Saved:</span><span>{itemsSold}</span></div>
              </div>

              <div className="stat-section">
                <h3>📱 Social</h3>
                <div className="stat-row"><span>Followers:</span><span>{formatCompact(followers)}</span></div>
                <div className="stat-row"><span>Subscribers:</span><span>{formatCompact(subscribers)}</span></div>
              </div>

              <div className="stat-section">
                <h3>🏪 Operations</h3>
                <div className="stat-row"><span>Stores:</span><span>{storeCount}</span></div>
                <div className="stat-row"><span>Employees:</span><span>{employeeCount}</span></div>
                <div className="stat-row"><span>Inventory:</span><span>{inventory.length}/{inventoryCapacity}</span></div>
                <div className="stat-row"><span>Listings:</span><span>{listings.length}/{listingsCapacity}</span></div>
              </div>
            </div>

            <div className="win-progress">
              <h3>👑 Path to Victory</h3>
              <p>Reach $1M revenue, 80 reputation, and 500 EcoScore to win!</p>
              <div className="progress-bars">
                <div className="progress-item">
                  <span>Revenue</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, totalRevenue / 10000)}%` }}></div>
                  </div>
                  <span>{formatMoney(totalRevenue)} / $1M</span>
                </div>
                <div className="progress-item">
                  <span>Reputation</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, reputation / 0.8)}%` }}></div>
                  </div>
                  <span>{Math.floor(reputation)} / 80</span>
                </div>
                <div className="progress-item">
                  <span>EcoScore</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, ecoScore / 5)}%` }}></div>
                  </div>
                  <span>{formatCompact(ecoScore)} / 500</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <div className="footer-tips">
          {currentPhase === 'hustle' && '💡 Tip: Focus on quick flips to build cash!'}
          {currentPhase === 'online' && '💡 Tip: Get that Depop shop for auto-selling!'}
          {currentPhase === 'brand' && '💡 Tip: Influencer collabs boost followers fast!'}
          {currentPhase === 'retail' && '💡 Tip: Stores generate passive income 24/7!'}
          {currentPhase === 'global' && '💡 Tip: Fashion Week sponsorship is the ultimate flex!'}
        </div>
        <div className="version">v1.0.0 | 💚 Beat Fast Fashion</div>
      </footer>
    </div>
  );
}

export default ThriftQueenGame;
