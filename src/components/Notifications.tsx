import type { Notification } from '../types';
import { getSpriteUrl } from '../data';

interface NotificationsProps {
  notifications: Notification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="notifications-container">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`notification ${n.advisor ? 'pokemon-voice' : ''}`}
          style={n.advisor ? { borderColor: n.advisor.color } : undefined}
        >
          {n.advisor && (
            <div className="pokemon-advisor-header">
              <img
                src={getSpriteUrl(n.advisor.spriteId)}
                alt={n.advisor.name}
                className="advisor-sprite"
              />
              <span className="pokemon-speaker" style={{ color: n.advisor.color }}>
                {n.advisor.name} says:
              </span>
            </div>
          )}
          <span className={n.advisor ? 'pokemon-message' : ''} style={n.advisor ? { color: n.advisor.color } : undefined}>
            {n.message}
          </span>
        </div>
      ))}
    </div>
  );
}
