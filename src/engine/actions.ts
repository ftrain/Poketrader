/**
 * Action Executor
 *
 * Executes actions that modify game state.
 */

import type {
  Action,
  Expression,
  EvaluationContext,
  GameState,
  GameMessage,
  PendingAction,
  SpawnedEntity,
  AnimateOptions,
  SoundOptions,
  ModifyEntityAction,
  RemoveEntityAction,
  ForEachEntityAction,
} from './types';

import {
  evaluateExpression,
  evaluateCondition,
  evaluateEntityCondition,
  getStateValue,
  setStateValue,
} from './evaluator';

export interface ActionExecutorConfig {
  onMessage?: (message: GameMessage) => void;
  onEvent?: (eventId: string) => void;
  onEmit?: (event: string, data?: Record<string, unknown>) => void;
  onSpawn?: (entity: SpawnedEntity) => void;
  onModifyEntity?: (entityId: string, updates: Record<string, number | boolean | string>) => void;
  onRemoveEntity?: (entityId: string) => void;
  onAnimate?: (target: string, animation: string, duration?: number, options?: AnimateOptions) => void;
  onSound?: (sound: string, options: SoundOptions) => void;
  onDelay?: (pending: PendingAction) => void;
  functions?: Record<string, Action[]>;
  currentTick?: number;
  entities?: SpawnedEntity[];  // Reference to entities array for entity actions
}

let pendingActionIdCounter = 0;
let spawnedEntityIdCounter = 0;

/**
 * Execute a single action or array of actions
 */
