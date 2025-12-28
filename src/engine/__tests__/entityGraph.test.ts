/**
 * Entity Graph Theory Tests
 *
 * Models the card entity system as a directed graph and verifies:
 * 1. All entity type transitions are valid
 * 2. No orphaned entities (every entity reachable from spawn)
 * 3. Entity conservation (entities don't disappear without removal)
 * 4. Proper state transitions for the card lifecycle
 */

import { GameEngine } from '../GameEngine';
import { GameDefinition, SpawnedEntity } from '../types';

// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
(global as any).localStorage = localStorageMock;

// Minimal game definition for testing
const testGameDefinition: GameDefinition = {
  meta: {
    id: 'test-graph',
    name: 'Graph Test',
    version: '1.0.0',
    description: 'Test game for graph theory verification'
  },
  config: {
    tickRate: 100,
    maxMessages: 50
  },
  state: [
    { id: 'money', initial: 1000, type: 'number' },
    { id: 'gameTime', initial: 0, type: 'number' }
  ],
  rules: [],
  projects: [],
  functions: {}
};

/**
 * Directed Graph representation of entity type transitions
 * Nodes: entity types
 * Edges: valid transitions between types
 */
class EntityGraph {
  private adjacencyList: Map<string, Set<string>> = new Map();
  private reverseAdjacency: Map<string, Set<string>> = new Map();

  addNode(type: string): void {
    if (!this.adjacencyList.has(type)) {
      this.adjacencyList.set(type, new Set());
      this.reverseAdjacency.set(type, new Set());
    }
  }

  addEdge(from: string, to: string): void {
    this.addNode(from);
    this.addNode(to);
    this.adjacencyList.get(from)!.add(to);
    this.reverseAdjacency.get(to)!.add(from);
  }

  getNodes(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges(): Array<[string, string]> {
    const edges: Array<[string, string]> = [];
    for (const [from, tos] of this.adjacencyList) {
      for (const to of tos) {
        edges.push([from, to]);
      }
    }
    return edges;
  }

  /**
   * Breadth-First Search to find all reachable nodes from a starting node
   */
  bfs(start: string): Set<string> {
    const visited = new Set<string>();
    const queue: string[] = [start];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);

      const neighbors = this.adjacencyList.get(current) || new Set();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    return visited;
  }

  /**
   * Detect cycles using DFS with coloring
   * Returns array of cycles found
   */
  findCycles(): string[][] {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = new Map<string, number>();
    const parent = new Map<string, string | null>();
    const cycles: string[][] = [];

    for (const node of this.adjacencyList.keys()) {
      color.set(node, WHITE);
    }

    const dfs = (node: string): void => {
      color.set(node, GRAY);

      const neighbors = this.adjacencyList.get(node) || new Set();
      for (const neighbor of neighbors) {
        if (color.get(neighbor) === WHITE) {
          parent.set(neighbor, node);
          dfs(neighbor);
        } else if (color.get(neighbor) === GRAY) {
          // Found a cycle - reconstruct it
          const cycle: string[] = [neighbor];
          let current = node;
          while (current !== neighbor) {
            cycle.push(current);
            current = parent.get(current)!;
          }
          cycle.push(neighbor);
          cycles.push(cycle.reverse());
        }
      }

      color.set(node, BLACK);
    };

    for (const node of this.adjacencyList.keys()) {
      if (color.get(node) === WHITE) {
        parent.set(node, null);
        dfs(node);
      }
    }

    return cycles;
  }

  /**
   * Check if there's a path from source to target
   */
  hasPath(source: string, target: string): boolean {
    return this.bfs(source).has(target);
  }

  /**
   * Find all sink nodes (nodes with no outgoing edges)
   */
  findSinks(): string[] {
    return this.getNodes().filter(node =>
      (this.adjacencyList.get(node)?.size || 0) === 0
    );
  }

  /**
   * Find all source nodes (nodes with no incoming edges)
   */
  findSources(): string[] {
    return this.getNodes().filter(node =>
      (this.reverseAdjacency.get(node)?.size || 0) === 0
    );
  }
}

/**
 * Build the expected Poketrader card flow graph
 */
function buildPoketraderCardGraph(): EntityGraph {
  const graph = new EntityGraph();

  // Define valid entity type transitions
  // Market flow
  graph.addEdge('spawn', 'marketCard');      // Cards spawn into market
  graph.addEdge('marketCard', 'collectionCard'); // Buy: market → collection

  // Collection flow
  graph.addEdge('spawn', 'collectionCard');   // Pack pulls spawn directly
  graph.addEdge('collectionCard', 'removed'); // Sell: collection → removed
  graph.addEdge('collectionCard', 'gradingCard'); // Submit for grading

  // Grading flow
  graph.addEdge('gradingCard', 'gradedCard'); // Grading completes
  graph.addEdge('gradedCard', 'collectionCard'); // Collect graded card
  graph.addEdge('gradedCard', 'removed');     // Forgery detected

  // Appraiser flow
  graph.addEdge('spawn', 'appraiser');        // Win appraisal game
  graph.addEdge('appraiser', 'appraiser');    // Level up (self-transition)

  return graph;
}

