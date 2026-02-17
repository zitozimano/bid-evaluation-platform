export const BidderTable = ({ bidders, onSelect }) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>BBBEE Level</th>
      </tr>
    </thead>
    <tbody>
      {bidders.map((b) => (
        <tr key={b.id} onClick={() => onSelect(b)} className="cursor-pointer hover:bg-gray-100">
          <td>{b.name}</td>
          <td>{b.price}</td>
          <td>{b.bbbeeLevel}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
