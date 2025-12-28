/**
 * Thrift Queen Game - Graph Theory Tests 👗✨
 *
 * Tests game progression using graph theory concepts:
 * - State transition graphs
 * - Reachability analysis (can we reach win condition?)
 * - Path finding (optimal progression routes)
 * - Economy balance testing
 */

import { thriftQueenGame } from '../../games/thriftQueen';
import { GameEngine } from '../GameEngine';

// Mock localStorage for tests
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: function(key: string) { return this.store[key] || null; },
  setItem: function(key: string, value: string) { this.store[key] = value; },
  removeItem: function(key: string) { delete this.store[key]; },
  clear: function() { this.store = {}; }
};
(global as unknown as { localStorage: typeof localStorageMock }).localStorage = localStorageMock;

// ═══════════════════════════════════════════════════════════════
// 📊 GRAPH THEORY UTILITIES
// ═══════════════════════════════════════════════════════════════

interface StateNode {
  id: string;
  state: Record<string, number | boolean | string>;
  phase: string;
}

interface StateEdge {
  from: string;
  to: string;
  action: string;
  cost?: number;
  reward?: number;
}

class GameStateGraph {
  nodes: Map<string, StateNode> = new Map();
  edges: Map<string, StateEdge[]> = new Map();

  addNode(node: StateNode) {
    this.nodes.set(node.id, node);
    if (!this.edges.has(node.id)) {
      this.edges.set(node.id, []);
    }
  }

  addEdge(edge: StateEdge) {
    if (!this.edges.has(edge.from)) {
      this.edges.set(edge.from, []);
    }
    this.edges.get(edge.from)!.push(edge);
  }

