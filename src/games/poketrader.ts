/**
 * Poketrader - Game Definition
 *
 * A Pokemon card trading economics simulator.
 * Uses the JSON game engine with spawned entities for cards.
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
    tickRate: 100,
    autoSaveInterval: 300,
    maxMessages: 30
  },

  state: [
    // Resources
    { id: 'money', type: 'number', initial: 100, description: 'Available cash', precision: 2 },
    { id: 'debt', type: 'number', initial: 0, description: 'Money owed' },
    { id: 'totalEarnings', type: 'number', initial: 0, description: 'Lifetime earnings' },
    { id: 'totalSpent', type: 'number', initial: 0, description: 'Lifetime spending' },

    // Stats
    { id: 'cardsBought', type: 'number', initial: 0 },
    { id: 'cardsSold', type: 'number', initial: 0 },
    { id: 'packsOpened', type: 'number', initial: 0 },
    { id: 'totalProfit', type: 'number', initial: 0 },
    { id: 'highestSale', type: 'number', initial: 0 },
    { id: 'bestCard', type: 'string', initial: '' },

    // Collection metrics (derived)
    { id: 'collectionSize', type: 'number', initial: 0 },
    { id: 'collectionValue', type: 'number', initial: 0 },
    { id: 'marketSize', type: 'number', initial: 0 },

    // Upgrades
    { id: 'packSize', type: 'number', initial: 3, description: 'Cards per pack' },
    { id: 'packCost', type: 'number', initial: 50, description: 'Cost per pack' },
    { id: 'marketRefreshCost', type: 'number', initial: 20 },
    { id: 'negotiationBonus', type: 'number', initial: 0, description: 'Sale price bonus %' },
    { id: 'discountRate', type: 'number', initial: 0, description: 'Purchase discount %' },

    // Market events
    { id: 'activeEventId', type: 'string', initial: '' },
    { id: 'eventName', type: 'string', initial: '' },
    { id: 'eventMultiplier', type: 'number', initial: 1 },
    { id: 'eventAffectedType', type: 'string', initial: '' },
    { id: 'eventTicksRemaining', type: 'number', initial: 0 },

    // Progression flags
    { id: 'hasSoldCard', type: 'boolean', initial: false },
    { id: 'hasBoughtPack', type: 'boolean', initial: false },
    { id: 'hasGradedCard', type: 'boolean', initial: false },
    { id: 'showGrading', type: 'boolean', initial: false },
    { id: 'showAppraisal', type: 'boolean', initial: false },
    { id: 'showUpgrades', type: 'boolean', initial: false },

    // Starter path
    { id: 'starterChoice', type: 'string', initial: '' },
    { id: 'hasChosenStarter', type: 'boolean', initial: false },

    // Tick counter for timing
    { id: 'gameTick', type: 'number', initial: 0 }
  ],

  phases: [
    {
      id: 'start',
      name: 'Getting Started',
      trigger: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'hasChosenStarter' } }
      ]},
      onEnter: [{ action: 'message', text: 'Welcome to Poketrader! Choose your starter pack.', type: 'info' }]
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
      trigger: { op: 'gte', left: { ref: 'totalProfit' }, right: 2000 },
      onEnter: [
        { action: 'message', text: 'You\'ve become an expert trader!', type: 'success' },
        { action: 'set', target: 'showAppraisal', value: true }
      ]
    }
  ],

  rules: [
    // Increment game tick
    {
      id: 'tick-counter',
      timing: 'tick',
      condition: { op: 'true' },
      actions: [{ action: 'add', target: 'gameTick', value: 1 }]
    },

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
        { action: 'message', text: 'Upgrades are now available!', type: 'success' }
      ]
    },

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
            { action: 'message', text: 'Market event ended', type: 'info' }
          ]
        }
      ]
    },

    // Random events (every ~30 seconds with 20% chance)
    {
      id: 'random-event-trigger',
      timing: 'second',
      cooldown: 300,  // Check every 30 seconds
      condition: { op: 'and', conditions: [
        { op: 'eq', left: { ref: 'activeEventId' }, right: '' },
        { op: 'gt', left: { op: 'random', args: [] }, right: 0.8 }
      ]},
      actions: [
        {
          action: 'random',
          choices: [
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'fire-hype' },
                { action: 'set', target: 'eventName', value: '🔥 Fire Type Hype!' },
                { action: 'set', target: 'eventMultiplier', value: 1.5 },
                { action: 'set', target: 'eventAffectedType', value: 'fire' },
                { action: 'set', target: 'eventTicksRemaining', value: 1200 },
                { action: 'message', text: '🔥 Fire Type Hype! Fire cards worth 50% more!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'water-surge' },
                { action: 'set', target: 'eventName', value: '💧 Water Surge!' },
                { action: 'set', target: 'eventMultiplier', value: 1.4 },
                { action: 'set', target: 'eventAffectedType', value: 'water' },
                { action: 'set', target: 'eventTicksRemaining', value: 1000 },
                { action: 'message', text: '💧 Water Surge! Water cards worth 40% more!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'grass-bloom' },
                { action: 'set', target: 'eventName', value: '🌿 Grass Bloom!' },
                { action: 'set', target: 'eventMultiplier', value: 1.35 },
                { action: 'set', target: 'eventAffectedType', value: 'grass' },
                { action: 'set', target: 'eventTicksRemaining', value: 1000 },
                { action: 'message', text: '🌿 Grass Bloom! Grass cards in demand!', type: 'success' }
              ]
            },
            {
              weight: 1,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'electric-shock' },
                { action: 'set', target: 'eventName', value: '⚡ Electric Shock!' },
                { action: 'set', target: 'eventMultiplier', value: 1.45 },
                { action: 'set', target: 'eventAffectedType', value: 'electric' },
                { action: 'set', target: 'eventTicksRemaining', value: 800 },
                { action: 'message', text: '⚡ Electric Shock! Electric cards are hot!', type: 'success' }
              ]
            },
            {
              weight: 0.5,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'psychic-wave' },
                { action: 'set', target: 'eventName', value: '🔮 Psychic Wave!' },
                { action: 'set', target: 'eventMultiplier', value: 1.6 },
                { action: 'set', target: 'eventAffectedType', value: 'psychic' },
                { action: 'set', target: 'eventTicksRemaining', value: 600 },
                { action: 'message', text: '🔮 Psychic Wave! Psychic cards at premium!', type: 'success' }
              ]
            },
            {
              weight: 0.3,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'dragon-craze' },
                { action: 'set', target: 'eventName', value: '🐉 Dragon Craze!' },
                { action: 'set', target: 'eventMultiplier', value: 1.8 },
                { action: 'set', target: 'eventAffectedType', value: 'dragon' },
                { action: 'set', target: 'eventTicksRemaining', value: 500 },
                { action: 'message', text: '🐉 Dragon Craze! Dragon cards extremely valuable!', type: 'success' }
              ]
            }
          ]
        }
      ]
    },

    // Pay off debt interest (every minute)
    {
      id: 'debt-interest',
      timing: 'second',
      cooldown: 600,  // Every minute
      condition: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      actions: [
        { action: 'multiply', target: 'debt', value: 1.01 },
        { action: 'message', text: 'Interest added to debt...', type: 'warning' }
      ]
    }
  ],

  projects: [
    // Upgrades
    {
      id: 'upgrade-pack-size',
      name: 'Bigger Packs',
      description: '+1 card per pack',
      icon: '📦',
      trigger: { op: 'flag', flag: 'showUpgrades' },
      costs: [{ resource: 'money', amount: 200 }],
      repeatable: true,
      maxUses: 7,
      effects: [
        { action: 'add', target: 'packSize', value: 1 },
        { action: 'message', text: 'Pack size increased!', type: 'success' }
      ]
    },
    {
      id: 'upgrade-negotiation',
      name: 'Negotiation Training',
      description: '+5% sale price',
      icon: '🤝',
      trigger: { op: 'flag', flag: 'showUpgrades' },
      costs: [{ resource: 'money', amount: 150 }],
      repeatable: true,
      maxUses: 10,
      effects: [
        { action: 'add', target: 'negotiationBonus', value: 5 },
        { action: 'message', text: 'Negotiation skills improved!', type: 'success' }
      ]
    },
    {
      id: 'upgrade-discount',
      name: 'Bulk Buyer',
      description: '+3% purchase discount',
      icon: '💰',
      trigger: { op: 'flag', flag: 'showUpgrades' },
      costs: [{ resource: 'money', amount: 175 }],
      repeatable: true,
      maxUses: 8,
      effects: [
        { action: 'add', target: 'discountRate', value: 3 },
        { action: 'message', text: 'Better bulk deals unlocked!', type: 'success' }
      ]
    },
    {
      id: 'pay-debt',
      name: 'Pay Off Debt',
      description: 'Pay $50 toward debt',
      icon: '💳',
      trigger: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      costs: [{ resource: 'money', amount: 50 }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'debt', value: -50 },
        { action: 'message', text: 'Paid $50 toward debt', type: 'success' }
      ]
    }
  ],

  functions: {
    // These are called from the React layer for card operations
    buyPack: [
      {
        action: 'if',
        condition: { op: 'gte', left: { ref: 'money' }, right: { ref: 'packCost' } },
        then: [
          { action: 'add', target: 'money', value: { op: 'mul', args: [{ ref: 'packCost' }, -1] } },
          { action: 'add', target: 'totalSpent', value: { ref: 'packCost' } },
          { action: 'add', target: 'packsOpened', value: 1 },
          { action: 'set', target: 'hasBoughtPack', value: true },
          { action: 'emit', event: 'pack-opened', data: { size: { ref: 'packSize' } } }
        ]
      }
    ],
    refreshMarket: [
      {
        action: 'if',
        condition: { op: 'gte', left: { ref: 'money' }, right: { ref: 'marketRefreshCost' } },
        then: [
          { action: 'add', target: 'money', value: { op: 'mul', args: [{ ref: 'marketRefreshCost' }, -1] } },
          { action: 'emit', event: 'market-refresh' }
        ]
      }
    ],
    takeLoan: [
      {
        action: 'if',
        condition: { op: 'lt', left: { ref: 'debt' }, right: 1000 },
        then: [
          { action: 'add', target: 'money', value: 100 },
          { action: 'add', target: 'debt', value: 110 },
          { action: 'message', text: 'Took $100 loan (with 10% fee)', type: 'warning' }
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
