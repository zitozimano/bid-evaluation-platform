import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded text-sm text-red-700 flex items-center justify-between">
      <span>{message || 'Something went wrong.'}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 text-xs font-medium text-red-700 underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};
