import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as Indian Rupees (₹)
 * @param amount The amount to format
 * @param minimumFractionDigits Minimum number of fraction digits (default: 2)
 * @returns Formatted price string with rupee symbol
 */
export function formatRupees(amount: number, minimumFractionDigits: number = 2): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits,
  }).format(amount);
}
