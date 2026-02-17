import React from 'react';
import { scmContractsApi } from '../../api/scmContracts';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';

export const ContractPanel: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [contracts, setContracts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    awardId: '',
    number: '',
    startDate: '',
    endDate: '',
    value: '',
  });

  const load = async () => {
    setLoading(true);
    const res = await scmContractsApi.getContractsForTender(tenderId);
    setContracts(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  const createContract = async () => {
    if (!form.awardId || !form.number || !form.startDate || !form.value) return;
    await scmContractsApi.createContract({
      awardId: form.awardId,
      number: form.number,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      value: Number(form.value),
    });
    setForm({ awardId: '', number: '', startDate: '', endDate: '', value: '' });
    load();
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <input
          className="border rounded px-2 py-1"
          placeholder="Award ID"
          value={form.awardId}
          onChange={(e) => setForm({ ...form, awardId: e.target.value })}
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Contract number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <input
          type="number"
          className="border rounded px-2 py-1"
          placeholder="Value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
      </div>
      <PrimaryButton size="sm" onClick={createContract}>
        Create contract
      </PrimaryButton>

      <div className="text-xs text-gray-500">
        {loading ? 'Loading contracts…' : `Contracts: ${contracts.length}`}
      </div>

      <div className="space-y-1">
        {contracts.map((c) => (
          <div key={c.id} className="border rounded px-2 py-1 text-xs flex justify-between">
            <div>
              <div className="font-medium">{c.number}</div>
              <div className="text-gray-500">
                {c.award?.bidder?.name} • {c.status} • {c.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
