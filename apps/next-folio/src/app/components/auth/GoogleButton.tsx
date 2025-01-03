"use client";
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../button/Button';
import { useRouter } from 'next/navigation';
import { timeout } from '@nx-habash/utils';
import { signIn } from 'next-auth/react';

interface Props {
  copy?: string;
  // signInFN?: () => void;
}

export function GoogleButton({ 
  copy = 'Sign In with Google', 
 }: Props) {
  const router = useRouter();

  async function signInWithGoogle() {
    const callbackUrl = `${window.location.origin}/${'auth/settings'}`;
    console.log(`🚀 => signInWithGoogle => callbackUrl:`, callbackUrl);
    const resp = await signIn('google', { callbackUrl });
    console.log(`🚀 => signInWithGoogle => resp:`, resp)
  }

  async function loginActions(resp: any) {
    router.push('/auth/settings');
    await timeout(500);
    if (!resp?.user) return;
    // await saveProfile(res?.user);
  }

  return (
    <Button
      onClick={signInWithGoogle}
      className="w-full py-4 bg-google text-white hover:brightness-110"
    >
      <FaGoogle className="mr-3 font-black" />
      {copy}*
    </Button>
  );
}
