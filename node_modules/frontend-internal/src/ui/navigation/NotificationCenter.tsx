import React from 'react';
import { notificationsApi } from '../../api/notifications';
import { useNotificationSocket } from '../../features/notifications/useNotificationSocket';
import { LoadingSkeleton } from '../../ui/feedback/LoadingSkeleton';
import { ErrorState } from '../../ui/feedback/ErrorState';

export const NotificationCenter: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const typeColors: Record<string, string> = {
    EVALUATION_ASSIGNMENT: 'text-blue-600',
    EVALUATION_MISSING_SCORES: 'text-yellow-600',
    EVALUATION_READY_FOR_CONSOLIDATION: 'text-green-600',
    EVALUATION_EVIDENCE_READY: 'text-purple-600',
  };

  const load = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await notificationsApi.list();
      setItems(res.data);
    } catch (e) {
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  // Real-time updates
  useNotificationSocket((notification) => {
    setItems((prev) => [notification, ...prev]);
  });

  const unread = items.filter((i) => !i.read).length;

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      // Silent fail — user can retry by clicking again
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-700 hover:text-gray-900"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow z-50">
          <div className="p-2 text-sm font-medium border-b">Notifications</div>

          {error && (
            <div className="p-2">
              <ErrorState message={error} onRetry={load} />
            </div>
          )}

          {loading && items.length === 0 && (
            <div className="p-3">
              <LoadingSkeleton lines={4} />
            </div>
          )}

          {!loading && items.length === 0 && !error && (
            <div className="p-3 text-sm text-gray-500">No notifications</div>
          )}

          {!loading &&
            items.map((n) => (
              <div
                key={n.id}
                className={`px-3 py-2 text-sm border-b hover:bg-gray-50 cursor-pointer ${
                  !n.read ? 'bg-gray-100' : ''
                }`}
                onClick={() => markAsRead(n.id)}
              >
                <div
                  className={`font-medium ${
                    typeColors[n.type] || 'text-gray-700'
                  }`}
                >
                  {n.title}
                </div>
                <div className="text-xs text-gray-500">{n.description}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
