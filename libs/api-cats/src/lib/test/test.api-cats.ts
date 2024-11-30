import axios from 'axios';
import { ApiCatsBaseModule } from '../api-cats.base';
import { ApiCatsConfig } from '../api-cats.interface';

const sig = 'test.[ api-cats.ts ]'.gray;

export class TestApiCats extends ApiCatsBaseModule {
  constructor(config: ApiCatsConfig) {
    super(config);
  }

  /**
   *
   * @description Sample HTTP request with axios
   * @endpoint GET: "<host>/api-cats/test/sampleHttpRequest"
   * @returns Promise<any>
   *
   */
  sampleHttpRequest(): Promise<any> {
    const path = `https://meteorite-staging.herokuapp.com/api/store/if6X5NMY/test`;
    return axios
      .get(path, { headers: this.header, timeout: 10_000 })
      .then((resp) => resp.data)
      .catch((error) =>
        this.handleError(error, 'sampleHttpRequest(...)', path)
      );
  }
}
