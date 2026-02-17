import React from "react";
import type { ValidationError } from "./validators";

export function ValidationSummary({ errors }: { errors: ValidationError[] }) {
  if (!errors.length) return null;
  return (
    <div className="mb-3 rounded-md bg-red-900/60 border border-red-600 p-3 text-sm text-red-100">
      <p className="font-semibold mb-1">Please correct the following:</p>
      <ul className="list-disc list-inside space-y-1">
        {errors.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    </div>
  );
}
