import assert from 'node:assert/strict';
import test from 'node:test';
import {
  comparePoems,
  normalizePoemDateInput,
  parsePoemDate,
} from './poemDate.ts';

test('normalizes every supported June 23, 2026 input to the same ISO date', () => {
  const inputs = [
    'June 23, 2026',
    'June 23,2026',
    'Jun 23 2026',
    '23 June 2026',
    '06-23-2026',
    '06/23/2026',
    '2026-06-23',
  ];

  for (const input of inputs) {
    assert.equal(normalizePoemDateInput(input), '2026-06-23');
  }
});

test('rejects impossible and ambiguous dates', () => {
  assert.equal(parsePoemDate('June 31, 2026'), null);
  assert.equal(parsePoemDate('13-23-2026'), null);
  assert.equal(parsePoemDate('23-06-2026'), null);
  assert.equal(parsePoemDate('not a date'), null);
});

test('sorts newest and oldest by the normalized calendar date', () => {
  const poems = [
    { date: 'June 23,2026' },
    { date: '2024-01-09' },
    { date: '06-24-2026' },
  ];

  assert.deepEqual(
    [...poems].sort((a, b) => comparePoems(a, b, 'newest')).map((poem) => poem.date),
    ['06-24-2026', 'June 23,2026', '2024-01-09'],
  );
  assert.deepEqual(
    [...poems].sort((a, b) => comparePoems(a, b, 'oldest')).map((poem) => poem.date),
    ['2024-01-09', 'June 23,2026', '06-24-2026'],
  );
});

test('sorts most viewed by views and breaks ties with newest first', () => {
  const poems = [
    { date: '2026-06-22', view_count: 8 },
    { date: '2026-06-24', view_count: 8 },
    { date: '2026-06-23', view_count: 21 },
  ];

  assert.deepEqual(
    [...poems].sort((a, b) => comparePoems(a, b, 'most_viewed')),
    [
      { date: '2026-06-23', view_count: 21 },
      { date: '2026-06-24', view_count: 8 },
      { date: '2026-06-22', view_count: 8 },
    ],
  );
});
