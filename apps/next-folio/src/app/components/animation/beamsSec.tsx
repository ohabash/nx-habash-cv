'use client';
import { RiLinkedinBoxLine } from "react-icons/ri"; 
import { ReactNode } from 'react';
import { Beams } from './beams';

export function BeamsSec({children}: {children?: ReactNode}) {
  return (
    <div className="h-[40rem]_ h-full w-full rounded-md grad-darkBlue relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 text-center z-20 max-lg:scale-[0.8]">
        <h2 className=" text-3xl">Let's Connect</h2>
        <p className="text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto ">
          Fill out the form, and I'll get back to you as soon as possible. Let's
          create something amazing!
        </p>
        <a
          href="https://www.linkedin.com/in/omar-habash-71877b40/"
          className="text-yellow/80 mt-8 text-[1rem] font-bold tracking-wide hover:underline flex items-center justify-center"
          target='_blank'
        >
          <RiLinkedinBoxLine className="mr-3 text-white" />
          Find me on LinkedIn
        </a>
      </div>
      <Beams />
    </div>
  );
}
