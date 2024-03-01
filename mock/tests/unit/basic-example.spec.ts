/*
  Test ordinary Java/TypeScript
*/

import { expect, test } from 'vitest';

test('Sanity Check is 1 + 1 = 2?', () => {
  expect(1 + 1).toBe(2)
})

// For more information on how to make unit tests, visit:
// https://jestjs.io/docs/using-matchers