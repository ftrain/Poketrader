import type { Card, CardType } from '../types';

// Pokemon type data (spriteId -> type mapping for common Pokemon)
const POKEMON_TYPES: Record<number, CardType> = {
  1: 'grass', 2: 'grass', 3: 'grass',  // Bulbasaur line
  4: 'fire', 5: 'fire', 6: 'fire',     // Charmander line
  7: 'water', 8: 'water', 9: 'water',  // Squirtle line
  25: 'electric', 26: 'electric',       // Pikachu line
  35: 'normal', 36: 'normal',           // Clefairy line
  37: 'fire', 38: 'fire',               // Vulpix line
  39: 'normal', 40: 'normal',           // Jigglypuff line
  52: 'normal', 53: 'normal',           // Meowth line
  54: 'water', 55: 'water',             // Psyduck line
  58: 'fire', 59: 'fire',               // Growlithe line
  63: 'psychic', 64: 'psychic', 65: 'psychic', // Abra line
  74: 'normal', 75: 'normal', 76: 'normal',    // Geodude line
  77: 'fire', 78: 'fire',               // Ponyta line
  92: 'ghost', 93: 'ghost', 94: 'ghost', // Gastly line
  95: 'normal',                          // Onix
  123: 'normal',                         // Scyther
  129: 'water', 130: 'water',           // Magikarp line
  131: 'water',                          // Lapras
  133: 'normal',                         // Eevee
  134: 'water', 135: 'electric', 136: 'fire', // Eeveelutions
  143: 'normal',                         // Snorlax
  144: 'water', 145: 'electric', 146: 'fire', // Legendary birds
  147: 'dragon', 148: 'dragon', 149: 'dragon', // Dratini line
  150: 'psychic', 151: 'psychic',       // Mewtwo, Mew
  152: 'grass', 155: 'fire', 158: 'water', // Gen 2 starters
  172: 'electric',                       // Pichu
  175: 'normal',                         // Togepi
  179: 'electric', 180: 'electric', 181: 'electric', // Mareep line
  196: 'psychic', 197: 'dark',          // Espeon, Umbreon
  212: 'normal',                         // Scizor
  243: 'electric', 244: 'fire', 245: 'water', // Legendary beasts
  248: 'dark',                           // Tyranitar
  249: 'psychic', 250: 'fire',          // Lugia, Ho-Oh
  251: 'psychic',                        // Celebi
  252: 'grass', 255: 'fire', 258: 'water', // Gen 3 starters
  280: 'psychic', 281: 'psychic', 282: 'psychic', // Ralts line
  302: 'ghost',                          // Sableye
  304: 'normal', 305: 'normal', 306: 'normal', // Aron line
  359: 'dark',                           // Absol
  373: 'dragon',                         // Salamence
  376: 'psychic',                        // Metagross
  380: 'dragon', 381: 'dragon',         // Latias, Latios
  384: 'dragon',                         // Rayquaza
  385: 'psychic',                        // Jirachi
  386: 'psychic',                        // Deoxys
  393: 'water', 390: 'fire', 387: 'grass', // Gen 4 starters
  403: 'electric', 404: 'electric', 405: 'electric', // Shinx line
  443: 'dragon', 444: 'dragon', 445: 'dragon', // Gible line
  448: 'normal',                         // Lucario
  470: 'grass', 471: 'water',           // Leafeon, Glaceon
  483: 'dragon', 484: 'dragon',         // Dialga, Palkia
  487: 'ghost',                          // Giratina
  491: 'dark',                           // Darkrai
  493: 'normal',                         // Arceus
  700: 'normal',                         // Sylveon
  718: 'dragon',                         // Zygarde
  778: 'ghost',                          // Mimikyu
  809: 'normal',                         // Melmetal
  888: 'normal', 889: 'normal',         // Zacian, Zamazenta
  890: 'dragon',                         // Eternatus
};

// Get type for a Pokemon, default to normal
function getType(spriteId: number): CardType {
  return POKEMON_TYPES[spriteId] || 'normal';
}

