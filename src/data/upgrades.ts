import type { Upgrade } from '../types';

export const UPGRADES: Upgrade[] = [
  {
    id: 1,
    name: "Market Research",
    cost: 100,
    effect: "clickPower",
    value: 2,
    description: "2x appraisal speed",
    lesson: "INFORMATION ADVANTAGE: Better information = better decisions."
  },
  {
    id: 2,
    name: "Bulk Buying Power",
    cost: 500,
    effect: "discount",
    value: 0.95,
    description: "5% discount on purchases",
    lesson: "ECONOMIES OF SCALE: Volume reduces per-unit costs."
  },
  {
    id: 3,
    name: "Price Alert Bot",
    cost: 1000,
    effect: "passive",
    value: 5,
    description: "Earn $5/sec passively",
    lesson: "PASSIVE INCOME: Automated systems work while you sleep."
  },
  {
    id: 4,
    name: "Grading Partnership",
    cost: 5000,
    effect: "sellBonus",
    value: 1.15,
    description: "15% bonus on sales",
    lesson: "VALUE-ADD SERVICES: Grading increases card value."
  },
  {
    id: 5,
    name: "Storage Facility",
    cost: 10000,
    effect: "capacity",
    value: 50,
    description: "+50 collection slots",
    lesson: "INVENTORY MANAGEMENT: Storage costs affect strategy."
  },
];
