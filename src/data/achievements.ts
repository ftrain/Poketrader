import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: "First Flip",
    condition: (s) => s.totalSold >= 1,
    effect: 'capacity',
    value: 2,
    description: "Sell your first card",
    benefit: "+2 card storage slots"
  },
  {
    id: 2,
    name: "Hoarder",
    condition: (s) => s.collection.length >= 10,
    effect: 'capacity',
    value: 5,
    description: "Own 10 cards at once",
    benefit: "+5 card storage slots"
  },
  {
    id: 3,
    name: "Thousandaire",
    condition: (s) => s.money >= 1000,
    effect: 'discount',
    value: 0.95,
    description: "Reach $1,000 balance",
    benefit: "5% discount on purchases"
  },
  {
    id: 4,
    name: "Rare Hunter",
    condition: (s) => s.collection.some(c => c.rarity === 'rare'),
    effect: 'priceInsight',
    value: 1,
    description: "Own a rare card",
    benefit: "See price volatility indicator"
  },
  {
    id: 5,
    name: "Diamond Hands",
    condition: (s) => s.longestHold >= 120,
    effect: 'sellBonus',
    value: 1.05,
    description: "Hold a card for 2 minutes",
    benefit: "+5% sell bonus"
  },
  {
    id: 6,
    name: "Profit Master",
    condition: (s) => s.totalProfit >= 5000,
    effect: 'discount',
    value: 0.90,
    description: "Make $5,000 in total profit",
    benefit: "10% discount on purchases"
  },
  {
    id: 7,
    name: "Legendary Collector",
    condition: (s) => s.collection.some(c => c.rarity === 'legendary'),
    effect: 'capacity',
    value: 10,
    description: "Own a legendary card",
    benefit: "+10 card storage slots"
  },
  {
    id: 8,
    name: "Pack Rat",
    condition: (s) => s.packsOpened >= 10,
    effect: 'capacity',
    value: 3,
    description: "Open 10 packs",
    benefit: "+3 card storage slots"
  },
  {
    id: 9,
    name: "Secret Hunter",
    condition: (s) => s.collection.some(c => c.rarity === 'secret-rare'),
    effect: 'sellBonus',
    value: 1.10,
    description: "Pull a secret rare from a pack",
    benefit: "+10% sell bonus"
  },
  {
    id: 10,
    name: "Chase Dream",
    condition: (s) => s.collection.some(c => c.rarity === 'chase'),
    effect: 'capacity',
    value: 20,
    description: "Pull a chase card from a pack",
    benefit: "+20 card storage slots"
  },
  {
    id: 11,
    name: "Speed Trader",
    condition: (s) => s.totalSold >= 25,
    effect: 'marketSpeed',
    value: 1,
    description: "Sell 25 cards total",
    benefit: "Faster market refresh"
  },
  {
    id: 12,
    name: "Click Master",
    condition: (s) => s.money >= 500,
    effect: 'clickPower',
    value: 2,
    description: "Reach $500 from clicking",
    benefit: "2x click power"
  },
];
