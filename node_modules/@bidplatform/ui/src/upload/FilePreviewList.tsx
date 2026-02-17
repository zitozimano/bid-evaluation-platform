import React from "react";

export function FilePreviewList({ files }: { files: File[] }) {
  if (!files.length) return null;

  return (
    <ul className="mt-2 space-y-1 text-sm text-text-muted">
      {files.map((file, i) => (
        <li key={i} className="flex justify-between">
          <span>{file.name}</span>
          <span className="opacity-70">{(file.size / 1024).toFixed(1)} KB</span>
        </li>
      ))}
    </ul>
  );
}
