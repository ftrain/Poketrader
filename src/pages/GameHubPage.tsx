/**
 * GameHubPage - Main game selection page
 *
 * URL: /hub (default landing page)
 */

import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGlobalSaveManager } from '../engine';
import '../games/GameHub.css';

interface GameInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

const GAMES: GameInfo[] = [
  {
    id: 'poketrader',
    name: 'Poketrader',
    description: 'Pokemon card trading simulator with market events, grading, and more',
    icon: '🎴',
    color: '#f59e0b',
    path: '/poketrader'
  },
  {
    id: 'thriftqueen',
    name: 'Thrift Queen 👑',
    description: 'Build a vintage fashion empire and defeat fast fashion! 👗💚',
    icon: '👗',
    color: '#ff69b4',
    path: '/thriftqueen'
  },
  {
    id: 'paperclips',
    name: 'Universal Paperclips',
    description: 'Classic idle game - make paperclips, expand production',
    icon: '📎',
    color: '#3b82f6',
    path: '/paperclips'
  }
];

export function GameHubPage() {
  const navigate = useNavigate();
  const saveManager = getGlobalSaveManager();

  const handleSelectGame = (game: GameInfo) => {
    navigate(game.path);
  };

  return (
    <div className="game-hub">
      <header className="hub-header">
        <h1>🎮 Game Hub</h1>
        <p>Select a game to play</p>
      </header>

      <div className="games-grid">
        {GAMES.map(game => {
          const hasSave = saveManager.hasAutoSave(game.id) ||
            saveManager.getSaveSlots(game.id).length > 0;

          return (
            <button
              key={game.id}
              className="game-card"
              onClick={() => handleSelectGame(game)}
              style={{ '--game-color': game.color } as CSSProperties}
            >
              <span className="game-icon">{game.icon}</span>
              <h2 className="game-name">{game.name}</h2>
              <p className="game-description">{game.description}</p>
              {hasSave && (
                <span className="save-indicator">💾 Save found</span>
              )}
              <span className="play-button">
                {hasSave ? 'Continue →' : 'Play →'}
              </span>
            </button>
          );
        })}
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