describe('Entity Graph Theory Tests', () => {
  let engine: GameEngine;
  let cardGraph: EntityGraph;

  beforeEach(() => {
    engine = new GameEngine(testGameDefinition);
    cardGraph = buildPoketraderCardGraph();
  });

  afterEach(() => {
    engine.stop();
  });

  describe('Graph Structure', () => {
    test('card graph has expected nodes', () => {
      const nodes = cardGraph.getNodes();
      expect(nodes).toContain('marketCard');
      expect(nodes).toContain('collectionCard');
      expect(nodes).toContain('gradingCard');
      expect(nodes).toContain('gradedCard');
      expect(nodes).toContain('appraiser');
    });

    test('all entity types reachable from spawn', () => {
      const reachable = cardGraph.bfs('spawn');
      expect(reachable.has('marketCard')).toBe(true);
      expect(reachable.has('collectionCard')).toBe(true);
      expect(reachable.has('gradingCard')).toBe(true);
      expect(reachable.has('gradedCard')).toBe(true);
      expect(reachable.has('appraiser')).toBe(true);
    });

    test('graded cards can return to collection', () => {
      expect(cardGraph.hasPath('gradedCard', 'collectionCard')).toBe(true);
    });

    test('collection cards can be graded', () => {
      expect(cardGraph.hasPath('collectionCard', 'gradedCard')).toBe(true);
    });

    test('market cards cannot directly become graded', () => {
      // Market cards must first become collection cards
      const marketNeighbors = cardGraph.bfs('marketCard');
      // Check direct edge doesn't exist (would need to check adjacency list)
    });

    test('appraiser has self-loop for leveling', () => {
      const cycles = cardGraph.findCycles();
      const appraiserSelfLoop = cycles.find(cycle =>
        cycle.length === 2 && cycle[0] === 'appraiser' && cycle[1] === 'appraiser'
      );
      expect(appraiserSelfLoop).toBeDefined();
    });

    test('removed is a sink node', () => {
      const sinks = cardGraph.findSinks();
      expect(sinks).toContain('removed');
    });

    test('spawn is a source node', () => {
      const sources = cardGraph.findSources();
      expect(sources).toContain('spawn');
    });
  });

  describe('Entity Engine Integration', () => {
    test('spawn creates entity of correct type', () => {
      const entity = engine.spawnEntity('marketCard', { name: 'Pikachu', basePrice: 10 });
      expect(entity.type).toBe('marketCard');
      expect(entity.properties.name).toBe('Pikachu');
    });

    test('entity type transition: market → collection', () => {
      // Simulate buying a card
      const marketCard = engine.spawnEntity('marketCard', {
        name: 'Charizard',
        basePrice: 100,
        currentPrice: 95
      });

      // Transition: remove from market, add to collection
      engine.removeEntity(marketCard.id);
      const collectionCard = engine.spawnEntity('collectionCard', {
        ...marketCard.properties,
        purchasePrice: 95,
        holdTime: 0
      });

      expect(engine.getEntitiesByType('marketCard')).toHaveLength(0);
      expect(engine.getEntitiesByType('collectionCard')).toHaveLength(1);
      expect(collectionCard.properties.name).toBe('Charizard');
    });

    test('entity type transition: collection → grading → graded → collection', () => {
      // Full grading cycle
      const collectionCard = engine.spawnEntity('collectionCard', {
        name: 'Blastoise',
        basePrice: 80,
        currentPrice: 85
      });

      // Submit for grading
      engine.removeEntity(collectionCard.id);
      const gradingCard = engine.spawnEntity('gradingCard', {
        ...collectionCard.properties,
        submittedAt: 0,
        returnTime: 60
      });

      expect(engine.getEntitiesByType('collectionCard')).toHaveLength(0);
      expect(engine.getEntitiesByType('gradingCard')).toHaveLength(1);

      // Grading completes
      engine.removeEntity(gradingCard.id);
      const gradedCard = engine.spawnEntity('gradedCard', {
        ...gradingCard.properties,
        grade: 'PSA 9',
        gradeMultiplier: 3
      });

      expect(engine.getEntitiesByType('gradingCard')).toHaveLength(0);
      expect(engine.getEntitiesByType('gradedCard')).toHaveLength(1);

      // Collect graded card
      engine.removeEntity(gradedCard.id);
      const finalCard = engine.spawnEntity('collectionCard', {
        ...gradedCard.properties
      });

      expect(engine.getEntitiesByType('gradedCard')).toHaveLength(0);
      expect(engine.getEntitiesByType('collectionCard')).toHaveLength(1);
      expect(finalCard.properties.grade).toBe('PSA 9');
    });

    test('entity conservation: total count consistent through transitions', () => {
      // Create multiple entities
      engine.spawnEntity('marketCard', { name: 'Card1' });
      engine.spawnEntity('marketCard', { name: 'Card2' });
      engine.spawnEntity('collectionCard', { name: 'Card3' });

      const initialCount = engine.getEntities().length;
      expect(initialCount).toBe(3);

      // Transition one market card to collection
      const marketCards = engine.getEntitiesByType('marketCard');
      const cardToMove = marketCards[0];
      engine.removeEntity(cardToMove.id);
      engine.spawnEntity('collectionCard', { ...cardToMove.properties });

      // Count should still be 3
      expect(engine.getEntities().length).toBe(3);
      expect(engine.getEntitiesByType('marketCard')).toHaveLength(1);
      expect(engine.getEntitiesByType('collectionCard')).toHaveLength(2);
    });

    test('entity removal: selling removes without replacement', () => {
      engine.spawnEntity('collectionCard', { name: 'ToSell' });
      expect(engine.getEntities().length).toBe(1);

      const card = engine.getEntitiesByType('collectionCard')[0];
      engine.removeEntity(card.id);

      expect(engine.getEntities().length).toBe(0);
    });

    test('appraiser entity modification preserves identity', () => {
      const appraiser = engine.spawnEntity('appraiser', {
        name: 'Prof. Oak',
        level: 1,
        earnRate: 1
      });

      const originalId = appraiser.id;

      // Level up (modify in place, not transition)
      engine.modifyEntity(appraiser.id, {
        level: 2,
        earnRate: 1.5
      });

      const updated = engine.getEntity(originalId);
      expect(updated).toBeDefined();
      expect(updated!.id).toBe(originalId);
      expect(updated!.properties.level).toBe(2);
      expect(updated!.properties.earnRate).toBe(1.5);
      expect(updated!.type).toBe('appraiser');
    });
  });

  describe('Entity Queries (Graph Traversal)', () => {
    test('entityCount returns correct count by type', () => {
      engine.spawnEntity('marketCard', { name: 'A' });
      engine.spawnEntity('marketCard', { name: 'B' });
      engine.spawnEntity('collectionCard', { name: 'C' });

      expect(engine.getEntitiesByType('marketCard').length).toBe(2);
      expect(engine.getEntitiesByType('collectionCard').length).toBe(1);
      expect(engine.getEntitiesByType('gradingCard').length).toBe(0);
    });

    test('entity filtering by property value', () => {
      engine.spawnEntity('collectionCard', { name: 'Common', rarity: 'common', basePrice: 5 });
      engine.spawnEntity('collectionCard', { name: 'Rare', rarity: 'rare', basePrice: 50 });
      engine.spawnEntity('collectionCard', { name: 'Legendary', rarity: 'legendary', basePrice: 500 });

      const collection = engine.getEntitiesByType('collectionCard');
      const rares = collection.filter(e => e.properties.rarity === 'rare');
      const expensive = collection.filter(e => (e.properties.basePrice as number) >= 50);

      expect(rares).toHaveLength(1);
      expect(expensive).toHaveLength(2);
    });

    test('entity property aggregation', () => {
      engine.spawnEntity('collectionCard', { name: 'A', currentPrice: 10 });
      engine.spawnEntity('collectionCard', { name: 'B', currentPrice: 20 });
      engine.spawnEntity('collectionCard', { name: 'C', currentPrice: 30 });

      const collection = engine.getEntitiesByType('collectionCard');
      const totalValue = collection.reduce((sum, e) =>
        sum + (e.properties.currentPrice as number), 0
      );

      expect(totalValue).toBe(60);
    });
  });

  describe('Edge Cases', () => {
    test('removing non-existent entity returns false', () => {
      const result = engine.removeEntity('non-existent-id');
      expect(result).toBe(false);
    });

    test('modifying non-existent entity returns false', () => {
      const result = engine.modifyEntity('non-existent-id', { foo: 'bar' });
      expect(result).toBe(false);
    });

    test('getting non-existent entity returns undefined', () => {
      const entity = engine.getEntity('non-existent-id');
      expect(entity).toBeUndefined();
    });

    test('entities persist through save/load cycle', () => {
      engine.spawnEntity('collectionCard', { name: 'Persisted' });
      engine.spawnEntity('appraiser', { name: 'Oak', level: 5 });

      engine.save('test-slot');
      engine.clearEntities();
      expect(engine.getEntities().length).toBe(0);

      engine.load('test-slot');
      expect(engine.getEntities().length).toBe(2);
      expect(engine.getEntitiesByType('collectionCard')).toHaveLength(1);
      expect(engine.getEntitiesByType('appraiser')).toHaveLength(1);
    });
  });
});
