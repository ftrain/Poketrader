/**
 * Universal Game Engine
 *
 * A JSON-driven game engine with React integration.
 * Supports multiple games (Paperclips, Poketrader, etc.)
 */

// New JSON-driven game engine
export { GameEngine } from './GameEngine';

export {
  evaluateExpression,
  evaluateCondition,
  getStateValue,
  setStateValue,
  formatValue,
  formatCompact,
  formatTime,
} from './evaluator';

export {
  executeAction,
  applyCosts,
  canAfford,
} from './actions';

export type {
  // Core types
  Expression,
  Operator,
  Condition,

  // State
  StateVariableDefinition,
  PhaseDefinition,
  GameState,
  RuntimeState,
  EvaluationContext,

  // Actions
  Action,
  SetAction,
  AddAction,
  MultiplyAction,
  ToggleAction,
  MessageAction,
  TriggerEventAction,
  ConditionalAction,
  SequenceAction,
  CallAction,
  DelayAction,
  RepeatAction,
  RandomAction,
  LoopAction,
  ForEachAction,
  SpawnAction,
  EmitAction,
  AnimateAction,
  SoundAction,

  // Rules
  RuleTiming,
  RuleDefinition,

  // Projects
  CostDefinition,
  ProjectDefinition,

  // UI
  UIBinding,
  UISectionDefinition,
  ComponentDefinition,

  // Game Definition
  GameDefinition,
  IconDefinition,

  // Runtime
  GameMessage,
  PendingAction,
  SpawnedEntity,

  // Events
  GameEngineEvents,
  AnimateOptions,
  SoundOptions,
} from './types';

// React integration
export { useGameEngine, useFormattedState } from './useGameEngine';
export type { UseGameEngineReturn, UseGameEngineOptions } from './useGameEngine';

// React components
export { GameRenderer, StatDisplay, ActionButton } from './GameRenderer';
export type { GameRendererProps, CustomComponentProps } from './GameRenderer';

// Legacy Poketrader rules engine (for backwards compatibility)
export { RulesEngine, rulesEngine, GAME_RULES } from './rules';
export type { GameRule, RuleEngineState, RuleMatch } from './rules';
