import React from 'react';
import { useBiddersApi } from '../hooks/useBiddersApi';
import { BidderTable } from '../components/BidderTable';

export default function BidderListPage() {
  const api = useBiddersApi();
  const [bidders, setBidders] = React.useState([]);

  React.useEffect(() => {
    api.listByTender('tender-id').then((res) => setBidders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Bidders</h1>
      <BidderTable bidders={bidders} onSelect={() => {}} />
    </div>
  );
}
