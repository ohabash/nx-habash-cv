import { apiOpenai } from './api-openai';

describe('apiOpenai', () => {
  it('should work', () => {
    expect(apiOpenai()).toEqual('api-openai');
  });
});
