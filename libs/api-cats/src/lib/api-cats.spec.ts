import { apiCats } from './api-cats';

describe('apiCats', () => {
  it('should work', () => {
    expect(apiCats()).toEqual('api-cats');
  });
});
