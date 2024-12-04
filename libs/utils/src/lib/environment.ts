
// When in localhost
const localEnv: EnvUnion = 'prod' as EnvUnion; // ! this can force prod and also is a fallback if env variable is missing



// https://platform.openai.com/settings/organization/api-keys
export const openaiCreds = {
  organization: 'org-vCYgciqSKZaVdICyi7fPdgWE',
  project: 'proj_CPJQbajF3ctFl6htx8R9igMb',
  apiKey:
    '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',
  interviewMeAssistantId: 'asst_Cae6sgwNIYjDDqj2GPnah7QH',
  // apiKey_you: 'sk-proj-MPgDi3WiFhkwIQ7aQVrZT3BlbkFJYX7WlYTpoLzfD06EOzpr',
  // apiKey_service: 'sk-svcacct-wZcy5VcEWVnwXD22VT61T3BlbkFJtFOiX5OEVX5OsToo838W',
  // apiKey_service: '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',
  // apiKey_3: 'sk-None-6l9bcb2ISVJRT2dwdnpZT3BlbkFJFtSPlJ7t36qN0Tr9SgUq',
};


// firebaseConfig interface
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// firebase
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBoRjfut7spzLyqc7nbrwCyJBhoPh75NTA",
  authDomain: "next-folio-94a46.firebaseapp.com",
  projectId: "next-folio-94a46",
  storageBucket: "next-folio-94a46.firebasestorage.app",
  messagingSenderId: "1053510377433",
  appId: "1:1053510377433:web:ae241b25e737b5f0eac3c8",
  measurementId: "G-TRH3E3PJ4Y"
}



// environments
const prod: NxEnv = {
  env: 'prod',
  host: 'https://nx-habash-cv-f55bb9999d68.herokuapp.com',
  fb: firebaseConfig,
};
const staging: NxEnv = {
  env: 'staging',
  host: 'http://localhost:3333',
  fb: firebaseConfig,
};
const dev: NxEnv = {
  env: 'dev',
  host: 'http://localhost:3333',
  fb: firebaseConfig,
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
  host: string;
  fb: FirebaseConfig;
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
