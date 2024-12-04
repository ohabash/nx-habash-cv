'use client';
import { Button } from '@/components/button/Button';
import { auth } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { BiChevronRightCircle } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

const page = () => {
  const headerCopy = 'Sign In';
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState<false | string>(false);
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password).catch((e) => {
        console.log(`🚀 => handleSignIn => e:***`, e)
      });
      console.log(`🚀 => handleSignIn => res:`, res)
      sessionStorage.setItem('user', 'true');
      if (!res) throw('Close, but no cigar. Try again!');
      setEmail('');
      setPassword('');
      router.push('/'); 
    } catch (e) {
      console.log(`🚀 => handleSignIn => e:`, e)
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
          <BiChevronRightCircle className="mr-3" />
          {!loading ? 'Sign In' : 'Loading...'}
        </Button>
        {error?.message && showError && (
          <div className="bg-red text-white w-full block p-2 rounded-md mt-3">
            <div className="font-bold">{showError}</div>
            {error.message}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
