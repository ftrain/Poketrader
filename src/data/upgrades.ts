import type { Upgrade, UpgradeCategory } from '../types';

// Category metadata for UI
export const UPGRADE_CATEGORIES: Record<UpgradeCategory, { name: string; icon: string; color: string }> = {
  basics: { name: 'Getting Started', icon: '📚', color: '#4a90d9' },
  grading: { name: 'Grading & Authentication', icon: '🔍', color: '#9c27b0' },
  retail: { name: 'Retail Empire', icon: '🏪', color: '#4caf50' },
  media: { name: 'Media & Influence', icon: '📺', color: '#ff5722' },
  events: { name: 'Events & Conventions', icon: '🎪', color: '#ffc107' },
  wholesale: { name: 'Wholesale & Distribution', icon: '📦', color: '#795548' },
  empire: { name: 'Card Empire', icon: '👑', color: '#e91e63' }
};

export const UPGRADES: Upgrade[] = [
  // ═══════════════════════════════════════════════════════════════
  // BASICS - Getting Started (Tier 1: $50 - $500)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    name: "Price Guide Subscription",
    cost: 50,
    effect: "clickPower",
    value: 2,
    description: "2x appraisal earnings - know what cards are worth",
    lesson: "INFORMATION ADVANTAGE: In any market, those with better information make better decisions. A $50 price guide can save you from $500 mistakes.",
    category: 'basics',
    icon: '📖'
  },
  {
    id: 2,
    name: "Card Sleeves & Toploaders",
    cost: 75,
    effect: "sellBonus",
    value: 1.05,
    description: "+5% sell value - protected cards sell higher",
    lesson: "CONDITION MATTERS: A $100 card in poor condition might only fetch $20. Protection costs pennies but preserves dollars.",
    category: 'basics',
    icon: '🛡️'
  },
  {
    id: 3,
    name: "Folding Table Setup",
    cost: 150,
    effect: "capacity",
    value: 10,
    description: "+10 collection slots - basic display space",
    lesson: "INVENTORY COSTS: Every card you hold costs something - storage, insurance, opportunity cost. Start small.",
    category: 'basics',
    icon: '🪑'
  },
  {
    id: 4,
    name: "Local Card Shop Connection",
    cost: 250,
    effect: "discount",
    value: 0.95,
    description: "5% discount on purchases - shop owner knows you",
    lesson: "RELATIONSHIP VALUE: Regular customers get better deals. Loyalty creates mutual benefit.",
    category: 'basics',
    icon: '🤝'
  },
  {
    id: 5,
    name: "Social Media Presence",
    cost: 400,
    effect: "passive",
    value: 2,
    description: "Earn $2/sec - small following finds you deals",
    lesson: "NETWORK EFFECTS: Your network is your net worth. Each connection multiplies opportunities.",
    category: 'basics',
    icon: '📱'
  },

  // ═══════════════════════════════════════════════════════════════
  // GRADING - Authentication & Value-Add (Tier 2: $500 - $5,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 10,
    name: "PSA Membership",
    cost: 500,
    effect: "sellBonus",
    value: 1.10,
    description: "+10% sell value - graded cards command premiums",
    lesson: "THIRD-PARTY VERIFICATION: Trust is expensive. Paying for authentication creates value by reducing buyer uncertainty.",
    category: 'grading',
    icon: '🏅',
    requires: [2]
  },
  {
    id: 11,
    name: "Grading Loupe & UV Light",
    cost: 800,
    effect: "clickPower",
    value: 1.5,
    description: "1.5x appraisal - spot fakes and flaws",
    lesson: "DUE DILIGENCE: The tools of the trade pay for themselves by avoiding costly mistakes.",
    category: 'grading',
    icon: '🔬',
    requires: [1]
  },
  {
    id: 12,
    name: "Bulk Grading Account",
    cost: 1500,
    effect: "discount",
    value: 0.90,
    description: "10% discount - volume grading rates",
    lesson: "ECONOMIES OF SCALE: Higher volume means lower per-unit costs. This is why big players have advantages.",
    category: 'grading',
    icon: '📋',
    requires: [10]
  },
  {
    id: 13,
    name: "CGC Crossover Service",
    cost: 2500,
    effect: "sellBonus",
    value: 1.15,
    description: "+15% sell value - multiple grading options",
    lesson: "ARBITRAGE OPPORTUNITY: Different grading companies have different standards. Knowing which to use when creates value.",
    category: 'grading',
    icon: '🔄',
    requires: [10]
  },
  {
    id: 14,
    name: "Grading Expert Reputation",
    cost: 5000,
    effect: "critChance",
    value: 0.05,
    description: "+5% critical hit chance - eye for hidden gems",
    lesson: "EXPERTISE PREMIUM: Years of experience let you spot value others miss. Expertise compounds over time.",
    category: 'grading',
    icon: '👁️',
    requires: [11, 13]
  },

  // ═══════════════════════════════════════════════════════════════
  // RETAIL - Store & Sales (Tier 2-3: $1,000 - $25,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 20,
    name: "eBay Store",
    cost: 1000,
    effect: "passive",
    value: 5,
    description: "Earn $5/sec - 24/7 online sales",
    lesson: "E-COMMERCE: Online stores never close. Your inventory works while you sleep.",
    category: 'retail',
    icon: '🛒'
  },
  {
    id: 21,
    name: "TCGPlayer Seller Account",
    cost: 2000,
    effect: "marketSize",
    value: 4,
    description: "+4 cards in market - more buying opportunities",
    lesson: "MARKETPLACE ACCESS: More platforms = more liquidity. Being everywhere buyers are is crucial.",
    category: 'retail',
    icon: '🌐',
    requires: [20]
  },
  {
    id: 22,
    name: "Mall Kiosk Lease",
    cost: 5000,
    effect: "passive",
    value: 15,
    description: "Earn $15/sec - foot traffic brings customers",
    lesson: "LOCATION VALUE: Rent is the price of access to customers. High traffic = high opportunity.",
    category: 'retail',
    icon: '🏬',
    requires: [3]
  },
  {
    id: 23,
    name: "Card Shop Storefront",
    cost: 15000,
    effect: "passive",
    value: 40,
    description: "Earn $40/sec - your own dedicated shop",
    lesson: "FIXED COSTS: A storefront has high fixed costs but unlimited upside. Volume is key to profitability.",
    category: 'retail',
    icon: '🏪',
    requires: [22]
  },
  {
    id: 24,
    name: "Point of Sale System",
    cost: 8000,
    effect: "sellBonus",
    value: 1.10,
    description: "+10% sell value - professional checkout experience",
    lesson: "CUSTOMER EXPERIENCE: Presentation matters. A professional experience justifies premium prices.",
    category: 'retail',
    icon: '💳',
    requires: [22]
  },
  {
    id: 25,
    name: "VIP Customer Program",
    cost: 12000,
    effect: "sellBonus",
    value: 1.20,
    description: "+20% sell bonus from loyal customers",
    lesson: "CUSTOMER LIFETIME VALUE: Repeat customers are 5x cheaper to serve than new ones. Reward loyalty.",
    category: 'retail',
    icon: '⭐',
    requires: [23, 24]
  },

  // ═══════════════════════════════════════════════════════════════
  // MEDIA - Streaming & Influence (Tier 2-3: $2,000 - $50,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 30,
    name: "YouTube Channel",
    cost: 2000,
    effect: "passive",
    value: 8,
    description: "Earn $8/sec - pack opening content",
    lesson: "CONTENT CREATION: Turn your hobby into content. Every pack opening is potential revenue.",
    category: 'media',
    icon: '🎬',
    requires: [5]
  },
  {
    id: 31,
    name: "Twitch Partnership",
    cost: 5000,
    effect: "passive",
    value: 12,
    description: "Earn $12/sec - live streaming revenue",
    lesson: "AUDIENCE BUILDING: Live interaction builds community. Community builds sustainable income.",
    category: 'media',
    icon: '📡',
    requires: [30]
  },
  {
    id: 32,
    name: "Sponsor a Pack Opener",
    cost: 10000,
    effect: "clickPower",
    value: 2,
    description: "2x click earnings - their audience sees your brand",
    lesson: "INFLUENCER MARKETING: Paying others to promote you can have higher ROI than self-promotion.",
    category: 'media',
    icon: '🤳',
    requires: [30]
  },
  {
    id: 33,
    name: "Podcast Guest Spots",
    cost: 8000,
    effect: "discount",
    value: 0.92,
    description: "8% discount - industry connections get you deals",
    lesson: "THOUGHT LEADERSHIP: Being known as an expert opens doors that money alone cannot.",
    category: 'media',
    icon: '🎙️',
    requires: [31]
  },
  {
    id: 34,
    name: "Viral Unboxing Fame",
    cost: 25000,
    effect: "critChance",
    value: 0.08,
    description: "+8% critical hit chance - luck favors the famous",
    lesson: "VIRAL MARKETING: One viral moment can be worth more than years of steady growth. But it's unpredictable.",
    category: 'media',
    icon: '🔥',
    requires: [31, 32]
  },
  {
    id: 35,
    name: "Card Kingdom Documentary",
    cost: 50000,
    effect: "passive",
    value: 100,
    description: "Earn $100/sec - you're famous in the hobby",
    lesson: "BRAND EQUITY: At the highest level, you're not selling cards - you're selling your name.",
    category: 'media',
    icon: '🎥',
    requires: [34]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENTS - Conventions & Shows (Tier 2-3: $3,000 - $75,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 40,
    name: "Local Tournament Judge",
    cost: 3000,
    effect: "marketSize",
    value: 2,
    description: "+2 cards in market - players sell to you",
    lesson: "COMMUNITY INVOLVEMENT: Being part of the community gives you first access to deals.",
    category: 'events',
    icon: '⚖️'
  },
  {
    id: 41,
    name: "Regional Expo Booth",
    cost: 8000,
    effect: "capacity",
    value: 25,
    description: "+25 collection slots - big display at events",
    lesson: "EVENT ECONOMICS: Expos are expensive but put you in front of thousands of motivated buyers.",
    category: 'events',
    icon: '🎪',
    requires: [3]
  },
  {
    id: 42,
    name: "National Championship Presence",
    cost: 20000,
    effect: "sellBonus",
    value: 1.20,
    description: "+20% sell value - prestige location premium",
    lesson: "PRESTIGE PRICING: Being at top-tier events signals quality. People pay more for the experience.",
    category: 'events',
    icon: '🏆',
    requires: [41]
  },
  {
    id: 43,
    name: "Comic-Con Mega Booth",
    cost: 40000,
    effect: "passive",
    value: 60,
    description: "Earn $60/sec - pop culture crossover audience",
    lesson: "MARKET EXPANSION: The card hobby overlaps with larger geek culture. Expand your addressable market.",
    category: 'events',
    icon: '🦸',
    requires: [42]
  },
  {
    id: 44,
    name: "Host Your Own Expo",
    cost: 75000,
    effect: "passive",
    value: 150,
    description: "Earn $150/sec - you ARE the event",
    lesson: "PLATFORM OWNERSHIP: The real money is in owning the platform, not just participating in it.",
    category: 'events',
    icon: '🎭',
    requires: [43]
  },
  {
    id: 45,
    name: "Event Coordinator",
    cost: 15000,
    effect: "passive",
    value: 15,
    description: "+$15/sec from event booth fees",
    lesson: "TIMING THE MARKET: Being at the right events at the right time multiplies your opportunities.",
    category: 'events',
    icon: '⏱️',
    requires: [41]
  },

  // ═══════════════════════════════════════════════════════════════
  // WHOLESALE - Bulk & Distribution (Tier 3-4: $10,000 - $150,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 50,
    name: "Distributor Relationship",
    cost: 10000,
    effect: "packDiscount",
    value: 0.85,
    description: "15% off packs - buy direct from source",
    lesson: "CUTTING OUT MIDDLEMEN: Every layer in the supply chain takes margin. Go direct when possible.",
    category: 'wholesale',
    icon: '🚚'
  },
  {
    id: 51,
    name: "Warehouse Space",
    cost: 25000,
    effect: "capacity",
    value: 100,
    description: "+100 collection slots - serious storage",
    lesson: "CAPITAL INVESTMENT: Large inventory requires large storage. This is a barrier to entry for competitors.",
    category: 'wholesale',
    icon: '🏭',
    requires: [3, 23]
  },
  {
    id: 52,
    name: "Bulk Lot Specialist",
    cost: 30000,
    effect: "discount",
    value: 0.80,
    description: "20% discount on all purchases",
    lesson: "BUYING POWER: When you can buy entire collections, you get massive discounts on individual cards.",
    category: 'wholesale',
    icon: '📦',
    requires: [50, 51]
  },
  {
    id: 53,
    name: "Case Break Operator",
    cost: 50000,
    effect: "packDiscount",
    value: 0.85,
    description: "15% off packs from case volume pricing",
    lesson: "VOLUME SMOOTHING: Buy enough volume and variance decreases. Case pricing beats retail every time.",
    category: 'wholesale',
    icon: '🎲',
    requires: [50]
  },
  {
    id: 54,
    name: "International Import License",
    cost: 75000,
    effect: "marketSize",
    value: 8,
    description: "+8 cards in market - Japanese exclusives access",
    lesson: "GLOBAL ARBITRAGE: Different markets price things differently. International access = arbitrage opportunities.",
    category: 'wholesale',
    icon: '🌏',
    requires: [52]
  },
  {
    id: 55,
    name: "Vintage Vault Connection",
    cost: 100000,
    effect: "sellBonus",
    value: 1.30,
    description: "+30% sell value - access to high-end buyers",
    lesson: "HIGH-NET-WORTH MARKET: The top end of the market operates differently. Access is everything.",
    category: 'wholesale',
    icon: '🏛️',
    requires: [52, 14]
  },

  // ═══════════════════════════════════════════════════════════════
  // EMPIRE - End Game (Tier 5: $100,000 - $1,000,000)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 60,
    name: "Card Empire HQ",
    cost: 150000,
    effect: "passive",
    value: 250,
    description: "Earn $250/sec - your business runs itself",
    lesson: "SYSTEMS THINKING: At scale, you don't do the work - you build systems that do the work.",
    category: 'empire',
    icon: '🏰',
    requires: [23, 51]
  },
  {
    id: 61,
    name: "Franchise Network",
    cost: 300000,
    effect: "passive",
    value: 500,
    description: "Earn $500/sec - others run your brand",
    lesson: "FRANCHISING: Sell the right to use your systems. Scale without proportional effort.",
    category: 'empire',
    icon: '🌐',
    requires: [60]
  },
  {
    id: 62,
    name: "Authentication Company",
    cost: 500000,
    effect: "sellBonus",
    value: 1.50,
    description: "+50% sell value - YOU set the standards",
    lesson: "BECOMING THE AUTHORITY: Don't compete in the market - become the market infrastructure.",
    category: 'empire',
    icon: '🔐',
    requires: [14, 55]
  },
  {
    id: 63,
    name: "Card Investment Fund",
    cost: 750000,
    effect: "passive",
    value: 1000,
    description: "Earn $1000/sec - manage other people's money",
    lesson: "ASSET MANAGEMENT: At the highest level, you don't trade your money - you trade others' and take a cut.",
    category: 'empire',
    icon: '💼',
    requires: [61, 55]
  },
  {
    id: 64,
    name: "Pokemon Company Partnership",
    cost: 1000000,
    effect: "critChance",
    value: 0.15,
    description: "+15% crit chance - you ARE the hobby",
    lesson: "VERTICAL INTEGRATION: When you partner with the source, you've reached the top of the food chain.",
    category: 'empire',
    icon: '👑',
    requires: [62, 63]
  }
];

// Helper to check if upgrade requirements are met
export function canPurchaseUpgrade(upgradeId: number, ownedUpgrades: number[]): boolean {
  const upgrade = UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return false;
  if (upgrade.requires) {
    return upgrade.requires.every(reqId => ownedUpgrades.includes(reqId));
  }
  return true;
}

// Get upgrades by category
export function getUpgradesByCategory(category: UpgradeCategory): Upgrade[] {
  return UPGRADES.filter(u => u.category === category);
}
