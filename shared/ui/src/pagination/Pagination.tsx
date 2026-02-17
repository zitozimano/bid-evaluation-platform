import React from "react";
import { IconButton } from "../buttons/IconButton";
import { ArrowRightIcon, CloseIcon } from "../icons";

export function Pagination({
  page,
  pageCount,
  onPageChange
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-text-muted text-sm">
      <IconButton
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <CloseIcon className="w-4 h-4 rotate-180" />
      </IconButton>
      <span>
        Page {page} of {pageCount}
      </span>
      <IconButton
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ArrowRightIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
