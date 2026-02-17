import React from 'react';
import { tendersApi } from '../../../api/tenders';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../ui/layout/PageContainer';
import { PageHeader } from '../../../ui/layout/PageHeader';
import { SectionCard } from '../../../ui/layout/SectionCard';
import { DataTable } from '../../../ui/data/DataTable';
import { PrimaryButton, SecondaryButton } from '../../../ui/buttons/PrimaryButton'; // adjust import

export default function EvaluationDashboardPage() {
  const [tenders, setTenders] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    tendersApi.list().then((res) => setTenders(res.data));
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Evaluation Dashboard" />

      <SectionCard>
        <DataTable
          data={tenders}
          getRowKey={(t) => t.id}
          columns={[
            { key: 'title', header: 'Tender' },
            { key: 'status', header: 'Status' },
            { key: 'bbbeeWeight', header: 'BBBEE Weight' },
            {
              key: 'actions',
              header: '',
              render: (t: any) => (
                <div className="space-x-2">
                  <SecondaryButton onClick={() => navigate(`/evaluation/tenders/${t.id}`)}>
                    Evaluate
                  </SecondaryButton>
                  <SecondaryButton onClick={() => navigate(`/evaluation/tenders/${t.id}/results`)}>
                    Results
                  </SecondaryButton>
                </div>
              ),
            },
          ]}
        />
      </SectionCard>
    </PageContainer>
  );
}
