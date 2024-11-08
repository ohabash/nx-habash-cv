'use client';
import Link from "next/link";
import { useState } from "react";
import { INavItem } from "./nav.interface";
import { PiCaretDownBold } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { serverSideGlobalContext, useGlobalContext } from "../../global.context";

export interface Props {
  item: INavItem;
  children?: React.ReactNode;
  isChild: boolean;
}

export const NavItem = ({item, children, isChild}: Props) => {
  const isServer = typeof window === 'undefined';
  const global = isServer ? serverSideGlobalContext : useGlobalContext();
  const [activeKey, setActiveKey] = useState(null as string | null);
  const toggle = () => {
    setActiveKey(activeKey === item.title ? null : item.title);
  };
  return (
    <li
      key={item.title + item.title}
      className={'group bouncey ' +
        ( isChild ? 'opacity-60 hover:opacity-100 hover:font-medium' : '' + '' ) +
        (global.navOpen ? 'mb-0' : 'mb-3')
      }
    >
      {/* label */}
      <Link onClick={toggle} href="/">
        <div className="level m-0">
          <div className="level-left ">
            {/* left icon (t1 only) */}
            <div
              className={
                'maincon bouncey group-hover:text-white ' +
                (global.navOpen
                  ? 'text-xl text-lighten-3'
                  : 'text-2xl -ml-1 text-lighten-5')
              }
            >
              {!isChild && (item.icon || <GoDotFill className={' '} />)}
            </div>
            <span
              className={
                'bouncey ' +
                (isChild ? '' : 'ml-4 ') +
                (global.navOpen ? 'opacity-100' : 'ml-8 opacity-0')
              }
            >
              {item.title}
            </span>
          </div>
          <div className="level-right">
            {/* left icon (t2 only) */}
            <span className="group-hover:text-accent3 text-gray-400">
              {isChild && item.icon}
            </span>

            {/* caret on right (t1 only) */}
            {children && (
              <PiCaretDownBold
                className={
                  'bouncey text-gray-400 ' +
                  (activeKey === item.title && children ? '' : 'rotate-180')
                }
              />
            )}
          </div>
        </div>
      </Link>
      {/* sub-menu (if active) */}
      {activeKey === item.title && children}
    </li>
  );
}

