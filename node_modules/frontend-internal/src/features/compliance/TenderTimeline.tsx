import React, { useEffect, useState } from 'react';
import { fetchTenderTimeline } from './api';

type TimelineEvent = {
  type: string;
  timestamp: string;
  description: string;
  payload?: any;
};

type Props = {
  tenderId: string;
};

export const TenderTimeline: React.FC<Props> = ({ tenderId }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchTenderTimeline(tenderId);
        setEvents(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [tenderId]);

  if (loading) return <div>Loading tender timeline…</div>;

  if (!events.length) return <div>No events recorded for this tender.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h3>Tender Lifecycle Timeline</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map((e, idx) => (
          <li
            key={idx}
            style={{
              borderLeft: '2px solid #ccc',
              marginLeft: 10,
              paddingLeft: 10,
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 12, color: '#666' }}>
              {new Date(e.timestamp).toLocaleString()}
            </div>
            <div style={{ fontWeight: 'bold' }}>{e.type}</div>
            <div>{e.description}</div>
            {e.payload && (
              <pre
                style={{
                  background: '#f7f7f7',
                  padding: 8,
                  marginTop: 4,
                  maxWidth: 600,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {JSON.stringify(e.payload, null, 2)}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
