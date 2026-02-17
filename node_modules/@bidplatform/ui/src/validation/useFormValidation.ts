import { useState } from "react";
import type { ValidationError } from "./validators";

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  function validate(rules: (() => ValidationError | null)[]) {
    const result = rules
      .map((r) => r())
      .filter((e): e is ValidationError => e !== null);
    setErrors(result);
    return result.length === 0;
  }

  function getError(field: string) {
    return errors.find((e) => e.field === field)?.message;
  }

  return { errors, validate, getError };
}
