/**
 * Poketrader - Game Definition
 *
 * A Pokemon card trading economics simulator.
 * Uses the JSON game engine for state management with React for complex card operations.
 *
 * Design Pattern:
 * - Engine handles: money, stats, flags, passive income, upgrades, events
 * - React handles: card arrays (collection, market), pack opening, grading, mini-games
 * - Communication: Engine emits events, React responds via onEmit callback
 */

import type { GameDefinition } from '../engine/types';

export const poketraderGame: GameDefinition = {
  meta: {
    id: 'poketrader',
    name: 'Poketrader',
    version: '2.0.0',
    description: 'A Pokemon card trading economics simulator',
    author: 'Poketrader Team'
  },

  config: {
    tickRate: 100,  // 10 ticks per second
    autoSaveInterval: 300,  // Every 30 seconds
    maxMessages: 30
  },

  state: [
    // ═══════════════════════════════════════════════════════════════
    // CORE RESOURCES
    // ═══════════════════════════════════════════════════════════════
    { id: 'money', type: 'number', initial: 0, description: 'Available cash', precision: 2 },
    { id: 'debt', type: 'number', initial: 0, description: 'Money owed' },
    { id: 'totalEarned', type: 'number', initial: 0, description: 'Lifetime earnings' },
    { id: 'totalSpent', type: 'number', initial: 0, description: 'Lifetime spending' },
    { id: 'totalProfit', type: 'number', initial: 0, description: 'Net profit' },

    // ═══════════════════════════════════════════════════════════════
    // GAME STATS
    // ═══════════════════════════════════════════════════════════════
    { id: 'cardsBought', type: 'number', initial: 0 },
    { id: 'cardsSold', type: 'number', initial: 0 },
    { id: 'packsOpened', type: 'number', initial: 0 },
    { id: 'highestSale', type: 'number', initial: 0 },
    { id: 'longestHold', type: 'number', initial: 0, description: 'Longest card hold time in seconds' },
    { id: 'gameTime', type: 'number', initial: 0, description: 'Total game time in seconds' },
    { id: 'totalClicks', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // MULTIPLIERS & BONUSES (from upgrades)
    // ═══════════════════════════════════════════════════════════════
    { id: 'clickPower', type: 'number', initial: 1, description: 'Click earnings multiplier' },
    { id: 'passiveIncome', type: 'number', initial: 0, description: 'Passive $/sec' },
    { id: 'discount', type: 'number', initial: 1, description: 'Purchase price multiplier (lower = better)' },
    { id: 'sellBonus', type: 'number', initial: 1, description: 'Sell price multiplier' },
    { id: 'capacity', type: 'number', initial: 20, description: 'Max collection size' },
    { id: 'marketSize', type: 'number', initial: 8, description: 'Cards shown in market' },
    { id: 'packDiscount', type: 'number', initial: 1, description: 'Pack price multiplier' },
    { id: 'critBonus', type: 'number', initial: 0, description: 'Extra crit chance (0-1)' },

    // ═══════════════════════════════════════════════════════════════
    // CLICK/COMBO SYSTEM
    // ═══════════════════════════════════════════════════════════════
    { id: 'comboCount', type: 'number', initial: 0, description: 'Current combo level' },
    { id: 'comboMultiplier', type: 'number', initial: 1, description: 'Current combo multiplier' },

    // ═══════════════════════════════════════════════════════════════
    // MARKET EVENTS
    // ═══════════════════════════════════════════════════════════════
    { id: 'activeEventId', type: 'string', initial: '' },
    { id: 'eventName', type: 'string', initial: '' },
    { id: 'eventMultiplier', type: 'number', initial: 1 },
    { id: 'eventAffectedType', type: 'string', initial: '' },
    { id: 'eventTicksRemaining', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // PROGRESSION FLAGS
    // ═══════════════════════════════════════════════════════════════
    { id: 'hasChosenStarter', type: 'boolean', initial: false },
    { id: 'starterPath', type: 'string', initial: '' },
    { id: 'hasSoldCard', type: 'boolean', initial: false },
    { id: 'hasBoughtPack', type: 'boolean', initial: false },
    { id: 'hasGradedCard', type: 'boolean', initial: false },

    // Feature unlocks
    { id: 'showUpgrades', type: 'boolean', initial: false },
    { id: 'showGrading', type: 'boolean', initial: false },
    { id: 'showAppraisal', type: 'boolean', initial: false },
    { id: 'showAutoSell', type: 'boolean', initial: false },
    { id: 'showAutoBuy', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // UPGRADE FLAGS (purchased upgrade IDs tracked as flags)
    // ═══════════════════════════════════════════════════════════════
    // Basics
    { id: 'upgrade_1', type: 'boolean', initial: false },
    { id: 'upgrade_2', type: 'boolean', initial: false },
    { id: 'upgrade_3', type: 'boolean', initial: false },
    { id: 'upgrade_4', type: 'boolean', initial: false },
    { id: 'upgrade_5', type: 'boolean', initial: false },
    // Grading
    { id: 'upgrade_10', type: 'boolean', initial: false },
    { id: 'upgrade_11', type: 'boolean', initial: false },
    { id: 'upgrade_12', type: 'boolean', initial: false },
    { id: 'upgrade_13', type: 'boolean', initial: false },
    { id: 'upgrade_14', type: 'boolean', initial: false },
    // Retail
    { id: 'upgrade_20', type: 'boolean', initial: false },
    { id: 'upgrade_21', type: 'boolean', initial: false },
    { id: 'upgrade_22', type: 'boolean', initial: false },
    { id: 'upgrade_23', type: 'boolean', initial: false },
    { id: 'upgrade_24', type: 'boolean', initial: false },
    { id: 'upgrade_25', type: 'boolean', initial: false },
    // Media
    { id: 'upgrade_30', type: 'boolean', initial: false },
    { id: 'upgrade_31', type: 'boolean', initial: false },
    { id: 'upgrade_32', type: 'boolean', initial: false },
    { id: 'upgrade_33', type: 'boolean', initial: false },
    { id: 'upgrade_34', type: 'boolean', initial: false },
    { id: 'upgrade_35', type: 'boolean', initial: false },
    // Events
    { id: 'upgrade_40', type: 'boolean', initial: false },
    { id: 'upgrade_41', type: 'boolean', initial: false },
    { id: 'upgrade_42', type: 'boolean', initial: false },
    { id: 'upgrade_43', type: 'boolean', initial: false },
    { id: 'upgrade_44', type: 'boolean', initial: false },
    { id: 'upgrade_45', type: 'boolean', initial: false },
    // Wholesale
    { id: 'upgrade_50', type: 'boolean', initial: false },
    { id: 'upgrade_51', type: 'boolean', initial: false },
    { id: 'upgrade_52', type: 'boolean', initial: false },
    { id: 'upgrade_53', type: 'boolean', initial: false },
    { id: 'upgrade_54', type: 'boolean', initial: false },
    { id: 'upgrade_55', type: 'boolean', initial: false },
    // Empire
    { id: 'upgrade_60', type: 'boolean', initial: false },
    { id: 'upgrade_61', type: 'boolean', initial: false },
    { id: 'upgrade_62', type: 'boolean', initial: false },
    { id: 'upgrade_63', type: 'boolean', initial: false },
    { id: 'upgrade_64', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // ACHIEVEMENT FLAGS
    // ═══════════════════════════════════════════════════════════════
    { id: 'achievement_1', type: 'boolean', initial: false },
    { id: 'achievement_2', type: 'boolean', initial: false },
    { id: 'achievement_3', type: 'boolean', initial: false },
    { id: 'achievement_4', type: 'boolean', initial: false },
    { id: 'achievement_5', type: 'boolean', initial: false },
    { id: 'achievement_6', type: 'boolean', initial: false },
    { id: 'achievement_7', type: 'boolean', initial: false },
    { id: 'achievement_8', type: 'boolean', initial: false },
    { id: 'achievement_9', type: 'boolean', initial: false },
    { id: 'achievement_10', type: 'boolean', initial: false },
    { id: 'achievement_11', type: 'boolean', initial: false },
    { id: 'achievement_12', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // APPRAISER SYSTEM
    // ═══════════════════════════════════════════════════════════════
    { id: 'appraiserCount', type: 'number', initial: 0 },
    { id: 'appraiserIncome', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // GRADING SYSTEM
    // ═══════════════════════════════════════════════════════════════
    { id: 'gradingQueueSize', type: 'number', initial: 0 },

    // Tick counter
    { id: 'gameTick', type: 'number', initial: 0 }
  ],

  phases: [
    {
      id: 'start',
      name: 'Getting Started',
      trigger: { op: 'not', condition: { op: 'flag', flag: 'hasChosenStarter' } },
      onEnter: [{ action: 'message', text: 'Welcome to Poketrader! Choose your path.', type: 'info' }]
    },
    {
      id: 'beginner',
      name: 'Beginner Trader',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'lt', left: { ref: 'cardsSold' }, right: 10 }
      ]},
      onEnter: [{ action: 'message', text: 'Start building your collection!', type: 'info' }]
    },
    {
      id: 'apprentice',
      name: 'Apprentice Trader',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'cardsSold' }, right: 10 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 500 }
      ]},
      onEnter: [{ action: 'message', text: 'You\'re getting the hang of this!', type: 'success' }]
    },
    {
      id: 'journeyman',
      name: 'Journeyman Trader',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'totalProfit' }, right: 500 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 2000 }
      ]},
      onEnter: [
        { action: 'message', text: 'Card grading is now available!', type: 'success' },
        { action: 'set', target: 'showGrading', value: true }
      ]
    },
    {
      id: 'expert',
      name: 'Expert Trader',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'totalProfit' }, right: 2000 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 10000 }
      ]},
      onEnter: [
        { action: 'message', text: 'Speed Appraisal mini-game unlocked!', type: 'success' },
        { action: 'set', target: 'showAppraisal', value: true }
      ]
    },
    {
      id: 'master',
      name: 'Master Trader',
      trigger: { op: 'gte', left: { ref: 'totalProfit' }, right: 10000 },
      onEnter: [{ action: 'message', text: 'You\'ve become a master trader!', type: 'success' }]
    }
  ],

  rules: [
    // ═══════════════════════════════════════════════════════════════
    // CORE GAME LOOP
    // ═══════════════════════════════════════════════════════════════

    // Increment game tick
    {
      id: 'tick-counter',
      timing: 'tick',
      condition: { op: 'flag', flag: 'hasChosenStarter' },
      actions: [{ action: 'add', target: 'gameTick', value: 1 }]
    },

    // Increment game time (every second = 10 ticks)
    {
      id: 'game-time-counter',
      timing: 'second',
      condition: { op: 'flag', flag: 'hasChosenStarter' },
      actions: [{ action: 'add', target: 'gameTime', value: 1 }]
    },

    // Apply passive income
    {
      id: 'passive-income',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'gt', left: { op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'appraiserIncome' }] }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'money', value: { op: 'div', args: [{ op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'appraiserIncome' }] }, 10] } },
        { action: 'add', target: 'totalEarned', value: { op: 'div', args: [{ op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'appraiserIncome' }] }, 10] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // DEBT INTEREST (1% per minute)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'debt-interest',
      timing: 'second',
      cooldown: 600,  // Every minute
      condition: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      actions: [
        { action: 'multiply', target: 'debt', value: 1.01 },
        { action: 'message', text: '💰 Interest added to debt...', type: 'warning' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // FEATURE UNLOCKS
    // ═══════════════════════════════════════════════════════════════

    // Unlock upgrades after selling 5 cards
    {
      id: 'unlock-upgrades',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showUpgrades' } },
        { op: 'gte', left: { ref: 'cardsSold' }, right: 5 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showUpgrades', value: true },
        { action: 'message', text: '🛒 Upgrades are now available!', type: 'success' }
      ]
    },

    // Unlock auto-sell with eBay Store (upgrade 20)
    {
      id: 'unlock-autosell',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showAutoSell' } },
        { op: 'flag', flag: 'upgrade_20' }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showAutoSell', value: true },
        { action: 'emit', event: 'auto-sell-enabled' },
        { action: 'message', text: '🏪 Auto-sell enabled! Cards sell automatically.', type: 'success' }
      ]
    },

    // Unlock auto-buy with Distributor Relationship (upgrade 50)
    {
      id: 'unlock-autobuy',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showAutoBuy' } },
        { op: 'flag', flag: 'upgrade_50' }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showAutoBuy', value: true },
        { action: 'emit', event: 'auto-buy-enabled' },
        { action: 'message', text: '📦 Auto-buy enabled! Good deals bought automatically.', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // MARKET EVENTS
    // ═══════════════════════════════════════════════════════════════

    // Event countdown
    {
      id: 'event-countdown',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'eventTicksRemaining' }, right: 0 },
      actions: [
        { action: 'add', target: 'eventTicksRemaining', value: -1 },
        {
          action: 'if',
          condition: { op: 'lte', left: { ref: 'eventTicksRemaining' }, right: 0 },
          then: [
            { action: 'set', target: 'activeEventId', value: '' },
            { action: 'set', target: 'eventName', value: '' },
            { action: 'set', target: 'eventMultiplier', value: 1 },
            { action: 'set', target: 'eventAffectedType', value: '' },
            { action: 'emit', event: 'market-event-ended' },
            { action: 'message', text: 'Market event ended.', type: 'info' }
          ]
        }
      ]
    },

    // Random market event trigger (2% chance per second when no event active)
    {
      id: 'random-event-trigger',
      timing: 'second',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'eq', left: { ref: 'activeEventId' }, right: '' },
        { op: 'gt', left: { op: 'random', args: [] }, right: 0.98 }
      ]},
      actions: [
        {
          action: 'random',
          choices: [
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'fire-hype' },
                { action: 'set', target: 'eventName', value: '🔥 Charizard Hits $500K!' },
                { action: 'set', target: 'eventMultiplier', value: 2.0 },
                { action: 'set', target: 'eventAffectedType', value: 'fire' },
                { action: 'set', target: 'eventTicksRemaining', value: 350 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🔥 Charizard Hits $500K! Fire cards worth 2x!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'electric-surge' },
                { action: 'set', target: 'eventName', value: '⚡ Pikachu Anniversary!' },
                { action: 'set', target: 'eventMultiplier', value: 1.9 },
                { action: 'set', target: 'eventAffectedType', value: 'electric' },
                { action: 'set', target: 'eventTicksRemaining', value: 300 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '⚡ Pikachu Anniversary! Electric cards +90%!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'water-wave' },
                { action: 'set', target: 'eventName', value: '💧 Water Festival!' },
                { action: 'set', target: 'eventMultiplier', value: 1.6 },
                { action: 'set', target: 'eventAffectedType', value: 'water' },
                { action: 'set', target: 'eventTicksRemaining', value: 350 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '💧 Water Festival! Water cards +60%!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'grass-bloom' },
                { action: 'set', target: 'eventName', value: '🌿 Earth Day Special!' },
                { action: 'set', target: 'eventMultiplier', value: 1.5 },
                { action: 'set', target: 'eventAffectedType', value: 'grass' },
                { action: 'set', target: 'eventTicksRemaining', value: 300 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🌿 Earth Day Special! Grass cards +50%!', type: 'success' }
              ]
            },
            {
              weight: 0.8,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'psychic-wave' },
                { action: 'set', target: 'eventName', value: '🔮 Psychic Mewtwo Craze!' },
                { action: 'set', target: 'eventMultiplier', value: 2.0 },
                { action: 'set', target: 'eventAffectedType', value: 'psychic' },
                { action: 'set', target: 'eventTicksRemaining', value: 280 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🔮 Psychic Mewtwo Craze! Psychic cards 2x!', type: 'success' }
              ]
            },
            {
              weight: 0.6,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'dragon-craze' },
                { action: 'set', target: 'eventName', value: '🐉 Dragon Week Tournament!' },
                { action: 'set', target: 'eventMultiplier', value: 2.2 },
                { action: 'set', target: 'eventAffectedType', value: 'dragon' },
                { action: 'set', target: 'eventTicksRemaining', value: 250 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🐉 Dragon Week! Dragon cards +120%!', type: 'success' }
              ]
            },
            {
              weight: 0.8,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'ghost-haunt' },
                { action: 'set', target: 'eventName', value: '👻 Halloween Surge!' },
                { action: 'set', target: 'eventMultiplier', value: 1.7 },
                { action: 'set', target: 'eventAffectedType', value: 'ghost' },
                { action: 'set', target: 'eventTicksRemaining', value: 400 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '👻 Halloween Surge! Ghost cards +70%!', type: 'success' }
              ]
            },
            {
              weight: 0.7,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'dark-demand' },
                { action: 'set', target: 'eventName', value: '🌙 Dark Type Demand!' },
                { action: 'set', target: 'eventMultiplier', value: 1.8 },
                { action: 'set', target: 'eventAffectedType', value: 'dark' },
                { action: 'set', target: 'eventTicksRemaining', value: 320 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🌙 Dark Type Demand! Dark cards +80%!', type: 'success' }
              ]
            },
            {
              weight: 1.2,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'bull-run' },
                { action: 'set', target: 'eventName', value: '🐂 Bull Run!' },
                { action: 'set', target: 'eventMultiplier', value: 1.6 },
                { action: 'set', target: 'eventAffectedType', value: 'all' },
                { action: 'set', target: 'eventTicksRemaining', value: 500 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🐂 Bull Run! All cards +60%!', type: 'success' }
              ]
            },
            {
              weight: 0.8,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'bear-market' },
                { action: 'set', target: 'eventName', value: '🐻 Bear Market!' },
                { action: 'set', target: 'eventMultiplier', value: 0.6 },
                { action: 'set', target: 'eventAffectedType', value: 'all' },
                { action: 'set', target: 'eventTicksRemaining', value: 600 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🐻 Bear Market! All cards -40%. Time to buy!', type: 'warning' }
              ]
            },
            {
              weight: 0.5,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'legendary-hunt' },
                { action: 'set', target: 'eventName', value: '🎰 Lucky Find Reported!' },
                { action: 'set', target: 'eventMultiplier', value: 2.5 },
                { action: 'set', target: 'eventAffectedType', value: 'legendary' },
                { action: 'set', target: 'eventTicksRemaining', value: 200 },
                { action: 'emit', event: 'market-event-started' },
                { action: 'message', text: '🎰 Legendary cards +150%!', type: 'success' }
              ]
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // AUTO-SELL TRIGGER (every 6-2 ticks based on upgrades)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'auto-sell-tick',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'showAutoSell' },
        { op: 'eq', left: { op: 'mod', args: [{ ref: 'gameTick' }, 60] }, right: 0 }
      ]},
      actions: [
        { action: 'emit', event: 'auto-sell-check' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // AUTO-BUY TRIGGER (every 8-5 ticks based on upgrades)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'auto-buy-tick',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'showAutoBuy' },
        { op: 'eq', left: { op: 'mod', args: [{ ref: 'gameTick' }, 80] }, right: 0 }
      ]},
      actions: [
        { action: 'emit', event: 'auto-buy-check' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // GRADING QUEUE PROCESSING
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'grading-tick',
      timing: 'second',
      condition: { op: 'gt', left: { ref: 'gradingQueueSize' }, right: 0 },
      actions: [
        { action: 'emit', event: 'grading-tick' }
      ]
    }
  ],

  projects: [
    // ═══════════════════════════════════════════════════════════════
    // BASICS UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-1',
      name: 'Price Guide Subscription',
      description: '2x appraisal earnings',
      icon: '📖',
      priceTag: '$50',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_1' } }
      ]},
      costs: [{ resource: 'money', amount: 50 }],
      effects: [
        { action: 'set', target: 'upgrade_1', value: true },
        { action: 'multiply', target: 'clickPower', value: 2 },
        { action: 'message', text: '📖 Price Guide unlocked!', type: 'success' }
      ],
      category: 'basics'
    },
    {
      id: 'upgrade-2',
      name: 'Card Sleeves & Toploaders',
      description: '+5% sell value',
      icon: '🛡️',
      priceTag: '$75',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_2' } }
      ]},
      costs: [{ resource: 'money', amount: 75 }],
      effects: [
        { action: 'set', target: 'upgrade_2', value: true },
        { action: 'multiply', target: 'sellBonus', value: 1.05 },
        { action: 'message', text: '🛡️ Card protection unlocked!', type: 'success' }
      ],
      category: 'basics'
    },
    {
      id: 'upgrade-3',
      name: 'Folding Table Setup',
      description: '+10 collection slots',
      icon: '🪑',
      priceTag: '$150',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_3' } }
      ]},
      costs: [{ resource: 'money', amount: 150 }],
      effects: [
        { action: 'set', target: 'upgrade_3', value: true },
        { action: 'add', target: 'capacity', value: 10 },
        { action: 'message', text: '🪑 More storage space!', type: 'success' }
      ],
      category: 'basics'
    },
    {
      id: 'upgrade-4',
      name: 'Local Card Shop Connection',
      description: '5% discount on purchases',
      icon: '🤝',
      priceTag: '$250',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_4' } }
      ]},
      costs: [{ resource: 'money', amount: 250 }],
      effects: [
        { action: 'set', target: 'upgrade_4', value: true },
        { action: 'multiply', target: 'discount', value: 0.95 },
        { action: 'message', text: '🤝 Shop discount unlocked!', type: 'success' }
      ],
      category: 'basics'
    },
    {
      id: 'upgrade-5',
      name: 'Social Media Presence',
      description: 'Earn $2/sec passive income',
      icon: '📱',
      priceTag: '$400',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_5' } }
      ]},
      costs: [{ resource: 'money', amount: 400 }],
      effects: [
        { action: 'set', target: 'upgrade_5', value: true },
        { action: 'add', target: 'passiveIncome', value: 2 },
        { action: 'message', text: '📱 Social media following!', type: 'success' }
      ],
      category: 'basics'
    },

    // ═══════════════════════════════════════════════════════════════
    // GRADING UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-10',
      name: 'PSA Membership',
      description: '+10% sell value',
      icon: '🏅',
      priceTag: '$500',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_2' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_10' } }
      ]},
      costs: [{ resource: 'money', amount: 500 }],
      effects: [
        { action: 'set', target: 'upgrade_10', value: true },
        { action: 'multiply', target: 'sellBonus', value: 1.10 },
        { action: 'message', text: '🏅 PSA Membership unlocked!', type: 'success' }
      ],
      category: 'grading'
    },
    {
      id: 'upgrade-11',
      name: 'Grading Loupe & UV Light',
      description: '1.5x appraisal earnings',
      icon: '🔬',
      priceTag: '$800',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_11' } }
      ]},
      costs: [{ resource: 'money', amount: 800 }],
      effects: [
        { action: 'set', target: 'upgrade_11', value: true },
        { action: 'multiply', target: 'clickPower', value: 1.5 },
        { action: 'message', text: '🔬 Grading tools unlocked!', type: 'success' }
      ],
      category: 'grading'
    },
    {
      id: 'upgrade-14',
      name: 'Grading Expert Reputation',
      description: '+5% critical hit chance',
      icon: '👁️',
      priceTag: '$5000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_11' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_14' } }
      ]},
      costs: [{ resource: 'money', amount: 5000 }],
      effects: [
        { action: 'set', target: 'upgrade_14', value: true },
        { action: 'add', target: 'critBonus', value: 0.05 },
        { action: 'message', text: '👁️ Expert reputation earned!', type: 'success' }
      ],
      category: 'grading'
    },

    // ═══════════════════════════════════════════════════════════════
    // RETAIL UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-20',
      name: 'eBay Store',
      description: 'Earn $5/sec + Auto-sell enabled',
      icon: '🛒',
      priceTag: '$1000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_20' } }
      ]},
      costs: [{ resource: 'money', amount: 1000 }],
      effects: [
        { action: 'set', target: 'upgrade_20', value: true },
        { action: 'add', target: 'passiveIncome', value: 5 },
        { action: 'message', text: '🛒 eBay Store opened!', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-21',
      name: 'TCGPlayer Seller Account',
      description: '+4 cards in market',
      icon: '🌐',
      priceTag: '$2000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_20' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_21' } }
      ]},
      costs: [{ resource: 'money', amount: 2000 }],
      effects: [
        { action: 'set', target: 'upgrade_21', value: true },
        { action: 'add', target: 'marketSize', value: 4 },
        { action: 'emit', event: 'market-size-changed' },
        { action: 'message', text: '🌐 TCGPlayer account opened!', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-22',
      name: 'Mall Kiosk Lease',
      description: 'Earn $15/sec',
      icon: '🏬',
      priceTag: '$5000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_22' } }
      ]},
      costs: [{ resource: 'money', amount: 5000 }],
      effects: [
        { action: 'set', target: 'upgrade_22', value: true },
        { action: 'add', target: 'passiveIncome', value: 15 },
        { action: 'message', text: '🏬 Mall kiosk opened!', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-23',
      name: 'Card Shop Storefront',
      description: 'Earn $40/sec',
      icon: '🏪',
      priceTag: '$15000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_22' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_23' } }
      ]},
      costs: [{ resource: 'money', amount: 15000 }],
      effects: [
        { action: 'set', target: 'upgrade_23', value: true },
        { action: 'add', target: 'passiveIncome', value: 40 },
        { action: 'message', text: '🏪 Card shop opened!', type: 'success' }
      ],
      category: 'retail'
    },

    // ═══════════════════════════════════════════════════════════════
    // MEDIA UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-30',
      name: 'YouTube Channel',
      description: 'Earn $8/sec',
      icon: '🎬',
      priceTag: '$2000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_5' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_30' } }
      ]},
      costs: [{ resource: 'money', amount: 2000 }],
      effects: [
        { action: 'set', target: 'upgrade_30', value: true },
        { action: 'add', target: 'passiveIncome', value: 8 },
        { action: 'message', text: '🎬 YouTube channel started!', type: 'success' }
      ],
      category: 'media'
    },
    {
      id: 'upgrade-32',
      name: 'Sponsor a Pack Opener',
      description: '2x click earnings',
      icon: '🤳',
      priceTag: '$10000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_30' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_32' } }
      ]},
      costs: [{ resource: 'money', amount: 10000 }],
      effects: [
        { action: 'set', target: 'upgrade_32', value: true },
        { action: 'multiply', target: 'clickPower', value: 2 },
        { action: 'message', text: '🤳 Influencer sponsorship acquired!', type: 'success' }
      ],
      category: 'media'
    },
    {
      id: 'upgrade-34',
      name: 'Viral Unboxing Fame',
      description: '+8% critical hit chance',
      icon: '🔥',
      priceTag: '$25000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_32' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_34' } }
      ]},
      costs: [{ resource: 'money', amount: 25000 }],
      effects: [
        { action: 'set', target: 'upgrade_34', value: true },
        { action: 'add', target: 'critBonus', value: 0.08 },
        { action: 'message', text: '🔥 Viral fame achieved!', type: 'success' }
      ],
      category: 'media'
    },

    // ═══════════════════════════════════════════════════════════════
    // EVENTS UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-40',
      name: 'Local Tournament Judge',
      description: '+2 cards in market',
      icon: '⚖️',
      priceTag: '$3000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_40' } }
      ]},
      costs: [{ resource: 'money', amount: 3000 }],
      effects: [
        { action: 'set', target: 'upgrade_40', value: true },
        { action: 'add', target: 'marketSize', value: 2 },
        { action: 'emit', event: 'market-size-changed' },
        { action: 'message', text: '⚖️ Tournament judge role acquired!', type: 'success' }
      ],
      category: 'events'
    },
    {
      id: 'upgrade-41',
      name: 'Regional Expo Booth',
      description: '+25 collection slots',
      icon: '🎪',
      priceTag: '$8000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_41' } }
      ]},
      costs: [{ resource: 'money', amount: 8000 }],
      effects: [
        { action: 'set', target: 'upgrade_41', value: true },
        { action: 'add', target: 'capacity', value: 25 },
        { action: 'message', text: '🎪 Expo booth secured!', type: 'success' }
      ],
      category: 'events'
    },

    // ═══════════════════════════════════════════════════════════════
    // WHOLESALE UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-50',
      name: 'Distributor Relationship',
      description: '15% off packs + Auto-buy enabled',
      icon: '🚚',
      priceTag: '$10000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_50' } }
      ]},
      costs: [{ resource: 'money', amount: 10000 }],
      effects: [
        { action: 'set', target: 'upgrade_50', value: true },
        { action: 'multiply', target: 'packDiscount', value: 0.85 },
        { action: 'message', text: '🚚 Distributor relationship established!', type: 'success' }
      ],
      category: 'wholesale'
    },
    {
      id: 'upgrade-51',
      name: 'Warehouse Space',
      description: '+100 collection slots',
      icon: '🏭',
      priceTag: '$25000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_3' },
        { op: 'flag', flag: 'upgrade_23' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_51' } }
      ]},
      costs: [{ resource: 'money', amount: 25000 }],
      effects: [
        { action: 'set', target: 'upgrade_51', value: true },
        { action: 'add', target: 'capacity', value: 100 },
        { action: 'message', text: '🏭 Warehouse acquired!', type: 'success' }
      ],
      category: 'wholesale'
    },
    {
      id: 'upgrade-52',
      name: 'Bulk Lot Specialist',
      description: '20% discount on all purchases',
      icon: '📦',
      priceTag: '$30000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_50' },
        { op: 'flag', flag: 'upgrade_51' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_52' } }
      ]},
      costs: [{ resource: 'money', amount: 30000 }],
      effects: [
        { action: 'set', target: 'upgrade_52', value: true },
        { action: 'multiply', target: 'discount', value: 0.80 },
        { action: 'message', text: '📦 Bulk specialist status!', type: 'success' }
      ],
      category: 'wholesale'
    },

    // ═══════════════════════════════════════════════════════════════
    // EMPIRE UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-60',
      name: 'Card Empire HQ',
      description: 'Earn $250/sec',
      icon: '🏰',
      priceTag: '$150,000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_23' },
        { op: 'flag', flag: 'upgrade_51' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_60' } }
      ]},
      costs: [{ resource: 'money', amount: 150000 }],
      effects: [
        { action: 'set', target: 'upgrade_60', value: true },
        { action: 'add', target: 'passiveIncome', value: 250 },
        { action: 'message', text: '🏰 Card Empire HQ built!', type: 'success' }
      ],
      category: 'empire'
    },
    {
      id: 'upgrade-64',
      name: 'Pokemon Company Partnership',
      description: '+15% crit chance - Ultimate achievement!',
      icon: '👑',
      priceTag: '$1,000,000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_60' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_64' } }
      ]},
      costs: [{ resource: 'money', amount: 1000000 }],
      effects: [
        { action: 'set', target: 'upgrade_64', value: true },
        { action: 'add', target: 'critBonus', value: 0.15 },
        { action: 'message', text: '👑 POKEMON COMPANY PARTNERSHIP! You ARE the hobby!', type: 'success' }
      ],
      category: 'empire'
    },

    // ═══════════════════════════════════════════════════════════════
    // DEBT PAYMENT
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'pay-debt-50',
      name: 'Pay Off Debt ($50)',
      description: 'Reduce debt by $50',
      icon: '💳',
      priceTag: '$50',
      trigger: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      costs: [{ resource: 'money', amount: 50 }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'debt', value: -50 },
        { action: 'message', text: '💳 Paid $50 toward debt', type: 'info' },
        {
          action: 'if',
          condition: { op: 'lte', left: { ref: 'debt' }, right: 0 },
          then: [
            { action: 'set', target: 'debt', value: 0 },
            { action: 'message', text: '🎉 Debt fully repaid! You\'re free!', type: 'success' }
          ]
        }
      ]
    }
  ],

  functions: {
    // ═══════════════════════════════════════════════════════════════
    // STARTER PATH SELECTION
    // ═══════════════════════════════════════════════════════════════
    chooseSolo: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'solo' },
      { action: 'set', target: 'money', value: 150 },
      { action: 'set', target: 'totalEarned', value: 150 },
      { action: 'set', target: 'debt', value: 0 },
      { action: 'set', target: 'clickPower', value: 1 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'solo' } },
      { action: 'message', text: '🎒 Starting as Solo Hustler! No debt, pure freedom.', type: 'success' }
    ],
    choosePartner: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'partner' },
      { action: 'set', target: 'money', value: 400 },
      { action: 'set', target: 'totalEarned', value: 400 },
      { action: 'set', target: 'debt', value: 300 },
      { action: 'set', target: 'clickPower', value: 2 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'partner' } },
      { action: 'message', text: '🔬 Starting as Oak\'s Lab Partner! 2x click power, $300 debt.', type: 'success' }
    ],
    chooseInvestor: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'investor' },
      { action: 'set', target: 'money', value: 800 },
      { action: 'set', target: 'totalEarned', value: 800 },
      { action: 'set', target: 'debt', value: 600 },
      { action: 'set', target: 'clickPower', value: 3 },
      { action: 'add', target: 'capacity', value: 10 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'investor' } },
      { action: 'message', text: '🏢 Starting as Silph Co. Backed! 3x click power, +10 capacity, $600 debt.', type: 'success' }
    ],

    // ═══════════════════════════════════════════════════════════════
    // CARD OPERATIONS (Called from React, trigger emits for React to handle)
    // ═══════════════════════════════════════════════════════════════

    // Called after React handles the click and updates combo state
    recordClick: [
      { action: 'add', target: 'totalClicks', value: 1 }
    ],

    // Called after React successfully completes a card purchase
    recordBuy: [
      { action: 'add', target: 'cardsBought', value: 1 }
    ],

    // Called after React successfully completes a card sale
    recordSell: [
      { action: 'add', target: 'cardsSold', value: 1 },
      { action: 'set', target: 'hasSoldCard', value: true }
    ],

    // Called after React opens a pack
    recordPackOpen: [
      { action: 'add', target: 'packsOpened', value: 1 },
      { action: 'set', target: 'hasBoughtPack', value: true }
    ],

    // Take a loan
    takeLoan: [
      {
        action: 'if',
        condition: { op: 'lt', left: { ref: 'debt' }, right: 1000 },
        then: [
          { action: 'add', target: 'money', value: 100 },
          { action: 'add', target: 'debt', value: 110 },
          { action: 'message', text: '💰 Took $100 loan (10% fee = $110 owed)', type: 'warning' }
        ],
        else: [
          { action: 'message', text: '❌ Too much debt! Pay some off first.', type: 'error' }
        ]
      }
    ],

    // Trigger market refresh (React handles actual refresh)
    refreshMarket: [
      { action: 'emit', event: 'market-refresh' }
    ],

    // Start appraisal game (React handles the game)
    startAppraisalGame: [
      {
        action: 'if',
        condition: { op: 'gte', left: { ref: 'money' }, right: 50 },
        then: [
          { action: 'add', target: 'money', value: -50 },
          { action: 'emit', event: 'appraisal-game-start' },
          { action: 'message', text: '🎮 Speed Appraisal game started! ($50 entry)', type: 'info' }
        ],
        else: [
          { action: 'message', text: '❌ Need $50 for entry fee!', type: 'error' }
        ]
      }
    ]
  },

  ui: {
    sections: [
      {
        id: 'wallet',
        name: 'Wallet',
        icon: '💰',
        bindings: [
          { elementId: 'money', type: 'display', value: { ref: 'money' }, format: 'currency' },
          { elementId: 'debt', type: 'display', value: { ref: 'debt' }, format: 'currency', visible: { op: 'gt', left: { ref: 'debt' }, right: 0 } }
        ]
      },
      {
        id: 'stats',
        name: 'Stats',
        icon: '📊',
        bindings: [
          { elementId: 'profit', type: 'display', value: { ref: 'totalProfit' }, format: 'currency', prefix: 'Profit: ' },
          { elementId: 'sold', type: 'display', value: { ref: 'cardsSold' }, prefix: 'Sold: ' },
          { elementId: 'capacity', type: 'display', value: { ref: 'capacity' }, prefix: 'Capacity: ' }
        ]
      },
      {
        id: 'event',
        name: 'Market Event',
        visible: { op: 'neq', left: { ref: 'activeEventId' }, right: '' },
        bindings: [
          { elementId: 'eventName', type: 'display', value: { ref: 'eventName' } }
        ]
      }
    ]
  }
};

export default poketraderGame;
