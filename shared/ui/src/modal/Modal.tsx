import React from "react";

export function Modal({
  open,
  onClose,
  children
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-light rounded-lg p-6 shadow-card min-w-[300px]">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-brand rounded-md text-surface"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
