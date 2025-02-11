"use client";
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../button/Button';
import { useRouter } from 'next/navigation';
import { timeout } from '@nx-habash/utils';
import { signIn } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

interface Props {
  copy?: string;
  provider?: "google" | "facebook" | "github";
  callbackUrl?: string
  className?: string;
  icon?: React.ReactNode;
  // signInFN?: () => void;
}

export function NextAuthProviderButton({
  copy = "Sign In with Google",
  provider = "google",
  callbackUrl = `${window?.location.origin}/${"auth/settings"}`,
  icon = <FaGoogle/>,
  className
}: Props) {
  const router = useRouter();

  async function signInWithGoogle() {
    const resp = await signIn(provider, { callbackUrl });
    // console.log(`🚀 => signInWithGoogle => resp:`, resp);
  }

  async function loginActions(resp: any) {
    router.push("/auth/settings");
    await timeout(500);
    if (!resp?.user) return;
    // await saveProfile(res?.user);
  }

  return (
    <Button
      onClick={signInWithGoogle}
      className={twMerge(
        'w-full py-4 bg-google text-white hover:brightness-110 first-of-type:mt-0 mt-4',
        className
      )}
    >
      <span className="mr-3 font-black text-lg">{icon}</span>
      {copy}
    </Button>
  );
}
