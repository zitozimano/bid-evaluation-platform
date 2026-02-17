import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const pathFor = (index: number) =>
    '/' + segments.slice(0, index + 1).join('/');

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>

        {segments.map((seg, i) => (
          <li key={i} className="flex space-x-2">
            <span>/</span>
            <Link
              to={pathFor(i)}
              className="hover:underline capitalize"
            >
              {seg.replace(/-/g, ' ')}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
