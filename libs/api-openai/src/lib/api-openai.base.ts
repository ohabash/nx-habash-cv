import { environment, errorHandler, openaiCreds } from '@nx-habash/utils';
import { ApiOpenaiConfig } from './api-openai.interface';
import OpenAI from 'openai';
import 'colors';

const sig = '[ api-openai.base.ts ]'.gray;

export class ApiOpenaiBaseModule {
  header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  env: any = environment;

  constructor(config: ApiOpenaiConfig) {}

  get openai(): OpenAI {
    return new OpenAI({
      organization: openaiCreds.organization,
      project: openaiCreds.project,
      apiKey: openaiCreds.apiKey_you,
    });
  }

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
