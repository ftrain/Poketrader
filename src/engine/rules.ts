import type { GameStats, MarketCard, MarketEvent } from '../types';
import { EVOLUTION_CHAINS } from '../data/cards';

export interface GameRule {
  id: string;
  name: string;
  category: 'market' | 'collection' | 'achievement' | 'event' | 'economy' | 'pack' | 'victory' | 'strategy' | 'pokemon';
  description: string;
  condition: string; // Human readable condition
  effect: string; // Human readable effect
  checkCondition: (state: RuleEngineState) => boolean;
  priority: number; // Higher priority rules checked first
  cooldown?: number; // Seconds between triggers
  lastTriggered?: number;
}

// Helper to check evolution chain completion
function getEvolutionProgress(cardNames: string[]): { complete: string[], partial: string[] } {
  const complete: string[] = [];
  const partial: string[] = [];

  for (const [chainName, pokemon] of Object.entries(EVOLUTION_CHAINS)) {
    const owned = pokemon.filter(p => cardNames.includes(p));
    if (owned.length === pokemon.length) {
      complete.push(chainName);
    } else if (owned.length >= 2) {
      partial.push(chainName);
    }
  }

  return { complete, partial };
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
      return state.totalSold >= 20 || state.money >= 800 || state.collection.length >= 8;
    },
    priority: 45
  },

  // Victory Conditions
  {
    id: 'victory-millionaire',
    name: 'MILLIONAIRE',
    category: 'victory',
    description: 'Ultimate wealth achievement',
    condition: 'Accumulate $1,000,000 in total profit',
    effect: 'YOU WIN - Master Trader status achieved',
    checkCondition: (state) => state.totalProfit >= 1000000,
    priority: 100
  },
  {
    id: 'victory-hundredaire',
    name: 'First $100 Profit',
    category: 'victory',
    description: 'Early game milestone',
    condition: 'Earn $100 in total profit',
    effect: 'Beginner trader - learning the ropes',
    checkCondition: (state) => state.totalProfit >= 100,
    priority: 98
  },
  {
    id: 'victory-thousandaire',
    name: 'First $1,000 Profit',
    category: 'victory',
    description: 'Intermediate milestone',
    condition: 'Earn $1,000 in total profit',
    effect: 'Apprentice trader - getting serious',
    checkCondition: (state) => state.totalProfit >= 1000,
    priority: 97
  },
  {
    id: 'victory-ten-thousand',
    name: 'First $10,000 Profit',
    category: 'victory',
    description: 'Advanced milestone',
    condition: 'Earn $10,000 in total profit',
    effect: 'Journeyman trader - real money now',
    checkCondition: (state) => state.totalProfit >= 10000,
    priority: 96
  },
  {
    id: 'victory-collector',
    name: 'Master Collector',
    category: 'victory',
    description: 'Fill your collection completely',
    condition: 'Collection at maximum capacity',
    effect: 'Storage mastery achieved',
    checkCondition: (state) => state.collection.length >= state.capacity,
    priority: 90
  },
  {
    id: 'victory-legendary-owner',
    name: 'Legendary Owner',
    category: 'victory',
    description: 'Own a legendary card',
    condition: 'Have a legendary rarity card in collection',
    effect: 'Elite collector status',
    checkCondition: (state) => state.collection.some(c => c.rarity === 'legendary'),
    priority: 88
  },
  {
    id: 'victory-chase-owner',
    name: 'Chase Card Owner',
    category: 'victory',
    description: 'Own the rarest chase card',
    condition: 'Have a chase rarity card in collection',
    effect: 'Ultimate collector - you found the grail',
    checkCondition: (state) => state.collection.some(c => c.rarity === 'chase'),
    priority: 89
  },

  // Strategy Rules
  {
    id: 'strategy-buy-low',
    name: 'Buy Low Strategy',
    category: 'strategy',
    description: 'Fundamental trading principle',
    condition: 'Market has cards priced 20%+ below base value',
    effect: 'Opportunity to profit on price recovery',
    checkCondition: (state) => state.market.some(c => c.currentPrice < c.basePrice * 0.8),
    priority: 70
  },
  {
    id: 'strategy-sell-high',
    name: 'Sell High Strategy',
    category: 'strategy',
    description: 'Fundamental trading principle',
    condition: 'Owned card is 30%+ above purchase price',
    effect: 'Lock in profits before price drops',
    checkCondition: (state) => state.collection.some(c => c.currentPrice > c.purchasePrice * 1.3),
    priority: 70
  },
  {
    id: 'strategy-diversify',
    name: 'Diversification',
    category: 'strategy',
    description: 'Risk management through variety',
    condition: 'Own 5+ cards of different types',
    effect: 'Protected from single-type market crashes',
    checkCondition: (state) => {
      const types = new Set(state.collection.map(c => c.type));
      return types.size >= 5;
    },
    priority: 60
  },
  {
    id: 'strategy-type-corner',
    name: 'Type Cornering',
    category: 'strategy',
    description: 'Control supply of a Pokemon type',
    condition: 'Own 5+ cards of the same type',
    effect: 'Market influence on that type increased',
    checkCondition: (state) => {
      const typeCounts: Record<string, number> = {};
      state.collection.forEach(c => {
        typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
      });
      return Object.values(typeCounts).some(count => count >= 5);
    },
    priority: 75
  },
  {
    id: 'strategy-rarity-corner',
    name: 'Rarity Cornering',
    category: 'strategy',
    description: 'Control supply of a rarity tier',
    condition: 'Own 4+ cards of the same rarity (rare+)',
    effect: 'Pricing power on that rarity tier',
    checkCondition: (state) => {
      const rarityCounts: Record<string, number> = {};
      const targetRarities = ['rare', 'ultra-rare', 'secret-rare', 'legendary'];
      state.collection.filter(c => targetRarities.includes(c.rarity)).forEach(c => {
        rarityCounts[c.rarity] = (rarityCounts[c.rarity] || 0) + 1;
      });
      return Object.values(rarityCounts).some(count => count >= 4);
    },
    priority: 78
  },
  {
    id: 'strategy-market-maker',
    name: 'Market Maker',
    category: 'strategy',
    description: 'Provide liquidity by active trading',
    condition: 'Sold 50+ cards total',
    effect: 'You move the market',
    checkCondition: (state) => state.totalSold >= 50,
    priority: 65
  },
  {
    id: 'strategy-arbitrage',
    name: 'Arbitrage Opportunity',
    category: 'strategy',
    description: 'Price discrepancy between market and collection',
    condition: 'Market card cheaper than owned card of same rarity',
    effect: 'Can profit from price differences',
    checkCondition: (state) => {
      for (const marketCard of state.market) {
        for (const ownedCard of state.collection) {
          if (marketCard.rarity === ownedCard.rarity &&
              marketCard.currentPrice < ownedCard.currentPrice * 0.7) {
            return true;
          }
        }
      }
      return false;
    },
    priority: 72
  },
  {
    id: 'strategy-monopoly',
    name: 'Market Monopoly',
    category: 'strategy',
    description: 'Total market control',
    condition: 'Own 10+ cards AND collection worth $5000+',
    effect: 'You ARE the market',
    checkCondition: (state) => {
      const collectionValue = state.collection.reduce((sum, c) => sum + c.currentPrice, 0);
      return state.collection.length >= 10 && collectionValue >= 5000;
    },
    priority: 85
  },
  {
    id: 'strategy-pump-ready',
    name: 'Pump Opportunity',
    category: 'strategy',
    description: 'Hold cards during favorable event',
    condition: 'Own cards that match current event type bonus',
    effect: 'Your cards are temporarily worth more',
    checkCondition: (state) => {
      if (!state.currentEvent || state.currentEvent.multiplier <= 1) return false;
      const eventType = state.currentEvent.effect;
      return state.collection.some(c => c.type === eventType || c.rarity === eventType);
    },
    priority: 82
  },
  {
    id: 'strategy-dump-warning',
    name: 'Dump Warning',
    category: 'strategy',
    description: 'Event ending may crash prices',
    condition: 'Holding event-boosted cards with <15s left',
    effect: 'Sell before the event ends or prices crash',
    checkCondition: (state) => {
      if (!state.currentEvent || state.eventTimer > 15 || state.currentEvent.multiplier <= 1) return false;
      const eventType = state.currentEvent.effect;
      return state.collection.some(c => c.type === eventType || c.rarity === eventType);
    },
    priority: 95
  },

  // Market Cornering Rules
  {
    id: 'corner-fire-type',
    name: 'Fire Type Corner',
    category: 'market',
    description: 'Control the fire-type market',
    condition: 'Own 3+ fire-type cards',
    effect: 'Fire-type market influence',
    checkCondition: (state) => state.collection.filter(c => c.type === 'fire').length >= 3,
    priority: 55
  },
  {
    id: 'corner-water-type',
    name: 'Water Type Corner',
    category: 'market',
    description: 'Control the water-type market',
    condition: 'Own 3+ water-type cards',
    effect: 'Water-type market influence',
    checkCondition: (state) => state.collection.filter(c => c.type === 'water').length >= 3,
    priority: 55
  },
  {
    id: 'corner-electric-type',
    name: 'Electric Type Corner',
    category: 'market',
    description: 'Control the electric-type market',
    condition: 'Own 3+ electric-type cards',
    effect: 'Electric-type market influence',
    checkCondition: (state) => state.collection.filter(c => c.type === 'electric').length >= 3,
    priority: 55
  },
  {
    id: 'corner-dragon-type',
    name: 'Dragon Type Corner',
    category: 'market',
    description: 'Control the prestigious dragon market (only 2 needed - dragons are ultra-rare!)',
    condition: 'Own 2+ dragon-type cards (lower threshold due to extreme rarity)',
    effect: 'Dragon-type market dominance - true power!',
    checkCondition: (state) => state.collection.filter(c => c.type === 'dragon').length >= 2,
    priority: 65  // Higher priority than other type corners due to prestige
  },
  {
    id: 'corner-psychic-type',
    name: 'Psychic Type Corner',
    category: 'market',
    description: 'Control the psychic-type market',
    condition: 'Own 3+ psychic-type cards',
    effect: 'Psychic-type market influence',
    checkCondition: (state) => state.collection.filter(c => c.type === 'psychic').length >= 3,
    priority: 55
  },

  // Pokemon Lore Rules - Evolution Chains
  {
    id: 'pokemon-evolution-complete',
    name: 'Evolution Chain Complete!',
    category: 'pokemon',
    description: 'Collect an entire evolution family',
    condition: 'Own all Pokemon in an evolution chain (e.g., Bulbasaur→Ivysaur→Venusaur)',
    effect: 'Evolution mastery achieved - true collector status',
    checkCondition: (state) => {
      const cardNames = state.collection.map(c => c.name);
      const progress = getEvolutionProgress(cardNames);
      return progress.complete.length > 0;
    },
    priority: 80
  },
  {
    id: 'pokemon-evolution-partial',
    name: 'Evolution in Progress',
    category: 'pokemon',
    description: 'You have part of an evolution chain',
    condition: 'Own 2+ Pokemon from the same evolution line',
    effect: 'Keep collecting to complete the chain!',
    checkCondition: (state) => {
      const cardNames = state.collection.map(c => c.name);
      const progress = getEvolutionProgress(cardNames);
      return progress.partial.length > 0 && progress.complete.length === 0;
    },
    priority: 45
  },
  {
    id: 'pokemon-starter-trio',
    name: 'Kanto Starter Trio',
    category: 'pokemon',
    description: 'The original choice - Bulbasaur, Charmander, Squirtle',
    condition: 'Own all three Kanto starters',
    effect: 'Professor Oak would be proud!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Bulbasaur') && names.includes('Charmander') && names.includes('Squirtle');
    },
    priority: 75
  },
  {
    id: 'pokemon-pikachu-raichu',
    name: 'Electric Evolution',
    category: 'pokemon',
    description: 'The iconic Pikachu evolution line',
    condition: 'Own both Pikachu and Raichu',
    effect: 'Thunder Stone evolution complete!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Pikachu') && names.includes('Raichu');
    },
    priority: 70
  },
  {
    id: 'pokemon-legendary-birds',
    name: 'Legendary Bird Trio',
    category: 'pokemon',
    description: 'The legendary birds of Kanto',
    condition: 'Own Articuno, Zapdos, and Moltres',
    effect: 'Master of the legendary birds!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Articuno') && names.includes('Zapdos') && names.includes('Moltres');
    },
    priority: 90
  },
  {
    id: 'pokemon-legendary-beasts',
    name: 'Legendary Beast Trio',
    category: 'pokemon',
    description: 'The legendary beasts of Johto',
    condition: 'Own Raikou, Entei, and Suicune',
    effect: 'Master of the legendary beasts!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Raikou') && names.includes('Entei') && names.includes('Suicune');
    },
    priority: 90
  },
  {
    id: 'pokemon-eeveelution-collector',
    name: 'Eeveelution Collector',
    category: 'pokemon',
    description: 'Collect multiple Eevee evolutions',
    condition: 'Own Eevee + 2 or more of its evolutions',
    effect: 'The diverse evolution path!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      const eeveelutions = ['Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon'];
      const hasEevee = names.includes('Eevee');
      const eeveCount = eeveelutions.filter(e => names.includes(e)).length;
      return hasEevee && eeveCount >= 2;
    },
    priority: 78
  },
  {
    id: 'pokemon-mewtwo-mew',
    name: 'Original & Clone',
    category: 'pokemon',
    description: 'The genetic Pokemon and its origin',
    condition: 'Own both Mew and Mewtwo',
    effect: 'Is Mewtwo a clone or something more?',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Mew') && names.includes('Mewtwo');
    },
    priority: 92
  },
  {
    id: 'pokemon-charizard-dragonite',
    name: 'Dragon Masters',
    category: 'pokemon',
    description: 'The most iconic dragon-like Pokemon',
    condition: 'Own both Charizard and Dragonite',
    effect: 'Despite Charizard not being Dragon-type...',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Charizard') && names.includes('Dragonite');
    },
    priority: 72
  },
  {
    id: 'pokemon-final-evolutions',
    name: 'Final Form Collector',
    category: 'pokemon',
    description: 'Collect fully evolved Pokemon',
    condition: 'Own 3+ final evolution Pokemon (Venusaur, Charizard, Blastoise, etc.)',
    effect: 'You prefer them at full power!',
    checkCondition: (state) => {
      const finalForms = ['Venusaur', 'Charizard', 'Blastoise', 'Raichu', 'Alakazam', 'Machamp',
                          'Gengar', 'Dragonite', 'Gyarados', 'Arcanine', 'Tyranitar', 'Metagross'];
      const count = state.collection.filter(c => finalForms.includes(c.name)).length;
      return count >= 3;
    },
    priority: 68
  },
  {
    id: 'pokemon-ghost-master',
    name: 'Ghost Master',
    category: 'pokemon',
    description: 'The spooky collector',
    condition: 'Own 3+ ghost-type Pokemon',
    effect: 'They say ghosts follow you now...',
    checkCondition: (state) => state.collection.filter(c => c.type === 'ghost').length >= 3,
    priority: 55
  },
  {
    id: 'pokemon-cute-collection',
    name: 'Kawaii Collector',
    category: 'pokemon',
    description: 'Collect the cutest Pokemon',
    condition: 'Own Pikachu, Eevee, and Jigglypuff',
    effect: 'Maximum cuteness achieved!',
    checkCondition: (state) => {
      const names = state.collection.map(c => c.name);
      return names.includes('Pikachu') && names.includes('Eevee') && names.includes('Jigglypuff');
    },
    priority: 60
  },
  {
    id: 'pokemon-pseudo-legendary',
    name: 'Pseudo-Legendary Collector',
    category: 'pokemon',
    description: 'The 600 BST club',
    condition: 'Own Dragonite, Tyranitar, or Metagross',
    effect: 'These Pokemon rival true legendaries!',
    checkCondition: (state) => {
      const pseudos = ['Dragonite', 'Tyranitar', 'Metagross', 'Salamence', 'Garchomp', 'Hydreigon'];
      return state.collection.some(c => pseudos.includes(c.name));
    },
    priority: 76
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
