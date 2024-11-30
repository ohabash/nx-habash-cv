// import { MetAccount } from '@nx-habash/interfaces';

export interface ApiCatsConfig {
  // account: MetAccount;
  sendStatus: (status: string) => any;
  sendError: (err: string) => any;
  devMode: boolean;
  [k: string]: any; // replace this with expected api config
}
