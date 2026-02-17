interface BiddersTableProps {
  bidders: { id: string; name: string; price: number; bbbeeLevel: string | null }[];
}

export function BiddersTable({ bidders }: BiddersTableProps) {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">Bidders</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Price</th>
            <th>BBBEE</th>
          </tr>
        </thead>
        <tbody>
          {bidders.map((b) => (
            <tr key={b.id} className="border-b">
              <td>{b.name}</td>
              <td>{b.price.toLocaleString()}</td>
              <td>{b.bbbeeLevel ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
