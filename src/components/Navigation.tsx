import type { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  showGrading?: boolean;
  showGame?: boolean;
}

export function Navigation({ currentView, onViewChange, showGrading = false, showGame = false }: NavigationProps) {
  const tabs: { id: ViewType; label: string; show: boolean }[] = [
    { id: 'market', label: 'Market', show: true },
    { id: 'packs', label: 'Packs', show: true },
    { id: 'collection', label: 'Cards', show: true },
    { id: 'grading', label: 'Grade', show: showGrading },
    { id: 'appraisal', label: 'Game', show: showGame },
    { id: 'upgrades', label: 'Upgrades', show: true },
    { id: 'lessons', label: 'Learn', show: true },
  ];

  return (
    <div className="navigation">
      {tabs.filter(t => t.show).map(tab => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`nav-button ${currentView === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
