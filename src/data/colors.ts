import type { Rarity, CardType } from '../types';

export const RARITY_COLORS: Record<Rarity, string> = {
  common: "#78909c",
  uncommon: "#4caf50",
  rare: "#2196f3",
  "ultra-rare": "#9c27b0",
  "secret-rare": "#ff4081",
  legendary: "#ffd700",
  chase: "#ff6b6b"
};

export const TYPE_COLORS: Record<CardType, string> = {
  electric: "#f9d71c",
  fire: "#fd7d24",
  grass: "#9bcc50",
  water: "#4592c4",
  normal: "#a4acaf",
  ghost: "#7b62a3",
  dragon: "#7038f8",
  psychic: "#f366b9",
  dark: "#707070"
};
