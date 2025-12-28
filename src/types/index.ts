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

export type UpgradeEffect =
  | 'clickPower'      // Multiply click earnings
  | 'discount'        // Reduce purchase prices
  | 'passive'         // Add passive income per second
  | 'sellBonus'       // Increase sell prices
  | 'capacity'        // Add collection slots
  | 'marketSize'      // More cards in market
  | 'packDiscount'    // Discount on pack purchases
  | 'critChance'      // Increase critical hit chance
  | 'comboDecay'      // Slower combo decay (more time between clicks)
  | 'bulkBonus'       // Bonus when buying/selling multiple
  | 'eventDuration'   // Market events last longer
  | 'refreshDiscount' // Cheaper market refreshes
  | 'rareChance';     // Better odds in packs

export type UpgradeCategory = 'basics' | 'grading' | 'retail' | 'media' | 'events' | 'wholesale' | 'empire';

export interface Upgrade {
  id: number;
  name: string;
  cost: number;
  effect: UpgradeEffect;
  value: number;
  description: string;
  lesson: string;
  category: UpgradeCategory;
  icon: string;
  requires?: number[];  // IDs of required upgrades
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
  advisor?: {
    name: string;
    spriteId: number;
    color: string;
  };
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
  isCombo?: boolean;
  isCritical?: boolean;
  comboLevel?: number;
}

export type ViewType = 'market' | 'packs' | 'collection' | 'upgrades' | 'lessons' | 'rules';
