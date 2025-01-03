import { environment } from '@nx-habash/utils';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RTDB } from './rtdb.firebase';

export * from './errors.firebase';
export const firebaseConfig = { ...environment().fb, };

// initialize firebase app
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// RTDB
export const rtdb = new RTDB(app);


