export type ValidationError = { field: string; message: string };

export function required(value: any, field: string): ValidationError | null {
  if (value === null || value === undefined || value === "") {
    return { field, message: `${field} is required.` };
  }
  return null;
}

export function minLength(
  value: string,
  field: string,
  length: number
): ValidationError | null {
  if ((value || "").length < length) {
    return { field, message: `${field} must be at least ${length} characters.` };
  }
  return null;
}

export function maxLength(
  value: string,
  field: string,
  length: number
): ValidationError | null {
  if ((value || "").length > length) {
    return { field, message: `${field} must be at most ${length} characters.` };
  }
  return null;
}
