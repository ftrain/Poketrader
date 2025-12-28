/**
 * ClothingVisual - Visual representation of vintage clothing items
 *
 * Uses CSS patterns, gradients, and SVG to create unique clothing visuals
 * based on era, type, and rarity. Can be replaced with actual images later.
 */

import type { CSSProperties } from 'react';
import { useMemo } from 'react';

export interface ClothingItem {
  id: string;
  name: string;
  type: 'dress' | 'blouse' | 'skirt' | 'jacket' | 'pants' | 'accessory' | 'shoes' | 'bag';
  era: '70s' | '80s' | '90s' | 'y2k' | 'vintage-designer';
  condition: 'mint' | 'excellent' | 'good' | 'fair' | 'poor';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  basePrice: number;
  pattern?: string;
  color?: string;
}

// Era-specific color palettes
const ERA_PALETTES = {
  '70s': {
    primary: ['#D2691E', '#8B4513', '#DAA520', '#CD853F', '#F4A460'],
    secondary: ['#556B2F', '#6B8E23', '#9ACD32', '#808000'],
    patterns: ['paisley', 'floral', 'geometric', 'stripes'],
    vibe: 'Earthy tones, bohemian patterns'
  },
  '80s': {
    primary: ['#FF1493', '#00CED1', '#FFD700', '#FF6347', '#9370DB'],
    secondary: ['#000000', '#FFFFFF', '#C0C0C0'],
    patterns: ['neon', 'geometric', 'abstract', 'power'],
    vibe: 'Bold neons, power shoulders'
  },
  '90s': {
    primary: ['#4169E1', '#DC143C', '#228B22', '#FFD700'],
    secondary: ['#696969', '#2F4F4F', '#000000'],
    patterns: ['grunge', 'plaid', 'minimalist', 'sporty'],
    vibe: 'Grunge meets minimalism'
  },
  'y2k': {
    primary: ['#FF69B4', '#00BFFF', '#98FB98', '#DDA0DD', '#FFB6C1'],
    secondary: ['#C0C0C0', '#FFFFFF', '#F0F8FF'],
    patterns: ['metallic', 'butterfly', 'sparkle', 'cyber'],
    vibe: 'Cyber-pink, metallics, butterflies'
  },
  'vintage-designer': {
    primary: ['#000000', '#FFFAF0', '#B8860B', '#800020'],
    secondary: ['#D4AF37', '#C0C0C0', '#2F4F4F'],
    patterns: ['classic', 'tweed', 'monogram', 'silk'],
    vibe: 'Timeless elegance'
  }
};

// Type-specific silhouettes (emoji + shape)
const TYPE_VISUALS = {
  dress: { emoji: '👗', shape: 'trapezoid' },
  blouse: { emoji: '👚', shape: 'rectangle' },
  skirt: { emoji: '🩳', shape: 'aline' },
  jacket: { emoji: '🧥', shape: 'structured' },
  pants: { emoji: '👖', shape: 'straight' },
  accessory: { emoji: '💍', shape: 'circle' },
  shoes: { emoji: '👠', shape: 'angular' },
  bag: { emoji: '👜', shape: 'square' }
};

// Rarity effects
const RARITY_EFFECTS = {
  common: { glow: 'none', border: '2px solid #9CA3AF' },
  uncommon: { glow: '0 0 10px #22C55E', border: '2px solid #22C55E' },
  rare: { glow: '0 0 15px #3B82F6', border: '2px solid #3B82F6' },
  legendary: { glow: '0 0 20px #EAB308, 0 0 40px #EAB308', border: '3px solid #EAB308' }
};

