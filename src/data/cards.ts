import type { Card } from '../types';

// Sprite IDs correspond to Pokedex numbers
export const CARD_DATABASE: Card[] = [
  { id: 1, name: "Pikachu", rarity: "common", basePrice: 5, img: "⚡", spriteId: 25, type: "electric" },
  { id: 2, name: "Charmander", rarity: "common", basePrice: 8, img: "🔥", spriteId: 4, type: "fire" },
  { id: 3, name: "Bulbasaur", rarity: "common", basePrice: 6, img: "🌿", spriteId: 1, type: "grass" },
  { id: 4, name: "Squirtle", rarity: "common", basePrice: 7, img: "💧", spriteId: 7, type: "water" },
  { id: 5, name: "Eevee", rarity: "uncommon", basePrice: 25, img: "⭐", spriteId: 133, type: "normal" },
  { id: 6, name: "Gengar", rarity: "uncommon", basePrice: 45, img: "👻", spriteId: 94, type: "ghost" },
  { id: 7, name: "Dragonite", rarity: "rare", basePrice: 120, img: "🐉", spriteId: 149, type: "dragon" },
  { id: 8, name: "Mewtwo", rarity: "rare", basePrice: 200, img: "🔮", spriteId: 150, type: "psychic" },
  { id: 9, name: "Charizard", rarity: "ultra-rare", basePrice: 500, img: "🔥", spriteId: 6, type: "fire" },
  { id: 10, name: "1st Ed Charizard", rarity: "legendary", basePrice: 5000, img: "✨", spriteId: 6, shiny: true, type: "fire" },
  { id: 11, name: "Lugia", rarity: "rare", basePrice: 180, img: "🌊", spriteId: 249, type: "psychic" },
  { id: 12, name: "Rayquaza", rarity: "ultra-rare", basePrice: 450, img: "🌪️", spriteId: 384, type: "dragon" },
  { id: 13, name: "Mew", rarity: "ultra-rare", basePrice: 380, img: "💫", spriteId: 151, type: "psychic" },
  { id: 14, name: "Umbreon", rarity: "rare", basePrice: 150, img: "🌙", spriteId: 197, type: "dark" },
  { id: 15, name: "Gold Star Pikachu", rarity: "legendary", basePrice: 3000, img: "⚡", spriteId: 25, shiny: true, type: "electric" },
];

// Pack-exclusive cards use shiny variants
export const PACK_EXCLUSIVE_CARDS: Card[] = [
  { id: 101, name: "Shiny Charizard VMAX", rarity: "secret-rare", basePrice: 800, img: "🌟", spriteId: 6, shiny: true, type: "fire", packExclusive: true },
  { id: 102, name: "Rainbow Pikachu", rarity: "secret-rare", basePrice: 650, img: "🌈", spriteId: 25, shiny: true, type: "electric", packExclusive: true },
  { id: 103, name: "Alt Art Umbreon", rarity: "secret-rare", basePrice: 1200, img: "🎨", spriteId: 197, shiny: true, type: "dark", packExclusive: true },
  { id: 104, name: "Gold Mew", rarity: "secret-rare", basePrice: 900, img: "🥇", spriteId: 151, shiny: true, type: "psychic", packExclusive: true },
  { id: 105, name: "Moonbreon", rarity: "chase", basePrice: 2500, img: "🌑", spriteId: 197, shiny: true, type: "dark", packExclusive: true },
  { id: 106, name: "Illustrator Pikachu", rarity: "chase", basePrice: 8000, img: "🎴", spriteId: 25, shiny: true, type: "electric", packExclusive: true },
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
