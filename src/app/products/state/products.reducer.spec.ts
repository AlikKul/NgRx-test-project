import { reducer, initialState } from './products.reducer';

describe('Products reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'INVALID_ACTION' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

});