// Generate a deterministic pattern based on item properties
function generatePattern(item: ClothingItem): string {
  const palette = ERA_PALETTES[item.era];
  const hash = item.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const primaryColor = palette.primary[hash % palette.primary.length];
  const secondaryColor = palette.secondary[hash % palette.secondary.length];
  const patternType = palette.patterns[hash % palette.patterns.length];

  switch (patternType) {
    case 'paisley':
    case 'floral':
      return `radial-gradient(circle at 30% 30%, ${primaryColor}40 10%, transparent 40%),
              radial-gradient(circle at 70% 60%, ${secondaryColor}40 15%, transparent 50%),
              radial-gradient(circle at 50% 80%, ${primaryColor}30 8%, transparent 30%),
              linear-gradient(135deg, ${primaryColor}20 25%, ${secondaryColor}20 75%)`;

    case 'geometric':
    case 'abstract':
      return `linear-gradient(45deg, ${primaryColor}40 25%, transparent 25%),
              linear-gradient(-45deg, ${primaryColor}40 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${secondaryColor}40 75%),
              linear-gradient(-45deg, transparent 75%, ${secondaryColor}40 75%)`;

    case 'neon':
    case 'power':
      return `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${primaryColor} 100%)`;

    case 'grunge':
    case 'plaid':
      return `repeating-linear-gradient(0deg, ${primaryColor}30 0px, ${primaryColor}30 10px, transparent 10px, transparent 20px),
              repeating-linear-gradient(90deg, ${secondaryColor}30 0px, ${secondaryColor}30 10px, transparent 10px, transparent 20px),
              linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`;

    case 'minimalist':
    case 'sporty':
      return `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor} 100%)`;

    case 'metallic':
    case 'sparkle':
    case 'cyber':
      return `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 25%, ${primaryColor} 50%, ${secondaryColor} 75%, ${primaryColor} 100%)`;

    case 'classic':
    case 'tweed':
    case 'monogram':
    case 'silk':
      return `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}DD 50%, ${primaryColor} 100%)`;

    case 'stripes':
    default:
      return `repeating-linear-gradient(90deg, ${primaryColor} 0px, ${primaryColor} 10px, ${secondaryColor} 10px, ${secondaryColor} 20px)`;
  }
}

// Generate condition overlay
function getConditionOverlay(condition: ClothingItem['condition']): string {
  switch (condition) {
    case 'mint': return 'none';
    case 'excellent': return 'none';
    case 'good': return 'linear-gradient(135deg, transparent 90%, rgba(0,0,0,0.1) 100%)';
    case 'fair': return 'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)';
    case 'poor': return 'linear-gradient(0deg, rgba(139,69,19,0.2) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)';
  }
}

interface ClothingVisualProps {
  item: ClothingItem;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export function ClothingVisual({
  item,
  size = 'medium',
  showDetails = false,
  onClick,
  selected = false
}: ClothingVisualProps) {
  const dimensions = {
    small: { width: 60, height: 80 },
    medium: { width: 100, height: 130 },
    large: { width: 160, height: 200 }
  }[size];

  const typeVisual = TYPE_VISUALS[item.type];
  const rarityEffect = RARITY_EFFECTS[item.rarity];
  const pattern = useMemo(() => generatePattern(item), [item]);
  const conditionOverlay = getConditionOverlay(item.condition);

  const containerStyle: CSSProperties = {
    width: dimensions.width,
    height: dimensions.height,
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: selected
      ? `0 0 0 3px #FF69B4, ${rarityEffect.glow}`
      : rarityEffect.glow,
    border: rarityEffect.border,
    transition: 'all 0.2s ease',
    transform: selected ? 'scale(1.05)' : 'scale(1)'
  };

  const patternStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: pattern,
    backgroundSize: size === 'small' ? '20px 20px' : '40px 40px'
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: conditionOverlay
  };

  const emojiStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: size === 'small' ? 28 : size === 'medium' ? 44 : 64,
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
    zIndex: 2
  };

  const eraTagStyle: CSSProperties = {
    position: 'absolute',
    top: 4,
    right: 4,
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: size === 'small' ? 8 : 10,
    fontWeight: 'bold',
    zIndex: 3
  };

  const rarityTagStyle: CSSProperties = {
    position: 'absolute',
    bottom: 4,
    left: 4,
    background: item.rarity === 'legendary' ? '#EAB308' :
                item.rarity === 'rare' ? '#3B82F6' :
                item.rarity === 'uncommon' ? '#22C55E' : '#9CA3AF',
    color: item.rarity === 'legendary' ? '#000' : '#fff',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: size === 'small' ? 8 : 10,
    fontWeight: 'bold',
    zIndex: 3
  };

  return (
    <div style={containerStyle} onClick={onClick} title={item.name}>
      <div style={patternStyle} />
      <div style={overlayStyle} />
      <span style={emojiStyle}>{typeVisual.emoji}</span>
      {showDetails && (
        <>
          <span style={eraTagStyle}>{item.era.toUpperCase()}</span>
          <span style={rarityTagStyle}>{item.rarity}</span>
        </>
      )}
    </div>
  );
}

// Clothing rack display component
interface ClothingRackProps {
  items: ClothingItem[];
  onSelectItem?: (item: ClothingItem) => void;
  selectedId?: string;
  maxDisplay?: number;
}

