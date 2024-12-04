import { environment } from '@nx-habash/utils';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = { ...environment().fb, };

// initialize firebase app
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics => TODO => make it work with next "window is not defined"
// export const analytics = getAnalytics(app);