// Expanded card database with more Pokemon
export const CARD_DATABASE: Card[] = [
  // Common cards (base starters and popular Pokemon)
  { id: 1, name: "Bulbasaur", rarity: "common", basePrice: 6, img: "🌿", spriteId: 1, type: getType(1) },
  { id: 2, name: "Charmander", rarity: "common", basePrice: 8, img: "🔥", spriteId: 4, type: getType(4) },
  { id: 3, name: "Squirtle", rarity: "common", basePrice: 7, img: "💧", spriteId: 7, type: getType(7) },
  { id: 4, name: "Pikachu", rarity: "common", basePrice: 10, img: "⚡", spriteId: 25, type: getType(25) },
  { id: 5, name: "Jigglypuff", rarity: "common", basePrice: 4, img: "🎤", spriteId: 39, type: getType(39) },
  { id: 6, name: "Meowth", rarity: "common", basePrice: 5, img: "🐱", spriteId: 52, type: getType(52) },
  { id: 7, name: "Psyduck", rarity: "common", basePrice: 6, img: "🦆", spriteId: 54, type: getType(54) },
  { id: 8, name: "Growlithe", rarity: "common", basePrice: 9, img: "🐕", spriteId: 58, type: getType(58) },
  { id: 9, name: "Geodude", rarity: "common", basePrice: 4, img: "🪨", spriteId: 74, type: getType(74) },
  { id: 10, name: "Ponyta", rarity: "common", basePrice: 8, img: "🐴", spriteId: 77, type: getType(77) },
  { id: 11, name: "Magikarp", rarity: "common", basePrice: 2, img: "🐟", spriteId: 129, type: getType(129) },
  { id: 12, name: "Pichu", rarity: "common", basePrice: 7, img: "⚡", spriteId: 172, type: getType(172) },
  { id: 13, name: "Togepi", rarity: "common", basePrice: 8, img: "🥚", spriteId: 175, type: getType(175) },
  { id: 14, name: "Mareep", rarity: "common", basePrice: 6, img: "🐑", spriteId: 179, type: getType(179) },
  { id: 15, name: "Treecko", rarity: "common", basePrice: 7, img: "🌿", spriteId: 252, type: getType(252) },
  { id: 16, name: "Torchic", rarity: "common", basePrice: 8, img: "🐤", spriteId: 255, type: getType(255) },
  { id: 17, name: "Mudkip", rarity: "common", basePrice: 7, img: "💧", spriteId: 258, type: getType(258) },
  { id: 18, name: "Shinx", rarity: "common", basePrice: 6, img: "⚡", spriteId: 403, type: getType(403) },

  // Uncommon cards (evolved forms and fan favorites)
  { id: 19, name: "Ivysaur", rarity: "uncommon", basePrice: 20, img: "🌿", spriteId: 2, type: getType(2) },
  { id: 20, name: "Charmeleon", rarity: "uncommon", basePrice: 25, img: "🔥", spriteId: 5, type: getType(5) },
  { id: 21, name: "Wartortle", rarity: "uncommon", basePrice: 22, img: "💧", spriteId: 8, type: getType(8) },
  { id: 22, name: "Raichu", rarity: "uncommon", basePrice: 35, img: "⚡", spriteId: 26, type: getType(26) },
  { id: 23, name: "Vulpix", rarity: "uncommon", basePrice: 28, img: "🦊", spriteId: 37, type: getType(37) },
  { id: 24, name: "Clefairy", rarity: "uncommon", basePrice: 18, img: "🌙", spriteId: 35, type: getType(35) },
  { id: 25, name: "Eevee", rarity: "uncommon", basePrice: 30, img: "⭐", spriteId: 133, type: getType(133) },
  { id: 26, name: "Haunter", rarity: "uncommon", basePrice: 32, img: "👻", spriteId: 93, type: getType(93) },
  { id: 27, name: "Kadabra", rarity: "uncommon", basePrice: 35, img: "🔮", spriteId: 64, type: getType(64) },
  { id: 28, name: "Arcanine", rarity: "uncommon", basePrice: 45, img: "🐕", spriteId: 59, type: getType(59) },
  { id: 29, name: "Scyther", rarity: "uncommon", basePrice: 40, img: "🦗", spriteId: 123, type: getType(123) },
  { id: 30, name: "Ralts", rarity: "uncommon", basePrice: 25, img: "🔮", spriteId: 280, type: getType(280) },
  { id: 31, name: "Aron", rarity: "uncommon", basePrice: 22, img: "⚙️", spriteId: 304, type: getType(304) },
  { id: 32, name: "Gible", rarity: "uncommon", basePrice: 35, img: "🦈", spriteId: 443, type: getType(443) },

  // Rare cards (final evolutions and popular Pokemon)
  { id: 33, name: "Venusaur", rarity: "rare", basePrice: 80, img: "🌿", spriteId: 3, type: getType(3) },
  { id: 34, name: "Blastoise", rarity: "rare", basePrice: 85, img: "💧", spriteId: 9, type: getType(9) },
  { id: 35, name: "Gengar", rarity: "rare", basePrice: 95, img: "👻", spriteId: 94, type: getType(94) },
  { id: 36, name: "Alakazam", rarity: "rare", basePrice: 90, img: "🔮", spriteId: 65, type: getType(65) },
  { id: 37, name: "Ninetales", rarity: "rare", basePrice: 75, img: "🦊", spriteId: 38, type: getType(38) },
  { id: 38, name: "Dragonite", rarity: "rare", basePrice: 150, img: "🐉", spriteId: 149, type: getType(149) },
  { id: 39, name: "Lapras", rarity: "rare", basePrice: 100, img: "🦕", spriteId: 131, type: getType(131) },
  { id: 40, name: "Snorlax", rarity: "rare", basePrice: 110, img: "😴", spriteId: 143, type: getType(143) },
  { id: 41, name: "Gyarados", rarity: "rare", basePrice: 120, img: "🐉", spriteId: 130, type: getType(130) },
  { id: 42, name: "Umbreon", rarity: "rare", basePrice: 140, img: "🌙", spriteId: 197, type: getType(197) },
  { id: 43, name: "Espeon", rarity: "rare", basePrice: 130, img: "☀️", spriteId: 196, type: getType(196) },
  { id: 44, name: "Tyranitar", rarity: "rare", basePrice: 160, img: "🦖", spriteId: 248, type: getType(248) },
  { id: 45, name: "Gardevoir", rarity: "rare", basePrice: 125, img: "💃", spriteId: 282, type: getType(282) },
  { id: 46, name: "Absol", rarity: "rare", basePrice: 115, img: "🌑", spriteId: 359, type: getType(359) },
  { id: 47, name: "Salamence", rarity: "rare", basePrice: 145, img: "🐉", spriteId: 373, type: getType(373) },
  { id: 48, name: "Metagross", rarity: "rare", basePrice: 155, img: "🤖", spriteId: 376, type: getType(376) },
  { id: 49, name: "Lucario", rarity: "rare", basePrice: 135, img: "🐺", spriteId: 448, type: getType(448) },
  { id: 50, name: "Garchomp", rarity: "rare", basePrice: 165, img: "🦈", spriteId: 445, type: getType(445) },
  { id: 51, name: "Mimikyu", rarity: "rare", basePrice: 120, img: "👻", spriteId: 778, type: getType(778) },

  // Ultra-rare cards (legendaries and pseudo-legendaries)
  { id: 52, name: "Charizard", rarity: "ultra-rare", basePrice: 400, img: "🔥", spriteId: 6, type: getType(6) },
  { id: 53, name: "Mewtwo", rarity: "ultra-rare", basePrice: 350, img: "🔮", spriteId: 150, type: getType(150) },
  { id: 54, name: "Mew", rarity: "ultra-rare", basePrice: 380, img: "💫", spriteId: 151, type: getType(151) },
  { id: 55, name: "Lugia", rarity: "ultra-rare", basePrice: 320, img: "🌊", spriteId: 249, type: getType(249) },
  { id: 56, name: "Ho-Oh", rarity: "ultra-rare", basePrice: 310, img: "🌈", spriteId: 250, type: getType(250) },
  { id: 57, name: "Rayquaza", rarity: "ultra-rare", basePrice: 450, img: "🌪️", spriteId: 384, type: getType(384) },
  { id: 58, name: "Dialga", rarity: "ultra-rare", basePrice: 340, img: "💎", spriteId: 483, type: getType(483) },
  { id: 59, name: "Palkia", rarity: "ultra-rare", basePrice: 330, img: "💜", spriteId: 484, type: getType(484) },
  { id: 60, name: "Giratina", rarity: "ultra-rare", basePrice: 360, img: "👻", spriteId: 487, type: getType(487) },
  { id: 61, name: "Darkrai", rarity: "ultra-rare", basePrice: 300, img: "🌑", spriteId: 491, type: getType(491) },
  { id: 62, name: "Zygarde", rarity: "ultra-rare", basePrice: 280, img: "🐍", spriteId: 718, type: getType(718) },
  { id: 63, name: "Eternatus", rarity: "ultra-rare", basePrice: 290, img: "☠️", spriteId: 890, type: getType(890) },

  // Legendary cards (iconic and extremely rare)
  { id: 64, name: "1st Ed Charizard", rarity: "legendary", basePrice: 5000, img: "✨", spriteId: 6, shiny: true, type: getType(6) },
  { id: 65, name: "Gold Star Pikachu", rarity: "legendary", basePrice: 3000, img: "⭐", spriteId: 25, shiny: true, type: getType(25) },
  { id: 66, name: "Shining Mewtwo", rarity: "legendary", basePrice: 4000, img: "✨", spriteId: 150, shiny: true, type: getType(150) },
  { id: 67, name: "Crystal Lugia", rarity: "legendary", basePrice: 3500, img: "💎", spriteId: 249, shiny: true, type: getType(249) },
  { id: 68, name: "Arceus", rarity: "legendary", basePrice: 4500, img: "👑", spriteId: 493, type: getType(493) },
  { id: 69, name: "Zacian", rarity: "legendary", basePrice: 2800, img: "⚔️", spriteId: 888, type: getType(888) },
  { id: 70, name: "Zamazenta", rarity: "legendary", basePrice: 2700, img: "🛡️", spriteId: 889, type: getType(889) },
];

