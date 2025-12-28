import type { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="notifications-container">
      {notifications.map(n => (
        <div key={n.id} className="notification">
          {n.message}
        </div>
      ))}
    </div>
  );
}
