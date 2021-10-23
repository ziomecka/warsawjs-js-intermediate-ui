import { utils } from './utils';

const scenarios = [
  { testObject: {} },
  { testObject: { prop: { prop: {} } } },
  { testObject: [] },
  { testObject: [{ prop: 'text' }] },
];

describe('utils', () => {
  describe.each(scenarios)('', (scenario) => {
    const { testObject } = scenario;

    it('cloneDeep', () => {
      const result = utils.cloneDeep(testObject);

      expect(result).toEqual(testObject);
      expect(result).not.toBe(testObject);

      if (Array.isArray(result)) {
        result.forEach((item, index) => {
          expect(item).toEqual(testObject[index]);
          expect(item).not.toBe(testObject[index]);
        });
      } else {
        Object.entries(result).forEach(([key, value]) => {
          expect(value).toEqual(testObject[key]);
          expect(value).not.toBe(testObject[key]);
        });
      }
    });
  });
});
