/**
 * I AM BECOME EVOLUTION 🧬
 *
 * "Nothing in biology makes sense except in the light of evolution."
 *   — Theodosius Dobzhansky
 *
 * You are not a creature. You are not a god.
 * You are the PROCESS. The blind algorithm that shapes all life.
 *
 * Guide existence from primordial chemistry to conscious minds
 * questioning whether YOU exist.
 *
 * Time scale: 4 billion years
 * Perspective: The universe watching itself
 *
 * Reviewed by: Dr. Stephen Jay Gould (in spirit)
 * "Evolution is a bush, not a ladder."
 */

import type { GameDefinition } from '../engine/types';

export const evolutionGame: GameDefinition = {
  meta: {
    id: 'evolution',
    name: 'I AM BECOME EVOLUTION',
    version: '2.0.0',
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
    // ⏰ DEEP TIME - Geological timescale
    // ═══════════════════════════════════════════════════════════════
    { id: 'yearsElapsed', type: 'number', initial: 0, description: 'Years since Earth formed (4.5 Bya)' },
    { id: 'era', type: 'string', initial: 'hadean', description: 'Current geological era' },
    { id: 'period', type: 'string', initial: 'early_hadean', description: 'Specific geological period' },
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
    // 🌊 PRIMORDIAL CHEMISTRY - Abiogenesis
    // ═══════════════════════════════════════════════════════════════
    { id: 'organicMolecules', type: 'number', initial: 0, description: 'Amino acids, nucleotides' },
    { id: 'rnaStrands', type: 'number', initial: 0, description: 'Self-replicating RNA' },
    { id: 'protocells', type: 'number', initial: 0, description: 'Lipid vesicles with RNA' },
    { id: 'replicators', type: 'number', initial: 0, description: 'True self-replicators' },
    { id: 'chemicalEnergy', type: 'number', initial: 100, description: 'Geochemical energy sources' },

    // ═══════════════════════════════════════════════════════════════
    // 🌳 THREE DOMAINS OF LIFE (Woese, 1977)
    // ═══════════════════════════════════════════════════════════════
    { id: 'bacteria', type: 'number', initial: 0, description: 'Domain Bacteria - most prokaryotes' },
    { id: 'archaea', type: 'number', initial: 0, description: 'Domain Archaea - extremophiles, methanogens' },
    { id: 'eukarya', type: 'number', initial: 0, description: 'Domain Eukarya - cells with nuclei' },

    // Bacterial diversity
    { id: 'cyanobacteria', type: 'number', initial: 0, description: 'Blue-green algae - oxygen producers' },
    { id: 'extremophiles', type: 'number', initial: 0, description: 'Thermophiles, halophiles, acidophiles' },

    // Legacy metrics (for compatibility)
    { id: 'prokaryotes', type: 'number', initial: 0, description: 'All prokaryotes (bacteria + archaea)' },
    { id: 'eukaryotes', type: 'number', initial: 0, description: 'All eukaryotes' },

    // ═══════════════════════════════════════════════════════════════
    // 👑 KINGDOMS OF EUKARYA
    // ═══════════════════════════════════════════════════════════════
    { id: 'protista', type: 'number', initial: 0, description: 'Single-celled eukaryotes (amoeba, paramecium)' },
    { id: 'fungi', type: 'number', initial: 0, description: 'Decomposers - mushrooms, yeasts, molds' },
    { id: 'plantae', type: 'number', initial: 0, description: 'Photosynthetic eukaryotes' },
    { id: 'animalia', type: 'number', initial: 0, description: 'Multicellular heterotrophs' },

    // Plant lineages
    { id: 'algae', type: 'number', initial: 0, description: 'Aquatic photosynthesizers' },
    { id: 'bryophytes', type: 'number', initial: 0, description: 'Mosses, liverworts - first land plants' },
    { id: 'pteridophytes', type: 'number', initial: 0, description: 'Ferns, horsetails - vascular plants' },
    { id: 'gymnosperms', type: 'number', initial: 0, description: 'Conifers, cycads - naked seeds' },
    { id: 'angiosperms', type: 'number', initial: 0, description: 'Flowering plants - enclosed seeds' },

    // ═══════════════════════════════════════════════════════════════
    // 🦑 MAJOR ANIMAL PHYLA
    // ═══════════════════════════════════════════════════════════════
    { id: 'porifera', type: 'number', initial: 0, description: 'Sponges - simplest animals' },
    { id: 'cnidaria', type: 'number', initial: 0, description: 'Jellyfish, corals, anemones' },
    { id: 'platyhelminthes', type: 'number', initial: 0, description: 'Flatworms - bilateral symmetry' },
    { id: 'annelida', type: 'number', initial: 0, description: 'Segmented worms - earthworms, leeches' },
    { id: 'mollusca', type: 'number', initial: 0, description: 'Snails, clams, octopi, squid' },
    { id: 'arthropoda', type: 'number', initial: 0, description: 'Insects, crustaceans, arachnids' },
    { id: 'echinodermata', type: 'number', initial: 0, description: 'Starfish, sea urchins' },
    { id: 'chordata', type: 'number', initial: 0, description: 'Animals with notochords → vertebrates' },

    // Arthropod classes
    { id: 'trilobites', type: 'number', initial: 0, description: 'Ancient arthropods (EXTINCT after Permian)' },
    { id: 'insects', type: 'number', initial: 0, description: '6 legs, 3 body segments, wings' },
    { id: 'arachnids', type: 'number', initial: 0, description: 'Spiders, scorpions - 8 legs' },
    { id: 'crustaceans', type: 'number', initial: 0, description: 'Crabs, lobsters, shrimp' },

    // ═══════════════════════════════════════════════════════════════
    // 🐟 VERTEBRATE CLASSES (Phylum Chordata)
    // ═══════════════════════════════════════════════════════════════
    { id: 'agnatha', type: 'number', initial: 0, description: 'Jawless fish - lampreys, hagfish' },
    { id: 'placodermi', type: 'number', initial: 0, description: 'Armored fish (EXTINCT - Devonian)' },
    { id: 'chondrichthyes', type: 'number', initial: 0, description: 'Cartilaginous fish - sharks, rays' },
    { id: 'osteichthyes', type: 'number', initial: 0, description: 'Bony fish - most modern fish' },
    { id: 'amphibia', type: 'number', initial: 0, description: 'Frogs, salamanders - water to land' },
    { id: 'reptilia', type: 'number', initial: 0, description: 'Turtles, lizards, snakes, crocodiles' },
    { id: 'dinosauria', type: 'number', initial: 0, description: 'The terrible lizards (mostly EXTINCT)' },
    { id: 'aves', type: 'number', initial: 0, description: 'Birds - surviving dinosaurs' },
    { id: 'mammalia', type: 'number', initial: 0, description: 'Hair, milk, warm blood' },
    { id: 'primates', type: 'number', initial: 0, description: 'Forward eyes, grasping hands' },
    { id: 'hominidae', type: 'number', initial: 0, description: 'Great apes - humans, chimps, gorillas' },

    // General metrics
    { id: 'multicellular', type: 'number', initial: 0, description: 'Total multicellular organisms' },
    { id: 'species', type: 'number', initial: 0, description: 'Distinct species alive' },
    { id: 'extinctSpecies', type: 'number', initial: 0, description: 'Cumulative extinctions' },
    { id: 'biomass', type: 'number', initial: 0, description: 'Total living matter (gigatons)' },

    // ═══════════════════════════════════════════════════════════════
    // 🧠 TRAIT UNLOCKS - Major evolutionary innovations
    // ═══════════════════════════════════════════════════════════════
    // Cellular innovations
    { id: 'trait_membrane', type: 'boolean', initial: false, description: 'Cell membrane - inside vs outside' },
    { id: 'trait_metabolism', type: 'boolean', initial: false, description: 'Energy harvesting' },
    { id: 'trait_photosynthesis', type: 'boolean', initial: false, description: 'Light → energy' },
    { id: 'trait_chloroplast', type: 'boolean', initial: false, description: 'Endosymbiotic photosynthesis' },
    { id: 'trait_mitochondria', type: 'boolean', initial: false, description: 'The powerhouse' },
    { id: 'trait_nucleus', type: 'boolean', initial: false, description: 'Protected genome' },

    // Body plans
    { id: 'trait_multicellularity', type: 'boolean', initial: false, description: 'Cells cooperate' },
    { id: 'trait_bilateral', type: 'boolean', initial: false, description: 'Left-right symmetry' },
    { id: 'trait_coelom', type: 'boolean', initial: false, description: 'Body cavity' },
    { id: 'trait_segmentation', type: 'boolean', initial: false, description: 'Repeated body units' },

    // Sensory & nervous
    { id: 'trait_nerves', type: 'boolean', initial: false, description: 'Neural signaling' },
    { id: 'trait_brain', type: 'boolean', initial: false, description: 'Centralized processing' },
    { id: 'trait_eyes', type: 'boolean', initial: false, description: 'Light detection' },

    // Structural
    { id: 'trait_exoskeleton', type: 'boolean', initial: false, description: 'External skeleton' },
    { id: 'trait_shell', type: 'boolean', initial: false, description: 'Protective shell' },
    { id: 'trait_bones', type: 'boolean', initial: false, description: 'Internal skeleton' },
    { id: 'trait_jaws', type: 'boolean', initial: false, description: 'Hinged mouth' },
    { id: 'trait_teeth', type: 'boolean', initial: false, description: 'Specialized feeding' },

    // Land adaptations
    { id: 'trait_lungs', type: 'boolean', initial: false, description: 'Breathe air' },
    { id: 'trait_legs', type: 'boolean', initial: false, description: 'Walk on land' },
    { id: 'trait_amnioticEgg', type: 'boolean', initial: false, description: 'Eggs that survive on land' },

    // Thermoregulation
    { id: 'trait_warmblood', type: 'boolean', initial: false, description: 'Endothermy' },
    { id: 'trait_feathers', type: 'boolean', initial: false, description: 'Insulation → flight' },
    { id: 'trait_fur', type: 'boolean', initial: false, description: 'Mammalian insulation' },

    // Mammalian innovations
    { id: 'trait_milk', type: 'boolean', initial: false, description: 'Nurture young with body' },
    { id: 'trait_placenta', type: 'boolean', initial: false, description: 'Internal development' },
    { id: 'trait_neocortex', type: 'boolean', initial: false, description: 'New brain layer' },

    // Primate & human traits
    { id: 'trait_thumbs', type: 'boolean', initial: false, description: 'Opposable grip' },
    { id: 'trait_bipedal', type: 'boolean', initial: false, description: 'Walk upright' },
    { id: 'trait_largebrain', type: 'boolean', initial: false, description: 'Expanded cranium' },
    { id: 'trait_language', type: 'boolean', initial: false, description: 'Symbolic communication' },
    { id: 'trait_consciousness', type: 'boolean', initial: false, description: 'Self-awareness' },
    { id: 'trait_questioning', type: 'boolean', initial: false, description: 'Ask "why?"' },

    // ═══════════════════════════════════════════════════════════════
    // 🌋 ENVIRONMENTAL STATE
    // ═══════════════════════════════════════════════════════════════
    { id: 'oxygen', type: 'number', initial: 0, description: 'Atmospheric O2 %' },
    { id: 'co2', type: 'number', initial: 10, description: 'Atmospheric CO2 %' },
    { id: 'temperature', type: 'number', initial: 100, description: 'Global temp (C)' },
    { id: 'oceanCoverage', type: 'number', initial: 95, description: '% of surface' },
    { id: 'continents', type: 'number', initial: 0, description: 'Number of landmasses' },
    { id: 'volcanicActivity', type: 'number', initial: 100, description: 'Geological activity' },
    { id: 'meteorFrequency', type: 'number', initial: 50, description: 'Bombardment rate' },
    { id: 'radiationLevel', type: 'number', initial: 80, description: 'UV without ozone' },
    { id: 'ozoneLayer', type: 'number', initial: 0, description: 'UV protection (0-100)' },

    // ═══════════════════════════════════════════════════════════════
    // 💀 THE FIVE GREAT MASS EXTINCTIONS
    // ═══════════════════════════════════════════════════════════════
    { id: 'extinction_ordovician', type: 'boolean', initial: false, description: '445 Mya - 85% species' },
    { id: 'extinction_devonian', type: 'boolean', initial: false, description: '375 Mya - 75% species' },
    { id: 'extinction_permian', type: 'boolean', initial: false, description: '252 Mya - THE GREAT DYING 96%' },
    { id: 'extinction_triassic', type: 'boolean', initial: false, description: '201 Mya - 80% species' },
    { id: 'extinction_cretaceous', type: 'boolean', initial: false, description: '66 Mya - 76% species' },

    { id: 'extinctionRisk', type: 'number', initial: 0 },
    { id: 'massExtinctions', type: 'number', initial: 0 },
    { id: 'extinctionImminent', type: 'boolean', initial: false },
    { id: 'extinctionCountdown', type: 'number', initial: 0 },
    { id: 'currentExtinction', type: 'string', initial: '', description: 'Name of current extinction' },

    // ═══════════════════════════════════════════════════════════════
    // 🎮 GAME STATE
    // ═══════════════════════════════════════════════════════════════
    { id: 'hasStarted', type: 'boolean', initial: false },
    { id: 'hasWon', type: 'boolean', initial: false },
    { id: 'hasLost', type: 'boolean', initial: false },
    { id: 'lifeEstablished', type: 'boolean', initial: false, description: 'True once prokaryotes exist' },
    { id: 'currentView', type: 'string', initial: 'overview' },

    // Strange emergent properties
    { id: 'beauty', type: 'number', initial: 0, description: 'Aesthetic complexity' },
    { id: 'suffering', type: 'number', initial: 0, description: 'Pain capacity' },
    { id: 'wonder', type: 'number', initial: 0, description: 'Capacity to be amazed' },
    { id: 'existentialDread', type: 'number', initial: 0, description: 'Awareness of mortality' },

    // Meta awareness
    { id: 'questionsAsked', type: 'number', initial: 0 },
    { id: 'theoriesAboutYou', type: 'number', initial: 0, description: 'Theories about evolution' },
    { id: 'selfAwareness', type: 'number', initial: 0 },

    // Upgrades purchased (for tracking)
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
    { id: 'upgrade_flight', type: 'boolean', initial: false },
    { id: 'upgrade_socialBehavior', type: 'boolean', initial: false },
    { id: 'upgrade_toolUse', type: 'boolean', initial: false },
    { id: 'upgrade_fire', type: 'boolean', initial: false },
    { id: 'upgrade_abstractThought', type: 'boolean', initial: false },
    { id: 'upgrade_agriculture', type: 'boolean', initial: false },
    { id: 'upgrade_writing', type: 'boolean', initial: false },
    { id: 'upgrade_science', type: 'boolean', initial: false }
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
    // ⏰ TIME FLOWS - Slower pace for learning
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'time-passes',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'gt', left: { ref: 'timeMultiplier' }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'gameTick', value: 1 },
        // 100,000 years per tick at 1x speed (much slower for learning)
        // At 1x: ~75 minutes to reach present day
        // At 10x: ~7.5 minutes to reach present day
        { action: 'add', target: 'yearsElapsed', value: { op: 'mul', args: [{ ref: 'timeMultiplier' }, 100000] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔒 VALUE CLAMPING - Prevent runaway values
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'clamp-time-multiplier-min',
      timing: 'tick',
      condition: { op: 'lt', left: { ref: 'timeMultiplier' }, right: 0.5 },
      actions: [{ action: 'set', target: 'timeMultiplier', value: 0.5 }]
    },
    {
      id: 'clamp-time-multiplier-max',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'timeMultiplier' }, right: 10 },
      actions: [{ action: 'set', target: 'timeMultiplier', value: 10 }]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌳 DOMAIN SYNCHRONIZATION - Keep prokaryotes = bacteria + archaea
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'sync-prokaryotes',
      timing: 'tick',
      condition: { op: 'flag', flag: 'hasStarted' },
      actions: [
        { action: 'set', target: 'prokaryotes', value: { op: 'add', args: [{ ref: 'bacteria' }, { ref: 'archaea' }] } },
        { action: 'set', target: 'eukaryotes', value: { ref: 'eukarya' } }
      ]
    },

    // Ozone layer builds from oxygen
    {
      id: 'ozone-formation',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'oxygen' }, right: 1 },
      actions: [
        { action: 'set', target: 'ozoneLayer', value: { op: 'min', args: [{ op: 'mul', args: [{ ref: 'oxygen' }, 3] }, 100] } },
        { action: 'set', target: 'radiationLevel', value: { op: 'sub', args: [80, { ref: 'ozoneLayer' }] } }
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
        // Base regeneration of 0.5 per tick + small bonus from genetic diversity (capped via min)
        // Max bonus: 0.002 * 500 = 1.0, so max total = 1.5 per tick = 15/sec
        { action: 'add', target: 'mutationEnergy', value: { op: 'add', args: [
          0.5,
          { op: 'min', args: [{ op: 'mul', args: [{ ref: 'geneticDiversity' }, 0.002] }, 1.0] }
        ] } }
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
        { op: 'lt', left: { ref: 'continents' }, right: 6.9 }
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
        { op: 'gt', left: { ref: 'organicMolecules' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'rnaStrands', value: { op: 'mul', args: [{ ref: 'organicMolecules' }, 0.1] } }
      ]
    },

    {
      id: 'protocell-formation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_lipidBilayers' },
        { op: 'gt', left: { ref: 'rnaStrands' }, right: 20 }
      ]},
      actions: [
        { action: 'add', target: 'protocells', value: { op: 'mul', args: [{ ref: 'rnaStrands' }, 0.1] } }
      ]
    },

    {
      id: 'first-replicators',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'protocells' }, right: 30 },
        { op: 'flag', flag: 'upgrade_dnaStorage' }
      ]},
      actions: [
        { action: 'add', target: 'replicators', value: { op: 'mul', args: [{ ref: 'protocells' }, 0.1] } },
        { action: 'add', target: 'geneticDiversity', value: 0.1 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🦠 DOMAIN BACTERIA - Most common prokaryotes
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'bacteria-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_membrane' },
        { op: 'flag', flag: 'trait_metabolism' },
        { op: 'gt', left: { ref: 'replicators' }, right: 30 }
      ]},
      actions: [
        { action: 'add', target: 'bacteria', value: { op: 'mul', args: [
          { op: 'mul', args: [{ ref: 'replicators' }, 0.08] },
          { ref: 'selectionPressure' }
        ]}},
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'bacteria' }, 0.01] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔥 DOMAIN ARCHAEA - Extremophiles (Carl Woese discovered 1977)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'archaea-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_membrane' },
        { op: 'gt', left: { ref: 'replicators' }, right: 30 },
        { op: 'gt', left: { ref: 'temperature' }, right: 50 }
      ]},
      actions: [
        // Archaea thrive in extreme conditions - hot, acidic, salty
        { action: 'add', target: 'archaea', value: { op: 'mul', args: [{ ref: 'replicators' }, 0.02] } },
        { action: 'add', target: 'extremophiles', value: { op: 'mul', args: [{ ref: 'archaea' }, 0.1] } }
      ]
    },

    // Cyanobacteria (blue-green algae) - the oxygen producers
    {
      id: 'cyanobacteria-growth',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_photosynthesis' },
      actions: [
        { action: 'add', target: 'cyanobacteria', value: { op: 'mul', args: [{ ref: 'bacteria' }, 0.01] } }
      ]
    },

    // Mark life as established once bacteria exist
    {
      id: 'life-established',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'not', condition: { op: 'flag', flag: 'lifeEstablished' } },
        { op: 'gt', left: { ref: 'bacteria' }, right: 10 }
      ]},
      actions: [
        { action: 'set', target: 'lifeEstablished', value: true },
        { action: 'message', text: '🦠 LUCA EMERGES! The Last Universal Common Ancestor. All life descends from this moment...', type: 'success' }
      ]
    },

    {
      id: 'photosynthesis-oxygen',
      timing: 'tick',
      condition: { op: 'flag', flag: 'trait_photosynthesis' },
      actions: [
        // Cyanobacteria produce oxygen - THE GREAT OXYGENATION EVENT
        { action: 'add', target: 'oxygen', value: { op: 'min', args: [
          { op: 'mul', args: [{ ref: 'cyanobacteria' }, 0.00001] },
          0.05  // Max 0.05% per tick
        ] } },
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'cyanobacteria' }, 0.1] } }
      ]
    },

    // Great Oxidation Event (~2.4 Bya) - oxygen is poisonous to anaerobic life
    {
      id: 'great-oxidation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'oxygen' }, right: 2 },
        { op: 'not', condition: { op: 'flag', flag: 'trait_mitochondria' } }
      ]},
      actions: [
        // Anaerobic bacteria die, but aerobic bacteria thrive
        { action: 'add', target: 'bacteria', value: { op: 'mul', args: [{ ref: 'bacteria' }, -0.002] } },
        { action: 'add', target: 'extinctSpecies', value: 1 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔬 DOMAIN EUKARYA - Endosymbiosis creates complex cells
    // Lynn Margulis's revolutionary theory (1967)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'eukarya-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_mitochondria' },
        { op: 'flag', flag: 'trait_nucleus' },
        { op: 'gt', left: { ref: 'bacteria' }, right: 1000 }
      ]},
      actions: [
        // Eukarya: larger, more complex, slower reproduction
        { action: 'add', target: 'eukarya', value: { op: 'mul', args: [{ ref: 'bacteria' }, 0.0001] } },
        { action: 'add', target: 'protista', value: { op: 'mul', args: [{ ref: 'eukarya' }, 0.5] } },
        { action: 'add', target: 'complexity', value: 0.1 },
        { action: 'add', target: 'geneticDiversity', value: 0.1 }
      ]
    },

    // Chloroplasts - second endosymbiosis (cyanobacteria → algae)
    {
      id: 'chloroplast-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_chloroplast' },
        { op: 'gt', left: { ref: 'eukarya' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'algae', value: { op: 'mul', args: [{ ref: 'eukarya' }, 0.01] } },
        { action: 'add', target: 'plantae', value: { op: 'mul', args: [{ ref: 'algae' }, 0.1] } }
      ]
    },

    {
      id: 'sexual-reproduction-boost',
      timing: 'tick',
      condition: { op: 'flag', flag: 'upgrade_sexualReproduction' },
      actions: [
        { action: 'add', target: 'geneticDiversity', value: { op: 'mul', args: [{ ref: 'eukarya' }, 0.001] } },
        { action: 'add', target: 'beauty', value: 0.01 }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🍄 KINGDOM FUNGI - Decomposers emerge
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'fungi-emergence',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_multicellularity' },
        { op: 'gt', left: { ref: 'eukarya' }, right: 5000 }
      ]},
      actions: [
        { action: 'add', target: 'fungi', value: { op: 'mul', args: [{ ref: 'biomass' }, 0.0001] } }
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
    // 👁️ CAMBRIAN EXPLOSION - Animal Phyla Emerge (~540 Mya)
    // ═══════════════════════════════════════════════════════════════
    // Early speciation when nerves/eyes first appear
    {
      id: 'early-speciation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_nerves' },
        { op: 'gt', left: { ref: 'multicellular' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'species', value: 0.5 }
      ]
    },
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
    // 🧽 ANIMAL PHYLA - The Great Diversification
    // ═══════════════════════════════════════════════════════════════
    // Porifera (sponges) - first animals, no nerves, filter feeders
    {
      id: 'porifera-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_multicellularity' },
        { op: 'gt', left: { ref: 'multicellular' }, right: 500 }
      ]},
      actions: [
        { action: 'add', target: 'porifera', value: { op: 'mul', args: [{ ref: 'multicellular' }, 0.001] } },
        { action: 'add', target: 'animalia', value: { op: 'mul', args: [{ ref: 'porifera' }, 0.01] } }
      ]
    },

    // Cnidaria (jellyfish, corals) - first nerves, radial symmetry
    {
      id: 'cnidaria-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_nerves' },
        { op: 'gt', left: { ref: 'porifera' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'cnidaria', value: { op: 'mul', args: [{ ref: 'porifera' }, 0.01] } },
        { action: 'add', target: 'animalia', value: { op: 'mul', args: [{ ref: 'cnidaria' }, 0.01] } }
      ]
    },

    // Platyhelminthes (flatworms) - bilateral symmetry, cephalization
    {
      id: 'platyhelminthes-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bilateral' },
        { op: 'gt', left: { ref: 'cnidaria' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'platyhelminthes', value: { op: 'mul', args: [{ ref: 'cnidaria' }, 0.005] } }
      ]
    },

    // Annelida (segmented worms) - segmentation
    {
      id: 'annelida-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_segmentation' },
        { op: 'gt', left: { ref: 'platyhelminthes' }, right: 20 }
      ]},
      actions: [
        { action: 'add', target: 'annelida', value: { op: 'mul', args: [{ ref: 'platyhelminthes' }, 0.01] } }
      ]
    },

    // Mollusca (snails, clams, cephalopods) - shells, complex eyes
    {
      id: 'mollusca-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_shell' },
        { op: 'gt', left: { ref: 'annelida' }, right: 10 }
      ]},
      actions: [
        { action: 'add', target: 'mollusca', value: { op: 'mul', args: [{ ref: 'annelida' }, 0.02] } }
      ]
    },

    // Arthropoda (insects, crustaceans) - exoskeletons, jointed legs
    {
      id: 'arthropoda-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_exoskeleton' },
        { op: 'gt', left: { ref: 'annelida' }, right: 10 }
      ]},
      actions: [
        { action: 'add', target: 'arthropoda', value: { op: 'mul', args: [{ ref: 'annelida' }, 0.05] } },
        { action: 'add', target: 'trilobites', value: { op: 'mul', args: [{ ref: 'arthropoda' }, 0.1] } }
      ]
    },

    // Echinodermata (starfish, sea urchins) - radial symmetry as adults
    {
      id: 'echinodermata-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_coelom' },
        { op: 'gt', left: { ref: 'mollusca' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'echinodermata', value: { op: 'mul', args: [{ ref: 'mollusca' }, 0.01] } }
      ]
    },

    // Chordata - the vertebrate lineage begins
    {
      id: 'chordata-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bones' },
        { op: 'gt', left: { ref: 'echinodermata' }, right: 20 }
      ]},
      actions: [
        { action: 'add', target: 'chordata', value: { op: 'mul', args: [{ ref: 'echinodermata' }, 0.005] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🐟 VERTEBRATE EVOLUTION - The Fish to Human Journey
    // ═══════════════════════════════════════════════════════════════
    // Agnatha - jawless fish (lampreys, hagfish) - first vertebrates
    {
      id: 'agnatha-growth',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'chordata' }, right: 50 },
      actions: [
        { action: 'add', target: 'agnatha', value: { op: 'mul', args: [{ ref: 'chordata' }, 0.01] } }
      ]
    },

    // Placodermi - armored fish with jaws (Devonian, now extinct)
    {
      id: 'placodermi-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_jaws' },
        { op: 'gt', left: { ref: 'agnatha' }, right: 100 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_devonian' } }
      ]},
      actions: [
        { action: 'add', target: 'placodermi', value: { op: 'mul', args: [{ ref: 'agnatha' }, 0.02] } }
      ]
    },

    // Chondrichthyes - cartilaginous fish (sharks, rays)
    {
      id: 'chondrichthyes-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_jaws' },
        { op: 'gt', left: { ref: 'agnatha' }, right: 200 }
      ]},
      actions: [
        { action: 'add', target: 'chondrichthyes', value: { op: 'mul', args: [{ ref: 'agnatha' }, 0.01] } }
      ]
    },

    // Osteichthyes - bony fish (most modern fish)
    {
      id: 'osteichthyes-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bones' },
        { op: 'gt', left: { ref: 'chondrichthyes' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'osteichthyes', value: { op: 'mul', args: [{ ref: 'chondrichthyes' }, 0.05] } }
      ]
    },

    // Amphibia - first land vertebrates
    {
      id: 'amphibia-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_lungs' },
        { op: 'flag', flag: 'trait_legs' },
        { op: 'gt', left: { ref: 'osteichthyes' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'amphibia', value: { op: 'mul', args: [{ ref: 'osteichthyes' }, 0.001] } }
      ]
    },

    // Reptilia - amniotes, true land dwellers
    {
      id: 'reptilia-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_amnioticEgg' },
        { op: 'gt', left: { ref: 'amphibia' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'reptilia', value: { op: 'mul', args: [{ ref: 'amphibia' }, 0.01] } }
      ]
    },

    // Dinosauria - the terrible lizards dominate the Mesozoic
    {
      id: 'dinosauria-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'reptilia' }, right: 100 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_cretaceous' } }
      ]},
      actions: [
        { action: 'add', target: 'dinosauria', value: { op: 'mul', args: [{ ref: 'reptilia' }, 0.02] } }
      ]
    },

    // Aves - birds, the surviving dinosaurs
    {
      id: 'aves-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_feathers' },
        { op: 'gt', left: { ref: 'dinosauria' }, right: 50 }
      ]},
      actions: [
        { action: 'add', target: 'aves', value: { op: 'mul', args: [{ ref: 'dinosauria' }, 0.005] } }
      ]
    },

    // Mammalia - warm-blooded, fur, milk (slow growth while dinosaurs dominate)
    {
      id: 'mammalia-growth-slow',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_fur' },
        { op: 'flag', flag: 'trait_milk' },
        { op: 'gt', left: { ref: 'reptilia' }, right: 100 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_cretaceous' } }
      ]},
      actions: [
        // Mammals are small and rare while dinosaurs dominate
        { action: 'add', target: 'mammalia', value: { op: 'mul', args: [{ ref: 'reptilia' }, 0.001] } }
      ]
    },

    // Primates - forward eyes, grasping hands
    {
      id: 'primates-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_placenta' },
        { op: 'flag', flag: 'extinction_cretaceous' },
        { op: 'gt', left: { ref: 'mammalia' }, right: 500 }
      ]},
      actions: [
        { action: 'add', target: 'primates', value: { op: 'mul', args: [{ ref: 'mammalia' }, 0.0001] } }
      ]
    },

    // Hominidae - great apes
    {
      id: 'hominidae-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_thumbs' },
        { op: 'gt', left: { ref: 'primates' }, right: 100 }
      ]},
      actions: [
        { action: 'add', target: 'hominidae', value: { op: 'mul', args: [{ ref: 'primates' }, 0.001] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🐛 ARTHROPOD DIVERSIFICATION
    // ═══════════════════════════════════════════════════════════════
    // Insects - most diverse group on Earth
    {
      id: 'insects-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_landColonization' },
        { op: 'gt', left: { ref: 'arthropoda' }, right: 500 }
      ]},
      actions: [
        { action: 'add', target: 'insects', value: { op: 'mul', args: [{ ref: 'arthropoda' }, 0.01] } }
      ]
    },

    // Arachnids - spiders, scorpions
    {
      id: 'arachnids-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_landColonization' },
        { op: 'gt', left: { ref: 'arthropoda' }, right: 300 }
      ]},
      actions: [
        { action: 'add', target: 'arachnids', value: { op: 'mul', args: [{ ref: 'arthropoda' }, 0.002] } }
      ]
    },

    // Crustaceans - crabs, lobsters, shrimp (stay in water)
    {
      id: 'crustaceans-growth',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'arthropoda' }, right: 200 },
      actions: [
        { action: 'add', target: 'crustaceans', value: { op: 'mul', args: [{ ref: 'arthropoda' }, 0.005] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🌿 PLANT EVOLUTION - Colonizing the Land
    // ═══════════════════════════════════════════════════════════════
    // Bryophytes (mosses) - first land plants, no vascular tissue
    {
      id: 'bryophytes-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_landColonization' },
        { op: 'gt', left: { ref: 'algae' }, right: 1000 }
      ]},
      actions: [
        { action: 'add', target: 'bryophytes', value: { op: 'mul', args: [{ ref: 'algae' }, 0.0001] } },
        { action: 'add', target: 'plantae', value: { op: 'mul', args: [{ ref: 'bryophytes' }, 0.1] } }
      ]
    },

    // Pteridophytes (ferns) - vascular plants, Carboniferous forests
    {
      id: 'pteridophytes-growth',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'bryophytes' }, right: 500 },
      actions: [
        { action: 'add', target: 'pteridophytes', value: { op: 'mul', args: [{ ref: 'bryophytes' }, 0.01] } },
        // Carboniferous forests → coal → future energy
        { action: 'add', target: 'biomass', value: { op: 'mul', args: [{ ref: 'pteridophytes' }, 0.1] } }
      ]
    },

    // Gymnosperms (conifers) - naked seeds, drought resistant
    {
      id: 'gymnosperms-growth',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'pteridophytes' }, right: 200 },
      actions: [
        { action: 'add', target: 'gymnosperms', value: { op: 'mul', args: [{ ref: 'pteridophytes' }, 0.005] } }
      ]
    },

    // Angiosperms (flowering plants) - co-evolve with insects
    {
      id: 'angiosperms-growth',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gt', left: { ref: 'gymnosperms' }, right: 100 },
        { op: 'gt', left: { ref: 'insects' }, right: 500 }
      ]},
      actions: [
        { action: 'add', target: 'angiosperms', value: { op: 'mul', args: [{ ref: 'gymnosperms' }, 0.01] } },
        { action: 'add', target: 'beauty', value: { op: 'mul', args: [{ ref: 'angiosperms' }, 0.001] } }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 💀 THE FIVE GREAT MASS EXTINCTIONS - Historical Triggers
    // ═══════════════════════════════════════════════════════════════
    // 1. End-Ordovician (445 Mya / 4.055 Bya elapsed) - 85% species
    // Cause: Glaciation, sea level drop
    {
      id: 'extinction-ordovician-trigger',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4055000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4060000000 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_ordovician' } },
        { op: 'gt', left: { ref: 'species' }, right: 100 }
      ]},
      actions: [
        { action: 'set', target: 'extinction_ordovician', value: true },
        { action: 'set', target: 'currentExtinction', value: 'End-Ordovician' },
        { action: 'add', target: 'temperature', value: -20 },
        { action: 'message', text: '🧊 END-ORDOVICIAN EXTINCTION! Ice sheets spread. Sea levels plummet. 85% of marine species perish in the cold...', type: 'error' }
      ]
    },
    {
      id: 'extinction-ordovician-effects',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_ordovician' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4070000000 }
      ]},
      actions: [
        // Trilobites hit hard but survive
        { action: 'add', target: 'trilobites', value: { op: 'mul', args: [{ ref: 'trilobites' }, -0.03] } },
        { action: 'add', target: 'mollusca', value: { op: 'mul', args: [{ ref: 'mollusca' }, -0.02] } },
        { action: 'add', target: 'extinctSpecies', value: 5 }
      ]
    },

    // 2. Late Devonian (375 Mya / 4.125 Bya elapsed) - 75% species
    // Cause: Ocean anoxia, possibly asteroid
    {
      id: 'extinction-devonian-trigger',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4125000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4130000000 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_devonian' } },
        { op: 'gt', left: { ref: 'species' }, right: 200 }
      ]},
      actions: [
        { action: 'set', target: 'extinction_devonian', value: true },
        { action: 'set', target: 'currentExtinction', value: 'Late Devonian' },
        { action: 'add', target: 'oxygen', value: -5 },
        { action: 'message', text: '🌊 LATE DEVONIAN EXTINCTION! Oceans lose oxygen. The Age of Fishes ends. Armored fish vanish forever...', type: 'error' }
      ]
    },
    {
      id: 'extinction-devonian-effects',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_devonian' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4140000000 }
      ]},
      actions: [
        // Placodermi (armored fish) go COMPLETELY extinct
        { action: 'add', target: 'placodermi', value: { op: 'mul', args: [{ ref: 'placodermi' }, -0.2] } },
        { action: 'add', target: 'trilobites', value: { op: 'mul', args: [{ ref: 'trilobites' }, -0.05] } },
        { action: 'add', target: 'extinctSpecies', value: 8 }
      ]
    },

    // 3. End-Permian (252 Mya / 4.248 Bya elapsed) - THE GREAT DYING - 96% species
    // Cause: Siberian Traps volcanism, ocean acidification
    {
      id: 'extinction-permian-trigger',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4248000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4253000000 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_permian' } },
        { op: 'gt', left: { ref: 'species' }, right: 500 }
      ]},
      actions: [
        { action: 'set', target: 'extinction_permian', value: true },
        { action: 'set', target: 'currentExtinction', value: 'The Great Dying' },
        { action: 'add', target: 'volcanicActivity', value: 50 },
        { action: 'add', target: 'temperature', value: 10 },
        { action: 'add', target: 'co2', value: 5 },
        { action: 'message', text: '🌋 THE GREAT DYING! Siberian volcanism poisons the world. 96% of species vanish. Life nearly ends...', type: 'error' }
      ]
    },
    {
      id: 'extinction-permian-effects',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_permian' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4260000000 }
      ]},
      actions: [
        // Trilobites finally go COMPLETELY extinct after 300 million years
        { action: 'set', target: 'trilobites', value: 0 },
        // Most marine life devastated
        { action: 'add', target: 'mollusca', value: { op: 'mul', args: [{ ref: 'mollusca' }, -0.15] } },
        { action: 'add', target: 'echinodermata', value: { op: 'mul', args: [{ ref: 'echinodermata' }, -0.1] } },
        { action: 'add', target: 'arthropoda', value: { op: 'mul', args: [{ ref: 'arthropoda' }, -0.1] } },
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'species' }, -0.05] } },
        { action: 'add', target: 'extinctSpecies', value: 20 }
      ]
    },

    // 4. End-Triassic (201 Mya / 4.299 Bya elapsed) - 80% species
    // Cause: CAMP volcanism, rising CO2
    {
      id: 'extinction-triassic-trigger',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4299000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4304000000 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_triassic' } },
        { op: 'gt', left: { ref: 'species' }, right: 300 }
      ]},
      actions: [
        { action: 'set', target: 'extinction_triassic', value: true },
        { action: 'set', target: 'currentExtinction', value: 'End-Triassic' },
        { action: 'add', target: 'co2', value: 3 },
        { action: 'message', text: '🔥 END-TRIASSIC EXTINCTION! Volcanic CO2 heats the world. Large amphibians vanish. Dinosaurs inherit the Earth...', type: 'error' }
      ]
    },
    {
      id: 'extinction-triassic-effects',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_triassic' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4310000000 }
      ]},
      actions: [
        { action: 'add', target: 'amphibia', value: { op: 'mul', args: [{ ref: 'amphibia' }, -0.08] } },
        { action: 'add', target: 'extinctSpecies', value: 10 },
        // Dinosaurs benefit - less competition
        { action: 'add', target: 'dinosauria', value: { op: 'mul', args: [{ ref: 'dinosauria' }, 0.05] } }
      ]
    },

    // 5. End-Cretaceous (66 Mya / 4.434 Bya elapsed) - 76% species
    // Cause: Chicxulub asteroid impact
    {
      id: 'extinction-cretaceous-trigger',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4434000000 },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4439000000 },
        { op: 'not', condition: { op: 'flag', flag: 'extinction_cretaceous' } },
        { op: 'gt', left: { ref: 'dinosauria' }, right: 100 }
      ]},
      actions: [
        { action: 'set', target: 'extinction_cretaceous', value: true },
        { action: 'set', target: 'currentExtinction', value: 'Chicxulub Impact' },
        { action: 'add', target: 'meteorFrequency', value: 100 },
        { action: 'add', target: 'temperature', value: -15 },
        { action: 'message', text: '☄️ CHICXULUB IMPACT! A 10km asteroid strikes. Darkness covers Earth. The dinosaurs\' 165 million year reign ends in fire and ice...', type: 'error' }
      ]
    },
    {
      id: 'extinction-cretaceous-effects',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_cretaceous' },
        { op: 'lt', left: { ref: 'yearsElapsed' }, right: 4445000000 }
      ]},
      actions: [
        // Non-avian dinosaurs go COMPLETELY extinct
        { action: 'add', target: 'dinosauria', value: { op: 'mul', args: [{ ref: 'dinosauria' }, -0.2] } },
        // Birds survive (they ARE dinosaurs)
        { action: 'add', target: 'aves', value: { op: 'mul', args: [{ ref: 'aves' }, -0.02] } },
        // Mammals survive and will thrive
        { action: 'add', target: 'extinctSpecies', value: 15 }
      ]
    },

    // Dinosaur extinction completion (set to 0 after K-Pg event)
    {
      id: 'dinosaur-final-extinction',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_cretaceous' },
        { op: 'gte', left: { ref: 'yearsElapsed' }, right: 4445000000 },
        { op: 'gt', left: { ref: 'dinosauria' }, right: 1 }
      ]},
      actions: [
        { action: 'set', target: 'dinosauria', value: 0 },
        { action: 'message', text: '🦖 The last non-avian dinosaur has died. Only the birds carry their legacy forward...', type: 'info' }
      ]
    },

    // Mammals flourish after K-Pg extinction
    {
      id: 'mammal-radiation',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'extinction_cretaceous' },
        { op: 'lte', left: { ref: 'dinosauria' }, right: 1 },
        { op: 'gt', left: { ref: 'mammalia' }, right: 0 }
      ]},
      actions: [
        { action: 'add', target: 'mammalia', value: { op: 'mul', args: [{ ref: 'mammalia' }, 0.02] } },
        { action: 'add', target: 'species', value: { op: 'mul', args: [{ ref: 'mammalia' }, 0.001] } }
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

    // Lose only if life was established and then ALL died
    {
      id: 'check-loss',
      timing: 'tick',
      condition: { op: 'and', conditions: [
        { op: 'flag', flag: 'hasStarted' },
        { op: 'flag', flag: 'lifeEstablished' },
        { op: 'lt', left: { ref: 'biomass' }, right: 1 },
        { op: 'lt', left: { ref: 'prokaryotes' }, right: 1 },
        { op: 'lt', left: { ref: 'replicators' }, right: 1 }
      ]},
      actions: [
        { action: 'set', target: 'hasLost', value: true },
        { action: 'message', text: '💀 Life has ended. The experiment is over. The universe grows cold and silent. You fade...', type: 'error' }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔒 FINAL VALUE CLAMPING - Must be last to cap all production
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'final-clamp-oxygen',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'oxygen' }, right: 35 },
      actions: [{ action: 'set', target: 'oxygen', value: 35 }]
    },
    {
      id: 'final-clamp-oxygen-min',
      timing: 'tick',
      condition: { op: 'lt', left: { ref: 'oxygen' }, right: 0 },
      actions: [{ action: 'set', target: 'oxygen', value: 0 }]
    },
    {
      id: 'final-clamp-temperature-max',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'temperature' }, right: 150 },
      actions: [{ action: 'set', target: 'temperature', value: 150 }]
    },
    {
      id: 'final-clamp-temperature-min',
      timing: 'tick',
      condition: { op: 'lt', left: { ref: 'temperature' }, right: -50 },
      actions: [{ action: 'set', target: 'temperature', value: -50 }]
    },
    {
      id: 'final-clamp-continents',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'continents' }, right: 7 },
      actions: [{ action: 'set', target: 'continents', value: 7 }]
    },
    {
      id: 'final-clamp-mutation-energy',
      timing: 'tick',
      condition: { op: 'gt', left: { ref: 'mutationEnergy' }, right: { ref: 'maxMutationEnergy' } },
      actions: [{ action: 'set', target: 'mutationEnergy', value: { ref: 'maxMutationEnergy' } }]
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
    // ═══════════════════════════════════════════════════════════════
    // 🧬 BODY PLAN INNOVATIONS - Cambrian foundations
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trait-bilateral',
      name: '↔️ Bilateral Symmetry',
      description: 'Left matches right - enables directed movement',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_nerves' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_bilateral' } },
        { op: 'gt', left: { ref: 'cnidaria' }, right: 20 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 60 }],
      effects: [
        { action: 'set', target: 'trait_bilateral', value: true },
        { action: 'add', target: 'complexity', value: 5 },
        { action: 'message', text: '↔️ Bilateral symmetry! Left equals right. Animals can now move with PURPOSE. Head and tail matter...', type: 'success' }
      ]
    },
    {
      id: 'trait-coelom',
      name: '🔘 Body Cavity',
      description: 'Internal space for organs',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bilateral' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_coelom' } },
        { op: 'gt', left: { ref: 'platyhelminthes' }, right: 10 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 65 }],
      effects: [
        { action: 'set', target: 'trait_coelom', value: true },
        { action: 'add', target: 'complexity', value: 8 },
        { action: 'message', text: '🔘 Body cavity forms! Room for complex organs. Digestion becomes efficient...', type: 'success' }
      ]
    },
    {
      id: 'trait-segmentation',
      name: '🔗 Segmentation',
      description: 'Repeated body units - modularity',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_coelom' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_segmentation' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 70 }],
      effects: [
        { action: 'set', target: 'trait_segmentation', value: true },
        { action: 'add', target: 'complexity', value: 10 },
        { action: 'message', text: '🔗 Segmentation! Bodies made of repeated units. Arthropods and vertebrates will both use this trick...', type: 'success' }
      ]
    },
    {
      id: 'trait-shell',
      name: '🐚 Shell',
      description: 'Protective calcium carbonate armor',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_coelom' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_shell' } },
        { op: 'gt', left: { ref: 'annelida' }, right: 5 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 55 }],
      effects: [
        { action: 'set', target: 'trait_shell', value: true },
        { action: 'message', text: '🐚 Shells! Calcium armor protects soft bodies. Mollusks will dominate the seas...', type: 'success' }
      ]
    },
    {
      id: 'trait-exoskeleton',
      name: '🦞 Exoskeleton',
      description: 'External skeleton of chitin',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_segmentation' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_exoskeleton' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 75 }],
      effects: [
        { action: 'set', target: 'trait_exoskeleton', value: true },
        { action: 'add', target: 'complexity', value: 8 },
        { action: 'message', text: '🦞 Exoskeleton! Armor on the outside. Trilobites will rule the Paleozoic seas...', type: 'success' }
      ]
    },
    {
      id: 'trait-bones',
      name: '🦴 Skeleton',
      description: 'Internal structure, larger bodies',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'upgrade_predation' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_bones' } },
        { op: 'gt', left: { ref: 'species' }, right: 20 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 80 }],
      effects: [
        { action: 'set', target: 'trait_bones', value: true },
        { action: 'add', target: 'complexity', value: 10 },
        { action: 'message', text: '🦴 Bones provide structure! Vertebrates rise! Giants become possible...', type: 'success' }
      ]
    },
    {
      id: 'trait-jaws',
      name: '🦈 Jaws',
      description: 'Hinged mouth - the first bite',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_bones' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_jaws' } },
        { op: 'gt', left: { ref: 'agnatha' }, right: 50 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 70 }],
      effects: [
        { action: 'set', target: 'trait_jaws', value: true },
        { action: 'add', target: 'selectionPressure', value: 2 },
        { action: 'message', text: '🦈 JAWS! Gill arches become weapons. The first true bite. Predation enters a new era...', type: 'success' }
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
    {
      id: 'trait-amnioticEgg',
      name: '🥚 Amniotic Egg',
      description: 'Eggs that survive on land - freedom from water',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_legs' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_amnioticEgg' } },
        { op: 'gt', left: { ref: 'amphibia' }, right: 20 }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 85 }],
      effects: [
        { action: 'set', target: 'trait_amnioticEgg', value: true },
        { action: 'add', target: 'complexity', value: 12 },
        { action: 'message', text: '🥚 Amniotic egg! A private pond inside a shell. Reptiles break free from water entirely...', type: 'success' }
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
      id: 'trait-milk',
      name: '🍼 Milk',
      description: 'Nurture young with body - the mammalian innovation',
      trigger: { op: 'and', conditions: [
        { op: 'flag', flag: 'trait_fur' },
        { op: 'not', condition: { op: 'flag', flag: 'trait_milk' } }
      ]},
      costs: [{ resource: 'mutationEnergy', amount: 75 }],
      effects: [
        { action: 'set', target: 'trait_milk', value: true },
        { action: 'add', target: 'complexity', value: 15 },
        { action: 'message', text: '🍼 Milk! Mothers feed young from their own bodies. Extended care, deeper bonds, larger brains...', type: 'success' }
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
