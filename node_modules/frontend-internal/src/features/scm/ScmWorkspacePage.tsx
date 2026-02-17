import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { ScmDashboard } from './ScmDashboard';
import { CouncilDashboard } from './CouncilDashboard';
import { AuditDashboard } from './AuditDashboard';
import { AwardPanel } from './AwardPanel';
import { ContractPanel } from './ContractPanel';
import { CouncilReportPanel } from './CouncilReportPanel';
import { ScmAuditPanel } from './ScmAuditPanel';
import { ScmExportPanel } from './ScmExportPanel';

export const ScmWorkspacePage: React.FC = () => {
  const { tenderId } = useParams<{ tenderId: string }>();
  const { user } = useAuth();
  const role = user?.role;

  if (!tenderId) return <div>Missing tenderId</div>;

  const isScm = role === 'SCM' || role === 'ADMIN';
  const isCouncil = role === 'COUNCIL' || role === 'ADMIN';
  const isInternalAudit = role === 'INTERNAL_AUDIT' || role === 'ADMIN';

  return (
    <div className="p-4 space-y-6">
      {/* Top row: dashboards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-3">
          <ScmDashboard tenderId={tenderId} />
        </div>
        {isCouncil && (
          <div className="border rounded p-3">
            <CouncilDashboard tenderId={tenderId} />
          </div>
        )}
        {isInternalAudit && (
          <div className="border rounded p-3">
            <AuditDashboard tenderId={tenderId} />
          </div>
        )}
      </div>

      {/* Middle row: awards, contracts, reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isScm && (
          <div className="border rounded p-3">
            <h3 className="font-semibold text-sm mb-2">Awards</h3>
            <AwardPanel tenderId={tenderId} />
          </div>
        )}
        {isScm && (
          <div className="border rounded p-3">
            <h3 className="font-semibold text-sm mb-2">Contracts</h3>
            <ContractPanel tenderId={tenderId} />
          </div>
        )}
        {isCouncil && (
          <div className="border rounded p-3">
            <CouncilReportPanel tenderId={tenderId} />
          </div>
        )}
      </div>

      {/* Bottom row: audit + export */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-3">
          <ScmAuditPanel tenderId={tenderId} />
        </div>
        <div className="border rounded p-3">
          <ScmExportPanel tenderId={tenderId} />
        </div>
      </div>
    </div>
  );
};