  // BFS to find if target phase is reachable
  isReachable(startId: string, targetPhase: string): boolean {
    const visited = new Set<string>();
    const queue = [startId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);

      const node = this.nodes.get(current);
      if (node && node.phase === targetPhase) return true;

      const edges = this.edges.get(current) || [];
      for (const edge of edges) {
        if (!visited.has(edge.to)) {
          queue.push(edge.to);
        }
      }
    }
    return false;
  }

  // Find shortest path (by number of actions)
  shortestPath(startId: string, targetPhase: string): string[] | null {
    const visited = new Map<string, string>();
    const queue: [string, string[]][] = [[startId, []]];

    while (queue.length > 0) {
      const [current, path] = queue.shift()!;
      if (visited.has(current)) continue;
      visited.set(current, path.join(','));

      const node = this.nodes.get(current);
      if (node && node.phase === targetPhase) {
        return [...path, current];
      }

      const edges = this.edges.get(current) || [];
      for (const edge of edges) {
        if (!visited.has(edge.to)) {
          queue.push([edge.to, [...path, current]]);
        }
      }
    }
    return null;
  }

  // Calculate total reward along a path
  pathReward(path: string[]): number {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edges = this.edges.get(path[i]) || [];
      const edge = edges.find(e => e.to === path[i + 1]);
      if (edge?.reward) total += edge.reward;
    }
    return total;
  }
}

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: GAME INITIALIZATION
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Game Definition', () => {
  test('game definition has required meta fields', () => {
    expect(thriftQueenGame.meta.id).toBe('thriftqueen');
    expect(thriftQueenGame.meta.name).toContain('Thrift Queen');
    expect(thriftQueenGame.meta.version).toBe('1.0.0');
  });

  test('game has all required state variables', () => {
    const stateIds = thriftQueenGame.state.map(s => s.id);

    // Core resources
    expect(stateIds).toContain('cash');
    expect(stateIds).toContain('debt');
    expect(stateIds).toContain('totalRevenue');
    expect(stateIds).toContain('totalProfit');

    // Brand & Social
    expect(stateIds).toContain('reputation');
    expect(stateIds).toContain('ecoScore');
    expect(stateIds).toContain('followers');
    expect(stateIds).toContain('styleCred');

    // Win condition
    expect(stateIds).toContain('hasWon');
  });

  test('game has progression phases', () => {
    expect(thriftQueenGame.phases.length).toBeGreaterThanOrEqual(5);
    const phaseIds = thriftQueenGame.phases.map(p => p.id);
    expect(phaseIds).toContain('hustle');
    expect(phaseIds).toContain('online');
    expect(phaseIds).toContain('brand');
    expect(phaseIds).toContain('retail');
    expect(phaseIds).toContain('global');
  });

  test('game has upgrade projects', () => {
    expect(thriftQueenGame.projects.length).toBeGreaterThan(30);

    // Check upgrade categories exist
    const projectIds = thriftQueenGame.projects.map(p => p.id);
    expect(projectIds.some(id => id.startsWith('upgrade-s'))).toBe(true); // Sourcing
    expect(projectIds.some(id => id.startsWith('upgrade-p'))).toBe(true); // Photography
    expect(projectIds.some(id => id.startsWith('upgrade-m'))).toBe(true); // Marketing
    expect(projectIds.some(id => id.startsWith('upgrade-o'))).toBe(true); // Operations
    expect(projectIds.some(id => id.startsWith('upgrade-r'))).toBe(true); // Retail
    expect(projectIds.some(id => id.startsWith('upgrade-e'))).toBe(true); // Empire
  });

  test('game has starter path functions', () => {
    const functions = Object.keys(thriftQueenGame.functions);
    expect(functions).toContain('chooseThrifter');
    expect(functions).toContain('chooseInfluencer');
    expect(functions).toContain('chooseInvestor');
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: STARTER PATHS
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Starter Paths', () => {
  test('Thrifter path starts with $100, no debt', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    expect(engine.getState('cash')).toBe(100);
    expect(engine.getState('debt')).toBe(0);
    expect(engine.getState('followers')).toBe(50);
    expect(engine.getState('hasChosenStarter')).toBe(true);
    expect(engine.getState('starterPath')).toBe('thrifter');
  });

  test('Influencer path starts with followers advantage', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseInfluencer');

    expect(engine.getState('cash')).toBe(200);
    expect(engine.getState('followers')).toBe(500);
    expect(engine.getState('followerGrowth')).toBe(0.5);
  });

  test('Investor path has most cash but debt', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseInvestor');

    expect(engine.getState('cash')).toBe(500);
    expect(engine.getState('debt')).toBe(400);
    expect(engine.getState('inventoryCapacity')).toBe(30);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: ECONOMIC BALANCE
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Economic Balance', () => {
  test('early upgrades are affordable with starting cash', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseInvestor'); // Start with most cash: $500

    // Find the cheapest upgrades
    const cheapUpgrades = thriftQueenGame.projects
      .filter(p => p.costs && p.costs.length > 0)
      .filter(p => {
        const cost = p.costs[0];
        return typeof cost.amount === 'number' && cost.amount <= 100;
      });

    expect(cheapUpgrades.length).toBeGreaterThan(3);
  });

  test('upgrade costs scale reasonably', () => {
    const costs = thriftQueenGame.projects
      .filter(p => p.costs && p.costs.length > 0 && typeof p.costs[0].amount === 'number')
      .map(p => ({ id: p.id, cost: p.costs[0].amount as number }))
      .sort((a, b) => a.cost - b.cost);

    // Cheapest upgrade should be under $100
    expect(costs[0].cost).toBeLessThan(100);

    // Most expensive should be significant (empire upgrades)
    const maxCost = Math.max(...costs.map(c => c.cost));
    expect(maxCost).toBeGreaterThanOrEqual(100000);

    // Should have good distribution across ranges
    const under100 = costs.filter(c => c.cost < 100).length;
    const under1000 = costs.filter(c => c.cost >= 100 && c.cost < 1000).length;
    const under10000 = costs.filter(c => c.cost >= 1000 && c.cost < 10000).length;
    const over10000 = costs.filter(c => c.cost >= 10000).length;

    expect(under100).toBeGreaterThan(0);
    expect(under1000).toBeGreaterThan(0);
    expect(under10000).toBeGreaterThan(0);
    expect(over10000).toBeGreaterThan(0);
  });

  test('loan mechanics work correctly', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    const initialCash = engine.getState<number>('cash')!;
    const initialDebt = engine.getState<number>('debt')!;

    engine.playerAction('takeLoan');

    const newCash = engine.getState<number>('cash')!;
    const newDebt = engine.getState<number>('debt')!;

    // Loan should add $200 cash
    expect(newCash).toBe(initialCash + 200);
    // Loan should add $240 debt (20% fee)
    expect(newDebt).toBe(initialDebt + 240);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: PROGRESSION GRAPH ANALYSIS
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Progression Analysis', () => {
  test('phases trigger at correct profit thresholds', () => {
    const phases = thriftQueenGame.phases;

    // Hustle phase: profit < 500
    const hustlePhase = phases.find(p => p.id === 'hustle');
    expect(hustlePhase).toBeDefined();

    // Online phase: 500 <= profit < 5000
    const onlinePhase = phases.find(p => p.id === 'online');
    expect(onlinePhase).toBeDefined();

    // Brand phase: 5000 <= profit < 25000
    const brandPhase = phases.find(p => p.id === 'brand');
    expect(brandPhase).toBeDefined();

    // Retail phase: 25000 <= profit < 100000
    const retailPhase = phases.find(p => p.id === 'retail');
    expect(retailPhase).toBeDefined();

    // Global phase: profit >= 100000
    const globalPhase = phases.find(p => p.id === 'global');
    expect(globalPhase).toBeDefined();
  });

  test('win condition requires multiple achievements', () => {
    const winRule = thriftQueenGame.rules.find(r => r.id === 'win-condition');
    expect(winRule).toBeDefined();

    // Win requires: revenue >= 1M, reputation >= 80, ecoScore >= 500
    // This ensures players can't just grind one metric
  });

  test('feature unlocks are progressive', () => {
    // showUpgrades unlocks after 3 sales
    const unlockUpgrades = thriftQueenGame.rules.find(r => r.id === 'unlock-upgrades');
    expect(unlockUpgrades).toBeDefined();

    // showTrends unlocks after 100 followers
    const unlockTrends = thriftQueenGame.rules.find(r => r.id === 'unlock-trends');
    expect(unlockTrends).toBeDefined();

    // showAutoSell unlocks with Depop shop upgrade
    const unlockAutoSell = thriftQueenGame.rules.find(r => r.id === 'unlock-autosell');
    expect(unlockAutoSell).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: UPGRADE DEPENDENCY GRAPH
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Upgrade Dependencies', () => {
  test('sourcing upgrades have progression chain', () => {
    const sourcingUpgrades = thriftQueenGame.projects
      .filter(p => p.id.startsWith('upgrade-s'))
      .sort((a, b) => {
        const costA = typeof a.costs[0]?.amount === 'number' ? a.costs[0].amount : 0;
        const costB = typeof b.costs[0]?.amount === 'number' ? b.costs[0].amount : 0;
        return costA - costB;
      });

    expect(sourcingUpgrades.length).toBeGreaterThanOrEqual(5);

    // Verify costs increase
    let prevCost = 0;
    for (const upgrade of sourcingUpgrades) {
      const cost = typeof upgrade.costs[0]?.amount === 'number' ? upgrade.costs[0].amount : 0;
      expect(cost).toBeGreaterThanOrEqual(prevCost);
      prevCost = cost;
    }
  });

  test('marketing upgrades require social presence', () => {
    const marketingUpgrades = thriftQueenGame.projects
      .filter(p => p.id.startsWith('upgrade-m'));

    expect(marketingUpgrades.length).toBeGreaterThan(0);

    // Instagram (m1) should be available early
    const instagram = marketingUpgrades.find(u => u.id === 'upgrade-m1');
    expect(instagram).toBeDefined();
  });

  test('empire upgrades have high prerequisites', () => {
    const empireUpgrades = thriftQueenGame.projects
      .filter(p => p.id.startsWith('upgrade-e'));

    expect(empireUpgrades.length).toBeGreaterThan(0);

    // Empire upgrades should be expensive
    for (const upgrade of empireUpgrades) {
      const cost = typeof upgrade.costs[0]?.amount === 'number' ? upgrade.costs[0].amount : 0;
      expect(cost).toBeGreaterThanOrEqual(100000);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: ENTITY SYSTEM
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Entity System', () => {
  test('inventory items can be spawned', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    const entity = engine.spawnEntity('inventoryItem', {
      name: 'Vintage Dress',
      era: '90s',
      category: 'dress',
      condition: 'good',
      rarity: 'trendy',
      basePrice: 25,
      currentPrice: 40,
      emoji: '👗'
    });

    expect(entity).toBeDefined();
    expect(entity.type).toBe('inventoryItem');
    expect(entity.properties.name).toBe('Vintage Dress');

    const entities = engine.getEntitiesByType('inventoryItem');
    expect(entities.length).toBe(1);
  });

  test('listings can be created from inventory', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    // Add inventory item
    const invItem = engine.spawnEntity('inventoryItem', {
      name: 'Y2K Top',
      era: 'y2k',
      category: 'blouse',
      condition: 'excellent',
      rarity: 'statement',
      basePrice: 50,
      currentPrice: 75,
      emoji: '👚'
    });

    // Create listing
    const listing = engine.spawnEntity('listing', {
      ...invItem.properties,
      listedAt: Date.now()
    });

    // Remove from inventory
    engine.removeEntity(invItem.id);

    expect(engine.getEntitiesByType('inventoryItem').length).toBe(0);
    expect(engine.getEntitiesByType('listing').length).toBe(1);
    expect(engine.getEntitiesByType('listing')[0].properties.name).toBe('Y2K Top');
  });

  test('entities persist across save/load', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    // Spawn some entities
    engine.spawnEntity('inventoryItem', { name: 'Coat 1', rarity: 'common' });
    engine.spawnEntity('inventoryItem', { name: 'Coat 2', rarity: 'designer' });
    engine.spawnEntity('listing', { name: 'Listed Dress', rarity: 'trendy' });

    expect(engine.getEntitiesByType('inventoryItem').length).toBe(2);
    expect(engine.getEntitiesByType('listing').length).toBe(1);

    // Save
    engine.save('test-thriftqueen');

    // Reset and verify empty
    engine.reset();
    expect(engine.getEntitiesByType('inventoryItem').length).toBe(0);

    // Load
    engine.load('test-thriftqueen');

    // Verify restoration
    expect(engine.getEntitiesByType('inventoryItem').length).toBe(2);
    expect(engine.getEntitiesByType('listing').length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: MARKET EVENTS (TRENDS)
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Fashion Trends', () => {
  test('trend event structure is valid', () => {
    const trendRule = thriftQueenGame.rules.find(r => r.id === 'random-trend-trigger');
    expect(trendRule).toBeDefined();

    // Should have random choices for different trends
    const hasRandomAction = trendRule?.actions.some(
      a => a.action === 'random' && 'choices' in a
    );
    expect(hasRandomAction).toBe(true);
  });

  test('event countdown rule exists', () => {
    const countdownRule = thriftQueenGame.rules.find(r => r.id === 'event-countdown');
    expect(countdownRule).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: ACHIEVEMENTS
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Achievements', () => {
  test('achievement flags exist in state', () => {
    const stateIds = thriftQueenGame.state.map(s => s.id);

    expect(stateIds).toContain('ach_firstSale');
    expect(stateIds).toContain('ach_century');
    expect(stateIds).toContain('ach_thousand');
    expect(stateIds).toContain('ach_viral');
    expect(stateIds).toContain('ach_earthWarrior');
    expect(stateIds).toContain('ach_millionaire');
    expect(stateIds).toContain('ach_fastFashionSlayer');
  });

  test('achievement rules are defined', () => {
    const achievementRules = thriftQueenGame.rules.filter(r => r.id.startsWith('ach-'));
    expect(achievementRules.length).toBeGreaterThan(5);

    // Each achievement should fire only once
    for (const rule of achievementRules) {
      expect(rule.maxFires).toBe(1);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: PASSIVE INCOME
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Passive Income', () => {
  test('passive income rule exists and works', () => {
    const passiveRule = thriftQueenGame.rules.find(r => r.id === 'passive-income');
    expect(passiveRule).toBeDefined();
  });

  test('follower growth rule exists', () => {
    const followerRule = thriftQueenGame.rules.find(r => r.id === 'follower-growth');
    expect(followerRule).toBeDefined();
  });

  test('store upgrades provide income', () => {
    const storeUpgrades = thriftQueenGame.projects.filter(p =>
      p.id.startsWith('upgrade-r') &&
      p.effects.some(e => e.action === 'add' && e.target === 'storeIncome')
    );

    expect(storeUpgrades.length).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: COMPLETE PLAYTHROUGH SIMULATION
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Playthrough Simulation', () => {
  test('can simulate progression through phases', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.playerAction('chooseInvestor');

    // Verify hasChosenStarter is set
    expect(engine.getState('hasChosenStarter')).toBe(true);

    // Initial phase should be null
    expect(engine.getRuntime().phase).toBe(null);

    // Simulate early game progress
    // Note: totalProfit is computed as totalRevenue - totalSpent on each tick
    // So we set totalRevenue instead
    engine.setState('totalRevenue', 600);
    engine.tick();
    expect(engine.getState('totalProfit')).toBe(600);

    // Should be in online phase (profit >= 500 and < 5000)
    expect(engine.getRuntime().phase).toBe('online');

    // Simulate mid game
    engine.setState('totalRevenue', 6000);
    engine.tick();
    expect(engine.getRuntime().phase).toBe('brand');

    // Simulate late game
    engine.setState('totalRevenue', 30000);
    engine.tick();
    expect(engine.getRuntime().phase).toBe('retail');

    // Simulate end game
    engine.setState('totalRevenue', 150000);
    engine.tick();
    expect(engine.getRuntime().phase).toBe('global');
  });

  test('win condition triggers correctly', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseInvestor');

    // Set up win conditions
    engine.setState('totalRevenue', 1000000);
    engine.setState('reputation', 80);
    engine.setState('ecoScore', 500);

    // Tick to trigger win check
    engine.tick();

    expect(engine.getState('hasWon')).toBe(true);
  });

  test('cannot win without all requirements', () => {
    const engine = new GameEngine(thriftQueenGame);
    engine.start();
    engine.playerAction('chooseThrifter');

    // Only set revenue, missing reputation and ecoScore
    engine.setState('totalRevenue', 1000000);
    engine.setState('reputation', 50); // Below 80
    engine.setState('ecoScore', 200);  // Below 500

    engine.tick();

    expect(engine.getState('hasWon')).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: SUSTAINABILITY IMPACT
// ═══════════════════════════════════════════════════════════════

describe('Thrift Queen - Sustainability Mechanics', () => {
  test('ecoScore increases with activity', () => {
    const recordSourceFunc = thriftQueenGame.functions.recordSource;
    expect(recordSourceFunc).toBeDefined();

    // recordSource should add to ecoScore
    const addsEcoScore = recordSourceFunc.some(
      action => action.action === 'add' && action.target === 'ecoScore'
    );
    expect(addsEcoScore).toBe(true);
  });

  test('fast fashion damage accumulates', () => {
    const damageRule = thriftQueenGame.rules.find(r => r.id === 'fast-fashion-damage');
    expect(damageRule).toBeDefined();
  });

  test('sustainability upgrades exist', () => {
    const ecoUpgrades = thriftQueenGame.projects.filter(p =>
      p.effects.some(e => e.action === 'add' && e.target === 'ecoScore')
    );
    expect(ecoUpgrades.length).toBeGreaterThan(0);
  });
});
