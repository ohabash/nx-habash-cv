import { NXProfile } from "@/components/profile/ProfileForm";
import { rtdb } from "@/firebase/firebase.config";
import { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Dispatch, SetStateAction } from "react";

export type NxUser = Session['user'] & { id: string };

type IsetOriginalProfile =
  | Dispatch<SetStateAction<Partial<NXProfile>>>
  | Dispatch<SetStateAction<NXProfile>>;

export class ProfileService {
  debug: string;
  profile!: Partial<NXProfile>;
  path!: string;
  // profile: Partial<NXProfile> = {};

  constructor(
    public uid: string,
    public setOriginalProfile: IsetOriginalProfile | null,
    debug: string
  ) {
    this.debug = debug;
    this.path = `users/${this.uid}`;
    this.setProfile();
    console.log(
      `[${debug}] ::: 🚀 =======> ProfileService =======> constructor =======> uid:`,
      uid
    );
  }

  // get profile(): Partial<NXProfile> {
  //   return this.getProfile();
  // }

  static init(
    uid: string,
    setOriginalProfile: IsetOriginalProfile | null,
    debug: string
  ): ProfileService | null {
    // null checks
    if (!uid) return this.missingData('uid', debug);

    // return new instance
    return new ProfileService(uid, setOriginalProfile, debug);
  }

  static missingData(what: string, debug: string): null {
    console.info(
      `🚨🚨🚨 => [${debug}] ::: `,
      ` ProfileService => missingData => "${what}"`
    );
    return null;
  }

  saveProfile = async (profile?: User | AdapterUser | Partial<NXProfile>) => {
    if (!this.uid) return;
    // const updates: Partial<NXProfile> = {
    //   email: this.user.email || (null as any),
    //   name: this.user.name || (null as any),
    //   image: this.user.image || (null as any),
    //   // phone: this.user.phoneNumber || (null as any), // TODO: Add phone number to user obj in route.ts
    //   lastUpdated: new Date().toISOString(),
    // };
    return await rtdb.update(this.path, profile);
  };

  setProfile = async () => {
    this.profile = (await rtdb.get(this.path)).val() || {};
    if (this.setOriginalProfile) this.setOriginalProfile(this.profile as any);
    return this.profile;
  };

  updateMissingProfileFields = async (
    profile?: User | AdapterUser | Partial<NXProfile>
  ) => {
    if (!profile) return;
    const current = await this.setProfile();
    const updates = { ...profile, ...current };
    await  this.saveProfile(updates);
    return updates;
  };
}