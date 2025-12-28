import type { GameStats, MarketCard, MarketEvent } from '../types';

export interface GameRule {
  id: string;
  name: string;
  category: 'market' | 'collection' | 'achievement' | 'event' | 'economy' | 'pack';
  description: string;
  condition: string; // Human readable condition
  effect: string; // Human readable effect
  checkCondition: (state: RuleEngineState) => boolean;
  priority: number; // Higher priority rules checked first
  cooldown?: number; // Seconds between triggers
  lastTriggered?: number;
}

export interface RuleEngineState extends GameStats {
  market: MarketCard[];
  currentEvent: MarketEvent | null;
  eventTimer: number;
  gameTime: number;
  upgrades: number[];
  clickPower: number;
  passiveIncome: number;
  discount: number;
  sellBonus: number;
  capacity: number;
}

export interface RuleMatch {
  rule: GameRule;
  timestamp: number;
  context?: Record<string, unknown>;
}

// Core game rules
export const GAME_RULES: GameRule[] = [
  // Market Rules
  {
    id: 'market-bull-run',
    name: 'Bull Market Detection',
    category: 'market',
    description: 'Detects when market prices are trending upward',
    condition: 'Current event has positive multiplier (>1.0)',
    effect: 'Signals good time to sell high-value cards',
    checkCondition: (state) => state.currentEvent?.multiplier ? state.currentEvent.multiplier > 1 : false,
    priority: 80
  },
  {
    id: 'market-bear-run',
    name: 'Bear Market Detection',
    category: 'market',
    description: 'Detects when market prices are trending downward',
    condition: 'Current event has negative multiplier (<1.0)',
    effect: 'Signals good time to buy undervalued cards',
    checkCondition: (state) => state.currentEvent?.multiplier ? state.currentEvent.multiplier < 1 : false,
    priority: 80
  },
  {
    id: 'market-opportunity',
    name: 'Market Opportunity',
    category: 'market',
    description: 'Identifies undervalued cards in the market',
    condition: 'A card in market is priced below 80% of base value',
    effect: 'Highlights potential profitable purchases',
    checkCondition: (state) => state.market.some(card => card.currentPrice < card.basePrice * 0.8),
    priority: 70
  },

  // Collection Rules
  {
    id: 'collection-profit-ready',
    name: 'Profit Taking Signal',
    category: 'collection',
    description: 'Detects cards with significant unrealized gains',
    condition: 'A held card is worth 20%+ more than purchase price',
    effect: 'Suggests selling to lock in profits',
    checkCondition: (state) => state.collection.some(card =>
      card.currentPrice > card.purchasePrice * 1.2
    ),
    priority: 75
  },
  {
    id: 'collection-stop-loss',
    name: 'Stop Loss Warning',
    category: 'collection',
    description: 'Warns about cards losing significant value',
    condition: 'A held card has dropped 15%+ below purchase price',
    effect: 'Alerts to potential need to cut losses',
    checkCondition: (state) => state.collection.some(card =>
      card.currentPrice < card.purchasePrice * 0.85
    ),
    priority: 90
  },
  {
    id: 'collection-near-capacity',
    name: 'Storage Warning',
    category: 'collection',
    description: 'Warns when storage is nearly full',
    condition: 'Collection is at 80%+ capacity',
    effect: 'Prompts selling or upgrading storage',
    checkCondition: (state) => state.collection.length >= state.capacity * 0.8,
    priority: 85
  },
  {
    id: 'collection-diamond-hands',
    name: 'Diamond Hands Bonus',
    category: 'collection',
    description: 'Rewards patient holders',
    condition: 'Any card held for 60+ seconds',
    effect: 'Long-term holdings may see volatility benefits',
    checkCondition: (state) => state.collection.some(card => (card.holdTime || 0) > 60),
    priority: 40
  },

  // Economy Rules
  {
    id: 'economy-low-funds',
    name: 'Low Funds Alert',
    category: 'economy',
    description: 'Warns when money is running low',
    condition: 'Balance is below $50',
    effect: 'Suggests clicking or selling to raise funds',
    checkCondition: (state) => state.money < 50,
    priority: 95
  },
  {
    id: 'economy-wealthy',
    name: 'Wealth Accumulation',
    category: 'economy',
    description: 'Detects significant savings',
    condition: 'Balance exceeds $1000',
    effect: 'Consider investments or upgrades',
    checkCondition: (state) => state.money >= 1000,
    priority: 50
  },
  {
    id: 'economy-negative-roi',
    name: 'Negative ROI Warning',
    category: 'economy',
    description: 'Warns about unprofitable trading',
    condition: 'Total profit is negative',
    effect: 'Review trading strategy',
    checkCondition: (state) => state.totalProfit < 0,
    priority: 85
  },

  // Pack Rules
  {
    id: 'pack-ev-analysis',
    name: 'Pack Value Assessment',
    category: 'pack',
    description: 'Analyzes expected value of pack purchases',
    condition: 'More than 5 packs opened',
    effect: 'Can calculate if packs are profitable',
    checkCondition: (state) => state.packsOpened > 5,
    priority: 60
  },
  {
    id: 'pack-lucky-streak',
    name: 'Lucky Streak Detection',
    category: 'pack',
    description: 'Detects positive pack value trend',
    condition: 'Pack total value exceeds amount spent',
    effect: 'Packs have been profitable overall',
    checkCondition: (state) => state.packStats.totalValue > state.packStats.spent,
    priority: 55
  },
  {
    id: 'pack-unlucky-streak',
    name: 'Unlucky Streak Warning',
    category: 'pack',
    description: 'Detects negative pack value trend',
    condition: 'Amount spent exceeds pack total value',
    effect: 'Packs have been unprofitable - consider market trading',
    checkCondition: (state) => state.packStats.spent > state.packStats.totalValue && state.packsOpened > 3,
    priority: 70
  },

  // Event Rules
  {
    id: 'event-ending-soon',
    name: 'Event Ending Soon',
    category: 'event',
    description: 'Warns about expiring market events',
    condition: 'Active event with less than 10 seconds remaining',
    effect: 'Last chance to act on event conditions',
    checkCondition: (state) => state.currentEvent !== null && state.eventTimer <= 10 && state.eventTimer > 0,
    priority: 92
  },
  {
    id: 'event-type-bonus',
    name: 'Type Bonus Active',
    category: 'event',
    description: 'Detects type-specific price bonuses',
    condition: 'Event affects specific Pokemon type',
    effect: 'Cards of that type are worth more/less',
    checkCondition: (state) => {
      if (!state.currentEvent) return false;
      const effect = state.currentEvent.effect;
      return effect !== 'all' && !['common', 'uncommon', 'rare', 'ultra-rare', 'legendary', 'secret-rare', 'chase'].includes(effect);
    },
    priority: 75
  },

  // Achievement Rules
  {
    id: 'achievement-progress',
    name: 'Achievement Progress',
    category: 'achievement',
    description: 'Tracks progress toward achievements',
    condition: 'Various achievement conditions being approached',
    effect: 'Close to unlocking new abilities',
    checkCondition: (state) => {
      // Check if close to any common thresholds
      return state.totalSold >= 20 || state.money >= 800 || state.collection.length >= 8;
    },
    priority: 45
  }
];

