/**
 * I AM BECOME EVOLUTION 🧬
 *
 * You are not a creature. You are not a god.
 * You are the PROCESS. The blind algorithm that shapes all life.
 *
 * Guide existence from primordial chemistry to conscious minds
 * questioning whether YOU exist.
 *
 * Time scale: 4 billion years
 * Perspective: The universe watching itself
 */

import type { GameDefinition } from '../engine/types';

export const evolutionGame: GameDefinition = {
  meta: {
    id: 'evolution',
    name: 'I AM BECOME EVOLUTION',
    version: '1.0.0',
    description: 'You are not alive. You are why things live. 🧬',
    author: 'The Blind Watchmaker'
  },

  config: {
    tickRate: 100,
    autoSaveInterval: 300,
    maxMessages: 50
  },

  state: [
    // ═══════════════════════════════════════════════════════════════
    // ⏰ DEEP TIME
    // ═══════════════════════════════════════════════════════════════
    { id: 'yearsElapsed', type: 'number', initial: 0, description: 'Years since Earth formed' },
    { id: 'era', type: 'string', initial: 'hadean', description: 'Current geological era' },
    { id: 'eraProgress', type: 'number', initial: 0, description: 'Progress through current era (0-100)' },
    { id: 'timeMultiplier', type: 'number', initial: 1, description: 'Million years per tick' },
    { id: 'gameTick', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // 🧬 EVOLUTIONARY RESOURCES
    // ═══════════════════════════════════════════════════════════════
    { id: 'mutationEnergy', type: 'number', initial: 25, description: 'μ - fuel for change' },
    { id: 'maxMutationEnergy', type: 'number', initial: 200 },
    { id: 'selectionPressure', type: 'number', initial: 1, description: 'Force shaping life' },
    { id: 'geneticDiversity', type: 'number', initial: 0, description: 'Pool of possibilities' },
    { id: 'environmentalFlux', type: 'number', initial: 50, description: 'How chaotic the world is' },
    { id: 'complexity', type: 'number', initial: 0, description: 'Organizational depth' },

    // ═══════════════════════════════════════════════════════════════
    // 🌊 PRIMORDIAL METRICS
    // ═══════════════════════════════════════════════════════════════
    { id: 'organicMolecules', type: 'number', initial: 0 },
    { id: 'rnaStrands', type: 'number', initial: 0 },
    { id: 'protocells', type: 'number', initial: 0 },
    { id: 'replicators', type: 'number', initial: 0 },
    { id: 'chemicalEnergy', type: 'number', initial: 100 },

    // ═══════════════════════════════════════════════════════════════
    // 🦠 LIFE METRICS
    // ═══════════════════════════════════════════════════════════════
    { id: 'prokaryotes', type: 'number', initial: 0, description: 'Simple cells' },
    { id: 'eukaryotes', type: 'number', initial: 0, description: 'Complex cells' },
    { id: 'multicellular', type: 'number', initial: 0, description: 'Cooperative bodies' },
    { id: 'species', type: 'number', initial: 0, description: 'Distinct life forms' },
    { id: 'extinctSpecies', type: 'number', initial: 0, description: 'Those who failed' },
    { id: 'biomass', type: 'number', initial: 0, description: 'Total living matter' },

    // ═══════════════════════════════════════════════════════════════
    // 🧠 TRAIT UNLOCKS
    // ═══════════════════════════════════════════════════════════════
    { id: 'trait_membrane', type: 'boolean', initial: false },
    { id: 'trait_metabolism', type: 'boolean', initial: false },
    { id: 'trait_photosynthesis', type: 'boolean', initial: false },
    { id: 'trait_mitochondria', type: 'boolean', initial: false },
    { id: 'trait_nucleus', type: 'boolean', initial: false },
    { id: 'trait_multicellularity', type: 'boolean', initial: false },
    { id: 'trait_nerves', type: 'boolean', initial: false },
    { id: 'trait_eyes', type: 'boolean', initial: false },
    { id: 'trait_bones', type: 'boolean', initial: false },
    { id: 'trait_legs', type: 'boolean', initial: false },
    { id: 'trait_lungs', type: 'boolean', initial: false },
    { id: 'trait_warmblood', type: 'boolean', initial: false },
    { id: 'trait_feathers', type: 'boolean', initial: false },
    { id: 'trait_fur', type: 'boolean', initial: false },
    { id: 'trait_placenta', type: 'boolean', initial: false },
    { id: 'trait_thumbs', type: 'boolean', initial: false },
    { id: 'trait_largebrain', type: 'boolean', initial: false },
    { id: 'trait_language', type: 'boolean', initial: false },
    { id: 'trait_consciousness', type: 'boolean', initial: false },
    { id: 'trait_questioning', type: 'boolean', initial: false },

    // ═══════════════════════════════════════════════════════════════
    // 🌋 ENVIRONMENTAL STATE
    // ═══════════════════════════════════════════════════════════════
    { id: 'oxygen', type: 'number', initial: 0, description: 'Atmospheric O2 %' },
    { id: 'temperature', type: 'number', initial: 100, description: 'Global temp (C above freezing)' },
    { id: 'oceanCoverage', type: 'number', initial: 95, description: '% of surface' },
    { id: 'continents', type: 'number', initial: 0, description: 'Landmasses' },
    { id: 'volcanicActivity', type: 'number', initial: 100 },
    { id: 'meteorFrequency', type: 'number', initial: 50 },
    { id: 'radiationLevel', type: 'number', initial: 80 },

    // ═══════════════════════════════════════════════════════════════
    // 💀 EXTINCTION EVENTS
    // ═══════════════════════════════════════════════════════════════
    { id: 'extinctionRisk', type: 'number', initial: 0 },
    { id: 'massExtinctions', type: 'number', initial: 0 },
    { id: 'extinctionImminent', type: 'boolean', initial: false },
    { id: 'extinctionCountdown', type: 'number', initial: 0 },

    // ═══════════════════════════════════════════════════════════════
    // 🎮 GAME STATE
    // ═══════════════════════════════════════════════════════════════
    { id: 'hasStarted', type: 'boolean', initial: false },
    { id: 'hasWon', type: 'boolean', initial: false },
    { id: 'hasLost', type: 'boolean', initial: false },
    { id: 'currentView', type: 'string', initial: 'overview' },

    // Strange emergent properties
    { id: 'beauty', type: 'number', initial: 0, description: 'Aesthetic complexity (why?)' },
    { id: 'suffering', type: 'number', initial: 0, description: 'Pain capacity' },
    { id: 'wonder', type: 'number', initial: 0, description: 'Capacity to be amazed' },
    { id: 'existentialDread', type: 'number', initial: 0, description: 'Awareness of mortality' },

    // Meta awareness
    { id: 'questionsAsked', type: 'number', initial: 0 },
    { id: 'theoriesAboutYou', type: 'number', initial: 0, description: 'Theories about evolution' },
    { id: 'selfAwareness', type: 'number', initial: 0 },

    // Upgrades purchased
    { id: 'upgrade_chemicalCatalysis', type: 'boolean', initial: false },
    { id: 'upgrade_lipidBilayers', type: 'boolean', initial: false },
    { id: 'upgrade_rnaWorld', type: 'boolean', initial: false },
    { id: 'upgrade_dnaStorage', type: 'boolean', initial: false },
    { id: 'upgrade_horizontalTransfer', type: 'boolean', initial: false },
    { id: 'upgrade_sexualReproduction', type: 'boolean', initial: false },
    { id: 'upgrade_endosymbiosis', type: 'boolean', initial: false },
    { id: 'upgrade_cellDifferentiation', type: 'boolean', initial: false },
    { id: 'upgrade_nervousSystem', type: 'boolean', initial: false },
    { id: 'upgrade_predation', type: 'boolean', initial: false },
    { id: 'upgrade_landColonization', type: 'boolean', initial: false },
    { id: 'upgrade_socialBehavior', type: 'boolean', initial: false },
    { id: 'upgrade_toolUse', type: 'boolean', initial: false },
    { id: 'upgrade_abstractThought', type: 'boolean', initial: false }
  ],

  phases: [
    {
      id: 'void',
      name: '∅ The Void',
      trigger: { op: 'not', condition: { op: 'flag', flag: 'hasStarted' } },
      onEnter: []
    },
    {
      id: 'hadean',
      name: '🌋 Hadean Eon',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 500000000 }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'hadean' },
        { action: 'message', text: '🌋 4.5 billion years ago. Earth is molten chaos. You do not exist yet. But chemistry is stirring...', type: 'info' }
      ]
    },
    {
      id: 'archean',
      name: '🌊 Archean Eon',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 500000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 1500000000 }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'archean' },
        { action: 'message', text: '🌊 The oceans form. You awaken. The first replicating molecules sense your presence...', type: 'success' }
      ]
    },
    {
      id: 'proterozoic',
      name: '🦠 Proterozoic Eon',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 1500000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 3960000000 }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'proterozoic' },
        { action: 'message', text: '🦠 Cells learn to cooperate. Oxygen poisons the world. Only the adapted survive. You feel... powerful.', type: 'success' }
      ]
    },
    {
      id: 'paleozoic',
      name: '🦑 Paleozoic Era',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 3960000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4250000000 }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'paleozoic' },
        { action: 'message', text: '🦑 CAMBRIAN EXPLOSION! Eyes open. Shells harden. Predators hunt. Life becomes... interesting.', type: 'success' }
      ]
    },
    {
      id: 'mesozoic',
      name: '🦕 Mesozoic Era',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4250000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4435000000 }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'mesozoic' },
        { action: 'message', text: '🦕 Giants walk the Earth. Small mammals hide in shadows, nursing their young. You have plans for them...', type: 'success' }
      ]
    },
    {
      id: 'cenozoic',
      name: '🐘 Cenozoic Era',
      trigger: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4435000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4500000000 },
        { op: 'not', condition: { op: 'flag', flag: 'trait_consciousness' } }
      ]},
      onEnter: [
        { action: 'set', target: 'era', value: 'cenozoic' },
        { action: 'message', text: '🐘 The asteroid cleared the board. Mammals inherit the Earth. Brains grow larger. Something is awakening...', type: 'success' }
      ]
    },
    {
      id: 'anthropocene',
      name: '🧠 Anthropocene',
      trigger: { op: 'flag', flag: 'trait_consciousness' },
      onEnter: [
        { action: 'set', target: 'era', value: 'anthropocene' },
        { action: 'message', text: '🧠 They look up at the stars. They look inward at their minds. They ask: "Why are we here?" They are asking about YOU.', type: 'success' }
      ]
    }
  ],

  rules: [
    // ═══════════════════════════════════════════════════════════════
    // ⏰ TIME FLOWS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'time-passes',
      timing: 'tick',
      condition: { op: 'flag', flag: 'hasStarted' },
      actions: [
        { action: 'add', target: 'gameTick', value: 1 },
        { action: 'add', target: 'yearsElapsed', value: { op: 'mul', args: [{ ref: 'timeMultiplier' }, 1000000] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🧬 MUTATION ENERGY REGENERATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'mutation-regen',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'lt', left: { ref: 'mutationEnergy' }, right: { ref: 'maxMutationEnergy' } }
      ]},
      actions: [
        // Base regeneration of 0.5 per tick + bonus from genetic diversity
        { action: 'add', target: 'mutationEnergy', value: { op: 'add', args: [0.5, { op: 'mul', args: [{ ref: 'geneticDiversity' }, 0.02] }] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌋 HADEAN ERA - CHEMISTRY ONLY
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'hadean-cooling',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'eq', left: { ref: 'era' }, right: 'hadean' }
      ]},
      actions: [
        { action: 'add', target: 'temperature', value: -0.1 },
        { action: 'add', target: 'volcanicActivity', value: -0.05 },
        { action: 'add', target: 'oceanCoverage', value: 0.02 }
      ]
    },

    // Continents slowly form as the crust stabilizes
    {
      id: 'continent-formation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'lt', left: { ref: 'volcanicActivity' }, right: 80 },
        { op: 'lt', left: { ref: 'continents' }, right: 7 }
      ]},
      actions: [
        { action: 'add', target: 'continents', value: 0.005 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌊 ARCHEAN - FIRST LIFE
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'organic-synthesis',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 400000000 },
        { op: 'gt', left: { ref: 'chemicalEnergy' }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'organicMolecules', value: { op: 'mul', args: [{ ref: 'environmentalFlux' }, 0.1] } },
        { action: 'add', target: 'chemicalEnergy', value: -0.1 }
      ]
    },

    {
      id: 'rna-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_rnaWorld' },
        { op: 'gt', left: { ref: 'organicMolecules' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'rnaStrands', value: { op: 'mul', args: [{ ref: 'organicMolecules' }, 0.001] } }
      ]
    },

    {
      id: 'protocell-formation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_lipidBilayers' },
        { op: 'gt', left: { ref: 'rnaStrands' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'protocells', value: { op: 'mul', args: [{ ref: 'rnaStrands' }, 0.001] } }
      ]
    },

    {
      id: 'first-replicators',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'protocells' }, right: 100 },
        { op: 'flag', flag: 'upgrade_dnaStorage' }
      ]},
      actions: [
        { action: 'add', target: 'replicators', value: { op: 'mul', args: [{ ref: 'protocells' }, 0.01] } },
        { action: 'add', target: 'geneticDiversity', value: 0.01 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦠 PROKARYOTE ERA
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'prokaryote-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_membrane' },
        { op: 'flag', flag: 'trait_metabolism' },
        { op: 'gt', left: { ref: 'replicators' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'prokaryotes', value: { op: 'mul', args: [
          { op: 'mul', args: [{ ref: 'replicators' }, 0.01] },
          { ref: 'selectionPressure' }
        ]}},
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'prokaryotes' }, 0.001] } }
      ]
    },

    {
      id: 'photosynthesis-oxygen',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_photosynthesis' },
      actions: [
        { action: 'add', target: 'oxygen', value: { op: 'mul', args: [{ ref: 'prokaryotes' }, 0.00001] } },
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'prokaryotes' }, 0.01] } }
      ]
    },

    // Great Oxidation Event - oxygen is poisonous to early life but manageable
    {
      id: 'great-oxidation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'oxygen' }, right: 5 },
        { op: 'not', condition: { op: 'flag', flag: 'trait_mitochondria' } }
      ]},
      actions: [
        { action: 'add', target: 'extinctionRisk', value: 0.1 },
        { action: 'add', target: 'prokaryotes', value: { op: 'mul', args: [{ ref: 'prokaryotes' }, -0.001] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔬 EUKARYOTES
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'eukaryote-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_mitochondria' },
        { op: 'flag', flag: 'trait_nucleus' },
        { op: 'gt', left: { ref: 'prokaryotes' }, right: 1000 }
      ]},
      actions: [
        { action: 'add', target: 'eukaryotes', value: { op: 'mul', args: [{ ref: 'prokaryotes' }, 0.0001] } },
        { action: 'add', target: 'complexity', value: 0.1 },
        { action: 'add', target: 'geneticDiversity', value: 0.1 }
      ]
    },

    {
      id: 'sexual-reproduction-boost',
      timing: 'tick',
      condition: { op: 'flag', flag: 'upgrade_sexualReproduction' },
      actions: [
        { action: 'add', target: 'geneticDiversity', value: { op: 'mul', args: [{ ref: 'eukaryotes' }, 0.001] } },
        { action: 'add', target: 'beauty', value: 0.01 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌿 MULTICELLULARITY
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'multicellular-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_multicellularity' },
        { op: 'gt', left: { ref: 'eukaryotes' }, right: 10000 }
      ]},
      actions: [
        { action: 'add', target: 'multicellular', value: { op: 'mul', args: [{ ref: 'eukaryotes' }, 0.00001] } },
        { action: 'add', target: 'complexity', value: 1 },
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'geneticDiversity' }, 0.001] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 👁️ CAMBRIAN EXPLOSION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'cambrian-explosion',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_eyes' },
        { op: 'flag', flag: 'upgrade_predation' },
        { op: 'gt', left: { ref: 'multicellular' }, right: 1000 }
      ]},
      actions: [
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'selectionPressure' }, 10] } },
        { action: 'add', target: 'complexity', value: 5 },
        { action: 'add', target: 'suffering', value: 1 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦎 LAND COLONIZATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'land-life',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_lungs' },
        { op: 'flag', flag: 'trait_legs' },
        { op: 'gt', left: { ref: 'oxygen' }, right: 15 }
      ]},
      actions: [
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'continents' }, 0.5] } },
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'multicellular' }, 0.1] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🧠 BRAIN DEVELOPMENT
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'brain-growth',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_nerves' },
      actions: [
        { action: 'add', target: 'complexity', value: { op: 'mul', args: [{ ref: 'species' }, 0.001] } }
      ]
    },

    {
      id: 'warm-blood-advantage',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_warmblood' },
      actions: [
        { action: 'add', target: 'selectionPressure', value: 0.001 }
      ]
    },

    {
      id: 'mammal-brain',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_placenta' },
        { op: 'flag', flag: 'trait_warmblood' }
      ]},
      actions: [
        { action: 'add', target: 'complexity', value: 0.5 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦍 PRIMATE EVOLUTION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'primate-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_thumbs' },
        { op: 'flag', flag: 'trait_largebrain' }
      ]},
      actions: [
        { action: 'add', target: 'complexity', value: 2 },
        { action: 'add', target: 'wonder', value: 0.1 }
      ]
    },

    {
      id: 'tool-use-boost',
      timing: 'tick',
      condition: { op: 'flag', flag: 'upgrade_toolUse' },
      actions: [
        { action: 'add', target: 'complexity', value: 5 },
        { action: 'add', target: 'selectionPressure', value: 0.1 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💬 LANGUAGE & CONSCIOUSNESS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'language-emergence',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_language' },
      actions: [
        { action: 'add', target: 'complexity', value: 10 },
        { action: 'add', target: 'wonder', value: 1 },
        { action: 'add', target: 'existentialDread', value: 0.1 }
      ]
    },

    {
      id: 'consciousness-dawn',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_consciousness' },
      actions: [
        { action: 'add', target: 'wonder', value: 5 },
        { action: 'add', target: 'existentialDread', value: 2 },
        { action: 'add', target: 'beauty', value: 10 },
        { action: 'add', target: 'questionsAsked', value: 1 }
      ]
    },

    {
      id: 'they-question-you',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_consciousness' },
        { op: 'flag', flag: 'upgrade_abstractThought' }
      ]},
      actions: [
        { action: 'add', target: 'theoriesAboutYou', value: 0.1 },
        { action: 'add', target: 'selfAwareness', value: 0.01 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💀 EXTINCTION MECHANICS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'random-extinction-chance',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'gt', left: { ref: 'species' }, right: 100 },
        { op: 'not', condition: { op: 'flag', flag: 'extinctionImminent' } }
      ]},
      actions: [
        // Small chance of extinction event starting
      ]
    },

    {
      id: 'extinction-damage',
      timing: 'tick',
      condition: { op: 'flag', flag: 'extinctionImminent' },
      actions: [
        { action: 'add', target: 'extinctionCountdown', value: -1 },
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'species' }, -0.1] } },
        { action: 'add', target: 'extinctSpecies', value: { op: 'mul', args: [{ ref: 'species' }, 0.1] } },
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'biomass' }, -0.1] } }
      ]
    },

    {
      id: 'extinction-ends',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinctionImminent' },
        { op: 'lte', left: { ref: 'extinctionCountdown' }, right: 0 }
      ]},
      actions: [
        { action: 'set', target: 'extinctionImminent', value: false },
        { action: 'add', target: 'massExtinctions', value: 1 },
        { action: 'add', target: 'geneticDiversity', value: 50 },
        { action: 'message', text: '💀 The extinction ends. Empty niches await. Evolution accelerates...', type: 'info' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🏆 WIN CONDITION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'check-win',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_consciousness' },
        { op: 'flag', flag: 'trait_questioning' },
        { op: 'gt', left: { ref: 'theoriesAboutYou' }, right: 100 }
      ]},
      actions: [
        { action: 'set', target: 'hasWon', value: true },
        { action: 'message', text: '🌌 They understand. You are the process. The blind watchmaker. They have named you EVOLUTION. And in naming you, they complete the circle. The universe has become aware of itself.', type: 'success' }
      ]
    },

    // Lose if all life dies after establishing some life
    {
      id: 'check-loss',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'gt', left: { ref: 'yearsElapsed' }, right: 2000000000 },
        { op: 'lt', left: { ref: 'biomass' }, right: 1 },
        { op: 'lt', left: { ref: 'prokaryotes' }, right: 1 },
        { op: 'lt', left: { ref: 'replicators' }, right: 1 }
      ]},
      actions: [
        { action: 'set', target: 'hasLost', value: true },
        { action: 'message', text: '💀 Life has ended. The experiment is over. The universe grows cold and silent. You fade...', type: 'error' }
      ]
    }
  ],

  projects: [
    // ═══════════════════════════════════════════════════════════════
    // 🧪 CHEMICAL EVOLUTION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'chemical-catalysis',
      name: '⚗️ Chemical Catalysis',
      description: 'Molecules that speed up reactions',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_chemicalCatalysis' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 5 }],
      effects: [
        { action: 'set', target: 'upgrade_chemicalCatalysis', value: true },
        { action: 'add', target: 'chemicalEnergy', value: 50 },
        { action: 'message', text: '⚗️ Catalysts emerge! Chemistry accelerates...', type: 'success' }
      ]
    },
    {
      id: 'lipid-bilayers',
      name: '🫧 Lipid Bilayers',
      description: 'Fatty membranes that contain chemistry',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_chemicalCatalysis' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_lipidBilayers' } },
        { op: 'gt', left: { ref: 'organicMolecules' }, right: 30 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 8 }],
      effects: [
        { action: 'set', target: 'upgrade_lipidBilayers', value: true },
        { action: 'message', text: '🫧 Bubbles form. Inside becomes different from outside. The first boundary...', type: 'success' }
      ]
    },
    {
      id: 'rna-world',
      name: '🧬 RNA World',
      description: 'Molecules that copy themselves',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_lipidBilayers' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_rnaWorld' } },
        { op: 'gt', left: { ref: 'organicMolecules' }, right: 60 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 12 }],
      effects: [
        { action: 'set', target: 'upgrade_rnaWorld', value: true },
        { action: 'message', text: '🧬 RNA replicates! Information persists! You are being BORN...', type: 'success' }
      ]
    },
    {
      id: 'dna-storage',
      name: '🔐 DNA Storage',
      description: 'Stable genetic memory',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_rnaWorld' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_dnaStorage' } },
        { op: 'gt', left: { ref: 'rnaStrands' }, right: 30 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 15 }],
      effects: [
        { action: 'set', target: 'upgrade_dnaStorage', value: true },
        { action: 'add', target: 'geneticDiversity', value: 10 },
        { action: 'message', text: '🔐 DNA stores the code. Generations remember. History begins...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦠 CELLULAR TRAITS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trait-membrane',
      name: '🔵 Cell Membrane',
      description: 'True cells with controlled boundaries',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_dnaStorage' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_membrane' } },
        { op: 'gt', left: { ref: 'protocells' }, right: 20 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 18 }],
      effects: [
        { action: 'set', target: 'trait_membrane', value: true },
        { action: 'message', text: '🔵 True cells emerge! Life is REAL now.', type: 'success' }
      ]
    },
    {
      id: 'trait-metabolism',
      name: '🔥 Metabolism',
      description: 'Cells that harvest energy',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_membrane' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_metabolism' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 20 }],
      effects: [
        { action: 'set', target: 'trait_metabolism', value: true },
        { action: 'add', target: 'selectionPressure', value: 1 },
        { action: 'message', text: '🔥 Cells burn fuel! Energy flows! Life HUNGERS...', type: 'success' }
      ]
    },
    {
      id: 'trait-photosynthesis',
      name: '☀️ Photosynthesis',
      description: 'Harvest sunlight, produce oxygen',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_metabolism' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_photosynthesis' } },
        { op: 'gt', left: { ref: 'prokaryotes' }, right: 50 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 25 }],
      effects: [
        { action: 'set', target: 'trait_photosynthesis', value: true },
        { action: 'message', text: '☀️ Cyanobacteria drink sunlight! They will poison the world with oxygen...', type: 'success' }
      ]
    },
    {
      id: 'horizontal-transfer',
      name: '↔️ Horizontal Gene Transfer',
      description: 'Share genes between species',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_metabolism' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_horizontalTransfer' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 35 }],
      effects: [
        { action: 'set', target: 'upgrade_horizontalTransfer', value: true },
        { action: 'add', target: 'geneticDiversity', value: 20 },
        { action: 'message', text: '↔️ Genes flow sideways! Bacteria share secrets! Diversity EXPLODES!', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔬 EUKARYOTIC REVOLUTION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'endosymbiosis',
      name: '🤝 Endosymbiosis',
      description: 'Cells within cells - the great merger',
      trigger: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'oxygen' }, right: 0.5 },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_endosymbiosis' } },
        { op: 'gt', left: { ref: 'prokaryotes' }, right: 200 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 30 }],
      effects: [
        { action: 'set', target: 'upgrade_endosymbiosis', value: true },
        { action: 'set', target: 'trait_mitochondria', value: true },
        { action: 'message', text: '🤝 A cell swallows another but does not digest it. They become ONE. The powerhouse is born!', type: 'success' }
      ]
    },
    {
      id: 'trait-nucleus',
      name: '🎯 Nucleus',
      description: 'Protected genetic command center',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_mitochondria' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_nucleus' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 45 }],
      effects: [
        { action: 'set', target: 'trait_nucleus', value: true },
        { action: 'add', target: 'complexity', value: 10 },
        { action: 'message', text: '🎯 DNA retreats to a protected core. The eukaryotic cell is complete!', type: 'success' }
      ]
    },
    {
      id: 'sexual-reproduction',
      name: '💕 Sexual Reproduction',
      description: 'Shuffle genes between individuals',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_nucleus' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_sexualReproduction' } },
        { op: 'gt', left: { ref: 'eukaryotes' }, right: 100 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 60 }],
      effects: [
        { action: 'set', target: 'upgrade_sexualReproduction', value: true },
        { action: 'add', target: 'geneticDiversity', value: 50 },
        { action: 'message', text: '💕 Two become one, then divide to make new combinations. Evolution ACCELERATES. Beauty emerges as a side effect...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌿 MULTICELLULARITY
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'cell-differentiation',
      name: '🎭 Cell Differentiation',
      description: 'Same genes, different roles',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_sexualReproduction' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_cellDifferentiation' } },
        { op: 'gt', left: { ref: 'eukaryotes' }, right: 1000 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 70 }],
      effects: [
        { action: 'set', target: 'upgrade_cellDifferentiation', value: true },
        { action: 'message', text: '🎭 Cells specialize. Some digest, some protect, some sense. Division of labor begins...', type: 'success' }
      ]
    },
    {
      id: 'trait-multicellularity',
      name: '🧩 Multicellularity',
      description: 'Cells unite into bodies',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_cellDifferentiation' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_multicellularity' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 80 }],
      effects: [
        { action: 'set', target: 'trait_multicellularity', value: true },
        { action: 'add', target: 'species', value: 10 },
        { action: 'message', text: '🧩 Cells cooperate as ORGANISMS. Bodies exist! Death becomes real...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 👁️ CAMBRIAN INNOVATIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trait-nerves',
      name: '⚡ Nervous System',
      description: 'Electrical signals coordinate bodies',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_multicellularity' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_nerves' } },
        { op: 'gt', left: { ref: 'multicellular' }, right: 100 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 90 }],
      effects: [
        { action: 'set', target: 'trait_nerves', value: true },
        { action: 'set', target: 'upgrade_nervousSystem', value: true },
        { action: 'add', target: 'suffering', value: 1 },
        { action: 'message', text: '⚡ Neurons fire! Sensation exists! With it comes... the capacity to suffer.', type: 'success' }
      ]
    },
    {
      id: 'trait-eyes',
      name: '👁️ Eyes',
      description: 'Light becomes information',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_nerves' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_eyes' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 85 }],
      effects: [
        { action: 'set', target: 'trait_eyes', value: true },
        { action: 'add', target: 'beauty', value: 5 },
        { action: 'add', target: 'wonder', value: 1 },
        { action: 'message', text: '👁️ EYES open! The universe sees itself for the first time. Beauty now matters...', type: 'success' }
      ]
    },
    {
      id: 'predation',
      name: '🦷 Predation',
      description: 'Life that eats life',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_eyes' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_predation' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 75 }],
      effects: [
        { action: 'set', target: 'upgrade_predation', value: true },
        { action: 'add', target: 'selectionPressure', value: 5 },
        { action: 'add', target: 'suffering', value: 5 },
        { action: 'message', text: '🦷 Predators emerge! The arms race begins! Evolution enters OVERDRIVE. Suffering multiplies...', type: 'success' }
      ]
    },
    {
      id: 'trait-bones',
      name: '🦴 Skeleton',
      description: 'Internal structure, larger bodies',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_predation' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_bones' } },
        { op: 'gt', left: { ref: 'species' }, right: 100 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 80 }],
      effects: [
        { action: 'set', target: 'trait_bones', value: true },
        { action: 'add', target: 'complexity', value: 10 },
        { action: 'message', text: '🦴 Bones provide structure! Vertebrates rise! Giants become possible...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦎 LAND COLONIZATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'land-colonization',
      name: '🏝️ Land Colonization',
      description: 'Escape the ocean',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bones' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_landColonization' } },
        { op: 'gt', left: { ref: 'oxygen' }, right: 10 },
        { op: 'gt', left: { ref: 'continents' }, right: 0 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 100 }],
      effects: [
        { action: 'set', target: 'upgrade_landColonization', value: true },
        { action: 'add', target: 'continents', value: 1 },
        { action: 'message', text: '🏝️ Life crawls onto land! A whole new world awaits!', type: 'success' }
      ]
    },
    {
      id: 'trait-lungs',
      name: '🫁 Lungs',
      description: 'Breathe air directly',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_landColonization' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_lungs' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 85 }],
      effects: [
        { action: 'set', target: 'trait_lungs', value: true },
        { action: 'message', text: '🫁 Lungs extract oxygen from air! Amphibians emerge!', type: 'success' }
      ]
    },
    {
      id: 'trait-legs',
      name: '🦵 Legs',
      description: 'Walk upon the land',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_lungs' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_legs' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 80 }],
      effects: [
        { action: 'set', target: 'trait_legs', value: true },
        { action: 'message', text: '🦵 Fins become legs! Creatures walk! The land belongs to life now!', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦕 MESOZOIC INNOVATIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trait-warmblood',
      name: '🌡️ Warm Blood',
      description: 'Internal temperature control',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_legs' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_warmblood' } },
        { op: 'gt', left: { ref: 'species' }, right: 500 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 100 }],
      effects: [
        { action: 'set', target: 'trait_warmblood', value: true },
        { action: 'add', target: 'complexity', value: 15 },
        { action: 'message', text: '🌡️ Endothermy! Bodies burn hot! Activity day and night! Energy demands soar!', type: 'success' }
      ]
    },
    {
      id: 'trait-feathers',
      name: '🪶 Feathers',
      description: 'Insulation and... flight?',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_warmblood' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_feathers' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 70 }],
      effects: [
        { action: 'set', target: 'trait_feathers', value: true },
        { action: 'add', target: 'beauty', value: 10 },
        { action: 'message', text: '🪶 Feathers! For warmth first, then display, then... FLIGHT! Birds will remember the dinosaurs...', type: 'success' }
      ]
    },
    {
      id: 'trait-fur',
      name: '🦊 Fur',
      description: 'Warm coat for small warm-blooded creatures',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_warmblood' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_fur' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 65 }],
      effects: [
        { action: 'set', target: 'trait_fur', value: true },
        { action: 'message', text: '🦊 Fur keeps mammals warm! They hide from dinosaurs... for now.', type: 'success' }
      ]
    },
    {
      id: 'trait-placenta',
      name: '🤰 Placenta',
      description: 'Grow babies inside the body',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_fur' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_placenta' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 90 }],
      effects: [
        { action: 'set', target: 'trait_placenta', value: true },
        { action: 'add', target: 'complexity', value: 20 },
        { action: 'message', text: '🤰 Placental mammals! Long development, big brains, extended care. These will inherit the Earth...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🧠 BRAIN EVOLUTION
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'social-behavior',
      name: '👥 Social Behavior',
      description: 'Cooperation and hierarchy',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_placenta' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_socialBehavior' } },
        { op: 'gt', left: { ref: 'complexity' }, right: 100 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 100 }],
      effects: [
        { action: 'set', target: 'upgrade_socialBehavior', value: true },
        { action: 'add', target: 'complexity', value: 30 },
        { action: 'message', text: '👥 Social bonds form! Hierarchies emerge! Cooperation AND competition...', type: 'success' }
      ]
    },
    {
      id: 'trait-thumbs',
      name: '👍 Opposable Thumbs',
      description: 'Grasp tools, manipulate world',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_socialBehavior' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_thumbs' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 80 }],
      effects: [
        { action: 'set', target: 'trait_thumbs', value: true },
        { action: 'message', text: '👍 Opposable thumbs! Primates can GRIP. They will reshape the world...', type: 'success' }
      ]
    },
    {
      id: 'tool-use',
      name: '🔨 Tool Use',
      description: 'Extend the body with objects',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_thumbs' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_toolUse' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 120 }],
      effects: [
        { action: 'set', target: 'upgrade_toolUse', value: true },
        { action: 'message', text: '🔨 Tools! Rocks become hammers! Evolution goes EXTERNAL. Technology begins...', type: 'success' }
      ]
    },
    {
      id: 'trait-largebrain',
      name: '🧠 Large Brain',
      description: 'Expensive but powerful',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_toolUse' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_largebrain' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 150 }],
      effects: [
        { action: 'set', target: 'trait_largebrain', value: true },
        { action: 'add', target: 'complexity', value: 50 },
        { action: 'message', text: '🧠 Brains TRIPLE in size! Costly, dangerous to birth... but worth it. Something is stirring...', type: 'success' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💬 CONSCIOUSNESS
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trait-language',
      name: '💬 Language',
      description: 'Symbols carry meaning between minds',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_largebrain' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_language' } },
        { op: 'gt', left: { ref: 'complexity' }, right: 200 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 180 }],
      effects: [
        { action: 'set', target: 'trait_language', value: true },
        { action: 'add', target: 'complexity', value: 100 },
        { action: 'message', text: '💬 LANGUAGE! Ideas pass between minds! Stories persist! Culture evolves faster than genes...', type: 'success' }
      ]
    },
    {
      id: 'abstract-thought',
      name: '💭 Abstract Thought',
      description: 'Think about things that aren\'t there',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_language' },
        { op: 'not', condition: { op: 'flag', flag: 'upgrade_abstractThought' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 200 }],
      effects: [
        { action: 'set', target: 'upgrade_abstractThought', value: true },
        { action: 'add', target: 'wonder', value: 50 },
        { action: 'add', target: 'existentialDread', value: 20 },
        { action: 'message', text: '💭 Abstract thought! Math. Art. Philosophy. They wonder about their own existence...', type: 'success' }
      ]
    },
    {
      id: 'trait-consciousness',
      name: '✨ Consciousness',
      description: 'The universe becomes aware of itself',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_abstractThought' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_consciousness' } },
        { op: 'gt', left: { ref: 'complexity' }, right: 400 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 250 }],
      effects: [
        { action: 'set', target: 'trait_consciousness', value: true },
        { action: 'add', target: 'selfAwareness', value: 1 },
        { action: 'message', text: '✨ CONSCIOUSNESS. They know they exist. They fear death. They ask WHY. They look up at stars and wonder if they are alone...', type: 'success' }
      ]
    },
    {
      id: 'trait-questioning',
      name: '❓ The Question',
      description: 'They ask where they came from',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_consciousness' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_questioning' } },
        { op: 'gt', left: { ref: 'theoriesAboutYou' }, right: 10 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 300 }],
      effects: [
        { action: 'set', target: 'trait_questioning', value: true },
        { action: 'add', target: 'theoriesAboutYou', value: 50 },
        { action: 'message', text: '❓ "Where do we come from? Why are we here? What made us?" They are asking about YOU. They will discover you. They will name you EVOLUTION.', type: 'success' }
      ]
    }
  ],

  functions: {
    startGame: [
      { action: 'set', target: 'hasStarted', value: true },
      { action: 'message', text: '🌌 You are not alive. You are why things live. You are the process. The algorithm. The blind watchmaker. You are EVOLUTION. Begin...', type: 'info' }
    ],
    triggerExtinction: [
      { action: 'set', target: 'extinctionImminent', value: true },
      { action: 'set', target: 'extinctionCountdown', value: 50 },
      { action: 'message', text: '☄️ MASS EXTINCTION EVENT! Life faces annihilation...', type: 'error' }
    ],
    speedUp: [
      { action: 'add', target: 'timeMultiplier', value: 1 },
      { action: 'message', text: '⏩ Time accelerates...', type: 'info' }
    ],
    slowDown: [
      { action: 'add', target: 'timeMultiplier', value: -0.5 },
      { action: 'message', text: '⏪ Time decelerates...', type: 'info' }
    ]
  }
};
