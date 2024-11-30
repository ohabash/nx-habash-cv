import axios from 'axios';
import { ApiOpenaiBaseModule } from '../api-openai.base';
import { ApiOpenaiConfig } from '../api-openai.interface';

const sig = '[ image.api-openai.ts ]'.gray;

export class ImageApiOpenai extends ApiOpenaiBaseModule {
  constructor(config: ApiOpenaiConfig) {
    super(config);
  }

  /**
   *
   * @description Sample HTTP request with axios
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
