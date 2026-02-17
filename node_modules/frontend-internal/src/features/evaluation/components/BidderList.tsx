export const BidderList = ({ bidders, selectedBidderId, onSelect }) => (
  <ul className="space-y-1">
    {bidders.map((b) => (
      <li key={b.id}>
        <button
          className={`w-full text-left px-2 py-1 rounded ${
            selectedBidderId === b.id ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(b.id)}
        >
          {b.name}
        </button>
      </li>
    ))}
  </ul>
);
