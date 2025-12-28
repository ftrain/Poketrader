import { ACHIEVEMENTS } from '../data';

interface LessonsViewProps {
  unlockedAchievements: number[];
}

const KEY_CONCEPTS = [
  {
    title: "Supply & Demand",
    desc: "Prices rise when demand exceeds supply (rare cards), and fall when supply exceeds demand."
  },
  {
    title: "Expected Value",
    desc: "EV = Σ(probability × value). If pack EV < price, buying packs loses money on average."
  },
  {
    title: "Market Volatility",
    desc: "Rare items have higher price swings. Risk increases with potential reward."
  },
  {
    title: "Opportunity Cost",
    desc: "Money spent on one card can't buy another. Every purchase is a trade-off."
  },
  {
    title: "FOMO & Psychology",
    desc: "Fear of missing out drives bubbles. Prices often move on emotion more than fundamentals."
  },
];

export function LessonsView({ unlockedAchievements }: LessonsViewProps) {
  return (
    <div className="view">
      <h2>📚 Economics Lessons</h2>

      <h3 className="section-title">🏆 Achievements</h3>
      <div className="achievement-grid">
        {ACHIEVEMENTS.map(ach => {
          const unlocked = unlockedAchievements.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`achievement-card ${unlocked ? 'unlocked' : ''}`}
            >
              <div className="achievement-icon">{unlocked ? '🏆' : '🔒'}</div>
              <div className="achievement-name">{ach.name}</div>
              <div className="achievement-description">{ach.description}</div>
              <div className="achievement-reward">Reward: ${ach.reward}</div>
            </div>
          );
        })}
      </div>

      <h3 className="section-title">💡 Key Concepts</h3>
      <div className="concepts-grid">
        {KEY_CONCEPTS.map((concept, i) => (
          <div key={i} className="concept-card">
            <div className="concept-title">{concept.title}</div>
            <div className="concept-description">{concept.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
