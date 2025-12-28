import type { PackType } from '../types';

// Pack economics designed to teach real gambling math:
// - The house ALWAYS wins on average
// - "Better" packs often have worse value ratios
// - Guaranteed pulls create false sense of value

export const PACK_TYPES: PackType[] = [
  {
    id: 'standard',
    name: 'Standard Pack',
    price: 50,
    cardCount: 5,
    img: '📦',
    color: '#4a90d9',
    // Realistic TCG pull rates - commons dominate
    pullRates: {
      common: 0.9200,      // 92% - the bulk of every pack
      uncommon: 0.0600,    // 6%
      rare: 0.0160,        // 1.6%
      'ultra-rare': 0.0030, // 0.3%
      'secret-rare': 0.0007, // 0.07%
      legendary: 0.00025,   // 0.025%
      chase: 0.00005        // 0.005% (1 in 20,000)
    },
    description: '5 cards with standard pull rates',
    lesson: "EXPECTED VALUE: This pack costs ₽50 but averages only ~₽35 in value. For every 100 packs opened, players lose ~₽1,500 combined. That's how Pokemon Company profits billions."
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 150,
    cardCount: 5,
    img: '💎',
    color: '#9c27b0',
    pullRates: {
      common: 0.8400,       // Still mostly commons
      uncommon: 0.1100,
      rare: 0.0380,
      'ultra-rare': 0.0090,
      'secret-rare': 0.0022,
      legendary: 0.0006,
      chase: 0.0002
    },
    guaranteedRare: true,
    description: '5 cards, 1 guaranteed rare or better',
    lesson: "RISK PREMIUM: You pay 3× more for 'better odds' but the EV only improves ~2×. The guaranteed rare feels valuable but has low base value. You're still losing ~₽50 per pack on average."
  },
  {
    id: 'elite',
    name: 'Elite Trainer Box',
    price: 500,
    cardCount: 12,
    img: '👑',
    color: '#ffd700',
    pullRates: {
      common: 0.7500,
      uncommon: 0.1600,
      rare: 0.0650,
      'ultra-rare': 0.0180,
      'secret-rare': 0.0050,
      legendary: 0.0015,
      chase: 0.0005
    },
    guaranteedUltraRare: true,
    description: '12 cards, 1 guaranteed ultra-rare or better',
    lesson: "WHALE ECONOMICS: Premium products target collectors with FOMO. The guaranteed ultra-rare costs ~₽150-300 but you paid ₽500 for the 'experience.' That markup is pure psychological manipulation."
  }
];

// ECONOMICS LESSON:
// Real Pokemon TCG booster boxes (~36 packs, ~$150) average ~$100-120 in singles value
// That's a 20-35% loss on average - the "gambling tax"
// Chase cards exist to create viral "pack opening" content that drives more sales
// The few big winners you see on YouTube are massively outnumbered by losers who don't post
