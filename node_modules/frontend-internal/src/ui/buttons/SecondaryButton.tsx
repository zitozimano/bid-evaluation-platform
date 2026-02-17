import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SecondaryButton: React.FC<Props> = ({ children, ...rest }) => (
  <button
    {...rest}
    className={`inline-flex items-center px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-800 bg-white hover:bg-gray-50 ${
      rest.className || ''
    }`}
  >
    {children}
  </button>
);
