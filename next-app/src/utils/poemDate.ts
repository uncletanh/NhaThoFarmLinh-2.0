export type PoemSortOrder = 'newest' | 'oldest' | 'most_viewed';

export type SortablePoem = {
  date: string;
  created_at?: string;
  view_count?: number | null;
};

const MONTHS: Record<string, number> = {
  january: 1,
  jan: 1,
  february: 2,
  feb: 2,
  march: 3,
  mar: 3,
  april: 4,
  apr: 4,
  may: 5,
  june: 6,
  jun: 6,
  july: 7,
  jul: 7,
  august: 8,
  aug: 8,
  september: 9,
  sep: 9,
  sept: 9,
  october: 10,
  oct: 10,
  november: 11,
  nov: 11,
  december: 12,
  dec: 12,
};

const toUtcTimestamp = (year: number, month: number, day: number) => {
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);

  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
};

export const parsePoemDate = (value: string): number | null => {
  const input = value.trim().replace(/\s+/g, ' ');
  if (!input) return null;

  let match = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    return toUtcTimestamp(Number(match[1]), Number(match[2]), Number(match[3]));
  }

  match = input.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (match) {
    return toUtcTimestamp(Number(match[3]), Number(match[1]), Number(match[2]));
  }

  match = input.match(/^([a-zA-Z]+)\s+(\d{1,2})\s*,?\s*(\d{4})$/);
  if (match) {
    const month = MONTHS[match[1].toLowerCase()];
    return month ? toUtcTimestamp(Number(match[3]), month, Number(match[2])) : null;
  }

  match = input.match(/^(\d{1,2})\s+([a-zA-Z]+)\s*,?\s*(\d{4})$/);
  if (match) {
    const month = MONTHS[match[2].toLowerCase()];
    return month ? toUtcTimestamp(Number(match[3]), month, Number(match[1])) : null;
  }

  return null;
};

export const normalizePoemDateInput = (value: string): string | null => {
  const timestamp = parsePoemDate(value);
  return timestamp === null ? null : new Date(timestamp).toISOString().slice(0, 10);
};

export const formatPoemDate = (value: string) => {
  const timestamp = parsePoemDate(value);
  if (timestamp === null) return value;

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(timestamp);
};

export const getPoemTimestamp = (poem: SortablePoem) => {
  const publishedTimestamp = parsePoemDate(poem.date);
  if (publishedTimestamp !== null) return publishedTimestamp;

  const createdTimestamp = poem.created_at ? Date.parse(poem.created_at) : 0;
  return Number.isNaN(createdTimestamp) ? 0 : createdTimestamp;
};

export const comparePoems = (
  first: SortablePoem,
  second: SortablePoem,
  order: PoemSortOrder,
) => {
  const dateDifference = getPoemTimestamp(first) - getPoemTimestamp(second);

  if (order === 'most_viewed') {
    const viewDifference = (second.view_count ?? 0) - (first.view_count ?? 0);
    return viewDifference || -dateDifference;
  }

  return order === 'oldest' ? dateDifference : -dateDifference;
};
