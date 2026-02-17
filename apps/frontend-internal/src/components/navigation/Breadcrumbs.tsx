import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type BreadcrumbsProps = {
  darkMode: boolean;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ darkMode }) => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const buildPath = (index: number) => '/' + parts.slice(0, index + 1).join('/');

  return (
    <div
      style={{
        padding: '8px 16px',
        background: darkMode ? '#111827' : '#f5f5f5',
        borderBottom: darkMode ? '1px solid #374151' : '1px solid #ddd',
        fontSize: 12,
      }}
    >
      {parts.length === 0 && <span>home</span>}
      {parts.map((part, index) => (
        <span key={index}>
          <Link
            to={buildPath(index)}
            style={{
              textTransform: 'capitalize',
              color: darkMode ? '#e5e7eb' : '#111827',
              textDecoration: 'none',
            }}
          >
            {part.replace(/-/g, ' ')}
          </Link>
          {index < parts.length - 1 && ' / '}
        </span>
      ))}
    </div>
  );
};
