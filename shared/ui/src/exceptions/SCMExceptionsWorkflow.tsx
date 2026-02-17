import React from "react";
import { SCMException, ExceptionItem } from "./ExceptionItem";

export function SCMExceptionsWorkflow({
  items
}: {
  items: SCMException[];
}) {
  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-xs text-text-muted">No SCM exceptions recorded.</p>
      )}
      {items.map((e) => (
        <ExceptionItem key={e.id} item={e} />
      ))}
    </div>
  );
}
