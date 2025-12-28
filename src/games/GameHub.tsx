/**
 * GameHub - Main Game Selection and Rendering
 *
 * Allows switching between different games running on the same engine.
 */

import type { CSSProperties } from 'react';
import { useState, useCallback } from 'react';
import { PaperclipsGame } from './PaperclipsGame';
import { ThriftQueenGame } from './ThriftQueenGame';
import './GameHub.css';

type GameId = 'hub' | 'paperclips' | 'poketrader' | 'thriftqueen';

interface GameInfo {
  id: GameId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const GAMES: GameInfo[] = [
  {
    id: 'poketrader',
    name: 'Poketrader',
    description: 'Pokemon card trading simulator',
    icon: '🎴',
    color: '#f59e0b'
  },
  {
    id: 'thriftqueen',
    name: 'Thrift Queen 👑',
    description: 'Build a vintage fashion empire!',
    icon: '👗',
    color: '#ff69b4'
  },
  {
    id: 'paperclips',
    name: 'Universal Paperclips',
    description: 'Classic idle game',
    icon: '📎',
    color: '#3b82f6'
  }
];

interface GameHubProps {
  onSelectPoketrader?: () => void;
}

export function GameHub({ onSelectPoketrader }: GameHubProps) {
  const [currentGame, setCurrentGame] = useState<GameId>('hub');

  const handleSelectGame = useCallback((gameId: GameId) => {
    if (gameId === 'poketrader' && onSelectPoketrader) {
      onSelectPoketrader();
    } else {
      setCurrentGame(gameId);
    }
  }, [onSelectPoketrader]);

  const handleBack = useCallback(() => {
    setCurrentGame('hub');
  }, []);

  // Render the selected game
  if (currentGame === 'paperclips') {
    return (
      <div className="game-container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Hub
        </button>
        <PaperclipsGame />
      </div>
    );
  }

  if (currentGame === 'thriftqueen') {
    return <ThriftQueenGame onNavigateToHub={handleBack} />;
  }

  // Game selection hub
  return (
    <div className="game-hub">
      <header className="hub-header">
        <h1>🎮 Game Engine Hub</h1>
        <p>Select a game to play - all powered by the same JSON game engine!</p>
      </header>

      <div className="games-grid">
        {GAMES.map(game => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => handleSelectGame(game.id)}
            style={{ '--game-color': game.color } as CSSProperties}
          >
            <span className="game-icon">{game.icon}</span>
            <h2 className="game-name">{game.name}</h2>
            <p className="game-description">{game.description}</p>
            <span className="play-button">Play →</span>
          </button>
        ))}
      </div>

      <footer className="hub-footer">
        <p>
          Powered by the Universal Game Engine
          <br />
          <span className="tech-stack">React + TypeScript + JSON-Driven Rules</span>
        </p>
      </footer>
    </div>
  );
}

export default GameHub;
