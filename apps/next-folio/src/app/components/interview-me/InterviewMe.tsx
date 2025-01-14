"use client";
import { useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { PiOpenAiLogo } from 'react-icons/pi';
import { Button } from '../button/Button';
import { ChatModal } from '../chat/Chat';
import { GoogleGeminiEffect } from '../ui/geminiEffect/GoogleGeminiEffect';

export function InterviewMe() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.02, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);

  return (
      <div
        className="h-[275vh] -mt-8_ z-[1] bg-darker w-full border-b-[1px] border-darkBlue/60 rounded-md relative pt-60 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title={<Title />}
          button={<InterviewMeTrigger className="md:mt-41" />}
          description={
            'An interactive AI bot that lets you ask questions about my professional experience, skills, and achievements.'
          }
        />
      </div>
  );
}

const Title = () => {
  return (
    <h1 className="glow-effect1 -mr-11">
      Interview Me
      <span className="p-2 text-xs bg-white text-black grad-dark rounded-md  relative ml-2 -top-12 glow-effect">
        Ai
      </span>
    </h1>
  );
}

export const InterviewMeTrigger = ({ className, simple=false }: { className?: string, simple?: boolean }) => {
  return (
      <ChatModal className="z-30">
        {!simple ? (
          <Button
            className={` bouncey active:scale-90 scale-100 backdrop-blur-[2px] bg-dark/80 text-xl ${className}`}
            blur={true}
            icon={<PiOpenAiLogo />}
            iconClassName="bg-accent3 text-white"
          >
            Interview Me
          </Button>
        ) : (
          <a className={'link'}>Interview Me</a>
        )}
      </ChatModal>
  );
};


