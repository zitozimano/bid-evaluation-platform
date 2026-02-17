import { ScmAuditPanel } from './ScmAuditPanel';

export const ScmSection: React.FC<Props> = ({ tenderId, bidders }) => {
  const { user } = useAuth();
  const role = user?.role;

  const canViewScm = role === 'ADMIN' || role === 'SCM' || role === 'COUNCIL';

  if (!canViewScm) return null;

  return (
    <div className="space-y-6">
      {/* Awards */}
      {(role === 'ADMIN' || role === 'SCM') && (
        <section>
          <h3 className="font-semibold text-sm mb-2">Award</h3>
          <AwardPanel tenderId={tenderId} bidders={bidders} />
        </section>
      )}

      {/* Contracts */}
      {(role === 'ADMIN' || role === 'SCM') && (
        <section>
          <h3 className="font-semibold text-sm mb-2">Contract</h3>
          <ContractPanel tenderId={tenderId} />
        </section>
      )}

      {/* Council Reports */}
      {(role === 'ADMIN' || role === 'COUNCIL') && (
        <section>
          <h3 className="font-semibold text-sm mb-2">Council Reports</h3>
          <CouncilReportPanel tenderId={tenderId} />
        </section>
      )}

      {/* Audit Trail */}
      <section>
        <ScmAuditPanel tenderId={tenderId} />
      </section>
    </div>
  );
};
