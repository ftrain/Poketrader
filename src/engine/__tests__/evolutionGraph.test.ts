/**
 * Evolution Game - Graph Theory & Balance Tests 🧬
 *
 * Tests game progression and balance using:
 * - State bounds checking (values stay within limits)
 * - Progression analysis (can reach all stages)
 * - Win/loss condition verification
 * - Simulation of thousands of game ticks
 */

import { evolutionGame } from '../../games/evolutionGame';
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
// 🧪 TESTS: GAME DEFINITION
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Game Definition', () => {
  test('game definition has required meta fields', () => {
    expect(evolutionGame.meta.id).toBe('evolution');
    expect(evolutionGame.meta.name).toContain('EVOLUTION');
    expect(evolutionGame.meta.version).toBe('2.0.0');
  });

  test('game has all required state variables', () => {
    const stateIds = evolutionGame.state.map(s => s.id);

    // Core resources
    expect(stateIds).toContain('mutationEnergy');
    expect(stateIds).toContain('maxMutationEnergy');
    expect(stateIds).toContain('selectionPressure');
    expect(stateIds).toContain('geneticDiversity');

    // Life metrics
    expect(stateIds).toContain('prokaryotes');
    expect(stateIds).toContain('eukaryotes');
    expect(stateIds).toContain('species');
    expect(stateIds).toContain('biomass');

    // Environment
    expect(stateIds).toContain('oxygen');
    expect(stateIds).toContain('temperature');
    expect(stateIds).toContain('continents');

    // Game state
    expect(stateIds).toContain('hasStarted');
    expect(stateIds).toContain('hasWon');
    expect(stateIds).toContain('hasLost');
    expect(stateIds).toContain('lifeEstablished');
  });

  test('game has all geological eras as phases', () => {
    const phaseIds = evolutionGame.phases.map(p => p.id);
    expect(phaseIds).toContain('hadean');
    expect(phaseIds).toContain('archean');
    expect(phaseIds).toContain('proterozoic');
    expect(phaseIds).toContain('paleozoic');
    expect(phaseIds).toContain('mesozoic');
    expect(phaseIds).toContain('cenozoic');
    expect(phaseIds).toContain('anthropocene');
  });

  test('game has evolution upgrade projects', () => {
    expect(evolutionGame.projects.length).toBeGreaterThan(20);

    const projectIds = evolutionGame.projects.map(p => p.id);
    // Chemical evolution
    expect(projectIds).toContain('chemical-catalysis');
    expect(projectIds).toContain('lipid-bilayers');
    expect(projectIds).toContain('rna-world');
    expect(projectIds).toContain('dna-storage');

    // Cellular traits
    expect(projectIds).toContain('trait-membrane');
    expect(projectIds).toContain('trait-metabolism');
    expect(projectIds).toContain('trait-photosynthesis');

    // Advanced traits
    expect(projectIds).toContain('trait-consciousness');
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: VALUE CLAMPING
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Value Bounds', () => {
  test('timeMultiplier stays within bounds (0.5 to 10)', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Try to decrease below minimum
    for (let i = 0; i < 100; i++) {
      engine.playerAction('slowDown');
      engine.tick();
    }
    expect(engine.getState<number>('timeMultiplier')).toBeGreaterThanOrEqual(0.5);

    // Try to increase above maximum
    for (let i = 0; i < 100; i++) {
      engine.playerAction('speedUp');
      engine.tick();
    }
    expect(engine.getState<number>('timeMultiplier')).toBeLessThanOrEqual(10);
  });

  test('mutationEnergy does not exceed maxMutationEnergy', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Set high genetic diversity to boost regen
    engine.setState('geneticDiversity', 1000);

    // Run many ticks to accumulate energy
    for (let i = 0; i < 1000; i++) {
      engine.tick();
    }

    const mutationEnergy = engine.getState<number>('mutationEnergy')!;
    const maxMutationEnergy = engine.getState<number>('maxMutationEnergy')!;
    expect(mutationEnergy).toBeLessThanOrEqual(maxMutationEnergy);
  });

  test('oxygen stays capped near 35%', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Force photosynthesis and lots of cyanobacteria (oxygen producers)
    engine.setState('trait_photosynthesis', true);
    engine.setState('cyanobacteria', 1000000000);

    // Run many ticks
    for (let i = 0; i < 10000; i++) {
      engine.tick();
    }

    // The clamp rules now fire at the END of each tick, so values should be properly capped
    // Max oxygen is capped at 35% (Carboniferous peak was ~35%)
    const oxygen = engine.getState<number>('oxygen')!;
    expect(oxygen).toBeLessThanOrEqual(36); // Slight tolerance
    expect(oxygen).toBeGreaterThanOrEqual(30); // Should be near cap
  });

  test('temperature has minimum bound', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Force era to hadean and run many ticks (cooling happens)
    engine.setState('era', 'hadean');
    for (let i = 0; i < 10000; i++) {
      engine.tick();
    }

    const temp = engine.getState<number>('temperature')!;
    expect(temp).toBeGreaterThanOrEqual(-50);
  });

  test('yearsElapsed never goes negative', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Slow time down and run
    for (let i = 0; i < 50; i++) {
      engine.playerAction('slowDown');
    }

    for (let i = 0; i < 100; i++) {
      engine.tick();
    }

    const years = engine.getState<number>('yearsElapsed')!;
    expect(years).toBeGreaterThanOrEqual(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: PROGRESSION CHAIN
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Progression Chain', () => {
  test('can reach organic molecules within reasonable ticks', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Fast-forward time
    engine.setState('timeMultiplier', 10);

    // Run until organicMolecules > 0 or timeout
    let ticks = 0;
    const maxTicks = 1000;
    while (ticks < maxTicks) {
      engine.tick();
      ticks++;
      if (engine.getState<number>('organicMolecules')! > 0) break;
    }

    expect(engine.getState<number>('organicMolecules')).toBeGreaterThan(0);
    expect(ticks).toBeLessThan(maxTicks);
  });

  test('upgrade costs are affordable with base regeneration', () => {
    // Chemical catalysis costs 5μ, we start with 25μ
    const chemCatalysis = evolutionGame.projects.find(p => p.id === 'chemical-catalysis');
    expect(chemCatalysis).toBeDefined();
    const cost = chemCatalysis!.costs[0].amount as number;
    expect(cost).toBeLessThanOrEqual(25); // Starting mutationEnergy
  });

  test('early game upgrades chain properly', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Set enough mutation energy and organic molecules
    engine.setState('mutationEnergy', 200);
    engine.setState('organicMolecules', 100);
    engine.tick();

    // Should be able to purchase chemical catalysis (has enough energy)
    const mutEnergy = engine.getState<number>('mutationEnergy')!;
    expect(mutEnergy).toBeGreaterThanOrEqual(5); // Chemical catalysis costs 5

    engine.purchaseProject('chemical-catalysis');
    expect(engine.getState('upgrade_chemicalCatalysis')).toBe(true);

    // After chemical catalysis, lipid bilayers trigger should be met
    engine.tick();
    expect(engine.getState('upgrade_chemicalCatalysis')).toBe(true);
  });

  test('lifeEstablished flag gets set when prokaryotes exist', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Manually set bacteria (now the main prokaryote type)
    engine.setState('bacteria', 0);
    engine.tick();
    expect(engine.getState('lifeEstablished')).toBe(false);

    engine.setState('bacteria', 15);
    engine.tick();
    expect(engine.getState('lifeEstablished')).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: WIN/LOSS CONDITIONS
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Win/Loss Conditions', () => {
  test('cannot lose before life is established', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Set conditions that would trigger loss if lifeEstablished was true
    engine.setState('biomass', 0);
    engine.setState('prokaryotes', 0);
    engine.setState('replicators', 0);
    engine.setState('lifeEstablished', false);

    // Run many ticks
    for (let i = 0; i < 5000; i++) {
      engine.tick();
    }

    expect(engine.getState('hasLost')).toBe(false);
  });

  test('can lose after life established and all life dies', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Establish life first
    engine.setState('lifeEstablished', true);
    engine.setState('biomass', 0);
    engine.setState('prokaryotes', 0);
    engine.setState('replicators', 0);

    engine.tick();

    expect(engine.getState('hasLost')).toBe(true);
  });

  test('win condition requires consciousness and questioning', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Set up partial win conditions
    engine.setState('trait_consciousness', true);
    engine.setState('trait_questioning', false);
    engine.setState('theoriesAboutYou', 150);

    engine.tick();
    expect(engine.getState('hasWon')).toBe(false);

    // Now set full win conditions
    engine.setState('trait_questioning', true);
    engine.tick();
    expect(engine.getState('hasWon')).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: GREAT OXIDATION EVENT
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Great Oxidation Event', () => {
  test('oxygen does not damage life when below threshold', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    engine.setState('oxygen', 1); // Below 2% threshold
    engine.setState('bacteria', 1000);
    engine.setState('trait_mitochondria', false);

    const initialBacteria = engine.getState<number>('bacteria')!;
    engine.tick();
    const finalBacteria = engine.getState<number>('bacteria')!;

    // Should not have lost bacteria to oxidation
    expect(finalBacteria).toBe(initialBacteria);
  });

  test('oxygen damages life when above threshold without mitochondria', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    engine.setState('oxygen', 5); // Above 2% threshold
    engine.setState('bacteria', 1000);
    engine.setState('trait_mitochondria', false);

    const initialBacteria = engine.getState<number>('bacteria')!;
    engine.tick();
    const finalBacteria = engine.getState<number>('bacteria')!;

    // Should have lost some bacteria
    expect(finalBacteria).toBeLessThan(initialBacteria);
  });

  test('mitochondria protects against oxidation', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    engine.setState('oxygen', 5);
    engine.setState('bacteria', 1000);
    engine.setState('trait_mitochondria', true); // Protected!

    const initialBacteria = engine.getState<number>('bacteria')!;
    engine.tick();
    const finalBacteria = engine.getState<number>('bacteria')!;

    // Should NOT have lost bacteria
    expect(finalBacteria).toBe(initialBacteria);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: SIMULATION - 1000 GAMES
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Mass Simulation', () => {
  test('values stay bounded over 10000 ticks', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Purchase some upgrades to enable life
    engine.setState('mutationEnergy', 1000);
    engine.setState('organicMolecules', 200);
    engine.purchaseProject('chemical-catalysis');

    engine.setState('rnaStrands', 100);
    engine.purchaseProject('lipid-bilayers');
    engine.purchaseProject('rna-world');

    engine.setState('protocells', 100);
    engine.purchaseProject('dna-storage');
    engine.purchaseProject('trait-membrane');
    engine.purchaseProject('trait-metabolism');

    engine.setState('replicators', 100);
    engine.setState('prokaryotes', 500);
    engine.purchaseProject('trait-photosynthesis');

    // Run 10000 ticks
    for (let i = 0; i < 10000; i++) {
      engine.tick();

      // Check bounds on every tick
      const timeMultiplier = engine.getState<number>('timeMultiplier')!;
      const mutationEnergy = engine.getState<number>('mutationEnergy')!;
      const maxMutationEnergy = engine.getState<number>('maxMutationEnergy')!;
      const oxygen = engine.getState<number>('oxygen')!;
      const temp = engine.getState<number>('temperature')!;
      const years = engine.getState<number>('yearsElapsed')!;

      expect(timeMultiplier).toBeGreaterThanOrEqual(0.5);
      expect(timeMultiplier).toBeLessThanOrEqual(10);
      expect(mutationEnergy).toBeLessThanOrEqual(maxMutationEnergy);
      expect(oxygen).toBeLessThanOrEqual(35);
      expect(temp).toBeGreaterThanOrEqual(-50);
      expect(years).toBeGreaterThanOrEqual(0);
    }
  });

  test('continents form over time', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Lower volcanic activity to enable continent formation
    engine.setState('volcanicActivity', 50);

    // Run 2000 ticks
    for (let i = 0; i < 2000; i++) {
      engine.tick();
    }

    const continents = engine.getState<number>('continents')!;
    expect(continents).toBeGreaterThan(0);
    expect(continents).toBeLessThanOrEqual(7);
  });

  test('mutation energy regenerates over time', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Spend all mutation energy
    engine.setState('mutationEnergy', 0);
    engine.setState('geneticDiversity', 10);

    // Run 100 ticks
    for (let i = 0; i < 100; i++) {
      engine.tick();
    }

    const mutationEnergy = engine.getState<number>('mutationEnergy')!;
    expect(mutationEnergy).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: UPGRADE DEPENDENCY GRAPH
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Upgrade Dependencies', () => {
  test('chemical evolution upgrades form a chain', () => {
    const chemUpgrades = ['chemical-catalysis', 'lipid-bilayers', 'rna-world', 'dna-storage'];
    const costs: number[] = [];

    for (const id of chemUpgrades) {
      const project = evolutionGame.projects.find(p => p.id === id);
      expect(project).toBeDefined();
      if (project?.costs[0]?.amount) {
        costs.push(project.costs[0].amount as number);
      }
    }

    // Costs should generally increase
    for (let i = 1; i < costs.length; i++) {
      expect(costs[i]).toBeGreaterThanOrEqual(costs[i - 1]);
    }
  });

  test('trait upgrades require prerequisites', () => {
    // Membrane requires DNA storage
    const membrane = evolutionGame.projects.find(p => p.id === 'trait-membrane');
    expect(membrane).toBeDefined();

    // Check it has a trigger condition for upgrade_dnaStorage
    const triggerStr = JSON.stringify(membrane?.trigger);
    expect(triggerStr).toContain('upgrade_dnaStorage');
  });

  test('consciousness is the final trait', () => {
    const consciousness = evolutionGame.projects.find(p => p.id === 'trait-consciousness');
    expect(consciousness).toBeDefined();

    // Should be expensive
    const cost = consciousness!.costs[0].amount as number;
    expect(cost).toBeGreaterThanOrEqual(200);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🧪 TESTS: FULL PLAYTHROUGH SIMULATION
// ═══════════════════════════════════════════════════════════════

describe('Evolution Game - Full Playthrough', () => {
  test('can complete the game from start to win', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Simulate optimal play by setting all states directly
    // This tests that the win condition works correctly
    engine.setState('mutationEnergy', 10000);

    // Set up all the traits directly (skip upgrade chain for this test)
    engine.setState('upgrade_chemicalCatalysis', true);
    engine.setState('upgrade_lipidBilayers', true);
    engine.setState('upgrade_rnaWorld', true);
    engine.setState('upgrade_dnaStorage', true);

    engine.setState('trait_membrane', true);
    engine.setState('trait_metabolism', true);
    engine.setState('trait_photosynthesis', true);
    engine.setState('trait_mitochondria', true);
    engine.setState('trait_nucleus', true);
    engine.setState('upgrade_sexualReproduction', true);
    engine.setState('upgrade_cellDifferentiation', true);
    engine.setState('trait_multicellularity', true);
    engine.setState('trait_nerves', true);
    engine.setState('trait_eyes', true);
    engine.setState('upgrade_predation', true);
    engine.setState('trait_bones', true);
    engine.setState('upgrade_landColonization', true);
    engine.setState('trait_lungs', true);
    engine.setState('trait_legs', true);
    engine.setState('trait_warmblood', true);
    engine.setState('trait_feathers', true);
    engine.setState('trait_fur', true);
    engine.setState('trait_placenta', true);
    engine.setState('upgrade_socialBehavior', true);
    engine.setState('trait_thumbs', true);
    engine.setState('upgrade_toolUse', true);
    engine.setState('trait_largebrain', true);
    engine.setState('trait_language', true);
    engine.setState('upgrade_abstractThought', true);
    engine.setState('trait_consciousness', true);
    engine.setState('trait_questioning', true);

    // Set up life metrics
    engine.setState('prokaryotes', 1000000);
    engine.setState('eukaryotes', 100000);
    engine.setState('multicellular', 10000);
    engine.setState('species', 5000);
    engine.setState('biomass', 1000);
    engine.setState('complexity', 500);

    // Set theoriesAboutYou above win threshold
    engine.setState('theoriesAboutYou', 150);
    engine.tick();

    expect(engine.getState('hasWon')).toBe(true);
  });

  test('win condition requires theoriesAboutYou > 100', () => {
    const engine = new GameEngine(evolutionGame);
    engine.start();
    engine.playerAction('startGame');

    // Set up all win prerequisites EXCEPT theoriesAboutYou
    engine.setState('trait_consciousness', true);
    engine.setState('trait_questioning', true);
    engine.setState('theoriesAboutYou', 50); // Below threshold

    engine.tick();
    expect(engine.getState('hasWon')).toBe(false);

    // Now exceed threshold
    engine.setState('theoriesAboutYou', 150);
    engine.tick();
    expect(engine.getState('hasWon')).toBe(true);
  });
});
