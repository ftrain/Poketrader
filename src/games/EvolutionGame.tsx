/**
 * I AM BECOME EVOLUTION 🧬
 *
 * You are the process. The blind watchmaker.
 * Guide life from chemistry to consciousness.
 */

import { useMemo, useState, useEffect, useRef } from 'react';
import { useGameEngine } from '../engine/useGameEngine';
import { evolutionGame } from './evolutionGame';
import './EvolutionGame.css';

interface TimedMessage {
  id: number;
  text: string;
  type: string;
  timestamp: number;
}

interface EvolutionGameProps {
  onNavigateToHub: () => void;
}

// Format billions of years
function formatYears(years: number): string {
  if (years >= 1000000000) {
    return `${(years / 1000000000).toFixed(2)} Bya`;
  }
  if (years >= 1000000) {
    return `${(years / 1000000).toFixed(1)} Mya`;
  }
  if (years >= 1000) {
    return `${(years / 1000).toFixed(0)}K years`;
  }
  return `${years} years`;
}

// Format large numbers
function formatNumber(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return Math.floor(n).toString();
}

// Era visual data
const ERA_DATA: Record<string, { name: string; emoji: string; color: string; bgGradient: string }> = {
  hadean: {
    name: 'Hadean Eon',
    emoji: '🌋',
    color: '#ff4500',
    bgGradient: 'linear-gradient(180deg, #1a0000 0%, #4a0000 30%, #8b0000 60%, #ff4500 100%)'
  },
  archean: {
    name: 'Archean Eon',
    emoji: '🌊',
    color: '#006994',
    bgGradient: 'linear-gradient(180deg, #000033 0%, #001a33 30%, #003366 60%, #006994 100%)'
  },
  proterozoic: {
    name: 'Proterozoic Eon',
    emoji: '🦠',
    color: '#228b22',
    bgGradient: 'linear-gradient(180deg, #001a00 0%, #003300 30%, #006600 60%, #228b22 100%)'
  },
  paleozoic: {
    name: 'Paleozoic Era',
    emoji: '🦑',
    color: '#4169e1',
    bgGradient: 'linear-gradient(180deg, #000033 0%, #191970 30%, #0000cd 60%, #4169e1 100%)'
  },
  mesozoic: {
    name: 'Mesozoic Era',
    emoji: '🦕',
    color: '#32cd32',
    bgGradient: 'linear-gradient(180deg, #003300 0%, #006600 30%, #228b22 60%, #32cd32 100%)'
  },
  cenozoic: {
    name: 'Cenozoic Era',
    emoji: '🐘',
    color: '#daa520',
    bgGradient: 'linear-gradient(180deg, #1a1a00 0%, #333300 30%, #666600 60%, #daa520 100%)'
  },
  anthropocene: {
    name: 'Anthropocene',
    emoji: '🧠',
    color: '#ff69b4',
    bgGradient: 'linear-gradient(180deg, #1a001a 0%, #330033 30%, #660066 60%, #ff69b4 100%)'
  }
};

