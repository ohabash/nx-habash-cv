import { ApiCatsConfig } from './api-cats.interface';
import { TestApiCats } from './test/test.api-cats';

const sig = '[ api-cats.sdk.ts ]'.gray;

export class ApiCatsSdk {
  options: ApiCatsConfig;

  constructor(options: ApiCatsConfig) {
    this.options = options;
  }

  get test() {
    return new TestApiCats(this.options);
  }
}
