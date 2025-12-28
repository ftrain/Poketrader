import { useState, useMemo } from 'react';
import { useGameState } from './hooks';
import {
  StatCard,
  EventBanner,
  ClickerButton,
  Navigation,
  Notifications,
  LessonModal,
  StartupModal,
  EnvelopeModal,
  AdvisorTip
} from './components';
import {
  MarketView,
  PacksView,
  CollectionView,
  UpgradesView,
  LessonsView,
  PackOpeningModal,
  RulesView,
  GradingView,
  SpeedAppraisalGame
} from './views';
import type { RuleEngineState } from './engine';
import { formatMoney } from './utils';
import {
  VERSION,
  getEventTips,
  getCollectionTips,
  getMarketTips,
  getStrategyTip
} from './data';
import type { AdvisorTip as AdvisorTipType } from './data';
import './App.css';

export function App() {
  const game = useGameState();
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());

  // Calculate current advisor tip
  const currentTip = useMemo((): AdvisorTipType | null => {
    // Priority order: event tips > collection tips > market tips > strategy tips
    const eventTip = getEventTips(game.currentEvent);
    if (eventTip && !dismissedTips.has(eventTip.id)) return eventTip;

    const collectionTip = getCollectionTips(game.collection, game.money, game.currentEvent);
    if (collectionTip && !dismissedTips.has(collectionTip.id)) return collectionTip;

    const marketTip = getMarketTips(game.market, game.money, game.collection);
    if (marketTip && !dismissedTips.has(marketTip.id)) return marketTip;

    const strategyTip = getStrategyTip(game.totalSold, game.packsOpened);
    if (strategyTip && !dismissedTips.has(strategyTip.id)) return strategyTip;

    return null;
  }, [game.currentEvent, game.collection, game.money, game.market, game.totalSold, game.packsOpened, dismissedTips]);

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => new Set([...prev, tipId]));
    // Auto-clear dismissed tips after 60 seconds so they can reappear
    setTimeout(() => {
      setDismissedTips(prev => {
        const next = new Set(prev);
        next.delete(tipId);
        return next;
      });
    }, 60000);
  };

  // Show startup modal if no path chosen
  if (!game.starterPath) {
    return (
      <div className="app">
        <StartupModal onChoosePath={game.chooseStarterPath} />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div>
          <span className="terminal-title">POKE-TERMINAL v{VERSION}</span>
          <span className="terminal-subtitle">Pokemon Trading Economics Simulator</span>
        </div>
        <button
          className="reset-btn"
          onClick={() => {
            if (window.confirm('Reset game? All progress will be lost!')) {
              game.resetGame();
            }
          }}
        >
          ↺
        </button>
      </div>

      {/* Debt Banner - Click to pay $50 */}
      {game.debt > 0 && (
        <div
          className="debt-banner"
          onClick={() => game.payDebt(50)}
          style={{ cursor: game.money >= 50 ? 'pointer' : 'default' }}
        >
          <span className="debt-label">Debt: {formatMoney(game.debt)}</span>
          {game.money >= 50 && (
            <button className="debt-pay-btn">Pay $50</button>
          )}
          <span className="debt-info">20% auto-pay</span>
        </div>
      )}

      {/* Header Stats */}
      <div className="stats-grid">
        <StatCard
          icon="💰"
          label="Balance"
          value={formatMoney(game.money)}
          color="#4caf50"
        />
        <StatCard
          icon="📈"
          label="Total Profit"
          value={`${game.totalProfit >= 0 ? '+' : ''}${formatMoney(game.totalProfit)}`}
          color={game.totalProfit >= 0 ? '#4caf50' : '#f44336'}
        />
        <StatCard
          icon="🃏"
          label="Collection"
          value={formatMoney(game.collectionValue)}
          subtext={`${game.capacity - game.collection.length} slots free`}
          color="#9c27b0"
        />
        <StatCard
          icon="⚡"
          label="Per Click"
          value={`$${game.clickPower}`}
          color="#ff9800"
        />
      </div>

      {/* Market Event Banner */}
      {game.currentEvent && (
        <EventBanner
          event={game.currentEvent}
          timer={game.eventTimer}
          onClick={() => game.setShowLesson(game.currentEvent!.lesson)}
        />
      )}

      {/* Advisor Tip - Actionable Advice */}
      {currentTip && (
        <AdvisorTip
          tip={currentTip}
          onDismiss={() => dismissTip(currentTip.id)}
        />
      )}

      {/* Clicker Button */}
      <ClickerButton
        clickPower={game.clickPower}
        clickEffects={game.clickEffects}
        comboCount={game.comboCount}
        comboMultiplier={game.comboMultiplier}
        onClick={game.handleClick}
      />

      {/* Navigation Tabs */}
      <Navigation
        currentView={game.view}
        onViewChange={game.setView}
        showGrading={game.totalSold >= 5 || game.collection.some(c => c.currentPrice >= 50)}
        showGame={game.totalSold >= 3}
      />

      {/* Views */}
      {game.view === 'market' && (
        <MarketView
          market={game.market}
          money={game.money}
          discount={game.discount}
          collectionSize={game.collection.length}
          capacity={game.capacity}
          onBuyCard={game.buyCard}
          onRefresh={game.refreshMarket}
        />
      )}

      {game.view === 'packs' && (
        <PacksView
          money={game.money}
          packsOpened={game.packsOpened}
          packStats={game.packStats}
          collectionSize={game.collection.length}
          capacity={game.capacity}
          onOpenPack={game.openPack}
        />
      )}

      {game.view === 'collection' && (
        <CollectionView
          collection={game.collection}
          sellBonus={game.sellBonus}
          onSellCard={game.sellCard}
          onBatchSell={game.batchSellCards}
        />
      )}

      {game.view === 'grading' && (
        <GradingView
          collection={game.collection}
          gradingQueue={game.gradingQueue}
          gradedCards={game.gradedCards}
          money={game.money}
          gameTime={game.gameTime}
          onSubmitForGrading={game.submitForGrading}
          onCollectGradedCard={game.collectGradedCard}
        />
      )}

      {game.view === 'appraisal' && (
        <SpeedAppraisalGame
          money={game.money}
          appraisers={game.appraisers}
          onStartGame={game.startAppraisalGame}
          onWinGame={game.winAppraisalGame}
          onTrainAppraiser={game.trainAppraiser}
        />
      )}

      {game.view === 'upgrades' && (
        <UpgradesView
          money={game.money}
          ownedUpgrades={game.upgrades}
          onBuyUpgrade={game.buyUpgrade}
        />
      )}

      {game.view === 'lessons' && (
        <LessonsView unlockedAchievements={game.achievements} />
      )}

      {game.view === 'rules' && (
        <RulesView
          gameState={{
            money: game.money,
            collection: game.collection,
            totalSold: game.totalSold,
            totalProfit: game.totalProfit,
            longestHold: game.longestHold,
            packsOpened: game.packsOpened,
            packStats: game.packStats,
            market: game.market,
            currentEvent: game.currentEvent,
            eventTimer: game.eventTimer,
            gameTime: game.gameTime,
            upgrades: game.upgrades,
            clickPower: game.clickPower,
            passiveIncome: game.passiveIncome,
            discount: game.discount,
            sellBonus: game.sellBonus,
            capacity: game.capacity
          } as RuleEngineState}
        />
      )}

      {/* Pack Opening Modal */}
      {game.isOpeningPack && game.packResults && (
        <PackOpeningModal
          packResults={game.packResults}
          revealedCards={game.revealedCards}
          onClose={game.closePackResults}
        />
      )}

      {/* Lesson Modal */}
      {game.showLesson && (
        <LessonModal
          lesson={game.showLesson}
          onClose={() => game.setShowLesson(null)}
        />
      )}

      {/* Envelope Modal for Grading Results */}
      {game.envelopeCard && (
        <EnvelopeModal
          gradedCard={game.envelopeCard}
          onClose={game.closeEnvelopeModal}
        />
      )}

      {/* Notifications */}
      <Notifications notifications={game.notifications} />
    </div>
  );
}
