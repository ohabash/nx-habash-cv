import { useStateDebounced } from "@/hooks/debounce.hooks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldGroup } from "../forms/FieldGroup";
import { NXInputProps } from "../forms/Input";
import { useSession } from "next-auth/react";
import { NxUser, ProfileService } from "./profile.service";
import { Button } from "../button/Button";
import { CiSaveDown1 } from 'react-icons/ci';

export type NXProfile = {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  chatThreadId?: string | null;
  chatAssistantId?: string | null;
  company: string;
  phone: string;
  interests: string[];
  lastUpdated: string;
};

export const ProfileForm = ({
  altSaveMode = false,
  originalProfile,
}: {
  altSaveMode?: boolean;
  originalProfile: Partial<NXProfile>;
}) => {
  const [value, debouncedValue, setValue] = useStateDebounced('', 1000);
  const { data: session } = useSession();
  const user = session?.user as NxUser;
  const [profile, setProfile] = useState<Partial<NXProfile>>(originalProfile || {});
  // console.log(`🚀 => originalProfile:`, originalProfile)
  // const user = auth.currentUser;
  const router = useRouter();

  const profileService: ProfileService | null = useMemo( () => {
    const x = ProfileService.init(user.id, setProfile, '<ProfileForm/>');
    console.log(`🚀 => useLayoutEffect => profileService:`, x)
    return x;
  }, [user]);

  useEffect( () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    // profileService?.getProfile();
  }, [user]);

  useEffect(() => {
    debouncedValue && handleSaveProfile(JSON.parse(debouncedValue));
  }, [debouncedValue]);

  const handleChanges = (changes: Partial<NXProfile>) => {
    // update state
    const newProfile = { ...profile, ...changes };
    setProfile((p) => newProfile);
    // debounce save
    if (altSaveMode) setValue(JSON.stringify(newProfile));
  };

  const fields: NXInputProps[] = [
    {
      label: 'Email',
      value: profile.email,
      onChange: (v) => handleChanges({ email: v }),
      fieldType: 'Input',
      pattern: '.+@example.com',
      fieldClassName: 'w-1/2 shrink-1 ',
    },
    {
      label: 'Full Name',
      value: profile.name,
      onChange: (v) => handleChanges({ name: v }),
      fieldType: 'Input',
      fieldClassName: 'w-1/2 shrink-1 ',
    },
    {
      label: 'Company',
      value: profile.company,
      onChange: (v) => handleChanges({ company: v }),
      fieldType: 'Input',
      fieldClassName: 'w-1/2 shrink-1 ',
    },
    {
      label: 'Phone',
      value: profile.phone,
      onChange: (v) => handleChanges({ phone: v }),
      fieldType: 'Input',
      fieldClassName: 'w-1/2 shrink-1 ',
    },
  ];

  async function handleSaveProfile(changes?: Partial<NXProfile>) {
    if (!profileService) throw new Error('Profile service not initialized');
    const resp = await profileService.saveProfile( changes || profile );
    return resp;
  };

  return (
    <div>
      {/* fields loop */}
      <FieldGroup fields={fields} handleSubmit={(e) => handleSaveProfile()} />

      {/* submit */}
      {!altSaveMode && (
        <Button
          className="w-full py-4 mt-1 hover:brightness-95 "
          size="large"
          onClick={handleSaveProfile}
        >
          <CiSaveDown1 className="mr-3 text-2xl" />
          Save Profile
        </Button>
      )}
    </div>
  );
};

