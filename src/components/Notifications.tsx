import { useState } from 'react';
import type { Notification } from '../types';
import { getSpriteUrl } from '../data';

interface NotificationsProps {
  notifications: Notification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (notifications.length === 0) return null;

  const latestNotification = notifications[notifications.length - 1];
  const messageCount = notifications.length;

  return (
    <div className={`console-container ${isExpanded ? 'expanded' : ''}`}>
      <div
        className="console-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="console-indicator">▶</span>
        <span className="console-latest">
          {latestNotification.advisor && (
            <img
              src={getSpriteUrl(latestNotification.advisor.spriteId)}
              alt=""
              className="console-sprite"
            />
          )}
          {latestNotification.message}
        </span>
        <span className="console-count">{messageCount}</span>
        <span className="console-toggle">{isExpanded ? '▼' : '▲'}</span>
      </div>

      {isExpanded && (
        <div className="console-log">
          {[...notifications].reverse().map(n => (
            <div key={n.id} className="console-entry">
              {n.advisor && (
                <img
                  src={getSpriteUrl(n.advisor.spriteId)}
                  alt=""
                  className="console-sprite"
                />
              )}
              <span className="console-message" style={n.advisor ? { color: n.advisor.color } : undefined}>
                {n.advisor && <strong>{n.advisor.name}: </strong>}
                {n.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
