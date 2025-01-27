import { Database, get, getDatabase, push, ref, set, update } from 'firebase/database';
import { FirebaseApp } from 'firebase/app';

export class RTDB {
  db: Database;

  constructor(app: FirebaseApp) {
    this.db = getDatabase(app);
  }

  async set(path: string, data: any) {
    const headerRef = ref(this.db, path);
    const res = await set(headerRef, data).catch((e) => {
      console.error(`🚀 => RTDB => set => e:`, e);
      throw e;
    });
    return res;
  }

  // update
  async update(path: string, data: any) {
    const headerRef = ref(this.db, path);
    const res = await update(headerRef, data).catch((e) => {
      console.error(`🚀 => RTDB => update => e:`, e);
      throw e;
    });
    return res;
  }

  // get
  async get(path: string) {
    const headerRef = ref(this.db, path);
    const res = await get(headerRef).catch((e) => {
      console.error(`🚀 => RTDB => get => e:`, e);
      throw e;
    });
    return res;
  }

  // push
  async push(path: string, data: any) {
    const headerRef = ref(this.db, path);
    const res = await push(headerRef, data).catch((e) => {
      console.error(`🚀 => RTDB => push => e:`, e);
      throw e;
    });
    return res;
  }
}