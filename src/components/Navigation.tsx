import type { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const TABS: { id: ViewType; label: string }[] = [
  { id: 'market', label: 'Market' },
  { id: 'packs', label: 'Packs' },
  { id: 'collection', label: 'Cards' },
  { id: 'upgrades', label: 'Upgrades' },
  { id: 'lessons', label: 'Learn' },
  { id: 'rules', label: 'Rules' },
];

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="navigation">
      {TABS.map(tab => (
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
