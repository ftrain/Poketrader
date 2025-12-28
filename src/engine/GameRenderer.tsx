/**
 * GameRenderer - React Component for JSON Game Definitions
 *
 * Renders game UI based on JSON definitions with support for:
 * - Dynamic state bindings
 * - Projects/upgrades
 * - Messages console
 * - Custom component slots for game-specific UI
 */

import React, { useMemo, useCallback } from 'react';
import type { UseGameEngineReturn } from './useGameEngine';
import type {
  UISectionDefinition,
  UIBinding,
  ProjectDefinition,
  GameMessage,
} from './types';
import { evaluateCondition, evaluateExpression, formatValue } from './evaluator';

// ============================================================================
// TYPES
// ============================================================================

export interface GameRendererProps {
  game: UseGameEngineReturn;
  sections?: UISectionDefinition[];
  customComponents?: Record<string, React.ComponentType<CustomComponentProps>>;
  className?: string;
  showMessages?: boolean;
  showProjects?: boolean;
}

export interface CustomComponentProps {
  game: UseGameEngineReturn;
  props?: Record<string, unknown>;
}

// ============================================================================
// MAIN RENDERER
// ============================================================================

export function GameRenderer({
  game,
  sections = [],
  customComponents = {},
  className = '',
  showMessages = true,
  showProjects = true,
}: GameRendererProps) {
  return (
    <div className={`game-renderer ${className}`}>
      {/* Render UI sections */}
      {sections.map(section => (
        <GameSection
          key={section.id}
          section={section}
          game={game}
        />
      ))}

      {/* Projects panel */}
      {showProjects && game.availableProjects.length > 0 && (
        <ProjectsPanel game={game} />
      )}

      {/* Messages console */}
      {showMessages && game.messages.length > 0 && (
        <MessagesPanel messages={game.messages} />
      )}

      {/* Custom components */}
      {Object.entries(customComponents).map(([key, Component]) => (
        <Component key={key} game={game} />
      ))}
    </div>
  );
}

// ============================================================================
// SECTION RENDERER
// ============================================================================

interface GameSectionProps {
  section: UISectionDefinition;
  game: UseGameEngineReturn;
}

