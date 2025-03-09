import { formatCurrency, generateRandomString, keyBy } from './common.util';

describe('Common Utils', () => {
  describe('generateRandomString', () => {
    const testCases = [
      {
        input: undefined,
        expected: 16,
      },
      {
        input: 10,
        expected: 10,
      },
    ];

    testCases.forEach(({ input, expected }) =>
      it(`should return string with length ${expected}`, () => {
        const result = generateRandomString(input);

        expect(result.length).toBe(expected);
      })
    );
  });

  describe('formatCurrency', () => {
    const testCases = [
      {
        input: 0,
        expected: '0\xa0₫', // https://stackoverflow.com/questions/54242039/intl-numberformat-space-character-does-not-match
      },
      {
        input: 1000000,
        expected: '1.000.000\xa0₫',
      },
      {
        input: -12.3785,
        expected: '-12,38\xa0₫',
      },

      {
        input: 56.892,
        expected: '56,89\xa0₫',
      },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should return ${expected} when input is ${input}`, () => {
        const result = formatCurrency(input);

        expect(result).toBe(expected);
      });
    });
  });

  describe('keyBy', () => {
    const testItems = [
      { id: 1, name: 'Alice', meta: { code: 'A' } },
      { id: 2, name: 'Bob', meta: { code: 'B' } },
    ];

    it('should group by shallow property', () => {
      const result = keyBy(testItems, 'id');
      expect(result).toEqual({
        1: testItems[0],
        2: testItems[1],
      });
    });

    it('should group by nested property', () => {
      const result = keyBy(testItems, 'meta.code');
      expect(result).toEqual({
        A: testItems[0],
        B: testItems[1],
      });
    });
  });
});
