"use client";
import { IoMdLogOut } from "react-icons/io"; 
import { MdOutlineAccountCircle } from "react-icons/md"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { auth } from "@/firebase/firebase.config";
import { signOut } from "firebase/auth";

export const AuthNav = () => {
  const [user] = useAuthState(auth);
  console.log(`🚀 => AuthNav => user:`, user)
  const pathname = usePathname();
  const isAuthLink = pathname.includes('auth/');
  const logout = async () => {
    signOut(auth);
    sessionStorage.removeItem('user');
  };
  return (
    <div className="flex justify-center items-center">
      {isAuthLink ? (
        <>
          <Item path={'/auth/sign-up'} customActive={pathname.includes('sign-up')}>Sign Up</Item>
          <Item path={'/auth/login'}>Login</Item>
        </>
      ) : (
        <>
          {/* signin (from home) */}
          {!user && <Item path={'/auth/sign-up'} className="text-2xl"><MdOutlineAccountCircle /></Item>}
        </>
      )}

      {/* logout */}
      {user && <a onClick={logout} className="link text-2xl"><IoMdLogOut /></a>}
    </div>
  );
}


interface ItemProps {
  children: React.ReactNode;
  path: string;
  className?: string;
  customActive?: boolean;
}
export const Item = ({ children, path, className, customActive }: ItemProps) => {
  const pathname = usePathname();
  console.log(`🚀 => Item => path:`, { path, pathname });
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