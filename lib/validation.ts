// ─── Shared Form Validation Utilities ──────────────────────────────────────────

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

/** Check if a string value is empty or whitespace-only */
export function isEmpty(value: string): boolean {
  return !value || value.trim().length === 0;
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/** Validate phone number (10+ digits, optional +, spaces, dashes) */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone.trim());
}

/** Validate minimum length */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/** Validate numeric string is a positive number */
export function isPositiveNumber(value: string): boolean {
  const num = Number(value);
  return !isNaN(num) && num > 0;
}

/** Validate numeric string is a non-negative number */
export function isNonNegativeNumber(value: string): boolean {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
}

/** CSS class for error state on an input */
export const inputErrorClass = "border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:ring-red-200";

/** CSS class for error message text */
export const errorTextClass = "text-red-500 text-xs mt-1 flex items-center gap-1";
