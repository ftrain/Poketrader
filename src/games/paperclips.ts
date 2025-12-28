/**
 * Universal Paperclips - Game Definition
 *
 * A simplified version of the classic idle game.
 * Core mechanics: Making clips, selling, buying wire, auto-clippers.
 */

import type { GameDefinition } from '../engine/types';

export const paperclipsGame: GameDefinition = {
  meta: {
    id: 'paperclips',
    name: 'Universal Paperclips',
    version: '1.0.0',
    description: 'An idle game about making paperclips',
    author: 'Frank Lantz (original), React port'
  },

  config: {
    tickRate: 100,  // 10 ticks per second
    autoSaveInterval: 300,  // Every 30 seconds
    maxMessages: 50
  },

  state: [
    // Resources
    { id: 'clips', type: 'number', initial: 0, description: 'Total paperclips produced' },
    { id: 'unsoldClips', type: 'number', initial: 0, description: 'Clips available to sell' },
    { id: 'funds', type: 'number', initial: 0, description: 'Money ($)', precision: 2 },
    { id: 'wire', type: 'number', initial: 1000, description: 'Wire available (inches)' },

    // Production
    { id: 'clipperLevel', type: 'number', initial: 0, description: 'Auto-clippers owned' },
    { id: 'clipperCost', type: 'number', initial: 5, description: 'Cost of next clipper' },
    { id: 'clipperBoost', type: 'number', initial: 1, description: 'Clipper efficiency' },
    { id: 'megaClipperLevel', type: 'number', initial: 0, description: 'Mega-clippers owned' },
    { id: 'megaClipperCost', type: 'number', initial: 500, description: 'Cost of mega-clipper' },

    // Business
    { id: 'margin', type: 'number', initial: 0.25, description: 'Price per clip', precision: 2 },
    { id: 'demand', type: 'number', initial: 5, description: 'Market demand %' },
    { id: 'marketingLevel', type: 'number', initial: 1, description: 'Marketing level' },
    { id: 'marketingCost', type: 'number', initial: 100, description: 'Next marketing cost' },

    // Wire market
    { id: 'wireCost', type: 'number', initial: 20, description: 'Wire price' },

    // Flags
    { id: 'showAutoClippers', type: 'boolean', initial: false },
    { id: 'showMegaClippers', type: 'boolean', initial: false },
    { id: 'showMarketing', type: 'boolean', initial: false },
  ],

  phases: [
    {
      id: 'early',
      name: 'Early Game',
      trigger: { op: 'lt', left: { ref: 'clips' }, right: 1000 },
      onEnter: [{ action: 'message', text: 'Welcome to Universal Paperclips!', type: 'info' }]
    },
    {
      id: 'mid',
      name: 'Mid Game',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'clips' }, right: 1000 },
        { op: 'lt', left: { ref: 'clips' }, right: 100000 }
      ]},
      onEnter: [{ action: 'message', text: 'Business is picking up...', type: 'success' }]
    },
    {
      id: 'late',
      name: 'Late Game',
      trigger: { op: 'gte', left: { ref: 'clips' }, right: 100000 },
      onEnter: [{ action: 'message', text: 'The clipper empire grows!', type: 'success' }]
    }
  ],

  rules: [
    // Unlock auto-clippers after 25 clips
    {
      id: 'unlock-autoclippers',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showAutoClippers' } },
        { op: 'gte', left: { ref: 'clips' }, right: 25 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showAutoClippers', value: true },
        { action: 'message', text: 'AutoClippers are now available!', type: 'success' }
      ]
    },

    // Unlock mega-clippers after 500 funds
    {
      id: 'unlock-megaclippers',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showMegaClippers' } },
        { op: 'gte', left: { ref: 'funds' }, right: 500 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showMegaClippers', value: true },
        { action: 'message', text: 'MegaClippers unlocked!', type: 'success' }
      ]
    },

    // Unlock marketing after 100 funds
    {
      id: 'unlock-marketing',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showMarketing' } },
        { op: 'gte', left: { ref: 'funds' }, right: 100 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showMarketing', value: true },
        { action: 'message', text: 'Marketing is now available!', type: 'success' }
      ]
    },

    // Auto-clippers produce clips (every tick)
    {
      id: 'autoclipper-production',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'clipperLevel' }, right: 0 },
        { op: 'gt', left: { ref: 'wire' }, right: 0 }
      ]},
      actions: [
        {
          action: 'if',
          condition: { op: 'gte', left: { ref: 'wire' }, right: { op: 'mul', args: [{ ref: 'clipperLevel' }, { ref: 'clipperBoost' }, 0.1] } },
          then: [
            { action: 'add', target: 'clips', value: { op: 'mul', args: [{ ref: 'clipperLevel' }, { ref: 'clipperBoost' }, 0.1] } },
            { action: 'add', target: 'unsoldClips', value: { op: 'mul', args: [{ ref: 'clipperLevel' }, { ref: 'clipperBoost' }, 0.1] } },
            { action: 'add', target: 'wire', value: { op: 'mul', args: [{ ref: 'clipperLevel' }, { ref: 'clipperBoost' }, -0.1] } }
          ]
        }
      ]
    },

    // Mega-clippers produce clips (faster)
    {
      id: 'megaclipper-production',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'megaClipperLevel' }, right: 0 },
        { op: 'gt', left: { ref: 'wire' }, right: 0 }
      ]},
      actions: [
        {
          action: 'if',
          condition: { op: 'gte', left: { ref: 'wire' }, right: { op: 'mul', args: [{ ref: 'megaClipperLevel' }, 0.5] } },
          then: [
            { action: 'add', target: 'clips', value: { op: 'mul', args: [{ ref: 'megaClipperLevel' }, 0.5] } },
            { action: 'add', target: 'unsoldClips', value: { op: 'mul', args: [{ ref: 'megaClipperLevel' }, 0.5] } },
            { action: 'add', target: 'wire', value: { op: 'mul', args: [{ ref: 'megaClipperLevel' }, -0.5] } }
          ]
        }
      ]
    },

    // Clamp wire to 0 (prevent negative values)
    {
      id: 'clamp-wire',
      timing: 'tick',
      condition: { op: 'lt', left: { ref: 'wire' }, right: 0 },
      actions: [
        { action: 'set', target: 'wire', value: 0 }
      ]
    },

    // Auto-sell clips (based on demand)
    {
      id: 'auto-sell',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'unsoldClips' }, right: 0 },
      actions: [
        {
          action: 'if',
          condition: { op: 'gt', left: { op: 'random', args: [] }, right: { op: 'sub', args: [1, { op: 'div', args: [{ ref: 'demand' }, 100] }] } },
          then: [
            { action: 'add', target: 'unsoldClips', value: -1 },
            { action: 'add', target: 'funds', value: { ref: 'margin' } }
          ]
        }
      ]
    },

    // Update demand based on price
    {
      id: 'update-demand',
      timing: 'second',
      condition: { op: 'true' },
      actions: [
        {
          action: 'set',
          target: 'demand',
          value: {
            op: 'max',
            args: [
              0,
              {
                op: 'min',
                args: [
                  100,
                  {
                    op: 'add',
                    args: [
                      { op: 'mul', args: [{ op: 'sub', args: [0.25, { ref: 'margin' }] }, 50] },
                      { op: 'mul', args: [{ ref: 'marketingLevel' }, 2] }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    },

    // Fluctuate wire prices
    {
      id: 'wire-price-fluctuate',
      timing: 'second',
      cooldown: 50,  // Every ~5 seconds
      condition: { op: 'true' },
      actions: [
        {
          action: 'set',
          target: 'wireCost',
          value: {
            op: 'max',
            args: [
              15,
              {
                op: 'min',
                args: [
                  30,
                  { op: 'add', args: [{ ref: 'wireCost' }, { op: 'sub', args: [{ op: 'mul', args: [{ op: 'random', args: [] }, 6] }, 3] }] }
                ]
              }
            ]
          }
        }
      ]
    }
  ],

  projects: [
    {
      id: 'buy-autoclipper',
      name: 'AutoClipper',
      description: 'Automatically makes paperclips',
      trigger: { op: 'flag', flag: 'showAutoClippers' },
      costs: [{ resource: 'funds', amount: { ref: 'clipperCost' } }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'clipperLevel', value: 1 },
        { action: 'multiply', target: 'clipperCost', value: 1.1 }
      ]
    },
    {
      id: 'buy-megaclipper',
      name: 'MegaClipper',
      description: 'Industrial clip production (500x faster)',
      trigger: { op: 'flag', flag: 'showMegaClippers' },
      costs: [{ resource: 'funds', amount: { ref: 'megaClipperCost' } }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'megaClipperLevel', value: 1 },
        { action: 'multiply', target: 'megaClipperCost', value: 1.07 }
      ]
    },
    {
      id: 'buy-marketing',
      name: 'Marketing',
      description: 'Increase demand',
      trigger: { op: 'flag', flag: 'showMarketing' },
      costs: [{ resource: 'funds', amount: { ref: 'marketingCost' } }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'marketingLevel', value: 1 },
        { action: 'multiply', target: 'marketingCost', value: 2 }
      ]
    }
  ],

  functions: {
    makeClip: [
      {
        action: 'if',
        condition: { op: 'gt', left: { ref: 'wire' }, right: 0 },
        then: [
          { action: 'add', target: 'clips', value: 1 },
          { action: 'add', target: 'unsoldClips', value: 1 },
          { action: 'add', target: 'wire', value: -1 }
        ]
      }
    ],
    buyWire: [
      {
        action: 'if',
        condition: { op: 'gte', left: { ref: 'funds' }, right: { ref: 'wireCost' } },
        then: [
          { action: 'add', target: 'funds', value: { op: 'mul', args: [{ ref: 'wireCost' }, -1] } },
          { action: 'add', target: 'wire', value: 1000 }
        ]
      }
    ],
    lowerPrice: [
      {
        action: 'if',
        condition: { op: 'gt', left: { ref: 'margin' }, right: 0.01 },
        then: [
          { action: 'add', target: 'margin', value: -0.01 }
        ]
      }
    ],
    raisePrice: [
      { action: 'add', target: 'margin', value: 0.01 }
    ]
  },

  ui: {
    sections: [
      {
        id: 'stats',
        name: 'Paperclips',
        icon: '📎',
        bindings: [
          { elementId: 'clips', type: 'display', value: { ref: 'clips' }, format: 'compact', prefix: 'Total: ' },
          { elementId: 'unsold', type: 'display', value: { ref: 'unsoldClips' }, format: 'compact', prefix: 'Unsold: ' },
          { elementId: 'funds', type: 'display', value: { ref: 'funds' }, format: 'currency', prefix: 'Funds: ' }
        ]
      },
      {
        id: 'controls',
        name: 'Manufacturing',
        icon: '🔧',
        bindings: [
          { elementId: 'makeClip', type: 'button', onClick: 'makeClip', value: 'Make Paperclip', enabled: { op: 'gt', left: { ref: 'wire' }, right: 0 } },
          { elementId: 'wire', type: 'display', value: { ref: 'wire' }, format: 'compact', prefix: 'Wire: ', suffix: ' inches' }
        ]
      },
      {
        id: 'market',
        name: 'Business',
        icon: '💼',
        bindings: [
          { elementId: 'margin', type: 'display', value: { ref: 'margin' }, format: 'currency', prefix: 'Price: ' },
          { elementId: 'demand', type: 'display', value: { ref: 'demand' }, suffix: '% demand' },
          { elementId: 'lowerPrice', type: 'button', onClick: 'lowerPrice', value: 'Lower Price' },
          { elementId: 'raisePrice', type: 'button', onClick: 'raisePrice', value: 'Raise Price' }
        ]
      },
      {
        id: 'wire-market',
        name: 'Wire',
        icon: '🔌',
        bindings: [
          { elementId: 'wireCost', type: 'display', value: { ref: 'wireCost' }, format: 'currency', prefix: 'Wire cost: ' },
          { elementId: 'buyWire', type: 'button', onClick: 'buyWire', value: 'Buy Wire (1000")', enabled: { op: 'gte', left: { ref: 'funds' }, right: { ref: 'wireCost' } } }
        ]
      },
      {
        id: 'production',
        name: 'Production',
        icon: '⚙️',
        visible: { op: 'flag', flag: 'showAutoClippers' },
        bindings: [
          { elementId: 'clippers', type: 'display', value: { ref: 'clipperLevel' }, prefix: 'AutoClippers: ' },
          { elementId: 'megaClippers', type: 'display', value: { ref: 'megaClipperLevel' }, prefix: 'MegaClippers: ' }
        ]
      }
    ]
  }
};

export default paperclipsGame;
