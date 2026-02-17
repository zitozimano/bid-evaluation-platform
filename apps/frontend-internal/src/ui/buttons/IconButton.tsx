import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
};

export const IconButton: React.FC<Props> = ({ icon, children, ...rest }) => (
  <button
    {...rest}
    className={`inline-flex items-center px-2 py-1 rounded hover:bg-gray-100 text-sm ${
      rest.className || ''
    }`}
  >
    {icon}
    {children && <span className="ml-1">{children}</span>}
  </button>
);