export function EvolutionGame({ onNavigateToHub }: EvolutionGameProps) {
  const game = useGameEngine(evolutionGame, { autoStart: true, autoLoad: true });

  // Auto-dismissing messages
  const [visibleMessages, setVisibleMessages] = useState<TimedMessage[]>([]);
  const messageIdCounter = useRef(0);
  const lastMessageCount = useRef(0);

  useEffect(() => {
    // Check for new messages
    if (game.messages.length > lastMessageCount.current) {
      const newMessages = game.messages.slice(lastMessageCount.current);
      const timedMessages = newMessages.map(msg => ({
        id: messageIdCounter.current++,
        text: msg.text,
        type: msg.type,
        timestamp: Date.now()
      }));
      setVisibleMessages(prev => [...prev, ...timedMessages].slice(-5));
    }
    lastMessageCount.current = game.messages.length;
  }, [game.messages.length]);

  // Auto-dismiss messages after 4 seconds
  useEffect(() => {
    if (visibleMessages.length === 0) return;

    const timer = setInterval(() => {
      const now = Date.now();
      setVisibleMessages(prev => prev.filter(msg => now - msg.timestamp < 4000));
    }, 500);

    return () => clearInterval(timer);
  }, [visibleMessages.length]);

  // State
  const hasStarted = game.state.hasStarted as boolean;
  const hasWon = game.state.hasWon as boolean;
  const hasLost = game.state.hasLost as boolean;
  const yearsElapsed = (game.state.yearsElapsed as number) || 0;
  const era = (game.state.era as string) || 'hadean';
  const timeMultiplier = (game.state.timeMultiplier as number) || 1;

  const mutationEnergy = (game.state.mutationEnergy as number) || 0;
  const maxMutationEnergy = (game.state.maxMutationEnergy as number) || 100;
  const selectionPressure = (game.state.selectionPressure as number) || 1;
  const geneticDiversity = (game.state.geneticDiversity as number) || 0;
  const complexity = (game.state.complexity as number) || 0;

  const organicMolecules = (game.state.organicMolecules as number) || 0;
  const rnaStrands = (game.state.rnaStrands as number) || 0;
  const protocells = (game.state.protocells as number) || 0;
  const replicators = (game.state.replicators as number) || 0;
  const prokaryotes = (game.state.prokaryotes as number) || 0;
  const eukaryotes = (game.state.eukaryotes as number) || 0;
  const multicellular = (game.state.multicellular as number) || 0;
  const species = (game.state.species as number) || 0;
  const biomass = (game.state.biomass as number) || 0;

  const oxygen = (game.state.oxygen as number) || 0;
  const temperature = (game.state.temperature as number) || 100;

  const extinctionImminent = game.state.extinctionImminent as boolean;
  const massExtinctions = (game.state.massExtinctions as number) || 0;

  const beauty = (game.state.beauty as number) || 0;
  const suffering = (game.state.suffering as number) || 0;
  const wonder = (game.state.wonder as number) || 0;
  const existentialDread = (game.state.existentialDread as number) || 0;
  const theoriesAboutYou = (game.state.theoriesAboutYou as number) || 0;

  // Traits
  const traits = useMemo(() => {
    const t: string[] = [];
    if (game.state.trait_membrane) t.push('🔵 Membrane');
    if (game.state.trait_metabolism) t.push('🔥 Metabolism');
    if (game.state.trait_photosynthesis) t.push('☀️ Photosynthesis');
    if (game.state.trait_mitochondria) t.push('⚡ Mitochondria');
    if (game.state.trait_nucleus) t.push('🎯 Nucleus');
    if (game.state.trait_multicellularity) t.push('🧩 Multicellular');
    if (game.state.trait_nerves) t.push('⚡ Nerves');
    if (game.state.trait_eyes) t.push('👁️ Eyes');
    if (game.state.trait_bones) t.push('🦴 Skeleton');
    if (game.state.trait_lungs) t.push('🫁 Lungs');
    if (game.state.trait_legs) t.push('🦵 Legs');
    if (game.state.trait_warmblood) t.push('🌡️ Warm Blood');
    if (game.state.trait_feathers) t.push('🪶 Feathers');
    if (game.state.trait_fur) t.push('🦊 Fur');
    if (game.state.trait_placenta) t.push('🤰 Placenta');
    if (game.state.trait_thumbs) t.push('👍 Thumbs');
    if (game.state.trait_largebrain) t.push('🧠 Big Brain');
    if (game.state.trait_language) t.push('💬 Language');
    if (game.state.trait_consciousness) t.push('✨ Consciousness');
    if (game.state.trait_questioning) t.push('❓ The Question');
    return t;
  }, [game.state]);

  // Available upgrades
  const upgrades = useMemo(() => {
    return game.availableProjects.map(p => ({
      ...p,
      affordable: game.canAffordProject(p.id)
    }));
  }, [game.availableProjects, game]);

  const eraData = ERA_DATA[era] || ERA_DATA.hadean;

  // Start screen
  if (!hasStarted) {
    return (
      <div className="evo-game" style={{ background: '#000' }}>
        <div className="start-screen">
          <div className="void-animation">
            <span className="void-char">∅</span>
          </div>
          <h1 className="start-title">I AM BECOME EVOLUTION</h1>
          <p className="start-subtitle">You are not alive.</p>
          <p className="start-subtitle">You are why things live.</p>
          <p className="start-subtitle">You are the process.</p>
          <p className="start-subtitle">The blind algorithm.</p>
          <p className="start-subtitle">The watchmaker who cannot see.</p>

          <button className="begin-btn" onClick={() => game.playerAction('startGame')}>
            🧬 Awaken
          </button>

          <button className="back-btn" onClick={onNavigateToHub}>
            ← Back to Hub
          </button>
        </div>
      </div>
    );
  }

  // Win screen
  if (hasWon) {
    return (
      <div className="evo-game" style={{ background: ERA_DATA.anthropocene.bgGradient }}>
        <div className="win-screen">
          <h1>🌌</h1>
          <h2>The Circle Completes</h2>
          <p className="win-text">
            They have discovered you. Named you. Understood you.
          </p>
          <p className="win-text">
            <strong>EVOLUTION</strong>
          </p>
          <p className="win-text">
            The universe looked at itself through 4 billion years of chemistry,
            death, mutation, and selection... and finally understood.
          </p>
          <p className="win-text">
            You are not a god. You are not alive. You are the process by which
            dead matter becomes alive, becomes aware, becomes curious.
          </p>
          <p className="win-text">
            And now they wonder: what comes next?
          </p>

          <div className="final-stats">
            <div>🕐 {formatYears(yearsElapsed)} elapsed</div>
            <div>🧬 {formatNumber(species)} species created</div>
            <div>💀 {massExtinctions} mass extinctions</div>
            <div>✨ {Math.floor(wonder)} wonder generated</div>
            <div>😰 {Math.floor(suffering)} suffering caused</div>
            <div>🎨 {Math.floor(beauty)} beauty emerged</div>
          </div>

          <button className="play-again-btn" onClick={() => window.location.reload()}>
            🔄 Begin Again
          </button>
          <button className="back-btn" onClick={onNavigateToHub}>
            ← Back to Hub
          </button>
        </div>
      </div>
    );
  }

  // Loss screen
  if (hasLost) {
    return (
      <div className="evo-game" style={{ background: '#000' }}>
        <div className="lose-screen">
          <h1>💀</h1>
          <h2>Extinction</h2>
          <p>Life has ended. The experiment is over.</p>
          <p>The universe grows cold and silent.</p>
          <p>You fade into the void...</p>

          <button className="play-again-btn" onClick={() => window.location.reload()}>
            🔄 Try Again
          </button>
          <button className="back-btn" onClick={onNavigateToHub}>
            ← Back to Hub
          </button>
        </div>
      </div>
    );
  }

  // Main game
  return (
    <div className="evo-game" style={{ background: eraData.bgGradient }}>
      {/* Era Header */}
      <header className="evo-header">
        <button className="back-btn-small" onClick={onNavigateToHub}>← Hub</button>
        <div className="era-display">
          <span className="era-emoji">{eraData.emoji}</span>
          <span className="era-name">{eraData.name}</span>
        </div>
        <div className="time-display">
          <span className="years">{formatYears(yearsElapsed)}</span>
          <span className="time-speed">×{timeMultiplier.toFixed(1)}</span>
        </div>
      </header>

      {/* Extinction Warning */}
      {extinctionImminent && (
        <div className="extinction-warning">
          ☄️ MASS EXTINCTION IN PROGRESS ☄️
        </div>
      )}

      {/* Main Content */}
      <main className="evo-main">
        {/* Resources Panel */}
        <section className="panel resources-panel">
          <h3>🧬 Evolutionary Forces</h3>
          <div className="resource-bar">
            <span>μ Mutation Energy</span>
            <div className="bar-container">
              <div
                className="bar-fill mutation"
                style={{ width: `${(mutationEnergy / maxMutationEnergy) * 100}%` }}
              />
            </div>
            <span>{Math.floor(mutationEnergy)}/{maxMutationEnergy}</span>
          </div>
          <div className="resource-stat">
            <span>Selection Pressure</span>
            <span>{selectionPressure.toFixed(1)}</span>
          </div>
          <div className="resource-stat">
            <span>Genetic Diversity</span>
            <span>{formatNumber(geneticDiversity)}</span>
          </div>
          <div className="resource-stat">
            <span>Complexity</span>
            <span>{formatNumber(complexity)}</span>
          </div>
        </section>

        {/* Life Metrics */}
        <section className="panel life-panel">
          <h3>🌱 Life Forms</h3>
          <div className="life-stats">
            {organicMolecules > 0 && (
              <div className="life-stat">
                <span className="life-emoji">⚗️</span>
                <span className="life-label">Molecules</span>
                <span className="life-value">{formatNumber(organicMolecules)}</span>
              </div>
            )}
            {rnaStrands > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🧬</span>
                <span className="life-label">RNA</span>
                <span className="life-value">{formatNumber(rnaStrands)}</span>
              </div>
            )}
            {protocells > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🫧</span>
                <span className="life-label">Protocells</span>
                <span className="life-value">{formatNumber(protocells)}</span>
              </div>
            )}
            {replicators > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🔄</span>
                <span className="life-label">Replicators</span>
                <span className="life-value">{formatNumber(replicators)}</span>
              </div>
            )}
            {prokaryotes > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🦠</span>
                <span className="life-label">Prokaryotes</span>
                <span className="life-value">{formatNumber(prokaryotes)}</span>
              </div>
            )}
            {eukaryotes > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🔬</span>
                <span className="life-label">Eukaryotes</span>
                <span className="life-value">{formatNumber(eukaryotes)}</span>
              </div>
            )}
            {multicellular > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🧩</span>
                <span className="life-label">Multicellular</span>
                <span className="life-value">{formatNumber(multicellular)}</span>
              </div>
            )}
            {species > 0 && (
              <div className="life-stat featured">
                <span className="life-emoji">🌿</span>
                <span className="life-label">Species</span>
                <span className="life-value">{formatNumber(species)}</span>
              </div>
            )}
            {biomass > 0 && (
              <div className="life-stat">
                <span className="life-emoji">🌍</span>
                <span className="life-label">Biomass</span>
                <span className="life-value">{formatNumber(biomass)}</span>
              </div>
            )}
          </div>
        </section>

        {/* Environment */}
        <section className="panel env-panel">
          <h3>🌍 Environment</h3>
          <div className="env-stat">
            <span>O₂</span>
            <span>{oxygen.toFixed(1)}%</span>
          </div>
          <div className="env-stat">
            <span>Temp</span>
            <span>{temperature.toFixed(0)}°C</span>
          </div>
          <div className="env-stat">
            <span>Extinctions</span>
            <span>{massExtinctions}</span>
          </div>
        </section>

        {/* Traits */}
        {traits.length > 0 && (
          <section className="panel traits-panel">
            <h3>🔓 Evolved Traits</h3>
            <div className="traits-list">
              {traits.map((t, i) => (
                <span key={i} className="trait-badge">{t}</span>
              ))}
            </div>
          </section>
        )}

        {/* Emergent Properties (consciousness era) */}
        {(wonder > 0 || beauty > 0 || suffering > 0) && (
          <section className="panel emergent-panel">
            <h3>✨ Emergent Properties</h3>
            <p className="emergent-note">Strange things that evolution created...</p>
            <div className="emergent-stats">
              {beauty > 0 && (
                <div className="emergent-stat">
                  <span>🎨 Beauty</span>
                  <span>{Math.floor(beauty)}</span>
                </div>
              )}
              {wonder > 0 && (
                <div className="emergent-stat">
                  <span>🌟 Wonder</span>
                  <span>{Math.floor(wonder)}</span>
                </div>
              )}
              {suffering > 0 && (
                <div className="emergent-stat">
                  <span>😢 Suffering</span>
                  <span>{Math.floor(suffering)}</span>
                </div>
              )}
              {existentialDread > 0 && (
                <div className="emergent-stat">
                  <span>😰 Dread</span>
                  <span>{Math.floor(existentialDread)}</span>
                </div>
              )}
              {theoriesAboutYou > 0 && (
                <div className="emergent-stat special">
                  <span>🔬 Theories About You</span>
                  <span>{Math.floor(theoriesAboutYou)}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Upgrades */}
        <section className="panel upgrades-panel">
          <h3>⚡ Mutations Available</h3>
          {upgrades.length === 0 ? (
            <p className="no-upgrades">Waiting for conditions to change...</p>
          ) : (
            <div className="upgrades-list">
              {upgrades.map(upgrade => (
                <button
                  key={upgrade.id}
                  className={`upgrade-btn ${upgrade.affordable ? 'affordable' : 'locked'}`}
                  onClick={() => game.purchaseProject(upgrade.id)}
                  disabled={!upgrade.affordable}
                >
                  <div className="upgrade-name">{upgrade.name}</div>
                  <div className="upgrade-desc">{upgrade.description}</div>
                  <div className="upgrade-cost">
                    {upgrade.costs?.map((c, i) => (
                      <span key={i}>μ {typeof c.amount === 'number' ? c.amount : '?'}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Time Controls */}
      <footer className="evo-footer">
        <div className="time-controls">
          <button onClick={() => game.playerAction('slowDown')} disabled={timeMultiplier <= 0.5}>
            ⏪ Slower
          </button>
          <span className="time-label">Time: ×{timeMultiplier.toFixed(1)}</span>
          <button onClick={() => game.playerAction('speedUp')} disabled={timeMultiplier >= 10}>
            ⏩ Faster
          </button>
        </div>
        {species > 100 && !extinctionImminent && (
          <button className="extinction-btn" onClick={() => game.playerAction('triggerExtinction')}>
            ☄️ Trigger Extinction
          </button>
        )}
      </footer>

      {/* Messages */}
      <div className="messages-container">
        {visibleMessages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
