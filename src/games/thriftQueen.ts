/**
 * Thrift Queen - Vintage Fashion Empire 👗✨
 *
 * Build a sustainable fashion empire from thrift store finds to global brand!
 * Compete with fast fashion through style, sustainability, and social media savvy.
 *
 * Core Loop: Source → Style → Sell → Scale → Slay (fast fashion)
 */

import type { GameDefinition } from '../engine/types';

export const thriftQueenGame: GameDefinition = {
  meta: {
    id: 'thriftqueen',
    name: 'Thrift Queen 👑',
    version: '1.0.0',
    description: 'Build a vintage fashion empire and defeat fast fashion! 👗💚',
    author: 'Sustainable Style Studios'
  },

  config: {
    tickRate: 100,  // 10 ticks per second
    autoSaveInterval: 300,  // Every 30 seconds
    maxMessages: 40
  },

  state: [
    // ═══════════════════════════════════════════════════════════════
    // 💵 CORE RESOURCES
    // ═══════════════════════════════════════════════════════════════
    { id: 'cash', type: 'number', initial: 50, description: 'Available cash 💵', precision: 2 },
    { id: 'debt', type: 'number', initial: 0, description: 'Money owed 💳' },
    { id: 'totalRevenue', type: 'number', initial: 0, description: 'Lifetime revenue' },
    { id: 'totalSpent', type: 'number', initial: 0, description: 'Lifetime spending' },
    { id: 'totalProfit', type: 'number', initial: 0, description: 'Net profit' },

    // ═══════════════════════════════════════════════════════════════
    // 👗 INVENTORY & SALES
    // ═══════════════════════════════════════════════════════════════
    { id: 'inventoryCount', type: 'number', initial: 0, description: 'Items in inventory' },
    { id: 'inventoryCapacity', type: 'number', initial: 20, description: 'Max inventory size' },
    { id: 'listingsCount', type: 'number', initial: 0, description: 'Active listings' },
    { id: 'listingsCapacity', type: 'number', initial: 5, description: 'Max active listings' },
    { id: 'itemsSold', type: 'number', initial: 0, description: 'Total items sold' },
    { id: 'itemsSourced', type: 'number', initial: 0, description: 'Total items found' },

    // ═══════════════════════════════════════════════════════════════
    // ⭐ BRAND & REPUTATION
    // ═══════════════════════════════════════════════════════════════
    { id: 'reputation', type: 'number', initial: 1, description: 'Brand reputation (1-100)' },
    { id: 'styleCred', type: 'number', initial: 0, description: 'Fashion credibility 🎨' },
    { id: 'brandName', type: 'string', initial: '', description: 'Your brand name' },
    { id: 'hasBrandName', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // 💚 SUSTAINABILITY
    // ═══════════════════════════════════════════════════════════════
    { id: 'ecoScore', type: 'number', initial: 0, description: 'Sustainability impact 💚' },
    { id: 'clothesSaved', type: 'number', initial: 0, description: 'Items saved from landfill' },
    { id: 'fastFashionDamage', type: 'number', initial: 0, description: 'Damage dealt to fast fashion' },

    // ═══════════════════════════════════════════════════════════════
    // 📱 SOCIAL MEDIA & MARKETING
    // ═══════════════════════════════════════════════════════════════
    { id: 'followers', type: 'number', initial: 0, description: 'Social media followers 📱' },
    { id: 'subscribers', type: 'number', initial: 0, description: 'Email subscribers 📧' },
    { id: 'viralMoments', type: 'number', initial: 0, description: 'Times content went viral 🔥' },
    { id: 'pressFeatures', type: 'number', initial: 0, description: 'Press mentions 📰' },

    // ═══════════════════════════════════════════════════════════════
    // 💰 MULTIPLIERS & BONUSES
    // ═══════════════════════════════════════════════════════════════
    { id: 'priceMultiplier', type: 'number', initial: 1, description: 'Sell price bonus' },
    { id: 'sourcingDiscount', type: 'number', initial: 1, description: 'Buy price reduction' },
    { id: 'passiveIncome', type: 'number', initial: 0, description: 'Passive $/sec' },
    { id: 'followerGrowth', type: 'number', initial: 0.1, description: 'Followers per tick' },
    { id: 'subscriberGrowth', type: 'number', initial: 0, description: 'Subscribers per tick' },
    { id: 'findBonus', type: 'number', initial: 0, description: 'Chance to find rare items' },
    { id: 'autoSellChance', type: 'number', initial: 0, description: 'Auto-sell probability' },
    { id: 'trendBonus', type: 'number', initial: 1, description: 'Trend event multiplier' },

    // ═══════════════════════════════════════════════════════════════
    // 🏪 RETAIL & EMPLOYEES
    // ═══════════════════════════════════════════════════════════════
    { id: 'storeCount', type: 'number', initial: 0, description: 'Physical stores owned' },
    { id: 'employeeCount', type: 'number', initial: 0, description: 'Team members' },
    { id: 'storeIncome', type: 'number', initial: 0, description: 'Store passive income' },

    // ═══════════════════════════════════════════════════════════════
    // 🎯 MARKET EVENTS
    // ═══════════════════════════════════════════════════════════════
    { id: 'activeEventId', type: 'string', initial: '' },
    { id: 'eventName', type: 'string', initial: '' },
    { id: 'eventMultiplier', type: 'number', initial: 1 },
    { id: 'eventCategory', type: 'string', initial: '' },
    { id: 'eventTicksRemaining', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // 🎮 GAME PROGRESSION
    // ═══════════════════════════════════════════════════════════════
    { id: 'gameTime', type: 'number', initial: 0, description: 'Total seconds played' },
    { id: 'gameTick', type: 'number', initial: 0 },
    { id: 'currentPhase', type: 'string', initial: 'hustle' },

    // Starter selection
    { id: 'hasChosenStarter', type: 'boolean', initial: false },
    { id: 'starterPath', type: 'string', initial: '' },

    // ═══════════════════════════════════════════════════════════════
    // 🔓 FEATURE UNLOCKS
    // ═══════════════════════════════════════════════════════════════
    { id: 'showUpgrades', type: 'boolean', initial: false },
    { id: 'showOnline', type: 'boolean', initial: false },
    { id: 'showMarketing', type: 'boolean', initial: false },
    { id: 'showBranding', type: 'boolean', initial: false },
    { id: 'showRetail', type: 'boolean', initial: false },
    { id: 'showTeam', type: 'boolean', initial: false },
    { id: 'showAutoSell', type: 'boolean', initial: false },
    { id: 'showTrends', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // 🛍️ SOURCING UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_s1', type: 'boolean', initial: false, description: 'Thrift Store Regular' },
    { id: 'upgrade_s2', type: 'boolean', initial: false, description: 'Estate Sale Access' },
    { id: 'upgrade_s3', type: 'boolean', initial: false, description: 'Donation Network' },
    { id: 'upgrade_s4', type: 'boolean', initial: false, description: 'Vintage Dealer Contact' },
    { id: 'upgrade_s5', type: 'boolean', initial: false, description: 'International Sourcing' },
    { id: 'upgrade_s6', type: 'boolean', initial: false, description: 'Celebrity Closet Access' },

    // ═══════════════════════════════════════════════════════════════
    // 📸 PHOTOGRAPHY UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_p1', type: 'boolean', initial: false, description: 'Ring Light' },
    { id: 'upgrade_p2', type: 'boolean', initial: false, description: 'Mannequin' },
    { id: 'upgrade_p3', type: 'boolean', initial: false, description: 'Photo Studio' },
    { id: 'upgrade_p4', type: 'boolean', initial: false, description: 'Pro Photographer' },

    // ═══════════════════════════════════════════════════════════════
    // 📣 MARKETING UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_m1', type: 'boolean', initial: false, description: 'Instagram Account' },
    { id: 'upgrade_m2', type: 'boolean', initial: false, description: 'TikTok Presence' },
    { id: 'upgrade_m3', type: 'boolean', initial: false, description: 'Email Newsletter' },
    { id: 'upgrade_m4', type: 'boolean', initial: false, description: 'Influencer Collab' },
    { id: 'upgrade_m5', type: 'boolean', initial: false, description: 'PR Agency' },
    { id: 'upgrade_m6', type: 'boolean', initial: false, description: 'Fashion Week Sponsor' },

    // ═══════════════════════════════════════════════════════════════
    // ⚙️ OPERATIONS UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_o1', type: 'boolean', initial: false, description: 'Clothing Rack' },
    { id: 'upgrade_o2', type: 'boolean', initial: false, description: 'Steamer' },
    { id: 'upgrade_o3', type: 'boolean', initial: false, description: 'Shipping Station' },
    { id: 'upgrade_o4', type: 'boolean', initial: false, description: 'Inventory System' },
    { id: 'upgrade_o5', type: 'boolean', initial: false, description: 'Alteration Skills' },
    { id: 'upgrade_o6', type: 'boolean', initial: false, description: 'Warehouse' },

    // ═══════════════════════════════════════════════════════════════
    // 🏪 RETAIL UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_r1', type: 'boolean', initial: false, description: 'Flea Market Booth' },
    { id: 'upgrade_r2', type: 'boolean', initial: false, description: 'Pop-up Shop' },
    { id: 'upgrade_r3', type: 'boolean', initial: false, description: 'Depop Shop' },
    { id: 'upgrade_r4', type: 'boolean', initial: false, description: 'Boutique Storefront' },
    { id: 'upgrade_r5', type: 'boolean', initial: false, description: 'Second Location' },
    { id: 'upgrade_r6', type: 'boolean', initial: false, description: 'Flagship Store' },

    // ═══════════════════════════════════════════════════════════════
    // 👥 TEAM UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_t1', type: 'boolean', initial: false, description: 'Part-time Helper' },
    { id: 'upgrade_t2', type: 'boolean', initial: false, description: 'Stylist' },
    { id: 'upgrade_t3', type: 'boolean', initial: false, description: 'Store Manager' },
    { id: 'upgrade_t4', type: 'boolean', initial: false, description: 'Social Media Manager' },
    { id: 'upgrade_t5', type: 'boolean', initial: false, description: 'Creative Director' },

    // ═══════════════════════════════════════════════════════════════
    // 💻 TECH UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_tech1', type: 'boolean', initial: false, description: 'POS System' },
    { id: 'upgrade_tech2', type: 'boolean', initial: false, description: 'E-commerce Website' },
    { id: 'upgrade_tech3', type: 'boolean', initial: false, description: 'AI Pricing Tool' },
    { id: 'upgrade_tech4', type: 'boolean', initial: false, description: 'CRM Software' },

    // ═══════════════════════════════════════════════════════════════
    // 👑 EMPIRE UPGRADES
    // ═══════════════════════════════════════════════════════════════
    { id: 'upgrade_e1', type: 'boolean', initial: false, description: 'Fashion Line Launch' },
    { id: 'upgrade_e2', type: 'boolean', initial: false, description: 'Documentary Deal' },
    { id: 'upgrade_e3', type: 'boolean', initial: false, description: 'Vogue Feature' },
    { id: 'upgrade_e4', type: 'boolean', initial: false, description: 'Global Brand Status' },

    // ═══════════════════════════════════════════════════════════════
    // 🏆 ACHIEVEMENTS
    // ═══════════════════════════════════════════════════════════════
    { id: 'ach_firstSale', type: 'boolean', initial: false },
    { id: 'ach_century', type: 'boolean', initial: false },
    { id: 'ach_thousand', type: 'boolean', initial: false },
    { id: 'ach_viral', type: 'boolean', initial: false },
    { id: 'ach_pressLove', type: 'boolean', initial: false },
    { id: 'ach_styleIcon', type: 'boolean', initial: false },
    { id: 'ach_earthWarrior', type: 'boolean', initial: false },
    { id: 'ach_millionaire', type: 'boolean', initial: false },
    { id: 'ach_fastFashionSlayer', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // 🎯 WIN CONDITION TRACKING
    // ═══════════════════════════════════════════════════════════════
    { id: 'hasWon', type: 'boolean', initial: false },
    { id: 'fastFashionHealth', type: 'number', initial: 10000, description: 'Fast fashion market share to destroy' }
  ],

  phases: [
    {
      id: 'start',
      name: '✨ Choose Your Path',
      trigger: { op: 'not', condition: { op: 'flag', flag: 'hasChosenStarter' } },
      onEnter: [{ action: 'message', text: '👑 Welcome to Thrift Queen! Choose your starting path...', type: 'info' }]
    },
    {
      id: 'hustle',
      name: '🛍️ The Hustle',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 500 }
      ]},
      onEnter: [
        { action: 'message', text: '🛍️ Phase 1: The Hustle! Time to flip some finds! 💪', type: 'info' },
        { action: 'set', target: 'currentPhase', value: 'hustle' }
      ]
    },
    {
      id: 'online',
      name: '📱 Online Presence',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'totalProfit' }, right: 500 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 5000 }
      ]},
      onEnter: [
        { action: 'message', text: '📱 Phase 2: Going Digital! Time to build your online empire! ✨', type: 'success' },
        { action: 'set', target: 'currentPhase', value: 'online' },
        { action: 'set', target: 'showOnline', value: true },
        { action: 'set', target: 'showMarketing', value: true }
      ]
    },
    {
      id: 'brand',
      name: '🎨 The Brand',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'totalProfit' }, right: 5000 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 25000 }
      ]},
      onEnter: [
        { action: 'message', text: '🎨 Phase 3: You\'re becoming a BRAND! Name your empire! 👑', type: 'success' },
        { action: 'set', target: 'currentPhase', value: 'brand' },
        { action: 'set', target: 'showBranding', value: true }
      ]
    },
    {
      id: 'retail',
      name: '🏪 Retail Empire',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'totalProfit' }, right: 25000 },
        { op: 'lt', left: { ref: 'totalProfit' }, right: 100000 }
      ]},
      onEnter: [
        { action: 'message', text: '🏪 Phase 4: Retail Empire! Brick and mortar awaits! 🏰', type: 'success' },
        { action: 'set', target: 'currentPhase', value: 'retail' },
        { action: 'set', target: 'showRetail', value: true },
        { action: 'set', target: 'showTeam', value: true }
      ]
    },
    {
      id: 'global',
      name: '🌍 Global Movement',
      trigger: { op: 'gte', left: { ref: 'totalProfit' }, right: 100000 },
      onEnter: [
        { action: 'message', text: '🌍 Phase 5: GLOBAL MOVEMENT! You\'re changing fashion forever! 👑💚', type: 'success' },
        { action: 'set', target: 'currentPhase', value: 'global' }
      ]
    }
  ],

  rules: [
    // ═══════════════════════════════════════════════════════════════
    // ⏰ CORE GAME LOOP
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'tick-counter',
      timing: 'tick',
      condition: { op: 'flag', flag: 'hasChosenStarter' },
      actions: [{ action: 'add', target: 'gameTick', value: 1 }]
    },
    {
      id: 'game-time',
      timing: 'second',
      condition: { op: 'flag', flag: 'hasChosenStarter' },
      actions: [{ action: 'add', target: 'gameTime', value: 1 }]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💰 PASSIVE INCOME (from stores, team, etc.)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'passive-income',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'gt', left: { op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'storeIncome' }] }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'cash', value: { op: 'div', args: [{ op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'storeIncome' }] }, 10] } },
        { action: 'add', target: 'totalRevenue', value: { op: 'div', args: [{ op: 'add', args: [{ ref: 'passiveIncome' }, { ref: 'storeIncome' }] }, 10] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 📱 FOLLOWER GROWTH
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'follower-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'gt', left: { ref: 'followerGrowth' }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'followers', value: { op: 'div', args: [{ ref: 'followerGrowth' }, 10] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 📧 SUBSCRIBER GROWTH
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'subscriber-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'gt', left: { ref: 'subscriberGrowth' }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'subscribers', value: { op: 'div', args: [{ ref: 'subscriberGrowth' }, 10] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💳 DEBT INTEREST (2% per minute)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'debt-interest',
      timing: 'second',
      cooldown: 600,
      condition: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      actions: [
        { action: 'multiply', target: 'debt', value: 1.02 },
        { action: 'message', text: '💳 Interest added to your debt...', type: 'warning' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔓 FEATURE UNLOCKS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'unlock-upgrades',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showUpgrades' } },
        { op: 'gte', left: { ref: 'itemsSold' }, right: 3 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showUpgrades', value: true },
        { action: 'message', text: '✨ Upgrades unlocked! Time to level up your hustle! 🛍️', type: 'success' }
      ]
    },
    {
      id: 'unlock-trends',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showTrends' } },
        { op: 'gte', left: { ref: 'followers' }, right: 100 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showTrends', value: true },
        { action: 'message', text: '📈 Trend alerts unlocked! Watch for viral moments! 🔥', type: 'success' }
      ]
    },
    {
      id: 'unlock-autosell',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'showAutoSell' } },
        { op: 'flag', flag: 'upgrade_r3' }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'showAutoSell', value: true },
        { action: 'message', text: '🤖 Auto-sell enabled! Your Depop shop runs 24/7! 💅', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🤖 AUTO-SELL (when Depop shop is active)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'auto-sell-tick',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'showAutoSell' },
        { op: 'gt', left: { ref: 'autoSellChance' }, right: 0 },
        { op: 'gt', left: { ref: 'listingsCount' }, right: 0 },
        { op: 'eq', left: { op: 'mod', args: [{ ref: 'gameTick' }, 50] }, right: 0 }
      ]},
      actions: [
        { action: 'emit', event: 'auto-sell-check' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎯 MARKET EVENTS - Fashion Trends!
    // ═══════════════════════════════════════════════════════════════
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
            { action: 'set', target: 'eventCategory', value: '' },
            { action: 'emit', event: 'trend-ended' },
            { action: 'message', text: '📉 Trend cycle ended. Fashion moves fast! 💨', type: 'info' }
          ]
        }
      ]
    },
    {
      id: 'random-trend-trigger',
      timing: 'second',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTrends' },
        { op: 'eq', left: { ref: 'activeEventId' }, right: '' },
        { op: 'gt', left: { op: 'random', args: [] }, right: 0.97 }
      ]},
      actions: [
        {
          action: 'random',
          choices: [
            {
              weight: 1.5,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'y2k' },
                { action: 'set', target: 'eventName', value: '💿 Y2K Revival!' },
                { action: 'set', target: 'eventMultiplier', value: 2.0 },
                { action: 'set', target: 'eventCategory', value: 'y2k' },
                { action: 'set', target: 'eventTicksRemaining', value: 400 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '💿 Y2K REVIVAL! Low-rise & butterfly clips are 🔥! 2000s items +100%!', type: 'success' }
              ]
            },
            {
              weight: 1.2,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'coastal' },
                { action: 'set', target: 'eventName', value: '🌊 Coastal Grandma!' },
                { action: 'set', target: 'eventMultiplier', value: 1.8 },
                { action: 'set', target: 'eventCategory', value: 'linen' },
                { action: 'set', target: 'eventTicksRemaining', value: 350 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '🌊 COASTAL GRANDMA trend! Linen & neutrals +80%! 🐚', type: 'success' }
              ]
            },
            {
              weight: 1.0,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'grunge' },
                { action: 'set', target: 'eventName', value: '🎸 90s Grunge!' },
                { action: 'set', target: 'eventMultiplier', value: 1.7 },
                { action: 'set', target: 'eventCategory', value: '90s' },
                { action: 'set', target: 'eventTicksRemaining', value: 380 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '🎸 90s GRUNGE is back! Flannel & band tees +70%! 🤘', type: 'success' }
              ]
            },
            {
              weight: 0.8,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'designer' },
                { action: 'set', target: 'eventName', value: '👜 Designer Vintage!' },
                { action: 'set', target: 'eventMultiplier', value: 2.5 },
                { action: 'set', target: 'eventCategory', value: 'designer' },
                { action: 'set', target: 'eventTicksRemaining', value: 300 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '👜 DESIGNER VINTAGE surge! Logo pieces +150%! 💎', type: 'success' }
              ]
            },
            {
              weight: 1.0,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'disco' },
                { action: 'set', target: 'eventName', value: '🪩 70s Disco!' },
                { action: 'set', target: 'eventMultiplier', value: 1.6 },
                { action: 'set', target: 'eventCategory', value: '70s' },
                { action: 'set', target: 'eventTicksRemaining', value: 350 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '🪩 DISCO FEVER! 70s pieces are ICONIC! +60%! ✨', type: 'success' }
              ]
            },
            {
              weight: 0.9,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'denim' },
                { action: 'set', target: 'eventName', value: '👖 Denim Everything!' },
                { action: 'set', target: 'eventMultiplier', value: 1.5 },
                { action: 'set', target: 'eventCategory', value: 'denim' },
                { action: 'set', target: 'eventTicksRemaining', value: 400 },
                { action: 'emit', event: 'trend-started' },
                { action: 'message', text: '👖 DENIM ON DENIM! Canadian tuxedos are in! +50%! 🍁', type: 'success' }
              ]
            },
            {
              weight: 0.7,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'scandal' },
                { action: 'set', target: 'eventName', value: '📰 Fast Fashion Scandal!' },
                { action: 'set', target: 'eventMultiplier', value: 1.8 },
                { action: 'set', target: 'eventCategory', value: 'all' },
                { action: 'set', target: 'eventTicksRemaining', value: 500 },
                { action: 'emit', event: 'trend-started' },
                { action: 'add', target: 'fastFashionDamage', value: 500 },
                { action: 'message', text: '📰 FAST FASHION SCANDAL! Everyone\'s going vintage! ALL items +80%! 💚', type: 'success' }
              ]
            },
            {
              weight: 0.6,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'celeb' },
                { action: 'set', target: 'eventName', value: '⭐ Celebrity Vintage Moment!' },
                { action: 'set', target: 'eventMultiplier', value: 2.2 },
                { action: 'set', target: 'eventCategory', value: 'statement' },
                { action: 'set', target: 'eventTicksRemaining', value: 280 },
                { action: 'emit', event: 'trend-started' },
                { action: 'add', target: 'followers', value: 1000 },
                { action: 'message', text: '⭐ A-LISTER spotted in vintage! Statement pieces +120%! Followers surge! 📈', type: 'success' }
              ]
            },
            {
              weight: 0.5,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'earthday' },
                { action: 'set', target: 'eventName', value: '🌍 Earth Day Awareness!' },
                { action: 'set', target: 'eventMultiplier', value: 1.4 },
                { action: 'set', target: 'eventCategory', value: 'all' },
                { action: 'set', target: 'eventTicksRemaining', value: 600 },
                { action: 'emit', event: 'trend-started' },
                { action: 'add', target: 'ecoScore', value: 200 },
                { action: 'add', target: 'fastFashionDamage', value: 300 },
                { action: 'message', text: '🌍 EARTH DAY! Sustainable fashion trending! +40% sales, +200 EcoScore! 💚', type: 'success' }
              ]
            },
            {
              weight: 0.4,
              actions: [
                { action: 'set', target: 'activeEventId', value: 'viral' },
                { action: 'set', target: 'eventName', value: '🔥 Thrift Flip Viral!' },
                { action: 'set', target: 'eventMultiplier', value: 1.6 },
                { action: 'set', target: 'eventCategory', value: 'all' },
                { action: 'set', target: 'eventTicksRemaining', value: 350 },
                { action: 'emit', event: 'trend-started' },
                { action: 'add', target: 'followers', value: 5000 },
                { action: 'add', target: 'viralMoments', value: 1 },
                { action: 'message', text: '🔥 YOUR CONTENT WENT VIRAL! +5000 followers! Thrift flips +60%! 📱🎉', type: 'success' }
              ]
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🏆 ACHIEVEMENTS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'ach-first-sale',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_firstSale' } },
        { op: 'gte', left: { ref: 'itemsSold' }, right: 1 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_firstSale', value: true },
        { action: 'add', target: 'styleCred', value: 5 },
        { action: 'message', text: '🏆 ACHIEVEMENT: First Flip! Your vintage journey begins! +5 Style Cred ✨', type: 'success' }
      ]
    },
    {
      id: 'ach-century',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_century' } },
        { op: 'gte', left: { ref: 'itemsSold' }, right: 100 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_century', value: true },
        { action: 'add', target: 'styleCred', value: 25 },
        { action: 'add', target: 'reputation', value: 5 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Century Club! 100 items sold! 💯 +25 Style Cred!', type: 'success' }
      ]
    },
    {
      id: 'ach-thousand',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_thousand' } },
        { op: 'gte', left: { ref: 'itemsSold' }, right: 1000 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_thousand', value: true },
        { action: 'add', target: 'styleCred', value: 100 },
        { action: 'add', target: 'reputation', value: 10 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Thousand Seller! 1000 pieces rehomed! 👑 +100 Style Cred!', type: 'success' }
      ]
    },
    {
      id: 'ach-viral',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_viral' } },
        { op: 'gte', left: { ref: 'followers' }, right: 10000 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_viral', value: true },
        { action: 'add', target: 'styleCred', value: 50 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Viral Queen! 10K followers! 📱👑 +50 Style Cred!', type: 'success' }
      ]
    },
    {
      id: 'ach-press',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_pressLove' } },
        { op: 'gte', left: { ref: 'pressFeatures' }, right: 5 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_pressLove', value: true },
        { action: 'add', target: 'reputation', value: 15 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Press Darling! Featured 5 times! 📰✨ +15 Reputation!', type: 'success' }
      ]
    },
    {
      id: 'ach-style-icon',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_styleIcon' } },
        { op: 'gte', left: { ref: 'reputation' }, right: 80 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_styleIcon', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.2 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Style Icon! 80+ Reputation! 👑 +20% prices!', type: 'success' }
      ]
    },
    {
      id: 'ach-earth-warrior',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_earthWarrior' } },
        { op: 'gte', left: { ref: 'ecoScore' }, right: 1000 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_earthWarrior', value: true },
        { action: 'add', target: 'fastFashionDamage', value: 1000 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Earth Warrior! 1000 EcoScore! 🌍💚 Fast fashion takes damage!', type: 'success' }
      ]
    },
    {
      id: 'ach-millionaire',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'ach_millionaire' } },
        { op: 'gte', left: { ref: 'totalRevenue' }, right: 1000000 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'ach_millionaire', value: true },
        { action: 'add', target: 'reputation', value: 20 },
        { action: 'message', text: '🏆 ACHIEVEMENT: Millionaire! $1M revenue! 💰👑 You\'re fashion royalty!', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎯 WIN CONDITION - Defeat Fast Fashion!
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'fast-fashion-damage',
      timing: 'second',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasChosenStarter' },
        { op: 'gt', left: { ref: 'fastFashionHealth' }, right: 0 }
      ]},
      actions: [
        {
          action: 'add',
          target: 'fastFashionDamage',
          value: { op: 'div', args: [{ op: 'add', args: [{ ref: 'reputation' }, { ref: 'ecoScore' }] }, 100] }
        }
      ]
    },
    {
      id: 'win-condition',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'hasWon' } },
        { op: 'gte', left: { ref: 'totalRevenue' }, right: 1000000 },
        { op: 'gte', left: { ref: 'reputation' }, right: 80 },
        { op: 'gte', left: { ref: 'ecoScore' }, right: 500 }
      ]},
      maxFires: 1,
      actions: [
        { action: 'set', target: 'hasWon', value: true },
        { action: 'set', target: 'ach_fastFashionSlayer', value: true },
        { action: 'message', text: '👑💚 CONGRATULATIONS! You\'ve built a sustainable fashion empire and changed the industry! FAST FASHION IS DEFEATED! 🎉🌍', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 📊 PROFIT TRACKING
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'update-profit',
      timing: 'tick',
      condition: { op: 'flag', flag: 'hasChosenStarter' },
      actions: [
        { action: 'set', target: 'totalProfit', value: { op: 'sub', args: [{ ref: 'totalRevenue' }, { ref: 'totalSpent' }] } }
      ]
    }
  ],

  projects: [
    // ═══════════════════════════════════════════════════════════════
    // 🛍️ SOURCING UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-s1',
      name: 'Thrift Store Regular 🛒',
      description: 'Staff knows you! 10% off sourcing',
      icon: '🛒',
      priceTag: '$50',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s1' } }
      ]},
      costs: [{ resource: 'cash', amount: 50 }],
      effects: [
        { action: 'set', target: 'upgrade_s1', value: true },
        { action: 'multiply', target: 'sourcingDiscount', value: 0.9 },
        { action: 'message', text: '🛒 You\'re a regular now! Staff saves the good stuff for you! 💅', type: 'success' }
      ],
      category: 'sourcing'
    },
    {
      id: 'upgrade-s2',
      name: 'Estate Sale Access 🏠',
      description: 'First dibs on estate sales! +10% find rare items',
      icon: '🏠',
      priceTag: '$200',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_s1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s2' } }
      ]},
      costs: [{ resource: 'cash', amount: 200 }],
      effects: [
        { action: 'set', target: 'upgrade_s2', value: true },
        { action: 'add', target: 'findBonus', value: 0.1 },
        { action: 'message', text: '🏠 Estate sale connections! Grandma\'s closet = gold mine! 💎', type: 'success' }
      ],
      category: 'sourcing'
    },
    {
      id: 'upgrade-s3',
      name: 'Donation Network 📦',
      description: 'Free items from cleanup services! +$2/sec',
      icon: '📦',
      priceTag: '$500',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_s2' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s3' } }
      ]},
      costs: [{ resource: 'cash', amount: 500 }],
      effects: [
        { action: 'set', target: 'upgrade_s3', value: true },
        { action: 'add', target: 'passiveIncome', value: 2 },
        { action: 'add', target: 'ecoScore', value: 50 },
        { action: 'message', text: '📦 Donation network active! Free clothes = pure profit! 💚', type: 'success' }
      ],
      category: 'sourcing'
    },
    {
      id: 'upgrade-s4',
      name: 'Vintage Dealer Contact 🤝',
      description: 'Access rare vintage! +20% find bonus, 15% off',
      icon: '🤝',
      priceTag: '$2000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_s3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s4' } }
      ]},
      costs: [{ resource: 'cash', amount: 2000 }],
      effects: [
        { action: 'set', target: 'upgrade_s4', value: true },
        { action: 'add', target: 'findBonus', value: 0.2 },
        { action: 'multiply', target: 'sourcingDiscount', value: 0.85 },
        { action: 'message', text: '🤝 Vintage dealer on speed dial! The REAL good stuff incoming! 👗', type: 'success' }
      ],
      category: 'sourcing'
    },
    {
      id: 'upgrade-s5',
      name: 'International Sourcing ✈️',
      description: 'Paris, Tokyo, London! +30% find bonus, +10 reputation',
      icon: '✈️',
      priceTag: '$15000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_s4' },
        { op: 'gte', left: { ref: 'totalProfit' }, right: 10000 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s5' } }
      ]},
      costs: [{ resource: 'cash', amount: 15000 }],
      effects: [
        { action: 'set', target: 'upgrade_s5', value: true },
        { action: 'add', target: 'findBonus', value: 0.3 },
        { action: 'add', target: 'reputation', value: 10 },
        { action: 'message', text: '✈️ International sourcing! European vintage hits different! 🌍👑', type: 'success' }
      ],
      category: 'sourcing'
    },
    {
      id: 'upgrade-s6',
      name: 'Celebrity Closet Access 🌟',
      description: 'A-list consignments! +50% prices, +20 reputation',
      icon: '🌟',
      priceTag: '$100000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_s5' },
        { op: 'gte', left: { ref: 'reputation' }, right: 50 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_s6' } }
      ]},
      costs: [{ resource: 'cash', amount: 100000 }],
      effects: [
        { action: 'set', target: 'upgrade_s6', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.5 },
        { action: 'add', target: 'reputation', value: 20 },
        { action: 'add', target: 'pressFeatures', value: 2 },
        { action: 'message', text: '🌟 CELEBRITY CLOSET ACCESS! Styling the stars! 👑✨', type: 'success' }
      ],
      category: 'sourcing'
    },

    // ═══════════════════════════════════════════════════════════════
    // 📸 PHOTOGRAPHY UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-p1',
      name: 'Ring Light 💡',
      description: 'Better photos! +10% prices',
      icon: '💡',
      priceTag: '$75',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_p1' } }
      ]},
      costs: [{ resource: 'cash', amount: 75 }],
      effects: [
        { action: 'set', target: 'upgrade_p1', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.1 },
        { action: 'message', text: '💡 Ring light acquired! Your photos are giving ✨GLOW✨!', type: 'success' }
      ],
      category: 'photography'
    },
    {
      id: 'upgrade-p2',
      name: 'Mannequin 🧍',
      description: 'Professional display! +15% prices',
      icon: '🧍',
      priceTag: '$200',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_p1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_p2' } }
      ]},
      costs: [{ resource: 'cash', amount: 200 }],
      effects: [
        { action: 'set', target: 'upgrade_p2', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.15 },
        { action: 'message', text: '🧍 Mannequin unlocked! Professional vibes only! 💅', type: 'success' }
      ],
      category: 'photography'
    },
    {
      id: 'upgrade-p3',
      name: 'Photo Studio 📷',
      description: 'Dedicated space! +25% prices, +5 listings',
      icon: '📷',
      priceTag: '$2500',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_p2' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_p3' } }
      ]},
      costs: [{ resource: 'cash', amount: 2500 }],
      effects: [
        { action: 'set', target: 'upgrade_p3', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.25 },
        { action: 'add', target: 'listingsCapacity', value: 5 },
        { action: 'message', text: '📷 Photo studio built! Magazine-worthy shots! 📸✨', type: 'success' }
      ],
      category: 'photography'
    },
    {
      id: 'upgrade-p4',
      name: 'Product Photographer 📸',
      description: 'Hire a pro! Auto-list items, +$5/sec',
      icon: '📸',
      priceTag: '$10000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_p3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_p4' } }
      ]},
      costs: [{ resource: 'cash', amount: 10000 }],
      effects: [
        { action: 'set', target: 'upgrade_p4', value: true },
        { action: 'add', target: 'passiveIncome', value: 5 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '📸 Pro photographer hired! Content machine activated! 🎬', type: 'success' }
      ],
      category: 'photography'
    },

    // ═══════════════════════════════════════════════════════════════
    // 📣 MARKETING UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-m1',
      name: 'Instagram Account 📱',
      description: 'Start your brand! +1 follower/sec',
      icon: '📱',
      priceTag: '$100',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m1' } }
      ]},
      costs: [{ resource: 'cash', amount: 100 }],
      effects: [
        { action: 'set', target: 'upgrade_m1', value: true },
        { action: 'add', target: 'followerGrowth', value: 1 },
        { action: 'message', text: '📱 Instagram launched! Time to curate that feed! 📸✨', type: 'success' }
      ],
      category: 'marketing'
    },
    {
      id: 'upgrade-m2',
      name: 'TikTok Presence 🎵',
      description: 'Viral potential! +3 followers/sec, trend bonus +20%',
      icon: '🎵',
      priceTag: '$500',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'flag', flag: 'upgrade_m1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m2' } }
      ]},
      costs: [{ resource: 'cash', amount: 500 }],
      effects: [
        { action: 'set', target: 'upgrade_m2', value: true },
        { action: 'add', target: 'followerGrowth', value: 3 },
        { action: 'add', target: 'trendBonus', value: 0.2 },
        { action: 'message', text: '🎵 TikTok time! Get ready to go viral! 🔥', type: 'success' }
      ],
      category: 'marketing'
    },
    {
      id: 'upgrade-m3',
      name: 'Email Newsletter 📧',
      description: 'Direct to customers! +0.5 subscribers/sec, +10% sales',
      icon: '📧',
      priceTag: '$300',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'flag', flag: 'upgrade_m1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m3' } }
      ]},
      costs: [{ resource: 'cash', amount: 300 }],
      effects: [
        { action: 'set', target: 'upgrade_m3', value: true },
        { action: 'add', target: 'subscriberGrowth', value: 0.5 },
        { action: 'add', target: 'autoSellChance', value: 0.1 },
        { action: 'message', text: '📧 Newsletter live! \'New drops\' hitting inboxes! 💌', type: 'success' }
      ],
      category: 'marketing'
    },
    {
      id: 'upgrade-m4',
      name: 'Influencer Collab 🤳',
      description: 'Partner up! +10 followers/sec, +5 reputation',
      icon: '🤳',
      priceTag: '$5000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'flag', flag: 'upgrade_m2' },
        { op: 'gte', left: { ref: 'followers' }, right: 1000 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m4' } }
      ]},
      costs: [{ resource: 'cash', amount: 5000 }],
      effects: [
        { action: 'set', target: 'upgrade_m4', value: true },
        { action: 'add', target: 'followerGrowth', value: 10 },
        { action: 'add', target: 'reputation', value: 5 },
        { action: 'message', text: '🤳 Influencer collab! Watch those followers POUR in! 📈', type: 'success' }
      ],
      category: 'marketing'
    },
    {
      id: 'upgrade-m5',
      name: 'PR Agency 📰',
      description: 'Get featured! +3 press features, +10 reputation',
      icon: '📰',
      priceTag: '$25000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'flag', flag: 'upgrade_m4' },
        { op: 'gte', left: { ref: 'reputation' }, right: 30 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m5' } }
      ]},
      costs: [{ resource: 'cash', amount: 25000 }],
      effects: [
        { action: 'set', target: 'upgrade_m5', value: true },
        { action: 'add', target: 'pressFeatures', value: 3 },
        { action: 'add', target: 'reputation', value: 10 },
        { action: 'add', target: 'followerGrowth', value: 5 },
        { action: 'message', text: '📰 PR Agency hired! Fashion mags are calling! 📞✨', type: 'success' }
      ],
      category: 'marketing'
    },
    {
      id: 'upgrade-m6',
      name: 'Fashion Week Sponsor 👗',
      description: 'Ultimate prestige! +25 reputation, +50 followers/sec',
      icon: '👗',
      priceTag: '$200000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showMarketing' },
        { op: 'flag', flag: 'upgrade_m5' },
        { op: 'gte', left: { ref: 'reputation' }, right: 60 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_m6' } }
      ]},
      costs: [{ resource: 'cash', amount: 200000 }],
      effects: [
        { action: 'set', target: 'upgrade_m6', value: true },
        { action: 'add', target: 'reputation', value: 25 },
        { action: 'add', target: 'followerGrowth', value: 50 },
        { action: 'add', target: 'pressFeatures', value: 5 },
        { action: 'message', text: '👗 FASHION WEEK SPONSOR! Front row at the shows! 👑🔥', type: 'success' }
      ],
      category: 'marketing'
    },

    // ═══════════════════════════════════════════════════════════════
    // ⚙️ OPERATIONS UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-o1',
      name: 'Clothing Rack 🏷️',
      description: '+10 inventory capacity',
      icon: '🏷️',
      priceTag: '$100',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o1' } }
      ]},
      costs: [{ resource: 'cash', amount: 100 }],
      effects: [
        { action: 'set', target: 'upgrade_o1', value: true },
        { action: 'add', target: 'inventoryCapacity', value: 10 },
        { action: 'message', text: '🏷️ Clothing rack set up! More room for finds! 👗', type: 'success' }
      ],
      category: 'operations'
    },
    {
      id: 'upgrade-o2',
      name: 'Garment Steamer 💨',
      description: 'Freshen items! +15% prices',
      icon: '💨',
      priceTag: '$150',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o2' } }
      ]},
      costs: [{ resource: 'cash', amount: 150 }],
      effects: [
        { action: 'set', target: 'upgrade_o2', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.15 },
        { action: 'message', text: '💨 Steamer ready! Wrinkle-free = worth more! ✨', type: 'success' }
      ],
      category: 'operations'
    },
    {
      id: 'upgrade-o3',
      name: 'Shipping Station 📬',
      description: 'Faster fulfillment! +$3/sec passive',
      icon: '📬',
      priceTag: '$400',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showOnline' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o3' } }
      ]},
      costs: [{ resource: 'cash', amount: 400 }],
      effects: [
        { action: 'set', target: 'upgrade_o3', value: true },
        { action: 'add', target: 'passiveIncome', value: 3 },
        { action: 'message', text: '📬 Shipping station ready! Orders flying out! ✈️', type: 'success' }
      ],
      category: 'operations'
    },
    {
      id: 'upgrade-o4',
      name: 'Inventory System 📊',
      description: '+25 inventory, +5 listings',
      icon: '📊',
      priceTag: '$1000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_o1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o4' } }
      ]},
      costs: [{ resource: 'cash', amount: 1000 }],
      effects: [
        { action: 'set', target: 'upgrade_o4', value: true },
        { action: 'add', target: 'inventoryCapacity', value: 25 },
        { action: 'add', target: 'listingsCapacity', value: 5 },
        { action: 'message', text: '📊 Inventory system live! Everything organized! 🗂️', type: 'success' }
      ],
      category: 'operations'
    },
    {
      id: 'upgrade-o5',
      name: 'Alteration Skills ✂️',
      description: 'Fix & upcycle! +25% prices, +50 EcoScore',
      icon: '✂️',
      priceTag: '$800',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o5' } }
      ]},
      costs: [{ resource: 'cash', amount: 800 }],
      effects: [
        { action: 'set', target: 'upgrade_o5', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.25 },
        { action: 'add', target: 'ecoScore', value: 50 },
        { action: 'message', text: '✂️ Alteration skills learned! Damaged → Designer! 🪡✨', type: 'success' }
      ],
      category: 'operations'
    },
    {
      id: 'upgrade-o6',
      name: 'Warehouse 🏭',
      description: 'Massive storage! +100 inventory, +20 listings',
      icon: '🏭',
      priceTag: '$20000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_o4' },
        { op: 'gte', left: { ref: 'totalProfit' }, right: 15000 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_o6' } }
      ]},
      costs: [{ resource: 'cash', amount: 20000 }],
      effects: [
        { action: 'set', target: 'upgrade_o6', value: true },
        { action: 'add', target: 'inventoryCapacity', value: 100 },
        { action: 'add', target: 'listingsCapacity', value: 20 },
        { action: 'message', text: '🏭 Warehouse acquired! Endless inventory space! 📦👑', type: 'success' }
      ],
      category: 'operations'
    },

    // ═══════════════════════════════════════════════════════════════
    // 🏪 RETAIL UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-r1',
      name: 'Flea Market Booth 🎪',
      description: 'Weekly sales! +$5/sec',
      icon: '🎪',
      priceTag: '$250',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r1' } }
      ]},
      costs: [{ resource: 'cash', amount: 250 }],
      effects: [
        { action: 'set', target: 'upgrade_r1', value: true },
        { action: 'add', target: 'passiveIncome', value: 5 },
        { action: 'message', text: '🎪 Flea market booth secured! Sunday funday sales! 🛍️', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-r2',
      name: 'Pop-up Shop 🏠',
      description: 'Event retail! +$10/sec, +5 reputation',
      icon: '🏠',
      priceTag: '$2000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showRetail' },
        { op: 'flag', flag: 'upgrade_r1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r2' } }
      ]},
      costs: [{ resource: 'cash', amount: 2000 }],
      effects: [
        { action: 'set', target: 'upgrade_r2', value: true },
        { action: 'add', target: 'passiveIncome', value: 10 },
        { action: 'add', target: 'reputation', value: 5 },
        { action: 'message', text: '🏠 Pop-up shop launched! The girlies are lining up! 👯‍♀️', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-r3',
      name: 'Depop Shop 📲',
      description: 'Online storefront! Auto-sell enabled, +20% sell chance',
      icon: '📲',
      priceTag: '$1000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showOnline' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r3' } }
      ]},
      costs: [{ resource: 'cash', amount: 1000 }],
      effects: [
        { action: 'set', target: 'upgrade_r3', value: true },
        { action: 'add', target: 'autoSellChance', value: 0.2 },
        { action: 'add', target: 'followerGrowth', value: 2 },
        { action: 'message', text: '📲 Depop shop OPEN! Auto-selling while you sleep! 😴💰', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-r4',
      name: 'Boutique Storefront 🏪',
      description: 'Your own store! +$50/sec, +10 reputation',
      icon: '🏪',
      priceTag: '$50000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showRetail' },
        { op: 'flag', flag: 'upgrade_r2' },
        { op: 'gte', left: { ref: 'totalProfit' }, right: 30000 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r4' } }
      ]},
      costs: [{ resource: 'cash', amount: 50000 }],
      effects: [
        { action: 'set', target: 'upgrade_r4', value: true },
        { action: 'add', target: 'storeIncome', value: 50 },
        { action: 'add', target: 'storeCount', value: 1 },
        { action: 'add', target: 'reputation', value: 10 },
        { action: 'message', text: '🏪 BOUTIQUE OPEN! Your name on the door! 👑✨', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-r5',
      name: 'Second Location 🏬',
      description: 'Expand! +$75/sec, +5 reputation',
      icon: '🏬',
      priceTag: '$100000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showRetail' },
        { op: 'flag', flag: 'upgrade_r4' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r5' } }
      ]},
      costs: [{ resource: 'cash', amount: 100000 }],
      effects: [
        { action: 'set', target: 'upgrade_r5', value: true },
        { action: 'add', target: 'storeIncome', value: 75 },
        { action: 'add', target: 'storeCount', value: 1 },
        { action: 'add', target: 'reputation', value: 5 },
        { action: 'message', text: '🏬 Second location open! Empire expanding! 📈', type: 'success' }
      ],
      category: 'retail'
    },
    {
      id: 'upgrade-r6',
      name: 'Flagship Store 👑',
      description: 'Ultimate retail! +$200/sec, +20 reputation',
      icon: '👑',
      priceTag: '$500000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showRetail' },
        { op: 'flag', flag: 'upgrade_r5' },
        { op: 'gte', left: { ref: 'reputation' }, right: 70 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_r6' } }
      ]},
      costs: [{ resource: 'cash', amount: 500000 }],
      effects: [
        { action: 'set', target: 'upgrade_r6', value: true },
        { action: 'add', target: 'storeIncome', value: 200 },
        { action: 'add', target: 'storeCount', value: 1 },
        { action: 'add', target: 'reputation', value: 20 },
        { action: 'add', target: 'pressFeatures', value: 3 },
        { action: 'message', text: '👑 FLAGSHIP STORE OPEN! Fashion destination status! 🏰✨', type: 'success' }
      ],
      category: 'retail'
    },

    // ═══════════════════════════════════════════════════════════════
    // 👥 TEAM UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-t1',
      name: 'Part-time Helper 🙋',
      description: 'Extra hands! +$8/sec',
      icon: '🙋',
      priceTag: '$3000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTeam' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_t1' } }
      ]},
      costs: [{ resource: 'cash', amount: 3000 }],
      effects: [
        { action: 'set', target: 'upgrade_t1', value: true },
        { action: 'add', target: 'passiveIncome', value: 8 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '🙋 First hire! Building the dream team! 💪', type: 'success' }
      ],
      category: 'team'
    },
    {
      id: 'upgrade-t2',
      name: 'Stylist 💅',
      description: 'Fashion expert! +20% prices, +5 style cred',
      icon: '💅',
      priceTag: '$8000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTeam' },
        { op: 'flag', flag: 'upgrade_t1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_t2' } }
      ]},
      costs: [{ resource: 'cash', amount: 8000 }],
      effects: [
        { action: 'set', target: 'upgrade_t2', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.2 },
        { action: 'add', target: 'styleCred', value: 5 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '💅 Stylist hired! Outfits are serving LOOKS! 👗✨', type: 'success' }
      ],
      category: 'team'
    },
    {
      id: 'upgrade-t3',
      name: 'Store Manager 📋',
      description: 'Run operations! +$25/sec, +30% auto-sell',
      icon: '📋',
      priceTag: '$15000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTeam' },
        { op: 'flag', flag: 'upgrade_r4' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_t3' } }
      ]},
      costs: [{ resource: 'cash', amount: 15000 }],
      effects: [
        { action: 'set', target: 'upgrade_t3', value: true },
        { action: 'add', target: 'passiveIncome', value: 25 },
        { action: 'add', target: 'autoSellChance', value: 0.3 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '📋 Store manager on board! Business runs itself! 🏃‍♀️', type: 'success' }
      ],
      category: 'team'
    },
    {
      id: 'upgrade-t4',
      name: 'Social Media Manager 📱',
      description: 'Content queen! +20 followers/sec, +2 subscribers/sec',
      icon: '📱',
      priceTag: '$12000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTeam' },
        { op: 'flag', flag: 'upgrade_m2' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_t4' } }
      ]},
      costs: [{ resource: 'cash', amount: 12000 }],
      effects: [
        { action: 'set', target: 'upgrade_t4', value: true },
        { action: 'add', target: 'followerGrowth', value: 20 },
        { action: 'add', target: 'subscriberGrowth', value: 2 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '📱 Social media manager slaying! Content is CONSTANT! 🔥', type: 'success' }
      ],
      category: 'team'
    },
    {
      id: 'upgrade-t5',
      name: 'Creative Director 🎨',
      description: 'Vision leader! +15 reputation, +30% prices',
      icon: '🎨',
      priceTag: '$75000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showTeam' },
        { op: 'flag', flag: 'upgrade_t2' },
        { op: 'gte', left: { ref: 'reputation' }, right: 50 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_t5' } }
      ]},
      costs: [{ resource: 'cash', amount: 75000 }],
      effects: [
        { action: 'set', target: 'upgrade_t5', value: true },
        { action: 'add', target: 'reputation', value: 15 },
        { action: 'add', target: 'priceMultiplier', value: 0.3 },
        { action: 'add', target: 'employeeCount', value: 1 },
        { action: 'message', text: '🎨 Creative Director hired! Brand vision is ICONIC! 👑', type: 'success' }
      ],
      category: 'team'
    },

    // ═══════════════════════════════════════════════════════════════
    // 💻 TECH UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-tech1',
      name: 'POS System 💳',
      description: 'Track everything! +10% prices',
      icon: '💳',
      priceTag: '$500',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_r1' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_tech1' } }
      ]},
      costs: [{ resource: 'cash', amount: 500 }],
      effects: [
        { action: 'set', target: 'upgrade_tech1', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.1 },
        { action: 'message', text: '💳 POS system installed! Data is power! 📊', type: 'success' }
      ],
      category: 'tech'
    },
    {
      id: 'upgrade-tech2',
      name: 'E-commerce Website 🌐',
      description: 'Direct sales! +$15/sec, +10 listings',
      icon: '🌐',
      priceTag: '$5000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showOnline' },
        { op: 'flag', flag: 'upgrade_r3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_tech2' } }
      ]},
      costs: [{ resource: 'cash', amount: 5000 }],
      effects: [
        { action: 'set', target: 'upgrade_tech2', value: true },
        { action: 'add', target: 'passiveIncome', value: 15 },
        { action: 'add', target: 'listingsCapacity', value: 10 },
        { action: 'message', text: '🌐 Website live! No middleman, no fees! 💰', type: 'success' }
      ],
      category: 'tech'
    },
    {
      id: 'upgrade-tech3',
      name: 'AI Pricing Tool 🤖',
      description: 'Smart pricing! +25% prices',
      icon: '🤖',
      priceTag: '$10000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_tech1' },
        { op: 'gte', left: { ref: 'itemsSold' }, right: 100 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_tech3' } }
      ]},
      costs: [{ resource: 'cash', amount: 10000 }],
      effects: [
        { action: 'set', target: 'upgrade_tech3', value: true },
        { action: 'add', target: 'priceMultiplier', value: 0.25 },
        { action: 'message', text: '🤖 AI pricing activated! Maximum profit mode! 📈', type: 'success' }
      ],
      category: 'tech'
    },
    {
      id: 'upgrade-tech4',
      name: 'CRM Software 💝',
      description: 'Customer love! +15% auto-sell, +5 reputation',
      icon: '💝',
      priceTag: '$8000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showOnline' },
        { op: 'flag', flag: 'upgrade_m3' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_tech4' } }
      ]},
      costs: [{ resource: 'cash', amount: 8000 }],
      effects: [
        { action: 'set', target: 'upgrade_tech4', value: true },
        { action: 'add', target: 'autoSellChance', value: 0.15 },
        { action: 'add', target: 'reputation', value: 5 },
        { action: 'message', text: '💝 CRM installed! Customers feel SO special! 🥰', type: 'success' }
      ],
      category: 'tech'
    },

    // ═══════════════════════════════════════════════════════════════
    // 👑 EMPIRE UPGRADES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'upgrade-e1',
      name: 'Fashion Line Launch 👗',
      description: 'Your own designs! +$100/sec, +500 EcoScore',
      icon: '👗',
      priceTag: '$150000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_t5' },
        { op: 'gte', left: { ref: 'reputation' }, right: 60 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_e1' } }
      ]},
      costs: [{ resource: 'cash', amount: 150000 }],
      effects: [
        { action: 'set', target: 'upgrade_e1', value: true },
        { action: 'add', target: 'passiveIncome', value: 100 },
        { action: 'add', target: 'ecoScore', value: 500 },
        { action: 'add', target: 'reputation', value: 15 },
        { action: 'add', target: 'pressFeatures', value: 3 },
        { action: 'message', text: '👗 FASHION LINE LAUNCHED! Your name on the label! 🏷️👑', type: 'success' }
      ],
      category: 'empire'
    },
    {
      id: 'upgrade-e2',
      name: 'Documentary Deal 🎬',
      description: 'Tell your story! +100K followers, +20 reputation',
      icon: '🎬',
      priceTag: '$250000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_e1' },
        { op: 'gte', left: { ref: 'pressFeatures' }, right: 5 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_e2' } }
      ]},
      costs: [{ resource: 'cash', amount: 250000 }],
      effects: [
        { action: 'set', target: 'upgrade_e2', value: true },
        { action: 'add', target: 'followers', value: 100000 },
        { action: 'add', target: 'reputation', value: 20 },
        { action: 'add', target: 'viralMoments', value: 3 },
        { action: 'message', text: '🎬 DOCUMENTARY IN PRODUCTION! Your story inspires millions! 🌟', type: 'success' }
      ],
      category: 'empire'
    },
    {
      id: 'upgrade-e3',
      name: 'Vogue Feature 📸',
      description: 'Fashion bible! +25 reputation, +1000 EcoScore',
      icon: '📸',
      priceTag: '$300000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_m5' },
        { op: 'gte', left: { ref: 'reputation' }, right: 75 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_e3' } }
      ]},
      costs: [{ resource: 'cash', amount: 300000 }],
      effects: [
        { action: 'set', target: 'upgrade_e3', value: true },
        { action: 'add', target: 'reputation', value: 25 },
        { action: 'add', target: 'ecoScore', value: 1000 },
        { action: 'add', target: 'fastFashionDamage', value: 2000 },
        { action: 'add', target: 'pressFeatures', value: 10 },
        { action: 'message', text: '📸 VOGUE FEATURE! You\'ve officially made it in fashion! 👑💎', type: 'success' }
      ],
      category: 'empire'
    },
    {
      id: 'upgrade-e4',
      name: 'Global Brand Status 🌍',
      description: 'Ultimate achievement! +$500/sec, +50 reputation',
      icon: '🌍',
      priceTag: '$1000000',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'showUpgrades' },
        { op: 'flag', flag: 'upgrade_e3' },
        { op: 'flag', flag: 'upgrade_r6' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_e4' } }
      ]},
      costs: [{ resource: 'cash', amount: 1000000 }],
      effects: [
        { action: 'set', target: 'upgrade_e4', value: true },
        { action: 'add', target: 'passiveIncome', value: 500 },
        { action: 'add', target: 'reputation', value: 50 },
        { action: 'add', target: 'fastFashionDamage', value: 5000 },
        { action: 'message', text: '🌍👑 GLOBAL BRAND STATUS ACHIEVED! You changed fashion FOREVER! 💚🎉', type: 'success' }
      ],
      category: 'empire'
    },

    // ═══════════════════════════════════════════════════════════════
    // 💳 DEBT PAYMENT
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'pay-debt',
      name: 'Pay Debt ($100) 💳',
      description: 'Reduce your debt',
      icon: '💳',
      priceTag: '$100',
      trigger: { op: 'gt', left: { ref: 'debt' }, right: 0 },
      costs: [{ resource: 'cash', amount: 100 }],
      repeatable: true,
      effects: [
        { action: 'add', target: 'debt', value: -100 },
        { action: 'message', text: '💳 Paid $100 toward debt!', type: 'info' },
        {
          action: 'if',
          condition: { op: 'lte', left: { ref: 'debt' }, right: 0 },
          then: [
            { action: 'set', target: 'debt', value: 0 },
            { action: 'message', text: '🎉 DEBT FREE! Financial freedom achieved! 💚', type: 'success' }
          ]
        }
      ]
    }
  ],

  functions: {
    // ═══════════════════════════════════════════════════════════════
    // 🎮 STARTER PATH SELECTION
    // ═══════════════════════════════════════════════════════════════
    chooseThrifter: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'thrifter' },
      { action: 'set', target: 'cash', value: 100 },
      { action: 'set', target: 'debt', value: 0 },
      { action: 'set', target: 'followers', value: 50 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'thrifter' } },
      { action: 'message', text: '🛍️ THRIFT WARRIOR! Starting lean with $100. Zero debt, pure hustle! 💪', type: 'success' }
    ],
    chooseInfluencer: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'influencer' },
      { action: 'set', target: 'cash', value: 200 },
      { action: 'set', target: 'debt', value: 0 },
      { action: 'set', target: 'followers', value: 500 },
      { action: 'set', target: 'followerGrowth', value: 0.5 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'influencer' } },
      { action: 'message', text: '📱 MICRO-INFLUENCER! 500 followers ready to shop! Social queen! 👑', type: 'success' }
    ],
    chooseInvestor: [
      { action: 'set', target: 'hasChosenStarter', value: true },
      { action: 'set', target: 'starterPath', value: 'investor' },
      { action: 'set', target: 'cash', value: 500 },
      { action: 'set', target: 'debt', value: 400 },
      { action: 'set', target: 'followers', value: 100 },
      { action: 'set', target: 'inventoryCapacity', value: 30 },
      { action: 'emit', event: 'starter-chosen', data: { path: 'investor' } },
      { action: 'message', text: '💰 INVESTOR BACKED! $500 cash but $400 debt. Go big or go home! 🚀', type: 'success' }
    ],

    // ═══════════════════════════════════════════════════════════════
    // 💵 FINANCIAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════
    takeLoan: [
      {
        action: 'if',
        condition: { op: 'lt', left: { ref: 'debt' }, right: 5000 },
        then: [
          { action: 'add', target: 'cash', value: 200 },
          { action: 'add', target: 'debt', value: 240 },
          { action: 'message', text: '💳 Borrowed $200 (20% fee = $240 owed). Invest wisely! 📈', type: 'warning' }
        ],
        else: [
          { action: 'message', text: '❌ Too much debt! Pay some off first, queen! 💅', type: 'error' }
        ]
      }
    ],

    // ═══════════════════════════════════════════════════════════════
    // 📊 TRACKING FUNCTIONS (called from React)
    // ═══════════════════════════════════════════════════════════════
    recordSource: [
      { action: 'add', target: 'itemsSourced', value: 1 },
      { action: 'add', target: 'clothesSaved', value: 1 },
      { action: 'add', target: 'ecoScore', value: 1 }
    ],
    recordSale: [
      { action: 'add', target: 'itemsSold', value: 1 },
      { action: 'add', target: 'fastFashionDamage', value: 1 }
    ],
    recordListing: [
      { action: 'add', target: 'listingsCount', value: 1 }
    ],
    removeListing: [
      { action: 'add', target: 'listingsCount', value: -1 }
    ]
  },

  ui: {
    sections: [
      {
        id: 'wallet',
        name: '💵 Wallet',
        icon: '💵',
        bindings: [
          { elementId: 'cash', type: 'display', value: { ref: 'cash' }, format: 'currency' },
          { elementId: 'debt', type: 'display', value: { ref: 'debt' }, format: 'currency', visible: { op: 'gt', left: { ref: 'debt' }, right: 0 }, prefix: 'Debt: ' }
        ]
      },
      {
        id: 'brand',
        name: '⭐ Brand',
        icon: '⭐',
        bindings: [
          { elementId: 'reputation', type: 'display', value: { ref: 'reputation' }, prefix: 'Rep: ', suffix: '/100' },
          { elementId: 'ecoScore', type: 'display', value: { ref: 'ecoScore' }, prefix: '💚 Eco: ' },
          { elementId: 'styleCred', type: 'display', value: { ref: 'styleCred' }, prefix: '🎨 Style: ' }
        ]
      },
      {
        id: 'social',
        name: '📱 Social',
        icon: '📱',
        bindings: [
          { elementId: 'followers', type: 'display', value: { ref: 'followers' }, format: 'compact', prefix: '👥 ' },
          { elementId: 'subscribers', type: 'display', value: { ref: 'subscribers' }, format: 'compact', prefix: '📧 ' }
        ]
      },
      {
        id: 'event',
        name: '🔥 Trend',
        visible: { op: 'neq', left: { ref: 'activeEventId' }, right: '' },
        bindings: [
          { elementId: 'eventName', type: 'display', value: { ref: 'eventName' } }
        ]
      }
    ]
  }
};

export default thriftQueenGame;