// Pack-exclusive cards (shiny variants and special arts)
export const PACK_EXCLUSIVE_CARDS: Card[] = [
  { id: 101, name: "Shiny Charizard VMAX", rarity: "secret-rare", basePrice: 800, img: "🌟", spriteId: 6, shiny: true, type: getType(6), packExclusive: true },
  { id: 102, name: "Rainbow Pikachu", rarity: "secret-rare", basePrice: 650, img: "🌈", spriteId: 25, shiny: true, type: getType(25), packExclusive: true },
  { id: 103, name: "Alt Art Umbreon", rarity: "secret-rare", basePrice: 1200, img: "🎨", spriteId: 197, shiny: true, type: getType(197), packExclusive: true },
  { id: 104, name: "Gold Mew", rarity: "secret-rare", basePrice: 900, img: "🥇", spriteId: 151, shiny: true, type: getType(151), packExclusive: true },
  { id: 105, name: "Shiny Rayquaza", rarity: "secret-rare", basePrice: 1100, img: "🌟", spriteId: 384, shiny: true, type: getType(384), packExclusive: true },
  { id: 106, name: "Full Art Gengar", rarity: "secret-rare", basePrice: 750, img: "🎨", spriteId: 94, shiny: true, type: getType(94), packExclusive: true },
  { id: 107, name: "Gold Arceus", rarity: "secret-rare", basePrice: 1400, img: "👑", spriteId: 493, shiny: true, type: getType(493), packExclusive: true },
  { id: 108, name: "Shiny Metagross", rarity: "secret-rare", basePrice: 850, img: "🤖", spriteId: 376, shiny: true, type: getType(376), packExclusive: true },

  // Chase cards (extremely rare)
  { id: 109, name: "Moonbreon", rarity: "chase", basePrice: 2500, img: "🌑", spriteId: 197, shiny: true, type: getType(197), packExclusive: true },
  { id: 110, name: "Illustrator Pikachu", rarity: "chase", basePrice: 8000, img: "🎴", spriteId: 25, shiny: true, type: getType(25), packExclusive: true },
  { id: 111, name: "Trophy Charizard", rarity: "chase", basePrice: 10000, img: "🏆", spriteId: 6, shiny: true, type: getType(6), packExclusive: true },
  { id: 112, name: "Promo Mew", rarity: "chase", basePrice: 6000, img: "🎁", spriteId: 151, shiny: true, type: getType(151), packExclusive: true },
];

export const ALL_PULLABLE_CARDS: Card[] = [...CARD_DATABASE, ...PACK_EXCLUSIVE_CARDS];

// Helper to get sprite URL from PokeAPI CDN
export function getSpriteUrl(spriteId: number, shiny?: boolean): string {
  const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  if (shiny) {
    return `${base}/shiny/${spriteId}.png`;
  }
  return `${base}/${spriteId}.png`;
}
