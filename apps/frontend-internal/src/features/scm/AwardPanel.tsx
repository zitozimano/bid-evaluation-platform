import React from 'react';
import { scmAwardsApi } from '../../api/scmAwards';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';

type Props = {
  tenderId: string;
  bidders: { id: string; name: string }[];
};

export const AwardPanel: React.FC<Props> = ({ tenderId, bidders }) => {
  const [awards, setAwards] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedBidderId, setSelectedBidderId] = React.useState<string>('');

  const load = async () => {
    setLoading(true);
    const res = await scmAwardsApi.getAwardsForTender(tenderId);
    setAwards(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  const createAward = async () => {
    if (!selectedBidderId) return;
    await scmAwardsApi.createAward(tenderId, selectedBidderId);
    setSelectedBidderId('');
    load();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedBidderId}
          onChange={(e) => setSelectedBidderId(e.target.value)}
        >
          <option value="">Select bidder to award</option>
          {bidders.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <PrimaryButton size="sm" onClick={createAward} disabled={!selectedBidderId}>
          Award
        </PrimaryButton>
      </div>

      <div className="text-xs text-gray-500">
        {loading ? 'Loading awards…' : `Awards: ${awards.length}`}
      </div>

      <div className="space-y-1">
        {awards.map((a) => (
          <div key={a.id} className="border rounded px-2 py-1 text-xs flex justify-between">
            <div>
              <div className="font-medium">{a.bidder?.name}</div>
              <div className="text-gray-500">
                Awarded at {new Date(a.awardedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
