import { Button } from '@components/button/Button';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const page = () => {
  const headerCopy = 'Step beyond the basics. Learn more about me.';
  const subHeaderCopy = (
    <>
      Sign up to connect with me, view my resume, explore{' '}
      <em className="font-bold text-accent2">Interview Me</em>, or dive into my
      source code.
    </>
  );
  return (
    <>
      <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
      <p className="f text-left mb-8">{subHeaderCopy}</p>
      <div className="ops mt-[2vh] flex_">
        <Button className="w-full py-4 bg-google text-white hover:brightness-110">
          <FaGoogle className="mr-3 font-black" />
          Continue with Google
        </Button>
        <Button
          className="w-full py-4 mt-5 hover:brightness-95 "
          href="/auth/sign-up-form"
        >
          <MdEmail className="mr-3" />
          Continue with Email
        </Button>
      </div>
    </>
  );
};

export default page;
