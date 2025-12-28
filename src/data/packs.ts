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
      common: 0.82,
      uncommon: 0.12,
      rare: 0.045,
      'ultra-rare': 0.012,
      'secret-rare': 0.002,
      legendary: 0.0007,
      chase: 0.0003
    },
    description: '5 cards, standard pull rates',
    lesson: "EXPECTED VALUE: This pack costs $50 but averages ~$35 in value. The house always wins long-term. That's how gambling businesses profit."
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 150,
    cardCount: 5,
    img: '💎',
    color: '#9c27b0',
    pullRates: {
      common: 0.70,
      uncommon: 0.18,
      rare: 0.08,
      'ultra-rare': 0.025,
      'secret-rare': 0.01,
      legendary: 0.003,
      chase: 0.002
    },
    guaranteedRare: true,
    description: '5 cards, 1 guaranteed rare+',
    lesson: "RISK PREMIUM: You pay 3x more for ~2x better odds. The 'premium' feeling makes you forget you're still losing on average."
  },
  {
    id: 'elite',
    name: 'Elite Trainer Box',
    price: 500,
    cardCount: 12,
    img: '👑',
    color: '#ffd700',
    pullRates: {
      common: 0.55,
      uncommon: 0.25,
      rare: 0.12,
      'ultra-rare': 0.05,
      'secret-rare': 0.02,
      legendary: 0.006,
      chase: 0.004
    },
    guaranteedUltraRare: true,
    description: '12 cards, 1 guaranteed ultra-rare+',
    lesson: "WHALE ECONOMICS: Premium products target high-spenders with FOMO. The chase feeling is engineered addiction."
  }
];
