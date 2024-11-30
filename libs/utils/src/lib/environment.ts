
// When in localhost
const localEnv: EnvUnion = 'prod' as EnvUnion; // ! this can force prod and also is a fallback if env variable is missing




// wix
const wixCreds: WixCreds = {
  siteId: 'f5335ee1-24d1-421d-820b-90e437120e97',
  accountId: 'c5228689-5760-4e11-b428-7d057c394bf5',
  apiKey: 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjI2OTRmZDAwLWRhNzMtNDZhNy04ZjA3LWUyN2FmYmI5NGEwMFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImQwOWJkMGQyLTg3MjItNDg1Yy04MzlmLWVkYjkyZTY0NzFjNVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJjNTIyODY4OS01NzYwLTRlMTEtYjQyOC03ZDA1N2MzOTRiZjVcIn19IiwiaWF0IjoxNzIwNTU3NzE4fQ.g5HkP7PpMPcy1ecH0Yx8QVqmFJeHY2lnwvaDLtzMDVX1WCmSGCIRxR5yl5di572Rhyro6DJkC65nC8IDKzemcxHhhvH0ysR-u_3zMeIwMsupap-jI4eutHXO3Dd-V8JaWM17PZ5etGajcB1SKmQt1quX5mbTGMtb8i410AseyJF8uQdiRlyIgFfjOMXajMsPCMgdeDg9UnwIonoO2UEZrqBmu7fmF_KIdtZ4xyb_zWI4JX-tVEYlmBkqJqC_rfUP6DO04faPqRnAH2dEKlhnz_eWrYXIKn4C5ZhXppQo1P7-wQT88FoIycRiHu7piUNiUYbI2WgXpbE5g-msbUtEtg',
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAykMeniMgaBZt7ZdpleIF
  wR7y73tVpKwdlNAeycilfrwcdWM+DqDDfHqTnfGaHpEdS49lwK8IaJg+UyG9Egg1
  7UvVBYVDcZb7iOotSSmmK758xVXuXEdmjNj6tLpNWZxNB1E7FBEciZL9o/wpphyI
  CNwhw7SZYet6LNOhOWHwxdgYZnpBWgpAM6ABEtPZqu7JtRKRAoFSP2JHrTiznNY0
  /NC3snyRuSSwr3DtKWEXd1TY1muD3vzjJO1qWCDdRy/BNbaivAZvfz8QAAib3SIW
  Ki5sSX2f0Yp8kFcxEgK176GYSdOnCqEYt0McnWb+tQQnRx163l0RZODhs4qQ05/d
  NQIDAQAB
  -----END PUBLIC KEY-----`
};

export const wixWebhookAppCreds = {
  appId: 'e9dc1bc4-2a36-41cd-8aa2-c1d00d7c4c1c',
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAykMeniMgaBZt7ZdpleIF
  wR7y73tVpKwdlNAeycilfrwcdWM+DqDDfHqTnfGaHpEdS49lwK8IaJg+UyG9Egg1
  7UvVBYVDcZb7iOotSSmmK758xVXuXEdmjNj6tLpNWZxNB1E7FBEciZL9o/wpphyI
  CNwhw7SZYet6LNOhOWHwxdgYZnpBWgpAM6ABEtPZqu7JtRKRAoFSP2JHrTiznNY0
  /NC3snyRuSSwr3DtKWEXd1TY1muD3vzjJO1qWCDdRy/BNbaivAZvfz8QAAib3SIW
  Ki5sSX2f0Yp8kFcxEgK176GYSdOnCqEYt0McnWb+tQQnRx163l0RZODhs4qQ05/d
  NQIDAQAB
  -----END PUBLIC KEY-----`,
};

// Monday App (https//developer.monday.com/apps/docs/oauth)
export const mondayAppCreds = {
  /* Use the client ID to identify your app when using OAuth */
  clientId: '60d6bc6ed951310a72f9315a99109f28',
  /* Use the client ID to identify your app when using OAuth */
  clientSecret: '31c6ecebec827bd397c6540a4b4c9688',
  /* Use the signing secret to verify that requests sent to your app are legitimate. */
  signingSecret: 'e9d4d008f2af185798c2389a81228e8a',
  /* The unique identifier of your app */
  appId: '10168536',
};

export const mondayOmarAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM4NjE4OTUxMCwiYWFpIjoxMSwidWlkIjo2MjUyMjI3OSwiaWFkIjoiMjAyNC0wNy0xOFQxNjo1MjozMy42OTZaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQwODAyNDksInJnbiI6InVzZTEifQ.yhzaO5zCAtrWVD_c9HkSb8aF_Q6gpwQW0dNmkcEiaA4';

export const openaiCreds = {
  organization: 'org-vCYgciqSKZaVdICyi7fPdgWE',
  project: 'proj_DI1qybZccETXUZyw7KfO2T8R',
  apiKey_you: 'sk-proj-MPgDi3WiFhkwIQ7aQVrZT3BlbkFJYX7WlYTpoLzfD06EOzpr',
  apiKey_service: 'sk-svcacct-wZcy5VcEWVnwXD22VT61T3BlbkFJtFOiX5OEVX5OsToo838W',
  apiKey_3: 'sk-None-6l9bcb2ISVJRT2dwdnpZT3BlbkFJFtSPlJ7t36qN0Tr9SgUq',
};




// environments
const prod: NxEnv = {
  env: 'prod',
  wix: wixCreds,
  host: 'https://nx-habash-cv-f55bb9999d68.herokuapp.com',
};
const staging: NxEnv = {
  env: 'staging',
  wix: wixCreds,
  host: 'http://localhost:3333',
};
const dev: NxEnv = {
  env: 'dev',
  wix: wixCreds,
  host: 'http://localhost:3333',
};






interface WixCreds {
  apiKey: string;
  siteId: string;
  accountId: string;
  publicKey: string;
}

// helpers

export interface NxEnv {
  env: EnvUnion;
  wix: WixCreds;
  host: string;
}
const EnvType = ['dev', 'staging', 'prod'] as const;
export type EnvUnion = (typeof EnvType)[number];
const isEnvType = (_env: any): _env is EnvUnion => {
  return EnvType.includes(_env);
};
export const environment: () => NxEnv = () => {
  const env = getEnv();
  // console.log('env :', env);
  // console.log(` Environment ::: => ::: => `.bgCyan.black.bold, `${env}`.green.bold);
  return envMap[env];
};
export const envMap: { [key in EnvUnion]: NxEnv } = {
  dev,
  staging,
  prod,
};
export const getEnv = (): EnvUnion => {
  let server_env = process.env.NX_ENV;
  if (localEnv == 'prod' && !server_env) return 'prod';
  if (!server_env) server_env = localEnv;
  if (isEnvType(server_env)) {
    return server_env;
  }
  return 'dev';
};
