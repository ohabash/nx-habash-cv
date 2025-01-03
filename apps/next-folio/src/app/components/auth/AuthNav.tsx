'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export const AuthNav = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const isAuthLink = pathname.includes('auth/');

  return (
    <div className="flex justify-center items-center">
      {isAuthLink && !user ? (
        <>
          <Item
            path={'/auth/sign-up'}
            customActive={pathname.includes('sign-up')}
          >
            Sign Up
          </Item>
          <Item path={'/auth/login'}>Login</Item>
        </>
      ) : (
        <>
          {/* signin (from home) */}
          {!user && (
            // <a onClick={(e) => signIn()} className="link">
            //   Sign In
            // </a>
            <Item path={'/auth/sign-up'} className="">
              Sign In
            </Item>
          )}
        </>
      )}

      {/* Profile  */}
      {user && (
        <Item path={'/auth/settings'} className="text-2xl">
          <MdOutlineAccountCircle />
        </Item>
      )}
    </div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  path: string;
  className?: string;
  customActive?: boolean;
}
export const Item = ({
  children,
  path,
  className,
  customActive,
}: ItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.replace('/', '') === path?.replace('/', '');
  return (
    <Link
      className={twMerge(
        'link ml-0 mx-2 font-semibold inline-block hover:text-white mb-0',
        isActive || customActive
          ? 'text-white hover:text-white disable border-b-4 border-accent1'
          : 'text-lighten-3',
        className
      )}
      href={path}
    >
      {children}
    </Link>
  );
};
