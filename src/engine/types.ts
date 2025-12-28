/**
 * Universal Game Engine Types
 *
 * A complete type system for JSON-driven games with React frontend.
 * Supports both Paperclips and Poketrader game styles.
 */

// ============================================================================
// CORE VALUE TYPES
// ============================================================================

/** Expression that can reference game state or be a literal value */
export type Expression =
  | number
  | string
  | boolean
  | { ref: string }  // Reference to a state value
  | { op: Operator; args: Expression[] };  // Operation on values

/** Operators for expressions */
export type Operator =
  | 'add' | 'sub' | 'mul' | 'div' | 'mod' | 'pow'
  | 'min' | 'max' | 'floor' | 'ceil' | 'round' | 'abs'
  | 'sin' | 'cos' | 'random'
  | 'and' | 'or' | 'not'
  | 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte'
  | 'if' | 'coalesce';

/** Condition for triggering rules */
export type Condition =
  | { op: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte'; left: Expression; right: Expression }
  | { op: 'and' | 'or'; conditions: Condition[] }
  | { op: 'not'; condition: Condition }
  | { op: 'true' } | { op: 'false' }
  | { op: 'flag'; flag: string }
  | { op: 'between'; value: Expression; min: Expression; max: Expression };

// ============================================================================
// STATE DEFINITIONS
// ============================================================================

/** Definition of a single state variable */
export interface StateVariableDefinition {
  id: string;
  type: 'number' | 'boolean' | 'string';
  initial: number | boolean | string;
  description?: string;
  category?: string;
  min?: number;
  max?: number;
  precision?: number;
  persistent?: boolean;
}

/** Definition of game phases/milestones */
export interface PhaseDefinition {
  id: string;
  name: string;
  description?: string;
  trigger: Condition;
  onEnter?: Action[];
  onExit?: Action[];
}

// ============================================================================
// ACTIONS - State Changes
// ============================================================================

export type Action =
  | SetAction
  | AddAction
  | MultiplyAction
  | ToggleAction
  | MessageAction
  | TriggerEventAction
  | ConditionalAction
  | SequenceAction
  | CallAction
  | DelayAction
  | RepeatAction
  | RandomAction
  | LoopAction
  | ForEachAction
  | SpawnAction
  | EmitAction
  | AnimateAction
  | SoundAction;

export interface SetAction {
  action: 'set';
  target: string;
  value: Expression;
}

export interface AddAction {
  action: 'add';
  target: string;
  value: Expression;
}

export interface MultiplyAction {
  action: 'multiply';
  target: string;
  value: Expression;
}

export interface ToggleAction {
  action: 'toggle';
  target: string;
}

export interface MessageAction {
  action: 'message';
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
}

export interface TriggerEventAction {
  action: 'trigger';
  event: string;
}

export interface ConditionalAction {
  action: 'if';
  condition: Condition;
  then: Action[];
  else?: Action[];
}

export interface SequenceAction {
  action: 'sequence';
  actions: Action[];
}

export interface CallAction {
  action: 'call';
  function: string;
  args?: Record<string, Expression>;
}

export interface DelayAction {
  action: 'delay';
  ticks: Expression;
  actions: Action[];
}

export interface RepeatAction {
  action: 'repeat';
  count: Expression;
  actions: Action[];
  indexVar?: string;
}

export interface RandomAction {
  action: 'random';
  choices: {
    weight?: Expression;
    actions: Action[];
  }[];
}

export interface LoopAction {
  action: 'loop';
  while: Condition;
  actions: Action[];
  maxIterations?: number;
}

export interface ForEachAction {
  action: 'forEach';
  from: Expression;
  to: Expression;
  step?: Expression;
  indexVar: string;
  actions: Action[];
}

export interface SpawnAction {
  action: 'spawn';
  type: string;
  count?: Expression;
  properties?: Record<string, Expression>;
}

export interface EmitAction {
  action: 'emit';
  event: string;
  data?: Record<string, Expression>;
}

export interface AnimateAction {
  action: 'animate';
  target: string;
  animation: string;
  duration?: Expression;
  options?: {
    delay?: Expression;
    iterations?: Expression;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    fill?: 'none' | 'forwards' | 'backwards' | 'both';
  };
}

export interface SoundAction {
  action: 'sound';
  sound: string;
  volume?: Expression;
  loop?: boolean;
  channel?: string;
  fadeIn?: Expression;
  fadeOut?: Expression;
}

// ============================================================================
// RULES
// ============================================================================

export type RuleTiming =
  | 'tick'
  | 'second'
  | 'action'
  | 'stateChange'
  | 'phaseChange'
  | 'init'
  | 'load';

export interface RuleDefinition {
  id: string;
  name?: string;
  description?: string;
  timing: RuleTiming | RuleTiming[];
  priority?: number;
  enabled?: Condition;
  condition: Condition;
  actions: Action[];
  cooldown?: number;
  maxFires?: number;
  category?: string;
}

// ============================================================================
// PROJECTS / UPGRADES
// ============================================================================

export interface CostDefinition {
  resource: string;
  amount: Expression;
  consumeOnPurchase?: boolean;
}

export interface ProjectDefinition {
  id: string;
  name: string;
  description: string;
  priceTag?: string;
  icon?: string;
  trigger: Condition;
  costs: CostDefinition[];
  repeatable?: boolean;
  maxUses?: number;
  cooldown?: number;
  effects: Action[];
  category?: string;
  sortOrder?: number;
}

// ============================================================================
// UI DEFINITIONS (For React rendering)
// ============================================================================

export interface UIBinding {
  elementId: string;
  type: 'text' | 'display' | 'button' | 'progress' | 'visibility' | 'class' | 'style' | 'icon';
  value?: Expression;
  format?: 'number' | 'currency' | 'percentage' | 'scientific' | 'compact' | 'time';
  precision?: number;
  prefix?: string;
  suffix?: string;
  visible?: Condition;
  onClick?: string;
  enabled?: Condition;
  icon?: string;
  current?: Expression;
  max?: Expression;
  class?: string;
  condition?: Condition;
  style?: Record<string, Expression | string>;
  iconValue?: Expression;
  iconMap?: Record<string, string>;
}

export interface UISectionDefinition {
  id: string;
  name?: string;
  icon?: string;
  visible?: Condition;
  bindings: UIBinding[];
}

// ============================================================================
// CUSTOM COMPONENTS (For Poketrader cards, etc.)
// ============================================================================

export interface ComponentDefinition {
  id: string;
  type: string;  // 'card', 'collection', 'market', etc.
  props?: Record<string, Expression>;
  visible?: Condition;
}

// ============================================================================
// FULL GAME DEFINITION
// ============================================================================

export interface GameDefinition {
  meta: {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
  };

  config: {
    tickRate: number;
    autoSaveInterval?: number;
    maxMessages?: number;
  };

  state: StateVariableDefinition[];
  phases?: PhaseDefinition[];
  rules: RuleDefinition[];
  projects: ProjectDefinition[];

  ui?: {
    sections: UISectionDefinition[];
  };

  components?: ComponentDefinition[];

  functions?: Record<string, Action[]>;

  assets?: {
    css?: string[];
    images?: Record<string, string>;
    icons?: Record<string, IconDefinition>;
    audio?: Record<string, string>;
  };
}

export interface IconDefinition {
  type: 'svg' | 'image' | 'emoji' | 'fonticon';
  value: string;
  color?: string;
  size?: number;
}

// ============================================================================
// RUNTIME STATE
// ============================================================================

export interface GameState {
  [key: string]: number | boolean | string | unknown;
}

export interface EvaluationContext {
  state: GameState;
  tick: number;
  deltaTime: number;
  random: () => number;
  functions?: Record<string, Action[]>;
}

export interface GameMessage {
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  icon?: string;
}

export interface PendingAction {
  id: string;
  executeTick: number;
  actions: Action[];
}

export interface SpawnedEntity {
  id: string;
  type: string;
  properties: Record<string, number | boolean | string>;
  spawnTick: number;
}

export interface RuntimeState {
  state: GameState;
  tick: number;
  phase: string | null;
  messages: GameMessage[];
  activeProjects: string[];
  completedProjects: Record<string, number>;
  ruleFires: Record<string, { count: number; lastTick: number }>;
  pendingActions: PendingAction[];
  entities: SpawnedEntity[];
}

// ============================================================================
// ENGINE EVENTS (For React integration)
// ============================================================================

export interface GameEngineEvents {
  onStateChange?: (state: GameState) => void;
  onMessage?: (message: GameMessage) => void;
  onPhaseChange?: (phase: string | null) => void;
  onProjectsChange?: (available: string[]) => void;
  onTick?: (tick: number) => void;
  onEmit?: (event: string, data?: Record<string, unknown>) => void;
  onSpawn?: (entity: SpawnedEntity) => void;
  onAnimate?: (target: string, animation: string, duration?: number, options?: AnimateOptions) => void;
  onSound?: (sound: string, options: SoundOptions) => void;
}

export interface AnimateOptions {
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
  channel?: string;
  fadeIn?: number;
  fadeOut?: number;
}
