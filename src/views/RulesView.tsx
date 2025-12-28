import { rulesEngine } from '../engine';
import type { RuleEngineState } from '../engine';

interface RulesViewProps {
  gameState: RuleEngineState;
}

const CATEGORY_COLORS: Record<string, string> = {
  market: '#00bcd4',
  collection: '#4caf50',
  achievement: '#ffd700',
  event: '#ff6b6b',
  economy: '#9c27b0',
  pack: '#ff9800'
};

const CATEGORY_ICONS: Record<string, string> = {
  market: '📈',
  collection: '🃏',
  achievement: '🏆',
  event: '⚡',
  economy: '💰',
  pack: '📦'
};

export function RulesView({ gameState }: RulesViewProps) {
  const allRules = rulesEngine.getRules();
  const activeRules = rulesEngine.getActiveRules(gameState);
  const activeRuleIds = new Set(activeRules.map(r => r.id));

  const categories = ['market', 'collection', 'economy', 'pack', 'event', 'achievement'] as const;

  return (
    <div className="view">
      <h2>[ RULES ENGINE ]</h2>
      <p className="view-subtitle">
        The game continuously evaluates these rules against your current state.
        Active rules are highlighted below.
      </p>

      <div className="rules-status">
        <div className="rules-status-item">
          <span className="status-label">Total Rules:</span>
          <span className="status-value">{allRules.length}</span>
        </div>
        <div className="rules-status-item active">
          <span className="status-label">Active Now:</span>
          <span className="status-value">{activeRules.length}</span>
        </div>
      </div>

      {categories.map(category => {
        const categoryRules = rulesEngine.getRulesByCategory(category);
        if (categoryRules.length === 0) return null;

        return (
          <div key={category} className="rules-category">
            <h3 className="category-header" style={{ borderColor: CATEGORY_COLORS[category] }}>
              {CATEGORY_ICONS[category]} {category.toUpperCase()} RULES
            </h3>
            <div className="rules-grid">
              {categoryRules.map(rule => {
                const isActive = activeRuleIds.has(rule.id);
                return (
                  <div
                    key={rule.id}
                    className={`rule-card ${isActive ? 'active' : ''}`}
                    style={{
                      borderColor: isActive ? CATEGORY_COLORS[category] : '#333',
                      boxShadow: isActive ? `0 0 10px ${CATEGORY_COLORS[category]}40` : 'none'
                    }}
                  >
                    <div className="rule-header">
                      <span className="rule-name">{rule.name}</span>
                      <span
                        className="rule-priority"
                        style={{ color: CATEGORY_COLORS[category] }}
                      >
                        P{rule.priority}
                      </span>
                    </div>
                    <div className="rule-description">{rule.description}</div>
                    <div className="rule-details">
                      <div className="rule-condition">
                        <span className="detail-label">IF:</span>
                        <span className="detail-value">{rule.condition}</span>
                      </div>
                      <div className="rule-effect">
                        <span className="detail-label">THEN:</span>
                        <span className="detail-value">{rule.effect}</span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="rule-active-indicator" style={{ color: CATEGORY_COLORS[category] }}>
                        [ ACTIVE ]
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
