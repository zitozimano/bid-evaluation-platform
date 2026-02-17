import React from 'react';
import { searchApi } from '../../api/search';
import { Link } from 'react-router-dom';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }

    const res = await searchApi.search(value);
    setResults(res.data);
    setOpen(true);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search tenders, bidders, departments..."
        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
      />

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow z-50">
          {results.map((r) => (
            <Link
              key={r.id}
              to={r.url}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <span className="font-medium">{r.label}</span>
              <span className="text-gray-500 ml-2">{r.type}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
