'use client';
import { PiCaretLeft } from "react-icons/pi";
import { serverSideGlobalContext, useGlobalContext } from "../../global.context";


export const NavToggle = () => {
  const isServer = typeof window === 'undefined';
  const global = isServer ? serverSideGlobalContext : useGlobalContext();
  return (
    <a
      className="text-center absolute cursor-pointer bottom-[1rem] left-0 bg-dark py-4 px-3 rounded-r-lg hover:text-accent3 z-50"
      onClick={() => global.setNavState((v) => !v)}
    >
      <PiCaretLeft
        className={
          (global.navOpen ? '' : 'rotate-180') + ' text-2xl bouncey inline-block mb-2'
        }
      />
      <p>{global.navOpen ? 'Close' : 'Open'}</p>
    </a>
  );
}