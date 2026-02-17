import React from 'react';
import { ExportPanel } from '../exports/ExportPanel';

export const TenderDetailPage: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  // ... load tender, bidders, etc.

  return (
    <div>
      {/* existing tender detail UI */}
      <ExportPanel tenderId={tenderId} />
    </div>
  );
};
