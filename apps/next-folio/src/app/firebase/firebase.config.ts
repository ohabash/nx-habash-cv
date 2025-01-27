import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RTDB } from './rtdb.firebase';

export * from './errors.firebase';
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FB_authDomain,
  projectId: process.env.NEXT_PUBLIC_FB_projectId,
  databaseURL: process.env.NEXT_PUBLIC_FB_databaseURL,
  storageBucket: process.env.NEXT_PUBLIC_FB_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FB_appId,
  measurementId: process.env.NEXT_PUBLIC_FB_measurementId,
};

// initialize firebase app
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// RTDB
export const rtdb = new RTDB(app);