function GameSection({ section, game }: GameSectionProps) {
  const ctx = useMemo(() => ({
    state: game.state,
    tick: game.tick,
    deltaTime: 0,
    random: Math.random,
  }), [game.state, game.tick]);

  // Check visibility
  if (section.visible && !evaluateCondition(section.visible, ctx)) {
    return null;
  }

  return (
    <div className={`game-section game-section-${section.id}`}>
      {section.name && (
        <h3 className="game-section-title">
          {section.icon && <span className="section-icon">{section.icon}</span>}
          {section.name}
        </h3>
      )}
      <div className="game-section-content">
        {section.bindings.map((binding, idx) => (
          <BindingRenderer
            key={binding.elementId || idx}
            binding={binding}
            game={game}
            ctx={ctx}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// BINDING RENDERER
// ============================================================================

interface BindingRendererProps {
  binding: UIBinding;
  game: UseGameEngineReturn;
  ctx: import('./types').EvaluationContext;
}

function BindingRenderer({ binding, game, ctx }: BindingRendererProps) {
  // Check visibility
  if (binding.visible && !evaluateCondition(binding.visible, ctx)) {
    return null;
  }

  switch (binding.type) {
    case 'text':
    case 'display':
      return <TextBinding binding={binding} ctx={ctx} />;

    case 'button':
      return <ButtonBinding binding={binding} game={game} ctx={ctx} />;

    case 'progress':
      return <ProgressBinding binding={binding} ctx={ctx} />;

    case 'visibility':
      // Just a visibility wrapper - no content
      return null;

    default:
      return null;
  }
}

// ============================================================================
// TEXT BINDING
// ============================================================================

interface TextBindingProps {
  binding: UIBinding;
  ctx: import('./types').EvaluationContext;
}

function TextBinding({ binding, ctx }: TextBindingProps) {
  const value = binding.value !== undefined
    ? evaluateExpression(binding.value, ctx)
    : '';

  const formatted = formatValue(value, binding.format, binding.precision);
  const display = `${binding.prefix || ''}${formatted}${binding.suffix || ''}`;

  return (
    <span id={binding.elementId} className="game-binding game-text">
      {display}
    </span>
  );
}

// ============================================================================
// BUTTON BINDING
// ============================================================================

interface ButtonBindingProps {
  binding: UIBinding;
  game: UseGameEngineReturn;
  ctx: import('./types').EvaluationContext;
}

function ButtonBinding({ binding, game, ctx }: ButtonBindingProps) {
  const isEnabled = binding.enabled
    ? evaluateCondition(binding.enabled, ctx)
    : true;

  const handleClick = useCallback(() => {
    if (binding.onClick && isEnabled) {
      game.playerAction(binding.onClick);
    }
  }, [binding.onClick, isEnabled, game]);

  // Get button text from value if provided
  const text = binding.value !== undefined
    ? String(evaluateExpression(binding.value, ctx))
    : binding.elementId;

  return (
    <button
      id={binding.elementId}
      className={`game-binding game-button ${isEnabled ? '' : 'disabled'}`}
      onClick={handleClick}
      disabled={!isEnabled}
    >
      {binding.icon && <span className="button-icon">{binding.icon}</span>}
      {text}
    </button>
  );
}

// ============================================================================
// PROGRESS BINDING
// ============================================================================

interface ProgressBindingProps {
  binding: UIBinding;
  ctx: import('./types').EvaluationContext;
}

function ProgressBinding({ binding, ctx }: ProgressBindingProps) {
  const current = binding.current !== undefined
    ? evaluateExpression(binding.current, ctx)
    : 0;
  const max = binding.max !== undefined
    ? evaluateExpression(binding.max, ctx)
    : 100;

  const currentNum = typeof current === 'number' ? current : 0;
  const maxNum = typeof max === 'number' && max > 0 ? max : 100;
  const percentage = Math.min(100, (currentNum / maxNum) * 100);

  return (
    <div id={binding.elementId} className="game-binding game-progress">
      <div
        className="game-progress-bar"
        style={{ width: `${percentage}%` }}
      />
      <span className="game-progress-text">
        {formatValue(currentNum, 'compact')} / {formatValue(maxNum, 'compact')}
      </span>
    </div>
  );
}

// ============================================================================
// PROJECTS PANEL
// ============================================================================

interface ProjectsPanelProps {
  game: UseGameEngineReturn;
}

function ProjectsPanel({ game }: ProjectsPanelProps) {
  return (
    <div className="game-projects-panel">
      <h3>Projects</h3>
      <div className="game-projects-list">
        {game.availableProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            game={game}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectDefinition;
  game: UseGameEngineReturn;
}

function ProjectCard({ project, game }: ProjectCardProps) {
  const canAfford = game.canAffordProject(project.id);

  const handlePurchase = useCallback(() => {
    game.purchaseProject(project.id);
  }, [game, project.id]);

  // Format costs
  const costsDisplay = project.costs.map(cost => {
    const amount = game.evaluate(cost.amount);
    return `${cost.resource}: ${formatValue(amount as number, 'compact')}`;
  }).join(', ');

  return (
    <div className={`game-project ${canAfford ? 'affordable' : 'unaffordable'}`}>
      <div className="project-header">
        {project.icon && <span className="project-icon">{project.icon}</span>}
        <span className="project-name">{project.name}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-footer">
        <span className="project-cost">
          {project.priceTag || costsDisplay}
        </span>
        <button
          className="project-buy-btn"
          onClick={handlePurchase}
          disabled={!canAfford}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MESSAGES PANEL
// ============================================================================

interface MessagesPanelProps {
  messages: GameMessage[];
}

function MessagesPanel({ messages }: MessagesPanelProps) {
  // Show last 10 messages, newest first
  const recentMessages = messages.slice(-10).reverse();

  return (
    <div className="game-messages-panel">
      <h3>Messages</h3>
      <div className="game-messages-list">
        {recentMessages.map((msg, idx) => (
          <div
            key={`${msg.timestamp}-${idx}`}
            className={`game-message game-message-${msg.type}`}
          >
            {msg.icon && <span className="message-icon">{msg.icon}</span>}
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// STAT DISPLAY HELPER COMPONENT
// ============================================================================

interface StatDisplayProps {
  label: string;
  value: string | number;
  format?: string;
  icon?: string;
  className?: string;
}

export function StatDisplay({ label, value, format, icon, className = '' }: StatDisplayProps) {
  const formattedValue = typeof value === 'number'
    ? formatValue(value, format)
    : value;

  return (
    <div className={`game-stat ${className}`}>
      {icon && <span className="stat-icon">{icon}</span>}
      <span className="stat-label">{label}</span>
      <span className="stat-value">{formattedValue}</span>
    </div>
  );
}

// ============================================================================
// ACTION BUTTON HELPER COMPONENT
// ============================================================================

interface ActionButtonProps {
  game: UseGameEngineReturn;
  actionId: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  className?: string;
}

export function ActionButton({
  game,
  actionId,
  label,
  icon,
  disabled = false,
  className = '',
}: ActionButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      game.playerAction(actionId);
    }
  }, [game, actionId, disabled]);

  return (
    <button
      className={`game-action-button ${className} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="action-icon">{icon}</span>}
      {label}
    </button>
  );
}
