import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: "First Flip",
    condition: (s) => s.totalSold >= 1,
    reward: 50,
    description: "Sell your first card"
  },
  {
    id: 2,
    name: "Hoarder",
    condition: (s) => s.collection.length >= 10,
    reward: 200,
    description: "Own 10 cards"
  },
  {
    id: 3,
    name: "Thousandaire",
    condition: (s) => s.money >= 1000,
    reward: 500,
    description: "Reach $1,000"
  },
  {
    id: 4,
    name: "Rare Hunter",
    condition: (s) => s.collection.some(c => c.rarity === 'rare'),
    reward: 300,
    description: "Own a rare card"
  },
  {
    id: 5,
    name: "Diamond Hands",
    condition: (s) => s.longestHold >= 120,
    reward: 1000,
    description: "Hold a card for 2 minutes"
  },
  {
    id: 6,
    name: "Profit Master",
    condition: (s) => s.totalProfit >= 5000,
    reward: 2000,
    description: "Make $5,000 in profit"
  },
  {
    id: 7,
    name: "Legendary Collector",
    condition: (s) => s.collection.some(c => c.rarity === 'legendary'),
    reward: 10000,
    description: "Own a legendary card"
  },
  {
    id: 8,
    name: "Pack Rat",
    condition: (s) => s.packsOpened >= 10,
    reward: 500,
    description: "Open 10 packs"
  },
  {
    id: 9,
    name: "Secret Hunter",
    condition: (s) => s.collection.some(c => c.rarity === 'secret-rare'),
    reward: 3000,
    description: "Pull a secret rare"
  },
  {
    id: 10,
    name: "Chase Dream",
    condition: (s) => s.collection.some(c => c.rarity === 'chase'),
    reward: 25000,
    description: "Pull a chase card"
  },
];
