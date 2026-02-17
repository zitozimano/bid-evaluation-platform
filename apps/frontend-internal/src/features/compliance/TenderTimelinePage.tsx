import React from 'react';
import { useParams } from 'react-router-dom';
import { TenderTimeline } from './TenderTimeline';
import { AgsaPackViewer } from './AgsaPackViewer';
import { HealthTrendChart } from './HealthTrendChart';
import { TenderScmKpisPanel } from './TenderScmKpisPanel';

export const TenderTimelinePage: React.FC = () => {
  const { tenderId } = useParams<{ tenderId: string }>();

  if (!tenderId) return <div>Missing tenderId</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Tender Timeline, Health & AGSA Pack</h2>
      <AgsaPackViewer tenderId={tenderId} />
      <TenderScmKpisPanel tenderId={tenderId} />
      <HealthTrendChart tenderId={tenderId} />
      <TenderTimeline tenderId={tenderId} />
    </div>
  );
};
