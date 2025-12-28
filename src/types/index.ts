export type Rarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare' | 'secret-rare' | 'legendary' | 'chase';

export type CardType = 'electric' | 'fire' | 'grass' | 'water' | 'normal' | 'ghost' | 'dragon' | 'psychic' | 'dark' | 'fighting' | 'poison' | 'ground' | 'flying' | 'bug' | 'rock' | 'ice' | 'steel' | 'fairy';

export interface Card {
  id: number;
  name: string;
  rarity: Rarity;
  basePrice: number;
  img: string;
  spriteId: number;
  shiny?: boolean;
  type: CardType;
  packExclusive?: boolean;
  hp: number;
  attack: number;
  defense: number;
}

export interface MarketCard extends Card {
  currentPrice: number;
  marketId: number;
  priceHistory: number[];
}

export interface CollectionCard extends Card {
  currentPrice: number;
  purchasePrice: number;
  purchaseTime: number;
  holdTime: number;
  collectionId: number;
  fromPack?: string;
}

export interface PackType {
  id: string;
  name: string;
  price: number;
  cardCount: number;
  img: string;
  color: string;
  pullRates: Record<Rarity, number>;
  description: string;
  lesson: string;
  guaranteedRare?: boolean;
  guaranteedUltraRare?: boolean;
}

export interface MarketEvent {
  title: string;
  effect: string;
  multiplier: number;
  duration: number;
  lesson: string;
}

export type UpgradeEffect = 'clickPower' | 'discount' | 'passive' | 'sellBonus' | 'capacity';

export interface Upgrade {
  id: number;
  name: string;
  cost: number;
  effect: UpgradeEffect;
  value: number;
  description: string;
  lesson: string;
}

export type AchievementEffect = 'capacity' | 'marketSpeed' | 'discount' | 'sellBonus' | 'clickPower' | 'priceInsight';

export interface Achievement {
  id: number;
  name: string;
  condition: (state: GameStats) => boolean;
  effect: AchievementEffect;
  value: number;
  description: string;
  benefit: string;
}

export interface GameStats {
  money: number;
  collection: CollectionCard[];
  totalSold: number;
  totalProfit: number;
  longestHold: number;
  packsOpened: number;
  packStats: PackStats;
}

export interface PackStats {
  spent: number;
  totalValue: number;
  bestPull: Card | null;
}

export interface Notification {
  id: number;
  message: string;
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}

export type ViewType = 'market' | 'packs' | 'collection' | 'upgrades' | 'lessons';
