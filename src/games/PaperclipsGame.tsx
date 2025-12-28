/**
 * PaperclipsGame - React Component
 *
 * A complete React-based Paperclips game using the JSON game engine.
 */

import { useMemo } from 'react';
import { useGameEngine } from '../engine/useGameEngine';
import { paperclipsGame } from './paperclips';
import './PaperclipsGame.css';

export function PaperclipsGame() {
  const game = useGameEngine(paperclipsGame);

  const clipRate = useMemo(() => {
    const clipperRate = (game.state.clipperLevel as number || 0) * (game.state.clipperBoost as number || 1) * 0.1;
    const megaRate = (game.state.megaClipperLevel as number || 0) * 0.5;
    return (clipperRate + megaRate) * 10; // per second
  }, [game.state.clipperLevel, game.state.clipperBoost, game.state.megaClipperLevel]);

  return (
    <div className="paperclips-game">
      <header className="game-header">
        <h1>📎 Universal Paperclips</h1>
        {game.phase && <span className="phase-badge">{game.phase}</span>}
      </header>

      <div className="game-layout">
        {/* Main Stats */}
        <section className="stats-panel">
          <div className="stat-large">
            <span className="stat-value">{game.format(game.state.clips as number || 0, 'compact')}</span>
            <span className="stat-label">Paperclips</span>
          </div>
          <div className="stat-row">
            <div className="stat">
              <span className="stat-label">Unsold</span>
              <span className="stat-value">{game.format(game.state.unsoldClips as number || 0, 'compact')}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Funds</span>
              <span className="stat-value">{game.format(game.state.funds as number || 0, 'currency')}</span>
            </div>
          </div>
          {clipRate > 0 && (
            <div className="stat-rate">
              {game.format(clipRate, 'compact')} clips/sec
            </div>
          )}
        </section>

        {/* Manufacturing */}
        <section className="manufacturing-panel">
          <h2>🔧 Manufacturing</h2>
          <button
            className="action-button primary"
            onClick={() => game.playerAction('makeClip')}
            disabled={(game.state.wire as number || 0) <= 0}
          >
            Make Paperclip
          </button>
          <div className="resource">
            <span className="resource-icon">🔌</span>
            <span className="resource-label">Wire:</span>
            <span className="resource-value">
              {game.format(game.state.wire as number || 0, 'compact')} inches
            </span>
          </div>
        </section>

        {/* Business */}
        <section className="business-panel">
          <h2>💼 Business</h2>
          <div className="price-controls">
            <button
              className="action-button small"
              onClick={() => game.playerAction('lowerPrice')}
            >
              ▼
            </button>
            <span className="price-display">
              {game.format(game.state.margin as number || 0.25, 'currency')} per clip
            </span>
            <button
              className="action-button small"
              onClick={() => game.playerAction('raisePrice')}
            >
              ▲
            </button>
          </div>
          <div className="demand-bar">
            <div
              className="demand-fill"
              style={{ width: `${Math.min(100, game.state.demand as number || 0)}%` }}
            />
            <span className="demand-label">{Math.round(game.state.demand as number || 0)}% Demand</span>
          </div>
        </section>

        {/* Wire Market */}
        <section className="wire-panel">
          <h2>🔌 Wire Market</h2>
          <div className="wire-price">
            Current price: {game.format(game.state.wireCost as number || 20, 'currency')}
          </div>
          <button
            className="action-button"
            onClick={() => game.playerAction('buyWire')}
            disabled={(game.state.funds as number || 0) < (game.state.wireCost as number || 20)}
          >
            Buy Wire (1000 inches)
          </button>
        </section>

        {/* Auto-Clippers */}
        {Boolean(game.state.showAutoClippers) && (
          <section className="production-panel">
            <h2>⚙️ Production</h2>
            <div className="upgrade-card">
              <div className="upgrade-info">
                <span className="upgrade-name">AutoClippers</span>
                <span className="upgrade-count">{Number(game.state.clipperLevel) || 0} owned</span>
              </div>
              <button
                className="action-button"
                onClick={() => game.purchaseProject('buy-autoclipper')}
                disabled={!game.canAffordProject('buy-autoclipper')}
              >
                Buy ({game.format(game.state.clipperCost as number || 5, 'currency')})
              </button>
            </div>

            {Boolean(game.state.showMegaClippers) && (
              <div className="upgrade-card mega">
                <div className="upgrade-info">
                  <span className="upgrade-name">MegaClippers</span>
                  <span className="upgrade-count">{Number(game.state.megaClipperLevel) || 0} owned</span>
                </div>
                <button
                  className="action-button"
                  onClick={() => game.purchaseProject('buy-megaclipper')}
                  disabled={!game.canAffordProject('buy-megaclipper')}
                >
                  Buy ({game.format(game.state.megaClipperCost as number || 500, 'currency')})
                </button>
              </div>
            )}

            {Boolean(game.state.showMarketing) && (
              <div className="upgrade-card">
                <div className="upgrade-info">
                  <span className="upgrade-name">Marketing Lvl {Number(game.state.marketingLevel) || 1}</span>
                  <span className="upgrade-desc">+demand</span>
                </div>
                <button
                  className="action-button"
                  onClick={() => game.purchaseProject('buy-marketing')}
                  disabled={!game.canAffordProject('buy-marketing')}
                >
                  Buy ({game.format(game.state.marketingCost as number || 100, 'currency')})
                </button>
              </div>
            )}
          </section>
        )}

        {/* Messages */}
        {game.messages.length > 0 && (
          <section className="messages-panel">
            <h2>📜 Log</h2>
            <div className="messages-list">
              {game.messages.slice(-5).reverse().map((msg, idx) => (
                <div key={idx} className={`message message-${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Controls */}
      <footer className="game-controls">
        <button className="control-button" onClick={() => game.save()}>💾 Save</button>
        <button className="control-button" onClick={() => game.load()}>📂 Load</button>
        <button className="control-button danger" onClick={() => game.reset()}>🔄 Reset</button>
      </footer>
    </div>
  );
}

export default PaperclipsGame;
