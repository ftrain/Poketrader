import { useGameState } from './hooks';
import {
  StatCard,
  EventBanner,
  ClickerButton,
  Navigation,
  Notifications,
  LessonModal
} from './components';
import {
  MarketView,
  PacksView,
  CollectionView,
  UpgradesView,
  LessonsView,
  PackOpeningModal,
  RulesView
} from './views';
import type { RuleEngineState } from './engine';
import { formatMoney } from './utils';
import './App.css';

export function App() {
  const game = useGameState();

  return (
    <div className="app">
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
          value={`${game.collection.length}/${game.capacity}`}
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

      {/* Clicker Button */}
      <ClickerButton
        clickPower={game.clickPower}
        clickEffects={game.clickEffects}
        onClick={game.handleClick}
      />

      {/* Navigation Tabs */}
      <Navigation
        currentView={game.view}
        onViewChange={game.setView}
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

      {/* Notifications */}
      <Notifications notifications={game.notifications} />
    </div>
  );
}
