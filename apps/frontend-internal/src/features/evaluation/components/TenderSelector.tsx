export const TenderSelector = ({ tenders, onSelect }) => (
  <div className="space-y-2">
    {tenders.map((t) => (
      <button
        key={t.id}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        onClick={() => onSelect(t.id)}
      >
        {t.title}
      </button>
    ))}
  </div>
);
