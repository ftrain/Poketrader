import type { MarketEvent, CollectionCard, MarketCard } from '../types';

export interface AdvisorTip {
  id: string;
  advisor: string;
  icon: string;
  message: string;
  action: string; // What to do
  priority: 'high' | 'medium' | 'low';
}

// Tips triggered by market events
export function getEventTips(event: MarketEvent | null): AdvisorTip | null {
  if (!event) return null;

  // Positive events = BUY signal
  if (event.multiplier > 1.3) {
    if (event.effect === 'fire') {
      return {
        id: 'buy-fire',
        advisor: 'Prof. Oak',
        icon: '🔬',
        message: `Fire types surging! ${event.title}`,
        action: '🔥 BUY fire cards NOW - sell when event ends',
        priority: 'high'
      };
    }
    if (event.effect === 'electric') {
      return {
        id: 'buy-electric',
        advisor: 'Lt. Surge',
        icon: '⚡',
        message: `Electric demand spiking!`,
        action: '⚡ BUY electric cards - prices will drop after',
        priority: 'high'
      };
    }
    if (event.effect === 'dragon') {
      return {
        id: 'buy-dragon',
        advisor: 'Lance',
        icon: '🐉',
        message: `Dragon tournament driving prices up!`,
        action: '🐉 SELL dragon cards now at peak prices',
        priority: 'high'
      };
    }
    if (event.effect === 'all') {
      return {
        id: 'bull-market',
        advisor: 'Giovanni',
        icon: '📈',
        message: `Bull market! Everything rising.`,
        action: '💰 SELL your collection at inflated prices',
        priority: 'high'
      };
    }
    if (event.effect === 'legendary') {
      return {
        id: 'legendary-hype',
        advisor: 'Cynthia',
        icon: '⭐',
        message: `Legendary hype! Speculators buying.`,
        action: '🎯 HOLD legendaries - prices climbing',
        priority: 'high'
      };
    }
  }

  // Negative events = BUY opportunity
  if (event.multiplier < 0.8) {
    if (event.effect === 'all') {
      return {
        id: 'bear-buy',
        advisor: 'Prof. Oak',
        icon: '🔬',
        message: `Market crash = buying opportunity!`,
        action: '🛒 BUY NOW while prices are low',
        priority: 'high'
      };
    }
    if (event.effect === 'common') {
      return {
        id: 'common-crash',
        advisor: 'Youngster Joey',
        icon: '🧢',
        message: `Commons flooding the market!`,
        action: '⚠️ AVOID common cards - oversupply',
        priority: 'medium'
      };
    }
  }

  return null;
}

// Tips based on collection state
export function getCollectionTips(
  collection: CollectionCard[],
  money: number,
  event: MarketEvent | null
): AdvisorTip | null {
  // Too much cash sitting idle
  if (money > 500 && collection.length < 5) {
    return {
      id: 'idle-cash',
      advisor: 'Bill',
      icon: '💻',
      message: `${Math.floor(money)} sitting idle!`,
      action: '📦 Open packs or buy cards - money should work',
      priority: 'medium'
    };
  }

  // Check for profitable cards to sell
  const profitableCards = collection.filter(c => {
    const profit = c.currentPrice - c.purchasePrice;
    const profitPercent = c.purchasePrice > 0 ? (profit / c.purchasePrice) * 100 : 100;
    return profitPercent > 30;
  });

  if (profitableCards.length >= 3) {
    const totalProfit = profitableCards.reduce((sum, c) =>
      sum + (c.currentPrice - c.purchasePrice), 0
    );
    return {
      id: 'take-profits',
      advisor: 'Nurse Joy',
      icon: '💝',
      message: `${profitableCards.length} cards up 30%+!`,
      action: `💰 SELL to lock in $${totalProfit.toFixed(0)} profit`,
      priority: 'high'
    };
  }

  // Losing cards warning
  const losingCards = collection.filter(c => {
    if (c.purchasePrice === 0) return false;
    const loss = c.purchasePrice - c.currentPrice;
    return loss > c.purchasePrice * 0.2;
  });

  if (losingCards.length >= 2) {
    return {
      id: 'cut-losses',
      advisor: 'Blaine',
      icon: '🔥',
      message: `${losingCards.length} cards down 20%+`,
      action: '✂️ Consider cutting losses or hold for recovery',
      priority: 'low'
    };
  }

  // Mint condition opportunity
  const mintCards = collection.filter(c => c.condition === 'mint' && c.currentPrice > 30);
  if (mintCards.length > 0 && !event) {
    return {
      id: 'grade-mint',
      advisor: 'Prof. Elm',
      icon: '📋',
      message: `${mintCards.length} MINT cards could grade well!`,
      action: '🏅 Send to grading for 1.5-3x value boost',
      priority: 'medium'
    };
  }

  return null;
}

// Tips based on market conditions
export function getMarketTips(
  market: MarketCard[],
  money: number,
  collection: CollectionCard[]
): AdvisorTip | null {
  // Find deals (low condition = cheap entry)
  const poorConditionDeals = market.filter(c =>
    c.condition === 'poor' && c.rarity !== 'common' && c.currentPrice < 10
  );

  if (poorConditionDeals.length >= 2 && money > 50) {
    return {
      id: 'poor-deals',
      advisor: 'Team Rocket',
      icon: '🚀',
      message: `Damaged rare cards cheap!`,
      action: '🎲 Risky buy - low price, but poor resale',
      priority: 'low'
    };
  }

  // Find mint condition premium cards
  const mintPremiums = market.filter(c =>
    c.condition === 'mint' && c.currentPrice > 50
  );

  if (mintPremiums.length > 0 && money > mintPremiums[0].currentPrice) {
    return {
      id: 'mint-premium',
      advisor: 'Collector',
      icon: '👔',
      message: `MINT ${mintPremiums[0].name} available!`,
      action: '⭐ Premium condition = higher resale value',
      priority: 'medium'
    };
  }

  // Diversification tip
  const ownedTypes = new Set(collection.map(c => c.type));
  if (collection.length > 5 && ownedTypes.size < 3) {
    return {
      id: 'diversify',
      advisor: 'Prof. Oak',
      icon: '🔬',
      message: `All eggs in one basket!`,
      action: '🌈 Diversify types - events affect specific types',
      priority: 'medium'
    };
  }

  return null;
}

// General strategy tips shown periodically
export function getStrategyTip(totalSold: number, packsOpened: number): AdvisorTip | null {
  if (totalSold < 3) {
    return {
      id: 'start-selling',
      advisor: 'Mom',
      icon: '🏠',
      message: `Don't just collect - trade!`,
      action: '💡 Buy low, sell high. That\'s the game!',
      priority: 'low'
    };
  }

  if (packsOpened > 10 && totalSold < 5) {
    return {
      id: 'pack-trap',
      advisor: 'Prof. Oak',
      icon: '🔬',
      message: `Pack addiction detected!`,
      action: '⚠️ Packs are gambling - market buying is safer',
      priority: 'medium'
    };
  }

  return null;
}