export function executeAction(
  action: Action | Action[],
  ctx: EvaluationContext,
  config: ActionExecutorConfig = {}
): void {
  if (Array.isArray(action)) {
    for (const a of action) {
      executeAction(a, ctx, config);
    }
    return;
  }

  switch (action.action) {
    case 'set': {
      const value = evaluateExpression(action.value, ctx);
      setStateValue(ctx.state, action.target, value);
      break;
    }

    case 'add': {
      const current = getStateValue(ctx.state, action.target);
      const addValue = evaluateExpression(action.value, ctx);
      const currentNum = typeof current === 'number' ? current : 0;
      const addNum = typeof addValue === 'number' ? addValue : parseFloat(String(addValue)) || 0;
      setStateValue(ctx.state, action.target, currentNum + addNum);
      break;
    }

    case 'multiply': {
      const current = getStateValue(ctx.state, action.target);
      const mulValue = evaluateExpression(action.value, ctx);
      const currentNum = typeof current === 'number' ? current : 0;
      const mulNum = typeof mulValue === 'number' ? mulValue : parseFloat(String(mulValue)) || 0;
      setStateValue(ctx.state, action.target, currentNum * mulNum);
      break;
    }

    case 'toggle': {
      const current = getStateValue(ctx.state, action.target);
      setStateValue(ctx.state, action.target, !current);
      break;
    }

    case 'message': {
      if (config.onMessage) {
        config.onMessage({
          text: action.text,
          type: action.type || 'info',
          timestamp: Date.now(),
          icon: action.icon,
        });
      }
      break;
    }

    case 'trigger': {
      if (config.onEvent) {
        config.onEvent(action.event);
      }
      break;
    }

    case 'if': {
      if (evaluateCondition(action.condition, ctx)) {
        executeAction(action.then, ctx, config);
      } else if (action.else) {
        executeAction(action.else, ctx, config);
      }
      break;
    }

    case 'sequence': {
      executeAction(action.actions, ctx, config);
      break;
    }

    case 'call': {
      const fn = config.functions?.[action.function] || ctx.functions?.[action.function];
      if (fn) {
        let fnCtx = ctx;
        if (action.args) {
          const evaledArgs: Record<string, number | boolean | string> = {};
          for (const [key, expr] of Object.entries(action.args)) {
            evaledArgs[key] = evaluateExpression(expr, ctx);
          }
          fnCtx = {
            ...ctx,
            state: { ...ctx.state, _args: evaledArgs } as GameState,
          };
        }
        executeAction(fn, fnCtx, config);
      } else {
        console.warn(`Function not found: ${action.function}`);
      }
      break;
    }

    case 'delay': {
      const ticks = evaluateExpression(action.ticks, ctx);
      const ticksNum = typeof ticks === 'number' ? Math.floor(ticks) : 1;
      const currentTick = config.currentTick ?? ctx.tick ?? 0;

      const pendingAction: PendingAction = {
        id: `pending_${++pendingActionIdCounter}`,
        executeTick: currentTick + ticksNum,
        actions: action.actions,
      };

      if (config.onDelay) {
        config.onDelay(pendingAction);
      }
      break;
    }

    case 'repeat': {
      const count = evaluateExpression(action.count, ctx);
      const countNum = typeof count === 'number' ? Math.floor(count) : 0;

      for (let i = 0; i < countNum; i++) {
        const prevValue = action.indexVar ? ctx.state[action.indexVar] : undefined;
        const hadPrevValue = action.indexVar ? action.indexVar in ctx.state : false;

        if (action.indexVar) {
          ctx.state[action.indexVar] = i;
        }

        executeAction(action.actions, ctx, config);

        if (action.indexVar) {
          if (hadPrevValue) {
            ctx.state[action.indexVar] = prevValue as number | boolean | string;
          } else {
            delete ctx.state[action.indexVar];
          }
        }
      }
      break;
    }

    case 'random': {
      if (action.choices.length === 0) break;

      let totalWeight = 0;
      const weights: number[] = [];
      for (const choice of action.choices) {
        const weight = choice.weight
          ? evaluateExpression(choice.weight, ctx)
          : 1;
        const weightNum = typeof weight === 'number' ? Math.max(0, weight) : 1;
        weights.push(weightNum);
        totalWeight += weightNum;
      }

      if (totalWeight <= 0) break;

      let roll = ctx.random() * totalWeight;
      for (let i = 0; i < action.choices.length; i++) {
        roll -= weights[i];
        if (roll <= 0) {
          executeAction(action.choices[i].actions, ctx, config);
          break;
        }
      }
      break;
    }

    case 'loop': {
      const maxIterations = action.maxIterations ?? 1000;
      let iterations = 0;

      while (evaluateCondition(action.while, ctx) && iterations < maxIterations) {
        executeAction(action.actions, ctx, config);
        iterations++;
      }
      break;
    }

    case 'forEach': {
      const from = evaluateExpression(action.from, ctx);
      const to = evaluateExpression(action.to, ctx);
      const step = action.step ? evaluateExpression(action.step, ctx) : 1;

      const fromNum = typeof from === 'number' ? from : 0;
      const toNum = typeof to === 'number' ? to : 0;
      const stepNum = typeof step === 'number' && step !== 0 ? step : 1;

      const prevValue = ctx.state[action.indexVar];
      const hadPrevValue = action.indexVar in ctx.state;

      const maxIterations = 10000;
      let iterations = 0;

      if (stepNum > 0) {
        for (let i = fromNum; i < toNum && iterations < maxIterations; i += stepNum) {
          ctx.state[action.indexVar] = i;
          executeAction(action.actions, ctx, config);
          iterations++;
        }
      } else {
        for (let i = fromNum; i > toNum && iterations < maxIterations; i += stepNum) {
          ctx.state[action.indexVar] = i;
          executeAction(action.actions, ctx, config);
          iterations++;
        }
      }

      if (hadPrevValue) {
        ctx.state[action.indexVar] = prevValue;
      } else {
        delete ctx.state[action.indexVar];
      }
      break;
    }

    case 'spawn': {
      const count = action.count ? evaluateExpression(action.count, ctx) : 1;
      const countNum = typeof count === 'number' ? Math.floor(count) : 1;

      for (let i = 0; i < countNum; i++) {
        const properties: Record<string, number | boolean | string> = {};
        if (action.properties) {
          for (const [key, expr] of Object.entries(action.properties)) {
            properties[key] = evaluateExpression(expr, ctx);
          }
        }

        const entity: SpawnedEntity = {
          id: `entity_${++spawnedEntityIdCounter}`,
          type: action.type,
          properties,
          spawnTick: config.currentTick ?? ctx.tick ?? 0,
        };

        if (config.onSpawn) {
          config.onSpawn(entity);
        }
      }
      break;
    }

    case 'emit': {
      const data: Record<string, unknown> = {};
      if (action.data) {
        for (const [key, expr] of Object.entries(action.data)) {
          data[key] = evaluateExpression(expr, ctx);
        }
      }

      if (config.onEmit) {
        config.onEmit(action.event, Object.keys(data).length > 0 ? data : undefined);
      }
      break;
    }

    case 'animate': {
      const duration = action.duration ? evaluateExpression(action.duration, ctx) : undefined;
      const durationNum = typeof duration === 'number' ? duration : undefined;

      const options: AnimateOptions = {};
      if (action.options) {
        if (action.options.delay) {
          const delay = evaluateExpression(action.options.delay, ctx);
          options.delay = typeof delay === 'number' ? delay : undefined;
        }
        if (action.options.iterations) {
          const iterations = evaluateExpression(action.options.iterations, ctx);
          options.iterations = typeof iterations === 'number' ? iterations : undefined;
        }
        if (action.options.direction) {
          options.direction = action.options.direction;
        }
        if (action.options.fill) {
          options.fill = action.options.fill;
        }
      }

      if (config.onAnimate) {
        config.onAnimate(action.target, action.animation, durationNum, options);
      }
      break;
    }

    case 'sound': {
      const volume = action.volume ? evaluateExpression(action.volume, ctx) : 1;
      const fadeIn = action.fadeIn ? evaluateExpression(action.fadeIn, ctx) : undefined;
      const fadeOut = action.fadeOut ? evaluateExpression(action.fadeOut, ctx) : undefined;

      const options: SoundOptions = {
        volume: typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : 1,
        loop: action.loop,
        channel: action.channel,
        fadeIn: typeof fadeIn === 'number' ? fadeIn : undefined,
        fadeOut: typeof fadeOut === 'number' ? fadeOut : undefined,
      };

      if (config.onSound) {
        config.onSound(action.sound, options);
      }
      break;
    }

    case 'modifyEntity': {
      const modifyAction = action as ModifyEntityAction;
      const entities = config.entities || ctx.entities || [];

      // Find matching entities
      let targetEntities: SpawnedEntity[] = [];

      if (modifyAction.entityId) {
        const entityIdValue = evaluateExpression(modifyAction.entityId, ctx);
        const entityId = String(entityIdValue);

        if (entityId === 'all') {
          // Modify all entities of type
          targetEntities = modifyAction.entityType
            ? entities.filter(e => e.type === modifyAction.entityType)
            : [...entities];
        } else if (entityId === '_current' && ctx.currentEntity) {
          // Modify current entity in forEachEntity loop
          targetEntities = [ctx.currentEntity];
        } else {
          // Modify specific entity by ID
          const entity = entities.find(e => e.id === entityId);
          if (entity) targetEntities = [entity];
        }
      } else if (modifyAction.entityType) {
        targetEntities = entities.filter(e => e.type === modifyAction.entityType);
      }

      // Filter by where condition
      if (modifyAction.where) {
        targetEntities = targetEntities.filter(e =>
          evaluateEntityCondition(modifyAction.where!, e, ctx)
        );
      }

      // Apply updates
      for (const entity of targetEntities) {
        const updates: Record<string, number | boolean | string> = {};
        for (const [key, expr] of Object.entries(modifyAction.set)) {
          // Create context with current entity for expressions
          const entityCtx = { ...ctx, currentEntity: entity };
          updates[key] = evaluateExpression(expr, entityCtx);
        }

        // Update entity properties directly
        Object.assign(entity.properties, updates);

        // Notify callback
        if (config.onModifyEntity) {
          config.onModifyEntity(entity.id, updates);
        }
      }
      break;
    }

    case 'removeEntity': {
      const removeAction = action as RemoveEntityAction;
      const entities = config.entities || ctx.entities || [];

      // Find entities to remove
      let toRemove: SpawnedEntity[] = [];

      if (removeAction.entityId) {
        const entityIdValue = evaluateExpression(removeAction.entityId, ctx);
        const entityId = String(entityIdValue);

        if (entityId === '_current' && ctx.currentEntity) {
          toRemove = [ctx.currentEntity];
        } else {
          const entity = entities.find(e => e.id === entityId);
          if (entity) toRemove = [entity];
        }
      } else if (removeAction.entityType) {
        toRemove = entities.filter(e => e.type === removeAction.entityType);
      }

      // Filter by where condition
      if (removeAction.where) {
        toRemove = toRemove.filter(e =>
          evaluateEntityCondition(removeAction.where!, e, ctx)
        );
      }

      // Only remove first if specified
      if (removeAction.first && toRemove.length > 0) {
        toRemove = [toRemove[0]];
      }

      // Remove entities
      for (const entity of toRemove) {
        if (config.onRemoveEntity) {
          config.onRemoveEntity(entity.id);
        }
      }
      break;
    }

    case 'forEachEntity': {
      const forEachAction = action as ForEachEntityAction;
      let entities = config.entities || ctx.entities || [];

      // Filter by type
      entities = entities.filter(e => e.type === forEachAction.entityType);

      // Filter by where condition
      if (forEachAction.where) {
        entities = entities.filter(e =>
          evaluateEntityCondition(forEachAction.where!, e, ctx)
        );
      }

      // Apply limit
      if (forEachAction.limit && forEachAction.limit > 0) {
        entities = entities.slice(0, forEachAction.limit);
      }

      // Execute actions for each entity
      for (const entity of entities) {
        // Create context with current entity bound
        const entityCtx: EvaluationContext = {
          ...ctx,
          currentEntity: entity,
          state: {
            ...ctx.state,
            [forEachAction.as]: entity.id,
          } as GameState,
        };

        executeAction(forEachAction.actions, entityCtx, config);
      }
      break;
    }

    default:
      console.warn('Unknown action type:', (action as Action).action);
  }
}

