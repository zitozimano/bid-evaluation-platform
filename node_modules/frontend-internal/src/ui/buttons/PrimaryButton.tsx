import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({ children, loading, ...rest }) => (
  <button
    {...rest}
    disabled={loading || rest.disabled}
    className={`inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
      rest.className || ''
    }`}
  >
    {loading && <span className="mr-2 h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
    {children}
  </button>
);