export class RulesEngine {
  private rules: GameRule[];
  private matchHistory: RuleMatch[] = [];
  private maxHistorySize = 100;

  constructor(rules: GameRule[] = GAME_RULES) {
    this.rules = [...rules].sort((a, b) => b.priority - a.priority);
  }

  evaluate(state: RuleEngineState): RuleMatch[] {
    const now = Date.now();
    const matches: RuleMatch[] = [];

    for (const rule of this.rules) {
      // Check cooldown
      if (rule.lastTriggered && rule.cooldown) {
        const elapsed = (now - rule.lastTriggered) / 1000;
        if (elapsed < rule.cooldown) continue;
      }

      try {
        if (rule.checkCondition(state)) {
          const match: RuleMatch = {
            rule,
            timestamp: now
          };
          matches.push(match);
          rule.lastTriggered = now;
        }
      } catch {
        // Skip rules that error
      }
    }

    // Update history
    this.matchHistory.push(...matches);
    if (this.matchHistory.length > this.maxHistorySize) {
      this.matchHistory = this.matchHistory.slice(-this.maxHistorySize);
    }

    return matches;
  }

  getRules(): GameRule[] {
    return this.rules;
  }

  getRulesByCategory(category: GameRule['category']): GameRule[] {
    return this.rules.filter(r => r.category === category);
  }

  getMatchHistory(): RuleMatch[] {
    return this.matchHistory;
  }

  getActiveRules(state: RuleEngineState): GameRule[] {
    return this.rules.filter(rule => {
      try {
        return rule.checkCondition(state);
      } catch {
        return false;
      }
    });
  }
}

// Singleton instance
export const rulesEngine = new RulesEngine();