export function ClothingRack({
  items,
  onSelectItem,
  selectedId,
  maxDisplay = 8
}: ClothingRackProps) {
  const displayItems = items.slice(0, maxDisplay);

  const rackStyle: CSSProperties = {
    display: 'flex',
    gap: 12,
    padding: 16,
    overflowX: 'auto',
    background: 'linear-gradient(180deg, #F5F5DC 0%, #D2B48C 100%)',
    borderRadius: 12,
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
  };

  const hangerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4
  };

  const hookStyle: CSSProperties = {
    width: 20,
    height: 10,
    borderTop: '3px solid #8B4513',
    borderLeft: '3px solid #8B4513',
    borderRight: '3px solid #8B4513',
    borderRadius: '10px 10px 0 0'
  };

  return (
    <div style={rackStyle}>
      {displayItems.map(item => (
        <div key={item.id} style={hangerStyle}>
          <div style={hookStyle} />
          <ClothingVisual
            item={item}
            size="medium"
            showDetails
            onClick={() => onSelectItem?.(item)}
            selected={selectedId === item.id}
          />
        </div>
      ))}
      {items.length > maxDisplay && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          color: '#8B4513',
          fontWeight: 'bold'
        }}>
          +{items.length - maxDisplay} more
        </div>
      )}
    </div>
  );
}

// Helper to generate random clothing items
export function generateRandomClothing(era?: ClothingItem['era']): ClothingItem {
  const types: ClothingItem['type'][] = ['dress', 'blouse', 'skirt', 'jacket', 'pants', 'accessory', 'shoes', 'bag'];
  const eras: ClothingItem['era'][] = ['70s', '80s', '90s', 'y2k', 'vintage-designer'];
  const conditions: ClothingItem['condition'][] = ['mint', 'excellent', 'good', 'fair', 'poor'];
  const rarities: ClothingItem['rarity'][] = ['common', 'common', 'common', 'uncommon', 'uncommon', 'rare', 'legendary'];

  const selectedEra = era || eras[Math.floor(Math.random() * eras.length)];
  const selectedType = types[Math.floor(Math.random() * types.length)];
  const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const selectedRarity = rarities[Math.floor(Math.random() * rarities.length)];

  const basePrice = {
    common: 5 + Math.random() * 15,
    uncommon: 15 + Math.random() * 35,
    rare: 40 + Math.random() * 60,
    legendary: 80 + Math.random() * 120
  }[selectedRarity];

  const names = {
    dress: ['Maxi Dress', 'Cocktail Dress', 'Shift Dress', 'Wrap Dress', 'Slip Dress'],
    blouse: ['Silk Blouse', 'Peasant Top', 'Button-Down', 'Ruffle Blouse', 'Crop Top'],
    skirt: ['A-Line Skirt', 'Mini Skirt', 'Maxi Skirt', 'Pencil Skirt', 'Pleated Skirt'],
    jacket: ['Blazer', 'Bomber Jacket', 'Denim Jacket', 'Leather Jacket', 'Cardigan'],
    pants: ['High-Waist Jeans', 'Wide-Leg Pants', 'Culottes', 'Palazzo Pants', 'Trousers'],
    accessory: ['Statement Necklace', 'Vintage Brooch', 'Silk Scarf', 'Belt', 'Sunglasses'],
    shoes: ['Platform Heels', 'Mary Janes', 'Loafers', 'Boots', 'Sandals'],
    bag: ['Clutch', 'Shoulder Bag', 'Tote', 'Crossbody', 'Bucket Bag']
  };

  const eraPrefix = {
    '70s': ['Groovy', 'Bohemian', 'Disco', 'Earth-Tone', 'Retro'],
    '80s': ['Power', 'Neon', 'Dynasty', 'Punk', 'New Wave'],
    '90s': ['Grunge', 'Minimalist', 'Sporty', 'Slip', 'Vintage'],
    'y2k': ['Cyber', 'Glitter', 'Baby', 'Butterfly', 'Chrome'],
    'vintage-designer': ['Couture', 'Classic', 'Timeless', 'Iconic', 'Signature']
  };

  const prefix = eraPrefix[selectedEra][Math.floor(Math.random() * eraPrefix[selectedEra].length)];
  const baseName = names[selectedType][Math.floor(Math.random() * names[selectedType].length)];

  return {
    id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${prefix} ${baseName}`,
    type: selectedType,
    era: selectedEra,
    condition: selectedCondition,
    rarity: selectedRarity,
    basePrice: Math.round(basePrice * 100) / 100
  };
}
