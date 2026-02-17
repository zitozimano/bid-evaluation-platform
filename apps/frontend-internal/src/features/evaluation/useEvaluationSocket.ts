import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const useEvaluationSocket = (
  tenderId: string | undefined,
  handlers: {
    onScoreUpdated?: () => void;
    onConsolidationUpdated?: () => void;
    onDashboardUpdated?: () => void;
  },
) => {
  useEffect(() => {
    if (!socket) {
      socket = io('/evaluation', { withCredentials: true });
    }

    if (tenderId) {
      socket.emit('join', { room: `tender-${tenderId}` });
    }

    const handleScoreUpdated = (payload: any) => {
      if (handlers.onScoreUpdated) handlers.onScoreUpdated();
    };

    const handleConsolidationUpdated = (payload: any) => {
      if (handlers.onConsolidationUpdated) handlers.onConsolidationUpdated();
    };

    const handleDashboardUpdated = () => {
      if (handlers.onDashboardUpdated) handlers.onDashboardUpdated();
    };

    socket.on('scoreUpdated', handleScoreUpdated);
    socket.on('consolidationUpdated', handleConsolidationUpdated);
    socket.on('dashboardUpdated', handleDashboardUpdated);

    return () => {
      socket?.off('scoreUpdated', handleScoreUpdated);
      socket?.off('consolidationUpdated', handleConsolidationUpdated);
      socket?.off('dashboardUpdated', handleDashboardUpdated);
    };
  }, [tenderId, handlers]);
};
