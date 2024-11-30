import { environment, errorHandler } from '@nx-habash/utils';
import { ApiCatsConfig } from './api-cats.interface';
import 'colors';

const sig = '[ api-cats.base.ts ]'.gray;

export class ApiCatsBaseModule {
  header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  env: any = environment;

  constructor(config: ApiCatsConfig) {}

  handleError(error, process, _path?: string) {
    console.log(sig, 'error :'.bgRed.white.bold, error.toString());
    const formatted = error.response
      ? error.response.data || error.response
      : error;
    console.log(sig, `${process} (formatted)`.red, formatted);
    throw errorHandler(error, {
      title: process,
      msg: formatted?.title || formatted?.toString(),
    });
  }
}
