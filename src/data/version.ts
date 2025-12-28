export const VERSION = '3.2.0';

export interface ReleaseNote {
  version: string;
  date: string;
  changes: string[];
}

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '3.2.0',
    date: '2025-12-28',
    changes: [
      'ARCHITECTURE: Pure entity-based state management',
      'All cards (market, collection, grading, graded) stored as engine entities',
      'React now purely renders from engine state - no local card state',
      'Entity actions: modifyEntity, removeEntity, forEachEntity',
      'Entity queries: entityCount, entitySum, entityProp, entityFirst, entityHas',
      'Entity conditions for filtering (eq, lt, gt, and, or, not, hasProperty)',
      'Entities persist in save/load automatically',
      'Appraisers now stored as entities with level/experience tracking'
    ]
  },
  {
    version: '3.1.0',
    date: '2025-12-28',
    changes: [
      'MAJOR: 35+ business upgrades across 7 categories (Basics → Empire)',
      'Build your card empire: stores, expos, streaming, wholesale, franchises',
      'Upgrade prerequisites create meaningful progression paths',
      'New mechanics: market size, pack discounts, crit bonuses, event duration',
      'Compact UI: smaller header, tighter grids, less intrusive notifications',
      'Removed buy/sell popups for smoother gameplay',
      'Fixed achievement card visibility (no more transparency)'
    ]
  },
  {
    version: '3.0.0',
    date: '2025-12-28',
    changes: [
      'Classic Pokemon theme with warm cream colors and Pokédex red header',
      'Click combo system with up to 50x multiplier and critical hits',
      'Realistic pack economics - packs are now unprofitable (like real TCG)',
      'Added 15+ Pokemon lore rules (evolution chains, legendary trios, etc.)',
      'Pokéball-shaped clicker button with satisfying visual feedback'
    ]
  },
  {
    version: '2.1.0',
    date: '2025-12-28',
    changes: [
      'Bloomberg-style finance terminal theme with IBM Plex fonts',
      'Orange accent colors for professional trading terminal aesthetic',
      '3x sprite sizes (288px) for better Pokemon visibility',
      'Added 20+ new rules including win conditions and market strategies',
      'Added market cornering mechanics for type monopolies',
      'Reduced visual glow effects for cleaner interface',
      'Non-fixed header for better scrolling experience'
    ]
  },
  {
    version: '2.0.0',
    date: '2025-12-28',
    changes: [
      'Complete visual overhaul with retro Pokemon terminal theme',
      'Added Rules Engine with 15+ game rules across 6 categories',
      'Pokemon advisors now deliver notifications (Meowth, Alakazam, etc.)',
      'Fixed pack expected values to be realistically unprofitable',
      'Doubled sprite sizes to 192x192 pixels',
      'Removed holographic animations for cleaner terminal aesthetic',
      'Achievements now grant utility bonuses instead of money'
    ]
  },
  {
    version: '1.1.0',
    date: '2025-12-27',
    changes: [
      'Expanded card database to 160+ Pokemon',
      'Added all 18 Pokemon types with proper colors',
      'Added HP, Attack, Defense stats to cards',
      'Improved holographic card animations by rarity'
    ]
  },
  {
    version: '1.0.0',
    date: '2025-12-26',
    changes: [
      'Initial release with Vite + TypeScript',
      'Core trading mechanics: buy, sell, collect',
      'Pack opening with rarity-based pull rates',
      'Market events affecting card prices',
      'Upgrades and achievement system',
      'Economics lessons and key concepts'
    ]
  }
];
