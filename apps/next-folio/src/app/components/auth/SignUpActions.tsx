import { AiFillGithub } from "react-icons/ai"; 
import { MdEmail } from "react-icons/md";
import { Button } from "../button/Button";
import { NextAuthProviderButton } from "./NextAuthProviderButton";

export const SignUpActions = () => {
  return (
    <div>
      <NextAuthProviderButton />
      <NextAuthProviderButton
        copy="Sign In with GitHub"
        provider="github"
        className="bg-[#238636] text-white"
        icon={<AiFillGithub />}
      />
      <Button
        className="w-full py-4 mt-5 hover:brightness-95 "
        href="/auth/sign-up-form"
      >
        <MdEmail className="mr-3" />
        Continue with Email
      </Button>
    </div>
  );
}

export const SignUpSubHeaderCopy = () => {
  return (<>
    Sign up to connect with me, view my resume, explore{' '}
    <em className="font-bold text-accent2">Interview Me</em>, or dive into my
    source code.
  </>);
}