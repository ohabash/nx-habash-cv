"use client";
import { Button } from '@/components/button/Button';
import { auth, errMsg } from '@/firebase/firebase.config';
import { useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { BiChevronRightCircle } from "react-icons/bi";
import { ErrorMsg } from "@components/ErrorMsg";
import { useRouter } from 'next/navigation';
import { NxUser, ProfileService } from '@/components/profile/profile.service';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

const Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const headerCopy = 'Sign Up';
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState<false | string>(false);
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, userCreds, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  if (user) return router.push('/auth/settings');
  const handleSignUp = async () => {
    const { data: session } = useSession();
    const user = session?.user || {};
    const profileService = ProfileService.init(
      (user as any)?.id
      {} as any,
      '<24353425345/>'
    );
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', 'true');
      if (!res) throw 'Close, but no cigar. Try again!';
      setEmail('');
      setPassword('');
      if (!userCreds?.user) return;
      await profileService?.saveProfile(user as any);
    } catch (e) {
      console.error(e);
      setShowError(`${e}`);
    }
  };
  const subHeaderCopy = (
    <>
      Your data is safe with me. I will never share your email or information
      with anyone.
    </>
  );
  return (
    <>
      <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
      <p className="f text-left">{subHeaderCopy}</p>
      <div className="ops mt-[2vh] flex_">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setShowError(false);
            setEmail(e.target.value);
          }}
          className="input"
          pattern=".+@example\.com"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setShowError(false);
            setPassword(e.target.value);
          }}
          className="input"
        />
        <Button
          className="w-full py-4 hover:brightness-95 bg-accent1 text-white font-semibold"
          onClick={handleSignUp}
        >
          <BiChevronRightCircle className="mr-3" />
          Sign Up
        </Button>
        {error?.message && showError && <ErrorMsg 
          code={error.code} 
          onClick={() => setShowError(false)}
        />}
      </div>
    </>
  );
};

export default Page;
