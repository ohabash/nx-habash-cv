'use client';
import { rtdb } from '@/firebase/firebase.config';
import { timeout } from '@nx-habash/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLogOutCircle, BiSun } from 'react-icons/bi';
import { BsDatabaseCheck } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';
import { MdInterests } from 'react-icons/md';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import {
  SettingsItem,
  SettingsPanel,
  SettingsRow,
} from '../settings/SettingsPanel';
import { NXProfile, ProfileForm } from './ProfileForm';
import { NoAuthError } from '../auth/NoAuthError';
import { signOut, useSession } from 'next-auth/react';
import { NxUser, ProfileService } from './profile.service';

export const ProfileSettings = () => {
  const auth = useSession();
  const router = useRouter();
  const user = auth.data?.user as NxUser;
  console.log(`🚀 => ProfileSettings => auth::`, auth)
  console.log(`🚀 => ProfileSettings => auth:: => profile`, (auth as any).data?.user?.profile)
  const [originalProfile, setOriginalProfile] = useState({} as NXProfile);
  const [loggingOut, setLoggingOut] = useState(false);
  let profileService: ProfileService | null;

  // redirectIfNotAuth
  // if (!loading && !user) router.push('/auth/login');

  // logout()
  const logout = async () => {
    setLoggingOut(true);
    await timeout(500);
    signOut();
    sessionStorage.removeItem('user');
  };
  
  useEffect(() => {
    console.log(`🚀 => => => ProfileSettings => INIT:`, user);
    profileService = ProfileService.init(user.id, setOriginalProfile, '<ProfileSettings/>');
  }, []);

  // no auth error
  if (!user) return <NoAuthError />;


  return (
    <div id="settings">
      <div className="pb-4 mb-6 border-b-[1px] border-subtle/40">
        <div className="level mb-0">
          <div className="level-left">
            <h1 className="text-lg">Profile & Settings</h1>
          </div>
          <div className="level-right">
            <p className="text-sm text-accent1 font-medium tracking-normal">{user?.email}</p>
          </div>
        </div>
      </div>
      <SettingsPanel>
        <SettingsRow className={''}>
          {/* Theme */}
          <SettingsItem icon={<BiSun />} title="Theme" className="">
            <button className={'active'}>Dark</button>
            <button>Light</button>
          </SettingsItem>
          {/* Theme */}
          <SettingsItem
            icon={<BsDatabaseCheck />}
            title="Save AI Convos"
            className=""
          >
            <button>On</button>
            <button className={'active'}>Off</button>
          </SettingsItem>
        </SettingsRow>

        <SettingsRow className={'w-full'}>
          {/* Profile */}
          <SettingsItem icon={<IoIosContact />} title="Profile">
            <ProfileForm originalProfile={originalProfile} altSaveMode={true} />
          </SettingsItem>
        </SettingsRow>

        <SettingsRow className={'w-full'}>
          {/* Interests */}
          <SettingsItem icon={<MdInterests />} title="Interests">
            <div className="flex justify-center">
              <button>Partner</button>
              <button className={'active'}>Employee</button>
              <button>Collab</button>
              <button>Code</button>
              <button>Other</button>
            </div>
          </SettingsItem>
        </SettingsRow>

        <SettingsRow className={''}>
          {/* Theme */}
          <SettingsItem>
            <button className="m-0 bg-orange/30 hover:bg-orange/65 flex justify-center items-center">
              <RiDeleteBack2Fill className="mr-2" />
              Delete Account
            </button>
          </SettingsItem>
          {/* logout */}
          <SettingsItem>
            <button
              className={twMerge(
                'active m-0 flex justify-center items-center',
                loggingOut && 'disabled'
              )}
              onClick={logout}
            >
              <BiLogOutCircle className="mr-2 text-accent1" />
              {loggingOut ? 'Ending Session' : 'Sign Out'}
            </button>
          </SettingsItem>
        </SettingsRow>
      </SettingsPanel>
    </div>
  );
};
