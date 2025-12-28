import type { PackType } from '../types';

export const PACK_TYPES: PackType[] = [
  {
    id: 'standard',
    name: 'Standard Pack',
    price: 50,
    cardCount: 5,
    img: '📦',
    color: '#4a90d9',
    pullRates: {
      common: 0.60,
      uncommon: 0.25,
      rare: 0.10,
      'ultra-rare': 0.04,
      'secret-rare': 0.008,
      legendary: 0.001,
      chase: 0.001
    },
    description: '5 cards, standard pull rates',
    lesson: "EXPECTED VALUE: This pack costs $50. Calculate EV by multiplying each outcome's value by its probability. If EV < $50, the house always wins long-term."
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 150,
    cardCount: 5,
    img: '💎',
    color: '#9c27b0',
    pullRates: {
      common: 0.30,
      uncommon: 0.35,
      rare: 0.20,
      'ultra-rare': 0.10,
      'secret-rare': 0.035,
      legendary: 0.01,
      chase: 0.005
    },
    guaranteedRare: true,
    description: '5 cards, 1 guaranteed rare+',
    lesson: "RISK PREMIUM: You pay more for better odds. But is 3x the price worth 2.5x the rare chance? Smart collectors calculate this."
  },
  {
    id: 'elite',
    name: 'Elite Trainer Box',
    price: 500,
    cardCount: 12,
    img: '👑',
    color: '#ffd700',
    pullRates: {
      common: 0.20,
      uncommon: 0.30,
      rare: 0.25,
      'ultra-rare': 0.15,
      'secret-rare': 0.06,
      legendary: 0.025,
      chase: 0.015
    },
    guaranteedUltraRare: true,
    description: '12 cards, 1 guaranteed ultra-rare+',
    lesson: "WHALE ECONOMICS: Premium products target high-spenders. The 'chase' feeling is engineered. Casinos use the same psychology."
  }
];
