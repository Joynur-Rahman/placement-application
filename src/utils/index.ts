import { format, parseISO } from 'date-fns';

/**
 * Format a date string or Date object into human-readable format
 */
export function formatDate(date: string | Date, pattern = 'MMM dd, yyyy'): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
  } catch {
    return String(date);
  }
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate long text with ellipsis
 */
export function truncate(text: string, length = 100): string {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Combines conditional class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
