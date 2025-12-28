import type { MarketEvent } from '../types';

interface EventBannerProps {
  event: MarketEvent;
  timer: number;
  onClick: () => void;
}

export function EventBanner({ event, timer, onClick }: EventBannerProps) {
  return (
    <div className="event-banner" onClick={onClick}>
      <div className="event-content">
        <span className="event-title">{event.title}</span>
        <span className="event-timer">{timer}s - Click to learn</span>
      </div>
    </div>
  );
}
