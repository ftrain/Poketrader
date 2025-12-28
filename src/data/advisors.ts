// Pokemon Advisors - each has their own personality and expertise
export interface PokemonAdvisor {
  name: string;
  spriteId: number;
  specialty: string;
  catchphrase: string;
  color: string;
}

export const POKEMON_ADVISORS: Record<string, PokemonAdvisor> = {
  meowth: {
    name: "Meowth",
    spriteId: 52,
    specialty: "money",
    catchphrase: "That's right!",
    color: "#ffd700"
  },
  alakazam: {
    name: "Alakazam",
    spriteId: 65,
    specialty: "wisdom",
    catchphrase: "A wise investment...",
    color: "#9c27b0"
  },
  chansey: {
    name: "Chansey",
    spriteId: 113,
    specialty: "luck",
    catchphrase: "Lucky you!",
    color: "#ff69b4"
  },
  machamp: {
    name: "Machamp",
    spriteId: 68,
    specialty: "power",
    catchphrase: "FLEX!",
    color: "#607d8b"
  },
  slowpoke: {
    name: "Slowpoke",
    spriteId: 79,
    specialty: "patience",
    catchphrase: "...wait for it...",
    color: "#ff9800"
  },
  gengar: {
    name: "Gengar",
    spriteId: 94,
    specialty: "risk",
    catchphrase: "Kekeke!",
    color: "#673ab7"
  },
  jigglypuff: {
    name: "Jigglypuff",
    spriteId: 39,
    specialty: "announcement",
    catchphrase: "Jiggly~!",
    color: "#e91e63"
  },
  snorlax: {
    name: "Snorlax",
    spriteId: 143,
    specialty: "storage",
    catchphrase: "Zzzz... more room!",
    color: "#2196f3"
  }
};

export type MessageCategory = 'purchase' | 'sale' | 'profit' | 'loss' | 'achievement' | 'pack' | 'event' | 'upgrade' | 'warning' | 'tip';

// Get a random advisor for a category
export function getAdvisorForCategory(category: MessageCategory): PokemonAdvisor {
  const categoryMap: Record<MessageCategory, string[]> = {
    purchase: ['meowth', 'alakazam'],
    sale: ['meowth', 'machamp'],
    profit: ['meowth', 'chansey'],
    loss: ['slowpoke', 'gengar'],
    achievement: ['jigglypuff', 'chansey'],
    pack: ['chansey', 'gengar'],
    event: ['jigglypuff', 'alakazam'],
    upgrade: ['machamp', 'alakazam'],
    warning: ['gengar', 'slowpoke'],
    tip: ['alakazam', 'slowpoke']
  };

  const advisors = categoryMap[category];
  const advisorKey = advisors[Math.floor(Math.random() * advisors.length)];
  return POKEMON_ADVISORS[advisorKey];
}

// Generate a Pokemon-style message
export function generatePokemonMessage(baseMessage: string, category: MessageCategory): {
  advisor: PokemonAdvisor;
  message: string;
} {
  const advisor = getAdvisorForCategory(category);

  // Add Pokemon flair to the message
  const flairs: Record<string, string[]> = {
    meowth: ["Pay day!", "Cha-ching!", "Money money money!"],
    alakazam: ["Fascinating...", "Most logical.", "The data suggests..."],
    chansey: ["How wonderful!", "Blessed!", "Good fortune!"],
    machamp: ["POWER MOVE!", "Strong choice!", "Flex approved!"],
    slowpoke: ["Hmm...", "Eventually...", "In time..."],
    gengar: ["Hehehe!", "Spooky deal!", "Shadow profits!"],
    jigglypuff: ["Announcement~!", "Hear ye~!", "Listen up~!"],
    snorlax: ["*yawn*", "More space!", "*stretch*"]
  };

  const advisorFlairs = flairs[advisor.name.toLowerCase()] || ["..."];
  const flair = advisorFlairs[Math.floor(Math.random() * advisorFlairs.length)];

  return {
    advisor,
    message: `${flair} ${baseMessage}`
  };
}
