import React from 'react';
import { useParams } from 'react-router-dom';
import { useTenderEvaluation } from '../hooks/useTenderEvaluation';
import { BidderList } from '../components/BidderList';
import { CriteriaScoreTable } from '../components/CriteriaScoreTable';
import { PageContainer } from '../../../ui/layout/PageContainer';
import { PageHeader } from '../../../ui/layout/PageHeader';
import { SectionCard } from '../../../ui/layout/SectionCard';
import { PrimaryButton } from '../../../ui/buttons/PrimaryButton';
import { EmptyState } from '../../../ui/data/EmptyState';

export default function TenderEvaluationPage() {
  const { tenderId } = useParams();
  const {
    tender,
    bidders,
    criteria,
    selectedBidderId,
    setSelectedBidderId,
    scores,
    updateScore,
    updateComment,
    saveScores,
  } = useTenderEvaluation(tenderId);

  if (!tender) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <PageHeader
        title={`${tender.title} – Evaluation`}
        subtitle={`BBBEE Weight: ${tender.bbbeeWeight} | Status: ${tender.status}`}
      />

      <div className="flex gap-6">
        <div className="w-1/4">
          <SectionCard title="Bidders">
            {bidders.length === 0 ? (
              <EmptyState title="No bidders" description="No bidders captured for this tender yet." />
            ) : (
              <BidderList
                bidders={bidders}
                selectedBidderId={selectedBidderId}
                onSelect={setSelectedBidderId}
              />
            )}
          </SectionCard>
        </div>

        <div className="flex-1">
          <SectionCard title="Criteria">
            {!selectedBidderId ? (
              <EmptyState
                title="Select a bidder"
                description="Choose a bidder on the left to capture scores."
              />
            ) : (
              <>
                <CriteriaScoreTable
                  criteria={criteria}
                  scores={scores}
                  updateScore={updateScore}
                  updateComment={updateComment}
                />
                <div className="mt-4">
                  <PrimaryButton onClick={saveScores}>Save Scores</PrimaryButton>
                </div>
              </>
            )}
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
