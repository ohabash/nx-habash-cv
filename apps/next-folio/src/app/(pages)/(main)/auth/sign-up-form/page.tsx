"use client";
import { Button } from '@/components/button/Button';
import { auth } from '@/firebase/firebase.config';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { BiChevronRightCircle } from "react-icons/bi";

const page = () => {
  const headerCopy = 'Sign Up';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', 'true');
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
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
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          pattern=".+@example\.com"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <Button
          className="w-full py-4 hover:brightness-95 bg-accent1 text-white font-semibold"
          onClick={handleSignUp}
        >
          <BiChevronRightCircle className="mr-3" />
          Sign Up
        </Button>
      </div>
    </>
  );
};

export default page;
