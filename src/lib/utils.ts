import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getTimeDifference(currentDate: Date, targetDate: Date) {
  const diffTime = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears}y ago`;
  if (diffMonths > 0) return `${diffMonths}mo ago`;
  if (diffDays > 1) return `${diffDays}d ago`;
  if (diffDays === 1) return 'Yesterday';

  return 'Today';
}

export function formatDate(date: string | Date, includeRelative = false): string {
  const targetDate = date instanceof Date ? date : new Date(date.includes('T') ? date : `${date}T00:00:00`);

  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  const relativeTime = getTimeDifference(new Date(), targetDate);
  return `${fullDate} (${relativeTime})`;
}

export function formatDateYYYYMMDD(date: string): string {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
