import { GoogleButton } from '@/components/auth/GoogleButton';
import { NextAuthProviderButton } from '@/components/auth/NextAuthProviderButton';
import { Button } from '@/components/button/Button';
import { auth } from '@/firebase/firebase.config';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { AiFillGithub } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

const Page = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(`🚀 => csrfToken:`, csrfToken)
  const user = auth.currentUser;
  // const router = useRouter();

  // Handle redirection in a useEffect hook
  // useEffect(() => {
  //   if (user) router.push('/auth/settings');
  // }, [user, router]);

  const headerCopy = 'Sign In';
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
        <NextAuthProviderButton />
        <NextAuthProviderButton
          copy="Sign In with GitHub"
          provider="github"
          className="bg-[#238636] text-white"
          icon={<AiFillGithub />}
        />
        <Button
          href={'/auth/login-form'}
          className="w-full py-4 mt-4 hover:brightness-95"
        >
          <MdEmail className="mr-3" />
          Sign In with Email
        </Button>
      </div>
    </>
  );
};

export default Page;
