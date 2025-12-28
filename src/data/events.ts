import type { MarketEvent } from '../types';

export const MARKET_EVENTS: MarketEvent[] = [
  {
    title: "📺 Streamer Opens Rare Pack!",
    effect: "ultra-rare",
    multiplier: 1.8,
    duration: 30,
    lesson: "DEMAND SHOCK: When influencers showcase rare cards, demand spikes instantly."
  },
  {
    title: "🏭 New Set Announced!",
    effect: "all",
    multiplier: 0.85,
    duration: 45,
    lesson: "SUPPLY EXPECTATIONS: Anticipation of new supply decreases current prices."
  },
  {
    title: "📉 Market Correction",
    effect: "all",
    multiplier: 0.7,
    duration: 20,
    lesson: "MEAN REVERSION: Prices tend to return to historical averages."
  },
  {
    title: "🎮 Pokemon Game Release!",
    effect: "all",
    multiplier: 1.4,
    duration: 40,
    lesson: "COMPLEMENTARY GOODS: Related product releases increase demand for TCG cards."
  },
  {
    title: "🐻 Bear Market Begins",
    effect: "all",
    multiplier: 0.6,
    duration: 60,
    lesson: "BEAR MARKET: Smart collectors accumulate during fear."
  },
  {
    title: "🐂 Bull Run!",
    effect: "all",
    multiplier: 1.6,
    duration: 50,
    lesson: "BULL MARKET: Rising prices create FOMO. Watch for bubbles!"
  },
  {
    title: "🔥 Charizard Hits $500K!",
    effect: "fire",
    multiplier: 2.0,
    duration: 35,
    lesson: "ANCHOR PRICING: Record sales set new psychological price anchors."
  },
];
