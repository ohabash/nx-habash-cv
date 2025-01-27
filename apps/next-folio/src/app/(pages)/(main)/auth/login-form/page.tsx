'use client';
import { Button } from '@/components/button/Button';
import { ErrorMsg } from '@/components/ErrorMsg';
import { auth, rtdb } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { BiChevronRightCircle } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

const Page = () => {
  const headerCopy = 'Sign In';
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState<false | string>(false);
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, userCredential, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  if (user) return router.push('/auth/settings');
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password).catch((e) => {
        console.log(`🚀 => handleSignIn => e:***`, e)
      });
      console.log(`🚀 => handleSignIn => res:`, res)
      sessionStorage.setItem('user', 'true');
      if (!res) throw('Close, but no cigar. Try again!');
      loginActions();
    } catch (e) {
      console.log(`🚀 => handleSignIn => e:`, e)
      setShowError(`${e}`);
    }
  };
  
  async function loginActions() {
    setEmail('');
    setPassword('');
    router.push('/auth/settings'); 
    if (!userCredential?.user) return;
    // await saveProfile(userCredential.user);
  }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSignIn();
          }}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSignIn();
          }}
        />
        <Button
          className={twMerge(
            'w-full py-4 hover:brightness-95 bg-accent1 text-white font-semibold',
            loading && 'disabled'
          )}
          onClick={handleSignIn}
        >
          <>
            <BiChevronRightCircle className="mr-3" />
            {!loading ? 'Sign In' : 'Loading...'}
          </>
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
