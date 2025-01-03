"use client";
import { auth } from '@/firebase/firebase.config';
import {
  SignUpActions,
  SignUpSubHeaderCopy,
} from '@components/auth/SignUpActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (user) return router.push('/auth/settings');
  const headerCopy = 'Step beyond the basics. Learn more about me.';
  return (
    <>
      <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
      <p className="f text-left mb-8">
        <SignUpSubHeaderCopy />
      </p>
      <div className="ops mt-[2vh] flex_">
        <SignUpActions />
      </div>
      <Link
        className="link ml-0 mt-2 block pl-0 font-normal"
        href={'/auth/why'}
      >
        Why Do I Ask You to Log In?
      </Link>
    </>
  );
};

export default Page;
