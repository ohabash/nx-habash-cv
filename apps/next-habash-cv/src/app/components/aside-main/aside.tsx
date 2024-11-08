'use client';
import './nav.scss'
import { Nav } from './Nav'
import { NavToggle } from './NavToggle';
import { serverSideGlobalContext, useGlobalContext } from '../../global.context';
import Image from 'next/image';
import glowImg from '../hero/img/gradient-lime.svg';

export const Aside = () => {
  const glowEnabled = false;
  const isServer = typeof window === 'undefined';
  let global = isServer ? serverSideGlobalContext : useGlobalContext();
  return (
    // <div className="relative">
    <div
      className={`column overflow-hidden relative HEADER_OFFSET min-h-screen bouncey p-0 is-3 w-[${
        global.navOpen ? '22%' : '5%'
      }] bg-dark relative`}
    >
      <div className="w-[22%] hidden"></div>
      <div className="w-[5%] hidden"></div>
      <Nav />
      <NavToggle></NavToggle>
      <div className="glow-wrapper absolute top-36 right-[-70rem]">
        {glowEnabled && (
          <Image
            src={glowImg}
            width="1900"
            height="1900"
            alt="Core Gradient"
            className="rail_gradient -core max-w-none opacity-20"
          />
        )}
      </div>
    </div>
  );
}