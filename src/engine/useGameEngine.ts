/**
 * useGameEngine - React Hook for Game Engine Integration
 *
 * Provides a seamless connection between the JSON game engine
 * and React components with automatic re-rendering.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GameEngine } from './GameEngine';
import type {
  GameDefinition,
  GameState,
  GameMessage,
  SpawnedEntity,
  ProjectDefinition,
} from './types';
import { evaluateCondition, evaluateExpression, formatValue } from './evaluator';

export interface UseGameEngineOptions {
  autoStart?: boolean;
  autoLoad?: boolean;
}

export interface UseGameEngineReturn {
  // State
  state: GameState;
  phase: string | null;
  tick: number;
  messages: GameMessage[];
  entities: SpawnedEntity[];

  // Projects
  availableProjects: ProjectDefinition[];
  completedProjects: Record<string, number>;
  purchaseProject: (projectId: string) => boolean;
  canAffordProject: (projectId: string) => boolean;

  // Actions
  playerAction: (actionId: string) => void;
  getState: <T = number | boolean | string>(path: string) => T | undefined;
  setState: (path: string, value: number | boolean | string) => void;

  // Engine control
  start: () => void;
  stop: () => void;
  reset: () => void;
  save: (slot?: string) => void;
  load: (slot?: string) => boolean;

  // Helpers
  evaluate: (expr: import('./types').Expression) => number | boolean | string;
  checkCondition: (cond: import('./types').Condition) => boolean;
  format: (value: number | boolean | string, formatType?: string, precision?: number) => string;

  // Engine reference (for advanced use)
  engine: GameEngine;
}

export function useGameEngine(
  definition: GameDefinition,
  options: UseGameEngineOptions = {}
): UseGameEngineReturn {
  const { autoStart = true, autoLoad = true } = options;

  // State
  const [state, setStateInternal] = useState<GameState>({});
  const [phase, setPhase] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [entities, setEntities] = useState<SpawnedEntity[]>([]);
  const [activeProjectIds, setActiveProjectIds] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Record<string, number>>({});

  // Engine instance - stable reference
  const engineRef = useRef<GameEngine | null>(null);

  // Create engine with event handlers
  const engine = useMemo(() => {
    const eng = new GameEngine(definition, {
      onStateChange: (newState) => {
        setStateInternal({ ...newState });
        setCompletedProjects({ ...eng.getRuntime().completedProjects });
      },
      onMessage: (msg) => {
        setMessages(prev => [...prev.slice(-99), msg]);
      },
      onPhaseChange: (newPhase) => {
        setPhase(newPhase);
      },
      onProjectsChange: (available) => {
        setActiveProjectIds([...available]);
      },
      onTick: (t) => {
        setTick(t);
      },
      onSpawn: (entity) => {
        setEntities(prev => [...prev, entity]);
      },
      onEmit: (event, data) => {
        // Custom event handling can be added here
        console.log('Game event:', event, data);
      },
      onAnimate: (target, animation, duration, options) => {
        // Animation handling - could trigger CSS animations
        console.log('Animate:', target, animation, duration, options);
      },
      onSound: (sound, options) => {
        // Sound handling - could use Web Audio API
        console.log('Sound:', sound, options);
      },
    });

    engineRef.current = eng;
    return eng;
  }, [definition]);

  // Initialize state from engine
  useEffect(() => {
    const runtime = engine.getRuntime();
    setStateInternal({ ...runtime.state });
    setPhase(runtime.phase);
    setTick(runtime.tick);
    setMessages([...runtime.messages]);
    setEntities([...runtime.entities]);
    setActiveProjectIds([...runtime.activeProjects]);
    setCompletedProjects({ ...runtime.completedProjects });
  }, [engine]);

  // Auto-load saved game
  useEffect(() => {
    if (autoLoad) {
      engine.load();
    }
  }, [engine, autoLoad]);

  // Auto-start engine
  useEffect(() => {
    if (autoStart) {
      engine.start();
    }
    return () => {
      engine.stop();
    };
  }, [engine, autoStart]);

  // Sync entities from engine periodically
  useEffect(() => {
    const syncEntities = () => {
      setEntities([...engine.getEntities()]);
    };

    // Sync on tick
    const interval = setInterval(syncEntities, definition.config.tickRate * 10);
    return () => clearInterval(interval);
  }, [engine, definition.config.tickRate]);

  // Get available projects with full definitions
  const availableProjects = useMemo(() => {
    return activeProjectIds
      .map(id => engine.getProject(id))
      .filter((p): p is ProjectDefinition => p !== undefined);
  }, [activeProjectIds, engine]);

  // Purchase project
  const purchaseProject = useCallback((projectId: string) => {
    return engine.purchaseProject(projectId);
  }, [engine]);

  // Check if can afford project
  const canAffordProject = useCallback((projectId: string) => {
    const project = engine.getProject(projectId);
    if (!project) return false;

    const ctx = {
      state: engine.getRuntime().state,
      tick: engine.getRuntime().tick,
      deltaTime: 0,
      random: Math.random,
    };

    for (const cost of project.costs) {
      const amount = evaluateExpression(cost.amount, ctx);
      const current = engine.getState<number>(cost.resource) ?? 0;
      const amountNum = typeof amount === 'number' ? amount : 0;
      if (current < amountNum) return false;
    }
    return true;
  }, [engine]);

  // Player action
  const playerAction = useCallback((actionId: string) => {
    engine.playerAction(actionId);
  }, [engine]);

  // Get state value
  const getState = useCallback(<T = number | boolean | string>(path: string) => {
    return engine.getState<T>(path);
  }, [engine]);

  // Set state value
  const setState = useCallback((path: string, value: number | boolean | string) => {
    engine.setState(path, value);
  }, [engine]);

  // Engine control
  const start = useCallback(() => engine.start(), [engine]);
  const stop = useCallback(() => engine.stop(), [engine]);
  const reset = useCallback(() => {
    engine.reset();
    setMessages([]);
    setEntities([]);
  }, [engine]);
  const save = useCallback((slot?: string) => engine.save(slot), [engine]);
  const load = useCallback((slot?: string) => engine.load(slot), [engine]);

  // Helper: evaluate expression
  const evaluate = useCallback((expr: import('./types').Expression) => {
    const ctx = {
      state: engine.getRuntime().state,
      tick: engine.getRuntime().tick,
      deltaTime: 0,
      random: Math.random,
      functions: definition.functions,
    };
    return evaluateExpression(expr, ctx);
  }, [engine, definition.functions]);

  // Helper: check condition
  const checkCondition = useCallback((cond: import('./types').Condition) => {
    const ctx = {
      state: engine.getRuntime().state,
      tick: engine.getRuntime().tick,
      deltaTime: 0,
      random: Math.random,
      functions: definition.functions,
    };
    return evaluateCondition(cond, ctx);
  }, [engine, definition.functions]);

  // Helper: format value
  const format = useCallback((
    value: number | boolean | string,
    formatType?: string,
    precision?: number
  ) => {
    return formatValue(value, formatType, precision);
  }, []);

  return {
    state,
    phase,
    tick,
    messages,
    entities,
    availableProjects,
    completedProjects,
    purchaseProject,
    canAffordProject,
    playerAction,
    getState,
    setState,
    start,
    stop,
    reset,
    save,
    load,
    evaluate,
    checkCondition,
    format,
    engine,
  };
}

/**
 * Helper hook for binding a specific state value
 */
export function useGameState<T = number>(
  engine: UseGameEngineReturn,
  path: string
): T | undefined {
  return engine.state[path] as T | undefined;
}

/**
 * Helper hook for formatted state display
 */
export function useFormattedState(
  engine: UseGameEngineReturn,
  path: string,
  format?: string,
  precision?: number
): string {
  const value = engine.state[path];
  if (value === undefined) return '';
  return formatValue(value as number | boolean | string, format, precision);
}