/**
 * Apply cost deductions for a project/purchase
 */
export function applyCosts(
  costs: { resource: string; amount: Expression; consumeOnPurchase?: boolean }[],
  ctx: EvaluationContext
): boolean {
  for (const cost of costs) {
    const amount = evaluateExpression(cost.amount, ctx);
    const current = getStateValue(ctx.state, cost.resource);
    const amountNum = typeof amount === 'number' ? amount : parseFloat(String(amount)) || 0;
    const currentNum = typeof current === 'number' ? current : 0;

    if (currentNum < amountNum) {
      return false;
    }
  }

  for (const cost of costs) {
    if (cost.consumeOnPurchase === false) continue;

    const amount = evaluateExpression(cost.amount, ctx);
    const current = getStateValue(ctx.state, cost.resource);
    const amountNum = typeof amount === 'number' ? amount : parseFloat(String(amount)) || 0;
    const currentNum = typeof current === 'number' ? current : 0;

    setStateValue(ctx.state, cost.resource, currentNum - amountNum);
  }

  return true;
}

/**
 * Check if costs can be afforded
 */
export function canAfford(
  costs: { resource: string; amount: Expression }[],
  ctx: EvaluationContext
): boolean {
  for (const cost of costs) {
    const amount = evaluateExpression(cost.amount, ctx);
    const current = getStateValue(ctx.state, cost.resource);
    const amountNum = typeof amount === 'number' ? amount : parseFloat(String(amount)) || 0;
    const currentNum = typeof current === 'number' ? current : 0;

    if (currentNum < amountNum) {
      return false;
    }
  }
  return true;
}
