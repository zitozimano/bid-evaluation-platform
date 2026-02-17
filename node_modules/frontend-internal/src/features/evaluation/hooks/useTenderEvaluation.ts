import React from 'react';
import { tendersApi } from '../../../api/tenders';
import { biddersApi } from '../../../api/bidders';
import { useEvaluationApi } from './useEvaluationApi';
import { useAuth } from '../../auth/AuthContext';

export function useTenderEvaluation(tenderId: string | undefined) {
  const { user } = useAuth();
  const evalApi = useEvaluationApi();

  const [tender, setTender] = React.useState<any | null>(null);
  const [bidders, setBidders] = React.useState<any[]>([]);
  const [criteria, setCriteria] = React.useState<any[]>([]);
  const [selectedBidderId, setSelectedBidderId] = React.useState<string | null>(null);

  const [scores, setScores] = React.useState<
    Record<string, { score: number; comment?: string }>
  >({});

  React.useEffect(() => {
    if (!tenderId) return;

    tendersApi.get(tenderId).then((res) => {
      setTender(res.data);
      setCriteria(res.data.criteria ?? []);
    });

    biddersApi.listByTender(tenderId).then((res) => setBidders(res.data));
  }, [tenderId]);

  const updateScore = (criteriaId: string, score: number) => {
    setScores((prev) => ({
      ...prev,
      [criteriaId]: { ...(prev[criteriaId] || {}), score },
    }));
  };

  const updateComment = (criteriaId: string, comment: string) => {
    setScores((prev) => ({
      ...prev,
      [criteriaId]: { ...(prev[criteriaId] || {}), comment },
    }));
  };

  const saveScores = async () => {
    if (!tenderId || !selectedBidderId || !user) return;

    for (const c of criteria) {
      const entry = scores[c.id];
      if (!entry || entry.score == null) continue;

      await evalApi.submitScore({
        tenderId,
        evaluatorId: user.id,
        bidderId: selectedBidderId,
        criteriaId: c.id,
        score: entry.score,
        comment: entry.comment,
      });
    }
  };

  return {
    tender,
    bidders,
    criteria,
    selectedBidderId,
    setSelectedBidderId,
    scores,
    updateScore,
    updateComment,
    saveScores,
  };
}
